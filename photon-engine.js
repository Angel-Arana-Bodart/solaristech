(function(root){
'use strict';
const H=6.62607015e-34,C=299792458,Q=1.602176634e-19;
const defaults={wavelength:650,flux:1e16,gap:1.12,reflectance:.1,alpha:.02,thickness:180,collection:.8};
const limits={wavelength:[300,1600],flux:[0,1e19],gap:[.5,3],reflectance:[0,1],alpha:[0,1],thickness:[0,500],collection:[0,1]};
function calculate(s){for(const[k,[min,max]]of Object.entries(limits))if(!Number.isFinite(s[k])||s[k]<min||s[k]>max)throw Error('Revisa el parámetro '+k+'.');
const energyJ=H*C/(s.wavelength*1e-9),energyEV=energyJ/Q,cutoff=H*C/(s.gap*Q)*1e9,eligible=energyEV>=s.gap,alphaEffective=eligible?s.alpha:0,absorptance=-Math.expm1(-alphaEffective*s.thickness),reflected=s.flux*s.reflectance,entered=s.flux-reflected,absorbed=entered*absorptance,transmitted=entered-absorbed,collected=absorbed*s.collection,current=Q*collected;
return{energyJ,energyEV,cutoff,eligible,alphaEffective,absorptance,reflected,entered,absorbed,transmitted,collected,current,opticalPower:s.flux*energyJ,reflectionFraction:s.reflectance,absorptionFraction:(1-s.reflectance)*absorptance,transmissionFraction:(1-s.reflectance)*(1-absorptance),eqe:(1-s.reflectance)*absorptance*s.collection};}
root.PhotonEngine={defaults,limits,calculate,H,C,Q};if(typeof module!=='undefined')module.exports=root.PhotonEngine;
})(typeof globalThis!=='undefined'?globalThis:this);
