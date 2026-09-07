'use strict';
(function () {
  const $ = id => document.getElementById(id);
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const L = {
    en: {
      title: 'Community-tested games', subtitle: 'Real results from DLSS 5 Swapper users.', refresh: 'Refresh', search: 'Search games', route: 'Route', api: 'Rendering API', result: 'Result',
      allRoutes: 'All routes', allApis: 'All APIs', allResults: 'All results', working: 'Working', issues: 'Works with issues', broken: 'Not working', mixed: 'Mixed', clear: 'Clear filters', loading: 'Loading community results…', empty: 'No matching community reports yet.', offline: 'Community service is unavailable. Check your connection and try again.',
      reports: n => `${n} report${n === 1 ? '' : 's'}`, comments: n => `${n} comment${n === 1 ? '' : 's'}`, noComments: 'No comments yet.', updated: 'Live updates are on while this card is open.',
      share: 'Share your result', routeUsed: 'Route used', choose: 'Choose…', unknown: 'Unknown', yourResult: 'Your result', optionalComment: 'Optional comment', sent: 'Data that will be sent', privacy: 'No folder path is sent. The server stores only a hash of a random app identifier.', cancel: 'Cancel', submit: 'Submit report', submitting: 'Submitting…', chooseRoute: 'Choose the route you actually used.', chooseVerdict: 'Choose your result.', sentOk: 'Your report was added to the community.',
      profile: 'Community profile', profileHint: 'Your fixed avatar and display name appear beside your comments. A name can change once a week.', displayName: 'Display name', chooseIcon: 'Choose an avatar', save: 'Save profile', saved: 'Profile saved.', unnamed: 'Anonymous', addGame: 'Add to community-tested games', reactionFailed: 'Could not save that reaction.',
      facts: { title: 'Game', route: 'Route', api: 'API', gpu: 'GPU', driver: 'Driver', cpu: 'CPU', os: 'OS', app: 'App version' }
    },
    ar: {
      title: 'ألعاب اختبرها المجتمع', subtitle: 'نتائج حقيقية من مستخدمي DLSS 5 Swapper.', refresh: 'تحديث', search: 'بحث عن لعبة', route: 'طريقة التثبيت', api: 'واجهة الرسوم', result: 'النتيجة',
      allRoutes: 'كل الطرق', allApis: 'كل الواجهات', allResults: 'كل النتائج', working: 'تعمل', issues: 'تعمل مع مشاكل', broken: 'لا تعمل', mixed: 'نتائج مختلطة', clear: 'مسح الفلاتر', loading: 'جاري تحميل نتائج المجتمع…', empty: 'لا توجد تقارير مطابقة حتى الآن.', offline: 'خدمة المجتمع غير متاحة. تحقق من اتصالك وحاول مجددًا.',
      reports: n => `${n} تقرير`, comments: n => `${n} تعليق`, noComments: 'لا توجد تعليقات بعد.', updated: 'التحديث المباشر يعمل أثناء فتح هذه البطاقة.',
      share: 'شارك نتيجتك', routeUsed: 'طريقة التثبيت المستخدمة', choose: 'اختر…', unknown: 'غير معروف', yourResult: 'نتيجتك', optionalComment: 'تعليق اختياري', sent: 'البيانات التي سيتم إرسالها', privacy: 'لن يُرسل مسار مجلد اللعبة. الخادم يحفظ فقط بصمة لمعرّف عشوائي خاص بالتطبيق.', cancel: 'إلغاء', submit: 'إرسال التقرير', submitting: 'جاري الإرسال…', chooseRoute: 'اختر طريقة التثبيت التي استخدمتها فعليًا.', chooseVerdict: 'اختر نتيجتك.', sentOk: 'تمت إضافة تقريرك إلى المجتمع.',
      profile: 'ملف المجتمع', profileHint: 'تظهر صورتك الثابتة واسمك بجانب تعليقاتك. يمكن تغيير الاسم مرة كل أسبوع.', displayName: 'اسم العرض', chooseIcon: 'اختر صورة', save: 'حفظ الملف', saved: 'تم حفظ الملف.', unnamed: 'مجهول', addGame: 'إضافة إلى الألعاب المختبرة من المجتمع', reactionFailed: 'تعذر حفظ التفاعل.',
      facts: { title: 'اللعبة', route: 'الطريقة', api: 'الواجهة', gpu: 'كرت الشاشة', driver: 'التعريف', cpu: 'المعالج', os: 'النظام', app: 'إصدار البرنامج' }
    }
  };
  const avatars = ['🎮','🚀','⚡','🛡️','🔥','⭐','🎯','🕹️','👾','🤖','🐉','🦊','🐺','🦁','🦅','🐙','🌌','🌙','☀️','💎','🔧','🧪','🏁','🎧'];
  const state = { cards: [], filters: { q: '', route: 'all', api: 'all', status: 'all' }, active: null, etag: null, timer: null, report: null, verdict: null };
  const text = () => L[(window.i18n?.getLang?.() || 'en').startsWith('ar') ? 'ar' : 'en'];
  const totals = verdicts => Object.values(verdicts || {}).reduce((sum, row) => ({ green: sum.green + (row.green || 0), yellow: sum.yellow + (row.yellow || 0), red: sum.red + (row.red || 0) }), { green: 0, yellow: 0, red: 0 });
  const statusClass = status => ['working', 'mixed', 'broken'].includes(status) ? status : 'unknown';
  const statusText = status => status === 'working' ? text().working : status === 'broken' ? text().broken : status === 'mixed' ? text().mixed : text().unknown;
  const avatar = index => `<span class="community-avatar" aria-hidden="true">${avatars[Number(index) || 0] || avatars[0]}</span>`;

  function applyLanguage() {
    const s = text();
    const values = { communityTitle: s.title, communitySubtitle: s.subtitle, communityRefresh: s.refresh, communitySearchLabel: s.search, communityRouteLabel: s.route, communityApiLabel: s.api, communityStatusLabel: s.result, communityClear: s.clear, communityReportTitle: s.share, communityReportRouteLabel: s.routeUsed, communityReportApiLabel: s.api, communityVerdictLabel: s.yourResult, communityCommentLabel: s.optionalComment, communityPrivacyTitle: s.sent, communityPrivacyNote: s.privacy, communityReportCancel: s.cancel, communityReportSubmit: s.submit };
    for (const [id, value] of Object.entries(values)) if ($(id)) $(id).textContent = value;
    const setOption = (id, value, label) => { const option = $(id)?.querySelector(`option[value="${value}"]`); if (option) option.textContent = label; };
    setOption('communityRoute', 'all', s.allRoutes); setOption('communityApi', 'all', s.allApis); setOption('communityStatus', 'all', s.allResults);
    setOption('communityStatus', 'working', s.working); setOption('communityStatus', 'mixed', s.mixed); setOption('communityStatus', 'broken', s.broken);
    setOption('communityReportRoute', '', s.choose); setOption('communityReportApi', '', s.unknown);
    const verdictLabels = [s.working, s.issues, s.broken];
    document.querySelectorAll('.community-verdicts button span').forEach((node, index) => { node.textContent = verdictLabels[index]; });
  }

  function cardMarkup(card) {
    const count = totals(card.verdicts);
    return `<button class="community-card" data-community-card="${esc(card.key)}" type="button">
      <div class="community-card-top"><span class="community-dot ${statusClass(card.status)}"></span><span class="community-status">${esc(statusText(card.status))}</span><span class="community-kind">${esc(card.kind)}</span></div>
      <h4>${esc(card.title)}</h4>
      <div class="community-counts"><span class="green">● ${count.green}</span><span class="yellow">● ${count.yellow}</span><span class="red">● ${count.red}</span></div>
      <div class="community-card-foot"><span>${esc(text().reports(card.reports || 0))}</span><span>💬 ${esc(text().comments(card.comments || 0))}</span></div>
    </button>`;
  }

  async function render() {
    applyLanguage();
    $('communityNotice').textContent = text().loading;
    $('communityRefresh').disabled = true;
    const response = await window.lab.communityCards(state.filters);
    $('communityRefresh').disabled = false;
    if (!response?.ok) {
      $('communityCards').innerHTML = '';
      $('communityNotice').textContent = response?.message || text().offline;
      return;
    }
    state.cards = response.cards || [];
    $('communityNotice').textContent = state.cards.length ? '' : text().empty;
    $('communityCards').innerHTML = state.cards.map(cardMarkup).join('');
  }

  function routeCounts(verdicts) {
    return ['feeder', 'renodx', 'optiscaler'].filter(route => verdicts?.[route]).map(route => {
      const row = verdicts[route];
      return `<div class="community-route-count"><b>${route === 'optiscaler' ? 'OptiScaler' : route === 'renodx' ? 'RenoDX' : 'Feeder'}</b><span class="green">● ${row.green || 0}</span><span class="yellow">● ${row.yellow || 0}</span><span class="red">● ${row.red || 0}</span></div>`;
    }).join('');
  }

  function commentMarkup(comment) {
    const by = comment.by || {};
    const reactions = ['👍','🔥','🎉','😕'].map(emoji => `<button type="button" data-reaction="${emoji}" data-report="${comment.id}">${emoji}<span>${comment.reactions?.[emoji] || ''}</span></button>`).join('');
    return `<article class="community-comment-card">
      <header>${avatar(by.icon)}<div><b>${esc(by.name || text().unnamed)} <small>#${esc(by.tag || '----')}</small></b><span>${esc(comment.route || '')} · ${esc((comment.api || '').toUpperCase())}</span></div><i class="community-dot ${comment.verdict}"></i></header>
      ${comment.comment ? `<p>${esc(comment.comment)}</p>` : ''}
      <div class="community-tags">${(comment.tags || []).map(tag => `<span>${esc(tag)}</span>`).join('')}</div>
      <div class="community-reactions">${reactions}</div>
    </article>`;
  }

  function paintCard(card) {
    state.active = card;
    $('communityCardTitle').textContent = card.title;
    $('communityCardMeta').textContent = text().updated;
    $('communityCardBody').innerHTML = `<div class="community-route-counts">${routeCounts(card.verdicts)}</div><div class="community-comments">${card.comments?.length ? card.comments.map(commentMarkup).join('') : `<p class="community-empty">${esc(text().noComments)}</p>`}</div>`;
  }

  async function openCard(key) {
    stopPolling(); state.etag = null;
    const response = await window.lab.communityCard(key, null);
    if (!response?.ok || !response.card) { $('communityNotice').textContent = response?.message || text().offline; return; }
    state.etag = response.etag; paintCard(response.card);
    $('communityCardDialog').showModal();
    state.timer = setInterval(poll, 10_000);
  }

  async function poll() {
    if (!state.active || !$('communityCardDialog').open) return stopPolling();
    const result = await window.lab.communityUpdates(state.active.key, state.active.version, state.etag);
    if (!result?.ok || result.notModified || !result.updates?.changes?.length) return;
    const latest = await window.lab.communityCard(state.active.key, null);
    if (latest?.ok && latest.card) { state.etag = latest.etag; paintCard(latest.card); render(); }
  }
  function stopPolling() { if (state.timer) clearInterval(state.timer); state.timer = null; }
  function closeCard() { stopPolling(); state.active = null; $('communityCardDialog').close(); }

  function privacyRows(prefill) {
    const facts = { title: prefill.title, route: $('communityReportRoute').value || '—', api: $('communityReportApi').value || '—', gpu: prefill.gpu, driver: prefill.driver, cpu: prefill.cpu, os: prefill.os, app: prefill.app };
    return Object.entries(facts).map(([key, value]) => `<div><span>${esc(text().facts[key])}</span><b>${esc(value || '—')}</b></div>`).join('');
  }
  function updatePrivacy() { if (state.report) $('communityPrivacyData').innerHTML = privacyRows(state.report); }

  async function openReport(dir) {
    const response = await window.lab.communityPrefill(dir);
    if (!response?.ok) { $('communityNotice').textContent = response?.message || text().offline; return; }
    state.report = response.prefill; state.verdict = null; applyLanguage();
    $('communityReportGame').textContent = state.report.title;
    $('communityReportRoute').value = state.report.route || '';
    $('communityReportApi').value = state.report.api || '';
    $('communityReportComment').value = '';
    $('communityReportError').textContent = '';
    document.querySelectorAll('.community-verdicts button').forEach(button => button.classList.remove('selected'));
    updatePrivacy(); $('communityReportDialog').showModal();
  }
  function closeReport() { state.report = null; state.verdict = null; $('communityReportDialog').close(); }

  async function submitReport(event) {
    event.preventDefault();
    const route = $('communityReportRoute').value;
    if (!route) { $('communityReportError').textContent = text().chooseRoute; return; }
    if (!state.verdict) { $('communityReportError').textContent = text().chooseVerdict; return; }
    const button = $('communityReportSubmit'); button.disabled = true; button.textContent = text().submitting;
    const p = state.report;
    const report = { game: p.game, route, verdict: state.verdict, api: $('communityReportApi').value || null, comment: $('communityReportComment').value || null, gpu: p.gpu, driver: p.driver, cpu: p.cpu, os: p.os, app: p.app };
    const response = await window.lab.communityReport(report);
    button.disabled = false; button.textContent = text().submit;
    if (!response?.ok) { $('communityReportError').textContent = response?.message || text().offline; return; }
    closeReport(); await render(); $('communityNotice').textContent = text().sentOk;
  }

  async function renderProfile(container) {
    const profile = await window.lab.communityProfile();
    const section = document.createElement('section'); section.className = 'community-profile';
    section.innerHTML = `<div class="community-profile-copy"><div class="k">${esc(text().profile)}</div><div class="v">${esc(text().profileHint)}</div><label>${esc(text().displayName)}<input id="communityProfileName" maxlength="24" value="${esc(profile?.name || '')}"></label><div class="community-profile-status" id="communityProfileStatus"></div></div><div class="community-profile-picker"><span>${esc(text().chooseIcon)}</span><div>${avatars.map((item, index) => `<button type="button" data-community-icon="${index}" class="${index === (Number(profile?.icon) || 0) ? 'selected' : ''}">${item}</button>`).join('')}</div><button class="glass-btn sm" id="communityProfileSave">${esc(text().save)}</button></div>`;
    container.prepend(section);
    let icon = Number(profile?.icon) || 0;
    section.onclick = event => {
      const pick = event.target.closest('[data-community-icon]');
      if (!pick) return;
      icon = Number(pick.dataset.communityIcon);
      section.querySelectorAll('[data-community-icon]').forEach(button => button.classList.toggle('selected', button === pick));
    };
    $('communityProfileSave').onclick = async () => {
      const button = $('communityProfileSave'); button.disabled = true; $('communityProfileStatus').textContent = '';
      const response = await window.lab.communitySaveProfile({ name: $('communityProfileName').value, icon });
      button.disabled = false;
      $('communityProfileStatus').textContent = response?.ok ? text().saved : (response?.message || text().offline);
    };
  }

  function bind() {
    for (const [id, key] of [['communitySearch','q'],['communityRoute','route'],['communityApi','api'],['communityStatus','status']]) {
      $(id).addEventListener(id === 'communitySearch' ? 'input' : 'change', event => { state.filters[key] = event.target.value; clearTimeout(bind.wait); bind.wait = setTimeout(render, id === 'communitySearch' ? 250 : 0); });
    }
    $('communityRefresh').onclick = render;
    $('communityClear').onclick = () => { state.filters = { q: '', route: 'all', api: 'all', status: 'all' }; for (const id of ['communitySearch','communityRoute','communityApi','communityStatus']) $(id).value = id === 'communitySearch' ? '' : 'all'; render(); };
    $('communityCards').onclick = event => { const card = event.target.closest('[data-community-card]'); if (card) openCard(card.dataset.communityCard); };
    $('communityCardClose').onclick = closeCard; $('communityCardDialog').addEventListener('cancel', event => { event.preventDefault(); closeCard(); });
    $('communityCardBody').onclick = async event => { const button = event.target.closest('[data-reaction]'); if (!button) return; button.disabled = true; const response = await window.lab.communityReaction(button.dataset.report, button.dataset.reaction, true); button.disabled = false; if (!response?.ok) return void ($('communityCardMeta').textContent = response?.message || text().reactionFailed); const latest = await window.lab.communityCard(state.active.key, null); if (latest?.ok) paintCard(latest.card); };
    $('communityReportClose').onclick = closeReport; $('communityReportCancel').onclick = closeReport; $('communityReportDialog').addEventListener('cancel', event => { event.preventDefault(); closeReport(); });
    $('communityReportRoute').onchange = updatePrivacy; $('communityReportApi').onchange = updatePrivacy;
    document.querySelector('.community-verdicts').onclick = event => { const button = event.target.closest('[data-verdict]'); if (!button) return; state.verdict = button.dataset.verdict; document.querySelectorAll('.community-verdicts button').forEach(item => item.classList.toggle('selected', item === button)); };
    $('communityReportForm').onsubmit = submitReport;
  }
  bind(); applyLanguage();
  window.communityUi = { render, renderProfile, openReport, applyLanguage, stopPolling };
})();
