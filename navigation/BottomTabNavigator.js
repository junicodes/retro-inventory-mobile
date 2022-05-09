// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import InsuranceScreen from "../screens/InsuranceScreen";
import InventoryScreen from "../screens/InventoryScreen";
import SearchScreen from "../screens/SearchScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Inventory"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint, headerShown: false }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Insurance"
        component={InsuranceScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="umbrella" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="folder" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="feature-search-outline" color={color} />
          ),
        }}
      />
      
      <BottomTab.Screen
        name="Menu"
        component={InventoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="menu" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
    
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}