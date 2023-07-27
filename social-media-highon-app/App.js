import { StyleSheet } from "react-native";
import AuthContextProvider from "./app/store/auth-context";
import MainNavigator from "./app/navigators/MainNavigator";

export default function App() {
  return (
    <AuthContextProvider>
      <MainNavigator />
    </AuthContextProvider>
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
