import { Text, View } from "react-native";
import BissScreen from "../components/BissScreen";
export default function Screen() {
  return <BissScreen><View style={{ padding: 20, gap: 12 }}>
    <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>DOCUMENTOS</Text>
    <Text style={{ color: "#ffbd59" }}>La API actual todavía no expone /documentos.</Text>
    <Text style={{ color: "#bbb" }}>No se consultará una ruta inexistente ni se habilitará el guardado hasta implementar y validar el servicio.</Text>
  </View></BissScreen>;
}
