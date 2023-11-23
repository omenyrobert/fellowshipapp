import "react-native-gesture-handler"
import Navigation from "./src/Navigation";
import { AuthProvider } from "./src/context/Auth";
import { AppCtxProvider } from "./src/context/AppData";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor="#FF392B" />

      <AppCtxProvider>
        <Navigation />
      </AppCtxProvider>
    </AuthProvider>
  );
}
