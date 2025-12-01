import React from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function MonthSelector({ selectedMonth, setSelectedMonth }) {
  const [open, setOpen] = React.useState(false);

  const items = [
    { label: "This Month", value: "this_month" },
    { label: "Last Month", value: "last_month" },
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    { label: "All Time", value: "all" },
  ];

  return (
    <View className="mt-6">
      <Text className="text-gray-300 mb-2  text-xs">PERIOD</Text>

      <DropDownPicker
        open={open}
        value={selectedMonth}
        items={items}
        setOpen={setOpen}
        listMode="SCROLLVIEW"
        setValue={setSelectedMonth} // ← shared state update
        style={{ backgroundColor: "#212529", borderColor: "#3A4750" }}
        dropDownContainerStyle={{
          backgroundColor: "#222831",
          borderColor: "#3A4750",
        }}
        textStyle={{ color: "white" }}
      />
    </View>
  );
}
