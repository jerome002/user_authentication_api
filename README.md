# User Authentication API

A simple and secure RESTful API for user registration and login using Node.js, Express, MongoDB, and bcrypt for password hashing. Designed for integration with frontend applications such as React or mobile clients.

## Features

- User Registration (with hashed passwords)
- User Login (with JWT authentication)
- Input validation
- CORS support for frontend communication
- Environment variable configuration
- MongoDB database connection

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Environment Config**: dotenv
- **Frontend**: Ready to be used with any frontend (React/Vite recommended)

---

## Project Structure

user_authentication_api/
├── src/
│ ├── config/
│ │ └── db.js (MongoDB connection) 
│ ├── controllers/
│ │ └── authController.js (Auth logic) 
│ ├── models/
│ │ └── User.js (Mongoose schema)
│ ├── routes/
│ │ └── auth.js (API endpoints)
├── .env (Environment variables) 
├── server.js (Main app file)
├── package.json

---

##  Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/jerome002/user_authentication_api.git
cd user_authentication_api
2. Install dependencies
## npm install
3. Create a .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth-api
JWT_SECRET=your_jwt_secret_key
4. Start the server
## npm run dev
Server will run on: http://localhost:5000

 ## API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and get JWT

#Sample Request (Register)
POST /api/auth/register
Content-Type: application/json

{
  "name": "Jerome",
  "email": "jerome@gmail.com",
  "password": "123456"
}

#Sample Request (Login)

POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
### Security Best Practices
Passwords are hashed using bcrypt before saving.

JWT tokens are used for secure authentication.

Secrets and DB credentials are stored in .env.


## Author
Jerome Kapkor Kimosop
Github: https://github.com/jerome002 |LinkedIn: https://www.linkedin.com/in/jerome-kapkor-6640b3191/

