const API_BASE_URL = "https://dummyjson.com";

export const getProducts = async (skip = 0, limit = 20) => {
  const response = await fetch(
    `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch the products");
  }

  return response.json();
};

export const getProductByID = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
};

export const searchProducts = async (query, skip = 0, limit = 20) => {
  const response = await fetch(
    `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  return response.json();
};
