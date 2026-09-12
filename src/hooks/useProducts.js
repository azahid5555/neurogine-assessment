import { useCallback, useEffect, useState } from "react";

import { getProducts, searchProducts } from "@/services/productService";

const LIMIT = 20;

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchInitialProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProducts(0, LIMIT);

      setProducts(data.products);
      setTotal(data.total);
      setSkip(data.skip + data.products.length);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || products.length >= total) {
      return;
    }

    try {
      setLoadingMore(true);

      const data = await getProducts(skip, LIMIT);

      setProducts((currentProducts) => [...currentProducts, ...data.products]);

      setSkip(data.skip + data.products.length);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, products.length, skip, total]);

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);

      const data = await getProducts(0, LIMIT);

      setProducts(data.products);
      setTotal(data.total);
      setSkip(data.skip + data.products.length);
    } catch (error) {
      setError(error.message);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const search = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);

      if (!query.trim()) {
        const data = await getProducts(0, LIMIT);

        setProducts(data.products);
        setTotal(data.total);
        setSkip(data.skip + data.products.length);

        return;
      }

      const data = await searchProducts(query, 0, LIMIT);

      setProducts(data.products);
      setTotal(data.total);
      setSkip(data.skip + data.products.length);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialProducts();
  }, [fetchInitialProducts]);

  return {
    products,
    loading,
    loadingMore,
    refreshing,
    error,
    loadMore,
    refresh,
    search,
  };
}
