import { Text, Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import BissScreen from "./BissScreen";
export default function PendingForm({ title, message }) {const router=useRouter();return <BissScreen><View style={{paddingTop:28,gap:20}}><Pressable onPress={()=>router.back()}><Text style={{color:"#ffbd59"}}>← VOLVER</Text></Pressable><Text style={{color:"white",fontSize:26,fontWeight:"800"}}>{title}</Text><Text style={{color:"#ddd",fontSize:16,lineHeight:25}}>{message}</Text><Text style={{color:"#ffbd59"}}>Guardado deshabilitado hasta disponer de las operaciones transaccionales y permisos de BUSS en cantapp-back.</Text></View></BissScreen>}
