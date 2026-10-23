import { useEffect, useState } from "react";
import { Animated, Easing, Keyboard, Modal, StyleSheet, useWindowDimensions, View } from "react-native";

export default function LoadingOverlay({ visible = false }) {
  const [scale] = useState(() => new Animated.Value(1));
  const { width, height } = useWindowDimensions();
  const logoSize = Math.min(width * 0.65, height * 0.4, 280);

  useEffect(() => {
    if (!visible) return;
    Keyboard.dismiss();
    scale.setValue(1);
    const pulse = Animated.loop(Animated.sequence([
      Animated.timing(scale, { toValue: 1.1, duration: 800, easing: Easing.inOut(Easing.sin), useNativeDriver: true, isInteraction: false }),
      Animated.timing(scale, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.sin), useNativeDriver: true, isInteraction: false }),
    ]));
    pulse.start();
    return () => {
      pulse.stop();
      scale.setValue(1);
    };
  }, [visible, scale]);

  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent navigationBarTranslucent onRequestClose={() => {}}>
      <View style={styles.overlay} accessible accessibilityLabel="Cargando, esperá un momento" accessibilityState={{ busy: true }} accessibilityViewIsModal>
        <Animated.Image
          source={require("../assets/logos/logoPrincipal.png")}
          resizeMode="contain"
          style={{ width: logoSize, height: logoSize, transform: [{ scale }] }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
});
