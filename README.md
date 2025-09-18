# Ecommerce App

A modern full-stack **E-commerce web application** built with **React.js**, **Node.js**, **Express**, **MongoDB**, **Redis**, and **Docker**.  
This app allows users to browse products, add to cart, checkout, and manage orders. It also includes real-time cart updates and an admin dashboard.

---

## **Features**

- User authentication (login/register) with JWT and refresh tokens
- Product listing and detail pages
- Shopping cart with real-time updates (Socket.IO)
- Guest and logged-in cart persistence (Redis + MongoDB)
- Checkout and order management
- Admin dashboard (manage products and orders)
- Responsive frontend with ShadCN UI + TailwindCSS
- CORS handled for cross-domain requests

---

## **Tech Stack**

- **Frontend:** React.js, Redux, Tailwind CSS, ShadCN UI, Axios, Socket.IO
- **Backend:** Node.js, Express.js, MongoDB, Redis
- **Authentication:** JWT with refresh token
- **Deployment:** Docker & Docker Compose

---

## **Getting Started (Locally)**

### Prerequisites
- Node.js (for development)
- Docker & Docker Compose
- Git

### Steps

1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd <repo-folder>

2. Set up .env:
   - copy sample .env.txt as .env in both frontend and backend

3. Build and run with Docker:
   ```bash
   docker-compose up --build

4. Open the frontend in browser:
   http://localhost

5. Backend API available at:
   ```bash
   http://localhost:3001/api
   
   