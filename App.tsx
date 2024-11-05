import React, { useEffect } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper'; // Importando o Provider do react-native-paper
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Home } from "lucide-react-native";
import HomeScreen from "./Pages/Home/Home";
import ProfileScreen from "./Pages/Profile/Profile";
import DetailsClientScreen from "./Pages/DetailsClient";
import SearchScreen from "./Pages/Search";
import SignInScreen from "./Pages/SignIn/SignInScreen";
import SignUpScreen from "./Pages/SignUp";
import TestePerson from "./Pages/TestePerson";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import ResultadoPerfil from "./Pages/ResultadoPerfil/ResultadoPerfil";
import * as Notifications from 'expo-notifications';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#B9B2D3",
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0,
          height: 60,
          overflow: "hidden",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailsClient"
            component={DetailsClientScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TestePerson"
            component={TestePerson}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResultadoPerfil"
            component={ResultadoPerfil}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          alert('Você precisa permitir notificações para usar este recurso!');
        }
      }
    };

    requestPermissions();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);

  return (
    <PaperProvider> 
      <NavigationContainer>
        <AuthProvider>
          <View style={styles.container}>
            <StatusBar backgroundColor="#000" translucent={true} />
            <RootNavigator />
          </View>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
