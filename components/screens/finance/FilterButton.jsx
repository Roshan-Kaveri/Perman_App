import Feather from "@expo/vector-icons/Feather";
import { Pressable, Text, View } from "react-native";

export default function FilterButton({ selectedCount, open, setOpen }) {
  return (
    <Pressable
      onPress={() => setOpen(!open)}
      className="w-full bg-gray_xl rounded-lg p-3 mt-4 flex-row justify-between items-center"
    >
      <Text className="text-gray-200 font-semibold text-sm">FILTERS</Text>

      <View className="flex-row items-center">
        <Text className="text-gray-300 text-sm mr-2">
          {selectedCount} Selected
        </Text>
        <Feather
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color="white"
        />
      </View>
    </Pressable>
  );
}
