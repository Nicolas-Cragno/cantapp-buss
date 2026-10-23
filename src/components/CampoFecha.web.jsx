import { fechaParaBackend, leerFechaComprobante } from "../utils/fechaComprobante";

export default function CampoFecha({ value, onChange, disabled }) {
  const fecha = leerFechaComprobante(value);
  return <input type="date" aria-label="Seleccionar fecha" disabled={disabled} value={fecha ? fechaParaBackend(fecha) : ""} onChange={(event) => onChange(event.target.value)} style={{ boxSizing: "border-box", width: "100%", minHeight: 64, border: 0, borderRadius: 24, backgroundColor: "#333333", color: "#ffffff", colorScheme: "dark", fontSize: 22, padding: "14px 24px", marginBottom: 18, fontFamily: "inherit" }} />;
}
