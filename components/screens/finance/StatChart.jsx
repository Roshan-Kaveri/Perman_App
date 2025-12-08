import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import CategoryChart from "./charts/CategorySpendChart";
import FinanceStats from "./charts/FinanceStats";
import TimelineChart from "./charts/SpendTimelineChart";

export default function StatChart({
  transactions,
  selectedMonth,
  typeFilters,
  reqFilters,
}) {
  if (!transactions || transactions.length === 0) {
    return (
      <View className="mt-8">
        <Text className="text-white text-xl">No Insights Available</Text>
      </View>
    );
  }

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  function filterBySelectedRange(tx) {
    const d = new Date(tx.date);

    if (selectedMonth === "this_month") {
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }

    if (selectedMonth === "last_month") {
      const last = new Date(currentYear, currentMonth - 1, 1);
      return (
        d.getMonth() === last.getMonth() &&
        d.getFullYear() === last.getFullYear()
      );
    }

    if (selectedMonth === "all") return true;

    if (!isNaN(Number(selectedMonth))) {
      return d.getFullYear() === Number(selectedMonth);
    }

    return true;
  }

  // -----------------------------
  // FILTER TRANSACTIONS
  // -----------------------------
  let filtered = transactions.filter(filterBySelectedRange);

  filtered = filtered.filter((tx) => {
    const typeKey = tx.type?.toLowerCase();
    const reqKey = tx.req?.toLowerCase();

    const typeAllowed = typeFilters[typeKey] ?? true;
    const reqAllowed = reqFilters[reqKey] ?? true;

    return typeAllowed && reqAllowed;
  });

  if (!filtered.length) {
    return (
      <View className="mt-8">
        <Text className="text-white text-xl">No Insights Available</Text>
      </View>
    );
  }

  // -----------------------------
  // TIMELINE GROUPING
  // -----------------------------
  const today = new Date();
  const selectedYear =
    selectedMonth === "all" || !isNaN(Number(selectedMonth))
      ? selectedMonth === "all"
        ? today.getFullYear()
        : Number(selectedMonth)
      : today.getFullYear();

  const isYearMode = selectedMonth === "all" || !isNaN(Number(selectedMonth));

  let fullLabels = [];
  const timeline = {};

  const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (!isYearMode) {
    let targetYear = today.getFullYear();
    let targetMonth = today.getMonth();

    if (selectedMonth === "last_month") {
      const last = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      targetYear = last.getFullYear();
      targetMonth = last.getMonth();
    }

    const totalDays = new Date(targetYear, targetMonth + 1, 0).getDate();

    fullLabels = Array.from({ length: totalDays }, (_, i) => {
      const day = i + 1;

      if (
        selectedMonth === "this_month" &&
        targetYear === today.getFullYear() &&
        targetMonth === today.getMonth() &&
        day > today.getDate()
      ) {
        return null;
      }

      return String(day);
    }).filter(Boolean);

    fullLabels.forEach((d) => (timeline[d] = 0));
  } else {
    fullLabels = Array.from({ length: 12 }, (_, i) => {
      if (selectedYear === today.getFullYear() && i > today.getMonth()) {
        return null;
      }
      return {
        key: `${selectedYear}-${String(i + 1).padStart(2, "0")}`,
        label: MONTH_NAMES[i],
      };
    }).filter(Boolean);

    fullLabels.forEach((m) => (timeline[m.key] = 0));
  }

  filtered.forEach((t) => {
    const cleanDate = t.date.replace(/[^\d-]/g, "");
    const d = new Date(cleanDate);
    if (isNaN(d.getTime())) return;

    let key = isYearMode
      ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      : String(d.getDate());

    if (timeline[key] !== undefined) {
      timeline[key] += Number(t.amount) || 0;
    }
  });

  let timelineLabels, timelineValues;

  if (isYearMode) {
    timelineLabels = fullLabels.map((m) => m.label);
    timelineValues = fullLabels.map((m) => timeline[m.key]);
  } else {
    timelineLabels = fullLabels;
    timelineValues = fullLabels.map((d) => timeline[d]);
  }

  // -----------------------------
  // CATEGORY TOTALS
  // -----------------------------
  const categoryTotals = { high: 0, medium: 0, low: 0, avoidable: 0 };

  filtered.forEach((t) => {
    if (categoryTotals[t.req] !== undefined) {
      categoryTotals[t.req] += Number(t.amount);
    }
  });

  const categoryData = Object.keys(categoryTotals).map((key) => ({
    name: key,
    amount: Math.abs(categoryTotals[key]),
    color:
      key === "high"
        ? "#ef4444"
        : key === "medium"
          ? "#f59e0b"
          : key === "low"
            ? "#4ade80"
            : "#60a5fa",
  }));

  // -----------------------------
  // FINANCE STATS
  // -----------------------------
  let totalSpent = 0;
  let totalReceived = 0;

  filtered.forEach((t) => {
    const amt = Number(t.amount);
    if (amt < 0) totalSpent += Math.abs(amt);
    else totalReceived += amt;
  });

  // -----------------------------
  // CAROUSEL UI
  // -----------------------------
  const width = Dimensions.get("window").width;
  console.log("TX:", filtered);

  return (
    <View className="mt-8">
      <Text className="text-white text-2xl font-semibold mb-4">Insights</Text>

      <Carousel
        width={width - 50}
        height={320}
        loop={false}
        pagingEnabled
        scrollAnimationDuration={350}
        data={[0, 1, 2]}
        renderItem={({ index }) => (
          <View
            style={{
              width: width - 20,
              paddingVertical: 10,
            }}
          >
            {index === 1 && (
              <TimelineChart labels={timelineLabels} values={timelineValues} />
            )}
            {index === 2 && <CategoryChart data={categoryData} />}
            {index === 0 && (
              <FinanceStats
                totalSpent={totalSpent}
                totalReceived={totalReceived}
              />
            )}
          </View>
        )}
      />

      <View className="flex-row justify-center mt-3 gap-4">
        <Text className="text-gray-400 text-3xl">. . .</Text>
      </View>
    </View>
  );
}
