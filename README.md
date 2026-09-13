# Neurogine Product Catalog

A React Native product catalog application built as part of the Neurogine Junior Mobile Developer technical assessment.

The application uses the DummyJSON Products API to display products, support pagination, search products with debounce, and display individual product details.

## Tech Stack

- React Native
- Expo
- Expo Router
- JavaScript / JSX
- DummyJSON API
- Expo Image
- React Native Size Matters
- Jest + Jest Expo

## Features

- Design tokens
- Custom font handling
- Product listing
- Two-column product grid
- Infinite scroll pagination
- Pull-to-refresh
- Debounced product search
- Product detail screen
- Image loading/error fallback
- Loading states
- Error and retry states
- Empty search results state
- Unit test for product service

## API

The application uses the DummyJSON Products API.

### Get Products

```text
GET https://dummyjson.com/products?limit=20&skip=0
```

Pagination is implemented using the `skip` parameter.

### Get Single Product

```text
GET https://dummyjson.com/products/{id}
```

### Search Products

```text
GET https://dummyjson.com/products/search?q={query}
```

## Search

Search uses the DummyJSON search endpoint instead of downloading all products and filtering them on the client.

A 500ms debounce is applied to the search input. This prevents an API request from being made on every keystroke.

For example:

```text
User types: phone

p       → no request
ph      → no request
pho     → no request
phone   → no request

User stops typing
        ↓
      500ms
        ↓
Search API request
```

When the search field is cleared, the application returns to the normal product listing.

## Pagination

The product list initially requests 20 products. When the user scrolls near the end of the list, another request is made using the current `skip` value.

Example:

```text
First request:
limit=20&skip=0

Second request:
limit=20&skip=20

Third request:
limit=20&skip=40
```

New products are appended to the existing list.

Pagination stops when the number of loaded products reaches the API's `total` value.

## Architecture

The project separates UI, API communication, and state/data logic.

```text
Screen
  ↓
Custom Hook
  ↓
Service
  ↓
API
```

### Services

```text
src/services/
```

Responsible for communicating with the DummyJSON API.

Example:

```text
productService.js
```

### Hooks

```text
src/hooks/
```

Contains reusable state and data-fetching logic.

Example:

```text
useProducts.js
```

The hook manages:

- Products
- Loading state
- Pagination
- Refreshing
- Search
- Errors

### Components

```text
src/components/
```

Contains reusable UI components such as:

- ProductCard
- SearchBar
- TabHeader
- ProductImage
- App Tab Bar

### Screens

```text
src/app/
```

Contains the application routes and screens.

The tab routes contain:

- Home
- Profile

Single product screens are outside the tab navigator so the bottom tab bar is not displayed on the product detail screen.

## Project Structure

```text
src/
├── app/
│   ├── _layout.jsx
│   │
│   ├── (tabs)/
│   │   ├── _layout.jsx
│   │   ├── index.jsx
│   │   └── profile.jsx
│   │
│   └── (singles)/
│       └── productSingle/
│           └── [id].jsx
│
├── components/
│   ├── app-tabs.jsx
│   ├── ProductCard.jsx
│   ├── ProductImage.jsx
│   ├── SearchBar.jsx
│   └── TabHeader.jsx
│
├── constants/
│   └── theme.js
│
├── hooks/
│   └── useProducts.js
│
├── services/
│   ├── productService.js
│   └── productService.test.js
│
└── utils/
    └── styling.js
```

## UI States

The application handles the main API states.

### Loading

Displayed while the initial product request is being loaded.

### Empty

Displayed when a search does not return any products.

### Error

Displayed when the initial API request fails, with an option to retry.

### Pagination Error

If loading more products fails, the already-loaded products remain visible and a retry option is displayed.

### Success

Products are displayed in a two-column grid.

## Image Handling

Product images use `expo-image`.

A reusable `ProductImage` component handles image errors and displays an "Image unavailable" fallback when an image cannot be loaded.

## Pull-to-Refresh

The product list supports pull-to-refresh.

Pulling down on the product list requests the first page again and updates the displayed products.

## Testing

Jest is used for unit testing.

The current test covers the product service and verifies that:

- `getProducts()` returns the expected API response.
- The correct API URL is requested.

The API request is mocked so the test does not depend on the external DummyJSON server.

Run tests with:

```bash
npm test
```

## Getting Started

### Requirements

- Node.js
- npm
- Expo development environment
- Expo Go App or an Android/iOS development environment

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Start the Project

```bash
npx expo start
```

Then use Expo Go or an available emulator/device to run the application.

### Run Tests

```bash
npm test
```

## Known Limitations

The implementation was kept focused on the core requirements and prioritized the features specified in the assessment.

The following areas were intentionally kept out of scope:

- Product favorites are currently visual only.
- No authentication is implemented.
- No cart or checkout functionality is implemented.
- Product data is provided by DummyJSON and is not persisted locally.
- Offline support is not implemented.

## AI Usage Disclosure

AI tools were used during development for limited guidance, debugging assistance, and clarification of technical concepts.

AI assistance was used to help investigate implementation issues, review possible approaches, and understand testing concepts.

The code was reviewed and tested by the me, and the developer (me) is responsible for understanding the functionality of the submitted application.
