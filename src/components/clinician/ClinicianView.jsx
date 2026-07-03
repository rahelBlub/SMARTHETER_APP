import { C } from "../../constants/colors";
import { patients } from "../../data/patients";
import UrinRing from "../shared/UrinRing";
import UCard from "./UCard";
import MiniStat from "./MiniStat";
import InfoRow from "../shared/InfoRow";
import AlertCard from "../shared/AlertCard";

export default function ClinicianView({screen,setScreen, selId,setSelId}){
  const p=patients.find(x=>x.id===selId) || patients[0];
  const isA=p.status==="alert",isW=p.status==="warning";

  const statusOrder = {
  alert: 0,
  warning: 1,
  normal: 2
  };

  const { alertCount, warningCount, normalCount } = patients.reduce(
    (counts, patient) => {
      if (patient.status === "alert") counts.alertCount++;
      else if (patient.status === "warning") counts.warningCount++;
      else if (patient.status === "normal") counts.normalCount++;
      return counts;
    },
    { alertCount: 0, warningCount: 0, normalCount: 0 }
  );
  
  const goToDetail = (id) => {
    setSelId(id);
    setScreen("patientDetail");
  };
  // Overview screen
  return(
    <div style={{display:"flex",height:"calc(100vh - 90px)"}}>
      {/* Sidebar */}
      <div style={{width:260,background:C.white,borderRight:`1px solid ${C.g200}`,display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"12px 14px",borderBottom:`1px solid ${C.g200}`}}>
          <div style={{fontSize:13,fontWeight:700,color:C.g800}}>Ward Overview</div>
          <div style={{fontSize:11,color:C.g600,marginBottom:8}}>Nurse: Sarah Vollbart · Ward B</div>
          <div style={{display:"flex",gap:6}}>
            {[["⚠",alertCount,C.redL,C.red,"critical"],["▲",warningCount,C.amberL,C.amber,"monitor"],["✓",normalCount,C.tealL,C.teal,"normal"]].map(([ic,n,bg,c,lb])=>(
              <div key={lb} style={{flex:1,background:bg,borderRadius:8,padding:"5px 0",textAlign:"center"}}>
                <div style={{fontSize:12,fontWeight:800,color:c}}>{ic} {n}</div>
                <div style={{fontSize:9,color:c}}>{lb}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{overflow:"auto",flex:1}}>
          {patients.slice() // wichtig, um Originalarray nicht zu mutieren
          .sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
          .map(pt=>{
            const ac=pt.status==="alert"?C.red:pt.status==="warning"?C.amber:C.teal;
            const abg=pt.status==="alert"?C.redL:pt.status==="warning"?C.amberL:C.white;
            const active=screen==="patientDetail" && selId===pt.id;
            return(
              <div key={pt.id} onClick={()=>goToDetail(pt.id)}
                style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:active?abg:C.white,borderBottom:`1px solid ${C.g200}`,cursor:"pointer",borderLeft:`3px solid ${active?ac:"transparent"}`}}>
                <div style={{width:34,height:34,borderRadius:"50%",background:abg,border:`1.5px solid ${ac}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:ac,flexShrink:0}}>
                  {pt.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:600,color:C.g800,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{pt.name}</div>
                  <div style={{fontSize:10,color:C.g600}}>{pt.age}y · {pt.ward}</div>
                </div>
                <div style={{fontSize:10,fontWeight:700,color:ac,textAlign:"right",flexShrink:0}}>
                  {pt.status==="alert"?"⚠ Abnormal":pt.status==="warning"?"▲ Monitor":"✓ Normal"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    {/* Main detail */}
    {screen==="patientDetail" ? (
      <>
        <div style={{flex:1,overflow:"auto",padding:"16px 18px",background:C.g50}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
            <button onClick={()=>setScreen("overview")} style={{fontSize:12,color:C.blue,background:"none",border:"none",cursor:"pointer",padding:0}}>← Patient list</button>
            <div style={{flex:1,fontSize:15,fontWeight:700,color:C.g800}}>{p.name} · <span style={{color:C.g600,fontWeight:400}}>{p.ward}</span></div>
            <span style={{fontSize:11,background:"#E8FFF4",color:C.teal,padding:"3px 10px",borderRadius:20,fontWeight:700}}>● Live</span>
            <span style={{fontSize:11,color:C.g400}}>14:32:07 · Thu 19 Jun</span>
          </div>
          {isA&&(
            <div style={{background:C.redL,border:`1px solid #F1948A`,borderRadius:10,padding:"9px 12px",display:"flex",gap:8,alignItems:"center",marginBottom:14}}>
              <span>⚠️</span>
              <span style={{fontSize:12,fontWeight:700,color:C.red}}>2 parameters require attention — clinical review recommended</span>
            </div>
          )}
          <div style={{marginBottom:10}}>
            <div style={{fontSize:13,fontWeight:700,color:C.g800,marginBottom:2}}>Live Urinalysis</div>
            <div style={{fontSize:11,color:C.g400}}>Updated 14:32 · Refreshes every 30s</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <UCard label="pH" value="6.8" ref_="4.5 – 8.0" status="Normal"/>
            <UCard label="Specific Gravity" value="1.024" ref_="1.002 – 1.030" status="Normal"/>
            <UCard label="Temperature" value={`${p.temp} °C`} ref_="35.0 – 38.0 °C" status={p.temp>37.8?"Warning":"Normal"}/>
            <UCard label="Colour / Turbidity" value="Yellow" ref_="Pale – Amber – Clear" status="Normal"/>
            <UCard label="Glucose" value="Neg" ref_="Negative" status="Normal"/>
            <UCard label="Protein" value="Trace ↑" ref_="Negative" status={isA||isW?"Warning":"Normal"}/>
            <UCard label="Leukocytes" value={`${p.leuko} /hpf`} ref_="0 – 5 /hpf" status={p.leuko>10?"Alert":p.leuko>5?"Warning":"Normal"}/>
            <UCard label="Nitrites" value={p.nitrites} ref_="Negative" status={p.nitrites==="Positive"?"Alert":p.nitrites==="Trace"?"Warning":"Normal"}/>
            <UCard label="Flow Rate" value={`${p.flow} mL/hr`} ref_="50 – 100 mL/hr" status={p.flow<35?"Alert":p.flow<50?"Low":"Normal"}/>
            <UCard label="24h Volume" value={`${p.urine} mL`} ref_="800 – 2000 mL" status={p.urine<500?"Alert":p.urine<800?"Warning":"Normal"}/>
          </div>
        </div>
        {/* Right panel */}
        <div style={{width:230,background:C.white,borderLeft:`1px solid ${C.g200}`,padding:"14px 12px",overflow:"auto",flexShrink:0}}>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:700,color:C.g400,letterSpacing:.8,textTransform:"uppercase",marginBottom:6}}>Flow Rate Trend</div>
            <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:4}}>
              <span style={{fontSize:24,fontWeight:800,color:p.flow<50?C.amber:C.g800}}>{p.flow}</span>
              <span style={{fontSize:11,color:C.g400}}>mL/hr</span>
              {p.flow<50&&<span style={{fontSize:10,background:C.amberL,color:C.amber,borderRadius:20,padding:"1px 7px",fontWeight:700}}>Low ↓</span>}
            </div>
            <svg width="200" height="52" viewBox="0 0 200 52">
              <line x1="0" y1="18" x2="200" y2="18" stroke={C.g200} strokeWidth="1" strokeDasharray="3,3"/>
              <text x="0" y="14" fontSize="8" fill={C.g400}>Normal range</text>
              <polyline points="0,36 30,34 60,36 90,32 120,28 150,30 180,38 200,44" fill="none" stroke={C.teal} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <div style={{fontSize:10,fontWeight:700,color:C.g400,letterSpacing:.8,textTransform:"uppercase"}}>Volume Output</div>
              <span style={{fontSize:11,color:p.urine/p.urineGoal<.5?C.red:C.g600,fontWeight:700}}>{Math.round(p.urine/p.urineGoal*100)}%</span>
            </div>
            <div style={{fontSize:20,fontWeight:800,color:C.g800,marginBottom:6}}>{p.urine} <span style={{fontSize:11,fontWeight:400,color:C.g400}}>/ {p.urineGoal} mL goal</span></div>
            <div style={{background:C.g200,borderRadius:4,height:5}}>
              <div style={{background:p.urine<500?C.red:C.teal,height:5,borderRadius:4,width:`${Math.min(p.urine/p.urineGoal*100,100)}%`}}/>
            </div>
          </div>
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:10,fontWeight:700,color:C.g400,letterSpacing:.8,textTransform:"uppercase"}}>Active Alerts</div>
              {(isA||isW)&&<span style={{fontSize:10,background:C.redL,color:C.red,borderRadius:20,padding:"1px 7px",fontWeight:700}}>{isA?2:1} open</span>}
            </div>
            {isA&&<>
              <AlertCard title="Possible UTI" detail="Nitrites positive · Leukocytes 12/hpf" action="Consider urine culture · 14:32" color="red"/>
              <AlertCard title="Trace Proteinuria" detail="Monitor closely" action="Repeat urinalysis in 4h · 14:32" color="amber"/>
              <button style={{width:"100%",marginTop:4,padding:"9px 0",background:C.red,color:C.white,border:"none",borderRadius:8,fontWeight:700,fontSize:12,cursor:"pointer"}}>
                Notify nursing staff
              </button>
            </>}
            {isW&&<AlertCard title="Elevated Leukocytes" detail="6/hpf – monitor closely" action="Repeat in 6h" color="amber"/>}
            {!isA&&!isW&&<div style={{padding:"12px 0",fontSize:12,color:C.g400,textAlign:"center"}}>No active alerts ✓</div>}
          </div>
          <div style={{marginTop:14,paddingTop:12,borderTop:`1px solid ${C.g200}`}}>
            <div style={{fontSize:10,fontWeight:700,color:C.g400,letterSpacing:.8,textTransform:"uppercase",marginBottom:6}}>Patient</div>
            <InfoRow label="Name" value={p.name}/>
            <InfoRow label="Age" value={`${p.age} y`}/>
            <InfoRow label="Catheter" value={p.catheter}/>
            <InfoRow label="Duration" value={`${p.days}d 5h`}/>
            <InfoRow label="Admitted" value="15 Jun (4 days)"/>
            <InfoRow label="Consultant" value={p.consultant}/>
          </div>
        </div>
        </>
      ):(
        /*Overview grid*/
        <div style={{flex:1,padding:"16px 18px",overflow:"auto",background:C.g50}}>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:16,fontWeight:700,color:C.g800}}>All patients · Ward B</div>
            <div style={{fontSize:12,color:C.g400}}>Click any card for details · Live update every 30s</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {patients.slice() // wichtig, um Originalarray nicht zu mutieren
            .sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
            .map(pt=>{
              const isAl=pt.status==="alert",isWa=pt.status==="warning";
              const c=isAl?C.red:isWa?C.amber:C.teal;
              const bg=isAl?C.redL:isWa?C.amberL:C.white;
              return(
                <div key={pt.id} onClick={()=>goToDetail(pt.id)}
                  style={{background:bg,border:`1.5px solid ${isAl?"#F1948A":isWa?"#F5CBA7":C.g200}`,borderRadius:12,padding:"12px 14px",cursor:"pointer"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:C.g800}}>{pt.name}</div>
                      <div style={{fontSize:10,color:C.g600}}>{pt.age}y · {pt.ward}</div>
                    </div>
                    <span style={{fontSize:10,fontWeight:700,color:c,background:bg,border:`1px solid ${c}`,borderRadius:20,padding:"2px 8px",whiteSpace:"nowrap"}}>
                      {isAl?"Abnormal ⚠":isWa?"Monitor":"Normal ✓"}
                    </span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <UrinRing ml={pt.urine} goal={pt.urineGoal}/>
                    <div style={{flex:1}}>
                      <MiniStat label="Flow rate" value={`${pt.flow} mL/hr`} warn={pt.flow<50}/>
                      <MiniStat label="Temperature" value={`${pt.temp} °C`} warn={pt.temp>37.8}/>
                      <MiniStat label="Nitrites" value={pt.nitrites} warn={pt.nitrites!=="Negative"}/>
                      <MiniStat label="Leukocytes" value={`${pt.leuko}/hpf`} warn={pt.leuko>5}/>
                    </div>
                  </div>
                  {isAl&&<div style={{marginTop:8,fontSize:11,color:C.red,fontWeight:600,background:"rgba(192,57,43,0.08)",borderRadius:6,padding:"4px 8px"}}>⚠ Possible UTI — urine culture recommended</div>}
                  {isWa&&<div style={{marginTop:8,fontSize:11,color:C.amber,fontWeight:600,background:"rgba(186,117,23,0.08)",borderRadius:6,padding:"4px 8px"}}>▲ Elevated leukocytes — monitor closely</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


