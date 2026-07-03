import { C } from "../../constants/colors";

export default function AlertCard({title,detail,action,color}){
  return(
    <div style={{background:color==="red"?C.redL:C.amberL,border:`1px solid ${color==="red"?"#F1948A":"#F5CBA7"}`,borderRadius:10,padding:"10px 12px",display:"flex",gap:8,alignItems:"flex-start",marginBottom:8}}>
      <span style={{fontSize:16,marginTop:1}}>{color==="red"?"⚠️":"🔶"}</span>
      <div>
        <div style={{fontSize:12,fontWeight:700,color:color==="red"?C.red:C.amber}}>{title}</div>
        <div style={{fontSize:11,color:C.g600,margin:"2px 0 3px"}}>{detail}</div>
        <div style={{fontSize:10,color:C.g400,fontStyle:"italic"}}>{action}</div>
      </div>
    </div>
  );
}