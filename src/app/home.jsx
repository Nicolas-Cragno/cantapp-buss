import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  ImageBackground,
  Modal,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import BissScreen from "../components/BissScreen";
import { AuthContext } from "../contexts/AuthContext";
import styles from "./styles/home.styles";

const CARDS = [
  {
    key: "stock",
    title: "REPUESTOS",
    action: "LISTADO DE REPUESTOS",
    route: "/stock",
    add: "/form-stock",
    image: require("../assets/images/deposito.png"),
  },

  {
    key: "trabajos",
    title: "TRABAJOS",
    action: "LISTADO DE TRABAJOS",
    route: "/trabajos",
    add: "/form-trabajo",
    image: require("../assets/images/registro.jpg"),
  },
  {
    key: "unidades",
    title: "UNIDADES",
    action: "LISTADO DE UNIDADES",
    route: "/unidades",
  },
  {
    key: "ajuste",
    title: "AJUSTE DE STOCK",
    action: "AJUSTE DE STOCK",
    route: "/ajuste-stock",
  },
  {
    key: "documentos",
    title: "DOCUMENTOS",
    action: "DOCUMENTOS",
    route: "/documentos",
    add: "/form-documento",
  },
];

export default function Home() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { user, persona, logout } = useContext(AuthContext);
  const [confirm, setConfirm] = useState(false);
  const area = String(user?.area || "").toLowerCase();
  const isWide = width >= 960;
  const columns = isWide ? 3 : width >= 680 ? 2 : 1;

  const unitTitle = area === "furgones" ? "FURGONES" : "TRACTORES";
  const cards = CARDS.map((card) =>
    card.key === "unidades"
      ? {
          ...card,
          title: unitTitle,
          action: `LISTADO DE ${unitTitle}`,
          image:
            area === "furgones"
              ? require("../assets/images/furgon.png")
              : require("../assets/images/tractor.png"),
        }
      : card,
  );

  const button = (label, route, plus = false) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => router.push(route)}
      style={[styles.cardButton, plus && styles.addButton]}
    >
      <Text style={[styles.cardButtonText, plus && styles.addText]}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <BissScreen
      contentStyle={[
        styles.content,
        { maxWidth: isWide ? 1200 : 760, paddingHorizontal: isWide ? 26 : 20 },
      ]}
      header={
        <ImageBackground
          source={require("../assets/images/rutaNoche.png")}
          resizeMode="cover"
          style={[
            styles.hero,
            {
              minHeight: isWide
                ? 330
                : Math.max(260, Math.min(height * 0.01, 440)),
            },
          ]}
        >
          <View style={styles.heroShade} />
          <Text style={styles.welcome}>¡Hola {persona?.nombres || ""}!</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Cerrar sesión"
            style={styles.logout}
            onPress={() => setConfirm(true)}
          >
            <Text style={styles.logoutText}>×</Text>
          </Pressable>
        </ImageBackground>
      }
    >
      <View style={styles.grid}>
        {cards.map((card) => (
          <View
            key={card.key}
            style={[
              styles.cardWrapper,
              {
                width:
                  columns === 1 ? "100%" : columns === 2 ? "48.5%" : "31.8%",
              },
            ]}
          >
            {card.image ? (
              <ImageBackground
                source={card.image}
                resizeMode="cover"
                imageStyle={styles.cardImage}
                style={styles.card}
              >
                <View style={styles.cardShade} />
                <Text style={styles.cardTitle}>{card.title}</Text>
                <View style={styles.cardActions}>
                  {button(card.action, card.route)}
                  {card.add ? button("+", card.add, true) : null}
                </View>
              </ImageBackground>
            ) : (
              <View style={styles.plainCard}>
                {button(card.action, card.route)}
                {card.add ? button("+", card.add, true) : null}
              </View>
            )}
          </View>
        ))}
      </View>
      <Modal
        visible={confirm}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirm(false)}
      >
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
                onPress={() => {
                  setConfirm(false);
                  logout();
                }}
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
