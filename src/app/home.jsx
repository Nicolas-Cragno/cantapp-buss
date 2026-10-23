import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { ImageBackground, Modal, Pressable, Text, View } from "react-native";
import BissScreen from "../components/BissScreen";
import { AuthContext } from "../contexts/AuthContext";
import styles from "./styles/home.styles";
export default function Home() {
  const router = useRouter();
  const { user, persona, logout } = useContext(AuthContext);
  const [confirm, setConfirm] = useState(false);
  const area = String(user?.area || "tractores").toLowerCase();
  const items = [
    ["LISTADO DE REPUESTOS", "/stock", "/form-stock"],
    ["AJUSTE DE STOCK", "/ajuste-stock"],
    ["HISTORIAL DE REGISTROS", "/trabajos", "/form-trabajo"],
    [
      area === "furgones" ? "LISTADO DE FURGONES" : "LISTADO DE TRACTORES",
      "LISTADO DE UNIDADES",
    ],
    ["DOCUMENTOS", "/documentos", "/form-documento"],
  ];
  return (
    <BissScreen
      header={
        <ImageBackground
          source={require("../assets/images/tools.png")}
          style={[styles.hero, { minHeight: 240 }]}
          resizeMode="cover"
        >
          <View style={styles.heroShade} />
          <Text style={styles.welcome}>¡Hola {persona?.nombres || ""}!</Text>
          <Text
            style={{
              color: "#ffbd59",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            BUSS · TALLER {area.toUpperCase()}
          </Text>
          <Pressable style={styles.logout} onPress={() => setConfirm(true)}>
            <Text style={styles.logoutText}>×</Text>
          </Pressable>
        </ImageBackground>
      }
    >
      <View style={{ gap: 12, marginTop: 18 }}>
        {items.map(([name, route, add]) => (
          <View key={name} style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              onPress={() => router.push(route)}
              style={[styles.button, { flex: 1, minHeight: 70 }]}
            >
              <Text style={styles.buttonText}>{name}</Text>
            </Pressable>
            {add && (
              <Pressable
                onPress={() => router.push(add)}
                style={[styles.button, { width: 68, minHeight: 70 }]}
              >
                <Text style={styles.buttonText}>+</Text>
              </Pressable>
            )}
          </View>
        ))}
      </View>
      <Modal visible={confirm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Cerrar sesión</Text>
            <Text style={styles.modalText}>¿Querés salir de BUSS?</Text>
            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setConfirm(false)}
                style={styles.modalCancelButton}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={() => logout()}
                style={styles.modalConfirmButton}
              >
                <Text style={styles.modalConfirmText}>Salir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </BissScreen>
  );
}
