import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BissScreen from "./BissScreen";
import { api, asList } from "../services/api";
const PAGE_SIZE = 15;
export default function BussList({ title, path, filter, detail }) {
 const router=useRouter();
 const [items,setItems]=useState([]),[query,setQuery]=useState(""),[error,setError]=useState(""),[loading,setLoading]=useState(true),[page,setPage]=useState(1);
 async function load(){setLoading(true);setError("");try {const data=asList(await api(path));setItems(filter?data.filter(filter):data);setPage(1);}catch(e){setError(e.message);}finally{setLoading(false);}}
 useEffect(()=>{load();},[path]);
 useEffect(()=>setPage(1),[query]);
 const visible=items.filter(x=>JSON.stringify(x).toLowerCase().includes(query.toLowerCase()));
 const pages=Math.max(1,Math.ceil(visible.length/PAGE_SIZE));
 const current=Math.min(page,pages);
 const shown=visible.slice((current-1)*PAGE_SIZE,current*PAGE_SIZE);
 const button={borderWidth:1,borderColor:"#555",padding:10,borderRadius:4};
 return <BissScreen><View style={{paddingTop:22,gap:12}}>
  <Pressable onPress={()=>router.back()}><Text style={{color:"#ffbd59"}}>← VOLVER</Text></Pressable>
  <Text style={{color:"white",fontSize:27,fontWeight:"800"}}>{title}</Text>
  <View style={{flexDirection:"row",gap:8,alignItems:"center"}}><TextInput placeholder="Buscar..." placeholderTextColor="#aaa" value={query} onChangeText={setQuery} style={{flex:1,backgroundColor:"#333",color:"white",borderRadius:4,padding:14}}/><Pressable onPress={load} style={button}><Text style={{color:"#ffbd59"}}>Actualizar</Text></Pressable></View>
  {loading&&<Text style={{color:"white"}}>Cargando...</Text>}{!!error&&<Text style={{color:"#ff9b9b"}}>{error}</Text>}{!loading&&!error&&visible.length===0&&<Text style={{color:"#bbb"}}>Sin resultados.</Text>}
  {shown.map((item,i)=><Pressable key={String(item.id??item.interno??((current-1)*PAGE_SIZE+i))} onPress={()=>detail&&router.push({pathname:detail,params:{id:String(item.id??item.interno??""),tipo:String(item.tipo??"")}})} style={{backgroundColor:"#222",padding:16,borderRadius:4,borderWidth:1,borderColor:"#444"}}><Text style={{color:"white",fontWeight:"bold",fontSize:16}}>{item.descripcion||item.nombre||item.patente||item.interno||item.tipo||item.id||"Registro"}</Text><Text style={{color:"#aaa",marginTop:4}}>{item.id??item.interno??""}{item.stock!==undefined?` · Stock: ${item.stock} ${item.unidad||""}`:item.cantidad!==undefined?` · Cantidad: ${item.cantidad} ${item.unidad||""}`:""}</Text></Pressable>)}
  {!loading&&!error&&visible.length>0&&<View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:8}}><Pressable disabled={current<=1} onPress={()=>setPage(p=>Math.max(1,p-1))} style={button}><Text style={{color:current<=1?"#777":"#ffbd59"}}>← Anterior</Text></Pressable><Text style={{color:"white"}}>{current} / {pages}</Text><Pressable disabled={current>=pages} onPress={()=>setPage(p=>Math.min(pages,p+1))} style={button}><Text style={{color:current>=pages?"#777":"#ffbd59"}}>Siguiente →</Text></Pressable></View>}
 </View></BissScreen>;
}
