// import { Dimensions, Text, View } from "react-native";
// import PagerView from "react-native-pager-view";

// export default function StatChart() {
//   const { width, height } = Dimensions.get("window");
//   const chartHeight = height * 0.35; // fixed height

//   return (
//     <View className="mt-10" style={{ height: chartHeight }}>
//       <Text className="text-gray_xs font-serif text-[2rem]">Data Insights</Text>

//       <PagerView
//         style={{
//           flex: 1,
//           marginTop: 10,
//           borderWidth: 1,
//           borderColor: "white",
//           borderRadius: 10,
//           overflow: "hidden",
//         }}
//         initialPage={0}
//       >
//         {/* Slide 1 */}
//         <View
//           key="1"
//           style={{
//             width: width - 40,
//             height: chartHeight - 50,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Text className="text-gray_xs font-serif text-[2rem] text-center">
//             Data Insights
//           </Text>
//         </View>

//         {/* Slide 2 */}
//         <View
//           key="2"
//           style={{
//             width: width - 40,
//             height: chartHeight - 50,
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "#94a3b8", // slate-300
//           }}
//         >
//           <Text className="text-gray_xs font-serif text-[2rem] text-center">
//             Second Slide
//           </Text>
//         </View>
//       </PagerView>
//     </View>
//   );
// }
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function StatChart() {
  const { width, height } = Dimensions.get("window");
  const chartHeight = height * 0.35;

  return (
    <View style={{ marginTop: 40, width: "100%", height: chartHeight }}>
      <Text className="text-gray_xs font-serif text-[2rem]">Data Insights</Text>

      <Carousel
        width={width - 40}
        height={chartHeight - 50}
        data={["Slide 1", "Slide 2"]}
        renderItem={({ item }) => (
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="text-gray_xs font-serif text-[2rem] text-center">
              {item}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
