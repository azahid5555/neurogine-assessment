import { Redirect } from "expo-router";

// The tab bar's first trigger points at `products`, but the app still
// launches at `/`. This route has no NativeTabs.Trigger, so it never
// shows up as a tab - it only forwards the initial URL to the Products tab.
export default function IndexRedirect() {
  return <Redirect href="/(tabs)" />;
}
