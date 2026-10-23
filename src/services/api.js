import { auth } from "../firebase/FirebaseConfig";
const root = (process.env.EXPO_PUBLIC_API_URL || "").replace(/\/$/, "");
export async function api(path, options = {}) {
  if (!root) throw new Error("Falta EXPO_PUBLIC_API_URL (base /api)");
  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error("Sesión no iniciada");
  const response = await fetch(`${root}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers },
  });
  const raw = await response.text();
  let data;
  try { data = raw ? JSON.parse(raw) : null; } catch { throw new Error(`Respuesta inválida del servidor (${response.status})`); }
  if (!response.ok) throw new Error(data?.error || data?.message || `Error HTTP ${response.status}`);
  return data;
}
export function asList(response) {
  if (Array.isArray(response)) return response;
  for (const key of ["data", "items", "result", "stock", "eventos", "depositos", "empresas", "tractores", "furgones"]) {
    if (Array.isArray(response?.[key])) return response[key];
  }
  return [];
}
