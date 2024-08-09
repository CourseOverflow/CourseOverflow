# CourseOverflow

## Project Overview

CourseOverflow is an innovative project that transforms the way students access educational resources on YouTube. Founded in 2023, the project simplifies the process of finding relevant educational content, addressing the challenges faced by students.

## Project Goals

The mission of CourseOverflow is to provide students with convenient access to curated YouTube playlists tailored to their course curriculums. The goal is to bridge the gap in traditional education by offering a streamlined service for discovering and utilizing educational resources on YouTube.

## Key Features

- **Curriculum-based Playlists:** Meticulously curated YouTube playlists aligned with specific course curriculums.
- **Convenience:** An easily accessible and organized collection of educational videos.
- **Exam-oriented Support:** Comprehensive educational content to aid in exam preparation.
- **Time-saving:** Eliminating the need for students to search for videos themselves.
- **Enhanced Learning:** Facilitating a more interactive and engaging learning experience.

## Getting Started

Explore CourseOverflow today and discover the ultimate solution for accessing relevant educational resources conveniently. Improve your learning, supplement your exam preparation, and unlock your academic potential with curated YouTube playlists tailored to your specific course curriculum.

Visit our project page [CourseOverflow](https://courseoverflow.vercel.app) to get started!

## Development Setup

1. **Clone the repository**
2. **Install Docker and start the daemon**
3. **Create .env files for client and server**
   
   client/.env
   ```env
   REACT_APP_DEBUG="true"
   REACT_APP_API_URL="http://localhost:8000/api/"
  
   REACT_APP_CLOUDINARY_CLOUD_NAME=""
   REACT_APP_CLOUDINARY_API_KEY=""
   REACT_APP_CLOUDINARY_API_SECRET=""
  
   REACT_APP_GOOGLE_CLIENT_ID=""
   ```

   server/.env
   ```env
   DEBUG="true"
   SECRET_KEY=""
   DOMAIN="http://localhost:3000"
   ALLOWED_HOSTS="localhost"
   CORS_ALLOWED_ORIGINS="http://localhost:3000"
   CSRF_TRUSTED_ORIGINS="http://localhost:3000"
   
   EMAIL_HOST="smtp.gmail.com"
   EMAIL_PORT=587
   EMAIL_HOST_USER=""
   EMAIL_HOST_PASSWORD=""
   EMAIL_USE_TLS="true"
   
   SOCIAL_AUTH_GOOGLE_OAUTH2_KEY=""
   SOCIAL_AUTH_GOOGLE_OAUTH_SECRET=""
   
   YOUTUBE_API_KEY=""
   GEMINI_API_KEY=""
   GEMINI_MODEL="gemini-1.5-flash"
   
   POSTGRES_DB="courseoverflow"
   POSTGRES_USER="postgres"
   POSTGRES_PASSWORD="pass"
   POSTGRES_HOST="postgres"
   POSTGRES_PORT=5432
   POSTGRES_SSLMODE="disable"
   
   REDIS_HOST="redis"
   REDIS_PORT=6379
   DB_NUMBER=0
   REDIS_PASSWORD="pass"
   REDIS_KEY_PREFIX="courseoverflow"
   ```

   
4. **Run the server**
   
   > From the root directory
   ```bash
   docker-compose build
   docker-compose up
   ```

5. **Run the client side application**

   > From the clint directory
   ```bash
   cd client
   npm intall
   npm start
   ```

## Project Contributors

- [@Ansh Ujlayan](https://www.github.com/AnshUjlayan)
- [@Pradyumna Singh](https://www.github.com/prady8339)
