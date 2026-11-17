window.BIO_CONTENT = {
  updated: '2026-11-16',
  directions: [
    { en:'FUNDAMENTAL BIOLOGY', title:'生命如何组织自己？', text:'探索细胞状态、基因调控与生命系统的基本规律，为理解疾病与功能修复建立基础。' },
    { en:'DISEASE MECHANISMS', title:'疾病从何处开始？', text:'追问疾病发生、进展与复发的机制，区分相关现象与能够被检验的因果解释。' },
    { en:'THERAPEUTIC DISCOVERY', title:'怎样找到更好的干预？', text:'连接计算预测、机制研究与实验评价，寻找值得进一步验证的治疗思路。' },
    { en:'TISSUE REGENERATION', title:'受损功能能否被修复？', text:'理解组织形成与细胞命运，探索从修复指标改善走向实际功能恢复的研究路径。' },
    { en:'HEALTHY LONGEVITY', title:'让健康陪伴更长的生命。', text:'研究衰老与功能衰退，关注干预的真实获益、适用条件，以及长期评价的证据。' }
  ],
  questions: [
    {id:'cell-response',number:'01',category:'基础生物学 × AI',title:'细胞干预预测，能否跨越不同情境？',summary:'从熟悉的数据，走向新的细胞类型、实验条件与干预。',description:'模型在熟悉的数据上表现良好之后，能否在新的细胞类型、实验条件或干预中保持可靠？我们希望找到真正有助于下一轮实验的预测与评价方法。',next:'选择一个边界清楚的公开数据任务，比较合理基线，检查评价方法与数据泄漏，明确什么结果值得进入下一阶段实验。',contribution:['计算模型与可复现分析','公开数据与使用条件核查','生物学解释与实验评价'],boundary:'计算预测不等于细胞的完整模拟；表达变化也不能直接证明治疗有效。',source:'https://arcinstitute.org/virtual-cell-initiative',sourceTitle:'参考：Arc Virtual Cell Initiative'},
    {id:'resistance',number:'02',category:'疾病机制 × 治疗发现',title:'哪些细胞状态变化，真正推动了癌症耐药？',summary:'从观察到的变化，走向能够被验证和干预的机制。',description:'区分与耐药同时出现的变化，以及能够被干预的因果机制。围绕一种明确的癌症与治疗背景，连接计算分析、疾病模型和关键验证。',next:'与疾病研究者共同审定癌症和治疗背景，整理支持与相反证据，提出具有判别力的研究任务。具体模型、团队和预算待落实。',contribution:['肿瘤机制与疾病模型','单细胞及空间组学分析','关键判断的科学复核'],boundary:'相关性、模型预测、实验验证与临床疗效是不同层次的证据。当前尚未指定靶点或候选治疗。',source:'https://www.sbms.hku.hk/staff/stephanie-kwai-yee-ma',sourceTitle:'参考：港大癌细胞可塑性研究方向'},
    {id:'functional-repair',number:'03',category:'组织再生 × 健康寿命',title:'怎样让组织修复，转化为持续的功能恢复？',summary:'从细胞与分子指标，走向组织整合、成熟功能与长期效果。',description:'共同明确什么证据，足以支持一条修复研究路线继续推进。我们关心组织如何成熟、怎样与周围环境整合，以及改善是否能够持续。',next:'选择适合的组织系统与功能终点，比较已有研究证据，梳理模型局限，再评估具体的验证需求。',contribution:['再生模型与组织工程','功能评价与长期观察','共同研究与验证支持'],boundary:'体外或动物模型中的改善不能直接外推为人体治疗；不同组织系统需要分别验证。',source:'https://www.nature.com/articles/s41551-026-01688-6',sourceTitle:'参考：功能性人源胃肠组织研究'}
  ],
  papers: [
    {id:'state',filter:'ai',category:'虚拟细胞',title:'预测细胞如何回应一次干预',date:'2025.06.23',source:'Arc Institute',stage:'计算模型 · 机构研究发布',summary:'STATE尝试预测细胞在干预后的表达变化，为下一轮实验提供计算线索。',finding:'Arc发布STATE模型，通过细胞状态表示与响应建模，预测基因或化学干预后的转录组变化。',limit:'预测表达变化不等于完整模拟细胞，也不能直接证明某项治疗对患者有效。不同细胞情境下的可靠性仍需要检验。',question:'当细胞类型或实验条件改变时，预测还能帮助我们选择更有价值的实验吗？',url:'https://arcinstitute.org/news/virtual-cell-model-state',visual:'cell'},
    {id:'rentosertib',filter:'therapy',category:'AI 药物发现',title:'AI发现的候选药物，走入临床验证',date:'2025.06.03',source:'Nature Medicine',stage:'临床研究 · Ⅱa期随机试验',summary:'一项71人、12周的肺纤维化试验报告安全性与探索性疗效信号。',finding:'研究在Ⅱa期随机试验中评估rentosertib的安全性，并观察到高剂量组的肺功能信号。',limit:'样本较小、随访较短，疗效指标主要为次要终点。这项研究不能单独证明长期获益，也不能据此表述为已获批或治愈。',question:'更大样本、更长期的研究能否确认真实获益？哪些患者更可能受益？',url:'https://www.nature.com/articles/s41591-025-03743-2',visual:'molecule'},
    {id:'gut-tissue',filter:'repair',category:'组织再生',title:'让培养组织具备更完整的功能',date:'2026.05.22',source:'Nature Biomedical Engineering',stage:'临床前研究 · 人源组织与动物移植',summary:'具有功能性肠神经系统的人源组织，为成熟与修复研究提供新方法。',finding:'研究者构建人源胃肠组织，并在动物移植中评估其整合与功能，为组织成熟研究提供方法。',limit:'这仍是临床前证据，尚非人体治疗结果。该研究本身不应被归类为AI驱动成果。',question:'组织的成熟、长期功能与宿主整合，怎样被更可靠地测量和改进？',url:'https://www.nature.com/articles/s41551-026-01688-6',visual:'tissue'}
  ],
  network: [
    {name:'浙大杭州国际科创中心',location:'杭州 · 萧山',region:'hangzhou',capability:'合成生物、AI交叉、自动化实验装置',url:'https://hic.zju.edu.cn/ibct/58279/list.htm'},
    {name:'西湖人工智能药物设计核心实验室',location:'杭州',region:'hangzhou',capability:'小分子与蛋白药物设计、计算与实验研究',url:'https://www.wllsb.edu.cn/kxyj/hxsys/202204/t20220426_20051.shtml'},
    {name:'中科院杭州医学研究所',location:'杭州',region:'hangzhou',capability:'医学人工智能、疾病研究与药物研发',url:'https://him.cas.cn/yxsgk/zzjg/kydy/202505/t20250520_7788465.html'},
    {name:'西湖大学曾坚阳团队',location:'杭州',region:'hangzhou',capability:'AI与计算生物学、高通量技术、基因调控',url:'https://aicb.lab.westlake.edu.cn/Research.htm'},
    {name:'干细胞转化研究中心 CTSCB',location:'香港',region:'hongkong',capability:'干细胞、细胞模型、药物筛选与转化研究',url:'https://www.hkstemcell.hk/'},
    {name:'港大黄渊华实验室',location:'香港',region:'hongkong',capability:'机器学习、单细胞与空间组学；计算研究',url:'https://www.sbms.hku.hk/staff/yuanhua-huang'},
    {name:'港大 Stephanie Ma 实验室',location:'香港',region:'hongkong',capability:'癌细胞可塑性、干性与耐药机制',url:'https://www.sbms.hku.hk/staff/stephanie-kwai-yee-ma'},
    {name:'港大 Ralf Jauch / PACE 实验室',location:'香港',region:'hongkong',capability:'蛋白设计、细胞命运与重编程研究',url:'https://www.sbms.hku.hk/staff/ralf-jauch'},
    {name:'再生医学与健康研究中心 CRMH',location:'香港',region:'hongkong',capability:'细胞治疗、组织器官再生与药物发现',url:'https://crmh-cas.org.hk/'},
    {name:'神经肌肉骨骼再生医学中心 CNRM',location:'香港',region:'hongkong',capability:'干细胞、组织工程与功能修复研究',url:'https://www.cnrm.com.hk/'},
    {name:'深圳医学科学院 SMART',location:'深圳',region:'mainland',capability:'结构与系统生物学、AI蛋白设计',url:'https://smart.org.cn/research-institutes/IBABI'},
    {name:'中科院深圳先进院合成生物学研究所',location:'深圳',region:'mainland',capability:'定量合成生物学、工程生物学与自动化',url:'https://isynbio.siat.ac.cn/'},
    {name:'中科院上海药物所公共技术中心',location:'上海',region:'mainland',capability:'结构解析、检测、影像与分析技术服务',url:'https://www.simm.ac.cn/web/ggjsfwzx/'},
    {name:'中科院动物所曲静研究组',location:'北京',region:'mainland',capability:'干细胞、细胞衰老与再生研究',url:'https://ioz.cas.cn/staff/zh/qujinglab.html'}
  ]
};
