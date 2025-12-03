import { useState } from "react";
import { LayoutAnimation, Platform, ScrollView, UIManager } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AISummary from "../../components/screens/finance/AISummary";
import FinHeader from "../../components/screens/finance/FinHeader";
import MonthSelector from "../../components/screens/finance/MonthSelector";
import TransactionList from "../../components/screens/finance/TransactionList";

import AddTransactionForm from "../../components/screens/finance/AddTranscation";
import FilterButton from "../../components/screens/finance/FilterButton";
import FilterDropdown from "../../components/screens/finance/FilterDropdown";
import StatChart from "../../components/screens/finance/StatChart";

// Enable animations on Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function FinScreen() {
  const [selectedMonth, setSelectedMonth] = useState("this_month");

  // -------------------------------
  // TYPE FILTERS
  // -------------------------------
  const [typeFilters, setTypeFilters] = useState({
    food: true,
    rent: true,
    fun: true,
    emi: true,
    investment: true,
  });

  const toggleTypeFilter = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTypeFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // -------------------------------
  // REQUIREMENT FILTERS
  // -------------------------------
  const [reqFilters, setReqFilters] = useState({
    high: true,
    medium: true,
    low: true,
    avoidable: true,
  });

  const toggleReqFilter = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setReqFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Combined count for button
  const selectedCount =
    Object.values(typeFilters).filter(Boolean).length +
    Object.values(reqFilters).filter(Boolean).length;

  // -------------------------------
  // Dropdown open/close
  // -------------------------------
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleFilterOpen = (v) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFilterOpen(v);
  };
  const [formOpen, setFormOpen] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <FinHeader open={formOpen} setOpen={setFormOpen} />
        {formOpen && <AddTransactionForm />}

        <AISummary selectedMonth={selectedMonth} />

        <MonthSelector
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        {/* FILTER BUTTON */}
        <FilterButton
          selectedCount={selectedCount}
          open={filterOpen}
          setOpen={toggleFilterOpen}
        />

        {/* DROPDOWN PANEL */}
        {filterOpen && (
          <FilterDropdown
            typeFilters={typeFilters}
            reqFilters={reqFilters}
            toggleTypeFilter={toggleTypeFilter}
            toggleReqFilter={toggleReqFilter}
          />
        )}
        <StatChart></StatChart>

        <TransactionList
          transactions={[
            {
              id: 1,
              amount: 9.99,
              type: "Food",
              note: "Lunch",
              date: "2025-12-25",
              req: "high",
            },
            {
              id: 2,
              amount: -15.99,
              type: "Rent",
              note: "Monthly rent",
              date: "2025-12-25",
              req: "medium",
            },
            {
              id: 3,
              amount: 22.5,
              type: "Fun",
              note: "Bowling",
              date: "2024-12-25",
              req: "low",
            },
          ]}
          typeFilters={typeFilters}
          reqFilters={reqFilters}
          selectedMonth={selectedMonth}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
