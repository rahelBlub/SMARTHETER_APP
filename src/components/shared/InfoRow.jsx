import { C } from "../../constants/colors";

export default function InfoRow({label,value}){
  return(
    <div style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${C.g100}`}}>
      <span style={{fontSize:12,color:C.g600}}>{label}</span>
      <span style={{fontSize:12,fontWeight:500,color:C.g800,maxWidth:"55%",textAlign:"right"}}>{value}</span>
    </div>
  );
}