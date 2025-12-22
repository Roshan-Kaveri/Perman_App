// TransactionItem.jsx
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  UIManager,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

// Enable animations on Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function TransactionItem({
  item,
  isOpen,
  onToggle,
  onDelete, // <-- new
}) {
  const isPositive = item.amount >= 0;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggle(item.id);
  };

  // Requirement badge colors
  const reqColors = {
    high: "#FF4C4C",
    medium: "#FFB84C",
    low: "#4ECA64",
    avoidable: "#7A7AFF",
  };

  // Swipe action (right → left)
  const renderRightActions = () => (
    <Pressable
      onPress={() => onDelete(item.id)}
      className="bg-red-600 w-24 mb-3 justify-center items-center rounded-r-xl mr-2"
    >
      <Feather name="trash-2" size={22} color="#fff" />
      <Text className="text-white text-xs mt-1">Delete</Text>
    </Pressable>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableRightOpen={() => onDelete(item.id)}
      overshootRight={false}
    >
      <Pressable
        onPress={toggle}
        onLongPress={toggle}
        delayLongPress={250}
        className="bg-[#1B1B1B] border border-[#3A4750] rounded-xl p-4 mb-3"
      >
        {/* Top Row */}
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-lg font-semibold">
              ₹{Math.abs(item.amount)}
            </Text>
            <Text className="text-gray-400 text-xs mt-1">{item.date}</Text>
          </View>

          {isPositive ? (
            <FontAwesome name="arrow-circle-up" size={28} color="#aef798" />
          ) : (
            <FontAwesome name="arrow-circle-down" size={28} color="#f77a67" />
          )}
        </View>

        {/* Expanded Content */}
        {isOpen && (
          <View className="mt-2 pt-1">
            {/* TYPE */}
            <View className="flex-row justify-between items-center pt-2 pb-2">
              <Text className="text-gray_md text-xs">Type</Text>
              <View className="bg-gray-800 px-3 py-1 rounded-full border border-gray-600">
                <Text className="text-white text-xs">{item.type}</Text>
              </View>
            </View>

            {/* REQUIREMENT */}
            <View className="flex-row justify-between items-center pt-2 pb-2">
              <Text className="text-gray_md text-xs">Requirement</Text>
              <View
                style={{
                  backgroundColor: reqColors[item.req],
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}
              >
                <Text className="text-white font-semibold text-xs">
                  {item.req.toUpperCase()}
                </Text>
              </View>
            </View>

            {/* NOTE */}
            <View className="mt-1">
              <Text className="text-gray_md text-xs mb-1">NOTE</Text>
              <View className="bg-[#1F1F1F] p-2 rounded-md border border-gray-700">
                <Text className="text-white">{item.note || "No note"}</Text>
              </View>
            </View>

            <Text className="text-gray-500 text-[10px] mt-2">
              Swipe left to delete
            </Text>
          </View>
        )}
      </Pressable>
    </Swipeable>
  );
}
