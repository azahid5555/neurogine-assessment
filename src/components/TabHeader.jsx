import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function TabHeader() {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8}>
        <Image
          source={require("../../assets/images/icons/userHeader.png")}
          placeholder={{ blurhash: "LmLg9W-oNGt7~Cs.ofWC4:RkfRR*" }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} style={styles.cartButton}>
        <View style={styles.bag}>
          <View style={styles.bagHandle} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._10,
    paddingBottom: spacingY._16,
    borderBottomWidth: 1,
    borderBottomColor: colors.black100,
  },
  avatar: {
    width: spacingX._40,
    height: spacingX._40,
    borderRadius: radius._20,
  },
  cartButton: {
    width: spacingX._40,
    height: spacingX._40,
    borderRadius: radius._20,
    backgroundColor: colors.primary500,
    alignItems: "center",
    justifyContent: "center",
  },
  bag: {
    width: spacingX._16,
    height: spacingY._16,
    borderWidth: 1.5,
    borderColor: colors.white,
    borderRadius: radius._4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacingY._3,
  },
  bagHandle: {
    position: "absolute",
    top: -spacingY._5,
    width: spacingX._8,
    height: spacingY._6,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: colors.white,
    borderTopLeftRadius: radius._4,
    borderTopRightRadius: radius._4,
  },
});
