import { useState } from "react";
import { LayoutAnimation, View } from "react-native";
import TransactionItem from "./TransactionItem";

export default function TransactionList({
  transactions = [],
  typeFilters,
  reqFilters,
  selectedMonth,
}) {
  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId(openId === id ? null : id);
  };

  const filtered = transactions.filter((tx) => {
    // -------------------------------
    // TYPE / REQ FILTERS
    // -------------------------------
    const typeKey = tx.type?.toLowerCase();
    const reqKey = tx.req?.toLowerCase();
    if (!typeKey || !reqKey) return false;

    if (!(typeFilters[typeKey] ?? true)) return false;
    if (!(reqFilters[reqKey] ?? true)) return false;

    // -------------------------------
    // DATE PARSE
    // -------------------------------
    const d = new Date(tx.date);
    const txMonth = d.getMonth();
    const txYear = d.getFullYear();

    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

    // -------------------------------
    // MONTH/YEAR FILTER LOGIC
    // -------------------------------
    switch (selectedMonth) {
      case "this_month":
        return txMonth === thisMonth && txYear === thisYear;

      case "last_month":
        return txMonth === lastMonth && txYear === lastMonthYear;

      case "2024":
      case "2023":
        return txYear === Number(selectedMonth);

      case "all": 
      default:
        return true;
    }
  });

  return (
    <View className="mt-6">
      {filtered.map((tx) => (
        <TransactionItem
          key={tx.id}
          item={tx}
          isOpen={openId === tx.id}
          onToggle={toggleOpen}
        />
      ))}
    </View>
  );
}
