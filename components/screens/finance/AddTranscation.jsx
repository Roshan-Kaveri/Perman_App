import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { Pressable, Text, TextInput, Vibration, View } from "react-native";
import { addExpense } from "../../../api/expense.api";

const TYPE_OPTIONS = ["Food", "Rent", "Fun", "EMI", "Investment"];
const CATEGORY_OPTIONS = ["High", "Medium", "Low", "Avoidable"];

export default function AddTransactionForm({ setRefresh, setFormOpen }) {
  const [typeOpen, setTypeOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [transactionType, setTransactionType] = useState("expense");

  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");

  async function handleAdd() {
    try {
      if (!price || !selectedType || !selectedCategory || !note.trim()) {
        Vibration.vibrate(40); // small error feedback
        return;
      }

      let finalPrice = Number(price);

      if (transactionType === "expense") {
        finalPrice = -Math.abs(finalPrice);
      } else {
        finalPrice = Math.abs(finalPrice);
      }

      await addExpense({
        userId: "1",
        amount: finalPrice,
        type: selectedType,
        note: note,
        date: new Date().toISOString().split("T")[0], // yyyy-mm-dd
        req: selectedCategory?.toLowerCase(),
      });

      console.log("Expense added!");
      Vibration.vibrate(30);

      // OPTIONAL: Clear fields
      setPrice("");
      setNote("");
      setSelectedType(null);
      setSelectedCategory(null);
      setTypeOpen(false);
      setCatOpen(false);
      setRefresh((prev) => !prev);
      setFormOpen(false);
    } catch (err) {
      console.log("Add error:", err);
    }
  }

  return (
    <View className="bg-gray_xl border border-gray_sm p-4">
      {/* PRICE */}
      {/* TYPE OF TRANSACTION: EXPENSE / INCOME */}
      <View className="flex-row mb-3 gap-2">
        <Pressable
          onPress={() => setTransactionType("expense")}
          className={`flex-1 p-2 rounded-sm border ${
            transactionType === "expense"
              ? "bg-red-500 border-red-600"
              : "bg-gray_xs border-gray-400"
          }`}
        >
          <Text
            className={`text-center ${
              transactionType === "expense" ? "text-white" : "text-gray-700"
            }`}
          >
            EXPENSE
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setTransactionType("income")}
          className={`flex-1 p-2 rounded-sm border ${
            transactionType === "income"
              ? "bg-green-500 border-green-600"
              : "bg-gray_xs border-gray-400"
          }`}
        >
          <Text
            className={`text-center ${
              transactionType === "income" ? "text-white" : "text-gray-700"
            }`}
          >
            INCOME
          </Text>
        </Pressable>
      </View>

      <Text className="text-gray_xs mb-1 font-semibold text-xs">PRICE</Text>
      <TextInput
        placeholder="0"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        className="bg-gray_xs p-2 border border-gray-400 rounded-sm mb-3 text-gray-800"
      />

      {/* TYPE */}
      <Text className="text-gray_xs mb-1 font-semibold text-xs">TYPE</Text>

      <Pressable
        onPress={() => setTypeOpen(!typeOpen)}
        className="bg-gray_xs border border-gray-400 rounded-sm p-2 mb-1 flex-row justify-between items-center"
      >
        <Text className="text-gray-600">{selectedType || "Select type"}</Text>
        <Feather
          name={typeOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#555"
        />
      </Pressable>

      {typeOpen && (
        <View className="bg-gray_xs border border-gray-400 rounded-sm mb-3">
          {TYPE_OPTIONS.map((opt) => (
            <Pressable
              key={opt}
              onPress={() => {
                setSelectedType(opt);
                setTypeOpen(false);
              }}
              className="p-2 border-b border-gray-300"
            >
              <Text className="text-gray-700">{opt}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* CATEGORY */}
      <Text className="text-gray_xs mb-1 font-semibold text-xs">CATEGORY</Text>

      <Pressable
        onPress={() => setCatOpen(!catOpen)}
        className="bg-gray_xs border border-gray-400 rounded-sm p-2 mb-1 flex-row justify-between items-center"
      >
        <Text className="text-gray-600">
          {selectedCategory || "Select category"}
        </Text>
        <Feather
          name={catOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#555"
        />
      </Pressable>

      {catOpen && (
        <View className="bg-gray_xs border border-gray-400 rounded-sm mb-3">
          {CATEGORY_OPTIONS.map((opt) => (
            <Pressable
              key={opt}
              onPress={() => {
                setSelectedCategory(opt);
                setCatOpen(false);
              }}
              className="p-2 border-b border-gray-300"
            >
              <Text className="text-gray-700">{opt}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* NOTE */}
      <Text className="text-gray_xs mb-1 font-semibold text-xs">NOTE</Text>
      <TextInput
        placeholder="Add a note..."
        multiline
        value={note}
        onChangeText={setNote}
        className="bg-gray_xs h-20 p-2 border border-gray-400 rounded-sm text-gray-800"
      />

      {/* ADD BUTTON */}
      <Pressable
        onPress={handleAdd}
        className={` p-3 rounded-sm mt-4 ${
          transactionType === "income"
            ? "bg-green-500 border-green-600"
            : "bg-red-500 border-red-600"
        }`}
      >
        <Text className="text-center text-white  font-semibold ">ADD</Text>
      </Pressable>
    </View>
  );
}
