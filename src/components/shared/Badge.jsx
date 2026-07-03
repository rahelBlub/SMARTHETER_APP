export default function Badge({s}){
  const m={Normal:{bg:"#EAF3DE",c:"#3B6D11"},Warning:{bg:"#FAEEDA",c:"#854F0B"},Alert:{bg:"#FCEBEB",c:"#A32D2D"},Low:{bg:"#FAEEDA",c:"#854F0B"}};
  const t=m[s]||m.Normal;
  return <span style={{background:t.bg,color:t.c,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20,letterSpacing:.3,whiteSpace:"nowrap"}}>{s}</span>;
}