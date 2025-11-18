import { Color } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import { useMemo } from "react";

export const defaultColors = [
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

export const iosColors =
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

export const getAndroidDynamicColors = () => [
  { color: Color.android.dynamic.primary, name: "primary" },
  { color: Color.android.dynamic.secondary, name: "secondary" },
  { color: Color.android.dynamic.tertiary, name: "tertiary" },
  { color: Color.android.dynamic.error, name: "error" },
  { color: Color.android.dynamic.surface, name: "surface" },
  { color: Color.android.dynamic.outline, name: "outline" },
];

export const getColors = () =>
  Platform.select({
    android: getAndroidDynamicColors(),
    ios: iosColors,
    default: defaultColors,
  });

export function useFaceColors() {
  const scheme = useColorScheme();
  const colors = useMemo(getColors, [scheme]);
  return colors;
}

