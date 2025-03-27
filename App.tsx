// App.tsx - Entry Point
import { Slot } from "expo-router";
import { Provider } from "react-redux";

import { View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import {store} from "./src/store/store";


export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
        <View>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
    );
  }

  return (
      <Provider store={store}>
        <Slot />
      </Provider>
  );
}
