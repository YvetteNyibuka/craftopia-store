# Floral & Décor - Next.js E-Commerce & Admin Dashboard

A pixel-perfect, fully-responsive Next.js App Router application built exactly to the provided Stitch AI design specifications.

## Setup Steps

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- **Next.js (App Router)** - React framework
- **TypeScript** - Strict mode enabled
- **Tailwind CSS** - For styling and design tokens
- **Zustand** - For robust cart state management
- **Lucide React** - For beautiful iconography

## Application Routes

### Public Pages
- **`/`** - Homepage (Hero, Collections, New Arrivals)
- **`/shop`** - Product Listing with filters
- **`/shop/[slug]`** - Product Details (Gallery, Size variants, Add to cart)
- **`/cart`** - Shopping Cart
- **`/checkout`** - Secure Checkout Flow
- **`/collections`** - Collections
- **`/about`** - Our Story
- **`/contact`** - Contact
- **`/account`** - Customer Account

### Admin Pages
- **`/admin`** - Dashboard Overview (Sales metrics, charts, recent activity)
- **`/admin/products`** - Product Management
- **`/admin/orders`** - Orders Management
- **`/admin/customers`** - Customers Management
- **`/admin/content`** - Content Management
- **`/admin/settings`** - System Settings

## Mock Data Implementation

This project uses local mock data generated to match the design. It is located in `lib/data/mockData.ts`.
- **Products**: Populates the shop, new arrivals, and details pages.
- **Orders & Customers**: Populates the admin dashboard data tables.
- **State**: The shopping cart uses `zustand` with local storage persistence to simulate a real cart session.

## Role Switching (Customer / Admin)

Since this application demonstrates UI/UX without a real backend authentication service, role switching is entirely route-based:
- To experience the application as a **Customer**: Visit the root URL (`/`) and navigate using the top public navbar.
- To experience the application as an **Admin**: Visit `/admin` to access the protected-like dashboard area, and navigate using the left admin sidebar.
# craftopia-store
