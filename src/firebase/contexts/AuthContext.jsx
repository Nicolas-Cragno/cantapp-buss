import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { login, logout } from "../services/auth.service";
import { getUsuarioActual, getPersonaActual } from "../services/user.service";
export const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
  const [persona, setPersona] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let active = true, seq = 0;
    const unsub = onAuthStateChanged(auth, async (firebase) => {
      const id = ++seq;
      setLoading(true); setError(null); setFirebaseUser(null); setUser(null); setPersona(null);
      if (!firebase) { if (active && id === seq) setLoading(false); return; }
      try {
        const result = await getUsuarioActual();
        const usuario = result?.data && !result?.dni ? result.data : result;
        if (!active || id !== seq) return;
        if (usuario?.estado === false) throw new Error("Usuario deshabilitado");
        if (!["tractores", "furgones", "trafico"].includes(String(usuario?.area || "").toLowerCase())) throw new Error("Área no autorizada para BUSS");
        if (!usuario?.dni || !usuario?.sucursal) throw new Error("Falta DNI o sucursal del usuario");
        const p = await getPersonaActual(usuario.dni);
        const personaActual = p?.data && !p?.id ? p.data : p;
        if (String(personaActual?.id) !== String(usuario.dni)) throw new Error("Persona no asociada al usuario");
        if (!active || id !== seq) return;
        setFirebaseUser(firebase); setUser(usuario); setPersona(personaActual);
      } catch (e) {
        if (active && id === seq) { setError(e.message); await logout().catch(() => {}); }
      } finally { if (active && id === seq) setLoading(false); }
    });
    return () => { active = false; seq++; unsub(); };
  }, []);
  return <AuthContext.Provider value={{ firebaseUser, user, persona, area: user?.area, sucursal: user?.sucursal, loading, error, login, logout }}>{children}</AuthContext.Provider>;
}
