import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors, fonts, radius, spacingX, spacingY } from "@/constants/theme";
import { getProductById } from "@/services/productService";
import { scale, verticalScale } from "@/utils/styling";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await getProductById(id);
        console.log("Single Product: ", data);

        setProduct(data);
      } catch (error) {
        console.log("Product detail error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary500} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Unable to load product</Text>

        <Text style={styles.errorMessage}>
          Something went wrong while loading this product.
        </Text>

        <Pressable style={styles.retryButton} onPress={() => router.back()}>
          <Text style={styles.retryText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={10}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Product Details</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.mainImage}
            contentFit="contain"
            transition={200}
          />
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{product.title}</Text>

              {product.brand && (
                <Text style={styles.brand}>{product.brand}</Text>
              )}
            </View>

            <Pressable style={styles.favoriteButton}>
              <Text style={styles.favoriteIcon}>♡</Text>
            </Pressable>
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.rating}>{product.rating}</Text>
            </View>

            <Text style={styles.ratingText}>Product rating</Text>
          </View>

          {/* Price */}
          <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>

            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Product Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Information</Text>

            <View style={styles.infoContainer}>
              <InfoRow label="Category" value={product.category} />

              {product.brand && <InfoRow label="Brand" value={product.brand} />}

              <InfoRow label="Stock" value={`${product.stock} units`} />

              <InfoRow
                label="Discount"
                value={`${product.discountPercentage}%`}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || "N/A"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    backgroundColor: colors.white,
  },

  header: {
    height: verticalScale(56),
    paddingHorizontal: spacingX._20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.black100,
  },

  backButton: {
    width: spacingX._36,
    height: spacingX._36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._18,
    backgroundColor: colors.surface,
  },

  backIcon: {
    fontSize: scale(30),
    lineHeight: scale(30),
    color: colors.text,
    marginTop: -verticalScale(3),
  },

  headerTitle: {
    fontSize: scale(16),
    fontFamily: fonts.semiBold,
    color: colors.text,
  },

  headerSpacer: {
    width: spacingX._36,
  },

  scrollContent: {
    paddingBottom: spacingY._40,
  },

  imageContainer: {
    height: verticalScale(330),
    marginHorizontal: spacingX._20,
    marginTop: spacingY._16,
    borderRadius: radius._16,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },

  mainImage: {
    width: "100%",
    height: "100%",
  },

  content: {
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._20,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  titleContainer: {
    flex: 1,
    paddingRight: spacingX._12,
  },

  title: {
    fontSize: scale(22),
    lineHeight: scale(28),
    fontFamily: fonts.semiBold,
    color: colors.text,
  },

  brand: {
    marginTop: spacingY._5,
    fontSize: scale(13),
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },

  favoriteButton: {
    width: spacingX._40,
    height: spacingX._40,
    borderRadius: radius._20,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteIcon: {
    fontSize: scale(25),
    color: colors.text,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacingY._12,
  },

  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacingX._8,
    paddingVertical: spacingY._5,
    borderRadius: radius._6,
    backgroundColor: colors.primary500,
  },

  star: {
    fontSize: scale(11),
    color: colors.white,
    marginRight: spacingX._3,
  },

  rating: {
    fontSize: scale(12),
    fontFamily: fonts.semiBold,
    color: colors.white,
  },

  ratingText: {
    marginLeft: spacingX._8,
    fontSize: scale(12),
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },

  price: {
    marginTop: spacingY._14,
    fontSize: scale(24),
    fontFamily: fonts.bold,
    color: colors.primary500,
  },

  section: {
    marginTop: spacingY._24,
  },

  sectionTitle: {
    fontSize: scale(16),
    fontFamily: fonts.semiBold,
    color: colors.text,
    marginBottom: spacingY._10,
  },

  description: {
    fontSize: scale(13),
    lineHeight: scale(20),
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },

  infoContainer: {
    borderRadius: radius._10,
    backgroundColor: colors.surface,
    paddingHorizontal: spacingX._14,
  },

  infoRow: {
    minHeight: verticalScale(44),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  infoLabel: {
    fontSize: scale(13),
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },

  infoValue: {
    maxWidth: "55%",
    fontSize: scale(13),
    fontFamily: fonts.medium,
    color: colors.text,
    textAlign: "right",
  },

  gallery: {
    gap: spacingX._10,
  },

  galleryItem: {
    width: scale(90),
    height: scale(90),
    borderRadius: radius._10,
    overflow: "hidden",
    backgroundColor: colors.surface,
  },

  galleryImage: {
    width: "100%",
    height: "100%",
  },

  errorTitle: {
    fontSize: scale(18),
    fontFamily: fonts.semiBold,
    color: colors.text,
  },

  errorMessage: {
    marginTop: spacingY._8,
    fontSize: scale(13),
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    textAlign: "center",
  },

  retryButton: {
    marginTop: spacingY._16,
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._10,
    borderRadius: radius._8,
    backgroundColor: colors.primary500,
  },

  retryText: {
    fontSize: scale(13),
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
});
