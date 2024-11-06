import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Insert } from "../screens/Insert";
import { Search } from "../screens/Search";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}
export type RootDrawerParamList = {
  Insert: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<RootDrawerParamList>();

export default function Router() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Insert" component={Insert} />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
