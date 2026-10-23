import { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import BissScreen from "../components/BissScreen";
import BussList from "../components/BussList";
import { AuthContext } from "../contexts/AuthContext";

export default function Screen() {
  const { user } = useContext(AuthContext);
  const [onlyMine, setOnlyMine] = useState(false);

  const area = String(user?.area || "").toLowerCase();

  const mine = (evento) => {
    const identificadores = [user?.nombre, user?.id, user?.dni].filter(Boolean);

    return identificadores.some(
      (valor) =>
        String(valor).toLowerCase() ===
        String(evento.usuario || "").toLowerCase(),
    );
  };

  const filtrarEventos = (evento) => {
    const mismaArea = String(evento.area || "").toLowerCase() === area;

    return mismaArea && (!onlyMine || mine(evento));
  };

  return (
    <BissScreen>
      <View style={{ padding: 12, gap: 8 }}>
        <Pressable
          onPress={() => setOnlyMine((actual) => !actual)}
          style={{
            padding: 12,
            borderWidth: 1,
            borderColor: "#ffbd59",
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#ffbd59" }}>
            {onlyMine ? "☑" : "☐"} Solo eventos cargados por mí
          </Text>
        </Pressable>
      </View>

      <BussList
        title="HISTORIAL"
        path="/eventos"
        filter={filtrarEventos}
        detail="/ficha-trabajo"
      />
    </BissScreen>
  );
}
