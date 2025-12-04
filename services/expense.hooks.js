import { useEffect, useState } from "react";
import { getExpenses } from "../api/expense.api";

export default function useExpenses(userId = 1, refresh) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await getExpenses(userId);
        setExpenses(res.data);
      } catch (err) {
        console.error("Error loading expenses:", err);
      }
    }

    load();
  }, [userId, refresh]);

  return expenses;
}
