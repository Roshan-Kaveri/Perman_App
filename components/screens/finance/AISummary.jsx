import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";
export default function AISummary() {
  return (
    <View className="border-white border border-1 rounded-md mt-10 p-3">
      <View className="flex-1 flex-row pb-2">
        <Ionicons name="sparkles-outline" size={18} color="#DEE2E6" />{" "}
        <Text className="pl-2 text-gray_xs">AI Summary</Text>
      </View>
      <hr></hr>
      <Text className="mt-2 text-gray_md text-justify">
        AI Summary Summary Summary Summary Summary Summary Summary Summary
        Summary Summary Summary Summary Summary Summary Summary Summary Summary
        Summary Summary Summary Summary Summary Summary Summary Summary Summary
        Summary Summary Summary Summary Summary Summary Summary Summary Summary
        Summary Summary Summary Summary Summary Summary Summary
      </Text>
    </View>
  );
}
