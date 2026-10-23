import { auth } from "../firebase/FirebaseConfig";
import { api } from "./api";
export async function getUsuarioActual() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuario no autenticado");
  return api(`/users/${encodeURIComponent(uid)}`);
}
export async function getPersonaActual(dni) {
  if (!dni) throw new Error("Usuario sin DNI");
  return api(`/personas/${encodeURIComponent(dni)}`);
}
