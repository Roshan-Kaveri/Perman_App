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
    <View className="bg-gray_xl h-full  p-4 rounded-2xl ">
      <Text className="text-white text-lg font-semibold mb-3">
        Category Spending
      </Text>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <PieChart
          data={pieData}
          radius={100}
          focusOnPress
          animationDuration={500}
          textSize={12}
          donut={false} // full pie
          innerRadius={0}
          showText={false}
        />

        {/* Hover Legend FLOATS near chart */}
        {selected !== null && (
          <View
            style={{
              position: "absolute",
              top: 120,
              backgroundColor: "#1f2937",
              padding: 10,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: data[selected].color,
              minWidth: 120,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: data[selected].color,
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              {data[selected].name}
            </Text>

            <Text
              style={{
                color: "white",
                fontSize: 17,
                fontWeight: "700",
                marginTop: 3,
              }}
            >
              ₹{data[selected].amount.toLocaleString()}
            </Text>

            <Text style={{ color: "#ccc", fontSize: 12, marginTop: 2 }}>
              {((data[selected].amount / total) * 100).toFixed(1)}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
