import Checkbox from "expo-checkbox";
import { useState } from "react";
import { LayoutAnimation, Pressable, Text, View } from "react-native";

const TYPE_LABELS = {
  food: "Food",
  rent: "Rent",
  fun: "Fun",
  emi: "EMI",
  investment: "Investment",
};

const REQ_LABELS = {
  high: "High",
  medium: "Medium",
  low: "Low",
  avoidable: "Avoidable",
};

export default function FilterDropdown({
  typeFilters,
  reqFilters,
  toggleTypeFilter,
  toggleReqFilter,
}) {
  const [activeTab, setActiveTab] = useState("type"); // "type" | "req"

  const switchTab = (tab) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveTab(tab);
  };

  return (
    <View className="w-full bg-[#000] border border-gray_md rounded-lg mt-2">
      {/* TAB HEADER */}
      <View className="flex-row bg-gray_sm rounded-t-lg">
        <Pressable
          onPress={() => switchTab("type")}
          className={`flex-1 p-4 ${
            activeTab === "type" ? "bg-[#ADB5BD]" : "bg-[#89939b]"
          }`}
        >
          <Text
            className={`text-center font-semibold text-xs ${
              activeTab === "type" ? "text-black" : "text-gray-600"
            }`}
          >
            TYPE
          </Text>
        </Pressable>

        <Pressable
          onPress={() => switchTab("req")}
          className={`flex-1 p-4 ${
            activeTab === "req" ? "bg-[#ADB5BD]" : "bg-[#89939b]"
          }`}
        >
          <Text
            className={`text-center font-semibold text-xs ${
              activeTab === "req" ? "text-black" : "text-gray-600"
            }`}
          >
            REQUIREMENT
          </Text>
        </Pressable>
      </View>

      {/* CONTENT */}
      <View className="p-3">
        {activeTab === "type" &&
          Object.keys(TYPE_LABELS).map((key) => (
            <View
              key={key}
              className="flex-row justify-between items-center py-2"
            >
              <Text className="text-white text-sm">{TYPE_LABELS[key]}</Text>
              <Checkbox
                value={typeFilters[key]}
                onValueChange={() => toggleTypeFilter(key)}
                color={typeFilters[key] ? "gray" : undefined}
              />
            </View>
          ))}

        {activeTab === "req" &&
          Object.keys(REQ_LABELS).map((key) => (
            <View
              key={key}
              className="flex-row justify-between items-center py-2"
            >
              <Text className="text-white text-sm">{REQ_LABELS[key]}</Text>
              <Checkbox
                value={reqFilters[key]}
                onValueChange={() => toggleReqFilter(key)}
                color={reqFilters[key] ? "gray" : undefined}
              />
            </View>
          ))}
      </View>
    </View>
  );
}
