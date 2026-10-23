import {useContext} from "react";
import BussList from "../components/BussList";
import {AuthContext} from "../contexts/AuthContext";
export default function Screen(){const {user}=useContext(AuthContext);const area=String(user?.area||"").toLowerCase();const allowed=["tractores","furgones"].includes(area);return <BussList title="TRABAJOS" path={allowed?`/eventos/${area}`:"/eventos"} filter={x=>!allowed||String(x.area||"").toLowerCase()===area} detail="/ficha-trabajo"/>;}
