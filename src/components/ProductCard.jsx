import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, fonts, radius, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import ProductImage from "./ProductImage";

export default function ProductCard({ product, onPress, onFavorite }) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        {/* <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          placeholder={{ blurhash: "LmLg9W-oNGt7~Cs.ofWC4:RkfRR*" }}
          resizeMode="cover"
        /> */}
        <ProductImage uri={product.thumbnail} style={styles.image} />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.favoriteButton}
          onPress={onFavorite}
        >
          <Image
            source={require("../../assets/images/icons/heart.png")}
            style={styles.heartImg}
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {product.title}
        </Text>

        <Text style={styles.price}>RM {Number(product.price).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: colors.surface,
    borderRadius: radius._8,
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 0.82,
    position: "relative",
    backgroundColor: colors.black100,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  favoriteButton: {
    position: "absolute",
    top: spacingY._8,
    right: spacingX._8,
    alignItems: "center",
    justifyContent: "center",
  },
  heartImg: {
    width: verticalScale(18),
    height: verticalScale(18),
  },

  content: {
    paddingHorizontal: spacingX._8,
    paddingVertical: spacingY._8,
  },

  title: {
    fontSize: scale(11),
    fontWeight: "500",
    color: colors.text,
    fontFamily: fonts.regular,
  },

  price: {
    marginTop: spacingY._3,
    fontSize: 11,
    fontWeight: "700",
    color: colors.text,
  },
});
