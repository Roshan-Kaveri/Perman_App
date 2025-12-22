// utils/confirmDelete.js
import { Alert } from "react-native";

export function ConfirmDelete({ onConfirm }) {
  Alert.alert(
    "Delete Transaction",
    "This action cannot be reverted. Are you sure?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onConfirm,
      },
    ],
    { cancelable: true }
  );
}
