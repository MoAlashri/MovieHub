# MovieHub - Environment Configuration Guide

## 🚀 Quick Start

### 1. Setup Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your TMDB API key
VITE_TMDB_API_KEY=your_actual_api_key_here
```

### 2. Get Your TMDB API Key

1. Go to [TMDB](https://www.themoviedb.org/)
2. Create an account (free)
3. Go to Settings → API
4. Request an API key
5. Copy your API key and paste it in `.env`

---

## 📁 File Structure

```
MovieHub/
├── .env                 # ⚠️ Your secrets (DO NOT COMMIT)
├── .env.example         # ✅ Template (safe to commit)
├── .gitignore           # ✅ Protects .env from git
├── src/
│   └── utils/
│       ├── constants.js # ✅ All configs and helpers
│       └── api.js       # ✅ API functions
```

---

## 🔐 Security Best Practices

### ✅ DO:
- Keep `.env` in `.gitignore`
- Use `.env.example` as a template
- Use environment variables for all secrets
- Commit `.env.example` to help other developers

### ❌ DON'T:
- Commit `.env` file to git
- Hard-code API keys in components
- Share your API key publicly
- Push secrets to GitHub

---

## 📝 Available Environment Variables

### Required:
```bash
VITE_TMDB_API_KEY=         # Your TMDB API key
```

### Optional (with defaults):
```bash
VITE_TMDB_BASE_URL=        # API base URL (default: provided)
VITE_APP_NAME=             # App name (default: MovieHub)
VITE_ENABLE_WATCHLIST=     # Enable watchlist (default: true)
VITE_DEV_MODE=             # Dev mode (default: true)
```

---

## 💡 Usage Examples

### Before (❌ Bad):
```javascript
// Hard-coded API key - NEVER DO THIS!
const url = `https://api.themoviedb.org/3/movie/popular?api_key=abc123`;
```

### After (✅ Good):
```javascript
// Use the API helper
import { moviesAPI } from '../utils/api';

const data = await moviesAPI.getPopular();
```

---

## 🎯 Common API Functions

```javascript
import { moviesAPI, tvAPI, searchAPI } from './utils/api';

// Movies
await moviesAPI.getPopular();
await moviesAPI.getTrending();
await moviesAPI.getTopRated();
await moviesAPI.getDetails(movieId);
await moviesAPI.search('inception');

// TV Shows
await tvAPI.getPopular();
await tvAPI.getTrending();
await tvAPI.getDetails(showId);

// Search
await searchAPI.multi('batman');
await searchAPI.movies('inception');
await searchAPI.tv('breaking bad');
```

---

## 🛠️ Helper Functions

```javascript
import { 
  getImageUrl, 
  getYouTubeTrailerUrl,
  ROUTES,
  UI_CONSTANTS 
} from './utils/constants';

// Get optimized image URLs
const posterUrl = getImageUrl(movie.poster_path, 'poster', 'medium');
const backdropUrl = getImageUrl(movie.backdrop_path, 'backdrop', 'large');

// Get YouTube trailer URL
const trailerUrl = getYouTubeTrailerUrl(movie.title);

// Use app routes
<Link to={ROUTES.movieDetails(123)}>View Movie</Link>

// Use UI constants
const items = Array(UI_CONSTANTS.skeletonCount).fill(0);
```

---

## 🚨 Troubleshooting

### Error: "API key is missing"
- Check if `.env` file exists in root directory
- Verify `VITE_TMDB_API_KEY` is set
- Restart dev server after changing `.env`

### Error: "Cannot read environment variables"
- All Vite env vars must start with `VITE_`
- Example: `VITE_API_KEY` ✅ | `API_KEY` ❌

### Images not loading
- Check if image paths are valid
- Use `getImageUrl()` helper function
- Verify TMDB API key has image access

---

## 📦 Deployment

### Vercel / Netlify:
Add environment variables in your dashboard:
```
VITE_TMDB_API_KEY=your_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

### Local Development:
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎓 Learn More

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React Best Practices](https://react.dev/)

---

## 📞 Support

If you encounter issues:
1. Check if `.env` file exists
2. Verify API key is valid
3. Restart dev server
4. Clear browser cache
5. Check console for errors

---

**Happy Coding! 🎬**