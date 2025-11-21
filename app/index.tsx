import { Link } from "expo-router";
import { Pressable, View } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFaceColors } from "@/constants/colors";

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
            <Pressable style={{ borderRadius: 16 }}>
              <View
                style={{
                  backgroundColor: face.color,
                  width: 120,
                  height: 120,
                  borderRadius: 60,
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
