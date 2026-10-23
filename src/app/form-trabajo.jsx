import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import ConfiguredForm from "../components/ConfiguredForm";
import tractores from "../campos/formEventoTractores.json";
import furgones from "../campos/formEventoFurgones.json";
export default function Screen(){const {user}=useContext(AuthContext);return <ConfiguredForm config={String(user?.area||"").toLowerCase()==="furgones"?furgones:tractores}/>;}
