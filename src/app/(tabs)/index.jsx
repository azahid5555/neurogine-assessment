import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import TabHeader from "@/components/TabHeader";
import { colors, spacingX, spacingY } from "@/constants/theme";
import useProducts from "@/hooks/useProducts";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductListScreen() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const {
    products,
    loading,
    loadingMore,
    refreshing,
    error,
    loadMore,
    refresh,
  } = useProducts();

  if (loading && products.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <TabHeader />
        <SearchBar value={search} onChangeText={setSearch} />

        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary500} />
        </View>
      </SafeAreaView>
    );
  }

  if (error && products.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <TabHeader />
        <SearchBar value={search} onChangeText={setSearch} />

        <View style={styles.center}>
          <Text style={styles.errorText}>Something went wrong.</Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={refresh}
            activeOpacity={0.8}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <TabHeader />
      <SearchBar value={search} onChangeText={setSearch} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={refresh}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(`/productSingle/${item.id}`)}
            onFavorite={() => console.log("Favorite:", item.id)}
          />
        )}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator color={colors.primary500} />
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No products found.</Text>
          </View>
        }
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
  },
  errorText: {
    color: colors.text,
    fontSize: 16,
    marginBottom: spacingY._12,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  retryButton: {
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._10,
    borderRadius: 8,
    backgroundColor: colors.primary500,
  },
  retryText: {
    color: colors.white,
    fontWeight: "600",
  },
  footer: {
    paddingVertical: spacingY._20,
  },
});
