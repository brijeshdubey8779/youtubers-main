# YouTubers Platform - Modern Migration

## Overview

This project represents a complete migration from a traditional Django web application to a modern **Django API + Vite React + Tailwind 4.1** architecture. The migration maintains all existing functionality while providing a modern, scalable, and maintainable codebase.

## 🏗️ Architecture

### Original Stack
- **Backend**: Django 5.1.4 with traditional template rendering
- **Frontend**: HTML/CSS/Bootstrap/JS
- **Database**: PostgreSQL
- **Authentication**: django-allauth (Facebook, Google)
- **Rich Text**: django-ckeditor

### New Modern Stack
- **Backend**: Django 5.2.4 REST API with JWT authentication
- **Frontend**: Vite + React 19 + Tailwind CSS 4.1
- **Database**: PostgreSQL (with SQLite for development)
- **Authentication**: JWT-based API authentication + social login
- **Styling**: Tailwind 4.1 with @theme directive (NO config files)

## 📁 Project Structure

```
youtubers-modern/
├── backend/                 # Django REST API
│   ├── tubers_api/         # Django project configuration
│   ├── api/                # Main API app with serializers, views, URLs
│   ├── accounts/           # User account management
│   ├── youtubers/          # YouTuber model and admin
│   ├── webpages/           # Content models (Team, Slider, Contact)
│   ├── contactinfo/        # Contact information model
│   ├── contactpage/        # Contact form submissions
│   ├── media/              # Media file uploads
│   ├── db.sqlite3          # Development database
│   ├── requirements.txt    # Python dependencies
│   └── manage.py          # Django management script
│
├── frontend/               # Vite React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── YouTubers.jsx
│   │   │   ├── YouTuberDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── context/        # React context for state management
│   │   │   └── AuthContext.jsx
│   │   ├── services/       # API service layer
│   │   │   └── api.js
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   ├── index.css       # Tailwind 4.1 with @theme directive
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Application entry point
│   ├── package.json        # Node.js dependencies
│   └── vite.config.js      # Vite configuration
│
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- **Python 3.12+**
- **Node.js 18+ LTS**
- **npm** (comes with Node.js)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd youtubers-modern/backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Linux/Mac
   # or
   venv\Scripts\activate     # Windows
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start Django development server:**
   ```bash
   python manage.py runserver 8000
   ```

   The Django API will be available at: `http://localhost:8000`
   Admin interface: `http://localhost:8000/admin`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd youtubers-modern/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start Vite development server:**
   ```bash
   npm run dev
   ```

   The React application will be available at: `http://localhost:3000`

## 🎨 Tailwind 4.1 Features

This project showcases **Tailwind CSS 4.1** using the new **@theme directive** approach:

### No Configuration Files
- **NO** `tailwind.config.js` required
- **NO** PostCSS configuration needed
- Everything configured through CSS using `@theme` directive

### Custom Theme Configuration
Located in `frontend/src/index.css`:

```css
@theme {
  /* Custom Colors with oklch values */
  --color-primary-500: oklch(0.65 0.18 240);
  --color-secondary-500: oklch(0.65 0.15 180);
  
  /* Custom Typography */
  --font-display: "Inter", "system-ui", "sans-serif";
  
  /* Custom Spacing, Shadows, etc. */
  --spacing-18: 4.5rem;
  --shadow-custom: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Component Classes
Pre-built component classes using `@layer components`:

```css
.btn-primary {
  @apply bg-primary-500 text-white hover:bg-primary-600;
}

.card {
  @apply bg-white rounded-lg shadow-custom border border-gray-200;
}

