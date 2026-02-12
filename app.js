const modules=[
  {id:"M1",title:"Rôle du consultant",lessons:["Posture","Livrables","Relation client"],validated:false},
  {id:"M2",title:"EBIOS RM",lessons:["Atelier 1","Atelier 2","Atelier 3","Atelier 4","Atelier 5"],validated:false},
  {id:"M3",title:"ISO 27001 PME",lessons:["SMSI","Annexe A","Audit"],validated:false},
  {id:"M4",title:"NIS2",lessons:["Obligations","Plan action"],validated:false},
  {id:"M5",title:"RGPD",lessons:["Art 32","Violations"],validated:false},
  {id:"M6",title:"Architecture cyber",lessons:["Zero Trust","Sauvegardes"],validated:false},
  {id:"M7",title:"Microsoft 365",lessons:["MFA","Conditional Access"],validated:false},
  {id:"M8",title:"Gestion crise",lessons:["Runbook","Communication"],validated:false},
  {id:"M9",title:"Quantification risque",lessons:["ROI","Priorisation"],validated:false},
  {id:"M10",title:"IA & cybersécurité",lessons:["Risques IA","Politique IA"],validated:false}
];

let current=null;

function render(){
  const grid=document.getElementById("modulesGrid");
  grid.innerHTML="";

  modules.forEach((m,i)=>{
    const btn=document.createElement("div");
    btn.className="module-btn";
    if(i>0 && !modules[i-1].validated) btn.classList.add("locked");

    btn.innerHTML=`<strong>${m.id}</strong><br>${m.title}`;
    btn.onclick=()=>{
      if(btn.classList.contains("locked")) return;
      openModule(i);
    };
    grid.appendChild(btn);
  });

  updateStats();
}

function openModule(i){
  current=i;
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("moduleView").classList.remove("hidden");

  document.getElementById("moduleTitle").innerText=modules[i].id+" – "+modules[i].title;

  const list=document.getElementById("lessonsList");
  list.innerHTML="";
  modules[i].lessons.forEach(l=>{
    const li=document.createElement("li");
    li.innerText=l;
    list.appendChild(li);
  });
}

function goBack(){
  document.getElementById("dashboard").classList.remove("hidden");
  document.getElementById("moduleView").classList.add("hidden");
}

function validateModule(){
  const c=parseInt(scoreC.value)||0;
  const p=parseInt(scoreP.value)||0;
  const d=parseInt(scoreD.value)||0;

  const total=c+p+d;
  totalScore.innerText=total+"/20";

  if(total>=14){
    modules[current].validated=true;
    alert("Module validé");
    goBack();
  }else{
    alert("Score insuffisant (<14)");
  }

  render();
}

function updateStats(){
  const validated=modules.filter(m=>m.validated).length;
  validatedCount.innerText=validated+" / 10";
  const progress=Math.round((validated/10)*100);
  globalProgress.innerText=progress+"%";
  progressBar.style.width=progress+"%";

  let level="Fondation";
  if(validated>=4) level="Intermédiaire";
  if(validated>=7) level="Avancé";
  if(validated===10) level="Premium";
  levelBadge.innerText=level;
}

render();
