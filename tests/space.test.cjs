const assert=require('node:assert/strict'),{analyze}=require('../space-engine.js'),s={totalBase:10,totalWidth:8,availableBase:6,availableWidth:4};
const r=analyze(s);assert.equal(r.valid,true);assert.equal(r.total,80);assert.equal(r.available,24);assert.equal(r.remaining,56);assert.equal(r.percentage,30);
const equal=analyze({...s,availableBase:10,availableWidth:8});assert(equal.valid);assert.equal(equal.percentage,100);assert.equal(equal.remaining,0);
const excess=analyze({...s,availableBase:10,availableWidth:9});assert.equal(excess.valid,false);assert(excess.exceeded);assert.equal(excess.remaining,null);assert(excess.errors.availableBase&&excess.errors.availableWidth);
for(const v of [0,-1,NaN,Infinity])assert.equal(analyze({...s,totalBase:v}).valid,false);
assert.equal(analyze({...s,availableWidth:null}).complete,false);assert.equal(analyze({...s,totalBase:1e308,totalWidth:1e308}).valid,false);
assert.equal(analyze({}).complete,false);assert.equal(analyze({...s,totalBase:5e-324,totalWidth:5e-324}).valid,false);
assert.equal(analyze({...s,totalBase:.5,totalWidth:.5,availableBase:.25,availableWidth:.5}).available,.125);
// This user requirement compares areas, not individual side lengths or geometric fit.
assert(analyze({...s,availableBase:20,availableWidth:1}).valid);
console.log('V3 OK: áreas, igualdad, exceso, medidas inválidas, decimales y comparación por superficie.');
