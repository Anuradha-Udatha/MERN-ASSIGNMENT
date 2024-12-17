# MERN-ASSIGNMENT
This is a MERN stack application that allows users to view travel packages, get details of individual packages, and make bookings.

Table of Contents
.Tech Stack
.Features
.Installation
.Usage
.API Endpoints
.Frontend Structure
.Backend Structure

Tech Stack
Frontend:
React.js - A JavaScript library for building user interfaces.
React Router - For navigation between pages.
Axios - To make HTTP requests to the backend.
TailwindCSS - Utility-first CSS framework for styling.

Backend:
Node.js - JavaScript runtime built on Chrome's V8 engine.
Express.js - Web application framework for Node.js to handle HTTP requests.
Zod - Type-safe validation library to validate and enforce correct data structure.
MongoDB - NoSQL database to store data (e.g., packages, bookings).
Mongoose - ODM (Object Data Modeling) library to interact with MongoDB.
dotenv - To manage environment variables securely.

Features:
View All Packages: Users can see a list of available travel packages.
View Package Details: Users can view detailed information about a specific package.
Booking Form: Users can book a package by filling out a booking form, which includes their name, email, phone number, number of travellers, and any special requests.
API Endpoints for Backend:
GET /api/v1/packages - Retrieves a list of all available packages.
GET /api/v1/packages/:id - Retrieves details of a single package.
POST /api/v1/bookings - Submits a booking form to make a booking.

Installation
Prerequisites
Make sure you have the following installed on your system:

Node.js (v14 or later)
MongoDB (if running locally) or a cloud MongoDB service like MongoDB Atlas
