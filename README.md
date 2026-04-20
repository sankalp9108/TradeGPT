# 🚀 TradeGPT — AI-Powered Trading Platform

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Google Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=flat&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

TradeGPT is a full-stack, AI-powered financial platform that lets users query real-time market data in plain English. Powered by **LangChain ReAct agents** and **Google Gemini 2.5 Flash**, it understands natural-language questions about stocks, crypto, precious metals, and financial news — and answers with live data from Alpha Vantage.

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| 🖥️ Frontend (Vercel) | [tradegpt-phi.vercel.app](https://tradegpt-phi.vercel.app) |
| ⚙️ Backend (Render) | [tradegpt-2ggh.onrender.com](https://tradegpt-2ggh.onrender.com) |
| 📘 API Docs (Swagger) | [tradegpt-2ggh.onrender.com/docs](https://tradegpt-2ggh.onrender.com/docs) |

---

## ✨ Features

### 🔐 Authentication
- User registration & login with **JWT tokens**
- Secure bcrypt password hashing
- Protected API routes and frontend pages

### 📈 Stock Prices
- Query any stock by name or ticker (e.g. *"What is Apple's stock price?"*)
- Powered by an **AI ReAct agent** + Alpha Vantage `GLOBAL_QUOTE`

### 📰 News & Market Intelligence
- Market news with sentiment analysis
- Top gainers, losers, and most-active tickers
- Insider transaction tracking
- Answers grounded in live Alpha Vantage `NEWS_SENTIMENT` data

### 💱 Crypto Exchange Rates
- Real-time crypto-to-fiat and crypto-to-crypto rates
- Natural-language queries (e.g. *"How much is 1 BTC in EUR?"*)

### 🥇 Precious Metals
- Live gold (XAU/GOLD) and silver (XAG/SILVER) spot prices

### 📊 Dashboard
- Multi-asset dashboard with a clean, responsive UI
- Dedicated pages for Stocks, Crypto, Metals, and News

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite 5, Tailwind CSS 3, React Router 6, Axios, Lucide React |
| **Backend** | FastAPI, SQLAlchemy, Uvicorn |
| **Database** | PostgreSQL via [Neon](https://neon.tech) |
| **Auth** | JWT (PyJWT), bcrypt |
| **AI / Agents** | LangChain, LangGraph, Google Gemini 2.5 Flash (`langchain-google-genai`) |
| **Market Data** | [Alpha Vantage](https://www.alphavantage.co/) REST API |
| **Deployment** | Frontend → Vercel · Backend → Render · DB → Neon |

---

## 📁 Project Structure

```
TradeGPT/
├── backend/
│   ├── routers/
│   │   ├── auth.py          # Register, login, /me, logout
│   │   ├── stock_price.py   # /stockprice — ReAct agent for stock queries
│   │   ├── news.py          # /news — ReAct agent for news & movers
│   │   ├── crypto.py        # /crypto — ReAct agent for exchange rates
│   │   └── gold_silver.py   # /metals/spot-price — direct spot price
│   ├── models.py            # SQLAlchemy User model
│   ├── schemas.py           # Pydantic request/response schemas
│   ├── database.py          # DB session & init
│   ├── utils.py             # JWT helpers, password hashing
│   ├── main.py              # FastAPI app entry point
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/           # LandingPage, Dashboard, Stocks, Crypto, Metals, News, Login, Register
│   │   ├── components/      # Navbar, BottomNav, ProtectedRoute, LoadingSpinner, SkeletonCard
│   │   ├── context/         # Auth context
│   │   ├── services/        # Axios API service layer
│   │   └── styles/          # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── LICENSE
```

---

## ⚙️ Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- A PostgreSQL database (e.g. free tier on [Neon](https://neon.tech))
- [Google Gemini API key](https://aistudio.google.com/app/apikey)
- [Alpha Vantage API key](https://www.alphavantage.co/support/#api-key) *(free tier available)*

### 1. Clone the Repository

```bash
git clone https://github.com/sankalp9108/TradeGPT.git
cd TradeGPT/TradeGPT
```

### 2. Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file (see Environment Variables section below)

# Start the development server
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000` and the interactive docs at `http://localhost:8000/docs`.

### 3. Frontend Setup

```bash
cd frontend

npm install

# Create a .env file (see Environment Variables section below)

npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔑 Environment Variables

### Backend — `backend/.env`

```env
# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# PostgreSQL (Neon or any Postgres instance)
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# JWT
JWT_SECRET_KEY=your_super_secret_key
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# Alpha Vantage (optional — a default key is embedded but rate-limited)
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
```

### Frontend — `frontend/.env`

```env
VITE_API_URL=http://localhost:8000
```

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive a JWT |
| `GET` | `/auth/me` | Get current user profile |
| `POST` | `/auth/logout` | Logout (client-side token discard) |

All market endpoints below require `Authorization: Bearer <token>`.

### 📊 Market Data

| Method | Endpoint | Query Param | Description |
|--------|----------|-------------|-------------|
| `GET` | `/stockprice` | `query` | Natural-language stock price query |
| `GET` | `/news` | `query` | Market news, top movers & insider activity |
| `GET` | `/crypto` | `query` | Crypto/forex exchange rate query |
| `GET` | `/metals/spot-price` | `symbol` (GOLD/XAU/SILVER/XAG) | Live precious metals spot price |

### 🛠️ System

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Welcome message |
| `GET` | `/health` | Health check |

---

## 🚀 Deployment

### Backend (Render)

1. Connect your GitHub repo on [render.com](https://render.com)
2. Set **Root Directory**: `TradeGPT/backend`
3. Set **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 10000`
4. Add all backend environment variables in the Render dashboard

### Frontend (Vercel)

1. Import your GitHub repo on [vercel.com](https://vercel.com)
2. Set **Root Directory**: `TradeGPT/frontend`
3. Add the environment variable:
   ```
   VITE_API_URL=https://your-render-backend-url
   ```

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| Registration/Login failing | Ensure `VITE_API_URL` points to your deployed backend, not `localhost` |
| CORS errors | Verify the frontend URL is listed in `allow_origins` in `main.py` |
| Database connection error | Check `DATABASE_URL` format and ensure SSL is enabled (required for Neon) |
| AI agent not responding | Verify `GEMINI_API_KEY` is valid and has quota remaining |
| Slow first response | Render free tier spins down after inactivity — the first request may take ~30 s |

---

## 🎯 Roadmap

- [ ] Portfolio tracking with P&L calculation
- [ ] AI buy/sell signal recommendations
- [ ] Advanced charts (TradingView widget integration)
- [ ] WebSocket support for real-time price streaming
- [ ] Mobile app (React Native)
- [ ] Multi-language support

---

## 👨‍💻 Author

**Sankalp Shelke**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
