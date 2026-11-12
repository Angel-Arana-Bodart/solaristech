const assert=require('node:assert/strict'),P=require('../photon-engine.js'),CE=require('../cell-engine.js');
const s={...P.defaults},near=(a,b,tolerance=1e-10)=>assert(Math.abs(a-b)<=tolerance*Math.max(1,Math.abs(b)),`${a} != ${b}`);
const r=P.calculate(s);near(r.energyEV,1.9074492066646195);near(r.cutoff,1107.0017717250024);near(r.reflected+r.absorbed+r.transmitted,s.flux);near(r.absorbed+r.transmitted,r.entered);near(r.current,P.Q*r.collected);assert(r.eligible&&r.current>0);
const infrared=P.calculate({...s,wavelength:1300});assert.equal(infrared.eligible,false);near(infrared.absorbed,0);near(infrared.current,0);near(infrared.transmitted,s.flux*(1-s.reflectance));
for(const variant of [{thickness:0},{alpha:0},{reflectance:1},{flux:0}])near(P.calculate({...s,...variant}).absorbed,0);
near(P.calculate({...s,collection:0}).current,0);near(P.calculate({...s,flux:2*s.flux}).current,2*r.current);
assert(P.calculate({...s,thickness:300}).transmitted<r.transmitted);
for(const wavelength of [300,650,1100,1300,1600])for(const reflectance of [0,.25,1])for(const thickness of [0,180,500]){const t={...s,wavelength,reflectance,thickness},a=P.calculate(t);near(a.reflected+a.absorbed+a.transmitted,t.flux);near(a.reflectionFraction+a.absorptionFraction+a.transmissionFraction,1);assert(a.eqe>=0&&a.eqe<=1);assert(a.collected<=a.absorbed);assert(Number.isFinite(a.current));}
for(const variant of [{wavelength:0},{flux:NaN},{reflectance:1.01},{alpha:-1},{gap:0}])assert.throws(()=>P.calculate({...s,...variant}));
assert.deepEqual(CE.defaults.measurements.map(m=>m.i),[.00222,.00345,.00352]);assert.deepEqual(CE.defaults.measurements.map(m=>m.v),[0,.085,.131]);near(CE.measuredPower({v:.085,i:.00345,method:'load'}),.00029325);assert.equal(CE.measuredPower(CE.defaults.measurements[1]),null);
console.log('OK: energía y umbral, conservación de fotones, absorción/transmisión, corriente, entradas inválidas y unidades mA/A.');
