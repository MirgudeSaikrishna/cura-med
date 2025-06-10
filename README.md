# CuraMed Frontend

This is the React frontend for the CuraMed healthcare marketplace. It allows users to browse sellers, search products, and view seller locations on a map.

## Features

- User & Seller login/registration
- Product search with backend pagination
- Seller discovery and map integration (Leaflet)
- Responsive UI (Tailwind CSS)

## Tech Stack

- React
- React Router
- Tailwind CSS
- React Leaflet (maps)

## Setup

### Prerequisites

- Node.js (v16+)
- Backend API running (`cura-med-backend`)

### Installation

```bash
cd cura-med
npm install
```

### Running the App

```bash
npm start
```

The app will run on `http://localhost:3000` by default.

## Usage

- Register or log in as a user or seller.
- Browse sellers and view their products.
- Use the search bar to find products (search is backend-powered and paginated).
- View seller locations on an interactive map.
- Pagination controls appear if there are multiple pages of products.

## Notes

- Update API URLs in the code if your backend runs on a different host/port.
- All API requests require a valid JWT token in `x-access-token` header (handled automatically after login).
- 
backend:https://github.com/MirgudeSaikrishna/cura-med-backend
