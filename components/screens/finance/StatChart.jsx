import { Text, View } from "react-native";
import CategoryChart from "./charts/CategorySpendChart";
import FinanceStats from "./charts/FinanceStats";
import TimelineChart from "./charts/SpendTimelineChart";

export default function StatChart({ transactions, selectedMonth }) {
  if (!transactions || transactions.length === 0) {
    return (
      <View className="mt-8">
        <Text className="text-white text-xl">No Insights Available</Text>
      </View>
    );
  }

  console.log(selectedMonth, transactions);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // -----------------------------
  // FILTERING
  // -----------------------------
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

  const filtered = transactions.filter(filterBySelectedRange);

  if (!filtered || filtered.length === 0) {
    return (
      <View className="mt-8">
        <Text className="text-white text-xl">No Insights Available</Text>
      </View>
    );
  }

  // -----------------------------
  // TIMELINE GROUPING
  // -----------------------------
  // ---------------------------------------------------------
  // TIMELINE GROUPING WITH FULL RANGE + NO FUTURE DATES
  // ---------------------------------------------------------

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

  // ---------------------------
  // MONTH MODE → DAYS
  // ---------------------------
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

      // Remove future days
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

    // Initialize
    fullLabels.forEach((d) => (timeline[d] = 0));

    // ---------------------------
    // YEAR MODE → MONTHS
    // ---------------------------
  } else {
    fullLabels = Array.from({ length: 12 }, (_, i) => {
      const monthIndex = i;

      // stop at current month for current year
      if (
        selectedYear === today.getFullYear() &&
        monthIndex > today.getMonth()
      ) {
        return null;
      }

      return {
        key: `${selectedYear}-${String(monthIndex + 1).padStart(2, "0")}`, // internal key
        label: MONTH_NAMES[monthIndex], // x-axis label
      };
    }).filter(Boolean);

    // Initialize
    fullLabels.forEach((m) => (timeline[m.key] = 0));
  }

  // ---------------------------
  // FILL WITH REAL DATA
  // ---------------------------
  filtered.forEach((t) => {
    const cleanDate = t.date.replace(/[^\d-]/g, "");
    const d = new Date(cleanDate);

    if (isNaN(d.getTime())) return; // skip invalid dates

    let key = isYearMode
      ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      : String(d.getDate());

    // Only count if it exists in timeline
    if (timeline[key] !== undefined) {
      timeline[key] += Number(t.amount) || 0;
    }
  });

  // ---------------------------
  // FINAL LABELS + VALUES
  // ---------------------------
  let timelineLabels;
  let timelineValues;

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
    legendFontColor: "#fff",
    legendFontSize: 14,
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
  return (
    <View className="mt-8">
      <Text className="text-white text-2xl font-semibold mb-3">Insights</Text>

      <TimelineChart labels={timelineLabels} values={timelineValues} />

      <CategoryChart data={categoryData} />

      <FinanceStats totalSpent={totalSpent} totalReceived={totalReceived} />
    </View>
  );
}
