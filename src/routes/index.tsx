import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Insert } from "../screens/Insert";
import { Search } from "../screens/Search";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "../styledComponents/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Family } from "../screens/Family";

export type RootStackParamList = {
  Family: { objFirstSearch: { [key: string]: any } };
  ProcurarStack: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function SearchStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProcurarStack"
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerShadowVisible: false,
        // headerTransparent: true
        // headerLargeTitleStyle: { fontSize: 5 },
      }}
    >
      <Stack.Screen name="ProcurarStack" component={Search} />
      <Stack.Screen name="Family" component={Family} />
    </Stack.Navigator>
  );
}
export type RootDrawerParamList = {
  Inserir: undefined;
  Procurar: undefined;
};

const Tab = createBottomTabNavigator<RootDrawerParamList>();

export default function Router() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          // tabBarActiveTintColor: theme.colors.primary,
        }}
      >
        <Tab.Screen
          name="Procurar"
          component={SearchStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <AntDesign name="search1" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Inserir"
          component={Insert}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons
                name="insert-chart-outlined"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
