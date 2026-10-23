import {useState} from "react";
import {Modal,FlatList,Pressable,Text,TextInput,View} from "react-native";
const yellow="#ffbd59";
export default function CatalogDropdown({label,items=[],value,onChange,placeholder="Seleccionar..."}){
 const [open,setOpen]=useState(false),[q,setQ]=useState("");
 const getId=x=>x.id??x.interno??x.codigo??x.nombre??x.valor;
 const getLabel=x=>String(x.descripcion||x.nombre||x.razonSocial||x.apellido||x.unidad||x.tipo||x.codigo||x.id||x.interno||x.valor||"Opción");
 const selected=items.find(x=>String(getId(x))===String(value));
 const filtered=items.filter(x=>`${getLabel(x)} ${getId(x)}`.toLowerCase().includes(q.toLowerCase()));
 return <><Pressable onPress={()=>{setQ("");setOpen(true)}} style={{borderWidth:1,borderColor:"#666",backgroundColor:"#292929",padding:14,borderRadius:4,flexDirection:"row",justifyContent:"space-between"}}><Text style={{color:selected?"white":"#aaa",flex:1}}>{selected?getLabel(selected):placeholder}</Text><Text style={{color:yellow}}>▼</Text></Pressable><Modal transparent visible={open} animationType="fade" onRequestClose={()=>setOpen(false)}><View style={{flex:1,backgroundColor:"#000b",justifyContent:"center",padding:20}}><View style={{backgroundColor:"#191919",borderColor:"#666",borderWidth:1,borderRadius:4,padding:14,maxHeight:"80%",gap:12}}><Text style={{color:"white",fontWeight:"bold",fontSize:18}}>{label}</Text><TextInput value={q} onChangeText={setQ} placeholder="Buscar..." placeholderTextColor="#aaa" style={{backgroundColor:"#333",color:"white",padding:12,borderRadius:4}}/><FlatList data={filtered} keyExtractor={(x,i)=>String(getId(x)??i)+"-"+i} ListEmptyComponent={<Text style={{color:"#aaa"}}>Sin opciones disponibles.</Text>} renderItem={({item})=><Pressable onPress={()=>{onChange(getId(item),item);setOpen(false)}} style={{paddingVertical:14,borderBottomWidth:1,borderColor:"#444"}}><Text style={{color:"white"}}>{getLabel(item)}</Text></Pressable>}/><Pressable onPress={()=>setOpen(false)} style={{padding:12}}><Text style={{color:yellow,textAlign:"center"}}>CERRAR</Text></Pressable></View></View></Modal></>;
}
