import { ScrollView, Text } from "react-native-web";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 items-center justify-center bg-black">
      <Text className="text-xl font-bold text-blue-500">Home</Text>
    </ScrollView>
  );
}
