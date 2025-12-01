import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AISummary from "../../components/screens/finance/AISummary";
import FinHeader from "../../components/screens/finance/FinHeader";
import StatChart from "../../components/screens/finance/StatChart";

export default function FinScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <FinHeader />
        <AISummary />
        <StatChart />
      </ScrollView>
    </SafeAreaView>
  );
}
