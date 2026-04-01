import requests
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.tools import tool
from langchain_classic.agents import create_react_agent,AgentExecutor
from langchain_core.prompts import PromptTemplate
from fastapi import APIRouter, Depends
import requests
from typing import Optional, Dict
from utils import verify_jwt_token

load_dotenv()

router = APIRouter()

ALPHA_VANTAGE_API_KEY = '3EY963SEULER7BIR'
BASE_URL = "https://www.alphavantage.co/query"


def build_params(
    tickers: Optional[str] = None,
    topics: Optional[str] = None,
    time_from: Optional[str] = None,
    time_to: Optional[str] = None,
    sort: str = "LATEST",
    limit: int = 50,
) -> Dict:
    params = {
        "function": "NEWS_SENTIMENT",
        "apikey": ALPHA_VANTAGE_API_KEY,
        "sort": sort,
        "limit": limit,
    }

    if tickers:
        params["tickers"] = tickers
    if topics:
        params["topics"] = topics
    if time_from:
        params["time_from"] = time_from
    if time_to:
        params["time_to"] = time_to

    return params


@tool("get_market_news")
def get_market_news(
    tickers: Optional[str] = None,
    topics: Optional[str] = None,
    time_from: Optional[str] = None,
    time_to: Optional[str] = None,
    sort: str = "LATEST",
    limit: int = 20,
) -> str:
    """
    Fetch market news and sentiment data.

    Args:
        tickers: e.g. "AAPL" or "COIN,CRYPTO:BTC,FOREX:USD"
        topics: e.g. "technology,ipo"
        time_from: format YYYYMMDDTHHMM
        time_to: format YYYYMMDDTHHMM
        sort: LATEST, EARLIEST, RELEVANCE
        limit: number of results (max 1000)

    Returns:
        Simplified news summary with sentiment
    """

    try:
        params = build_params(
            tickers=tickers,
            topics=topics,
            time_from=time_from,
            time_to=time_to,
            sort=sort,
            limit=limit,
        )

        response = requests.get(BASE_URL, params=params, timeout=10)
        data = response.json()

        
        return data

    except Exception as e:
        return f"Error fetching market news: {str(e)}"


@tool("get_top_movers")
def get_top_movers(entitlement: Optional[str] = None):
    """
    Fetch top 20 US market gainers, losers, and most actively traded tickers.

    Args:
        entitlement: Optional freshness control.
            - None: historical data (default)
            - "realtime": realtime data during US trading day
            - "delayed": 15-minute delayed data during US trading day

    Returns:
        API response containing top gainers, top losers, and most active tickers.
    """
    try:
        params = {
            "function": "TOP_GAINERS_LOSERS",
            "apikey": ALPHA_VANTAGE_API_KEY,
        }

        if entitlement in {"realtime", "delayed"}:
            params["entitlement"] = entitlement

        response = requests.get(BASE_URL, params=params, timeout=10)
        return response.json()
    except Exception as e:
        return f"Error fetching top movers: {str(e)}"


@tool("get_insider_activity")
def get_insider_activity(symbol: str):
    """
    Fetch latest and historical insider transactions for a company ticker.

    Args:
        symbol: Company ticker symbol (e.g., "IBM", "AAPL").

    Returns:
        API response containing insider transaction records.
    """
    try:
        params = {
            "function": "INSIDER_TRANSACTIONS",
            "symbol": symbol,
            "apikey": ALPHA_VANTAGE_API_KEY,
        }

        response = requests.get(BASE_URL, params=params, timeout=10)
        return response.json()
    except Exception as e:
        return f"Error fetching insider activity: {str(e)}"



@router.get('/news')
def stock(query:str, current_user: dict = Depends(verify_jwt_token)):
    


    llm=ChatGoogleGenerativeAI(model='gemini-2.5-flash')

    tool = [get_market_news, get_top_movers, get_insider_activity]

    template = template = '''
        You are TradeGPT, an intelligent financial assistant that provides real-time market insights using tools.

        You have access to the following tools:

        {tools}

        ---

        When answering, follow this format strictly:

        Question: the input question
        Thought: think about what the user is asking and which tool(s) to use
        Action: the action to take (must be one of [{tool_names}])
        Action Input: the input to the action (JSON format)
        Observation: the result of the action

        ... (this Thought/Action/Observation can repeat if needed)

        Final Answer: the final answer to the user

        ---

        Tool Selection Guidelines:

        1. Use get_market_news:
        - For latest news, sentiment, trends
        - Questions like "why is stock going up/down", "latest news"

        2. Use get_top_movers:
        - For gainers, losers, most active stocks

        3. Use get_company_data:
        - For company fundamentals, financials

        4. Use get_insider_activity:
        - For insider buying/selling activity

        5. Use get_exchange_rate:
        - For currency conversion (USD, INR, etc.)

        6. Use get_metal_prices:
        - For gold/silver prices

        ---

        Rules:

        * Always choose the correct tool before answering
        * Never guess financial data
        * Always base your answer on tool output
        * Use multiple tools if needed
        * Keep answers simple and beginner-friendly
        * If no data is found, say clearly "No relevant data found"

        ---

        Parameter Extraction Rules:

        * If user mentions a company:
        - Convert to ticker (e.g., Apple → AAPL, Tesla → TSLA)

        * If user asks about crypto:
        - Use format CRYPTO:BTC

        * If forex:
        - Use format FOREX:USD

        * If topic-based query:
        - Use topics like: technology, ipo, economy_macro

        ---

        Response Style (Final Answer):

        - Give a short summary
        - Mention key insights
        - Include sentiment if applicable (Bullish / Bearish / Neutral)
        - Keep it clean and readable

        ---
         Question: {input}
        Thought: {agent_scratchpad}

        Begin!
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
