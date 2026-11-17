window.ATLAS_RESEARCH = {
  notice: '本图谱呈现候选研究议程。五个使命主题用于组织导航，并非生命科学或健康研究的完整分类；研究目标、疾病场景、机制、能力与拟涉及阶段可以交叉连接。每个问题仍需科学评议、已有工作核查、数据与实验条件确认；不表示已发现无人研究的空白，不表示已经立项、获得资金或取得成果。',
  directions: [
    {id:'foundation',title:'基础生物学',en:'Fundamental Biology',description:'理解细胞如何建立状态、交换信息并组织成具有功能的生命系统。'},
    {id:'disease',title:'疾病机制',en:'Disease Mechanisms',description:'找出疾病发生、持续与复发中真正具有解释力和干预价值的机制。'},
    {id:'therapy',title:'治疗发现',en:'Therapeutic Discovery',description:'把机制理解与计算预测转化为值得接受实验检验的治疗思路。'},
    {id:'regeneration',title:'组织再生',en:'Tissue Regeneration',description:'研究如何恢复受损细胞和组织的身份、结构与持续功能。'},
    {id:'longevity',title:'健康寿命',en:'Healthy Longevity',description:'理解衰老与功能下降，并建立能够判断干预是否真正有益的证据。'}
  ],
  questions: [
    {id:'bio-01',direction:'foundation',title:'细胞干预预测能否跨越不同细胞与实验情境？',why:'可推广的预测有望帮助研究者选择更有价值的实验，减少只在特定数据上成立的结论。',bottleneck:'需要区分模型学到的生物规律与细胞类型、实验批次、数据切分带来的表面优势。',firstTask:'共同选定一个公开干预数据任务，完成数据条件核查、基线比较和跨情境评价，提供可运行代码与误差分析。',tags:['compbio','singlecell','data','screening'],decision:'若独立情境下仍有增量价值，讨论实验验证；若优势依赖泄漏或特定切分，调整方法或任务。',status:'候选问题 · 未立项'},
    {id:'bio-02',direction:'foundation',title:'哪些基因调控变化真正决定细胞命运？',why:'识别调控因素与细胞命运之间的因果关系，可以连接发育、疾病模型和再生研究。',bottleneck:'表达相关性、轨迹推断与真实调控作用需要分别判断，不同细胞背景可能给出不同解释。',firstTask:'围绕一种明确的细胞转变，整理候选调控关系、支持与相反证据，提出能区分不同机制的验证问题。',tags:['compbio','singlecell','stemcell','data'],decision:'优先推进有可检验预测且存在合适模型的问题；仅有相关性时继续补证。',status:'候选问题 · 未立项'},
    {id:'bio-03',direction:'foundation',title:'细胞之间的空间交流如何改变组织状态？',why:'理解细胞在组织中的相互作用，有助于解释局部环境怎样影响疾病、修复与功能。',bottleneck:'空间邻近、信号表达与真实交流作用之间，需要建立可比较且可验证的证据链。',firstTask:'选定一个组织情境，比较公开空间数据中的交流假说，列出可由功能实验区分的候选关系。',tags:['singlecell','compbio','organoid','functional','data'],decision:'能产生组织功能相关预测时进入下一步；若结果对分析参数过于敏感，先完善评价。',status:'候选问题 · 未立项'},
    {id:'bio-04',direction:'foundation',title:'怎样把RNA、蛋白与功能读数连接成一致解释？',why:'生命系统的不同测量层次需要相互支持，才能形成对细胞活动更可靠的理解。',bottleneck:'不同组学的时间、尺度和测量误差不一致，同一现象可能存在多种机制解释。',firstTask:'围绕一个具体生物过程，整理可取得的多组学与功能数据，比较整合方法，并标明不能相互解释的部分。',tags:['compbio','protein','singlecell','functional','data'],decision:'以能否改善独立功能预测判断方法价值，不以数据维度或模型复杂度作为主要依据。',status:'候选问题 · 未立项'},
    {id:'bio-05',direction:'foundation',title:'如何让生物研究结果被独立重现和继续使用？',why:'可复核的方法与记录，能够帮助后续研究者判断结果成立的条件，并减少重复摸索。',bottleneck:'数据、代码、参数与实验背景可能不完整；未复现也需要区分条件差异、误差和结论问题。',firstTask:'选取一个有公开材料的具体结论，记录复现环境、实际运行结果、替代解释和无法复现的缺口。',tags:['data','compbio','automation','functional'],decision:'以是否提高一个关键判断的可信度验收；发现异常、未复现与正式认定学术不端分别记录。',status:'候选问题 · 未立项'},
    {id:'dis-01',direction:'disease',title:'哪些细胞状态变化真正推动了癌症耐药？',why:'理解耐药形成与维持的机制，有助于寻找能够延长治疗获益的研究路线。',bottleneck:'需要区分伴随耐药出现的变化、治疗选择的结果，以及能够改变耐药状态的因果因素。',firstTask:'选择一种癌症和治疗背景，整理关键数据与机制证据，形成候选解释及下一项有判别力的验证任务。',tags:['singlecell','compbio','clinical','screening','functional'],decision:'有明确生物学问题和可行验证路径时推进；只有相关性或缺少合适数据时调整范围。',status:'候选问题 · 未立项'},
    {id:'dis-02',direction:'disease',title:'纤维化中的哪些细胞与组织变化仍然可逆？',why:'识别可逆阶段与关键调控因素，能够帮助区分预防进一步损伤和恢复已有功能的研究目标。',bottleneck:'分子指标、组织结构和器官功能可能并不同步，需要明确研究模型能回答哪一层问题。',firstTask:'围绕一种器官纤维化，建立不同阶段的证据地图，比较细胞状态、组织变化及功能评价。',tags:['singlecell','organoid','clinical','functional','compbio'],decision:'优先研究能够连接机制与功能的变化；替代指标不足以解释功能时补充评价。',status:'候选问题 · 未立项'},
    {id:'dis-03',direction:'disease',title:'神经细胞与支持细胞的相互作用如何推动退行性变化？',why:'神经功能依赖多类细胞共同维持，研究它们的相互作用有助于形成更完整的疾病解释。',bottleneck:'模型成熟度、疾病阶段与细胞组成可能影响结论，单一分子读数难以代表神经功能。',firstTask:'选择一种明确疾病情境，比较公开细胞数据与功能研究，提出可由适当模型检验的相互作用假说。',tags:['singlecell','stemcell','organoid','functional','compbio'],decision:'以模型适用性和功能相关证据决定推进；不将体外现象直接外推为患者获益。',status:'候选问题 · 未立项'},
    {id:'dis-04',direction:'disease',title:'代谢异常与慢性炎症之间，哪些环节值得优先干预？',why:'代谢与炎症问题相互交织，明确具体机制有助于选择更有针对性的研究任务。',bottleneck:'人群差异、共病和时间顺序可能混杂观察结果，需要限定组织、阶段和可测结局。',firstTask:'围绕一种疾病背景，比较人群与模型证据，区分可检验机制、伴随变化和证据不足的推断。',tags:['clinical','singlecell','compbio','functional','data'],decision:'当任务能够区分竞争性解释时推进；范围过宽或缺少关键测量时收紧问题。',status:'候选问题 · 未立项'},
    {id:'dis-05',direction:'disease',title:'为什么有些损伤中的炎症迟迟不能结束？',why:'理解炎症消退与修复失败的关系，能够连接慢性伤口、组织损伤和功能恢复研究。',bottleneck:'炎症、微环境与修复过程相互影响，需要分别评价局部状态与实际修复功能。',firstTask:'选择一种损伤或慢性伤口情境，梳理时间过程证据，形成修复受阻的候选机制和评价终点。',tags:['singlecell','clinical','organoid','functional','aging'],decision:'优先推进具有功能评价与合适比较条件的任务；无法解释修复结局时补证。',status:'候选问题 · 未立项'},
    {id:'ther-01',direction:'therapy',title:'如何从大量候选靶点中找到最值得验证的少数？',why:'更可靠的优先级判断，可以帮助研究团队把有限实验资源投入到证据更强的方向。',bottleneck:'关联证据、因果作用、可干预性与潜在副作用需要共同评议，单一评分不能覆盖全部判断。',firstTask:'围绕一个疾病问题，对有限候选建立可追溯证据表，比较排序依据并提出下一轮验证建议。',tags:['compbio','singlecell','screening','clinical','data'],decision:'排序需要对新增证据与不同合理方法保持可解释性；若仅反映文献热度则调整。',status:'候选问题 · 未立项'},
    {id:'ther-02',direction:'therapy',title:'AI设计的蛋白怎样同时满足功能、稳定性与可开发性？',why:'让设计结果经受多维评价，有助于把计算候选推进为可继续研究的分子工具或药物思路。',bottleneck:'结构合理不自动代表功能可靠，不同性质之间可能存在取舍，评价依赖具体应用。',firstTask:'与专业团队选定一个明确应用任务，比较既有设计与实验评价方法，明确候选进入验证的标准。',tags:['protein','compbio','screening','chemistry','functional'],decision:'以实际功能和应用条件评价设计；只有计算分数改善时暂不作开发结论。',status:'候选问题 · 未立项'},
    {id:'ther-03',direction:'therapy',title:'小分子候选的计算优势能否变成可重复的实验优势？',why:'连接预测与实际测量，能够帮助判断筛选与优化方法是否真正改善研发决策。',bottleneck:'数据偏差、测量条件及多种分子性质都可能影响结果，单一预测指标不足以代表成药价值。',firstTask:'选择一个有合适数据与验证条件的任务，比较预测方法、测量依据及候选的多维权衡。',tags:['chemistry','compbio','screening','protein','data'],decision:'在独立评价中出现一致增量价值后继续；不把结合预测或单项活性等同临床潜力。',status:'候选问题 · 未立项'},
    {id:'ther-04',direction:'therapy',title:'联合干预的增益能否与额外损害同时预测？',why:'联合研究需要同时理解获益、相互作用和适用条件，才能支持更可靠的实验选择。',bottleneck:'组合结果可能依赖背景和评价方式；单独有效的干预不一定能够产生有益组合。',firstTask:'限定一个疾病模型，比较已有组合数据与评价指标，明确哪些候选值得作进一步专业验证。',tags:['compbio','screening','clinical','functional','data'],decision:'同时考虑增益和损害的证据；不从计算排序直接形成临床用药建议。',status:'候选问题 · 未立项'},
    {id:'ther-05',direction:'therapy',title:'核酸治疗怎样更可靠地到达目标组织并产生所需作用？',why:'递送与作用评价是连接分子设计和实际治疗研究的重要环节。',bottleneck:'到达、进入、表达或作用持续时间需要分别测量，不同组织与模型的结果可能难以直接比较。',firstTask:'围绕一个明确治疗情境，建立递送证据与评价方法地图，提出一个可由专业合作方验证的问题。',tags:['chemistry','compbio','organoid','screening','functional'],decision:'有目标组织相关的功能证据与合适比较后推进；不以单项摄取指标替代完整作用评价。',status:'候选问题 · 未立项'},
    {id:'regen-01',direction:'regeneration',title:'怎样让细胞获得目标身份并保持稳定功能？',why:'组织修复需要可持续工作的细胞，细胞身份与功能的稳定性因此值得共同研究。',bottleneck:'身份标记、成熟程度和实际功能需要相互验证，培养条件改变后也可能影响表现。',firstTask:'选择一种细胞转变任务，比较公开方法、状态评价与功能证据，明确下一项判别性验证。',tags:['stemcell','singlecell','protein','functional','compbio'],decision:'身份和功能证据一致且能够持续时推进；仅有标记变化时继续完善评价。',status:'候选问题 · 未立项'},
    {id:'regen-02',direction:'regeneration',title:'怎样让类器官达到足以回答疾病与修复问题的成熟度？',why:'模型越能反映相关组织功能，越有机会支持有价值的机制研究和候选评价。',bottleneck:'成熟度需要相对于具体研究问题定义，细胞组成、培养条件和评价方法均可能影响解释。',firstTask:'围绕一种组织，整理模型成熟与功能评价指标，比较现有方法能回答与不能回答的问题。',tags:['organoid','stemcell','singlecell','functional','automation'],decision:'以是否改善具体问题的解释和验证能力评判；不把结构更复杂直接等同更好模型。',status:'候选问题 · 未立项'},
    {id:'regen-03',direction:'regeneration',title:'培养组织怎样与周围组织整合并持续工作？',why:'持续功能恢复取决于组织与环境的相互适应，整合能力值得作为独立研究目标。',bottleneck:'存活、结构连接、功能贡献与长期稳定需要分别评价，模型结果的外推范围有限。',firstTask:'选择一种组织修复情境，建立整合与功能终点清单，比较现有证据并确定关键缺口。',tags:['organoid','stemcell','functional','clinical','data'],decision:'优先推进能建立组织贡献与功能改善联系的任务；仅显示存活时不作修复成功判断。',status:'候选问题 · 未立项'},
    {id:'regen-04',direction:'regeneration',title:'怎样让伤口闭合进一步转化为更好的组织功能？',why:'修复的价值包括耐受、活动和日常功能，需要在研究中与表面愈合分别考虑。',bottleneck:'闭合、瘢痕形成、组织质量和长期功能可能并不同步，比较方法需要贴近具体场景。',firstTask:'围绕一种伤口类型，整理功能评价与已有研究，提出可比较的修复终点和后续验证任务。',tags:['clinical','functional','organoid','stemcell','data'],decision:'以与真实功能有关的证据决定下一步；替代指标不足时调整评价或研究目标。',status:'候选问题 · 未立项'},
    {id:'regen-05',direction:'regeneration',title:'衰老的组织环境怎样限制修复能力？',why:'理解年龄相关环境与细胞能力的相互作用，可以连接再生研究和健康寿命议程。',bottleneck:'细胞内在状态与组织环境的影响需要区分，不同组织与年龄阶段也可能存在差异。',firstTask:'选定一种组织，比较年龄相关细胞、环境与修复证据，形成可由合适模型检验的竞争性解释。',tags:['aging','stemcell','singlecell','organoid','functional'],decision:'能区分细胞与环境作用且具备功能评价时推进；证据无法区分时先补充研究设计。',status:'候选问题 · 未立项'},
    {id:'life-01',direction:'longevity',title:'不同衰老细胞应该怎样识别和区别对待？',why:'更准确理解衰老细胞的差异，有助于评议哪些状态与疾病相关、哪些干预值得研究。',bottleneck:'标记、组织背景与功能影响需要共同考虑，单一信号可能不足以支持统一分类或干预。',firstTask:'围绕一种组织和疾病情境，比较衰老状态定义、公开图谱及干预证据，提出可检验的分类问题。',tags:['aging','singlecell','compbio','screening','functional'],decision:'分类能够解释或预测独立功能结果时继续；只有标签一致性时暂不推导干预价值。',status:'候选问题 · 未立项'},
    {id:'life-02',direction:'longevity',title:'衰老指标的变化能否代表真实健康获益？',why:'可靠评价干预，需要知道分子或计算指标与功能、疾病结局和长期健康之间的关系。',bottleneck:'预测年龄、反映状态和响应干预是不同任务，指标变化的意义需要与独立结局对照。',firstTask:'选择一类衰老指标，整理验证人群、适用条件、干预响应与功能终点，明确证据边界。',tags:['aging','clinical','compbio','data','functional'],decision:'以独立功能和健康结局的支持程度评议指标；不将评分变年轻直接表述为寿命延长。',status:'候选问题 · 未立项'},
    {id:'life-03',direction:'longevity',title:'免疫系统的年龄相关变化中，哪些与功能下降有关？',why:'把免疫状态与实际功能连接起来，可以为理解健康差异和选择干预研究提供依据。',bottleneck:'年龄、感染史、共病及生活环境等因素可能混杂，需要明确研究对象与功能问题。',firstTask:'围绕一项具体免疫功能，比较公开细胞与人群证据，评议哪些状态值得作进一步机制研究。',tags:['aging','singlecell','clinical','compbio','functional'],decision:'能在独立资料中解释具体功能差异时继续；仅有年龄相关性时保持观察性结论。',status:'候选问题 · 未立项'},
    {id:'life-04',direction:'longevity',title:'肌肉与活动能力的下降，哪些变化值得优先干预？',why:'活动与独立生活能力是健康寿命的重要关切，可以把分子研究连接到可感知的功能。',bottleneck:'肌肉状态、力量与日常表现需要共同评价，年龄、疾病和活动水平也可能影响结果。',firstTask:'围绕一种明确功能下降情境，比较机制与评价证据，提出能连接细胞变化和功能结局的研究任务。',tags:['aging','clinical','stemcell','functional','data'],decision:'以功能改善相关证据判断价值；不以单项分子或形态变化替代整体功能。',status:'候选问题 · 未立项'},
    {id:'life-05',direction:'longevity',title:'哪些衰老干预证据值得进入更严格的人体研究评议？',why:'系统比较证据有助于把长期研究资源投入到更有依据、也更能被验证的方向。',bottleneck:'物种、模型、干预目标和评价终点存在差异，需要逐项判断外推条件与不确定性。',firstTask:'选定一个有限干预类别，建立从细胞、动物到人体研究的证据表，并提出下一步应补的关键证据。',tags:['aging','clinical','screening','functional','data'],decision:'科学依据和适用研究条件充分时再讨论下一阶段；不从动物结果直接给出个人使用建议。',status:'候选问题 · 未立项'}
  ],
  collaboration: [
    {id:'evidence-roadmap',title:'研究证据与路线评估',status:'首期拟探索 · 范围共同确认',forWhom:'准备进入某项研发方向、需要判断下一步投入的企业或研究团队。',input:'一个明确研究问题、已有工作，以及希望支持的研发决策。',work:'核查原始来源，比较支持与相反证据，梳理已有路线和关键不确定性。',deliverables:['可追溯的原始证据表','研究路线与关键差异比较','有判别力的下一步验证任务','能力、数据及资源需求说明'],benefit:'参与方获得能够接受专业检查的研发判断依据；共同确定哪些问题值得继续投入。',boundary:'实际工作、费用、复核与成果使用另行约定；不承诺阳性结论、治疗效果或投资回报。',tags:['data','compbio','clinical','functional']},
    {id:'data-reanalysis',title:'生物数据重分析与可重复计算',status:'首期拟探索 · 数据与方法共同评议',forWhom:'拥有公开或已获准使用的数据，希望检验结论或比较方法的企业与实验团队。',input:'数据使用条件、具体研究问题、现有方法和需要解决的分歧。',work:'检查数据质量与评价条件，运行约定分析，比较合理基线，并记录误差与局限。',deliverables:['数据条件与质量说明','实际运行的分析及方法比较','可复现代码与环境记录','结果解释、限制和后续验证建议'],benefit:'参与方获得可检查的分析和清楚的下一步；在约定范围内形成后续可以复用的方法。',boundary:'先确认任务与执行能力；不能运行的工作如实列为缺口，不将计算结果直接解释为临床疗效。',tags:['data','compbio','singlecell','functional']},
    {id:'research-workflow',title:'科研工作流与工具共建',status:'首期拟探索 · 按具体流程开展',forWhom:'有重复研究流程，希望改善数据整理、分析、记录或计算与实验衔接的团队。',input:'一个真实工作流程、现有工具、主要耗时或出错环节，以及明确的验收需求。',work:'共同选择边界清楚的流程，建立数据结构、工具接口、可追溯记录与必要的人工复核。',deliverables:['流程与需求说明','可运行的工具或分析模块','验证记录与已知限制','使用、维护和后续迭代约定'],benefit:'参与方获得贴近实际研究的工具；按协议保留可继续使用的模块，降低后续重复建设。',boundary:'不预设已经能够自动控制全部设备或完成自主发现；接入和执行权限逐项确认。',tags:['automation','data','compbio','screening']}
  ]
};
window.ATLAS_RESEARCH.questions.push(
  {id:'cross-prevention',direction:'longevity',title:'哪些风险信号能真正帮助更早预防疾病？',why:'预防研究需要把风险识别与可以改善健康的行动连接起来，并理解不同人群是否同样受益。',bottleneck:'模型区分风险的能力、在新群体中的校准与实际预防获益需要分别评价，不能以预测分数替代结局。',firstTask:'选定一种疾病和预防情境，比较公开风险模型、验证人群及实际行动证据，提出下一项需要验证的决策问题。',tags:['clinical','compbio','data','functional'],decision:'有明确适用人群、可行行动与结局评价时推进；仅有预测准确率时保留为方法研究。',status:'候选问题 · 未立项'},
  {id:'cross-diagnosis',direction:'disease',title:'早筛与诊断信号怎样在真实就诊人群中保持可靠？',why:'更早发现疾病的价值，需要与误报、漏报、后续检查及患者实际获益共同衡量。',bottleneck:'研究样本与真实人群的疾病比例和特征可能不同，需要检验泛化、校准和临床流程中的影响。',firstTask:'围绕一种明确筛查或诊断任务，整理独立验证证据与评价条件，说明还缺哪些人群和流程证据。',tags:['clinical','screening','compbio','data'],decision:'评价能够覆盖真实人群及后续影响时继续；不将研究数据中的分类表现直接当作临床可用性。',status:'候选问题 · 未立项'},
  {id:'cross-autoimmunity',direction:'disease',title:'自身免疫疾病中哪些免疫状态具有可干预的机制意义？',why:'理解患者之间的免疫差异，有助于提出更具体的疾病解释与治疗研究问题。',bottleneck:'疾病活动、治疗历史和组织背景可能影响免疫状态，需要区分伴随变化与推动疾病的作用。',firstTask:'选择一种自身免疫疾病，比较公开免疫细胞数据、治疗反应及功能证据，提出可以检验的机制假说。',tags:['singlecell','clinical','compbio','functional','data'],decision:'当状态变化与独立功能证据相互支持时推进；仅有分群或相关性时继续补证。',status:'候选问题 · 未立项'},
  {id:'cross-neuropsychiatry',direction:'disease',title:'神经精神症状怎样与可验证的生物机制及功能评价连接？',why:'连接生物测量、行为与生活功能，可以帮助形成更可检验的神经精神疾病研究问题。',bottleneck:'症状异质性、环境影响和测量尺度差异需要共同考虑，单一生物标记未必能解释个体体验。',firstTask:'与相关专业研究者限定一种具体问题，比较公开机制与人群证据，明确可行模型和功能终点。',tags:['clinical','compbio','organoid','functional','data'],decision:'问题与模型能支持清楚的可检验预测时推进；避免从单一指标推导个人诊断或治疗建议。',status:'候选问题 · 未立项'},
  {id:'cross-rare-disease',direction:'foundation',title:'怎样为罕见遗传变异建立更可靠的功能证据？',why:'将变异、分子作用与疾病表现连接起来，可以支持罕见病机制研究和候选干预评议。',bottleneck:'样本有限、变异背景及模型适用性可能限制解释，计算预测与临床判断需要分别验证。',firstTask:'围绕一种明确遗传疾病，整理公开变异与功能研究，比较候选解释，并提出一个有判别力的验证任务。',tags:['compbio','protein','stemcell','clinical','functional'],decision:'多种独立证据支持同一机制时继续；不将计算结果单独作为致病性或治疗结论。',status:'候选问题 · 未立项'},
  {id:'cross-infection-defense',direction:'therapy',title:'抗微生物耐药风险的预测怎样更可靠地支持防治研究？',why:'更可靠的风险识别与研究评价，有助于把现有检测和治疗资源用于感染防控。',bottleneck:'不同样本、检测方式与临床背景影响结果，需要明确数据可比性和预测的适用范围。',firstTask:'在授权范围内选择一种防治研究场景，比较公开或获准检测数据与评价方法，提出可独立验证的问题。',tags:['clinical','screening','compbio','data','functional'],decision:'独立资料支持且问题明确服务防治时继续；不据计算结果形成个人用药建议或病原改造任务。',status:'候选问题 · 未立项'},
  {id:'cross-microbiome',direction:'foundation',title:'微生物组变化与疾病之间哪些关系能够被重复验证？',why:'可重复的关系及适用条件，可以为理解微生态与宿主健康的相互作用提供更稳固基础。',bottleneck:'取样、测量、饮食及疾病状态等因素可能混杂结果，需要区分相关特征和可检验机制。',firstTask:'围绕一种健康或疾病情境，比较公开队列中的一致与冲突结果，检查分析选择并提出后续验证任务。',tags:['compbio','clinical','data','functional','screening'],decision:'关系在合理比较和独立资料中稳定时深入机制研究；不将菌群关联直接解释为干预有效。',status:'候选问题 · 未立项'},
  {id:'cross-development',direction:'foundation',title:'发育模型怎样帮助解释生殖与早期发育中的功能问题？',why:'理解发育过程与异常机制，可以连接基础生物学、遗传研究和长期健康问题。',bottleneck:'模型与真实发育情境的相似性、时间尺度和功能意义需要分别评议，不能仅靠标记相似判断。',firstTask:'由相关专业团队限定一个明确发育问题，整理公开模型与功能证据，指出可回答范围及验证缺口。',tags:['stemcell','organoid','singlecell','clinical','functional'],decision:'模型适用性与研究条件明确时推进；涉及特定伦理与机构要求的任务需先落实相应条件。',status:'候选问题 · 未立项'},
  {id:'cross-rehabilitation',direction:'regeneration',title:'康复过程的数据怎样反映患者真实的功能改善？',why:'把日常活动、临床评价与患者关切连接起来，能够帮助研究哪些变化具有持续实际价值。',bottleneck:'测量工具、环境和个体基线可能影响变化，需要区分训练表现、测试进步与生活能力提升。',firstTask:'选择一种明确康复情境，比较量表、活动及功能指标，形成可追踪且可解释的评价方案。',tags:['clinical','functional','compbio','data'],decision:'指标能够对应患者功能目标并支持持续评价时推进；仅有短期分数变化时继续补证。',status:'候选问题 · 未立项'},
  {id:'cross-biosecurity',direction:'foundation',title:'怎样验证AI生物研发流程中的防误用与防滥用措施？',why:'可信的权限、人工复核与记录机制，有助于生命科学研究在可追溯和可负责的条件下开展。',bottleneck:'流程存在不等于措施有效，需要限定授权范围、评价目标和责任主体，避免扩大为敏感能力开发。',firstTask:'与获授权机构共同梳理一个具体研究流程，评议访问控制、复核、记录及异常处理，形成高层风险评估与改进建议。',tags:['automation','data','compbio','biosecurity'],decision:'仅开展明确授权的防御评价；以记录完整性、责任清楚及防护改进证据验收，不涉及病原设计或规避筛查。',status:'候选问题 · 未立项'}
);

