import { useContext, useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BissScreen from "./BissScreen";
import CatalogDropdown from "./CatalogDropdown";
import { AuthContext } from "../contexts/AuthContext";
import { api, asList } from "../services/api";
const COLOR="#ffbd59";
const catalogPaths={stock:"/stock",depositos:"/depositos",tractores:"/tractores",furgones:"/furgones",mecanicos:"/personas",choferes:"/personas",proveedores:"/proveedores",stockType:"/stockType",unidades:"/unidades",tiposTractores:"/tiposTractores",tiposFurgones:"/tiposFurgones",ubicaciones:"/ubicaciones"};
function Field({field,value,onChange}){
 const [catalog,setCatalog]=useState([]),[catalogError,setCatalogError]=useState("");
 const options=field.optionsList;
 useEffect(()=>{let active=true;if(field.options){setCatalog(field.options.map(x=>({id:x,nombre:x})));return;}if(!options||!catalogPaths[options])return;api(catalogPaths[options]).then(x=>{if(active)setCatalog(asList(x));}).catch(e=>{if(active)setCatalogError(e.message);});return()=>{active=false};},[options]);
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
 const router=useRouter(),{user,persona}=useContext(AuthContext),[values,setValues]=useState({});
 const fields=config.campos||[];
 return <BissScreen><View style={{paddingTop:22,gap:10}}><Pressable onPress={()=>router.back()}><Text style={{color:COLOR}}>← VOLVER</Text></Pressable><Text style={{color:"white",fontSize:25,fontWeight:"800"}}>{config.titulo}</Text><Text style={{color:"#bbb"}}>AGREGAR NUEVO</Text><View style={{height:1,backgroundColor:"#444",marginVertical:8}}/>
 {fields.filter(f=>f.visible!==false).map(field=><Field key={field.key} field={field} value={field.source==="session.persona.id"?persona?.id??user?.dni:values[field.key]} onChange={v=>setValues(p=>({...p,[field.key]:v}))}/>)}
 <Pressable disabled style={{backgroundColor:"#555",borderRadius:4,padding:15,marginTop:12}}><Text style={{color:"white",textAlign:"center",fontWeight:"700"}}>GUARDAR (pendiente de backend)</Text></Pressable><Text style={{color:"#bbb",fontSize:12,marginBottom:24}}>El formulario se genera desde {config.id}.json. Guardado deshabilitado hasta validar endpoints, permisos y movimientos transaccionales; no se escribirá directamente en Firestore.</Text>
 </View></BissScreen>;
}
