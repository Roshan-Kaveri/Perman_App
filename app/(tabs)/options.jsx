import { ScrollView, Text, View } from "react-native";

export default function FinScreen() {
  return (
    <ScrollView className="flex-1 bg-black">
      <View className="flex-1 justify-center items-center h-screen">
        <Text className="text-xl font-bold text-blue-500">Home </Text>
      </View>
    </ScrollView>
  );
}