.youtuber-card {
  @apply card hover:shadow-custom-lg transition-all duration-300;
}
```

## 🔐 Authentication System

### JWT-Based Authentication
- **Access tokens**: 60-minute lifetime
- **Refresh tokens**: 7-day lifetime with rotation
- **Automatic token refresh**: Built into axios interceptors
- **Secure storage**: Tokens stored in localStorage

### API Endpoints
```
POST /api/auth/login/         # User login
POST /api/auth/register/      # User registration  
POST /api/auth/refresh/       # Token refresh
GET  /api/auth/profile/       # User profile
GET  /api/auth/dashboard/     # Dashboard data
```

### Frontend State Management
- **React Context**: `AuthContext` for global auth state
- **Automatic token handling**: Axios interceptors
- **Route protection**: `ProtectedRoute` component

## 📊 API Endpoints

### YouTubers
```
GET    /api/youtubers/           # List all YouTubers (with filtering)
GET    /api/youtubers/{id}/      # YouTuber detail
GET    /api/youtubers/featured/  # Featured YouTubers
GET    /api/youtubers/search/    # Advanced search
```

### Content Management
```
GET    /api/home-data/          # Homepage data (sliders, featured, team)
GET    /api/team/               # Team members
GET    /api/sliders/            # Homepage sliders
GET    /api/contactinfo/        # Contact information
POST   /api/contact/            # Submit contact form
POST   /api/contactpage/        # Submit contact page form
```

### Static Data
```
GET    /api/categories/         # Available categories
GET    /api/crew-types/         # Crew type options
GET    /api/camera-types/       # Camera type options
```

## 🎯 Key Features

### Backend Features
- **Complete REST API** with Django REST Framework
- **JWT authentication** with automatic token refresh
- **Advanced filtering and search** using django-filter
- **Image uploads** with proper URL generation
- **CORS configuration** for frontend communication
- **Comprehensive admin interface**

### Frontend Features
- **Modern React 19** with hooks and context
- **Responsive design** with mobile-first approach
- **Component architecture** with reusable components
- **Automatic API integration** with error handling
- **Loading states** and user feedback
- **Route protection** for authenticated pages

## 🔧 Development Tools

### Backend Tools
- **Django REST Framework**: API development
- **django-cors-headers**: CORS handling
- **django-filter**: Advanced filtering
- **Pillow**: Image processing
- **psycopg2-binary**: PostgreSQL adapter

### Frontend Tools
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Axios**: HTTP client with interceptors
- **Tailwind CSS 4.1**: Utility-first styling

## 📈 Performance Optimizations

### Backend
- **Efficient queries** with select_related and prefetch_related
- **Pagination** for large datasets
- **Image optimization** with Pillow
- **Proper serialization** with DRF serializers

### Frontend
- **Code splitting** with Vite
- **Lazy loading** for images
- **Optimized builds** with tree shaking
- **Fast refresh** during development

## 🔄 Migration Benefits

### Developer Experience
- **Modern development workflow** with hot reload
- **Component-based architecture** for maintainability
- **TypeScript-ready** structure
- **Clear separation of concerns**

### Performance
- **Faster page loads** with SPA architecture
- **Better caching** with API endpoints
- **Optimized builds** with Vite
- **Responsive design** with Tailwind

### Scalability
- **API-first design** allows multiple frontends
- **Microservices-ready** architecture
- **Modern deployment options** (Docker, cloud platforms)
- **Easy testing** with separated concerns

## 🚦 Current Status

### ✅ Completed
- [x] Django REST API with all endpoints
- [x] JWT authentication system
- [x] React frontend with routing
- [x] Tailwind 4.1 with @theme directive
- [x] Component architecture
- [x] Basic page structure
- [x] API service layer
- [x] Authentication context

### 🚧 In Progress
- [ ] Complete authentication forms (Login/Register)
- [ ] Full YouTubers listing with filtering
- [ ] YouTuber detail pages
- [ ] Contact form functionality
- [ ] Dashboard implementation

### 📋 TODO
- [ ] Image upload handling
- [ ] Social authentication integration
- [ ] Advanced search functionality
- [ ] User profile management
- [ ] Admin interface improvements
- [ ] Production deployment setup
- [ ] Testing implementation
- [ ] Documentation completion

## 📝 Notes

### Database
- Currently using **SQLite** for development simplicity
- **PostgreSQL** configuration available in settings
- Easy switch by updating `DATABASES` in `settings.py`

### Environment Variables
Create a `.env` file in the backend directory for:
```
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgres://user:pass@localhost/dbname
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-secret
```

### Production Considerations
- Use environment variables for sensitive data
- Configure PostgreSQL for production
- Set up proper media file serving
- Enable HTTPS for security
- Configure CORS for production domains

## 🤝 Contributing

1. Follow the existing code structure
2. Use the established naming conventions
3. Update documentation for new features
4. Test API endpoints with the Django admin
5. Ensure responsive design with Tailwind utilities

---

**🎉 Congratulations!** You now have a modern, scalable web application with a clean separation between backend API and frontend SPA, using the latest versions of Django, React, and Tailwind CSS! 