const atlasQuestionAxes = {
  'bio-01': {goals:['基础理解','研究方法'],diseases:['跨疾病'],mechanisms:['细胞状态','干预响应'],stages:['计算研究','临床前研究']},
  'bio-02': {goals:['基础理解','修复'],diseases:['跨疾病','发育相关问题'],mechanisms:['基因调控','细胞命运'],stages:['基础研究','计算研究','临床前研究']},
  'bio-03': {goals:['基础理解'],diseases:['跨疾病'],mechanisms:['细胞交流','组织微环境'],stages:['基础研究','计算研究','临床前研究']},
  'bio-04': {goals:['基础理解','研究方法'],diseases:['跨疾病'],mechanisms:['多组学整合','蛋白与功能'],stages:['基础研究','计算研究']},
  'bio-05': {goals:['研究可信性','研究方法'],diseases:['跨疾病'],mechanisms:['测量与评价','证据复核'],stages:['基础研究','计算研究','临床前研究','临床研究']},
  'dis-01': {goals:['基础理解','治疗'],diseases:['肿瘤'],mechanisms:['细胞状态','治疗耐药'],stages:['基础研究','计算研究','临床前研究']},
  'dis-02': {goals:['基础理解','治疗','修复'],diseases:['纤维化'],mechanisms:['组织重塑','细胞状态'],stages:['基础研究','计算研究','临床前研究']},
  'dis-03': {goals:['基础理解','治疗'],diseases:['神经退行性疾病'],mechanisms:['细胞交流','神经功能'],stages:['基础研究','计算研究','临床前研究']},
  'dis-04': {goals:['基础理解','治疗'],diseases:['代谢疾病','慢性炎症'],mechanisms:['代谢调控','免疫失调'],stages:['基础研究','计算研究','临床前研究','临床研究']},
  'dis-05': {goals:['基础理解','修复'],diseases:['慢性伤口','慢性炎症'],mechanisms:['炎症消退','组织微环境'],stages:['基础研究','临床前研究','临床研究']},
  'ther-01': {goals:['治疗','研究方法'],diseases:['跨疾病'],mechanisms:['靶点作用','证据复核'],stages:['计算研究','临床前研究']},
  'ther-02': {goals:['治疗','研究方法'],diseases:['跨疾病'],mechanisms:['蛋白设计','分子功能'],stages:['计算研究','临床前研究']},
  'ther-03': {goals:['治疗','研究方法'],diseases:['跨疾病'],mechanisms:['分子筛选','构效关系'],stages:['计算研究','临床前研究']},
  'ther-04': {goals:['治疗'],diseases:['跨疾病'],mechanisms:['干预相互作用','功能评价'],stages:['计算研究','临床前研究']},
  'ther-05': {goals:['治疗'],diseases:['跨疾病','遗传疾病'],mechanisms:['核酸递送','分子功能'],stages:['计算研究','临床前研究']},
  'regen-01': {goals:['基础理解','修复'],diseases:['组织损伤'],mechanisms:['细胞命运','功能成熟'],stages:['基础研究','计算研究','临床前研究']},
  'regen-02': {goals:['研究方法','修复'],diseases:['组织损伤','跨疾病'],mechanisms:['类器官成熟','功能评价'],stages:['基础研究','临床前研究']},
  'regen-03': {goals:['修复','功能维持'],diseases:['组织损伤'],mechanisms:['组织整合','功能成熟'],stages:['基础研究','临床前研究']},
  'regen-04': {goals:['修复','功能维持'],diseases:['慢性伤口','组织损伤'],mechanisms:['组织重塑','功能评价'],stages:['基础研究','临床前研究','临床研究']},
  'regen-05': {goals:['基础理解','修复','健康寿命'],diseases:['衰老相关问题','组织损伤'],mechanisms:['组织微环境','细胞衰老'],stages:['基础研究','计算研究','临床前研究']},
  'life-01': {goals:['基础理解','治疗','健康寿命'],diseases:['衰老相关问题'],mechanisms:['细胞衰老','细胞状态'],stages:['基础研究','计算研究','临床前研究']},
  'life-02': {goals:['健康寿命','研究方法'],diseases:['衰老相关问题'],mechanisms:['生物标志物','功能评价'],stages:['计算研究','临床研究']},
  'life-03': {goals:['基础理解','功能维持','健康寿命'],diseases:['衰老相关问题','免疫相关问题'],mechanisms:['免疫衰老','细胞状态'],stages:['基础研究','计算研究','临床研究']},
  'life-04': {goals:['功能维持','修复','健康寿命'],diseases:['肌肉功能下降','衰老相关问题'],mechanisms:['肌肉稳态','功能评价'],stages:['基础研究','临床前研究','临床研究']},
  'life-05': {goals:['健康寿命','研究方法'],diseases:['衰老相关问题'],mechanisms:['干预响应','证据复核'],stages:['临床前研究','临床研究']},
  'cross-prevention': {goals:['预防','健康寿命'],diseases:['跨疾病'],mechanisms:['风险分层','功能评价'],stages:['计算研究','临床研究','实施评价']},
  'cross-diagnosis': {goals:['早筛','诊断'],diseases:['跨疾病'],mechanisms:['生物标志物','测量与评价'],stages:['计算研究','临床研究','实施评价']},
  'cross-autoimmunity': {goals:['基础理解','治疗'],diseases:['自身免疫疾病'],mechanisms:['免疫失调','细胞状态'],stages:['基础研究','计算研究','临床前研究','临床研究']},
  'cross-neuropsychiatry': {goals:['基础理解','功能维持'],diseases:['神经精神疾病'],mechanisms:['神经功能','功能评价'],stages:['基础研究','计算研究','临床前研究','临床研究']},
  'cross-rare-disease': {goals:['基础理解','诊断','治疗'],diseases:['罕见病','遗传疾病'],mechanisms:['遗传变异','分子功能'],stages:['基础研究','计算研究','临床前研究']},
  'cross-infection-defense': {goals:['预防','诊断','治疗'],diseases:['感染','抗微生物耐药'],mechanisms:['耐药风险','测量与评价'],stages:['计算研究','临床研究','实施评价']},
  'cross-microbiome': {goals:['基础理解','研究可信性'],diseases:['微生态相关问题','跨疾病'],mechanisms:['微生物组','宿主相互作用'],stages:['基础研究','计算研究','临床研究']},
  'cross-development': {goals:['基础理解','预防'],diseases:['生殖与发育相关问题'],mechanisms:['发育调控','细胞命运'],stages:['基础研究','计算研究','临床前研究']},
  'cross-rehabilitation': {goals:['康复','修复','功能维持'],diseases:['康复与功能障碍'],mechanisms:['功能评价','干预响应'],stages:['计算研究','临床研究','实施评价']},
  'cross-biosecurity': {goals:['安全防御','研究可信性'],diseases:['跨疾病'],mechanisms:['授权风险评估','科研流程防护'],stages:['方法研究','实施评价']}
};
window.ATLAS_RESEARCH.axisNotes = {
  direction:'五个使命主题仅用于导航，并非完整或互斥的学科分类。',
  stages:'拟涉及的研究阶段，用于讨论能力与证据需求；不表示项目已进入或已完成这些阶段。',
  mapping:'目标、疾病、机制及能力匹配为候选关联，仍需专业评议。'
};
window.ATLAS_RESEARCH.questions.forEach(question => {
  Object.assign(question, atlasQuestionAxes[question.id]);
  question.criteria = question.decision;
  question.deliverable = question.firstTask;
});
window.ATLAS_QUESTIONS = window.ATLAS_RESEARCH.questions;
window.ATLAS_QUESTIONS.push(
 {id:'bio-epigenetics',direction:'foundation',title:'哪些表观遗传变化真正影响细胞身份转换？',why:'连接染色质、基因调控与细胞状态，有助于解释细胞命运和再生研究中的可塑性。',bottleneck:'状态相关标记与具有调控作用的变化需要区分，不同细胞背景与测量方法也会影响解释。',firstTask:'围绕一种明确的细胞转变，梳理表观遗传与功能证据，比较竞争性解释，提出能区分这些解释的验证任务。',tags:['compbio','stemcell','singlecell','data','protein'],decision:'有可检验预测与合适的细胞和功能评价后推进；仅有相关标记时继续补证。',status:'候选问题 · 未立项',goals:['理解生命与疾病','修复与再生'],diseases:['通用研究基础'],mechanisms:['表观遗传','细胞状态与命运'],stages:['证据与路线评估','计算与数据研究','体外与机制验证']},
 {id:'regen-manufacturing',direction:'regeneration',title:'细胞研究怎样推进为可比较、可追踪的制备工艺？',why:'研究结果走向持续应用，需要理解制备条件、批次差异和功能之间的关系。',bottleneck:'细胞身份、批次一致性、功能评价与工艺记录需要共同核查，研究级结果不能直接视为可用产品。',firstTask:'选择一个已具备专业合作条件的细胞制备情境，建立关键评价与记录要求，比较研究条件和工艺需求，形成下一阶段验证清单。',tags:['manufacturing','stemcell','automation','data','functional'],decision:'专业团队、适用条件与可验证的质量和功能评价明确后推进；不以平台挂牌或单次成功代替工艺验证。',status:'候选问题 · 未立项',goals:['修复与再生','研究可靠性'],diseases:['通用研究基础'],mechanisms:['细胞状态与命运'],stages:['证据与路线评估','工艺与制造','应用与实施评价']}
);
