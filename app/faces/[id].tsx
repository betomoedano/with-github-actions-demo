import { useLocalSearchParams } from "expo-router";
import { View, Platform, ColorValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { getColors } from "@/constants/colors";

export default function FaceDetailScreen() {
  const { id, name } = useLocalSearchParams<{
    id: string;
    name: string;
  }>();
  const insets = useSafeAreaInsets();

  // Find the color based on the name
  const colors = getColors();
  const colorData = colors.find((c) => c.name === name);
  const color = colorData?.color || "#000000";

  // Determine if the color is light or dark for text contrast
  const getTextColor = (
    colorValue: ColorValue,
    colorName: string
  ): ColorValue => {
    // For hex colors, calculate luminance
    if (typeof colorValue === "string" && colorValue.startsWith("#")) {
      const hex = colorValue.replace("#", "");

      if (!hex.match(/^[0-9A-F]{6}$/i)) {
        return "#FFFFFF";
      }

      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      // Calculate relative luminance
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      return luminance > 0.5 ? "#000000" : "#FFFFFF";
    }

    // For iOS/Android system colors, use color name hints
    const lightColors = [
      "systemYellow",
      "systemOrange",
      "systemPink",
      "fef7ed",
      "fffff0",
      "c4b5fd",
    ];

    if (lightColors.includes(colorName)) {
      return "#000000";
    }

    return "#FFFFFF";
  };

  const textColor = getTextColor(color, name || "");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 24,
          padding: 32,
          alignItems: "center",
          gap: 16,
          minWidth: 280,
        }}
      >
        <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: color,
            borderRadius: 60,
            borderWidth: 4,
            borderColor: textColor,
            opacity: 0.8,
          }}
        />

        <View style={{ alignItems: "center", gap: 8 }}>
          <ThemedText
            type="title"
            style={{ color: textColor, fontSize: 32, fontWeight: "bold" }}
          >
            Face #{id}
          </ThemedText>

          <ThemedText style={{ color: textColor, fontSize: 18 }}>
            Color Name
          </ThemedText>
          <ThemedText
            style={{
              color: textColor,
              fontSize: 24,
              fontWeight: "600",
              fontFamily: "monospace",
            }}
          >
            {name}
          </ThemedText>

          <View
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: 12,
            }}
          >
            <ThemedText style={{ color: textColor, fontSize: 16 }}>
              {typeof color === "string" && color.startsWith("#")
                ? "Hex Value"
                : "Color Type"}
            </ThemedText>
            <ThemedText
              style={{
                color: textColor,
                fontSize: 20,
                fontWeight: "600",
                fontFamily: "monospace",
              }}
            >
              {typeof color === "string" && color.startsWith("#")
                ? color
                : Platform.OS === "ios"
                ? "iOS System"
                : Platform.OS === "android"
                ? "Material You"
                : "Default"}
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}
