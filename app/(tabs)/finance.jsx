// screens/finance/FinScreen.jsx
import { useState } from "react";
import { LayoutAnimation, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import AddTransactionForm from "../../components/screens/finance/AddTranscation";
import AISummary from "../../components/screens/finance/AISummary";
import FilterButton from "../../components/screens/finance/FilterButton";
import FilterDropdown from "../../components/screens/finance/FilterDropdown";
import FinHeader from "../../components/screens/finance/FinHeader";
import MonthSelector from "../../components/screens/finance/MonthSelector";
import StatChart from "../../components/screens/finance/StatChart";
import TransactionList from "../../components/screens/finance/TransactionList";

import { Alert } from "react-native";
import { deleteTransaction } from "../../api/expense.api";
import useExpenses from "../../services/expense.hooks";

// Enable animations on Android

export default function FinScreen() {
  // -------------------------------
  // STATE
  // -------------------------------
  const [selectedMonth, setSelectedMonth] = useState("this_month");
  const [refresh, setRefresh] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const expenses = useExpenses(1, refresh);

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

  const selectedCount =
    Object.values(typeFilters).filter(Boolean).length +
    Object.values(reqFilters).filter(Boolean).length;

  // -------------------------------
  // DELETE HANDLER (CONFIRMED)
  // -------------------------------
  const onDeleteTransaction = (transactionId) => {
    Alert.alert(
      "Delete Transaction",
      "This action cannot be reverted. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTransaction(transactionId);
              setRefresh((p) => !p);
            } catch (err) {
              console.error("Delete failed:", err);
            }
          },
        },
      ]
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER + ADD FORM */}
          <FinHeader open={formOpen} setOpen={setFormOpen} />
          {formOpen && (
            <AddTransactionForm
              setRefresh={setRefresh}
              setFormOpen={setFormOpen}
            />
          )}

          {/* AI SUMMARY */}
          <AISummary selectedMonth={selectedMonth} refresh={refresh} />

          {/* MONTH SELECTOR */}
          <MonthSelector
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />

          {/* FILTER BUTTON */}
          <FilterButton
            selectedCount={selectedCount}
            open={filterOpen}
            setOpen={(v) => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              setFilterOpen(v);
            }}
          />

          {/* FILTER DROPDOWN */}
          {filterOpen && (
            <FilterDropdown
              typeFilters={typeFilters}
              reqFilters={reqFilters}
              toggleTypeFilter={toggleTypeFilter}
              toggleReqFilter={toggleReqFilter}
            />
          )}

          {/* STATS */}
          <StatChart
            transactions={expenses}
            typeFilters={typeFilters}
            reqFilters={reqFilters}
            selectedMonth={selectedMonth}
          />

          {/* TRANSACTIONS */}
          <TransactionList
            transactions={expenses}
            typeFilters={typeFilters}
            reqFilters={reqFilters}
            selectedMonth={selectedMonth}
            onDelete={onDeleteTransaction}
          />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
