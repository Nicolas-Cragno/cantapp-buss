import {useEffect,useState} from "react";
import {Alert,Pressable,Text,View} from "react-native";
import {useRouter} from "expo-router";
import BissScreen from "../components/BissScreen";
import ItemPicker from "../components/ItemPicker";
import CatalogDropdown from "../components/CatalogDropdown";
import {api,asList} from "../services/api";
const Y="#ffbd59";
export default function Screen(){
 const router=useRouter();
 const [tipo,setTipo]=useState("alta"),[depositos,setDepositos]=useState([]),[deposito,setDeposito]=useState(null),[items,setItems]=useState([]),[saving,setSaving]=useState(false),[error,setError]=useState("");
 useEffect(()=>{api("/depositos").then(r=>setDepositos(asList(r))).catch(e=>setError(e.message))},[]);
 async function guardar(){
  if(!deposito){setError("Seleccioná un depósito");return}
  if(!items.length){setError("Agregá al menos un artículo");return}
  setError("");setSaving(true);
  try{
   const movimientos=items.map(x=>({id:String(x.id),cantidad:Number(x.cantidad)*(x.tipo==="baja"?-1:1),unidad:x.unidad||""}));
   await api("/stock/movimientos",{method:"POST",body:JSON.stringify({depositoId:String(deposito),movimientos,evento:{area:"administracion",tipo:"STOCK",detalle:"Ajuste de stock desde BUSS"}})});
   Alert.alert("STOCK","Ajuste registrado");router.back();
  }catch(e){setError(e.message)}finally{setSaving(false)}
 }
 return <BissScreen><View style={{paddingTop:22,gap:14}}>
 <Pressable onPress={()=>router.back()}><Text style={{color:Y}}>← VOLVER</Text></Pressable>
 <Text style={{color:"white",fontSize:25,fontWeight:"bold"}}>AJUSTE DE STOCK</Text>
 <View style={{flexDirection:"row",gap:8}}>{[["alta","ALTA DE STOCK"],["baja","BAJA DE STOCK"]].map(([v,t])=><Pressable key={v} onPress={()=>setTipo(v)} style={{flex:1,padding:12,borderWidth:1,borderColor:tipo===v?Y:"#555",borderRadius:4}}><Text style={{color:"white",textAlign:"center"}}>{t}</Text></Pressable>)}</View>
 <Text style={{color:"white"}}>DEPÓSITO</Text>
 <CatalogDropdown label="Depósito" items={depositos} value={deposito} onChange={setDeposito}/>
 <ItemPicker key={tipo} items={[]} onChange={list=>{if(list.length){const added=list[list.length-1];setItems(p=>[...p,{...added,tipo,signo:tipo==="alta"?"+":"−"}])}}}/>
 <Text style={{color:"white",fontWeight:"bold"}}>LISTADO DEL AJUSTE ({items.length})</Text>
 {items.map((x,i)=><View key={i} style={{flexDirection:"row",gap:8,backgroundColor:"#222",padding:12,borderRadius:4}}><View style={{flex:1}}><Text style={{color:"white"}}>{x.id} - {x.descripcion}</Text><Text style={{color:"#bbb"}}>{x.signo} {x.cantidad} ({x.unidad})</Text></View><Pressable onPress={()=>setItems(p=>p.filter((_,j)=>i!==j))}><Text style={{color:Y}}>BORRAR</Text></Pressable></View>)}
 {error?<Text style={{color:"#ff9999"}}>{error}</Text>:null}
 <Pressable onPress={guardar} disabled={saving} style={{backgroundColor:saving?"#555":Y,padding:15,borderRadius:4}}><Text style={{color:"#111",textAlign:"center",fontWeight:"bold"}}>{saving?"GUARDANDO...":"GUARDAR"}</Text></Pressable>
 </View></BissScreen>;
}
