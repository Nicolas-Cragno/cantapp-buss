import { useContext, useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import BissScreen from "./BissScreen";
import CatalogDropdown from "./CatalogDropdown";
import { AuthContext } from "../contexts/AuthContext";
import { api, asList } from "../services/api";
const COLOR="#ffbd59";
const catalogPaths={stock:"/stock",depositos:"/depositos",tractores:"/tractores",furgones:"/furgones",mecanicos:"/personas",choferes:"/personas",proveedores:"/proveedores",stockType:"/stock",unidades:"/stock",tiposTractores:"/eventos/tractores",tiposFurgones:"/eventos/furgones",ubicaciones:"/ubicaciones"};
function Field({field,value,onChange}){
 const [catalog,setCatalog]=useState([]),[catalogError,setCatalogError]=useState("");
 const options=field.optionsList;
 useEffect(()=>{let active=true;if(field.options){setCatalog(field.options.map(x=>({id:x,nombre:x})));return;}if(!options||!catalogPaths[options])return;api(catalogPaths[options]).then(x=>{
   if (!active) return;
   const records = asList(x);
   if (["stockType", "unidades", "tiposTractores", "tiposFurgones"].includes(options)) {
     const key = options === "stockType" || options.startsWith("tipos") ? "tipo" : "unidad";
     const values = [...new Set(records.map(item => item[key]).filter(Boolean).map(String))].sort();
     setCatalog(values.map(value => ({ id: value, nombre: value })));
   } else setCatalog(records);
  }).catch(e=>{if(active)setCatalogError(e.message);});return()=>{active=false};},[options]);
 const label=x=>String(x.descripcion||x.nombre||x.apellido||x.interno||x.id||x.codigo||x.tipo||"Registro");
 const set=onChange;
 return <View style={{gap:6,marginBottom:12}}><Text style={{color:"white",fontWeight:"600"}}>{field.label}{field.required?" *":""}</Text>
 {field.type==="group"||field.type==="checks"?<View style={{borderColor:"#555",borderWidth:1,borderRadius:4,padding:12,gap:5}}>{field.items?.map(child=><Text key={child.key} style={{color:"#bbb"}}>• {child.label}</Text>)}<Text style={{color:COLOR,fontSize:12}}>Grupo definido en JSON; edición pendiente de integración con backend.</Text></View>:
 field.inputType==="readonly"?<Text style={{color:"#aaa",padding:10}}>{String(value??"Automático")}</Text>:
 options?<View style={{gap:5}}>{catalogError?<Text style={{color:"#ff9999"}}>No se pudo cargar {options}: {catalogError}</Text>:null}<CatalogDropdown label={field.label} items={catalog} value={value} onChange={set} placeholder={catalog.length?"Seleccionar...":`Sin opciones para ${options}`}/></View>:
 field.inputType==="boolean"?<Pressable onPress={()=>set(!value)}><Text style={{color:COLOR}}>{value?field.positive||"Sí":field.negative||"No"}</Text></Pressable>:
 <TextInput multiline={field.inputType==="textarea"} keyboardType={field.dato==="number"?"numeric":"default"} value={value===undefined||value===null?"":String(value)} onChangeText={set} placeholder={field.label} placeholderTextColor="#888" style={{backgroundColor:"#292929",borderColor:"#555",borderWidth:1,borderRadius:4,padding:12,color:"white",minHeight:field.inputType==="textarea"?90:48}}/>}</View>;
}
export default function ConfiguredForm({config}){
 const router=useRouter(), {id}=useLocalSearchParams(), {user,persona}=useContext(AuthContext),[values,setValues]=useState({}),[saving,setSaving]=useState(false),[error,setError]=useState("");
 useEffect(()=>{if(config.coleccion!=="stock"||!id)return;let active=true;api(`/stock/${encodeURIComponent(String(id))}`).then(r=>{if(active)setValues(r?.data&&!r.id?r.data:r)}).catch(e=>{if(active)setError(e.message)});return()=>{active=false};},[config.coleccion,id]);
 async function save(){
  if(config.coleccion!=="stock")return;
  setError("");
  const missing=(config.campos||[]).filter(f=>f.required && !String(values[f.key]??"").trim());
  if(missing.length){setError(`Completá: ${missing.map(f=>f.label).join(", ")}`);return;}
  const codigo=String(id||values.id||"").trim();
  if(!codigo){setError("El código del artículo es obligatorio");return;}
  const payload=Object.fromEntries((config.campos||[]).filter(f=>f.use==="database").map(f=>[f.key,values[f.key]]).filter(([,v])=>v!==undefined&&v!==null&&v!==""));
  setSaving(true);
  try{await api(id?`/stock/${encodeURIComponent(String(id))}`:"/stock",{method:id?"PUT":"POST",body:JSON.stringify(id?payload:{id:codigo,...payload})});Alert.alert("STOCK",id?"Artículo actualizado":"Artículo creado");router.back();}
  catch(e){setError(e.message)}finally{setSaving(false)}
 }
 const fields=config.campos||[];
 return <BissScreen><View style={{paddingTop:22,gap:10}}><Pressable onPress={()=>router.back()}><Text style={{color:COLOR}}>← VOLVER</Text></Pressable><Text style={{color:"white",fontSize:25,fontWeight:"800"}}>{config.titulo}</Text><Text style={{color:"#bbb"}}>{id?"EDITAR ARTÍCULO":"AGREGAR NUEVO"}</Text><View style={{height:1,backgroundColor:"#444",marginVertical:8}}/>
 {fields.filter(f=>f.visible!==false).map(field=><Field key={field.key} field={field} value={field.key==="id"&&id?String(id):field.source==="session.persona.id"?persona?.id??user?.dni:values[field.key]} onChange={v=>setValues(p=>({...p,[field.key]:v}))}/>)}
 {error?<Text style={{color:"#ff9999"}}>{error}</Text>:null}
 <Pressable disabled={saving||config.coleccion!=="stock"} onPress={save} style={{backgroundColor:saving?"#555":COLOR,borderRadius:4,padding:15,marginTop:12}}><Text style={{color:"#111",textAlign:"center",fontWeight:"700"}}>{saving?"GUARDANDO...":id?"GUARDAR CAMBIOS":"GUARDAR"}</Text></Pressable>
 {config.coleccion!=="stock"?<Text style={{color:"#bbb"}}>Este formulario todavía no tiene guardado habilitado.</Text>:null}
 </View></BissScreen>;
}
