import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LoadingOverlay from "./LoadingOverlay";

export default function BissScreen({ children, header, contentStyle, loading = false }) {
  const { width } = useWindowDimensions();
  const { loading: sessionLoading } = useContext(AuthContext);
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.screen}>
        <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {header}
            <View style={[styles.content, { paddingHorizontal: width < 360 ? 24 : 34 }, contentStyle]}>{children}</View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <LoadingOverlay visible={loading && !sessionLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scroll: {
    flexGrow: 1,
  },
  content: {
    width: "100%",
    maxWidth: 620,
    alignSelf: "center",
    paddingTop: 12,
    paddingBottom: 24,
  },
});
