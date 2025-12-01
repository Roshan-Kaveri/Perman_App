import { Dimensions, Text, View } from "react-native";
import { ScrollView } from "react-native-web";
export default function StatChart() {
  const { width } = Dimensions.get("window");

  return (
    <View className="mt-10 h-[60%] w-full">
      <Text className="text-gray_xs font-serif text-[2rem]">Data Insights</Text>

      <ScrollView
        horizontal
        pagingEnabled // <-- makes it snap page by page
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        className="border-white border border-1 rounded-md mt-2"
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text
          style={{ width }}
          className="text-gray_xs  bg-slate-300 font-serif text-[2rem] text-center"
        >
          Data Insights
        </Text>

        <Text
          style={{ width }}
          className="text-gray_xs bg-slate-300 font-serif text-[2rem] text-center"
        >
          Second Slide
        </Text>
      </ScrollView>
    </View>
  );
}
