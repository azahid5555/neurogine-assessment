import { StyleSheet, TextInput, View } from "react-native";

import { colors, fonts, radius, spacingX, spacingY } from "@/constants/theme";
import { scale } from "@/utils/styling";
import { Image } from "expo-image";

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/icons/search.png")}
        contentFit="contain"
        style={styles.searchIcon}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: spacingY._40,
    marginHorizontal: spacingX._20,
    marginBottom: spacingY._16,
    paddingHorizontal: spacingX._14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.black100,
    borderRadius: radius._20,
    marginTop: spacingY._12,
  },

  input: {
    flex: 1,
    marginLeft: spacingX._10,
    paddingVertical: 0,
    fontSize: scale(13),
    color: colors.text,
    fontFamily: fonts.medium,
    letterSpacing: 0.1,
  },

  searchIcon: {
    width: spacingX._16,
    height: spacingY._16,
  },
});
