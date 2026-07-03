import { C } from "../../constants/colors";

export default function UrinRing({ml,goal}){
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