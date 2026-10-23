import { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import BussList from "../components/BussList";
import { AuthContext } from "../contexts/AuthContext";

export default function Screen() {
  const { user } = useContext(AuthContext);
  const [onlyMine, setOnlyMine] = useState(false);
  const area = String(user?.area || "").toLowerCase();
  const identifiers = [user?.nombre, user?.id, user?.dni, user?.email]
    .filter(Boolean)
    .map((value) => String(value).trim().toLowerCase());
  const mine = (event) =>
    identifiers.includes(
      String(event.usuario || "")
        .trim()
        .toLowerCase(),
    );
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
        <Pressable
          onPress={() => setOnlyMine((value) => !value)}
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
      {area ? (
        <BussList
          title=""
          path={`/eventos/${encodeURIComponent(area)}`}
          filter={(event) =>
            String(event.area || "").toLowerCase() === area &&
            (!onlyMine || mine(event))
          }
          detail="/ficha-trabajo"
        />
      ) : (
        <Text style={{ color: "#fff", padding: 20 }}>
          Usuario sin área asignada.
        </Text>
      )}
    </View>
  );
}
