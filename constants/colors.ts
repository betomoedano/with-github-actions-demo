import { Color } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import { useMemo } from "react";

export const iosColors = [
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
];

export const androidColors = [
  { color: Color.android.dynamic.primary, name: "primary" },
  { color: Color.android.dynamic.secondary, name: "secondary" },
  { color: Color.android.dynamic.tertiary, name: "tertiary" },
  { color: Color.android.dynamic.error, name: "error" },
  { color: Color.android.dynamic.surface, name: "surface" },
  { color: Color.android.dynamic.outline, name: "outline" },
];

export const getColors = () =>
  Platform.select({
    android: androidColors,
    ios: iosColors,
    default: iosColors, // Fallback to iOS colors for web/other platforms
  });

export function useFaceColors() {
  const scheme = useColorScheme();
  const colors = useMemo(getColors, [scheme]);
  return colors;
}
