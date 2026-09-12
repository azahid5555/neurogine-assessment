import { fonts } from '@/constants/theme';
import { scale } from '@/utils/styling';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ProductListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product list</Text>

      <Link href="/products/1" style={styles.link}>
        Open product 1
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  text: {
    fontSize: scale(16),
    fontFamily: fonts.bold,
    color: '#000000',
  },
  link: {
    fontSize: scale(16),
    color: '#208AEF',
    fontFamily: fonts.medium,
  },
});
