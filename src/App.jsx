import { useState } from "react";

const C = {
  navy:"#0F1B35",teal:"#1D9E75",tealL:"#E1F5EE",tealM:"#5DCAA5",
  red:"#C0392B",redL:"#FDECEA",amber:"#BA7517",amberL:"#FAEEDA",amberM:"#EF9F27",
  blue:"#185FA5",
  g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E9ECEF",g300:"#DEE2E6",g400:"#ADB5BD",
  g600:"#6C757D",g700:"#495057",g800:"#343A40",white:"#FFFFFF",
};

function Badge({s}){
  const m={Normal:{bg:"#EAF3DE",c:"#3B6D11"},Warning:{bg:"#FAEEDA",c:"#854F0B"},Alert:{bg:"#FCEBEB",c:"#A32D2D"},Low:{bg:"#FAEEDA",c:"#854F0B"}};
  const t=m[s]||m.Normal;
  return <span style={{background:t.bg,color:t.c,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20,letterSpacing:.3,whiteSpace:"nowrap"}}>{s}</span>;
}

function InfoRow({label,value}){
  return(
    <div style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${C.g100}`}}>
      <span style={{fontSize:12,color:C.g600}}>{label}</span>
      <span style={{fontSize:12,fontWeight:500,color:C.g800,maxWidth:"55%",textAlign:"right"}}>{value}</span>
    </div>
  );
}

function MiniStat({label,value,warn}){
  return(
    <div style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:`1px solid ${C.g100}`}}>
      <span style={{fontSize:11,color:C.g600}}>{label}</span>
      <span style={{fontSize:11,fontWeight:700,color:warn?C.amber:C.g800}}>{value}</span>
    </div>
  );
}

function UrinRing({ml,goal}){
  const pct=Math.min(ml/goal,1);
  const fill=pct<.3?C.red:pct<.6?C.amberM:C.teal;
  const r=38,circ=2*Math.PI*r;
  return(
    <svg width="90" height="90" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke={C.g200} strokeWidth="7"/>
      <circle cx="50" cy="50" r={r} fill="none" stroke={fill} strokeWidth="7" strokeLinecap="round"
        strokeDasharray={`${circ*pct} ${circ}`} transform="rotate(-90 50 50)"/>
      <text x="50" y="46" textAnchor="middle" fontSize="13" fontWeight="800" fill={fill}>{ml}</text>
      <text x="50" y="59" textAnchor="middle" fontSize="8" fill={C.g400}>mL</text>
    </svg>
  );
}

function UCard({label,value,ref_,status}){
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

function AlertCard({title,detail,action,color}){
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

const patients=[
  {id:"00172",name:"Daniel Hartmann",age:72,ward:"Ward 7 · Bed 4B",status:"alert",catheter:"Foley 16Fr",days:4,urine:320,urineGoal:1500,nitrites:"Positive",leuko:12,ph:6.8,flow:28,temp:37.9,consultant:"Dr M. Weber"},
  {id:"10678",name:"Tanja Schick",age:61,ward:"Ward 5 · Bed 2A",status:"warning",catheter:"Foley 14Fr",days:2,urine:720,urineGoal:1500,nitrites:"Trace",leuko:6,ph:6.2,flow:38,temp:37.4,consultant:"Dr M. Patel"},
  {id:"20344",name:"Klaus Bauer",age:43,ward:"Ward 3 · Bed 1C",status:"normal",catheter:"Foley 16Fr",days:1,urine:980,urineGoal:1500,nitrites:"Negative",leuko:2,ph:5.9,flow:52,temp:36.8,consultant:"Dr A. Barnes"},
  {id:"30112",name:"Maria Hofmann",age:79,ward:"Ward 7 · Bed 3A",status:"normal",catheter:"Nelaton 12Fr",days:3,urine:1100,urineGoal:1500,nitrites:"Negative",leuko:1,ph:6.0,flow:55,temp:36.9,consultant:"Dr S. Wong"},
  {id:"10232",name:"Karen Miller",age:52,ward:"Ward 2 · Bed 3B",status:"warning",catheter:"Foley 16Fr",days:4,urine:460,urineGoal:1500,nitrites:"Trace",leuko:7,ph:6.8,flow:28,temp:36.9,consultant:"Dr A. Barnes"},
  {id:"10008",name:"Mira Knauf",age:25,ward:"Ward 5 · Bed 1A",status:"normal",catheter:"Foley 14Fr",days:2,urine:1020,urineGoal:1500,nitrites:"Trace",leuko:4,ph:6.2,flow:38,temp:36.4,consultant:"Dr M. Patel"},
  {id:"04674",name:"Mark McNeil",age:32,ward:"Ward 4 · Bed 2C",status:"normal",catheter:"Foley 16Fr",days:1,urine:980,urineGoal:1500,nitrites:"Negative",leuko:3,ph:5.9,flow:52,temp:36.8,consultant:"Dr A. Barnes"},
  {id:"32002",name:"Sven Svensonnson",age:39,ward:"Ward 7 · Bed 1B",status:"normal",catheter:"Nelaton 12Fr",days:3,urine:1000,urineGoal:1500,nitrites:"Negative",leuko:1,ph:6.0,flow:55,temp:36.9,consultant:"Dr S. Wong"},

];

function ClinicianView({screen,setScreen, selId,setSelId}){
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

const symList=[
  {id:"burn",label:"Burning sensation when urinating"},
  {id:"lower",label:"Lower abdominal pain"},
  {id:"flank",label:"Flank pain"},
  {id:"fever",label:"Fever"},
  {id:"chill",label:"Chills / shivering"},
  {id:"nausea",label:"Nausea"},
  {id:"confused",label:"Confusion / disorientation"},
  {id:"general",label:"General feeling of illness"},
];

function PatientView({pscreen,setPscreen}){
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
