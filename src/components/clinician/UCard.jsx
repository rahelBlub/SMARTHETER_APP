import { C } from "../../constants/colors";
import Badge from "../shared/Badge";

export default function UCard({label,value,ref_,status}){
  const bg={Normal:C.white,Warning:"#FFFBF2",Alert:"#FFF5F5",Low:"#FFFBF2"};
  const bd={Normal:C.g200,Warning:"#F5CBA7",Alert:"#F1948A",Low:"#F5CBA7"};
  return(
    <div style={{background:bg[status]||C.white,border:`1px solid ${bd[status]||C.g200}`,borderRadius:10,padding:"10px 12px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
        <span style={{fontSize:9,fontWeight:700,color:C.g400,letterSpacing:.8,textTransform:"uppercase"}}>{label}</span>
        <Badge s={status}/>
      </div>
      <div style={{fontSize:18,fontWeight:800,color:status==="Alert"?C.red:status==="Warning"||status==="Low"?C.amber:C.g800}}>{value}</div>
      <div style={{fontSize:9,color:C.g400,marginTop:2}}>Ref: {ref_}</div>
    </div>
  );
}