import Feather from "@expo/vector-icons/Feather";
import { Pressable, Text, View } from "react-native";
export default function FinHeader() {
  return (
    <View>
      <Text className="text-gray_xs font-serif  text-[2rem]">
        Track your expenses and look into data insights
      </Text>
      <br />
      <Pressable className="bg-gray_sm p-2 flex-1 flex-row justify-between">
        ADD A TRANSACTION
        <Feather name="arrow-right" size={24} color="black" />
      </Pressable>
    </View>
  );
}
