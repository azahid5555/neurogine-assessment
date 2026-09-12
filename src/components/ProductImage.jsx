import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, fonts, radius } from "@/constants/theme";
import { scale } from "@/utils/styling";

export default function ProductImage({ uri, style, contentFit = "cover" }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <View style={[styles.placeholder, style]}>
        <Text style={styles.placeholderText}>Image unavailable</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={style}
      contentFit={contentFit}
      transition={200}
      onError={() => setError(true)}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: colors.black100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._8,
  },

  placeholderText: {
    fontSize: scale(11),
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },
});
