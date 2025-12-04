import Feather from "@expo/vector-icons/Feather";
import { Pressable, Text, View } from "react-native";

export default function FinHeader({ open, setOpen }) {
  return (
    <View className="">
      <Text className="text-gray_xs font-serif text-[2rem]">
        Track your expenses and look into data insights
      </Text>

      <View className="mt-4"></View>

      <Pressable
        onPress={() => setOpen((prev) => !prev)}
        className="bg-gray_xl border border-gray_sm p-3 flex-row justify-between items-center rounded-md"
      >
        <Text className="text-gray_xs">ADD A TRANSACTION</Text>
        <Feather
          name={open ? "arrow-down" : "arrow-right"}
          size={24}
          color="#DEE2E6"
        />
      </Pressable>
    </View>
  );
}
