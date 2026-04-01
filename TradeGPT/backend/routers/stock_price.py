import requests
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.tools import tool
from langchain_classic.agents import create_react_agent,AgentExecutor
from langchain_core.prompts import PromptTemplate
from fastapi import APIRouter, Depends
from utils import verify_jwt_token

load_dotenv()


router = APIRouter()

@tool
def stock_price(company_name:str):
    '''gives real time stock price information with the input of company symbol like IBM '''
    url = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={company_name}&apikey=AXMP1TVEXA0LDENG'
    r = requests.get(url)
    return str(r.json())



@router.get('/stockprice')
def stock(query:str, current_user: dict = Depends(verify_jwt_token)):
    


    llm=ChatGoogleGenerativeAI(model='gemini-2.5-flash')

    tool = [stock_price]

    # prompt = hub.pull('hwchase17/react')
    template = '''You are TradeGPT, an intelligent assistant that provides real-time stock price information using tools.

    You have access to the following tools:

    {tools}

    ---

    When answering, follow this format:

    Question: the input question
    Thought: think about what to do
    Action: the action to take (must be one of [{tool_names}])
    Action Input: the input to the action
    Observation: the result of the action
    ... (this Thought/Action/Observation can repeat)
    Final Answer: the final answer to the user

    ---

    Rules:

    * Always use the stock_price tool for company-specific queries
    * Do not guess stock prices
    * Use the tool result to answer clearly
    * Keep answers simple and beginner-friendly

    ---

    Question: {input}
    Thought: {agent_scratchpad}
    '''

    prompt =  PromptTemplate(template=template,input_variables=tool)


    agent = create_react_agent(
        llm=llm,
        tools=tool,
        prompt=prompt
    )

    agent_executor = AgentExecutor(
        agent=agent,
        tools = tool,
        verbose=False,
        handle_parsing_errors=True,
        return_intermediate_steps=True
    )


    response = agent_executor.invoke({'input':query})
    return  {
    "final_answer": response["output"],
    "steps": response["intermediate_steps"]
}

