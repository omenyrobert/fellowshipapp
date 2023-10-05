import "react-native-gesture-handler"
import Navigation from "./src/Navigation";
import { AuthProvider } from "./src/context/Auth";
import { AppCtxProvider } from "./src/context/AppData";

export default function App() {
  return (
    <AuthProvider>
      <AppCtxProvider>
        <Navigation />
      </AppCtxProvider>
    </AuthProvider>
  );
}
