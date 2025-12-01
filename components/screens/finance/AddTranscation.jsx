import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const TYPE_OPTIONS = ["Food", "Rent", "Fun", "EMI", "Investment"];
const CATEGORY_OPTIONS = ["High", "Medium", "Low", "Avoidable"];

export default function AddTransactionForm() {
  const [typeOpen, setTypeOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <View className="bg-gray_xl border border-gray_sm p-4">
      {/* PRICE */}
      <Text className="text-gray_xs mb-1 font-semibold text-xs">PRICE</Text>
      <TextInput
        placeholder="0"
        className="bg-gray_xs p-2 border border-gray-400 rounded-sm mb-3 text-gray-800"
      />

      {/* TYPE */}
      <Text className="text-gray_xs mb-1 font-semibold text-xs">TYPE</Text>

      <Pressable
        onPress={() => setTypeOpen(!typeOpen)}
        className="bg-gray_xs border border-gray-400 rounded-sm p-2 mb-1 flex-row justify-between items-center"
      >
        <Text className="text-gray-600">{selectedType || "Select type"}</Text>
        <Feather
          name={typeOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#555"
        />
      </Pressable>

      {typeOpen && (
        <View className="bg-gray_xs border border-gray-400 rounded-sm mb-3">
          {TYPE_OPTIONS.map((opt) => (
            <Pressable
              key={opt}
              onPress={() => {
                setSelectedType(opt);
                setTypeOpen(false);
              }}
              className="p-2 border-b border-gray-300"
            >
              <Text className="text-gray-700">{opt}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* CATEGORY */}
      <Text className="text-gray_xs mb-1 font-semibold text-xs">CATEGORY</Text>

      <Pressable
        onPress={() => setCatOpen(!catOpen)}
        className="bg-gray_xs border border-gray-400 rounded-sm p-2 mb-1 flex-row justify-between items-center"
      >
        <Text className="text-gray-600">
          {selectedCategory || "Select category"}
        </Text>
        <Feather
          name={catOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#555"
        />
      </Pressable>

      {catOpen && (
        <View className="bg-gray_xs border border-gray-400 rounded-sm mb-3">
          {CATEGORY_OPTIONS.map((opt) => (
            <Pressable
              key={opt}
              onPress={() => {
                setSelectedCategory(opt);
                setCatOpen(false);
              }}
              className="p-2 border-b border-gray-300"
            >
              <Text className="text-gray-700">{opt}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* NOTE */}
      <Text className="text-gray_xs mb-1 font-semibold text-xs">NOTE</Text>
      <TextInput
        placeholder="Add a note..."
        multiline
        className="bg-gray_xs h-20 p-2 border border-gray-400 rounded-sm text-gray-800"
      />

      {/* ADD BUTTON */}
      <Pressable className="bg-gray_sm p-3 rounded-sm mt-4">
        <Text className="text-center text-white font-semibold">ADD</Text>
      </Pressable>
    </View>
  );
}
