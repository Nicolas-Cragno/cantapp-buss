import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
const root = (process.env.EXPO_PUBLIC_API_URL || "").replace(/\/$/, "");
export async function login(dni, password) {
  if (!root) throw new Error("Falta EXPO_PUBLIC_API_URL");
  const response = await fetch(`${root}/api/v1/auth/resolver-usuario`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario: String(dni).trim() }),
  });
  const result = await response.json();
  if (!response.ok || !result?.ok || !result?.data?.email) throw new Error("Usuario no encontrado");
  return (await signInWithEmailAndPassword(auth, result.data.email, password)).user;
}
export const logout = () => signOut(auth);
