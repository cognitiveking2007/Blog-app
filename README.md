# Blog App

A full-stack MERN Blog Application built using React, Node.js, Express.js, MongoDB, and JWT Authentication.
The application supports role-based access for Users, Authors, and Admins. Users can read articles and comment, 
authors can create and manage content, and admins can manage the overall system.

The application integrates frontend and backend services along with MongoDB Atlas and Cloudinary for image storage.

---

###  Backend Architecture and API Setup

Built the backend using Express.js and MongoDB.

Backend structure includes:

- APIs
- Middleware
- Models
- Cloudinary configuration
- Authentication setup
- Database connection

Main backend modules:

- `UserAPI.js`
- `AuthorAPI.js`
- `AdminAPI.js`
- `CommonAPI.js`

Implemented:

- User registration
- Login and logout
- JWT authentication
- Role-based authorization
- Article APIs
- Comment APIs

Application flow:

Frontend Request  
↓  
Express Server  
↓  
Middleware Execution  
↓  
API Route Handler  
↓  
MongoDB Database  
↓  
Response Sent Back

---

###  Authentication and Authorization

Implemented secure authentication system using JWT.

Features:

- User Registration
- User Login
- Logout
- Password encryption
- Protected routes
- Role-based access control

Roles implemented:

| Role | Permissions |
|--------|-------------|
| User | Read articles and comment |
| Author | Create, edit, delete articles |
| Admin | Manage platform activities |

Middleware used:

- `VerifyToken.js`

---

###  Frontend Development using React

Built frontend using React + Vite.

Technologies used:

- React Router
- Axios
- Zustand
- React Hook Form
- Tailwind CSS

Main frontend components:

- Home
- Header
- Login
- Register
- User Profile
- Author Profile
- Admin Dashboard

Frontend routing flow:

App.jsx  
↓  
RootLayout.jsx  
↓  
Components  
↓  
Protected Routes

---

###  Article Management System

Implemented complete article management.

Features:

- Create article
- View articles
- Edit article
- Delete article
- View article details
- Add comments

Author functionality:

Write Article  
↓  
Upload Image  
↓  
Store in Database  
↓  
Display to Users

---

###  Image Upload and Cloudinary Integration

Integrated Cloudinary for image uploads.

Implemented:

- Profile image upload
- Article image upload
- File handling using Multer
- Cloud image storage

Configuration files:

- `cloudinary.js`
- `cloudinaryUpload.js`
- `multer.js`

---

###  State Management and API Integration

Used Zustand and Axios for handling application state and backend communication.

Features:

- Authentication state
- User data management
- Global state handling
- API requests
- Persistent sessions

Project flow:

React Frontend  
↓  
Axios Requests  
↓  
Express Backend  
↓  
MongoDB Atlas  
↓  
Response Returned  
↓  
UI Updated

---

###  Deployment

Frontend deployed on Vercel:
https://blog-app-jade-eta.vercel.app/

Backend deployed on Render:

https://blog-app-4eug.onrender.com

Deployment flow:

React Frontend (Vercel)  
↓  
Axios API Requests  
↓  
Express Backend (Render)  
↓  
MongoDB Atlas Database  
↓  
Response Returned  
↓  
Frontend Updated

---

### Tech Stack

Frontend:

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Zustand
- React Hook Form

Backend:

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer
- Cloudinary
- Cookie Parser
- CORS

---

### Overall Summary

This project helped me understand complete MERN stack development by connecting frontend and backend applications into a real-world blog platform.
I learned authentication, role-based access control, API integration, state management, protected routes, file uploads, 
deployment using Vercel and Render, and handling production issues like CORS and environment variables.
