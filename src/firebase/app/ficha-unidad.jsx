import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import ConfiguredFicha from "../components/ConfiguredFicha";
export default function Screen(){const {user}=useContext(AuthContext);const area=user?.area==="furgones"?"furgones":"tractores";return <ConfiguredFicha config={{coleccion:area,titulo:"UNIDAD",tituloCampo:"dominio",campos:[{key:"interno",label:"Interno"},{key:"dominio",label:"Dominio"},{key:"marca",label:"Marca"},{key:"modelo",label:"Modelo"},{key:"detalle",label:"Detalle"}]}}/>;}
