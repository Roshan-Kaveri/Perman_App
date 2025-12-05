import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View, ActivityIndicator } from "react-native";
import { getMonthlySummary, getYearlySummary } from "../../../api/ai.api";
import Markdown from "react-native-markdown-display";

export default function AISummary({ selectedMonth }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  function parseSelection() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // ----- CASE 1: This month -----
    if (selectedMonth === "this_month") {
      return { type: "month", year: currentYear, month: currentMonth };
    }

    // ----- CASE 2: Last month -----
    if (selectedMonth === "last_month") {
      let month = currentMonth - 1;
      let year = currentYear;

      if (month === 0) {
        month = 12;
        year -= 1;
      }

      return { type: "month", year, month };
    }

    // ----- CASE 3: User selected a full year -----
    if (String(selectedMonth).length === 4) {
      return { type: "year", year: Number(selectedMonth) };
    }

    // ----- CASE 4: User selected a specific month number -----
    return { type: "month", year: currentYear, month: Number(selectedMonth) };
  }

  useEffect(() => {
    const loadSummary = async () => {
      setLoading(true);
      const sel = parseSelection();

      try {
        let res;

        if (sel.type === "month") {
          res = await getMonthlySummary(1, sel.year, sel.month);
        } else {
          res = await getYearlySummary(1, sel.year);
        }

        setSummary(res.data.summary ?? "No AI insights available.");
      } catch (error) {
        console.log("AI Summary error:", error);
        setSummary("AI summary unavailable.");
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, [selectedMonth]);

  return (
    <View className="border-white border border-1 rounded-md mt-10 p-3">
      <View className="flex flex-row pb-2">
        <Ionicons name="sparkles-outline" size={18} color="#DEE2E6" />
        <Text className="pl-2 text-gray_xs">AI Summary</Text>
      </View>

      <View className="h-1 bg-white w-full" />

      {loading ? (
        <ActivityIndicator color="#DEE2E6" style={{ marginTop: 20 }} />
      ) : (
        // <Text className="mt-2 text-gray_md text-justify">{summary}</Text>
        <Markdown
          style={{
            body: { color: "#ADB5BD", fontSize: 15 },
            heading1: { color: "white" },
            strong: { color: "white" },
          }}
        >
          {summary}
        </Markdown>
      )}
    </View>
  );
}
