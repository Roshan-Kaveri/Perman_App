import { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function TimelineChart({ labels, values }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  const formatShort = (n) => {
    if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (Math.abs(n) >= 1_000) return (n / 1_000).toFixed(1) + "k";
    return String(n);
  };

  // How many X labels to show (only bottom axis)
  const step = Math.floor(labels.length / 4) || 1;
  const reducedXLabels = labels.filter((_, idx) => idx % step === 0);

  return (
    <View className="bg-gray_xl  p-4  border border-gray-800">
      <Text className="text-white text-lg font-semibold mb-3">
        Spending Over Time
      </Text>

      {/* Chart */}
      <LineChart
        data={{
          labels,
          datasets: [{ data: values }],
        }}
        width={screenWidth - 40}
        height={220}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withShadow={false}
        transparent
        fromZero
        formatYLabel={(val) => formatShort(Number(val))}
        chartConfig={{
          backgroundGradientFrom: "#111",
          backgroundGradientTo: "#111",
          decimalPlaces: 0,
          color: () => "#22c55e",
          labelColor: () => "#ccc", // KEEP built-in Y labels visible
          propsForLabels: { fontSize: 10 },
        }}
        bezier
        onDataPointClick={({ index }) => {
          setHoverIndex(index);
          setTimeout(() => setHoverIndex(null), 1500);
        }}
        decorator={() => {
          if (hoverIndex == null) return null;

          const chartWidth = screenWidth - 40;
          const pointX = (chartWidth / values.length) * hoverIndex + 15;

          const min = Math.min(...values);
          const max = Math.max(...values);

          // Y-position mapped to chart height
          const pointY =
            220 - ((values[hoverIndex] - min) / (max - min || 1)) * 180 - 20;

          // Prevent tooltip from going outside the chart
          const tooltipWidth = 90;
          let adjustedX = pointX - tooltipWidth / 2;
          if (adjustedX < 0) adjustedX = 0;
          if (adjustedX + tooltipWidth > chartWidth)
            adjustedX = chartWidth - tooltipWidth;

          return (
            <View
              style={{
                position: "absolute",
                top: pointY - 40,
                left: adjustedX,
                width: tooltipWidth,
                backgroundColor: "#1f2937",
                padding: 6,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#22c55e",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.95,
              }}
            >
              {/* Arrow */}
              <View
                style={{
                  position: "absolute",
                  bottom: -6,
                  width: 0,
                  height: 0,
                  borderLeftWidth: 6,
                  borderRightWidth: 6,
                  borderTopWidth: 6,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderTopColor: "#1f2937",
                }}
              />

              <Text
                style={{ color: "#22c55e", fontSize: 10, fontWeight: "600" }}
              >
                {labels[hoverIndex]}
              </Text>
              <Text style={{ color: "#fff", fontSize: 12, fontWeight: "500" }}>
                {formatShort(values[hoverIndex])}
              </Text>
            </View>
          );
        }}
        style={{
          marginLeft: -20,
          marginRight: 0,
        }}
      />

      {/* Custom X-axis */}
    </View>
  );
}
