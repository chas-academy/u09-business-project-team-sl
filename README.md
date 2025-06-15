# XP Feed

XP Feed is a full-stack application that allows users to create game lists and discover games using the [RAWG.io](https://rawg.io/) API.

## Project Structure

- `frontend/` – Vite + React + TypeScript
- `backend/` – Node.js + Express + MongoDB

## Features

- User authentication with Google OAuth (JWT)
- Browse and search for games via RAWG API
- Create and manage personal game lists
- Add games to custom lists
- Responsive UI built with Tailwind CSS

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

- Vite development server will start at <http://localhost:5173>

Be sure to create a `.env` file in the frontend/ directory with the following:

```ini
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
VITE_API_URL=http://localhost:5000
```

- Create a `GOOGLE_CLIENT_ID` via [Google Cloud Console](https://console.cloud.google.com/) under APIs & Services > Credentials and add it to your `.env` file for OAuth authentication.
