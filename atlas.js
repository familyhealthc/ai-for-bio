(() => {
 'use strict';
 const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
 const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const meta=window.BIO_ATLAS_META, questions=window.ATLAS_QUESTIONS, institutions=window.ATLAS_INSTITUTIONS, papers=window.BIO_CONTENT.papers;
 const byId=id=>questions.find(q=>q.id===id);
 const params=new URLSearchParams(location.search);
 let selected=byId(params.get('problem'))?.id||questions[0].id;
 let direction='all',region='all',search='',view=params.has('problem')?'graph':'structure',axisFilter=null,zoom=1;
 const dims=q=>meta.dimensionsFor(q);
 const matchInst=(q,i)=>meta.institutionScore(q,i);
 function matchedInstitutions(q, all=false){
  return institutions.filter(i=>(region==='all'||i.region===region)&&(all||matchInst(q,i)>0)).filter(i=>!search||!all||[i.name,i.description,...i.capabilities.map(t=>meta.capabilities[t])].join(' ').toLowerCase().includes(search)).sort((a,b)=>all?0:matchInst(q,b)-matchInst(q,a));
 }
 function filteredQuestions(){
  return questions.filter(q=>direction==='all'||q.direction===direction).filter(q=>!axisFilter||dims(q)[axisFilter.axis].includes(axisFilter.term)).filter(q=>{
   if(!search)return true;
   const own=[q.title,q.why,q.bottleneck,...q.tags.map(t=>meta.capabilities[t]),...Object.values(dims(q)).flat()].join(' ').toLowerCase();
   return own.includes(search)||institutions.some(i=>(i.name+' '+i.description).toLowerCase().includes(search)&&matchInst(q,i)>0);
  });
 }
 function setView(next){view=next;render();}
 function selectQuestion(id, next='graph'){
  if(!byId(id))return; selected=id; view=next;
  const url=new URL(location.href);url.searchParams.set('problem',id);history.replaceState(null,'',url);
  render();
  (next==='graph'?$('#atlas-graph-view'):$('#atlas-detail')).scrollIntoView({behavior:'smooth',block:'start'});
 }
 function render(){
  const visible=filteredQuestions();
  if(visible.length&&!visible.some(q=>q.id===selected))selected=visible[0].id;
  $$('[data-view]').forEach(b=>{b.classList.toggle('active',b.dataset.view===view);b.setAttribute('aria-pressed',String(b.dataset.view===view));});
  $('#atlas-taxonomy').hidden=view!=='structure';$('#atlas-catalog').hidden=view!=='catalog';$('#atlas-graph-view').hidden=view!=='graph'||!visible.length;
  $('#atlas-detail').hidden=view==='structure'||view==='institutions'||!visible.length;
  $('.atlas-institution-results').hidden=view==='structure'||(!visible.length&&view!=='institutions');
  $('#atlas-result-count').textContent=view==='institutions'?`${matchedInstitutions(byId(selected),true).length} 个机构`:`${visible.length} / ${questions.length} 个候选问题`;
  $('#active-axis-filter').hidden=!axisFilter;
  if(axisFilter)$('#active-axis-filter').innerHTML=`按「${e(meta.axes.find(a=>a.id===axisFilter.axis).name)} / ${e(axisFilter.term)}」筛选 <button id="clear-axis">清除 ×</button>`;
  $('#direction-filters').innerHTML=[{id:'all',name:'全部主题'},...meta.directions].map(d=>`<button data-direction-filter="${d.id}" class="${direction===d.id?'active':''}" aria-pressed="${direction===d.id}">${e(d.name)}<span>${questions.filter(q=>d.id==='all'||q.direction===d.id).length}</span></button>`).join('');
  renderTaxonomy();renderCatalog(visible);
  if(visible.length){renderBrief(byId(selected));if(view==='graph')renderGraph(byId(selected));}
  renderInstitutions(view==='institutions');
 }
 function renderTaxonomy(){
  $('#atlas-taxonomy').innerHTML='<div class="taxonomy-intro"><h2>五个使命主题，六条分类轴。</h2><p>使命说明我们想推动什么；分类轴帮助看见被遗漏的研究领域。点击任一标签，查看已收录的问题。标为“待补”的领域目前没有专门问题条目，可以贡献补充。</p></div>'+meta.axes.map((a,index)=>`<section class="taxonomy-axis"><div><span class="mono">0${index+1}</span><h3>${e(a.name)}</h3><p>${e(a.description)}</p></div><div class="taxonomy-terms">${a.terms.map(term=>{const count=questions.filter(q=>dims(q)[a.id].includes(term)).length;return `<button data-axis="${a.id}" data-term="${e(term)}" class="${count?'':'uncovered'}">${e(term)}<span>${count||'待补'}</span></button>`;}).join('')}</div></section>`).join('')+'<div class="taxonomy-footnote">分类是可扩展的工作框架，不是生物医学的穷尽目录。标签与问题关联属于本计划的编辑整理，不代表学界唯一分类；证据覆盖不足会明确显示。</div>';
 }
 function renderCatalog(list){
  $('#atlas-catalog').innerHTML=list.length?meta.directions.map(d=>{
   const items=list.filter(q=>q.direction===d.id);if(!items.length)return '';
   return `<section class="catalog-direction"><div class="catalog-direction-heading"><h2>${e(d.name)}</h2><span>${e(d.en)} · ${items.length}题</span></div>${items.map(q=>`<article class="catalog-problem ${q.id===selected?'selected':''}"><span class="catalog-problem-number">${e(q.id.split('-').pop())}</span><div><button class="catalog-problem-title" data-select-problem="${q.id}" data-next-view="catalog">${e(q.title)}</button><p>${e(q.bottleneck)}</p><div class="catalog-tags">${q.tags.slice(0,4).map(t=>`<span>${e(meta.capabilities[t])}</span>`).join('')}</div></div><button class="catalog-open" data-select-problem="${q.id}" data-next-view="graph" aria-label="查看关系图：${e(q.title)}">↗</button></article>`).join('')}</section>`;
  }).join(''):'<p class="atlas-no-results">目前没有匹配的专门问题条目。可以清除筛选，或从合作入口贡献该方向的问题与证据。</p>';
  if(!list.length&&view==='graph')$('#atlas-catalog').hidden=false;
 }
 function renderBrief(q){
  const related=meta.evidenceFor(q,papers), dimensions=dims(q);
  $('#detail-kind').textContent=`${q.id.toUpperCase()} / 候选研究简案`;
  $('#atlas-detail-body').innerHTML=`<h2>${e(q.title)}</h2><div class="brief-dimensions">${['mechanisms','diseases','goals','stages'].map(axis=>`<p><strong>${e(meta.axes.find(a=>a.id===axis).name)}：</strong>${e(dimensions[axis].join('、')||'待进一步细化')}</p>`).join('')}</div><div class="atlas-detail-grid"><div><h3>为什么值得研究</h3><p>${e(q.why)}</p><h3>当前需要解决的判断</h3><p>${e(q.bottleneck)}</p></div><div><h3>首轮拟议任务</h3><p>${e(q.firstTask)}</p><h3>继续或转向的依据</h3><p>${e(q.criteria||q.decision)}</p></div></div><h3>需要什么能力与角色</h3><p>${e(q.tags.map(t=>meta.capabilities[t]).join('、'))}。</p><p>${e(dimensions.roles.join('、'))}。具体人员、资源使用条件和经费待确认。</p><div class="detail-evidence"><h3>相关研究与证据缺口</h3>${related.length?related.map(p=>`<a href="insights/${e(p.id)}/">${e(p.title)} ↗</a><p>${e(p.stage)}。${e(p.limit)}</p>`).join(''):'<p>尚未补入针对该题的专项原始研究。本轮首先需要完成已有工作与新颖性核查，不能把缺少资料理解为无人研究。</p>'}<p>以上为相邻研究或资源入口，不构成对本候选方案可行性的证明。当前没有已完成的验证结果。</p></div><a class="text-link" href="research/${e(q.id)}/">打开独立研究简案 ↗</a><br><a class="text-link" href="index.html?topic=${encodeURIComponent(q.title)}#collaborate">围绕这个任务参与 ↗</a>`;
 }
 function renderInstitutions(all){
  const q=byId(selected);let items=matchedInstitutions(q,all);
  if(all&&direction!=='all'){const qs=questions.filter(x=>x.direction===direction);items=items.filter(i=>qs.some(x=>matchInst(x,i)>0));}
  if(all&&axisFilter){const qs=filteredQuestions();items=items.filter(i=>qs.some(x=>matchInst(x,i)>0));}
  $('#institution-result-count').textContent=`${items.length} 个候选节点`;
  if(all)$('#atlas-result-count').textContent=`${items.length} 个机构`;
  $('.atlas-block-heading h2').textContent=all?'完整机构目录':'按能力标签匹配的候选节点';
  $('#institution-results').innerHTML=items.length?items.map(i=>`<details class="institution-detail" id="institution-${e(i.id)}"><summary>${e(i.name)} <span>${e(i.location)} · ${e(i.status)}</span></summary><div class="institution-body"><p><strong>公开能力与边界：</strong>${e(i.description)}</p><p><strong>能力标签：</strong>${e(i.capabilities.map(t=>meta.capabilities[t]).filter(Boolean).join('、'))}</p><p><strong>可讨论的合作：</strong>${e(i.collaborationProposal)}</p><p>${e(i.relationship)}。能力匹配不构成资源可用性、科研质量或合作意愿的确认。</p><a href="${e(i.url)}" target="_blank" rel="noopener noreferrer">核对官方资料 ↗</a></div></details>`).join(''):'<p class="atlas-no-results">该筛选条件下尚无匹配的候选机构。这里是待补能力，不能据此判断该地域没有相关团队。</p>';
 }
 function node(x,y,w,h,label,sub,kind,id,extra=''){
  const words=[];let line='';for(const char of label){line+=char;if(line.length>=16){words.push(line);line='';}}if(line)words.push(line);
  return `<g class="graph-node ${extra}" transform="translate(${x} ${y})" role="button" tabindex="0" aria-label="${e(label)}" data-node-kind="${kind}" data-node-id="${e(id)}"><title>${e(label+'：'+sub)}</title><rect width="${w}" height="${h}" rx="3"/><text x="13" y="${words.length>1?23:27}">${words.slice(0,2).map((l,i)=>`<tspan x="13" dy="${i?18:0}">${e(l)}</tspan>`).join('')}</text><text class="node-sub" x="13" y="${h-10}">${e(sub)}</text></g>`;
 }
 function edge(x1,y1,x2,y2,suggested=false){return `<path class="graph-edge ${suggested?'suggested':''}" d="M${x1} ${y1} C${x1+50} ${y1},${x2-50} ${y2},${x2} ${y2}"/>`;}
 function renderGraph(q){
  $('#graph-title').textContent=q.title;
  const dir=meta.directions.find(d=>d.id===q.direction),caps=q.tags.slice(0,5),inst=matchedInstitutions(q).slice(0,7),related=meta.evidenceFor(q,papers).slice(0,2);
  let links=edge(175,258,235,258),nodes=node(20,220,155,76,dir.name,'使命主题','direction',dir.id)+node(235,198,230,120,q.title,'候选问题 · 未立项','problem',q.id,'problem-node');
  caps.forEach((cap,index)=>{const y=35+index*100;links+=edge(465,258,535,y+35);nodes+=node(535,y,185,70,meta.capabilities[cap],'拟需要','capability',cap);});
  inst.forEach((i,index)=>{const y=18+index*84;nodes+=node(815,y,280,72,i.name,i.location+' · 待接洽','institution',i.id);caps.forEach((cap,cindex)=>{if(i.capabilities.includes(cap))links+=edge(720,70+cindex*100,815,y+36,true);});});
  links+=edge(350,318,350,425);nodes+=node(235,425,230,100,'首轮任务与交付','拟议 · 人员经费待确认','task',q.id);
  if(related.length)related.forEach((p,index)=>{const y=405+index*105;nodes+=node(20,y,190,90,p.title,p.stage.slice(0,17),'evidence',p.id);links+=edge(210,y+45,235,460,true);});
  else nodes+=node(20,425,190,90,'专项原始证据待补','首轮核查任务','gap',q.id);
  const remaining=matchedInstitutions(q).length-inst.length;
  $('#relation-graph').innerHTML='<title id="graph-svg-title">'+e(q.title)+'</title><desc id="graph-svg-description">实线为研究目录关联；虚线为候选能力匹配，未确认合作。</desc><text x="20" y="25" class="graph-column-label">研究依据与使命</text><text x="235" y="25" class="graph-column-label">问题与任务</text><text x="535" y="20" class="graph-column-label">所需能力</text><text x="815" y="655" class="graph-column-label">'+e(remaining>0?`图中显示7个；其余${remaining}个见下方目录`:'所有候选节点见下方目录')+'</text>'+links+nodes;
 }
 function focusNode(kind,id){
  if(kind==='institution'){
   const target=$('#institution-'+id);if(target){target.open=true;target.scrollIntoView({behavior:'smooth',block:'center'});target.querySelector('summary').focus();}
  }else if(kind==='evidence'){const p=papers.find(x=>x.id===id);if(p)location.href='insights/'+p.id+'/';}
  else if(kind==='direction'){direction=id;view='catalog';axisFilter=null;render();}
  else if(kind==='capability'){axisFilter={axis:'methods',term:meta.capabilities[id]};view='catalog';render();}
  else $('#atlas-detail').scrollIntoView({behavior:'smooth',block:'start'});
 }
 document.addEventListener('click',event=>{
  const b=event.target.closest('[data-select-problem]');if(b)selectQuestion(b.dataset.selectProblem,b.dataset.nextView);
  const d=event.target.closest('[data-direction-filter]');if(d){direction=d.dataset.directionFilter;axisFilter=null;if(view==='structure')view='catalog';render();$('#direction-filters [data-direction-filter="'+direction+'"]').focus({preventScroll:true});}
  const axis=event.target.closest('[data-axis]');if(axis){axisFilter={axis:axis.dataset.axis,term:axis.dataset.term};view='catalog';direction='all';search='';$('#atlas-search').value='';render();$('#atlas-catalog').scrollIntoView({behavior:'smooth',block:'start'});}
  if(event.target.closest('#clear-axis')){axisFilter=null;render();}
  const n=event.target.closest('[data-node-kind]');if(n)focusNode(n.dataset.nodeKind,n.dataset.nodeId);
 });
 $('#relation-graph').addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){const n=event.target.closest('[data-node-kind]');if(n){event.preventDefault();focusNode(n.dataset.nodeKind,n.dataset.nodeId);}}});
 $$('[data-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));
 $('#atlas-search').addEventListener('input',event=>{search=event.target.value.trim().toLowerCase();if(search&&view==='structure')view='catalog';render();});
 $('#atlas-region').addEventListener('change',event=>{region=event.target.value;render();});
 function zoomTo(value){zoom=Math.max(.75,Math.min(1.75,value));$('#relation-graph').style.width=(1120*zoom)+'px';$('#zoom-label').textContent=Math.round(zoom*100)+'%';}
 $('#zoom-in').addEventListener('click',()=>zoomTo(zoom+.25));$('#zoom-out').addEventListener('click',()=>zoomTo(zoom-.25));$('#zoom-reset').addEventListener('click',()=>{zoomTo(1);$('.graph-scroll').scrollTo(0,0);});
 $('#atlas-stats').innerHTML=`<span><strong>${meta.axes.length}</strong>分类轴</span><span><strong>${questions.length}</strong>候选问题</span><span><strong>${institutions.length}</strong>能力节点</span><span><strong>${papers.length}</strong>外部研究条目</span><span><strong>${questions.length}</strong>拟议首轮任务</span>`;
 $('#export-atlas').addEventListener('click',()=>{
  const nodes=[...meta.directions.map(d=>({id:'direction:'+d.id,type:'mission',label:d.name})),...questions.map(q=>({...q,id:'problem:'+q.id,type:'problem',dimensions:dims(q)})),...Object.entries(meta.capabilities).map(([id,label])=>({id:'capability:'+id,type:'capability',label})),...institutions.map(i=>({...i,id:'institution:'+i.id,type:'institution'})),...papers.map(p=>({...p,id:'evidence:'+p.id,type:'evidence'})),...questions.map(q=>({id:'task:'+q.id,type:'proposed-task',label:q.firstTask,status:'拟议，未执行'})),...meta.axes.map(a=>({id:'axis:'+a.id,type:'classification-axis',label:a.name})),...meta.axes.flatMap(a=>a.terms.map(term=>({id:'dimension:'+a.id+':'+term,type:'classification-term',label:term,axis:a.id})))];
  const edges=[];questions.forEach(q=>{edges.push({from:'direction:'+q.direction,to:'problem:'+q.id,relation:'属于使命议程'});edges.push({from:'problem:'+q.id,to:'task:'+q.id,relation:'拟议首轮任务'});q.tags.forEach(t=>edges.push({from:'problem:'+q.id,to:'capability:'+t,relation:'拟需要'}));meta.evidenceFor(q,papers).forEach(p=>edges.push({from:'problem:'+q.id,to:'evidence:'+p.id,relation:'相邻研究参考，非可行性证明'}));});institutions.forEach(i=>i.capabilities.forEach(t=>edges.push({from:'institution:'+i.id,to:'capability:'+t,relation:'公开能力方向的编辑映射，未确认可用'})));
  meta.axes.forEach(a=>a.terms.forEach(term=>edges.push({from:'axis:'+a.id,to:'dimension:'+a.id+':'+term,relation:'分类轴包含'})));
  questions.forEach(q=>Object.entries(dims(q)).forEach(([axis,terms])=>terms.forEach(term=>edges.push({from:'problem:'+q.id,to:'dimension:'+axis+':'+term,relation:axis==='stages'?'拟涉及阶段，不代表已完成':'编辑分类关联'}))));
  const output={name:'Family Health AI for Bio 研究合作图谱',version:'0.2',date:'2026-11-16',notice:'使命主题与分类轴均非学科穷尽；全部研究问题和任务未立项，机构未确认合作；资料缺口不代表学界空白。',axes:meta.axes,nodes,edges};
  const url=URL.createObjectURL(new Blob([JSON.stringify(output,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='Family-Health-research-atlas.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 });
 render();
})();
