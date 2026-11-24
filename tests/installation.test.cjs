const assert=require('node:assert/strict'),E=require('../installation-engine.js'),D=E.defaults;
const near=(a,b)=>assert(Math.abs(a-b)<1e-8,`${a} != ${b}`),s={totalBase:12,totalWidth:10,availableBase:12,availableWidth:10};
const r=E.analyze(s,{...D});assert(r.valid);assert.equal(r.installed,14);near(r.dcKW,10.22);near(r.day,40.88);near(r.month,1226.4);near(r.year,14921.2);assert.equal(r.mass,525);assert(r.layout.count>=r.installed);assert(r.strings.reduce((a,n)=>a+n,0)===14);
const small=E.analyze({totalBase:10,totalWidth:8,availableBase:6,availableWidth:4},{...D});assert(small.valid);assert.equal(small.layout.count,3);assert.equal(small.installed,3);near(small.day,8.76);
const flat=E.analyze({totalBase:6,totalWidth:4,availableBase:6,availableWidth:4},{...D,mount:'flush',setback:0});assert.equal(flat.layout.count,6);assert.equal(flat.layout.orientation,'horizontal');
const blocked=E.analyze({...s,availableBase:20,availableWidth:1},{...D});assert.equal(blocked.valid,false);
const tooSmall=E.analyze({...s,availableBase:1,availableWidth:1},{...D});assert(tooSmall.valid);assert.equal(tooSmall.installed,0);assert.equal(tooSmall.day,0);
const capped=E.analyze({totalBase:50,totalWidth:50,availableBase:50,availableWidth:50},{...D,target:100});assert.equal(capped.installed,20);near(capped.equivalentAC,10);near(capped.day,50);assert(capped.layout.count>20);
assert(!E.analyze(s,{...D,pr:NaN}).valid);assert(!E.analyze(s,{...D,sunElevation:0}).valid);assert(!E.analyze({...s,availableBase:100},{...D}).valid);
const insufficientVoltage=E.analyze(s,{...D,target:1});assert(insufficientVoltage.valid);assert(!insufficientVoltage.energyEligible);assert.equal(insufficientVoltage.day,null);
assert(E.analyze(s,{...D,setback:1}).layout.count<=r.layout.count);assert(E.analyze(s,{...D,sunElevation:10}).layout.count<=r.layout.count);
for(const mount of ['tilted','flush'])for(const b of [3,6,12,20])for(const w of [3,8,15]){const q={totalBase:b,totalWidth:w,availableBase:b,availableWidth:w},o={...D,mount,target:100},a=E.analyze(q,o);assert(a.valid);const boxes=Array.from({length:Math.min(a.layout.count,100)},(_,i)=>E.position(a.layout,o,i));for(const box of boxes){assert(box.x>=o.setback-1e-8&&box.y>=o.setback-1e-8);assert(box.x+box.width<=b-o.setback+1e-8);assert(box.y+box.height<=w-o.setback+1e-8);}for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){const x=boxes[i],y=boxes[j];assert(x.x+x.width<=y.x+1e-8||y.x+y.width<=x.x+1e-8||x.y+x.height<=y.y+1e-8||y.y+y.height<=x.y+1e-8);}assert(a.installed<=a.layout.count&&a.installed<=a.maxElectrical);}
console.log('OK: acomodo, giros, sombra, márgenes, pasillos, límites de inversor, conservación geométrica y kWp/kWh.');

// Ideal dimensions are equal, rounded upward to tenths, and keep requested capacity.
for(const mount of ['tilted','flush'])for(const target of [2,3,7,14,20,100])for(const tilt of [0,10,45]){
 const o={...D,mount,target,tilt},ideal=E.ideal(o);assert(ideal.valid,ideal.message);
 const v=ideal.values;assert.equal(v.totalBase,v.availableBase);assert.equal(v.totalWidth,v.availableWidth);
 near(v.totalBase*10,Math.round(v.totalBase*10));near(v.totalWidth*10,Math.round(v.totalWidth*10));
 assert(ideal.baseAdjustment>=-1e-9&&ideal.baseAdjustment<.100000001);assert(ideal.widthAdjustment>=-1e-9&&ideal.widthAdjustment<.100000001);
 const a=E.analyze(v,o);assert(a.valid&&a.energyEligible);assert.equal(a.installed,Math.min(target,a.maxElectrical));
 const beta=(mount==='tilted'?tilt:0)*Math.PI/180;
 // No enumerated uniform rectangular layout has a smaller rounded enclosing area.
 for(const [across,depth] of [[E.panel.width,E.panel.length],[E.panel.length,E.panel.width]])for(let cols=1;cols<=a.installed;cols++){
  const rows=Math.ceil(a.installed/cols),gap=Math.max(o.moduleGap,mount==='tilted'?depth*Math.sin(beta)/Math.tan(o.sunElevation*Math.PI/180):0);
  const b=2*o.setback+cols*across+(cols-1)*o.moduleGap;
  const w=2*o.setback+rows*depth*Math.cos(beta)+(rows-1)*gap+Math.floor((rows-1)/o.aisleEvery)*Math.max(0,o.aisle-gap);
  assert(ideal.area<=Math.ceil(b*10-1e-10)*Math.ceil(w*10-1e-10)/100+1e-8);
 }
}
assert(!E.ideal({...D,target:1}).valid);assert(!E.ideal({...D,pr:NaN}).valid);
assert(!E.analyze({totalBase:10,totalWidth:8,availableBase:8,availableWidth:10},D).valid);
console.log('OK: espacio ideal, mínimo entre retículas evaluadas, igualdad, décimas y tolerancia.');
