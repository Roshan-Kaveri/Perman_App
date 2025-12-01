import { useState } from "react";
import { LayoutAnimation, View } from "react-native";
import TransactionItem from "./TransactionItem";

export default function TransactionList({
  transactions = [],
  typeFilters,
  reqFilters,
}) {
  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId(openId === id ? null : id);
  };

  const filtered = transactions.filter((tx) => {
    const typeKey = tx.type?.toLowerCase();
    const reqKey = tx.req?.toLowerCase();
    if (!typeKey || !reqKey) return false;

    return (typeFilters[typeKey] ?? true) && (reqFilters[reqKey] ?? true);
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
