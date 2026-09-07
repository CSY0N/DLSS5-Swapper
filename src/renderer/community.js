'use strict';
(function () {
  const $ = id => document.getElementById(id);
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const L = {
    en: {
      title: 'Community-tested games', subtitle: 'Real results from DLSS 5 Swapper users.', refresh: 'Refresh', search: 'Search games', route: 'Route', api: 'Rendering API', result: 'Result',
      allRoutes: 'All routes', allApis: 'All APIs', allResults: 'All results', working: 'Working', issues: 'Works with issues', broken: 'Not working', mixed: 'Mixed', clear: 'Clear filters', loading: 'Loading community results…', empty: 'No matching community reports yet.', offline: 'Community service is unavailable. Check your connection and try again.',
      reports: n => `${n} report${n === 1 ? '' : 's'}`, comments: n => `${n} comment${n === 1 ? '' : 's'}`, noComments: 'No comments yet.', updated: 'Live updates are on while this card is open.',
      share: 'Share your result', shareHint: 'Share your result and help the community.', why: 'Your report helps improve compatibility for everyone.', routeUsed: 'Route used', choose: 'Choose…', unknown: 'Unknown', yourResult: 'Your result', optionalComment: 'Optional comment', sent: 'Data that will be sent', privacy: 'No folder path is sent. The server stores only a hash of a random app identifier.', cancel: 'Cancel', submit: 'Submit report', submitting: 'Submitting…', chooseRoute: 'Choose the route you actually used.', chooseVerdict: 'Choose your result.', sentOk: 'Your report was added to the community.',
      profile: 'Community profile', profileHint: 'Your fixed avatar and display name appear beside your comments. A name can change once a week.', displayName: 'Display name', chooseIcon: 'Choose an avatar', save: 'Save profile', saved: 'Profile saved.', unnamed: 'Anonymous', addGame: 'Add to community-tested games', reactionFailed: 'Could not save that reaction.',
      reply: 'Reply', back: 'Back to all results', noReplies: 'No replies yet. Be the first.',
      replyingTo: 'Replying to',
      showing: (route, n) => `${route} · ${n} ${n === 1 ? 'result' : 'results'}`, showAll: 'Show all routes',
      replyPlaceholder: 'Reply to this result…', send: 'Send',
      facts: { title: 'Game', route: 'Route', api: 'API', gpu: 'GPU', driver: 'Driver', cpu: 'CPU', os: 'OS', app: 'App version' }
    },
    ar: {
      title: 'ألعاب اختبرها المجتمع', subtitle: 'نتائج حقيقية من مستخدمي DLSS 5 Swapper.', refresh: 'تحديث', search: 'بحث عن لعبة', route: 'طريقة التثبيت', api: 'واجهة الرسوم', result: 'النتيجة',
      allRoutes: 'كل الطرق', allApis: 'كل الواجهات', allResults: 'كل النتائج', working: 'تعمل', issues: 'تعمل مع مشاكل', broken: 'لا تعمل', mixed: 'نتائج مختلطة', clear: 'مسح الفلاتر', loading: 'جاري تحميل نتائج المجتمع…', empty: 'لا توجد تقارير مطابقة حتى الآن.', offline: 'خدمة المجتمع غير متاحة. تحقق من اتصالك وحاول مجددًا.',
      reports: n => `${n} تقرير`, comments: n => `${n} تعليق`, noComments: 'لا توجد تعليقات بعد.', updated: 'التحديث المباشر يعمل أثناء فتح هذه البطاقة.',
      share: 'شارك نتيجتك', shareHint: 'شارك نتيجتك وساعد المجتمع.', why: 'بلاغك يحسّن التوافق للجميع.', routeUsed: 'طريقة التثبيت المستخدمة', choose: 'اختر…', unknown: 'غير معروف', yourResult: 'نتيجتك', optionalComment: 'تعليق اختياري', sent: 'البيانات التي سيتم إرسالها', privacy: 'لن يُرسل مسار مجلد اللعبة. الخادم يحفظ فقط بصمة لمعرّف عشوائي خاص بالتطبيق.', cancel: 'إلغاء', submit: 'إرسال التقرير', submitting: 'جاري الإرسال…', chooseRoute: 'اختر طريقة التثبيت التي استخدمتها فعليًا.', chooseVerdict: 'اختر نتيجتك.', sentOk: 'تمت إضافة تقريرك إلى المجتمع.',
      profile: 'ملف المجتمع', profileHint: 'تظهر صورتك الثابتة واسمك بجانب تعليقاتك. يمكن تغيير الاسم مرة كل أسبوع.', displayName: 'اسم العرض', chooseIcon: 'اختر صورة', save: 'حفظ الملف', saved: 'تم حفظ الملف.', unnamed: 'مجهول', addGame: 'إضافة إلى الألعاب المختبرة من المجتمع', reactionFailed: 'تعذر حفظ التفاعل.',
      reply: 'رد', back: 'الرجوع إلى كل النتائج', noReplies: 'لا ردود بعد. كن أول من يرد.',
      replyingTo: 'ردًّا على',
      showing: (route, n) => `${route} · ${n} نتيجة`, showAll: 'عرض كل الطرق',
      replyPlaceholder: 'ردّ على هذه النتيجة…', send: 'إرسال',
      facts: { title: 'اللعبة', route: 'الطريقة', api: 'الواجهة', gpu: 'كرت الشاشة', driver: 'التعريف', cpu: 'المعالج', os: 'النظام', app: 'إصدار البرنامج' }
    }
  };
  const avatars = ['🎮','🚀','⚡','🛡️','🔥','⭐','🎯','🕹️','👾','🤖','🐉','🦊','🐺','🦁','🦅','🐙','🌌','🌙','☀️','💎','🔧','🧪','🏁','🎧'];
  // The heart first: it is the one people reach for. The rest keep the order
  // they have always had, so nobody's muscle memory moves.
  const REACTIONS = ['❤️', '👍', '🔥', '🎉', '😕'];
  const MINE_KEY = 'community-reactions';
  // Which reactions this install has pressed. Local because the card itself is
  // cached and shared; the server stays the authority on the counts, and a
  // stale entry here only costs one request it ignores.
  const readMine = () => { try { return JSON.parse(localStorage.getItem(MINE_KEY)) || {}; } catch { return {}; } };
  const state = { art: {}, thread: null, route: null, cards: [], filters: { q: '', route: 'all', api: 'all', status: 'all' }, active: null, etag: null, timer: null, report: null, verdict: null, mine: readMine() };
  const saveMine = () => { try { localStorage.setItem(MINE_KEY, JSON.stringify(state.mine)); } catch { /* private window, or storage off */ } };
  const text = () => L[(window.i18n?.getLang?.() || 'en').startsWith('ar') ? 'ar' : 'en'];
  const totals = verdicts => Object.values(verdicts || {}).reduce((sum, row) => ({ green: sum.green + (row.green || 0), yellow: sum.yellow + (row.yellow || 0), red: sum.red + (row.red || 0) }), { green: 0, yellow: 0, red: 0 });
  const statusClass = status => ['working', 'mixed', 'broken'].includes(status) ? status : 'unknown';
  const statusText = status => status === 'working' ? text().working : status === 'broken' ? text().broken : status === 'mixed' ? text().mixed : text().unknown;
  // A stable colour per game, so a card without a poster is still recognisably
  // that game rather than one more grey rectangle.
  const hueOf = title => { let h = 0; for (const c of String(title)) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
  const initialsOf = title => String(title || '?').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();

  // Posters are fetched one at a time after the grid is already on screen: the
  // page must never wait on a picture, and Steam's store is rate limited.
  async function fetchArt(cards) {
    for (const card of cards) {
      if (state.art[card.key] !== undefined) continue;
      state.art[card.key] = null;
      let answer = null;
      try { answer = await window.lab.communityArt(card.key, card.title); } catch { /* offline */ }
      state.art[card.key] = answer && answer.cover ? answer : null;
      if (answer && answer.cover && state.cards.some(item => item.key === card.key)) paintCards();
    }
  }

  // One shape per route, so the eye tells them apart before it reads them.
  // Every glyph in the report dialog, drawn rather than shipped so they take
  // the theme with them and cost no load.
  const ICON = {
    route: '<path d="M12 2a5 5 0 0 1 5 5c0 3.5-5 13-5 13S7 10.5 7 7a5 5 0 0 1 5-5z"/><circle cx="12" cy="7" r="2"/>',
    api: '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-2.9-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 15H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.1-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 4.2V4a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 2.9 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 21 11h.2a2 2 0 1 1 0 4z"/>',
    result: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    comment: '<path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-6.5A8 8 0 0 1 11 4h2a8 8 0 0 1 8 8z"/>',
    game: '<rect x="2" y="7" width="20" height="11" rx="4"/><path d="M7 11v3m-1.5-1.5h3M16 12h.01M18.5 14h.01"/>',
    gpu: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 18v2M17 18v2M8 10h8v4H8z"/>',
    cpu: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3"/>',
    driver: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    os: '<path d="M3 5.5 10.5 4.4v7.1H3zM12.5 4.1 21 3v8.5h-8.5zM3 12.5h7.5v7.1L3 18.5zM12.5 12.5H21V21l-8.5-1.1z"/>',
    app: '<path d="m12 2 9 5v10l-9 5-9-5V7z"/><path d="m3 7 9 5 9-5M12 12v10"/>',
    player: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    tag: '<path d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.4"/>',
    sent: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    send: '<path d="m4 12 16-8-6 8 6 8z"/><path d="M4 12h10"/>',
    check: '<path d="m5 13 4 4L19 7"/>'
  };
  const icon = (name, cls = '') =>
    `<svg class="c-icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[name] || ''}</svg>`;

  const ROUTE_MARK = {
    feeder: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 1 8 8"/><path d="m8 16-4 4 4 4" transform="translate(0 -8)"/></svg>',
    renodx: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>',
    optiscaler: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M9 15V9h3a3 3 0 0 1 0 6z"/></svg>'
  };

  // "3 days ago" rather than a timestamp: on a page of opinions, how old one is
  // matters more than when exactly it was written.
  function ago(at) {
    const when = Number(at);
    if (!Number.isFinite(when) || when <= 0) return '';
    const seconds = Math.round((when - Date.now()) / 1000);
    const steps = [[60, 'second'], [60, 'minute'], [24, 'hour'], [7, 'day'], [4.35, 'week'], [12, 'month'], [Infinity, 'year']];
    let value = seconds, unit = 'second';
    for (const [size, name] of steps) {
      if (Math.abs(value) < size) { unit = name; break; }
      value /= size; unit = name;
    }
    try { return new Intl.RelativeTimeFormat(document.documentElement.lang || 'en', { numeric: 'auto' }).format(Math.round(value), unit); }
    catch { return ''; }
  }

  const avatar = index => `<span class="community-avatar" aria-hidden="true">${avatars[Number(index) || 0] || avatars[0]}</span>`;

  function applyLanguage() {
    const s = text();
    const values = { communityTitle: s.title, communitySubtitle: s.subtitle, communityRefresh: s.refresh, communitySearchLabel: s.search, communityRouteLabel: s.route, communityApiLabel: s.api, communityStatusLabel: s.result, communityClear: s.clear, communityReportRouteLabel: s.routeUsed, communityReportApiLabel: s.api, communityVerdictLabel: s.yourResult, communityCommentLabel: s.optionalComment, communityPrivacyTitle: s.sent, communityPrivacyNote: s.privacy, communityWhy: s.why, communityReportCancel: s.cancel, communityReportSubmit: s.submit };
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
    // The poster is the card. Until one arrives - or when a game has none - the
    // initials stand in on a colour derived from the title, so the grid never
    // shows a hole where a picture will be.
    const art = state.art[card.key];
    const cover = art && art.cover;
    return `<button class="community-card${cover ? ' has-art' : ''}" data-community-card="${esc(card.key)}" type="button"
      style="--card-hue:${hueOf(card.title)}deg">
      ${cover ? `<img class="community-art" src="${esc(cover)}" alt="" loading="lazy">`
              : `<span class="community-initials" aria-hidden="true">${esc(initialsOf(card.title))}</span>`}
      <span class="community-veil"></span>
      <span class="community-pill ${statusClass(card.status)}"><i class="community-dot ${statusClass(card.status)}"></i>${esc(statusText(card.status))}</span>
      <span class="community-kind">${esc(card.kind)}</span>
      <span class="community-card-body">
        <span class="community-title">${esc(card.title)}</span>
        <span class="community-counts">
          <span class="green"><i class="community-dot green"></i>${count.green}</span>
          <span class="yellow"><i class="community-dot yellow"></i>${count.yellow}</span>
          <span class="red"><i class="community-dot red"></i>${count.red}</span>
        </span>
        <span class="community-card-foot">
          <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>${esc(text().reports(card.reports || 0))}</span>
          <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-6.5A8 8 0 0 1 11 4h2a8 8 0 0 1 8 8z"/></svg>${esc(text().comments(card.comments || 0))}</span>
        </span>
      </span>
      <span class="community-go" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span>
    </button>`;
  }

  const paintCards = () => { $('communityCards').innerHTML = state.cards.map(cardMarkup).join(''); };

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
    paintCards();
    // After the grid is up, never before it: a page must not wait on a picture.
    fetchArt(state.cards);
  }

  function routeCounts(verdicts) {
    return ['feeder', 'renodx', 'optiscaler'].filter(route => verdicts?.[route]).map(route => {
      const row = verdicts[route];
      const name = route === 'optiscaler' ? 'OptiScaler' : route === 'renodx' ? 'RenoDX' : 'Feeder';
      const on = state.route === route;
      return `<button type="button" class="community-route-count ${route}${on ? ' on' : ''}"
        data-route="${route}" aria-pressed="${on}">
        <span class="community-route-tile" aria-hidden="true">${ROUTE_MARK[route]}</span>
        <span class="community-route-copy"><b>${name}</b>
          <span class="community-counts">
            <span class="green"><i class="community-dot green"></i>${row.green || 0}</span>
            <span class="yellow"><i class="community-dot yellow"></i>${row.yellow || 0}</span>
            <span class="red"><i class="community-dot red"></i>${row.red || 0}</span>
          </span></span>
        <svg class="community-route-go" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
      </button>`;
    }).join('');
  }

  // A small celebration inside the card you pressed, and nowhere else. It is
  // drawn locally and never sent anywhere: the person who pressed the button is
  // the only one who sees it, which is what makes it feel like a reply to them
  // rather than an announcement.
  const BURST = 16;
  function burst(card, emoji) {
    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const layer = document.createElement('span');
    layer.className = 'community-burst';
    const random = (low, high) => low + Math.random() * (high - low);
    let longest = 0;
    for (let i = 0; i < BURST; i++) {
      const piece = document.createElement('span');
      piece.textContent = emoji;
      // A few come at the camera - big, fast, straight up - while the rest
      // drift like something falling upward past you.
      const near = i % 5 === 0;
      const life = random(near ? 900 : 1200, near ? 1300 : 2000);
      const delay = random(0, 420);
      longest = Math.max(longest, life + delay);
      piece.style.cssText = `left:${random(4, 92)}%;` +
        `--size:${near ? random(20, 30) : random(11, 20)}px;` +
        `--dx:${random(-38, 38)}px;--dy:${random(-96, -168)}px;` +
        `--scale:${near ? random(1.9, 2.7) : random(.7, 1.25)};` +
        `--spin:${random(-40, 40)}deg;--life:${life}ms;--delay:${delay}ms;`;
      layer.appendChild(piece);
    }
    card.appendChild(layer);
    setTimeout(() => layer.remove(), longest + 260);
  }

  function commentMarkup(comment) {
    const by = comment.by || {};
    // Which of these this install has pressed is remembered here rather than
    // asked of the server: the card is cached for everyone alike, and one
    // person's own reactions have no business in a shared response.
    const reactions = REACTIONS.map(emoji => {
      const on = state.mine[`${comment.id}:${emoji}`] === true;
      return `<button type="button" class="${on ? 'on' : ''}" data-reaction="${emoji}" data-report="${comment.id}"
        aria-pressed="${on}">${emoji}<span>${comment.reactions?.[emoji] || ''}</span></button>`;
    }).join('');
    return `<article class="community-comment-card">
      <span class="community-sheen" aria-hidden="true"></span>
      <span class="community-avatar-tile">${avatar(by.icon)}</span>
      <div class="community-comment-main">
        <header>
          <b>${esc(by.name || text().unnamed)}</b><small>#${esc(by.tag || '----')}</small>
          <span class="community-when">${esc(ago(comment.at))}</span>
          <i class="community-dot ${comment.verdict}" title="${esc(comment.route || '')}"></i>
        </header>
        ${comment.comment ? `<p>${esc(comment.comment)}</p>` : ''}
        <div class="community-tags">${(comment.tags || []).map(tag => `<span>${esc(tag)}</span>`).join('')}</div>
        <div class="community-reactions">${reactions}
          <button type="button" class="community-open-thread" data-thread="${comment.id}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-6.5A8 8 0 0 1 11 4h2a8 8 0 0 1 8 8z"/></svg>
            ${comment.replies ? `<span>${comment.replies}</span>` : ''}${esc(text().reply)}
          </button>
        </div>
      </div>
    </article>`;
  }

  // One comment and everything said under it. It replaces the list rather than
  // opening a second window, so there is one thing on screen at a time and one
  // way back.
  async function openThread(reportId) {
    const comment = (state.active?.comments || []).find(item => String(item.id) === String(reportId));
    if (!comment) return;
    state.thread = { id: reportId, comment };
    $('communityCardBody').innerHTML = `<p class="community-empty">${esc(text().loading)}</p>`;
    await paintThread();
  }

  async function paintThread() {
    if (!state.thread) return;
    const { id, comment } = state.thread;
    const answer = await window.lab.communityReplies(id);
    const replies = answer?.ok ? answer.thread.replies : [];
    $('communityCardBody').innerHTML = `
      <div class="community-thread">
        <button type="button" class="community-back" id="communityThreadBack">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>${esc(text().back)}
        </button>
        ${threadRoot(comment)}
        <div class="community-replies">${replies.length
          ? replies.map(replyMarkup).join('')
          : `<p class="community-empty">${esc(text().noReplies)}</p>`}</div>
        <form class="community-composer" id="communityReplyForm">
          <textarea id="communityReplyBody" rows="2" maxlength="1200" placeholder="${esc(text().replyPlaceholder)}"></textarea>
          <button type="submit" aria-label="${esc(text().send)}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 16-8-6 8 6 8z"/><path d="M4 12h10"/></svg>
            <span>${esc(text().send)}</span>
          </button>
        </form>
      </div>`;
    $('communityThreadBack').onclick = () => { state.thread = null; paintCard(state.active); };
    $('communityReplyForm').onsubmit = async event => {
      event.preventDefault();
      const box = $('communityReplyBody'), said = box.value.trim();
      if (!said) return;
      const button = event.target.querySelector('button');
      button.disabled = true;
      const answer = await window.lab.communityReply(id, said);
      button.disabled = false;
      if (!answer?.ok) { $('communityNotice').textContent = answer?.message || text().reactionFailed; return; }
      box.value = '';
      await paintThread();
    };
  }

  // What the thread is about, said once and small: who, what they found, and on
  // what. Everything else - the tags in full, the reactions, the way in - lives
  // on the list, and repeating it here buried the conversation under it.
  const routeName = route => route === 'optiscaler' ? 'OptiScaler' : route === 'renodx' ? 'RenoDX' : 'Feeder';

  function threadRoot(comment) {
    const by = comment.by || {};
    const about = [comment.route, (comment.api || '').toUpperCase(), ...(comment.tags || []).slice(0, 2)]
      .filter(Boolean).join(' · ');
    return `<div class="community-thread-root">
      <span class="community-thread-label">${esc(text().replyingTo)}</span>
      <div class="community-quote">
        <span class="community-avatar-tile small">${avatar(by.icon)}</span>
        <div>
          <header><b>${esc(by.name || text().unnamed)}</b><small>#${esc(by.tag || '----')}</small>
            <span class="community-when">${esc(ago(comment.at))}</span>
            <i class="community-dot ${esc(comment.verdict || '')}"></i></header>
          ${comment.comment ? `<p>${esc(comment.comment)}</p>` : ''}
          ${about ? `<span class="community-about">${esc(about)}</span>` : ''}
        </div>
      </div>
    </div>`;
  }

  function replyMarkup(item) {
    const by = item.by || {};
    return `<article class="community-reply">
      <span class="community-avatar-tile small">${avatar(by.icon)}</span>
      <div>
        <header><b>${esc(by.name || text().unnamed)}</b><small>#${esc(by.tag || '----')}</small>
          <span class="community-when">${esc(ago(item.at))}</span></header>
        <p>${esc(item.body)}</p>
      </div>
    </article>`;
  }

  function paintCard(card) {
    state.active = card;
    // A live update arriving while a thread is open must not throw the reader
    // back to the list; the thread refreshes itself instead.
    if (state.thread) { paintThread(); return; }
    const art = state.art[card.key] || {};
    const head = $('communityCardHead');
    head.style.setProperty('--card-hue', `${hueOf(card.title)}deg`);
    head.classList.toggle('has-art', Boolean(art.cover));
    head.innerHTML = `
      ${art.cover ? `<img class="community-head-art" src="${esc(art.cover)}" alt="">` : ''}
      <span class="community-head-veil"></span>
      <span class="community-poster">${art.poster
        ? `<img src="${esc(art.poster)}" alt="">`
        : `<span class="community-initials">${esc(initialsOf(card.title))}</span>`}</span>
      <span class="community-head-copy">
        <h3>${esc(card.title)}</h3>
        <p>${esc(text().updated)}</p>
        <span class="community-route-counts">${routeCounts(card.verdicts)}</span>
      </span>`;
    const shown = state.route
      ? (card.comments || []).filter(item => item.route === state.route)
      : (card.comments || []);
    $('communityCardBody').innerHTML = `
      ${state.route ? `<div class="community-route-filter">
        <span>${esc(text().showing(routeName(state.route), shown.length))}</span>
        <button type="button" id="communityRouteClear">${esc(text().showAll)}</button>
      </div>` : ''}
      <div class="community-comments">${shown.length
        ? shown.map(commentMarkup).join('')
        : `<p class="community-empty">${esc(text().noComments)}</p>`}</div>`;
    const clear = $('communityRouteClear');
    if (clear) clear.onclick = () => { state.route = null; paintCard(state.active); };
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
  function closeCard() { stopPolling(); state.active = null; state.thread = null; state.route = null; $('communityCardDialog').close(); }

  function privacyRows(prefill) {
    const facts = { title: prefill.title, route: $('communityReportRoute').value || '—', api: $('communityReportApi').value || '—', gpu: prefill.gpu, driver: prefill.driver, cpu: prefill.cpu, os: prefill.os, app: prefill.app };
    const glyph = { title: 'game', route: 'route', api: 'api', gpu: 'gpu', driver: 'driver', cpu: 'cpu', os: 'os', app: 'app' };
    return Object.entries(facts).map(([key, value]) =>
      `<div>${icon(glyph[key] || 'info')}<span>${esc(text().facts[key])}</span><b>${esc(value || '—')}</b></div>`).join('');
  }
  function updatePrivacy() { if (state.report) $('communityPrivacyData').innerHTML = privacyRows(state.report); }

  // The same header the opened card has: the game's own art behind it and its
  // poster beside the title, so it is obvious which game is being reported on.
  // "win32 10.0.26200" is what the platform calls itself; nobody says that.
  const platformName = value => /^win/i.test(String(value || '')) ? 'Windows'
    : /^darwin/i.test(String(value || '')) ? 'macOS' : /^linux/i.test(String(value || '')) ? 'Linux' : (value || '');

  // Each label says which glyph belongs to it; this puts them there.
  function paintLabelIcons() {
    for (const label of document.querySelectorAll('#communityReportDialog [data-icon]')) {
      if (label.querySelector('.c-icon')) continue;
      label.insertAdjacentHTML('afterbegin', icon(label.dataset.icon));
    }
  }

  function countComment() {
    const box = $('communityReportComment'), out = $('communityCommentCount');
    if (!box || !out) return;
    out.textContent = `${box.value.length}/${box.maxLength}`;
    out.classList.toggle('near', box.value.length > box.maxLength * 0.9);
  }

  async function paintReportHead() {
    const report = state.report;
    if (!report) return;
    const head = $('communityReportHead');
    const key = report.game?.store && report.game?.storeId ? `${report.game.store}:${report.game.storeId}` : null;
    head.style.setProperty('--card-hue', `${hueOf(report.title)}deg`);
    const paint = wide => {
      head.innerHTML = `
        ${wide ? `<img class="community-head-art" src="${esc(wide)}" alt="">` : ''}
        <span class="community-head-veil"></span>
        <span class="community-poster">${report.poster
          ? `<img src="${esc(report.poster)}" alt="">`
          : `<span class="community-initials">${esc(initialsOf(report.title))}</span>`}</span>
        <span class="community-head-copy">
          ${report.kicker ? `<span class="community-kicker">${esc(report.kicker)}</span>` : ''}
          <h3>${esc(report.title)}</h3>
          <p>${esc(text().shareHint)}</p>
          <span class="community-head-chips">
            <span class="community-chip">${icon('os')}${esc(platformName(report.os))}</span>
            ${report.api ? `<span class="community-chip">${icon('api')}${esc(report.api.toUpperCase())}</span>` : ''}
            <span class="community-chip">${icon('tag')}v${esc(report.app || '')}</span>
          </span>
        </span>`;
    };
    paint(report.hero || (key && state.art[key]?.cover) || null);
    // The wide art may not be here yet; the header is drawn either way and
    // fills in behind, rather than holding the dialog closed while it loads.
    if (!report.hero && key && state.art[key] === undefined) {
      state.art[key] = null;
      try {
        const answer = await window.lab.communityArt(key, report.title);
        if (answer?.cover) { state.art[key] = answer; if (state.report === report) paint(answer.cover); }
      } catch { /* offline: the gradient stands in */ }
    }
  }

  async function openReport(dir) {
    const response = await window.lab.communityPrefill(dir);
    if (!response?.ok) { $('communityNotice').textContent = response?.message || text().offline; return; }
    state.report = response.prefill; state.verdict = null; applyLanguage();
    paintReportHead();
    paintLabelIcons();
    countComment();
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
    // Where the pointer is inside a comment card, handed to CSS so the gold rim
    // lights the edge nearest it. One listener for the whole list, and the work
    // is deferred to the next frame so a fast sweep cannot queue up a hundred
    // style writes.
    let pointerFrame = 0, pointerCard = null, pointerX = 0, pointerY = 0;
    $('communityCardBody').addEventListener('pointermove', event => {
      const card = event.target.closest('.community-comment-card');
      if (!card) return;
      const box = card.getBoundingClientRect();
      pointerCard = card;
      pointerX = event.clientX - box.left;
      pointerY = event.clientY - box.top;
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!pointerCard) return;
        pointerCard.style.setProperty('--mx', `${pointerX}px`);
        pointerCard.style.setProperty('--my', `${pointerY}px`);
      });
    });
    // Leaving takes the light with it rather than freezing it mid-card.
    $('communityCardBody').addEventListener('pointerout', event => {
      const card = event.target.closest('.community-comment-card');
      if (card && !card.contains(event.relatedTarget)) { card.style.removeProperty('--mx'); card.style.removeProperty('--my'); }
    });

    $('communityCardHead').onclick = event => {
      const chip = event.target.closest('[data-route]');
      if (!chip || !state.active) return;
      // Pressing the chip that is already on takes the filter off again.
      state.route = state.route === chip.dataset.route ? null : chip.dataset.route;
      state.thread = null;
      paintCard(state.active);
    };
    $('communityCardClose').onclick = closeCard; $('communityCardDialog').addEventListener('cancel', event => { event.preventDefault(); closeCard(); });
    $('communityCardBody').onclick = async event => {
      const thread = event.target.closest('[data-thread]');
      if (thread) return void openThread(thread.dataset.thread);
      const button = event.target.closest('[data-reaction]');
      if (!button) return;
      const report = button.dataset.report, emoji = button.dataset.reaction;
      const key = `${report}:${emoji}`;
      const on = state.mine[key] !== true;

      button.disabled = true;
      const response = await window.lab.communityReaction(report, emoji, on);
      button.disabled = false;
      if (!response?.ok) { $('communityNotice').textContent = response?.message || text().reactionFailed; return; }

      if (on) state.mine[key] = true; else delete state.mine[key];
      saveMine();

      // Repaint first. It replaces every comment in the list, so anything added
      // to the old card - the celebration included - goes with it; the card to
      // celebrate in is the new one, found again by the report it belongs to.
      const latest = await window.lab.communityCard(state.active.key, null);
      if (latest?.ok) paintCard(latest.card);
      if (!on) return;
      const painted = $('communityCardBody').querySelector(`[data-reaction][data-report="${CSS.escape(report)}"]`);
      burst(painted && painted.closest('.community-comment-card'), emoji);
    };
    $('communityReportClose').onclick = closeReport; $('communityReportCancel').onclick = closeReport; $('communityReportDialog').addEventListener('cancel', event => { event.preventDefault(); closeReport(); });
    $('communityReportRoute').onchange = updatePrivacy; $('communityReportApi').onchange = updatePrivacy;
    $('communityReportComment').oninput = countComment;
    document.querySelector('.community-verdicts').onclick = event => { const button = event.target.closest('[data-verdict]'); if (!button) return; state.verdict = button.dataset.verdict; document.querySelectorAll('.community-verdicts button').forEach(item => item.classList.toggle('selected', item === button)); };
    $('communityReportForm').onsubmit = submitReport;
  }
  bind(); applyLanguage();
  window.communityUi = { render, renderProfile, openReport, applyLanguage, stopPolling };
})();
