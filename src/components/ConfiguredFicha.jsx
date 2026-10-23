import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import BissScreen from "./BissScreen";
import { api } from "../services/api";
export default function ConfiguredFicha({config,formRoute}){
 const {id}=useLocalSearchParams(),router=useRouter(),[item,setItem]=useState(null),[error,setError]=useState(""),[loading,setLoading]=useState(true);
 useEffect(()=>{let active=true;setLoading(true);api(`/${config.coleccion}/${encodeURIComponent(String(id||""))}`).then(r=>{if(active)setItem(r?.data&&!r.id?r.data:r)}).catch(e=>{if(active)setError(e.message)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[id]);
 const value=v=>Array.isArray(v)?v.map(x=>typeof x==="object"?JSON.stringify(x):String(x)).join(", "):v&&typeof v==="object"?JSON.stringify(v):v===true?"Sí":v===false?"No":v===undefined||v===null?"—":String(v);
 return <BissScreen><View style={{paddingTop:22,gap:12}}><Pressable onPress={()=>router.back()}><Text style={{color:"#ffbd59"}}>← VOLVER</Text></Pressable><Text style={{color:"white",fontSize:25,fontWeight:"bold"}}>{item?.[config.tituloCampo]||config.titulo}</Text><Text style={{color:"#bbb"}}>{String(id||"")}</Text><View style={{height:1,backgroundColor:"#555"}}/>{loading?<Text style={{color:"white"}}>Cargando...</Text>:error?<Text style={{color:"#ff9999"}}>{error}</Text>:config.campos.filter(f=>f.visible!==false).map(f=><View key={f.key} style={{flexDirection:"row",gap:8,borderBottomWidth:1,borderColor:"#333",paddingVertical:9}}><Text style={{color:"#aaa",width:"40%"}}>{f.label}</Text><Text style={{color:"white",flex:1}}>{value(item?.[f.key])}</Text></View>)}
 {config.relaciones?.map(r=><View key={r.id} style={{borderWidth:1,borderColor:"#444",padding:12,borderRadius:4}}><Text style={{color:"#ffbd59",fontWeight:"bold"}}>{r.titulo}</Text><Text style={{color:"#aaa",fontSize:12}}>Relación configurada; pendiente de endpoint específico.</Text></View>)}
 <Pressable disabled style={{backgroundColor:"#555",padding:15,borderRadius:4}}><Text style={{color:"white",textAlign:"center"}}>EDITAR (pendiente de backend)</Text></Pressable></View></BissScreen>;
}
