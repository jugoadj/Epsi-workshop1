import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./src/screen/HomeScreen";
import LoginScreen from "./src/screen/Login";
import SignupScreen from "./src/screen/SignUp";
import ValidationCode from "./src/screen/ValidationCode";
import RendezVous from "./src/screen/RendezVous.jsx";
import Traitement from "./src/screen/Traitement";
import Profile from "./src/screen/Profile";
import Medicament from "./src/screen/Medicament";
import apresLogin from "./src/screen/ApresLogin";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"HOME"} component={HomeScreen} />
        <Stack.Screen name={"LOGIN"} component={LoginScreen} />
        <Stack.Screen name="SIGNUP" component={SignupScreen} />
        <Stack.Screen name="VALIDATION_CODE" component={ValidationCode} />
         <Stack.Screen name="MEDICAMENT" component={Medicament} />
         <Stack.Screen name="APRESLOGIN" component={apresLogin} />
        {/* <Stack.Screen name="RENDEZVOUS" component={RendezVous} />
        <Stack.Screen name="TRAITEMENT" component={Traitement} />
        <Stack.Screen name="PROFILE" component={Profile} />  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
