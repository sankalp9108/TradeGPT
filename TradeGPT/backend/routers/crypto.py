import requests
from dotenv import load_dotenv
from fastapi import APIRouter, Depends
from langchain_classic.agents import AgentExecutor, create_react_agent
from langchain_core.prompts import PromptTemplate
from langchain_core.tools import tool
from langchain_google_genai import ChatGoogleGenerativeAI
from utils import verify_jwt_token

load_dotenv()

router = APIRouter()

ALPHA_VANTAGE_API_KEY = "3EY963SEULER7BIR"
BASE_URL = "https://www.alphavantage.co/query"


@tool("get_currency_exchange_rate")
def get_currency_exchange_rate(from_currency: str, to_currency: str):
	"""
	Return realtime exchange rate for any crypto or physical currency pair.

	Args:
		from_currency: Source currency code, e.g. BTC or USD.
		to_currency: Destination currency code, e.g. EUR or JPY.

	Returns:
		Alpha Vantage JSON response for CURRENCY_EXCHANGE_RATE.
	"""
	try:
		params = {
			"function": "CURRENCY_EXCHANGE_RATE",
			"from_currency": from_currency.upper(),
			"to_currency": to_currency.upper(),
			"apikey": ALPHA_VANTAGE_API_KEY,
		}
		response = requests.get(BASE_URL, params=params, timeout=10)
		return response.json()
	except Exception as e:
		return f"Error fetching exchange rate: {str(e)}"


@router.get("/crypto")
def crypto(query: str, current_user: dict = Depends(verify_jwt_token)):
	llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

	tools = [get_currency_exchange_rate]

	template = """
You are TradeGPT Crypto Assistant.

You have access to these tools:
{tools}

When answering, follow this format:
Question: the input question
Thought: think about what to do
Action: the action to take (must be one of [{tool_names}])
Action Input: the input to the action (JSON format)
Observation: the result of the action
Final Answer: the final answer to the user

Rules:
* Always use get_currency_exchange_rate for exchange-rate questions
* Never guess rates
* Keep the answer clear and short

Question: {input}
Thought: {agent_scratchpad}
"""

	prompt = PromptTemplate(
		template=template,
		input_variables=["input", "tools", "tool_names", "agent_scratchpad"],
	)

	agent = create_react_agent(
		llm=llm,
		tools=tools,
		prompt=prompt,
	)

	agent_executor = AgentExecutor(
		agent=agent,
		tools=tools,
		verbose=False,
		handle_parsing_errors=True,
		return_intermediate_steps=True,
	)

	response = agent_executor.invoke({"input": query})
	return {
		"final_answer": response["output"],
		"steps": response["intermediate_steps"],
	}
