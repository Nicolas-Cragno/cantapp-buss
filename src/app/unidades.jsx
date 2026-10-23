import { useContext } from "react";
import BussList from "../components/BussList";
import { AuthContext } from "../contexts/AuthContext";
export default function Screen(){ const { user }=useContext(AuthContext); const area=String(user?.area||"tractores").toLowerCase();return <BussList title="UNIDADES" path={`/${area}`} detail="/ficha-unidad" filter={undefined}/>; }