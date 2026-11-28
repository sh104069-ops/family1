/* =========================================================
   あの頃君は若かった～
   生活単元学習「家族の関わりと感謝の気持ち」体験アプリ
   データはこの端末の localStorage にのみ保存されます。
   ========================================================= */
(function () {
  'use strict';

  const STORE_KEY = 'anokoro-kimi-wakakatta-v1';

  /* ---------- 選択肢 ---------- */
  const OPT_CHANGES = [
    { e: '📏', t: 'せが のびた' },
    { e: '💪', t: 'からだが 大きくなった' },
    { e: '🙂', t: '顔つきが おとなっぽくなった' },
    { e: '💇', t: 'かみがたが かわった' },
    { e: '😄', t: 'えがおが ふえた' },
    { e: '👓', t: 'めがねを かけた' },
    { e: '👕', t: 'ふくの サイズが かわった' },
    { e: '🦷', t: '歯が はえかわった' },
    { e: '✨', t: 'しっかりした 顔になった' }
  ];
  const OPT_LIKES = [
    { e: '🛝', t: 'すべりだい' }, { e: '⚽', t: 'ボールあそび' }, { e: '🎨', t: 'おえかき' },
    { e: '🎵', t: 'うた・音楽' }, { e: '🧱', t: 'ブロック' }, { e: '📖', t: '絵本' },
    { e: '🏊', t: 'プール' }, { e: '🧩', t: 'パズル' }, { e: '📺', t: 'テレビ・動画' },
    { e: '🚃', t: 'でんしゃ・のりもの' }, { e: '🐶', t: 'どうぶつ' }, { e: '🍛', t: 'カレー' },
    { e: '🍗', t: 'からあげ' }, { e: '🍓', t: 'くだもの' }, { e: '🍮', t: 'おやつ' },
    { e: '🤸', t: 'からだを うごかすこと' }
  ];
  const OPT_DISLIKES = [
    { e: '🥦', t: 'やさい' }, { e: '🔊', t: '大きな 音' }, { e: '💉', t: 'ちゅうしゃ' },
    { e: '🦷', t: 'はみがき' }, { e: '🛁', t: 'おふろ・かみを あらう' }, { e: '🌙', t: '早く ねること' },
    { e: '⏳', t: 'じゅんばんを まつこと' }, { e: '🌧', t: 'あめの日' }, { e: '👥', t: '人が 多いところ' },
    { e: '🏊', t: 'プール' }, { e: '✏️', t: '字を 書くこと' }, { e: '🔢', t: 'かず・けいさん' }
  ];
  const OPT_PERSON = [
    { e: '😆', t: 'げんき いっぱい' }, { e: '🙈', t: 'はずかしがりや' }, { e: '😊', t: 'よく わらう' },
    { e: '🧸', t: 'あまえんぼう' }, { e: '🐢', t: 'のんびりや' }, { e: '😢', t: 'よく ないていた' },
    { e: '🔥', t: 'がんばりや' }, { e: '🤝', t: 'やさしい' }, { e: '🤫', t: 'しずか' }
  ];
  const OPT_GROWTH = [
    { g: '🧺 身のまわりのこと', items: [
      { e: '👕', t: 'ひとりで 着がえ' }, { e: '🪥', t: 'はみがき' }, { e: '🍚', t: 'ひとりで 食べる' },
      { e: '🚻', t: 'トイレ' }, { e: '🎒', t: 'じゅんび・かたづけ' }, { e: '🧼', t: '手あらい' }
    ]},
    { g: '🏃 からだ・うんどう', items: [
      { e: '🚶', t: '長く 歩ける' }, { e: '♿', t: '車いすで 移動できる' }, { e: '🪑', t: 'しせいを たもてる' },
      { e: '⚽', t: 'ボールを なげる・ける' }, { e: '🧗', t: 'かいだんを のぼる' }, { e: '🏋', t: '体力が ついた' }
    ]},
    { g: '📚 べんきょう', items: [
      { e: '✏️', t: '名前を 書ける' }, { e: '📖', t: '字を 読める' }, { e: '🔢', t: 'かずを かぞえる' },
      { e: '📱', t: 'iPadを つかえる' }, { e: '🔘', t: 'スイッチで えらべる' }, { e: '🕒', t: '時計を 読める' }
    ]},
    { g: '💬 ことば・人との かかわり', items: [
      { e: '👋', t: 'あいさつ' }, { e: '🗣', t: '気持ちを つたえる' }, { e: '🙋', t: '「おねがいします」が 言える' },
      { e: '🧑‍🤝‍🧑', t: '友だちと あそぶ' }, { e: '⏳', t: 'じゅんばんを まてる' }, { e: '🙏', t: '「ありがとう」が 言える' }
    ]},
    { g: '🏠 生活・おしごと', items: [
      { e: '📋', t: '係の しごと' }, { e: '🍽', t: '家の 手伝い' }, { e: '🧹', t: 'そうじ' },
      { e: '🥄', t: 'きらいな物も 少し 食べる' }, { e: '⏰', t: '時間を まもる' }, { e: '😌', t: 'がまんが できる' }
    ]}
  ];
  const OPT_WHO = [
    { e: '👩', t: 'お母さん' }, { e: '👨', t: 'お父さん' }, { e: '👵', t: 'おばあちゃん' },
    { e: '👴', t: 'おじいちゃん' }, { e: '👧', t: 'お姉さん' }, { e: '👦', t: 'お兄さん' },
    { e: '🧒', t: '弟・妹' }, { e: '🐾', t: 'ペット' }
  ];
  const OPT_WHAT = [
    { e: '🍳', t: 'ごはんを つくってくれた' }, { e: '👚', t: 'せんたくを してくれた' },
    { e: '🧹', t: 'そうじを してくれた' }, { e: '🚗', t: '送り迎えを してくれた' },
    { e: '👕', t: '着がえを 手伝ってくれた' }, { e: '🛁', t: 'おふろに 入れてくれた' },
    { e: '🏥', t: '病院に つれていってくれた' }, { e: '👂', t: '話を 聞いてくれた' },
    { e: '🎲', t: 'いっしょに あそんでくれた' }, { e: '📝', t: '練習を 手伝ってくれた' },
    { e: '🍙', t: 'おべんとうを つくってくれた' }, { e: '🤗', t: 'はげましてくれた' }
  ];
  const OPT_THANKS = [
    { e: '💐', t: 'いつも ありがとう。' },
    { e: '🍙', t: 'おいしい ごはんを ありがとう。' },
    { e: '🌱', t: 'できるように なったのは みんなの おかげです。' },
    { e: '💪', t: 'これからも がんばるので、見ていてね。' },
    { e: '🏠', t: 'わたしも 家の 手伝いを がんばります。' },
    { e: '❤️', t: 'だいすきです。' }
  ];

  /* ---------- データ ---------- */
  function newStudent(name) {
    return {
      id: 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: name,
      mode: 'both',
      photos: [],
      answers: emptyAnswers()
    };
  }
  function emptyAnswers() {
    return {
      changes: [], changesText: '',
      likes: [], likesText: '', dislikes: [], dislikesText: '', person: [], personText: '',
      growthSelf: [], growthTeacher: [], growthSelfText: '', growthTeacherText: '',
      who: [], whoText: '', what: [], whatText: '', thanks: [], thanksText: ''
    };
  }
  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && Array.isArray(d.students)) {
          d.students.forEach(s => { s.answers = Object.assign(emptyAnswers(), s.answers || {}); });
          return d;
        }
      }
    } catch (e) { /* ignore */ }
    return { students: [] };
  }
  let data = load();
  let cur = null;
  let step = 1;
  let growthView = 'self';
  let editId = null;

  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      toast('保存できませんでした（容量がいっぱいの可能性があります）');
      return false;
    }
  }
  let saveTimer = null;
  function saveLater() { clearTimeout(saveTimer); saveTimer = setTimeout(save, 400); }

  /* ---------- util ---------- */
  const $ = id => document.getElementById(id);
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 2200);
  }
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      u.rate = 0.9;
      const v = speechSynthesis.getVoices().find(v => v.lang && v.lang.indexOf('ja') === 0);
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }
  function oldPhoto(s) { return s && s.photos.length ? s.photos[0] : null; }
  function newPhoto(s) { return s && s.photos.length > 1 ? s.photos[s.photos.length - 1] : null; }
  function imgHTML(p, emptyText) {
    return p ? `<img src="${p.src}" alt="${esc(p.label)}">` : `<span>${esc(emptyText || '写真なし')}</span>`;
  }

  /* ---------- 画面切り替え ---------- */
  function showSelect() {
    stopMorph();
    cur = null;
    $('screenSelect').classList.remove('hidden');
    $('screenMain').classList.add('hidden');
    $('btnChangeStudent').classList.add('hidden');
    $('currentName').textContent = '';
    renderStudentGrid();
  }
  function openStudent(id) {
    cur = data.students.find(s => s.id === id);
    if (!cur) return showSelect();
    $('screenSelect').classList.add('hidden');
    $('screenMain').classList.remove('hidden');
    $('btnChangeStudent').classList.remove('hidden');
    $('currentName').textContent = cur.name + ' さん';
    applyMode();
    renderAll();
    goStep(1);
    window.scrollTo(0, 0);
  }
  function applyMode() {
    document.body.classList.remove('mode-select', 'mode-write', 'mode-both');
    document.body.classList.add('mode-' + (cur ? cur.mode : 'both'));
  }

  function renderStudentGrid() {
    const g = $('studentGrid');
    g.innerHTML = '';
    $('noStudentMsg').classList.toggle('hidden', data.students.length > 0);
    data.students.forEach(s => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'student-card';
      const p = newPhoto(s) || oldPhoto(s);
      b.innerHTML = `<div class="face">${p ? `<img src="${p.src}" alt="">` : '🙂'}</div><div>${esc(s.name)}</div>`;
      b.addEventListener('click', () => openStudent(s.id));
      g.appendChild(b);
    });
  }

  /* ---------- ステップ ---------- */
  function goStep(n) {
    step = Math.max(1, Math.min(5, n));
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', +t.dataset.step === step));
    document.querySelectorAll('.step').forEach(s => s.classList.toggle('hidden', +s.dataset.step !== step));
    $('sheetWrap').classList.toggle('hidden', step !== 5);
    $('btnPrev').style.visibility = step === 1 ? 'hidden' : 'visible';
    $('btnNext').style.visibility = step === 5 ? 'hidden' : 'visible';
    if (step !== 1) stopMorph();
    if (step === 4) renderThanksPreview();
    if (step === 5) renderSheet();
    updateDoneMarks();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function updateDoneMarks() {
    if (!cur) return;
    const a = cur.answers;
    const done = {
      1: a.changes.length || a.changesText.trim(),
      2: a.likes.length || a.dislikes.length || a.person.length || a.likesText.trim() || a.dislikesText.trim() || a.personText.trim(),
      3: a.growthSelf.length || a.growthTeacher.length || a.growthSelfText.trim() || a.growthTeacherText.trim(),
      4: a.who.length || a.what.length || a.thanks.length || a.thanksText.trim(),
      5: false
    };
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('done', !!done[t.dataset.step] && +t.dataset.step !== step));
  }

  /* ---------- チップ ---------- */
  function renderChips(containerId, options, key, opts) {
    opts = opts || {};
    const box = $(containerId);
    box.innerHTML = '';
    options.forEach(o => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (opts.teacher ? ' teacher' : '');
      const on = cur.answers[key].indexOf(o.t) >= 0;
      if (on) b.classList.add('on');
      let extra = '';
      if (opts.otherKey && cur.answers[opts.otherKey].indexOf(o.t) >= 0) {
        extra = `<span class="mark-other">${opts.otherMark}</span>`;
      }
      b.innerHTML = `<span class="em">${o.e}</span><span>${esc(o.t)}</span>${extra}`;
      b.addEventListener('click', () => {
        const arr = cur.answers[key];
        const i = arr.indexOf(o.t);
        if (i >= 0) arr.splice(i, 1);
        else {
          if (opts.single) arr.length = 0;
          arr.push(o.t);
          speak(o.t);
        }
        save();
        if (opts.single) renderChips(containerId, options, key, opts);
        else b.classList.toggle('on', arr.indexOf(o.t) >= 0);
        if (opts.onChange) opts.onChange();
        updateDoneMarks();
      });
      box.appendChild(b);
    });
  }
  function bindText(id, key, onChange) {
    const el = $(id);
    el.value = cur.answers[key] || '';
    el.oninput = () => {
      cur.answers[key] = el.value;
      saveLater();
      if (onChange) onChange();
    };
  }

  function renderAll() {
    renderMorph();
    renderPairs();
    renderChips('chipsChanges', OPT_CHANGES, 'changes');
    bindText('txtChanges', 'changesText');

    $('refOld').innerHTML = imgHTML(oldPhoto(cur), '小学部の写真');
    renderChips('chipsLikes', OPT_LIKES, 'likes');
    renderChips('chipsDislikes', OPT_DISLIKES, 'dislikes');
    renderChips('chipsPerson', OPT_PERSON, 'person');
    bindText('txtLikes', 'likesText');
    bindText('txtDislikes', 'dislikesText');
    bindText('txtPerson', 'personText');

    renderGrowth();

    renderChips('chipsWho', OPT_WHO, 'who');
    renderChips('chipsWhat', OPT_WHAT, 'what');
    renderChips('chipsThanks', OPT_THANKS, 'thanks', { onChange: renderThanksPreview });
    bindText('txtWho', 'whoText');
    bindText('txtWhat', 'whatText');
    bindText('txtThanks', 'thanksText', renderThanksPreview);
    renderThanksPreview();
  }

  /* ---------- STEP1: 写真のうつりかわり ---------- */
  let morphImgs = [];
  let morphRAF = null;
  let morphDuration = 4000;

  function renderMorph() {
    const frame = $('morphFrame');
    frame.querySelectorAll('img').forEach(i => i.remove());
    morphImgs = [];
    const photos = cur.photos;
    $('morphEmpty').classList.toggle('hidden', photos.length > 0);
    photos.forEach(p => {
      const img = document.createElement('img');
      img.src = p.src;
      img.alt = p.label;
      frame.appendChild(img);
      morphImgs.push(img);
    });
    const slider = $('morphSlider');
    slider.max = Math.max(1, (photos.length - 1) * 100);
    slider.value = 0;
    slider.disabled = photos.length < 2;

    const th = $('thumbs');
    th.innerHTML = '';
    photos.forEach((p, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'thumb';
      b.innerHTML = `<img src="${p.src}" alt=""><span>${esc(p.label)}</span>`;
      b.addEventListener('click', () => { stopMorph(); setMorph(i * 100); speak(p.label); });
      th.appendChild(b);
    });
    setMorph(0);
  }
  function setMorph(v) {
    const slider = $('morphSlider');
    v = Math.max(0, Math.min(+slider.max, v));
    slider.value = v;
    const n = morphImgs.length;
    if (!n) { $('morphLabel').textContent = ''; return; }
    const pos = v / 100;
    const i = Math.min(n - 1, Math.floor(pos));
    const f = pos - i;
    morphImgs.forEach((img, k) => {
      if (k === i) img.style.opacity = 1;
      else if (k === i + 1) img.style.opacity = f;
      else img.style.opacity = 0;
      img.style.zIndex = k === i + 1 ? 2 : (k === i ? 1 : 0);
    });
    const near = Math.min(n - 1, Math.round(pos));
    $('morphLabel').textContent = cur.photos[near].label;
    document.querySelectorAll('#thumbs .thumb').forEach((t, k) => t.classList.toggle('active', k === near));
  }
  function playMorph() {
    if (morphImgs.length < 2) { toast('写真が 2まい 以上 ひつようです'); return; }
    stopMorph();
    const slider = $('morphSlider');
    const max = +slider.max;
    let startV = +slider.value;
    if (startV >= max) startV = 0;
    const total = morphDuration * (morphImgs.length - 1) / 1; // 1区間あたり morphDuration
    const remain = total * (1 - startV / max);
    const t0 = performance.now();
    $('btnMorphPlay').textContent = '⏸ とめる';
    const tick = now => {
      const r = Math.min(1, (now - t0) / remain);
      setMorph(startV + (max - startV) * r);
      if (r < 1) morphRAF = requestAnimationFrame(tick);
      else { morphRAF = null; $('btnMorphPlay').textContent = '▶ じどうで うごかす'; speak('いまの ' + cur.name + 'さん'); }
    };
    morphRAF = requestAnimationFrame(tick);
  }
  function stopMorph() {
    if (morphRAF) cancelAnimationFrame(morphRAF);
    morphRAF = null;
    const b = $('btnMorphPlay');
    if (b) b.textContent = '▶ じどうで うごかす';
  }
  function renderPairs() {
    $('pairOld').innerHTML = imgHTML(oldPhoto(cur), '小学部の写真');
    $('pairNew').innerHTML = imgHTML(newPhoto(cur), '中学部の写真');
  }

  /* ---------- STEP3: 成長 ---------- */
  function renderGrowth() {
    const isT = growthView === 'teacher';
    const key = isT ? 'growthTeacher' : 'growthSelf';
    const other = isT ? 'growthSelf' : 'growthTeacher';
    document.querySelectorAll('.view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === growthView));
    $('viewHint').textContent = isT
      ? '先生が 見て「できるように なった」と 思うことを えらびます。（⭐は 本人が えらんだもの）'
      : 'じぶんで「できるように なった」と 思うことを えらぼう。（🏫は 先生が えらんだもの）';
    const wrap = $('growthGroups');
    wrap.innerHTML = '';
    OPT_GROWTH.forEach((grp, gi) => {
      const sec = document.createElement('div');
      sec.className = 'g-group';
      sec.innerHTML = `<h4>${esc(grp.g)}</h4><div class="chips" id="gchips${gi}"></div>`;
      wrap.appendChild(sec);
      renderChips('gchips' + gi, grp.items, key, {
        teacher: isT, otherKey: other, otherMark: isT ? '⭐' : '🏫'
      });
    });
    $('growthTextTitle').textContent = isT ? '先生から 見た 成長（自由記述）' : 'じぶんで 書こう';
    const ta = $('txtGrowth');
    ta.placeholder = isT ? '先生から見て できるようになったこと' : 'できるように なったことを 書こう';
    bindText('txtGrowth', isT ? 'growthTeacherText' : 'growthSelfText');
  }

  /* ---------- STEP4: ありがとう ---------- */
  function renderThanksPreview() {
    if (!cur) return;
    const a = cur.answers;
    const parts = [];
    const who = a.who.slice();
    if (a.whoText.trim()) who.push(a.whoText.trim());
    if (who.length) parts.push(who.join('・') + 'へ');
    if (a.what.length) parts.push(a.what.map(w => w.replace(/てくれた$/, 'てくれて')).join('、') + '、');
    a.thanks.forEach(t => parts.push(t));
    if (a.thanksText.trim()) parts.push(a.thanksText.trim());
    if (parts.length) parts.push('\n' + cur.name + 'より');
    $('thanksPreview').textContent = parts.length ? parts.join('\n') : '';
  }
  function thanksBody() {
    const a = cur.answers;
    const lines = [];
    if (a.what.length) lines.push(a.what.map(w => w.replace(/てくれた$/, 'てくれて')).join('、') + '、');
    a.thanks.forEach(t => lines.push(t));
    if (a.thanksText.trim()) lines.push(a.thanksText.trim());
    return lines.join('\n');
  }

  /* ---------- STEP5: まとめシート ---------- */
  function listHTML(arr, text) {
    const items = arr.map(t => `<li>${esc(t)}</li>`);
    if (text && text.trim()) items.push(`<li>${esc(text.trim())}</li>`);
    return items.length ? `<ul class="s-list">${items.join('')}</ul>` : '<span class="muted">―</span>';
  }
  function inlineHTML(arr, text) {
    const all = arr.slice();
    if (text && text.trim()) all.push(text.trim());
    return all.length ? esc(all.join('、')) : '<span class="muted">―</span>';
  }
  function lines(n) { return '<div class="lines"></div>'.repeat(n); }

  function renderSheet() {
    const a = cur.answers;
    const blank = $('optBlank').checked;
    const showFamily = $('optFamily').checked;
    const showTeacher = $('optTeacher').checked;
    const op = oldPhoto(cur), np = newPhoto(cur);

    const left = blank ? `
        <div class="s-cap">小学部時代の ようす</div>
        <div class="s-sub">すきだったこと</div>${lines(2)}
        <div class="s-sub">にがてだったこと</div>${lines(2)}
        <div class="s-sub">どんな子だった？</div>${lines(2)}
      ` : `
        <div class="s-cap">小学部時代の ようす</div>
        <p class="s-item"><b>💗 すきだった</b>${inlineHTML(a.likes, a.likesText)}</p>
        <p class="s-item"><b>💧 にがてだった</b>${inlineHTML(a.dislikes, a.dislikesText)}</p>
        <p class="s-item"><b>🙂 どんな子</b>${inlineHTML(a.person, a.personText)}</p>
      `;

    const right = blank ? `
        <div class="s-cap">中学部で できるように なったこと</div>
        <div class="s-sub">かわったところ</div>${lines(1)}
        <div class="s-sub">⭐ じぶんから 見て</div>${lines(3)}
        ${showTeacher ? `<div class="s-sub t">🏫 先生から 見て</div>${lines(2)}` : ''}
      ` : `
        <div class="s-cap">小学部では できなかったけど、中学部で できるように なったこと</div>
        <p class="s-item"><b>📏 かわった</b>${inlineHTML(a.changes, a.changesText)}</p>
        <div class="s-sub">⭐ じぶんから 見て</div>${listHTML(a.growthSelf, a.growthSelfText)}
        ${showTeacher ? `<div class="s-sub t">🏫 先生から 見て</div>${listHTML(a.growthTeacher, a.growthTeacherText)}` : ''}
      `;

    let family = '';
    if (showFamily) {
      const who = a.who.slice();
      if (a.whoText.trim()) who.push(a.whoText.trim());
      family = blank ? `
        <section class="s-family">
          <div class="s-cap">成長を ささえてくれた 家族へ ありがとう</div>
          <p class="s-item"><b>だれが</b>＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿</p>
          <div class="s-thanks">${lines(2)}</div>
        </section>` : `
        <section class="s-family">
          <div class="s-cap">成長を ささえてくれた 家族へ ありがとう</div>
          <p class="s-item"><b>👪 だれへ</b>${who.length ? esc(who.join('・')) : '<span class="muted">―</span>'}</p>
          <div class="s-thanks">${esc(thanksBody()) || '<span class="muted">―</span>'}</div>
        </section>`;
    }

    $('sheet').innerHTML = `
      <h1>あの頃君は若かった～</h1>
      <p class="s-name">名前：<b>${esc(cur.name)}</b></p>
      <div class="s-grid">
        <div class="s-col">
          <div class="s-head">
            <div class="s-photo">${imgHTML(op, '小学部の写真')}</div>
            <div>${op ? '<b>' + esc(op.label) + '</b>' : ''}</div>
          </div>
          ${left}
        </div>
        <div class="s-col">
          <div class="s-head">
            <div class="s-photo">${imgHTML(np, '中学部の写真')}</div>
            <div>${np ? '<b>' + esc(np.label) + '</b>' : ''}</div>
          </div>
          ${right}
        </div>
      </div>
      ${family}
    `;
    calcPrintZoom();
    fitSheet();
  }
  // 印刷時に A4よこ 1枚に おさまるよう 縮小率を 計算
  function calcPrintZoom() {
    const sheet = $('sheet');
    const mm = 96 / 25.4;
    const contentH = sheet.offsetHeight - 16 * mm; // 画面用の上下余白を除く
    const maxH = 190 * mm;
    const z = contentH > maxH ? Math.max(0.5, maxH / contentH) : 1;
    sheet.style.setProperty('--print-zoom', z.toFixed(3));
  }
  function fitSheet() {
    const sheet = $('sheet');
    const wrap = $('sheetWrap');
    sheet.style.transform = '';
    wrap.style.height = '';
    const avail = wrap.clientWidth;
    const w = sheet.offsetWidth;
    if (w > avail && avail > 0) {
      const s = avail / w;
      sheet.style.transformOrigin = 'top left';
      sheet.style.transform = `scale(${s})`;
      wrap.style.height = (sheet.offsetHeight * s + 10) + 'px';
    }
  }

  /* ---------- 先生メニュー ---------- */
  function openTeacher() {
    if (!sessionStorage.getItem('anokoro-teacher-ok')) {
      const a = Math.floor(Math.random() * 8) + 2, b = Math.floor(Math.random() * 8) + 2;
      const ans = prompt(`先生用メニューです。\n${a} × ${b} = ?`);
      if (ans === null) return;
      if (parseInt(ans, 10) !== a * b) { toast('こたえが ちがいます'); return; }
      sessionStorage.setItem('anokoro-teacher-ok', '1');
    }
    stopMorph();
    editId = cur ? cur.id : (data.students[0] ? data.students[0].id : null);
    renderTeacher();
    $('teacherModal').classList.remove('hidden');
  }
  function closeTeacher() {
    $('teacherModal').classList.add('hidden');
    save();
    if (cur) {
      if (!data.students.find(s => s.id === cur.id)) return showSelect();
      $('currentName').textContent = cur.name + ' さん';
      applyMode();
      renderAll();
      goStep(step);
    } else {
      renderStudentGrid();
    }
  }
  function renderTeacher() {
    const ul = $('tStudentList');
    ul.innerHTML = '';
    data.students.forEach((s, idx) => {
      const li = document.createElement('li');
      if (s.id === editId) li.className = 'sel';
      li.innerHTML = `<span class="nm">${esc(s.name)}</span>
        <span class="note small">写真${s.photos.length}まい</span>
        <button class="icon-btn" data-act="up" type="button" title="上へ">▲</button>
        <button class="icon-btn" data-act="down" type="button" title="下へ">▼</button>
        <button class="btn-mini" data-act="edit" type="button">せってい</button>
        <button class="icon-btn" data-act="del" type="button" title="削除">🗑</button>`;
      li.querySelector('[data-act=edit]').onclick = () => { editId = s.id; renderTeacher(); };
      li.querySelector('[data-act=up]').onclick = () => { if (idx > 0) { data.students.splice(idx - 1, 0, data.students.splice(idx, 1)[0]); save(); renderTeacher(); } };
      li.querySelector('[data-act=down]').onclick = () => { if (idx < data.students.length - 1) { data.students.splice(idx + 1, 0, data.students.splice(idx, 1)[0]); save(); renderTeacher(); } };
      li.querySelector('[data-act=del]').onclick = () => {
        if (!confirm(`「${s.name}」さんの データ（写真・回答）を 削除します。よろしいですか？`)) return;
        data.students.splice(idx, 1);
        if (editId === s.id) editId = null;
        save(); renderTeacher();
      };
      ul.appendChild(li);
    });

    const s = data.students.find(x => x.id === editId);
    $('tEditArea').classList.toggle('hidden', !s);
    if (!s) return;
    $('tEditTitle').textContent = `「${s.name}」さんの 設定`;
    const nm = $('tName');
    nm.value = s.name;
    nm.onchange = () => { const v = nm.value.trim(); if (v) { s.name = v; save(); renderTeacher(); } };
    document.querySelectorAll('#tMode button').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === s.mode);
      b.onclick = () => { s.mode = b.dataset.mode; save(); renderTeacher(); };
    });

    const pl = $('tPhotoList');
    pl.innerHTML = '';
    s.photos.forEach((p, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<img src="${p.src}" alt="">
        <input type="text" value="${esc(p.label)}" aria-label="写真のなまえ">
        <button class="icon-btn" data-act="up" type="button">▲</button>
        <button class="icon-btn" data-act="down" type="button">▼</button>
        <button class="icon-btn" data-act="del" type="button">🗑</button>`;
      li.querySelector('input').onchange = e => { p.label = e.target.value.trim() || p.label; save(); };
      li.querySelector('[data-act=up]').onclick = () => { if (i > 0) { s.photos.splice(i - 1, 0, s.photos.splice(i, 1)[0]); save(); renderTeacher(); } };
      li.querySelector('[data-act=down]').onclick = () => { if (i < s.photos.length - 1) { s.photos.splice(i + 1, 0, s.photos.splice(i, 1)[0]); save(); renderTeacher(); } };
      li.querySelector('[data-act=del]').onclick = () => { if (confirm('この写真を 削除しますか？')) { s.photos.splice(i, 1); save(); renderTeacher(); } };
      pl.appendChild(li);
    });
  }

  function resizeImage(file, maxSize) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          let w = img.naturalWidth, h = img.naturalHeight;
          const scale = Math.min(1, maxSize / Math.max(w, h));
          w = Math.round(w * scale); h = Math.round(h * scale);
          const c = document.createElement('canvas');
          c.width = w; c.height = h;
          c.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(c.toDataURL('image/jpeg', 0.82));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function addPhotos(files) {
    const s = data.students.find(x => x.id === editId);
    if (!s || !files.length) return;
    const sel = $('tPhotoLabel');
    for (const f of files) {
      try {
        const src = await resizeImage(f, 720);
        s.photos.push({ label: sel.value, src: src });
        if (sel.selectedIndex < sel.options.length - 1) sel.selectedIndex++;
        if (!save()) { s.photos.pop(); break; }
      } catch (e) { toast('写真を 読みこめませんでした'); }
    }
    renderTeacher();
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const a = document.createElement('a');
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    a.href = URL.createObjectURL(blob);
    a.download = `anokoro_${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  function importData(file) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(r.result);
        if (!d || !Array.isArray(d.students)) throw new Error('format');
        const replace = confirm('読みこんだ データで 置きかえますか？\n［OK］置きかえ ／［キャンセル］今のデータに 追加');
        d.students.forEach(s => { s.answers = Object.assign(emptyAnswers(), s.answers || {}); s.photos = s.photos || []; s.mode = s.mode || 'both'; });
        if (replace) data = d;
        else d.students.forEach(s => { if (!data.students.find(x => x.id === s.id)) data.students.push(s); });
        save();
        editId = data.students[0] ? data.students[0].id : null;
        cur = null;
        renderTeacher();
        toast('読みこみました');
      } catch (e) { toast('ファイルを 読みこめませんでした'); }
    };
    r.readAsText(file);
  }

  /* ---------- イベント ---------- */
  function bind() {
    $('btnTeacher').onclick = openTeacher;
    $('btnCloseTeacher').onclick = closeTeacher;
    $('teacherModal').addEventListener('click', e => { if (e.target.id === 'teacherModal') closeTeacher(); });
    $('btnChangeStudent').onclick = showSelect;

    $('btnAddStudent').onclick = () => {
      const v = $('newStudentName').value.trim();
      if (!v) { toast('名前を 入力してください'); return; }
      const s = newStudent(v);
      data.students.push(s);
      editId = s.id;
      $('newStudentName').value = '';
      save(); renderTeacher();
    };
    $('newStudentName').addEventListener('keydown', e => { if (e.key === 'Enter') $('btnAddStudent').click(); });
    $('tPhotoInput').addEventListener('change', e => { addPhotos(Array.from(e.target.files)); e.target.value = ''; });
    $('btnResetAnswers').onclick = () => {
      const s = data.students.find(x => x.id === editId);
      if (s && confirm(`「${s.name}」さんの 回答を すべて 消します。（写真は 残ります）`)) {
        s.answers = emptyAnswers(); save(); toast('リセットしました');
      }
    };
    $('btnExport').onclick = exportData;
    $('importInput').addEventListener('change', e => { if (e.target.files[0]) importData(e.target.files[0]); e.target.value = ''; });

    document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => goStep(+t.dataset.step)));
    $('btnPrev').onclick = () => goStep(step - 1);
    $('btnNext').onclick = () => goStep(step + 1);

    document.querySelectorAll('.btn-speak').forEach(b => b.addEventListener('click', () => speak(b.dataset.speak)));

    $('morphSlider').addEventListener('input', e => { stopMorph(); setMorph(+e.target.value); });
    $('btnMorphPlay').onclick = () => { if (morphRAF) stopMorph(); else playMorph(); };
    $('btnMorphStart').onclick = () => { stopMorph(); setMorph(0); };
    $('btnMorphEnd').onclick = () => { stopMorph(); setMorph(+$('morphSlider').max); };
    document.querySelectorAll('.speed').forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll('.speed').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      morphDuration = +b.dataset.speed;
    }));

    document.querySelectorAll('.view-btn').forEach(b => b.addEventListener('click', () => {
      if (b.dataset.view === 'teacher' && growthView !== 'teacher' && !sessionStorage.getItem('anokoro-teacher-ok')) {
        const a = Math.floor(Math.random() * 8) + 2, c = Math.floor(Math.random() * 8) + 2;
        const ans = prompt(`先生が 入力します。\n${a} × ${c} = ?`);
        if (ans === null || parseInt(ans, 10) !== a * c) { if (ans !== null) toast('こたえが ちがいます'); return; }
        sessionStorage.setItem('anokoro-teacher-ok', '1');
      }
      growthView = b.dataset.view;
      renderGrowth();
    }));

    ['optFamily', 'optBlank', 'optTeacher'].forEach(id => $(id).addEventListener('change', renderSheet));
    $('btnPrint').onclick = () => { renderSheet(); setTimeout(() => window.print(), 100); };
    window.addEventListener('beforeprint', () => { if (cur) { $('sheet').style.transform = ''; $('sheetWrap').style.height = ''; } });
    window.addEventListener('afterprint', () => { if (cur && step === 5) fitSheet(); });
    window.addEventListener('resize', () => { if (cur && step === 5) fitSheet(); });

    if ('speechSynthesis' in window) speechSynthesis.getVoices();
  }

  bind();
  showSelect();
})();
