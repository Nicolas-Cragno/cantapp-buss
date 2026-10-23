import { useRef, useState } from "react";
import {
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BissScreen from "../components/BissScreen";
import { login } from "../services/auth.service";
import styles from "./styles/index.styles";

export default function Login() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);

  const handleLogin = async () => {
    if (submitting.current) return;

    submitting.current = true;
    setIsLoading(true);
    setError("");

    try {
      await login(dni, password);
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setError("Usuario o contraseña incorrectos");
    } finally {
      submitting.current = false;
      setIsLoading(false);
    }
  };

  return (
    <BissScreen
      contentStyle={styles.content}
      header={
        <ImageBackground
          source={require("../assets/images/mecanico.png")}
          resizeMode="cover"
          style={[
            styles.hero,
            { minHeight: (height - insets.top - insets.bottom) * 0.56 },
          ]}
        >
          <View style={styles.heroShade} />
          <Text style={styles.welcome}>Bienvenido</Text>
        </ImageBackground>
      }
    >
      <View style={styles.form}>
        <Text style={styles.label}>USUARIO</Text>

        <TextInput
          style={styles.input}
          accessibilityLabel="Usuario (DNI)"
          selectionColor="#FFBD59"
          autoCapitalize="none"
          keyboardType="number-pad"
          value={dni}
          onChangeText={(value) => setDni(value.replace(/\D/g, ""))}
          underlineColorAndroid="transparent"
        />

        <Text style={styles.label}>CLAVE</Text>

        <TextInput
          style={styles.input}
          accessibilityLabel="Clave"
          selectionColor="#FFBD59"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          underlineColorAndroid="transparent"
        />

        {error ? (
          <Text style={styles.error} accessibilityRole="alert">
            {error}
          </Text>
        ) : null}
      </View>

      <Pressable
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
        accessibilityRole="button"
        accessibilityState={{ disabled: isLoading, busy: isLoading }}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "INGRESANDO..." : "INGRESAR"}
        </Text>
      </Pressable>
      <Text style={styles.footer}>@GEBBDEV</Text>
    </BissScreen>
  );
}
