# ApexTech - Full-Stack MERN E-Commerce & SaaS Platform

A modern, production-ready full-stack E-Commerce web application built with **React 19, TypeScript, Tailwind CSS, Node.js, Express.js**, and an in-memory / MongoDB document schema store.

Designed and engineered for high-performance developer gear and modern workspace tech.

---

## 🚀 Quick Start (Local Setup)

Follow these simple steps to run the application locally on your laptop:

### 1. Prerequisites
- **Node.js** v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm** (comes bundled with Node.js) or **pnpm** / **yarn**

### 2. Clone the Repository
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd E-Commerce
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment (Optional)
Copy the example environment file:
```bash
cp .env.example .env
```
*(No API keys required to test the core features! The Stripe simulator and in-memory mock database work out-of-the-box).*

### 5. Start the Development Server
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🛠️ Available Scripts

In the `E-Commerce` directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Express + Vite server in development mode on port 3000 |
| `npm run build` | Compiles the React client with Vite and bundles the Node.js server with esbuild |
| `npm start` | Runs the compiled production build from `dist/server.cjs` |
| `npm run lint` | Runs TypeScript type-checking without emitting files |

---

## ✨ Features

### 🛒 High-Performance Storefront
- **Dynamic Catalog**: Real-time filtering by category (*Audio, Developer Gear, Workstation, Wearables, Smart Home*), search query, and stock availability.
- **Product Quick-View Modal**: Interactive modal with high-res galleries, technical specifications, and warranty badges.
- **Slide-out Cart Drawer**:
  - Live quantity steppers.
  - Dynamic Free Shipping progress tracker (threshold: $150).
  - Discount promo code engine (try `MERN20` for 20% off or `DEV10` for 10% off).

### 💳 Stripe Checkout Simulator
- **Two-Step Checkout Flow**: Shipping information and Stripe-styled card inputs.
- **1-Click Auto-Fill**: Includes demo data auto-fill for rapid testing.
- **Server Verification**: Computes tax (8.25%), verifies inventory, and generates official order confirmation receipts.

### 📊 Admin Inventory & Order Fulfillment Portal
- **Real-Time KPIs**: Total gross revenue, order volume, catalog count, and low-stock alerts.
- **Live Inventory Manager**: Increment stock (`+5`), decrement (`-1`), or delete products from the catalog.
- **Order Fulfillment Controller**: Update order statuses (`processing` ➔ `shipped` ➔ `delivered`).
- **REST API & MERN Architecture Flow**: Visual breakdown of the client, router, business logic, and database schemas.

---

## 📁 Project Structure

```
E-Commerce/
├── public/                 # Static public assets
├── server/                 # Express backend controllers & routes
│   └── routes/
│       └── ecommerce.ts    # REST API endpoints for catalog, cart, checkout & admin
├── src/                    # React 19 Frontend
│   ├── components/
│   │   └── ecommerce/      # E-Commerce UI Components
│   │       ├── AdminPortal.tsx
│   │       ├── CartDrawer.tsx
│   │       ├── CheckoutModal.tsx
│   │       ├── EcommerceNavbar.tsx
│   │       ├── ProductCard.tsx
│   │       ├── ProductQuickViewModal.tsx
│   │       └── StorefrontView.tsx
│   ├── data/
│   │   └── seedProducts.ts # Initial catalog seed data & coupons
│   ├── types/
│   │   └── ecommerce.ts    # TypeScript interfaces & types
│   ├── App.tsx             # Main client application router
│   ├── index.css           # Tailwind CSS imports
│   └── main.tsx            # React entrypoint
├── .env.example            # Sample environment variables
├── .gitignore              # Git ignore rules
├── index.html              # HTML shell entry
├── package.json            # Scripts & dependencies
├── server.ts               # Express server with Vite middleware integration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build config
```

---

## 🔌 REST API Endpoints

The backend Express application serves the following REST endpoints:

- `GET /api/ecommerce/products` - Retrieve catalog items with optional query params (`category`, `search`, `sort`, `inStockOnly`).
- `GET /api/ecommerce/products/:id` - Retrieve single product details.
- `POST /api/ecommerce/products` - Add a new product (Admin).
- `PUT /api/ecommerce/products/:id` - Update product details / stock levels.
- `DELETE /api/ecommerce/products/:id` - Remove a product from the database.
- `POST /api/ecommerce/apply-coupon` - Validate and apply promotional discount codes.
- `POST /api/ecommerce/checkout` - Process Stripe payment payload and record order.
- `GET /api/ecommerce/orders` - Retrieve recent customer orders.
- `PATCH /api/ecommerce/orders/:id/status` - Update order fulfillment status.
- `GET /api/ecommerce/analytics` - Calculate gross revenue and inventory metrics.
- `POST /api/ecommerce/reset-demo` - Reset database to default seed state.
