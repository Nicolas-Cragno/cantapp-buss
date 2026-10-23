import { Stack } from "expo-router";
import { useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import LoadingOverlay from "../components/LoadingOverlay";
function Navigator() {
  const { firebaseUser, loading } = useContext(AuthContext);
  return <>
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#000" } }}>
      <Stack.Protected guard={!firebaseUser}><Stack.Screen name="index" /></Stack.Protected>
      <Stack.Protected guard={!!firebaseUser}>
        <Stack.Screen name="home" />
        <Stack.Screen name="stock" />
        <Stack.Screen name="ficha-stock" />
        <Stack.Screen name="ficha-trabajo" />
        <Stack.Screen name="ficha-unidad" />
        <Stack.Screen name="ficha-documento" />
        <Stack.Screen name="ajuste-stock" />
        <Stack.Screen name="trabajos" />
        <Stack.Screen name="unidades" />
        <Stack.Screen name="historial" />
        <Stack.Screen name="documentos" />
        <Stack.Screen name="form-stock" />
        <Stack.Screen name="form-trabajo" />
        <Stack.Screen name="form-documento" />
        <Stack.Screen name="scanner" />
      </Stack.Protected>
    </Stack>
    <LoadingOverlay visible={loading} />
  </>;
}
export default function RootLayout() { return <SafeAreaProvider><AuthProvider><Navigator /></AuthProvider></SafeAreaProvider>; }
