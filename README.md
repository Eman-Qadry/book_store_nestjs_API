# 📚 Online Bookstore API  

A full-featured backend API for an online bookstore built with **NestJS** and **Prisma**.  
It supports user authentication, book management, shopping cart, wishlist, orders, payments with Stripe, and more.  

---

## 🚀 Features  

- 🔑 **Authentication & Authorization**  
  - JWT-based login/register  
  - Role-based access control (admin, customer)  

- 📖 **Books & Categories**  
  - Manage books, authors, and categories  
  - Search & filter books  

- ❤️ **Wishlist & Cart**  
  - Add/remove books to wishlist  
  - Shopping cart with quantity control  

- 🛒 **Orders & Payments**  
  - Create and manage orders  
  - Stripe integration for secure payments  
  - Order status updates (Pending, Paid, Shipped, Completed)  

- ⭐ **Reviews**  
  - Users can leave ratings & reviews on books
 
    


---

## 🛠 Tech Stack  

- [NestJS](https://nestjs.com/) – Node.js Framework  
- [Prisma](https://www.prisma.io/) – ORM  
- [PostgreSQL](https://www.postgresql.org/) – Database  
- [Stripe](https://stripe.com/) – Payments Integration  
- [JWT](https://jwt.io/) – Authentication  

---

## 📂 Project Structure  

src/
│── auth/ # Authentication & Authorization
│── books/ # Books CRUD & search
│── authors/ # Authors management
│── categories/ # Categories management
│── cart/ # Shopping cart
│── wishlist/ # Wishlist
│── orders/ # Orders & Stripe integration
│── reviews/ # Book reviews
│── users/ # User management
│── common/ # Shared utilities (decorators, guards, etc.)


---

## ⚙️ Installation  

```bash
# 1️⃣ Clone repo
git clone https://github.com/your-username/bookstore-api.git

# 2️⃣ Install dependencies
cd bookstore-api
npm install

# 3️⃣ Setup environment
cp .env.example .env

# 4️⃣ Run migrations
npx prisma migrate dev

# 5️⃣ Start server
npm run start:dev

## Environment Variables

Create a .env file in the root:

DATABASE_URL="postgresql://user:password@localhost:5432/bookstore"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRATION="1d"
JWT_REFRESH_EXPIRATION="21d"
PORT='your_port_number'
STRIPE_SECRET_KEY="your_stripe_secret_key"
CLIENT_URL='http:your_client_url'
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"

## API Endpoints
Auth

POST /auth/register

POST /auth/login

Books

GET /books

GET /books/:id

POST /books (admin)

Cart

POST /cart

GET /cart

DELETE /cart/:itemId

Wishlist

POST /wishlist

GET /wishlist

Orders

POST /orders

GET /orders

PATCH /orders/:id/status (admin)

POST /orders/webhook (Stripe)

 ## 🧪 Testing

Use Postman or Insomnia with the provided API endpoints.
Make sure to include your JWT token for protected routes.

 ## 👨‍💻 Author

Developed by Eman Kadry

🌐 Portfolio (https://my-portfolio-eman.vercel.app/)

💼 LinkedIn (https://github.com/Eman-Qadry)

🐙 GitHub (https://www.linkedin.com/in/eman-qadry-74581427b)

## 📜 License

MIT License – feel free to use and modify.
