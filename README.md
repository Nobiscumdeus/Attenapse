# 🎯 Attenapse

A modern full-stack application for attention-based analytics and user engagement tracking, built with React and FastAPI.

## 🌟 Live Demos

| Service | URL | Description |
|---------|-----|-------------|

| 📚 **API Docs** | [https://nobiscumdeus.github.io/Attenapse/](https://nobiscumdeus.github.io/Attenapse/) | Interactive API documentation |
| 🎨 **Storybook** | [https://nobiscumdeus.github.io/Attenapse/storybook](https://nobiscumdeus.github.io/Attenapse/storybook) | Component library & design system |

## 🛠 Tech Stack

**Frontend**
- React 16 ++
- Tailwind CSS for styling  
- Storybook for component documentation
- Responsive design principles

**Backend**
- FastAPI with Python 3.11+
- Pydantic for data validation
- Auto-generated API documentation
- RESTful API architecture

**Deployment**
- GitHub Pages (Storybook)

## ✨ Key Features

- 📊 Real-time attention analytics
- 📱 Fully responsive interface
- 🎯 Interactive data visualizations
- 📝 Auto-generated API documentation
- 🎨 Comprehensive component library

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git

### Local Development

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/Attenapse.git
cd Attenapse
```

**2. Start the backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```
Backend runs on: http://localhost:8000

**3. Start the frontend**
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:5173  or http://localhost:3000

**4. Run Storybook (Optional)**
```bash
cd frontend
npm run storybook
```
Storybook runs on: http://localhost:6006

## 📚 API Documentation

FastAPI automatically generates comprehensive API documentation:

- **Swagger UI**: `http:localhost:8000/docs` - Interactive API testing interface
- **ReDoc**: `http:localhost:8000/redoc` - Clean, readable documentation format

### Key API Endpoints
- Follows REST API

## 🎨 Component Library

Explore our design system and component library in Storybook:

- **Component Documentation** - Props, variants, and usage examples
- **Design Tokens** - Colors, typography, spacing system
- **Interactive Demos** - Live component playground
- **Accessibility Guidelines** - WCAG compliance examples

Perfect for developers and designers to understand the interface patterns.

## 🏗 Project Structure

```
Attenapse/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── stories/        # Storybook component stories
│   ├── .storybook/         # Storybook configuration
│   └── package.json
├── backend/                 # FastAPI Python application
│   ├── app.py
│   │         # Business logic
│   ├── /alembic         # FastAPI application entry
│   └── requirements.txt
├── docs/                   # GitHub Pages documentation
└── README.md
```

## 🚀 Deployment

This project uses automated deployment pipelines:

- **Frontend**: Auto-deploys to Netlify from `main` branch
- **Backend**: Auto-deploys to Railway from `main` branch  
- **Storybook**: Deployed to GitHub Pages via Actions

### Manual Deployment

**Frontend**
```bash
cd frontend
npm run build
# Deploy build/ folder to your hosting service
```

**Backend**
```bash
# Ensure requirements.txt is updated
pip freeze > requirements.txt
git push origin main  # Triggers auto-deployment
```

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests  
cd backend
python -m pytest
```

## 📄 License

MIT License 

## 👨‍💻 Connect

Built with ❤️ by [Olumide E. Adeola ]

- 🌐 **Portfolio**: [https://chasfatprojects.netlify.app](https:chasfatprojects.netlify.app)
- 🐙 **GitHub**: [@nobiscumdeus](https://github.com/nobiscumdeus.git)

---

⭐ **Star this repository if you find it useful!**