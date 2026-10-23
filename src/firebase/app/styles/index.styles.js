import { StyleSheet } from "react-native";

export default StyleSheet.create({
  hero: { width: "100%", backgroundColor: "#333333", justifyContent: "flex-end" },
  heroShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.2)" },
  welcome: { fontSize: 36, fontWeight: "800", color: "#ffffff", paddingHorizontal: 14, paddingBottom: 10, textShadowColor: "rgba(0,0,0,0.6)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  content: { paddingTop: 26, paddingBottom: 16 },
  form: { gap: 8 },
  label: { fontSize: 14, color: "#ffffff", letterSpacing: 1.8, marginBottom: 2 },
  input: { minHeight: 64, borderRadius: 11, backgroundColor: "#333333", paddingHorizontal: 24, paddingVertical: 14, fontSize: 20, color: "#ffffff", marginBottom: 10 },
  error: { color: "#ff9b9b", fontSize: 14, lineHeight: 20, marginBottom: 12 },
  button: { minHeight: 64, padding: 12, borderRadius: 11, backgroundColor: "#000000", borderWidth: 2, borderColor: "#FFBD59", justifyContent: "center", alignItems: "center", marginTop: 18 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#FFBD59", fontSize: 22, fontWeight: "800" },
  footer: { color: "#555555", fontSize: 16, textAlign: "center", marginTop: 32 },
});
