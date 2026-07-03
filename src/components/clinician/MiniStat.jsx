import { C } from "../../constants/colors";

export default function MiniStat({label,value,warn}){
  return(
    <div style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:`1px solid ${C.g100}`}}>
      <span style={{fontSize:11,color:C.g600}}>{label}</span>
      <span style={{fontSize:11,fontWeight:700,color:warn?C.amber:C.g800}}>{value}</span>
    </div>
  );
}