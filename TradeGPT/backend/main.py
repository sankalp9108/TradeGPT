from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import stock_price, news, crypto, gold_silver, auth
from database import init_db

# Initialize database tables
init_db()

app = FastAPI(
    title="StockAI",
    description="AI-powered stock market analysis and authentication system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    # Allow local frontend dev servers on any port (Vite, React dev server, etc.).
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(auth.router)
app.include_router(stock_price.router)
app.include_router(news.router)
app.include_router(crypto.router)
app.include_router(gold_silver.router)


@app.get("/")
def read_root():
    """Root endpoint"""
    return {
        "message": "Welcome to StockAI API",
        "docs": "/docs",
        "health": "/health"
    }


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
