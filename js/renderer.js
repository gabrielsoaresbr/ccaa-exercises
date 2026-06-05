// renderDay(weekJson, dayNumber) → HTML string for the full page body content
// weekJson: object matching data/semanaXX.json schema
// dayNumber: integer 1–5

function renderDay(weekJson, dayNumber) {
  const day = weekJson.days.find(d => d.day === dayNumber);
  if (!day) return '<p style="padding:24px">Dia não encontrado.</p>';
  if (!day.generated) return '<p style="padding:24px">Exercício não disponível para este dia ainda.</p>';

  return [
    _hero(weekJson, day),
    _speedBar(),
    '<div class="content">',
      _vocabCard(weekJson),
      _copyWords(day),
      _complete(day),
      _writing(day),
      _speaking(),
      _activity(day),
      _checklist(),
      _footer(),
    '</div>',
  ].join('\n');
}

// ── helpers ────────────────────────────────────────────────────────────────

function _esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Wraps [bracketed text] in a teal span
function _modelText(str) {
  return _esc(str).replace(/\[([^\]]+)\]/g, '<span style="color:var(--teal)">[$1]</span>');
}

function _spk(text) {
  return `<button class="spk" data-say="${_esc(text)}">🔊</button>`;
}

function _miniSpk(text) {
  return `<button class="mini-spk" data-say="${_esc(text)}">🔊</button>`;
}

// ── hero ───────────────────────────────────────────────────────────────────

function _hero(weekJson, day) {
  const emoji = weekJson.themeEmoji || '🎠';
  const weekLabel = 'Semana ' + String(weekJson.week).padStart(2, '0');
  return `
<div class="hero">
  <div class="hero-label">${_esc(weekLabel)}</div>
  <div class="hero-title">${emoji} ${_esc(weekJson.theme)}</div>
  <div class="hero-sub">Exercícios de Inglês</div>
  <div class="day-badge">Dia ${day.day} — ${_esc(day.weekday)}</div>
</div>`.trim();
}

// ── speed bar ──────────────────────────────────────────────────────────────

function _speedBar() {
  return `
<div class="speed-bar">
  🔊 Velocidade do áudio:
  <div class="speed-toggle">
    <button class="speed-btn active" id="speedNormal">Normal</button>
    <button class="speed-btn" id="speedSlow">🐢 Devagar</button>
  </div>
</div>`.trim();
}

// ── vocabulary card ────────────────────────────────────────────────────────

function _vocabCard(weekJson) {
  const vocabItems = weekJson.vocabulary.map(v => `
    <div class="vocab-item">
      <div class="vocab-left">${_spk(v.en)}<span class="vocab-en">${_esc(v.en)}</span></div>
      <span class="vocab-pt">${_esc(v.pt)}</span>
    </div>`).join('');

  const verbItems = weekJson.verbs.map(v => `
    <div class="vocab-item">
      <span class="vocab-en">${_esc(v.en)}</span>
      <span class="vocab-pt">${_esc(v.pt)}</span>
    </div>`).join('');

  return `
<div class="card card-teal">
  <div class="section-tag">📖 Antes de começar</div>
  <div class="vocab-group">
    <div class="vocab-group-title">🗂 Vocabulário da semana</div>
    ${vocabItems}
  </div>
  <div class="vocab-group">
    <div class="vocab-group-title">🔧 Verbos da semana</div>
    ${verbItems}
  </div>
</div>`.trim();
}

// ── section 1: copy the words ──────────────────────────────────────────────

function _copyWords(day) {
  const rows = day.copyWords.map((word, i) => `
  <div class="copy-row">
    <div class="copy-word">${_spk(word)}<span class="copy-num">${i + 1}.</span> ${_esc(word)}</div>
    <input class="copy-blank" type="text" placeholder="escreva...">
    <input class="copy-blank" type="text" placeholder="de novo...">
    <input class="copy-blank" type="text" placeholder="última!">
  </div>`).join('');

  return `
<div class="card">
  <div class="section-title"><span class="section-num">1</span> Copy the words</div>
  <div class="section-subtitle">Copie cada palavra 3 vezes →</div>
  ${rows}
</div>`.trim();
}

