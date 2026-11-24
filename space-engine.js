(function(root){
'use strict';
const fields=['totalBase','totalWidth','availableBase','availableWidth'];
function analyze(values){const errors={};let complete=true;for(const key of fields){const v=values[key];if(v===null||v===undefined||v===''){complete=false;continue;}if(typeof v!=='number'||!Number.isFinite(v)||v<=0)errors[key]='Introduce una medida mayor que cero en metros.';}
const area=(a,b)=>typeof values[a]==='number'&&typeof values[b]==='number'&&Number.isFinite(values[a])&&Number.isFinite(values[b])&&values[a]>0&&values[b]>0?values[a]*values[b]:null;
const total=area('totalBase','totalWidth'),available=area('availableBase','availableWidth');
if(total!==null&&(!Number.isFinite(total)||total<=0)){errors.totalBase='Las medidas están fuera del rango numérico calculable.';errors.totalWidth=errors.totalBase;}
if(available!==null&&(!Number.isFinite(available)||available<=0)){errors.availableBase='Las medidas están fuera del rango numérico calculable.';errors.availableWidth=errors.availableBase;}
let exceeded=false;if(total!==null&&available!==null&&Number.isFinite(total)&&Number.isFinite(available)&&available>total){exceeded=true;errors.availableBase='El área disponible no puede ser mayor que el área total.';errors.availableWidth=errors.availableBase;}
const valid=complete&&Object.keys(errors).length===0;return{valid,complete,errors,exceeded,total:Number.isFinite(total)?total:null,available:Number.isFinite(available)?available:null,remaining:valid?total-available:null,percentage:valid?available/total*100:null};}
root.SpaceEngine={fields,analyze};if(typeof module!=='undefined')module.exports=root.SpaceEngine;
})(typeof globalThis!=='undefined'?globalThis:this);
