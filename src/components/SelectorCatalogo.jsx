import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import styles from "../app/styles/comprobante.styles";
import {
  descripcionVehiculo,
  normalizarBusqueda,
  ubicacionEstacion,
} from "../utils/catalogosComprobante";

export default function SelectorCatalogo({
  titulo,
  placeholder,
  seleccionado,
  items,
  etiqueta,
  textoBusqueda = etiqueta,
  onSelect,
  disabled,
  error,
  onRetry,
  vacio,
  buscarPlaceholder,
  mostrarEstacion = false,
}) {
  const [visible, setVisible] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const filtrados = items.filter((item) =>
    normalizarBusqueda(textoBusqueda(item)).includes(
      normalizarBusqueda(busqueda),
    ),
  );
  return (
    <>
      <Pressable
        style={[styles.input, styles.selectorField]}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={titulo}
        accessibilityState={{ disabled }}
        onPress={() => {
          setBusqueda("");
          setVisible(true);
        }}
      >
        <Text style={[styles.inputText, styles.selectorValue]}>
          {seleccionado ? etiqueta(seleccionado) : placeholder}
        </Text>
        <Text style={styles.selectorArrow}>+</Text>
      </Pressable>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{titulo}</Text>
            <TextInput
              style={[styles.input, styles.catalogSearch]}
              value={busqueda}
              onChangeText={setBusqueda}
              placeholder={buscarPlaceholder}
              accessibilityLabel={buscarPlaceholder}
              placeholderTextColor="#aaaaaa"
              selectionColor="#FFBD59"
              autoCorrect={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
            />
            {error ? (
              <>
                <Text style={styles.error} accessibilityRole="alert">
                  {error}
                </Text>
                {onRetry ? (
                  <Pressable
                    style={styles.modalCloseButton}
                    onPress={onRetry}
                    accessibilityRole="button"
                  >
                    <Text style={styles.modalCloseText}>Reintentar</Text>
                  </Pressable>
                ) : null}
              </>
            ) : (
              <FlatList
                keyboardShouldPersistTaps="handled"
                style={styles.vehicleList}
                data={filtrados}
                keyExtractor={(item) => String(item.id)}
                ListEmptyComponent={
                  <Text style={styles.modalMessage}>
                    {items.length
                      ? "No hay coincidencias para la búsqueda."
                      : vacio}
                  </Text>
                }
                renderItem={({ item }) => (
                  <Pressable
                    style={[
                      styles.vehicleOption,
                      String(item.id) === String(seleccionado?.id) &&
                        styles.catalogSelected,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={etiqueta(item)}
                    accessibilityState={{
                      selected: String(item.id) === String(seleccionado?.id),
                    }}
                    onPress={() => {
                      onSelect(item);
                      setVisible(false);
                    }}
                  >
                    {mostrarEstacion ? (
                      <View style={styles.stationOption}>
                        <Text style={styles.stationId}>{item.id}</Text>
                        <Text style={styles.vehicleText}>
                          {item.establecimiento ?? ""}
                        </Text>
                        {ubicacionEstacion(item) ? (
                          <Text style={styles.stationLocality}>
                            {ubicacionEstacion(item)}
                          </Text>
                        ) : null}
                      </View>
                    ) : (
                      <View style={styles.stationOption}>
                        <Text style={styles.vehicleText}>{item.dominio}</Text>
                        {descripcionVehiculo(item) ? (
                          <Text style={styles.stationLocality}>
                            {descripcionVehiculo(item)}
                          </Text>
                        ) : null}
                      </View>
                    )}
                  </Pressable>
                )}
              />
            )}
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setVisible(false)}
              accessibilityRole="button"
            >
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
