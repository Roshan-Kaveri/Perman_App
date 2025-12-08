import { Text, View } from "react-native";

export default function FinanceStats({ totalSpent, totalReceived }) {
  const net = totalReceived - totalSpent;

  return (
    <View className="bg-gray_xl h-full p-5  border border-gray-800">
      {/* Title */}
      <Text className="text-white text-3xl font-semibold mb-4">Overview</Text>

      {/* Spent */}
      <View className="mb-4">
        <Text className="text-gray-400 text-xs tracking-wide">TOTAL SPENT</Text>
        <Text className="text-red-400 text-3xl font-bold mt-1">
          ₹{totalSpent.toLocaleString()}
        </Text>
      </View>

      {/* Received */}
      <View className="mb-4">
        <Text className="text-gray-400 text-xs tracking-wide">
          TOTAL RECEIVED
        </Text>
        <Text className="text-green-400 text-3xl font-bold mt-1">
          ₹{totalReceived.toLocaleString()}
        </Text>
      </View>

      {/* Net Balance */}
      <View className="mt-2">
        <Text className="text-gray-400 text-xs tracking-wide">NET BALANCE</Text>
        <Text
          className={`text-3xl font-bold mt-1 ${
            net >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          ₹{net.toLocaleString()}
        </Text>
      </View>
    </View>
  );
}
