(() => {
  'use strict';
  const data = window.BIO_CONTENT;
  if (window.ATLAS_INSTITUTIONS) {
    const order = {hangzhou:0,hongkong:1,mainland:2};
    data.network = window.ATLAS_INSTITUTIONS.map(i => ({...i,capability:i.capabilities.map(t=>window.BIO_ATLAS_META.capabilities[t]).filter(Boolean).join('、')})).sort((a,b)=>order[a.region]-order[b.region]);
  }
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const detail = $('#detail-dialog');
  const intent = $('#intent-dialog');
  const form = $('#intent-form');
  const storageKey = 'family-health-bio-intent-v1';
  let lastFocus = null;
  let networkFilter = 'all';
  let networkExpanded = false;
  let paperFilter = 'all';
  let paperSearch = '';
  let toastTimer;

  function showToast(text) {
    $('#toast').textContent = text;
    $('#toast').classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3500);
  }
  function openDialog(dialog) {
    const switchingDialog = detail.open || intent.open;
    if (!switchingDialog) lastFocus = document.activeElement;
    if (detail.open) detail.close();
    if (intent.open) intent.close();
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.scrollTop = 0;
    $('.close-dialog', dialog).focus();
  }
  $$('dialog').forEach(dialog => {
    $('.close-dialog', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      if (!detail.open && !intent.open) {
        document.body.classList.remove('modal-open');
        if (lastFocus?.isConnected) lastFocus.focus({preventScroll:true});
      }
    });
    dialog.addEventListener('click', e => {
      if (e.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
    });
  });
  function showDetail(label, html) {
    $('#detail-label').textContent = label;
    $('#detail-body').innerHTML = html;
    openDialog(detail);
  }

  function setDirection(index, focus = false) {
    const selected = data.directions[index];
    $$('[data-direction]').forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      if (focus && i === index) tab.focus();
    });
    $('#direction-en').textContent = selected.en;
    $('#direction-title').textContent = selected.title;
    $('#direction-description').textContent = selected.text;
    $('#direction-panel').setAttribute('aria-labelledby', `direction-tab-${index}`);
  }
  $$('[data-direction]').forEach(tab => {
    tab.addEventListener('click', () => setDirection(Number(tab.dataset.direction)));
    tab.addEventListener('keydown', e => {
      const current = Number(tab.dataset.direction);
      let index;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') index = (current + 1) % data.directions.length;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') index = (current + data.directions.length - 1) % data.directions.length;
      if (e.key === 'Home') index = 0;
      if (e.key === 'End') index = data.directions.length - 1;
      if (index !== undefined) { e.preventDefault(); setDirection(index, true); }
    });
  });

  $('#question-list').innerHTML = data.questions.map(q => `<article class="question-row reveal"><span class="question-number">${esc(q.number)}</span><div><h3>${esc(q.title)}</h3><p>${esc(q.summary)}</p></div><div class="question-tags">${esc(q.category)}<br>拟议议题 · 尚未立项</div><button class="question-open" data-question="${esc(q.id)}" aria-label="探索议题：${esc(q.title)}">↗</button></article>`).join('');
  function openQuestion(id) {
    const q = data.questions.find(x => x.id === id);
    if (!q) return;
    showDetail(`OPEN QUESTION ${q.number} / 拟议议题`, `<h2 id="detail-title">${esc(q.title)}</h2><div class="detail-meta">${esc(q.category)} · 尚未立项</div><p>${esc(q.description)}</p><h3>可以从哪里开始</h3><p>${esc(q.next)}</p><h3>我们希望连接的贡献</h3><ul>${q.contribution.map(x => `<li>${esc(x)}</li>`).join('')}</ul><div class="detail-callout"><strong>证据边界</strong><br>${esc(q.boundary)}<br>科学负责人、合作团队与经费尚待落实。</div><a class="detail-link" href="${esc(q.source)}" target="_blank" rel="noopener noreferrer">${esc(q.sourceTitle)} ↗</a><br><button class="button button-dark" data-detail-join="${esc(q.title)}">围绕这个问题参与 <span>↗</span></button>`);
  }
  document.addEventListener('click', e => {
    const question = e.target.closest('[data-question]');
    if (question) openQuestion(question.dataset.question);
    const join = e.target.closest('[data-detail-join]');
    if (join) {
      const topic = join.dataset.detailJoin;
      openIntent('research');
      if (!form.elements.message.value) form.elements.message.value = `我希望讨论：${topic}\n\n已有工作或能力：\n希望共同推进的下一步：`;
    }
  });

  function illustration(kind) {
    const top = '<svg viewBox="0 0 360 210" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">';
    const bottom = '</svg>';
    if (kind === 'cell') return top + '<rect width="360" height="210" fill="#e6ebdf"/><g stroke="#7e9777" stroke-width="1"><path d="M95 115c-8-40 30-82 85-77 53 4 96 39 89 84-7 41-56 62-105 54-38-6-62-29-69-61Z"/><path d="M111 112c-4-33 27-63 67-60 44 3 79 30 73 66-6 31-44 47-82 41-29-5-50-23-58-47Z"/><circle cx="179" cy="107" r="26"/><circle cx="179" cy="107" r="17"/><path d="m33 55 42 26M286 153l41 27M62 164l37-18M263 60l37-24" stroke-dasharray="3 5"/></g><g fill="#657f59"><circle cx="143" cy="85" r="4"/><circle cx="219" cy="132" r="5"/><circle cx="131" cy="128" r="3"/><circle cx="227" cy="92" r="3"/></g><circle cx="179" cy="107" r="5" fill="#a05b41"/>' + bottom;
    if (kind === 'molecule') return top + '<rect width="360" height="210" fill="#ebe7de"/><g stroke="#8b8f79" stroke-width="1.4"><path d="m116 90 30-18 30 18v35l-30 18-30-18ZM176 90l30-18 30 18v35l-30 18-30-18M236 90l31-18M116 90 86 72M146 143v31M206 72V38M267 72l26 17M86 72V40M87 72l-27 16"/><path d="m122 94 24-14 24 14m12 27 24 14 24-14M206 44v23"/></g><g fill="#49634a"><circle cx="86" cy="72" r="7"/><circle cx="146" cy="143" r="7"/><circle cx="236" cy="90" r="7"/></g><g fill="#a15e45"><circle cx="206" cy="38" r="8"/><circle cx="293" cy="89" r="6"/></g>' + bottom;
    let cells = '';
    for (let y = 0; y < 4; y++) for (let x = 0; x < 6; x++) {
      const cx = 57 + x * 46 + (y % 2) * 23;
      const cy = 28 + y * 46;
      cells += `<path d="M${cx-21} ${cy-12}l21-12 21 12v24l-21 12-21-12Z" stroke="#9ca88b" stroke-width=".8"/><circle cx="${cx}" cy="${cy}" r="${5+(x+y)%3}" fill="${(x+y)%4 === 0 ? '#a67755' : '#a7b297'}"/>`;
    }
    return top + '<rect width="360" height="210" fill="#e6e8d8"/>' + cells + bottom;
  }
  function renderPapers(filter = paperFilter) {
    const papers = data.papers.filter(p => (filter === 'all' || p.filter === filter) && (!paperSearch || [p.title,p.category,p.stage,p.source,p.summary].join(' ').toLowerCase().includes(paperSearch)));
    $('#paper-list').innerHTML = papers.length ? papers.map(p => `<article class="paper"><div class="paper-visual">${illustration(p.visual)}<span class="paper-visual-label">CONCEPTUAL ILLUSTRATION</span></div><div class="paper-meta"><span>${esc(p.category)}</span><time datetime="${p.date.replaceAll('.','-')}">${esc(p.date)}</time></div><h3><a href="insights/${esc(p.id)}/">${esc(p.title)}</a></h3><p>${esc(p.summary)}</p><div class="paper-stage">${esc(p.stage)}</div><a class="paper-more" href="insights/${esc(p.id)}/">阅读全文 <span aria-hidden="true">↗</span></a></article>`).join('') : '<p class="empty-state">暂无匹配条目。试试其他关键词或分类。</p>';
  }
  renderPapers();
  $$('[data-paper-filter]').forEach(button => button.addEventListener('click', () => {
    paperFilter = button.dataset.paperFilter;
    $$('[data-paper-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    renderPapers(button.dataset.paperFilter);
  }));
  $('#paper-search')?.addEventListener('input', event => { paperSearch=event.target.value.trim().toLowerCase();renderPapers(); });
  $('#paper-list').addEventListener('click', e => {
    const button = e.target.closest('[data-paper]');
    if (!button) return;
    const p = data.papers.find(x => x.id === button.dataset.paper);
    showDetail('FIELD NOTES / 外部研究观察', `<h2 id="detail-title">${esc(p.title)}</h2><div class="detail-meta">${esc(p.source)} · ${esc(p.date)}<br>${esc(p.stage)}</div><h3>这项工作推进了什么</h3><p>${esc(p.finding)}</p><h3>证据止于哪里</h3><p>${esc(p.limit)}</p><h3>值得继续追问</h3><p>${esc(p.question)}</p><div class="detail-callout">以上为原始研究的简要编辑解读，不代表家家健康参与或完成了该研究。列表图示为概念插画，不是论文原始数据。</div><a class="detail-link" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">阅读原始来源 <span>↗</span></a>`);
  });

  const showNetwork = document.createElement('button');
  showNetwork.className = 'text-link network-more';
  showNetwork.style.marginTop = '24px';
  $('#network-list').after(showNetwork);
  showNetwork.addEventListener('click', () => { networkExpanded = !networkExpanded; renderNetwork(); });
  function renderNetwork() {
    const matches = data.network.filter(n => networkFilter === 'all' || n.region === networkFilter);
    const shown = networkExpanded ? matches : matches.slice(0, 6);
    $('#network-count').textContent = `${matches.length} 个参考节点`;
    $('#network-list').innerHTML = shown.map(n => `<article class="network-row"><div class="network-name">${esc(n.name)}<span class="network-location">${esc(n.location)} / 待接洽</span></div><div class="network-capability">${esc(n.capability)}</div><a class="network-link" href="${esc(n.url)}" target="_blank" rel="noopener noreferrer" aria-label="查看${esc(n.name)}官方资料">官网 <span aria-hidden="true">↗</span></a></article>`).join('');
    showNetwork.hidden = matches.length <= 6;
    showNetwork.textContent = networkExpanded ? '收起列表 ↑' : `查看其余 ${matches.length - shown.length} 个节点 ↓`;
    showNetwork.setAttribute('aria-expanded', String(networkExpanded));
  }
  renderNetwork();
  $$('[data-network-filter]').forEach(button => button.addEventListener('click', () => {
    networkFilter = button.dataset.networkFilter;
    networkExpanded = false;
    $$('[data-network-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    renderNetwork();
  }));

  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(storageKey) || 'null'); } catch { /* Browser storage is optional. */ }
  if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
    ['name','organization','type','message','contact'].forEach(key => {
      if (typeof saved[key] === 'string') form.elements[key].value = saved[key].slice(0, key === 'message' ? 3000 : 160);
    });
  }
  function openIntent(type) {
    if (type && ['research','technical','support','question'].includes(type)) form.elements.type.value = type;
    $('#form-feedback').textContent = '';
    const topic = new URLSearchParams(location.search).get('topic');
    if (topic && !form.elements.message.value) form.elements.message.value = `我希望讨论：${topic.slice(0,200)}\n\n已有工作或能力：\n希望共同推进的下一步：`;
    openDialog(intent);
  }
  $('#open-intent').addEventListener('click', () => openIntent());
  $$('[data-join]').forEach(b => b.addEventListener('click', () => openIntent(b.dataset.join)));
  $$('[data-intent]').forEach(a => a.addEventListener('click', () => { form.elements.type.value = a.dataset.intent; }));
  function formData() {
    return Object.fromEntries(['name','organization','type','message','contact'].map(key => [key, form.elements[key].value.trim()]));
  }
  function intentText(values) {
    const type = {research:'科研合作',technical:'技术需求',support:'共同支持',question:'提出问题'}[values.type] || values.type;
    return `Family Health · AI for Bio 合作意向草稿\n\n说明：本文件由访问者在浏览器生成，尚未发送给家家健康。\n\n称呼：${values.name}\n机构／团队：${values.organization || '未填写'}\n参与方式：${type}\n联系方式：${values.contact || '未填写'}\n\n希望讨论的内容：\n${values.message}\n`;
  }
  function validateForm() {
    form.elements.name.setCustomValidity(form.elements.name.value.trim() ? '' : '请填写你的称呼。');
    form.elements.message.setCustomValidity(form.elements.message.value.trim().length >= 10 ? '' : '请至少填写10字，说明你希望讨论的内容。');
    return form.reportValidity();
  }
  ['name','message'].forEach(key => form.elements[key].addEventListener('input', () => form.elements[key].setCustomValidity('')));
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(formData()));
      $('#form-feedback').textContent = '草稿已保存在此浏览器，尚未发送。你可以继续修改或下载。';
    } catch {
      $('#form-feedback').textContent = '此浏览器无法保存本机草稿。你仍可下载合作意向。';
    }
  });
  $('#export-intent').addEventListener('click', () => {
    if (!validateForm()) return;
    const blob = new Blob(['\ufeff' + intentText(formData())], {type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'Family-Health-合作意向.txt';
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $('#form-feedback').textContent = '已生成下载文件，尚未向团队发送。';
  });
  $('#copy-intent').addEventListener('click', async () => {
    if (!validateForm()) return;
    try {
      await navigator.clipboard.writeText(intentText(formData()));
      $('#form-feedback').textContent = '意向文本已复制，尚未向团队发送。';
    } catch {
      $('#form-feedback').textContent = '当前浏览器不允许复制，请使用“下载合作意向”。';
    }
  });
  $('#clear-intent').addEventListener('click', () => {
    try { localStorage.removeItem(storageKey); } catch { /* Clearing form is still available. */ }
    form.reset();
    ['name','message'].forEach(key => form.elements[key].setCustomValidity(''));
    $('#form-feedback').textContent = '表单已清空。';
  });

  $('[data-open-manifesto]').addEventListener('click', () => showDetail('OUR PURPOSE / 研究宣言', '<h2 id="detail-title">理解生命，探索改变。</h2><p>我们关心基础生物学、疾病机制、治疗发现、组织再生和健康寿命。希望运用AI并连接科学研究力量，提高解释、预测与干预生命系统的能力。</p><p>从杭州萧山开始，以真实问题组织合作。每项研究都应说明为什么值得投入、证据到了哪里、下一步需要什么。</p><h3>我们重视的工作方式</h3><ul><li>尊重原始证据，允许不同解释，并随新证据修正判断。</li><li>让AI承担分析与工程工作，让重要科学判断得到专业复核。</li><li>以真实贡献建立合作，明确责任、投入与成果使用安排。</li><li>让每项工作留下可继续使用的方法、工具或知识。</li></ul><div class="detail-callout">本网站呈现的是家家健康AI for Bio筹备计划。具体研究项目、团队与合作关系尚在筹备，不代表已设立独立研究院或取得医疗研究成果。</div>'));
  $('[data-open-privacy]').addEventListener('click', () => showDetail('PRIVACY / 隐私与使用说明', '<h2 id="detail-title">你的材料，由你保留。</h2><p>首版网站没有团队收件服务。合作意向只有在你点击“保存本机草稿”后，才会写入此浏览器的本地存储；它不会自动发送给家家健康。</p><p>你可以下载文本、复制内容，或点击“清除本机草稿”。使用共享设备时，请在离开前清除草稿。本版没有安装第三方访问统计或营销追踪脚本。</p><h3>适合分享的内容</h3><p>研究问题、公开成果、已获准介绍的能力与合作构想。请勿在本机表单填写患者身份信息、病历、敏感样本资料或未获准分享的成果。</p><h3>资料与链接</h3><p>研究观察是对外部研究的简要介绍，不能替代原始论文、医学意见或具体研究评议。外部链接会打开第三方网站，其服务与隐私规则由对方提供。</p>'));
  $('[data-open-sources]').addEventListener('click', () => {
    const paperSources = data.papers.map(p => `<div class="source-item"><a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(p.title)} ↗</a><p>${esc(p.source)} · ${esc(p.date)} · ${esc(p.stage)}</p></div>`).join('');
    showDetail('SOURCES / 资料来源', `<h2 id="detail-title">让依据可以被找到。</h2><p>资料整理日期：${esc(data.updated)}。研究观察的发布日期为原始发表日期，列表并非完整或实时更新的领域综述。</p>${paperSources}<h3>能力网络</h3><p>每个节点链接其公开官方介绍。信息仅用于了解可能的能力，不代表合作承诺、质量认证或机构背书；部分节点可能共享研究人员或资源。</p><h3>显微影像</h3><p>HeLa细胞共聚焦显微影像，Kevin Mackenzie / University of Aberdeen，Wellcome Collection。图像按CC BY 4.0使用，页面作裁切与色调处理；用于研究愿景展示，非家家健康研究成果。</p><a class="detail-link" href="https://wellcomecollection.org/works/f8f4u9fm" target="_blank" rel="noopener noreferrer">影像原始来源 ↗</a><br><a class="detail-link" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0 许可 ↗</a>`);
  });
  $('#hero-credit').textContent = 'HeLa cells · K. Mackenzie / Wellcome · CC BY 4.0';
  $('#hero-image').alt = 'Kevin Mackenzie拍摄的HeLa细胞共聚焦显微影像，用于研究愿景展示，非家家健康研究成果';
  $('#hero-credit').title = 'Kevin Mackenzie / University of Aberdeen · Wellcome Collection · CC BY 4.0。画面经裁切与色调处理。完整来源见页脚“资料来源”。';

  const menuButton = $('.menu-toggle');
  const mobileNav = $('#mobile-nav');
  function closeMenu() { menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','打开导航'); mobileNav.hidden = true; }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded',String(!open));
    menuButton.setAttribute('aria-label',open ? '打开导航' : '关闭导航');
    mobileNav.hidden = open;
  });
  $$('a',mobileNav).forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  const motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window) {
    if (motion) {
      document.documentElement.classList.add('js-motion');
      const reveals = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); reveals.unobserve(entry.target); }
      }), {threshold:0.05});
      $$('.reveal').forEach(el => reveals.observe(el));
    }
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) $$('.desktop-nav a').forEach(a => a.classList.toggle('active',a.getAttribute('href') === '#' + entry.target.id));
    }), {rootMargin:'-15% 0px -65% 0px'});
    $$('main>section[id]').forEach(el => navObserver.observe(el));
  }
  $('#year').textContent = '2026';
  if ($('#atlas-home-count')) $('#atlas-home-count').textContent = `${window.ATLAS_QUESTIONS.length} 个候选问题 · ${window.ATLAS_INSTITUTIONS.length} 个能力节点 · ${data.papers.length} 条外部研究 · 每题一项拟议首轮任务。`;
  if ($('#service-list')) $('#service-list').innerHTML = window.ATLAS_RESEARCH.collaboration.map((s,i)=>`<article class="service-row"><span class="service-number">0${i+1}</span><div><span class="small-note">${esc(s.status)}</span><h3>${esc(s.title)}</h3><p>${esc(s.forWhom)}</p><details><summary>查看工作范围与交付 ↗</summary><div class="service-detail"><p><strong>带来什么：</strong>${esc(s.input)}</p><p><strong>共同开展：</strong>${esc(s.work)}</p><h4>拟交付内容</h4><ul>${s.deliverables.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><p><strong>参与方收益：</strong>${esc(s.benefit)}</p><p class="small-note">${esc(s.boundary)}</p></div></details></div><button class="service-contact" data-service-topic="${esc(s.title)}" aria-label="讨论${esc(s.title)}">讨论需求 ↗</button></article>`).join('');
  $('#service-list')?.addEventListener('click', event => { const button=event.target.closest('[data-service-topic]');if(button){openIntent('technical');if(!form.elements.message.value)form.elements.message.value=`希望讨论的合作方向：${button.dataset.serviceTopic}\n\n已有工作：\n需要解决的研发问题：\n希望取得的交付：`;} });
})();
