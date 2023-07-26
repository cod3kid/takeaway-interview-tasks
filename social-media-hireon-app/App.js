import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import store from "./app/redux/store";
import { Provider } from "react-redux";
import LoginScreen from "./app/screens/LoginScreen";
import MainNavigator from "./app/navigators/MainNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
