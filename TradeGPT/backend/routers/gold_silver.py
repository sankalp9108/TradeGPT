import os
import requests
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Query, Depends
from utils import verify_jwt_token

load_dotenv()

router = APIRouter()

BASE_URL = "https://www.alphavantage.co/query"
ALPHA_VANTAGE_API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY", "3EY963SEULER7BIR")
VALID_SYMBOLS = {"GOLD", "XAU", "SILVER", "XAG"}


@router.get("/metals/spot-price")
def get_gold_silver_spot_price(
    symbol: str = Query(..., description="Accepted: GOLD, XAU, SILVER, XAG"),
    current_user: dict = Depends(verify_jwt_token),
):
    """
    Get live spot price for gold or silver.
    """
    symbol_upper = symbol.upper().strip()
    if symbol_upper not in VALID_SYMBOLS:
        raise HTTPException(
            status_code=400,
            detail="Invalid symbol. Use GOLD, XAU, SILVER, or XAG.",
        )

    if not ALPHA_VANTAGE_API_KEY:
        raise HTTPException(status_code=500, detail="Alpha Vantage API key is not configured")

    params = {
        "function": "GOLD_SILVER_SPOT",
        "symbol": symbol_upper,
        "apikey": ALPHA_VANTAGE_API_KEY,
    }

    try:
        response = requests.get(BASE_URL, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
    except requests.RequestException as exc:
        raise HTTPException(status_code=502, detail=f"Alpha Vantage request failed: {str(exc)}")

    if isinstance(data, dict) and data.get("Error Message"):
        raise HTTPException(status_code=400, detail=data["Error Message"])

    return data
