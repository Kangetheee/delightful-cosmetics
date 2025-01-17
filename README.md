# eCommerce Platform using MERN and Payhero

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
5. [Project Structure](#project-structure)
6. [Environment Variables](#environment-variables)
7. [Running the Application](#running-the-application)
8. [Payment Integration (Payhero)](#payment-integration-payhero)
9. [Admin Features](#admin-features)
10. [Deployment](#deployment)

---

## Overview

This is a full-stack eCommerce platform built with the MERN stack (MongoDB, Express, React, Node.js) and integrated with Payhero for secure and seamless payment processing. It includes user authentication using Firebase and features for product management, order tracking, and role-based access control for admin functionalities.

---

## Features

- **User Authentication**: Firebase integration for sign-up, login, and password recovery.
- **Product Management**: Add, edit, delete, and view products.
- **Shopping Cart**: Add/remove items, update quantities, and track totals.
- **Checkout Process**: Secure payments powered by Payhero.
- **Order Management**: Users can track orders; admins can manage order statuses.
- **Admin Panel**:
  - Role-based access for user management.
  - Dashboard with key metrics.
  - Product and order management.
- **Responsive Design**: Fully responsive UI for desktop and mobile devices.

---

## Technologies Used

### Frontend:

- **React.js**: For building the user interface.
- **Redux**: For state management.
- **Bootstrap**: For responsive design.

### Backend:

- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for handling routes and APIs.
- **MongoDB**: NoSQL database for storing user and product data.

### Authentication:

- **Firebase**: User authentication and password reset functionality.

### Payment:

- **Payhero**: Secure payment processing.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 16.x)
- **MongoDB** (local or Atlas for cloud database)
- **Firebase Project**
- **Payhero Account**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ecommerce-mern-payhero.git
   cd ecommerce-mern-payhero
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

---

## Project Structure

```
root
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── App.js
│   │   └── index.js
├── .env
├── package.json
└── README.md
```

---

## Example Environment Variables

Create a `.env` file in the `backend` directory with the following keys:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
PAYHERO_API_KEY=your_payhero_api_key
PAYHERO_SECRET_KEY=your_payhero_secret_key
```

---

## Running the Application

### Backend:

1. Navigate to the backend folder and start the server:

   ```bash
   cd backend
   npm start
   ```

2. The backend will run on `http://localhost:5000`.

### Frontend:

1. Navigate to the frontend folder and start the React app:

   ```bash
   cd frontend
   npm start
   ```

2. The frontend will run on `http://localhost:3000`.

---

## Payment Integration (Payhero)

1. Register for a Payhero account and obtain your API keys.
2. Add the keys to the `.env` file as shown above.
3. Payhero is used to handle all payment-related functionality, including:
   - Tokenizing credit/debit card information.
   - Processing payments securely.
   - Managing refunds and payment disputes.

### Payment Flow:

1. User adds items to the cart and proceeds to checkout.
2. At checkout, user enters payment details.
3. Payhero processes the payment and returns a confirmation response.
4. Order status is updated based on payment success or failure.

---

## Admin Features

1. **User Management**:
   - View all registered users.
   - Assign admin roles.
2. **Product Management**:
   - Add, edit, and delete products.
3. **Order Management**:
   - Update order statuses (e.g., processing, shipped, delivered).
4. **Dashboard**:
   - Display key metrics like sales, revenue, and user activity.

---

## Deployment

1. Use **Hostinger** or a similar service to deploy the application.

2. For the frontend:

   - Build the React app:
     ```bash
     npm run build
     ```
   - Deploy the `build` folder to your hosting platform.

3. For the backend:

   - Ensure the backend server is deployed on a Node.js-compatible hosting platform.
   - Connect the backend to MongoDB Atlas for a cloud database.

4. Update environment variables in the hosting platform's configuration.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push the branch and create a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
