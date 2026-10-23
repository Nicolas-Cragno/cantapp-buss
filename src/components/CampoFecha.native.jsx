import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";
import { fechaParaBackend, fechaParaMostrar, leerFechaComprobante } from "../utils/fechaComprobante";

export default function CampoFecha({ value, onChange, disabled, style, textStyle, modalStyles }) {
  const [abierto, setAbierto] = useState(false);
  const fecha = leerFechaComprobante(value);
  const seleccionar = (_evento, seleccion) => {
    if (seleccion) onChange(fechaParaBackend(seleccion));
  };
  const abrir = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({ value: fecha ?? new Date(), mode: "date", display: "calendar", onValueChange: seleccionar });
    } else {
      setAbierto(true);
    }
  };
  return (
    <>
      <Pressable style={style} disabled={disabled} onPress={abrir} accessibilityRole="button" accessibilityLabel="Seleccionar fecha" accessibilityState={{ disabled }}>
        <Text style={textStyle}>{fecha ? fechaParaMostrar(fecha) : "Seleccionar fecha"}</Text>
      </Pressable>
      {Platform.OS !== "android" && (
        <Modal visible={abierto} transparent animationType="fade" onRequestClose={() => setAbierto(false)}>
          <View style={modalStyles.modalOverlay}>
            <View style={modalStyles.modalContent}>
              <DateTimePicker value={fecha ?? new Date()} mode="date" display="inline" themeVariant="dark" onValueChange={seleccionar} />
              <Pressable style={modalStyles.modalCloseButton} onPress={() => setAbierto(false)} accessibilityRole="button"><Text style={modalStyles.modalCloseText}>Listo</Text></Pressable>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}
