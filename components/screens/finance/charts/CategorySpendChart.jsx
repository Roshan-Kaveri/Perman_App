import { useState } from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function CategoryChart({ data }) {
  const [selected, setSelected] = useState(null);

  const total = data.reduce((sum, c) => sum + c.amount, 0);

  const pieData = data.map((c, i) => ({
    value: c.amount,
    color: c.color,
    text: c.name,
    focused: selected === i,
    onPress: () => setSelected(i),
  }));

  return (
    <View className="bg-gray_xl p-4  mt-8 border border-gray-800">
      <Text className="text-white text-lg font-semibold mb-3">
        Category Spending
      </Text>

      {/* Centered FULL PIE chart */}
      <View style={{ alignSelf: "center" }}>
        <PieChart
          data={pieData}
          radius={100} // Larger for full pie
          focusOnPress
          animationDuration={700}
          textSize={12}
        />
      </View>

      {/* Popup Tooltip */}
      {selected !== null && (
        <View
          style={{
            marginTop: 10,
            padding: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: data[selected].color,
            alignSelf: "center",
            width: "60%",
          }}
        >
          <Text style={{ color: data[selected].color, fontSize: 12 }}>
            {data[selected].name}
          </Text>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
            ₹{data[selected].amount.toLocaleString()}
          </Text>
          <Text style={{ color: "#ccc", fontSize: 12 }}>
            {((data[selected].amount / total) * 100).toFixed(1)}%
          </Text>
        </View>
      )}

      {/* Legend */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: 15,
        }}
      ></View>
    </View>
  );
}
