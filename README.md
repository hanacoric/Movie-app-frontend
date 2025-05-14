# Movie Review App – Frontend

This is the frontend for the **Movie Review Web App**, built using **Vue 3** with the Composition API and Tailwind CSS. It allows users to search for movies, view details, write reviews, and manage their movie lists.

## Live Demo

**Frontend:** (movielog-delta.vercel.app)
**Swagger Docs:** (https://movie-app-backend-ujpg.onrender.com/api-docs/#/)

---

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/hanacoric/Movie-app-frontend.git
cd movie-review-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```env
VITE_API_BASE_URL=https://movie-app-backend-ujpg.onrender.com/api
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
VITE_OMDB_API_KEY=omdb_api_key
```

### 4. Run the development server

```bash
npm run dev
```

The app should now be running on [http://localhost:5173](http://localhost:5173)

---

## Folder Structure

```
src/
├── components/        # UI components (StarRating, MovieCard, etc.)
├── modules/           # Composable logic (auth, movies, reviews)
├── services/          # Axios instance and API functions
├── stores/            # Pinia stores (auth, movie lists)
├── views/             # Main views (Login, Register, Dashboard, etc.)
├── router/            # Vue Router setup
└── App.vue            # Root component
```

---

## Features

- Secure login & registration with reCAPTCHA
- Movie search via OMDb API
- Review system (add/edit/delete)
- Personal movie lists: Watchlist, Favorites, Watched
- Average star rating per movie
- Public review pages with ratings
- Navigation guards and responsive UI

---

## Built With

- Vue 3 + Composition API
- TypeScript
- Tailwind CSS
- Vue Router & Pinia
- Axios + OMDb API

---
