import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import TabHeader from "@/components/TabHeader";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { getProducts } from "@/services/productService";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PRODUCTS = [
  {
    id: 1,
    title: "Men's Fleece Pullover Hoodie",
    price: 100,
    thumbnail: "https://dummyjson.com/image/400x500/008000/ffffff?text=Hoodie",
  },
  {
    id: 2,
    title: "Fleece Pullover Skate Hoodie",
    price: 150.97,
    thumbnail: "https://dummyjson.com/image/400x500/222222/ffffff?text=Hoodie",
  },
  {
    id: 3,
    title: "Fleece Skate Hoodie",
    price: 120,
    thumbnail: "https://dummyjson.com/image/400x500/ffb000/ffffff?text=Hoodie",
  },
  {
    id: 4,
    title: "Men's Ice-Dye Pullover Hoodie",
    price: 135,
    thumbnail: "https://dummyjson.com/image/400x500/b5dca8/ffffff?text=Hoodie",
  },
];

export default function ProductListScreen() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        console.log("Products: ", data);
      } catch (error) {
        console.error("Products error:", error);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = PRODUCTS.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <TabHeader />
      <SearchBar value={search} onChangeText={setSearch} />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => console.log("Product:", item.id)}
            onFavorite={() => console.log("Favorite:", item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContent: {
    paddingHorizontal: spacingX._20,
    paddingBottom: spacingY._30,
  },

  row: {
    gap: spacingX._10,
    marginBottom: spacingY._10,
  },
});
