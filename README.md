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
