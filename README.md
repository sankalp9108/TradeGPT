🚀 TradeGPT — AI-Powered Trading Platform

TradeGPT is a full-stack AI-powered financial platform that enables users to analyze markets, track assets, and make smarter trading decisions using real-time data and intelligent insights.

🌐 Live Demo
🔗 Frontend (Vercel): Add your URL here
⚙️ Backend (Render): https://tradegpt-2ggh.onrender.com
📘 API Docs: https://tradegpt-2ggh.onrender.com/docs

✨ Features
🔐 Authentication
User registration & login (JWT-based)
Secure token handling
Protected routes
📈 Market Data
Real-time stock prices
Crypto market tracking
Gold & silver spot prices
📰 News & AI Insights
Market news aggregation
AI-powered sentiment analysis (Gemini API)
📊 Dashboard
Clean UI with multiple asset classes
Personalized user experience

🧠 Tech Stack
🔹 Frontend
React (Vite)
Tailwind CSS
Modern UI/UX design
🔹 Backend
FastAPI
SQLAlchemy
JWT Authentication
REST APIs
🔹 Database
PostgreSQL (Neon)
🔹 AI Integration
Google Gemini API
🔹 Deployment
Frontend → Vercel
Backend → Render
Database → Neon


📁 Project Structure
TradeGPT/
│
├── backend/
│   ├── routers/
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── LICENSE


⚙️ Setup Instructions
🔹 Clone Repository
git clone https://github.com/sankalp9108/TradeGPT.git
cd TradeGPT
🖥️ Backend Setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
🌐 Frontend Setup
cd frontend
npm install
npm run dev
🔑 Environment Variables
Backend (.env)
GEMINI_API_KEY=your_api_key
DATABASE_URL=your_postgresql_url
JWT_SECRET_KEY=your_secret
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24
Frontend (.env)

📡 API Endpoints
🔐 Authentication
POST /auth/register
POST /auth/login
GET /auth/me
POST /auth/logout
📊 Market APIs
GET /stockprice
GET /news
GET /crypto
GET /metals/spot-price

🚀 Deployment
Backend (Render)
Set root directory: TradeGPT/backend
Add environment variables
Start command:
uvicorn main:app --host 0.0.0.0 --port 10000
Frontend (Vercel)
Root directory: TradeGPT/frontend
Add env:
VITE_API_URL=https://your-backend-url
⚠️ Common Issues
❌ Registration/Login not working
Check API URL (not localhost)
Verify CORS settings
Ensure payload matches backend schema
❌ Database connection error
Verify DATABASE_URL
Ensure SSL enabled (Neon)

🎯 Future Improvements
Portfolio tracking
AI trading signals (buy/sell recommendations)
Advanced charts (TradingView integration)
WebSockets for real-time updates
Mobile app

👨‍💻 Author
Sankalp Shelke
