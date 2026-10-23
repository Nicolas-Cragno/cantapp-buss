import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import ConfiguredFicha from "../components/ConfiguredFicha";
import tractores from "../campos/fichasEventoTractores.json";
import furgones from "../campos/fichasEventoFurgones.json";
export default function Screen(){const {user}=useContext(AuthContext);return <ConfiguredFicha config={String(user?.area||"").toLowerCase()==="furgones"?furgones:tractores} formRoute="/form-trabajo"/>;}
