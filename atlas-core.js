window.BIO_ATLAS_META = {
 directions:[{id:'foundation',name:'基础生物学',en:'FUNDAMENTAL BIOLOGY'},{id:'disease',name:'疾病机制',en:'DISEASE MECHANISMS'},{id:'therapy',name:'治疗发现',en:'THERAPEUTIC DISCOVERY'},{id:'regeneration',name:'组织再生',en:'TISSUE REGENERATION'},{id:'longevity',name:'健康寿命',en:'HEALTHY LONGEVITY'}],
 capabilities:{compbio:'计算生物与AI',singlecell:'单细胞与空间组学',protein:'蛋白设计与结构',stemcell:'干细胞与细胞命运',organoid:'类器官与疾病模型',clinical:'临床问题与研究评价',screening:'筛选与干预评价',aging:'衰老机制',automation:'实验自动化',chemistry:'化学与分子分析',data:'数据治理与复现',functional:'功能评价',manufacturing:'工艺与制造',biosecurity:'研究安全与风险评估'},
 evidenceFor(q,papers){
   const t=q.title+' '+q.bottleneck;
   let ids=[];
   if(/干预预测|响应预测|跨情境|扰动|跨细胞/.test(t)) ids.push('state','arc-cell-atlas');
   if(/基因调控|非编码|变异|遗传/.test(t)) ids.push('alphagenome');
   if(/图谱|批次|跨实验室|可重复|可复现/.test(t)) ids.push('arc-cell-atlas');
   if(/免疫|耐药|微环境/.test(t)) ids.push('macrophage-resistance');
   if(/药物|候选分子|临床转化/.test(t)&&q.direction==='therapy') ids.push('rentosertib');
   if(/组织成熟|组织整合|血管|神经|类器官|修复/.test(t)&&q.direction==='regeneration') ids.push('gut-tissue','engineered-heart-muscle');
   if(/衰老细胞|衰老状态|细胞异质/.test(t)) ids.push('sennet-framework');
   if(/干预|健康获益|健康寿命|功能/.test(t)&&q.direction==='longevity') ids.push('senolytics-mash');
   return [...new Set(ids)].map(id=>papers.find(p=>p.id===id)).filter(Boolean).slice(0,3);
 }
};
window.BIO_ATLAS_META.axes = [
 {id:'mechanisms',name:'生命过程与机制',description:'研究什么生命过程；同一问题可涉及多个机制。',terms:['基因与调控','表观遗传','RNA与蛋白','细胞状态与命运','发育与生殖','免疫与炎症','代谢与稳态','微生物组','神经系统','组织微环境','衰老机制']},
 {id:'diseases',name:'疾病与研究情境',description:'面向什么疾病、损伤或人群问题。',terms:['肿瘤','心血管与代谢疾病','神经退行性疾病','精神与心理健康','自身免疫疾病','感染与抗微生物耐药','罕见遗传病','纤维化','损伤与慢性伤口','肌肉骨骼疾病','生殖与发育问题','多病共存','通用研究基础']},
 {id:'goals',name:'希望改善的结果',description:'从解释机制，到预防、诊断、治疗和功能恢复。',terms:['理解生命与疾病','预防','早筛与诊断','治疗发现','修复与再生','康复与功能','健康寿命','生物安全防御','研究可靠性']},
 {id:'methods',name:'方法与研究能力',description:'需要什么计算、测量、模型或工程能力。',terms:Object.values(window.BIO_ATLAS_META.capabilities)},
 {id:'stages',name:'拟涉及的研发阶段',description:'这是拟议任务所需阶段，不代表已经完成。',terms:['证据与路线评估','计算与数据研究','体外与机制验证','动物与临床前研究','人体与临床研究','工艺与制造','应用与实施评价']},
 {id:'roles',name:'协作角色',description:'谁能对研究中的具体工作负责。',terms:['科学问题负责人','AI与计算团队','实验与疾病模型团队','测量与技术服务平台','临床合作团队','工艺与转化团队','共同支持方']}
];
window.BIO_ATLAS_META.dimensionsFor = function(q) {
 const text=[q.title,q.why,q.bottleneck,...(q.mechanisms||[]),...(q.diseases||[])].join(' ');
 const goaltext=[q.title,q.why,...(q.goals||[])].join(' ');
 const stage=(q.stages||[]).join(' ');
 const pick=(rules,t)=>rules.filter(([,r])=>r.test(t)).map(([n])=>n);
 const mechanisms=pick([['基因与调控',/基因|遗传|调控/],['表观遗传',/表观|染色质/],['RNA与蛋白',/RNA|蛋白|核酸/],['细胞状态与命运',/细胞|命运/],['发育与生殖',/发育|生殖|胚胎/],['免疫与炎症',/免疫|炎症|感染/],['代谢与稳态',/代谢|稳态/],['微生物组',/微生物组|菌群/],['神经系统',/神经|精神|心理/],['组织微环境',/组织|空间|微环境/],['衰老机制',/衰老|年龄|健康寿命/]],text);
 const diseases=pick([['肿瘤',/癌|肿瘤/],['心血管与代谢疾病',/心血管|心脏|代谢|糖尿病/],['神经退行性疾病',/退行|阿尔茨|帕金森/],['精神与心理健康',/精神|心理|抑郁/],['自身免疫疾病',/自身免疫|自体免疫/],['感染与抗微生物耐药',/感染|抗微生物|抗生素/],['罕见遗传病',/罕见|遗传病/],['纤维化',/纤维化/],['损伤与慢性伤口',/损伤|伤口|创伤/],['肌肉骨骼疾病',/肌肉|骨骼|活动能力/],['生殖与发育问题',/生殖|发育|胚胎/],['多病共存',/共病|多病/]],text);
 if(!diseases.length)diseases.push('通用研究基础');
 const goals=pick([['理解生命与疾病',/机制|理解|调控|因果|解释/],['预防',/预防/],['早筛与诊断',/早筛|诊断|筛查/],['治疗发现',/治疗|药物|干预|候选|靶点/],['修复与再生',/修复|再生|组织整合/],['康复与功能',/康复|功能|活动能力/],['健康寿命',/衰老|健康寿命|年龄/],['生物安全防御',/生物安全|滥用|防御|风险评估/],['研究可靠性',/重现|复现|可靠|可重复|证据|验证/]],goaltext);
 const methods=q.tags.map(t=>this.capabilities[t]).filter(Boolean);
 const stages=pick([['证据与路线评估',/证据|评估|综述|路线/],['计算与数据研究',/计算|数据|建模|分析/],['体外与机制验证',/体外|细胞|机制验证/],['动物与临床前研究',/动物|临床前/],['人体与临床研究',/人体|临床研究|人群/],['工艺与制造',/工艺|制造/],['应用与实施评价',/应用|实施|工作流|康复/]],stage);
 if(!stages.length)stages.push('证据与路线评估','计算与数据研究');
 const roles=['科学问题负责人','AI与计算团队','共同支持方'];
 if(q.tags.some(t=>['stemcell','organoid','screening','functional'].includes(t)))roles.push('实验与疾病模型团队');
 if(q.tags.some(t=>['singlecell','chemistry','protein'].includes(t)))roles.push('测量与技术服务平台');
 if(q.tags.includes('clinical'))roles.push('临床合作团队');
 if(q.tags.includes('manufacturing'))roles.push('工艺与转化团队');
 return {mechanisms,diseases,goals,methods,stages,roles};
};
window.BIO_ATLAS_META.institutionScore = function(q,i) {
 const shared=q.tags.filter(t=>i.capabilities.includes(t)).length;
 if(!shared)return 0;
 const diseases=this.dimensionsFor(q).diseases;
 const specific=diseases.some(d=>d!=='通用研究基础');
 if(specific&&/神经退行性疾病中心/.test(i.name)&&!diseases.includes('神经退行性疾病'))return 0;
 if(specific&&/神经肌肉骨骼/.test(i.name)&&!diseases.some(d=>['神经退行性疾病','肌肉骨骼疾病','损伤与慢性伤口'].includes(d)))return 0;
 if(specific&&/湘湖实验室/.test(i.name))return 0;
 const context=i.name+' '+i.description;
 const rules=[['肿瘤',/癌|肿瘤|cancer|tumou?r|HCC/i],['神经退行性疾病',/神经|脑|neuro|退行/i],['精神与心理健康',/精神|心理|脑|神经/],['心血管与代谢疾病',/心血管|心脏|代谢/],['自身免疫疾病',/免疫|immune/i],['感染与抗微生物耐药',/病原|感染|抗生素|infect/i],['罕见遗传病',/遗传|基因/],['纤维化',/纤维化|fibrosis/i],['损伤与慢性伤口',/损伤|修复|伤口/],['肌肉骨骼疾病',/肌肉|骨骼|musculo/i],['生殖与发育问题',/胚胎|发育|生殖/]];
 let bonus=rules.some(([label,regex])=>diseases.includes(label)&&regex.test(context))?3:0;
 if(q.direction==='longevity'&&/衰老|寿命|老化|aging/i.test(context))bonus+=2;
 return shared+bonus;
};