// ── section 2: complete as frases ─────────────────────────────────────────

function _complete(day) {
  const rows = day.complete.map((item, i) => `
  <div class="sentence-row">
    <label>${i + 1}.</label>
    <div class="sentence-text">${_esc(item.before)} <input class="fill" type="text">${_esc(item.after)}</div>
    <div class="sentence-hint">💡 ${_esc(item.hint)}</div>
  </div>`).join('');

  return `
<div class="card">
  <div class="section-title"><span class="section-num">2</span> Complete as frases</div>
  <div class="section-subtitle">Complete com as palavras do tema →</div>
  ${rows}
</div>`.trim();
}

// ── section 3: writing ────────────────────────────────────────────────────

function _writing(day) {
  const { model, example } = day.writing;
  return `
<div class="card">
  <div class="section-title"><span class="section-num">3</span> Escreva suas frases</div>
  <div class="model-box card-yellow">
    <div class="model-label">Modelo</div>
    <div class="model-text">${_modelText(model)}</div>
    <div style="margin-top:8px;">
      <div class="example-label">✏️ Exemplo</div>
      <div class="example-text">${_spk(example.en)} ${_esc(example.en)}</div>
      <div class="example-pt">${_esc(example.pt)}</div>
    </div>
  </div>
  <div class="write-num">1.</div><textarea class="write-area" rows="2" placeholder="Escreva sua frase aqui..."></textarea>
  <div class="write-num">2.</div><textarea class="write-area" rows="2" placeholder="Escreva sua frase aqui..."></textarea>
  <div class="write-num">3.</div><textarea class="write-area" rows="2" placeholder="Escreva sua frase aqui..."></textarea>
</div>`.trim();
}

// ── section 4: speaking ───────────────────────────────────────────────────

function _speaking() {
  return `
<div class="card card-teal">
  <div class="section-title"><span class="section-num">4</span> Speaking</div>
  <div class="speaking-box">
    <div class="mic-icon">🎤</div>
    <div>
      <div class="speaking-text">Leia em voz alta as 3 frases que você criou e <strong>grave no WhatsApp</strong>.</div>
      <div class="speaking-cta">Envie o áudio para o papai depois! 💪</div>
    </div>
  </div>
</div>`.trim();
}

// ── section 5: activity (multiple choice) ─────────────────────────────────

function _activity(day) {
  if (!day.activity || day.activity.type !== 'multiple_choice') return '';

  const items = day.activity.items.map((item, i) => {
    const opts = item.options.map(opt => `
      <div class="mc-opt">${_miniSpk(opt)} ${_esc(opt)}</div>`).join('');
    return `
  <div class="mc-item" data-correct="${_esc(item.answer)}">
    <div class="mc-prompt"><span class="mc-num">${i + 1}.</span> <span class="mc-pt">${_esc(item.prompt)}</span></div>
    <div class="mc-options">${opts}
    </div>
  </div>`;
  }).join('');

  return `
<div class="card">
  <div class="section-title"><span class="section-num">5</span> Circle the correct word</div>
  <div class="section-subtitle">Toque na palavra certa em inglês →</div>
  ${items}
</div>`.trim();
}

// ── checklist ─────────────────────────────────────────────────────────────

function _checklist() {
  return `
<div class="card card-teal">
  <div class="section-title" style="margin-bottom:14px;">✅ Checklist de Autonomia</div>
  <div class="check-item"><input type="checkbox" id="c1"><label for="c1">Fiz os exercícios sozinho?</label></div>
  <div class="check-item"><input type="checkbox" id="c2"><label for="c2">Copiei as palavras com capricho?</label></div>
  <div class="check-item"><input type="checkbox" id="c3"><label for="c3">Gravei o áudio?</label></div>
  <div class="check-item"><input type="checkbox" id="c4"><label for="c4">Marquei as respostas com atenção?</label></div>
</div>`.trim();
}

// ── footer ────────────────────────────────────────────────────────────────

function _footer() {
  return '<div class="footer">⭐ Great job! Você está ficando cada dia melhor! ⭐</div>';
}
