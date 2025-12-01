import { Tabs } from "expo-router";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"; // Replace: import { DollarOutlined } from "@ant-design/icons";
import Foundation from "@expo/vector-icons/Foundation";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,

        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: "#212529",
        },
        tabBarIconStyle: {
          marginTop: 6, // adjust until perfectly centered
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="finance"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="money-bill-trend-up" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="todo"
        options={{
          title: "ToDo",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="list-alt" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="options"
        options={{
          title: "moreScreen",
          tabBarIcon: ({ color }) => (
            <Foundation name="indent-more" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
