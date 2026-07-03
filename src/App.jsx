import { useState } from "react";
import { C } from "./constants/colors";
import { patients } from "./data/patients";
import ClinicianView from "./components/clinician/ClinicianView";
import PatientView from "./components/patient/PatientView";


export default function App(){
  const [view,setView]=useState("clinician");
  const [screen,setScreen]=useState("overview");
  const [selId,setSelId]=useState(null);
  const [pscreen,setPscreen]=useState("home");

  return(
    <div style={{fontFamily:"system-ui,-apple-system,sans-serif",minHeight:"100vh",background:C.g100}}>
      <div style={{background:C.navy,padding:"10px 18px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" fill="#5DCAA5"/><circle cx="12" cy="9" r="3" fill="#0F1B35"/></svg>
          <span style={{color:"white",fontWeight:700,fontSize:15}}>Smartheter</span>
        </div>
        {/*Nav-Bar*/}
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>{setView("clinician");setScreen("overview");}} style={{fontSize:12,padding:"4px 12px",borderRadius:20,border:"none",cursor:"pointer",background:view==="clinician"?"#5DCAA5":"rgba(255,255,255,0.12)",color:view==="clinician"?"#0F1B35":"white",fontWeight:600}}>
            Clinician Dashboard
          </button>
          <button onClick={()=>{setView("patient");setPscreen("home");}} style={{fontSize:12,padding:"4px 12px",borderRadius:20,border:"none",cursor:"pointer",background:view==="patient"?"#5DCAA5":"rgba(255,255,255,0.12)",color:view==="patient"?"#0F1B35":"white",fontWeight:600}}>
            Patient App
          </button>
        </div>
      </div>
      {/*View Selector*/}
      {view==="clinician"&&(
        <div style={{background:"white",borderBottom:`1px solid ${C.g200}`,padding:"7px 18px",display:"flex",gap:7,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{fontSize:11,color:C.g600}}>View:</span>
          <button onClick={()=>setScreen("overview")} style={{fontSize:11,padding:"3px 10px",borderRadius:20,border:`1px solid ${screen==="overview"?C.teal:C.g300}`,background:screen==="overview"?C.tealL:"white",color:screen==="overview"?C.teal:C.g600,cursor:"pointer",fontWeight:screen==="overview"?700:400}}>
            Ward overview ({patients.length} patients)
          </button>
          <button onClick={()=>setScreen("patientDetail")} style={{fontSize:11,padding:"3px 10px",borderRadius:20,border:`1px solid ${screen==="patientDetail"?C.red:C.g300}`,background:screen==="patientDetail"?C.redL:"white",color:screen==="patientDetail"?C.red:C.g600,cursor:"pointer",fontWeight:screen==="patientDetail"?700:400}}>
            Patient detail
          </button>
          <span style={{fontSize:11,color:C.g400}}>← or click any patient card</span>
        </div>
      )}
      {view==="patient"&&(
        <div style={{background:"white",borderBottom:`1px solid ${C.g200}`,padding:"7px 18px",display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{fontSize:11,color:C.g600}}>Screen:</span>
          {[["home","🏠 Home (alert)"],["symptoms","📝 Symptoms"],["trends","📈 Trends"],["alerts","🔔 Alerts"],["profile","👤 Profile"]].map(([s,l])=>(
            <button key={s} onClick={()=>setPscreen(s)} style={{fontSize:11,padding:"3px 10px",borderRadius:20,border:`1px solid ${pscreen===s?C.navy:C.g300}`,background:pscreen===s?C.navy:"white",color:pscreen===s?"white":C.g600,cursor:"pointer",fontWeight:pscreen===s?700:400}}>
              {l}
            </button>
          ))}
        </div>
      )}
      {view==="clinician"
        ?<ClinicianView screen={screen} setScreen={setScreen} selId={selId} setSelId={setSelId}/>
        :<PatientView pscreen={pscreen} setPscreen={setPscreen}/>
      }
    </div>
  );
}
