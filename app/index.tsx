import { ScrollView, View } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";

// test
const colors = [];

export default function HomeScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </View>
      <ThemedText>Select a color to start</ThemedText>
    </ScrollView>
  );
}
