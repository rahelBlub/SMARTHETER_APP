import { useState } from "react";
import { C } from "../../constants/colors";
import { patients } from "../../data/patients";
import { symList } from "../../data/symList";
//import UrinRing from "../shared/UrinRing";
import InfoRow from "../shared/InfoRow";

export default function PatientView({pscreen,setPscreen}){
  const [checked,setChecked]=useState([]);
  const [intensity,setIntensity]=useState(5);
  const [submitted,setSubmitted]=useState(false);
  const urine=320,goal=1500,ph=6.8,flow=28,temp=37.9;
  const pct=urine/goal;
  const toggle=id=>setChecked(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);

  const Shell=({children})=>(
    <div style={{display:"flex",justifyContent:"center",background:C.g100,minHeight:"calc(100vh - 90px)",padding:"16px 0"}}>
      <div style={{width:360,background:pscreen==="home"?"#7B0D0D":C.navy,borderRadius:32,borderStyle:"solid",borderWidth:2,overflow:"hidden",boxShadow:"0 16px 48px rgba(0,0,0,0.25)",display:"flex",flexDirection:"column",minHeight:640}}>
        <div style={{display:"flex",justifyContent:"space-between",padding:"10px 18px 6px",color:"rgba(255,255,255,0.65)",fontSize:12}}>
          <span>14:32</span>
          {pscreen==="home"&&<span style={{fontSize:10,background:"rgba(255,255,255,0.18)",borderRadius:20,padding:"1px 8px",color:"white",fontWeight:700}}>● 2 ALERTS</span>}
          <span>▐▐▐ ▓</span>
        </div>
        <div style={{padding:"2px 18px 10px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" fill="#5DCAA5"/><circle cx="12" cy="9" r="3" fill="#0F1B35"/></svg>
            <span style={{color:"white",fontWeight:700,fontSize:14}}>Smartheter</span>
          </div>
          <div style={{width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"white"}}>DH</div>
        </div>
        <div style={{flex:1,background:C.white,borderRadius:"22px 22px 0 0",overflow:"auto"}}>{children}</div>
        <div style={{background:C.white,display:"flex",borderTop:`1px solid ${C.g200}`}}>
          {[["home","🏠","Home",2],["symptoms","📝","Symptoms",0],["trends","📈","Trends",0],["alerts","🔔","Alerts",2],["profile","👤","Profile",0]].map(([s,ic,lb,badge])=>(
            <button key={s} onClick={()=>setPscreen(s)}
              style={{flex:1,padding:"7px 0",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:1,position:"relative"}}>
              <span style={{fontSize:16}}>{ic}</span>
              <span style={{fontSize:9,color:pscreen===s?C.teal:C.g400,fontWeight:pscreen===s?700:400}}>{lb}</span>
              {badge>0&&<span style={{position:"absolute",top:3,right:"50%",marginRight:-16,background:C.red,color:"white",fontSize:8,fontWeight:700,borderRadius:10,padding:"1px 4px"}}>{badge}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if(pscreen==="home") return(
    <Shell>
      <div style={{background:C.red,padding:"8px 14px",display:"flex",gap:6,alignItems:"center"}}>
        <span>⚠️</span>
        <span style={{color:"white",fontSize:11,fontWeight:600}}>Nurse has been notified · Attend to patient</span>
      </div>
      <div style={{padding:"14px 14px 0"}}>
        <div style={{fontSize:20,fontWeight:800,color:C.red}}>Attention needed, {patients[0]?.name || "patient"}</div>
        <div style={{fontSize:12,color:C.g600,marginBottom:14}}>Your care team is on their way</div>
      </div>
      <div style={{margin:"0 14px 14px",background:C.redL,borderRadius:14,padding:"14px",textAlign:"center"}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:1.5,color:C.red,marginBottom:10}}>HYDRATION TODAY</div>
        {(()=>{
          const r=46,circ=2*Math.PI*r;
          return(
            <svg width="120" height="120" viewBox="0 0 120 120" style={{display:"block",margin:"0 auto"}}>
              <circle cx="60" cy="60" r={r} fill="none" stroke="#F5CBA7" strokeWidth="9"/>
              <circle cx="60" cy="60" r={r} fill="none" stroke={C.red} strokeWidth="9" strokeLinecap="round"
                strokeDasharray={`${circ*pct} ${circ}`} transform="rotate(-90 60 60)"/>
              <text x="60" y="54" textAnchor="middle" fontSize="22" fontWeight="800" fill={C.red}>{urine}</text>
              <text x="60" y="70" textAnchor="middle" fontSize="9" fill={C.g600}>mL today</text>
              <text x="60" y="82" textAnchor="middle" fontSize="8" fill={C.g400}>goal: {goal} mL</text>
            </svg>
          );
        })()}
        <div style={{marginTop:8,display:"inline-block",background:C.red,color:"white",borderRadius:20,padding:"4px 14px",fontSize:12,fontWeight:700}}>⚠ Very low hydration</div>
      </div>
      <div style={{margin:"0 14px 12px",background:C.red,borderRadius:12,padding:"10px 12px"}}>
        <div style={{color:"white",fontSize:12,fontWeight:700,marginBottom:7}}>Hey {patients[0]?.name || "patient"}! You really need to drink some water — your output is critically low! 💧</div>
        <button onClick={()=>setPscreen("symptoms")} style={{width:"100%",background:"white",color:C.red,border:"none",borderRadius:8,padding:"7px 0",fontWeight:700,fontSize:12,cursor:"pointer"}}>
          Drink Water Now 💧
        </button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,margin:"0 14px 14px"}}>
        {[["PH",ph.toString(),"Normal"],["FLOW",`${flow}mL/h`,"Low"],["TEMP",`${temp}°C`,"High"]].map(([l,v,s])=>(
          <div key={l} style={{background:C.g50,borderRadius:10,padding:"9px 6px",textAlign:"center"}}>
            <div style={{fontSize:9,fontWeight:700,color:C.g400,letterSpacing:.8}}>{l}</div>
            <div style={{fontSize:13,fontWeight:800,color:s==="Low"?C.amber:s==="High"?C.red:C.g800,margin:"3px 0 2px"}}>{v}</div>
            <div style={{fontSize:9,color:s==="Low"?C.amber:s==="High"?C.red:C.teal}}>{s}</div>
          </div>
        ))}
      </div>
      <div style={{padding:"0 14px 18px"}}>
        <button onClick={()=>setPscreen("symptoms")} style={{width:"100%",background:C.red,color:"white",border:"none",borderRadius:11,padding:"12px 0",fontWeight:700,fontSize:13,cursor:"pointer"}}>
          ⚠ Report symptoms
        </button>
      </div>
    </Shell>
  );

  if(pscreen==="symptoms") return(
    <Shell>
      <div style={{padding:"16px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
          <button onClick={()=>setPscreen("home")} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:C.g600,padding:0}}>←</button>
          <div>
            <div style={{fontSize:16,fontWeight:800,color:C.g800}}>My Symptoms</div>
            <div style={{fontSize:11,color:C.g600}}>How are you feeling today?</div>
          </div>
        </div>
        {!submitted?<>
          {symList.map(s=>(
            <div key={s.id} onClick={()=>toggle(s.id)}
              style={{display:"flex",alignItems:"center",gap:10,padding:"10px",marginBottom:5,background:checked.includes(s.id)?C.tealL:C.g50,border:`1.5px solid ${checked.includes(s.id)?C.teal:C.g200}`,borderRadius:10,cursor:"pointer"}}>
              <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${checked.includes(s.id)?C.teal:C.g300}`,background:checked.includes(s.id)?C.teal:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {checked.includes(s.id)&&<span style={{color:"white",fontSize:11,fontWeight:900,lineHeight:1}}>✓</span>}
              </div>
              <span style={{fontSize:13,color:C.g800}}>{s.label}</span>
            </div>
          ))}
          {checked.length>0&&(
            <div style={{marginTop:12,padding:"12px",background:C.g50,borderRadius:12}}>
              <div style={{fontSize:12,fontWeight:700,color:C.g800,marginBottom:8}}>Severity</div>
              <input type="range" min="1" max="10" value={intensity} step="1" onChange={e=>setIntensity(Number(e.target.value))} style={{width:"100%"}}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.g400,marginTop:3}}>
                <span>mild (1)</span>
                <span style={{fontWeight:700,color:intensity>7?C.red:intensity>4?C.amber:C.teal,fontSize:16}}>{intensity}</span>
                <span>severe (10)</span>
              </div>
            </div>
          )}
          <button onClick={()=>{if(checked.length>0)setSubmitted(true);}}
            style={{width:"100%",marginTop:14,background:checked.length>0?C.navy:C.g300,color:"white",border:"none",borderRadius:11,padding:"12px 0",fontWeight:700,fontSize:13,cursor:checked.length>0?"pointer":"default"}}>
            Save symptoms
          </button>
        </>:(
          <div style={{textAlign:"center",padding:"24px 0"}}>
            <div style={{fontSize:44,marginBottom:10}}>✅</div>
            <div style={{fontSize:16,fontWeight:700,color:C.g800,marginBottom:6}}>Saved!</div>
            <div style={{fontSize:12,color:C.g600,marginBottom:16}}>Your care team has been notified.</div>
            <div style={{background:C.tealL,borderRadius:12,padding:"10px 14px",marginBottom:14,textAlign:"left"}}>
              <div style={{fontSize:11,fontWeight:700,color:C.teal,marginBottom:3}}>Your report:</div>
              {checked.map(id=><div key={id} style={{fontSize:11,color:C.g700}}>· {symList.find(s=>s.id===id)?.label}</div>)}
              <div style={{fontSize:11,color:C.g600,marginTop:3}}>Severity: {intensity}/10</div>
            </div>
            <button onClick={()=>{setSubmitted(false);setChecked([]);setIntensity(5);setPscreen("home");}}
              style={{background:C.navy,color:"white",border:"none",borderRadius:10,padding:"9px 22px",fontWeight:700,fontSize:12,cursor:"pointer"}}>
              Back to home
            </button>
          </div>
        )}
      </div>
    </Shell>
  );

  if(pscreen==="trends") return(
    <Shell>
      <div style={{padding:"16px 14px"}}>
        <div style={{fontSize:16,fontWeight:800,color:C.g800,marginBottom:2}}>My Trends</div>
        <div style={{fontSize:12,color:C.g600,marginBottom:14}}>Last 12 hours</div>
        <div style={{background:"white",borderRadius:14,border:`1px solid ${C.g200}`,padding:"12px",marginBottom:10}}>
          <div style={{fontSize:11,fontWeight:700,color:C.g600,marginBottom:8}}>Flow rate (mL/hr)</div>
          {(()=>{
            const hrs=["08","10","12","14","16","18","20"],vals=[55,51,48,44,38,32,28];
            const W=300,H=100,pL=28,pB=18,pT=8,gw=W-pL-8,gh=H-pB-pT,min=20,max=70;
            const pts=vals.map((v,i)=>`${pL+(i/(vals.length-1))*gw},${pT+gh-((v-min)/(max-min))*gh}`).join(" ");
            return(
              <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{overflow:"visible"}}>
                <line x1={pL} y1={pT+gh*0.4} x2={pL+gw} y2={pT+gh*0.4} stroke={C.g200} strokeDasharray="3" strokeWidth="1"/>
                <text x="0" y={pT+gh*0.4+4} fontSize="8" fill={C.g400}>50</text>
                <text x="0" y={pT+4} fontSize="8" fill={C.g400}>70</text>
                <text x="0" y={pT+gh+4} fontSize="8" fill={C.g400}>20</text>
                <polyline points={pts} fill="none" stroke={C.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                {vals.map((v,i)=>{
                  const x=pL+(i/(vals.length-1))*gw,y=pT+gh-((v-min)/(max-min))*gh;
                  return <circle key={i} cx={x} cy={y} r="3" fill={v<40?C.amber:C.teal}/>;
                })}
                {hrs.map((h,i)=>(
                  <text key={i} x={pL+(i/(hrs.length-1))*gw} y={pT+gh+14} fontSize="8" fill={C.g400} textAnchor="middle">{h}:00</text>
                ))}
              </svg>
            );
          })()}
          <div style={{fontSize:10,color:C.amber,fontWeight:600,marginTop:6}}>▼ Flow rate declining — encourage fluid intake</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[["pH","6.2 → 6.8","stable"],["Temperature","36.9 → 37.9°C","slightly elevated"],["Volume today","320 mL","too low"],["Flow rate now","28 mL/hr","low"]].map(([l,v,s])=>(
            <div key={l} style={{background:C.g50,borderRadius:10,padding:"9px 10px"}}>
              <div style={{fontSize:9,color:C.g400,marginBottom:2}}>{l}</div>
              <div style={{fontSize:13,fontWeight:700,color:C.g800}}>{v}</div>
              <div style={{fontSize:10,color:s.includes("low")||s.includes("elevated")?C.amber:C.teal}}>{s}</div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );

  if(pscreen==="alerts") return(
    <Shell>
      <div style={{padding:"16px 14px"}}>
        <div style={{fontSize:16,fontWeight:800,color:C.g800,marginBottom:2}}>Notifications</div>
        <div style={{fontSize:12,color:C.g600,marginBottom:14}}>Today · 19 Jun 2025</div>
        {[
          {time:"14:32",title:"Urgent hydration alert",body:"Your urine output is critically low. Please drink water now!",dot:C.red},
          {time:"14:30",title:"Nurse notified",body:"Your nursing team has been automatically alerted and is on their way.",dot:C.amber},
          {time:"12:00",title:"Lunchtime reminder",body:"Don't forget to drink plenty of fluids with your meal.",dot:C.blue},
          {time:"08:15",title:"Good morning!",body:"Your catheter is active. Everything looks normal this morning.",dot:C.teal},
        ].map((a,i)=>(
          <div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:`1px solid ${C.g100}`}}>
            <div style={{width:7,height:7,borderRadius:"50%",marginTop:5,flexShrink:0,background:a.dot}}/>
            <div>
              <div style={{display:"flex",gap:6,alignItems:"baseline"}}>
                <div style={{fontSize:12,fontWeight:700,color:C.g800}}>{a.title}</div>
                <div style={{fontSize:10,color:C.g400}}>{a.time}</div>
              </div>
              <div style={{fontSize:11,color:C.g600,marginTop:2}}>{a.body}</div>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );

  if(pscreen==="profile") return(
    <Shell>
      <div style={{padding:"16px 14px"}}>
        <div style={{textAlign:"center",marginBottom:18}}>
          <div style={{width:64,height:64,borderRadius:"50%",background:C.tealL,border:`2px solid ${C.teal}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:C.teal,margin:"0 auto 6px"}}>DH</div>
          <div style={{fontSize:16,fontWeight:700,color:C.g800}}>{patients[0]?.name || "patient"}</div>
          <div style={{fontSize:11,color:C.g600,marginBottom:6}}>{patients[0]?.age || " y"} · {patients[0]?.gender || "Male"} · {patients[0]?.dob || "12 Mar 1954"} · {patients[0]?.bed || "Bed 4B"}</div>
          <span style={{fontSize:10,background:C.tealL,color:C.teal,borderRadius:20,padding:"3px 12px",fontWeight:700}}>Catheter active</span>
        </div>
        <div style={{background:C.g50,borderRadius:12,padding:"12px 14px",marginBottom:10}}>
          <div style={{fontSize:10,fontWeight:700,color:C.g400,letterSpacing:.8,textTransform:"uppercase",marginBottom:7}}>Patient details</div>
          {[["Admitted","15 Jun 2025 (4 days)"],["Consultant","Dr A. Barnes"],["Ward / Bed","Urology · Ward 7 · Bed 4B"],["Ref. No.","URO-2026-4892"],["Diagnoses","Morbus Crohn, Alzheimer"],["Allergies","Penicillin"]].map(([l,v])=><InfoRow key={l} label={l} value={v}/>)}
        </div>
        <div style={{background:C.g50,borderRadius:12,padding:"12px 14px"}}>
          <div style={{fontSize:10,fontWeight:700,color:C.g400,letterSpacing:.8,textTransform:"uppercase",marginBottom:7}}>Catheter</div>
          {[["Type","Foley 16Fr"],["Inserted","15 Jun 09:12"],["Duration","4 days 5h 20min"],["Firmware","v2.1.4"]].map(([l,v])=><InfoRow key={l} label={l} value={v}/>)}
        </div>
      </div>
    </Shell>
  );

  return null;
}
