import { Color, Link } from "expo-router";
import { Platform, Pressable, useColorScheme, View } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const defaultColors = [
  { color: "#1e3a8a", name: "1e3a8a" },
  { color: "#fef7ed", name: "fef7ed" },
  { color: "#9ca3af", name: "9ca3af" },
  { color: "#d1a3a4", name: "d1a3a4" },
  { color: "#6b7280", name: "6b7280" },
  { color: "#fffff0", name: "fffff0" },
  { color: "#c4b5fd", name: "c4b5fd" },
  { color: "#a8a29e", name: "a8a29e" },
  { color: "#fbbf24", name: "fbbf24" },
  { color: "#374151", name: "374151" },
];

const iosColors =
  Platform.OS === "ios"
    ? [
        { color: Color.ios.systemBlue, name: "systemBlue" },
        { color: Color.ios.systemOrange, name: "systemOrange" },
        { color: Color.ios.systemGray, name: "systemGray" },
        { color: Color.ios.systemRed, name: "systemRed" },
        { color: Color.ios.systemGreen, name: "systemGreen" },
        { color: Color.ios.systemYellow, name: "systemYellow" },
        { color: Color.ios.systemPink, name: "systemPink" },
        { color: Color.ios.systemPurple, name: "systemPurple" },
        { color: Color.ios.systemTeal, name: "systemTeal" },
        { color: Color.ios.systemIndigo, name: "systemIndigo" },
      ]
    : [];

const getAndroidDynamicColors = () => [
  { color: Color.android.dynamic.primary, name: "primary" },
  { color: Color.android.dynamic.secondary, name: "secondary" },
  { color: Color.android.dynamic.tertiary, name: "tertiary" },
  { color: Color.android.dynamic.error, name: "error" },
  { color: Color.android.dynamic.surface, name: "surface" },
  { color: Color.android.dynamic.outline, name: "outline" },
];

const getColors = () =>
  Platform.select({
    android: getAndroidDynamicColors(),
    ios: iosColors,
    default: defaultColors,
  });

function useFaceColors() {
  const scheme = useColorScheme();
  const colors = useMemo(getColors, [scheme]);
  return colors;
}

function Faces(props: { numberOfFaces: number }) {
  const colors = useFaceColors();
  const faces = useMemo(
    () =>
      Array.from({ length: props.numberOfFaces }, (_, i) => ({
        id: i,
        color: colors[i % colors.length].color,
        name: colors[i % colors.length].name,
      })),
    [props.numberOfFaces, colors]
  );
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        justifyContent: "space-between",
      }}
    >
      {faces.map((face) => (
        <Link
          key={face.id}
          href={{
            pathname: "/faces/[id]",
            params: {
              id: face.id,
              name: face.name,
            },
          }}
          asChild
        >
          <Link.Trigger>
            <Pressable style={{ borderRadius: 16, overflow: "hidden" }}>
              <View
                style={{
                  backgroundColor: face.color,
                  width: "31%",
                  aspectRatio: 1,
                  minWidth: 100,
                }}
              />
            </Pressable>
          </Link.Trigger>
          <Link.Preview />
        </Link>
      ))}
    </View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingHorizontal: 16,
      }}
    >
      <View style={{ marginBottom: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <ThemedText type="title">Color Palette</ThemedText>
          <HelloWave />
        </View>
        <ThemedText>Select a color to view details</ThemedText>
      </View>

      <Faces numberOfFaces={10} />
    </View>
  );
}
