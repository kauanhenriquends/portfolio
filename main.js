(function () {
  var P = window.PORTFOLIO;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function icone(nome) { var i = el('i'); i.setAttribute('data-lucide', nome); return i; }
  function desenharIcones() { if (window.lucide) window.lucide.createIcons(); }

  // ---------- Aviso ----------
  var toast = $('.toast'), toastT;
  function avisar(t) {
    toast.textContent = t;
    toast.classList.add('is-shown');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toast.classList.remove('is-shown'); }, 3600);
  }

  // ---------- Textos do config.js ----------
  var binds = {
    marca: P.marca, nome: P.nome, selo: P.selo,
    titulo1: P.titulo[0], titulo2: P.titulo[1],
    resumo: P.resumo, bio: P.bio, contatoTexto: P.contatoTexto,
    objetivo: P.cartoes.objetivo, experiencia: P.cartoes.experiencia,
    competencias: P.cartoes.competencias, disponibilidade: P.cartoes.disponibilidade
  };
  $$('[data-bind]').forEach(function (e) { e.textContent = binds[e.dataset.bind] || ''; });
  $$('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
  document.title = 'Portfólio · ' + P.nome;

  // Chips do início
  var chips = $('.chips');
  P.chips.forEach(function (c) { chips.appendChild(el('span', null, c)); });

  // Redes no início (GitHub, LinkedIn, Instagram)
  var socials = $('.socials');
  [['github', P.github, 'GitHub'], ['linkedin', P.linkedin, 'LinkedIn'], ['instagram', P.instagram, 'Instagram']].forEach(function (r) {
    socials.appendChild(linkRede(el('a'), r[1], r[2], 'github' === r[0] ? 'github' : r[0]));
  });
  function linkRede(a, rede, nome, ic) {
    a.setAttribute('aria-label', nome);
    if (ic) a.appendChild(icone(ic));
    if (rede && rede.url) { a.href = rede.url; a.target = '_blank'; a.rel = 'noopener'; }
    else {
      a.href = '#';
      a.addEventListener('click', function (e) { e.preventDefault(); avisar(nome + ' ainda não foi configurado.'); });
    }
    return a;
  }

  // CV
  var cv = $('#cv');
  if (P.curriculo) { cv.href = P.curriculo; cv.target = '_blank'; cv.rel = 'noopener'; }
  else cv.addEventListener('click', function (e) { e.preventDefault(); avisar('O CV ainda não está disponível.'); });

  // Números
  var numeros = { projetos: P.projetos.length, certificados: P.certificados.length, anos: P.anosExperiencia || 0 };
  $$('[data-stat]').forEach(function (s) { s.dataset.to = numeros[s.dataset.stat]; });

  // ---------- Projetos ----------
  var modal = $('.modal'), modalBody = $('.modal-body');
  function abrirModal(conteudo, classe) {
    modalBody.innerHTML = '';
    modalBody.className = 'modal-body' + (classe ? ' ' + classe : '');
    modalBody.appendChild(conteudo);
    desenharIcones();
    if (modal.showModal) modal.showModal();
  }
  $('.modal-close').addEventListener('click', function () { modal.close(); });
  modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });

  var projects = $('.projects');
  P.projetos.forEach(function (p, i) {
    var c = el('article', 'project card');
    c.setAttribute('data-anim', 'fade-up');
    c.style.setProperty('--d', (i % 3) * 0.1 + 's');
    var foot = el('div', 'project-foot');
    if (p.demo) {
      var demo = el('a', 'demo', 'Ver demo ');
      demo.href = p.demo; demo.target = '_blank'; demo.rel = 'noopener';
      demo.appendChild(icone('external-link'));
      foot.appendChild(demo);
    } else {
      var priv = el('span', 'demo demo-off', p.privado ? 'Código privado ' : 'Em breve ');
      priv.appendChild(icone(p.privado ? 'lock' : 'clock'));
      foot.appendChild(priv);
    }
    var det = el('button', 'details', 'Detalhes ');
    det.type = 'button';
    det.appendChild(icone('arrow-right'));
    det.addEventListener('click', function () { abrirModal(detalhes(p)); });
    foot.appendChild(det);
    c.appendChild(capa(p, 'project-img'));
    var tipo = el('span', 'project-type', p.tipo || '');
    if (p.status) tipo.appendChild(el('b', null, p.status));
    c.appendChild(tipo);
    c.appendChild(el('h3', null, p.titulo));
    c.appendChild(el('p', null, p.descricao));
    c.appendChild(foot);
    projects.appendChild(c);
  });
  // Foto do projeto ou, se não houver, uma capa com o nome e a stack
  function capa(p, classe) {
    var box = el('div', classe);
    if (p.imagem) {
      var img = el('img');
      img.src = p.imagem;
      img.alt = 'Tela do projeto ' + p.titulo;
      img.loading = 'lazy';
      box.appendChild(img);
      return box;
    }
    var cores = p.capa || ['#6366f1', '#a855f7'];
    var cv = el('div', 'cover');
    cv.style.setProperty('--c1', cores[0]);
    cv.style.setProperty('--c2', cores[1]);
    cv.appendChild(el('span', 'cover-name', p.titulo));
    var tags = el('span', 'cover-tags');
    (p.tecnologias || []).slice(0, 4).forEach(function (t) { tags.appendChild(el('span', null, t)); });
    cv.appendChild(tags);
    box.appendChild(cv);
    return box;
  }
  function detalhes(p) {
    var f = document.createDocumentFragment();
    f.appendChild(capa(p, 'modal-cover'));
    var box = el('div', 'm-content');
    if (p.tipo) box.appendChild(el('span', 'project-type', p.tipo + (p.status ? ' · ' + p.status : '')));
    box.appendChild(el('h3', 'grad', p.titulo));
    box.appendChild(el('p', null, p.descricao));
    if (p.destaques && p.destaques.length) {
      var ul = el('ul', 'highlights');
      p.destaques.forEach(function (d) {
        var li = el('li');
        li.appendChild(icone('check'));
        li.appendChild(el('span', null, d));
        ul.appendChild(li);
      });
      box.appendChild(ul);
    }
    var ch = el('div', 'chips');
    (p.tecnologias || []).forEach(function (t) { ch.appendChild(el('span', null, t)); });
    box.appendChild(ch);
    var b = el('div', 'hero-btns');
    if (p.demo) {
      var d = el('a', 'btn-grad', 'Ver demo ');
      d.href = p.demo; d.target = '_blank'; d.rel = 'noopener'; d.appendChild(icone('external-link'));
      b.appendChild(d);
    }
    if (p.codigo && !p.privado) {
      var g = el('a', 'btn-outline', 'Código ');
      g.href = p.codigo; g.target = '_blank'; g.rel = 'noopener'; g.appendChild(icone('github'));
      b.appendChild(g);
    }
    if (p.privado) {
      var s = el('span', 'btn-outline btn-static', 'Código privado ');
      s.appendChild(icone('lock'));
      b.appendChild(s);
    }
    box.appendChild(b);
    f.appendChild(box);
    return f;
  }

  // ---------- Certificados ----------
  var certs = $('.certs');
  if (!P.certificados.length) {
    var vazio = el('div', 'empty');
    vazio.appendChild(icone('award'));
    vazio.appendChild(el('span', null, 'Novos certificados em breve.'));
    certs.appendChild(vazio);
  }
  P.certificados.forEach(function (c, i) {
    var b = el('button', 'cert card');
    b.type = 'button';
    b.setAttribute('data-anim', 'fade-up');
    b.style.setProperty('--d', (i % 3) * 0.1 + 's');
    b.setAttribute('aria-label', 'Abrir certificado: ' + c.titulo);
    var img = el('img');
    img.src = c.imagem; img.alt = ''; img.loading = 'lazy';
    b.appendChild(img);
    b.addEventListener('click', function () {
      var full = el('img');
      full.src = c.imagem; full.alt = 'Certificado: ' + c.titulo;
      abrirModal(full, 'modal-cert');
    });
    certs.appendChild(b);
  });

  // ---------- Stack ----------
  var cdn = 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/';
  var logos = {
    python: 'python/python-original.svg', django: 'django/django-plain.svg', postgresql: 'postgresql/postgresql-original.svg',
    redis: 'redis/redis-original.svg', docker: 'docker/docker-original.svg',
    html: 'html5/html5-original.svg', css: 'css3/css3-original.svg', javascript: 'javascript/javascript-original.svg',
    git: 'git/git-original.svg', github: 'github/github-original.svg', vercel: 'vercel/vercel-original.svg',
    react: 'react/react-original.svg', tailwind: 'tailwindcss/tailwindcss-original.svg', nodejs: 'nodejs/nodejs-original.svg',
    bootstrap: 'bootstrap/bootstrap-original.svg', firebase: 'firebase/firebase-original.svg', figma: 'figma/figma-original.svg',
    python: 'python/python-original.svg', vite: 'vitejs/vitejs-original.svg', typescript: 'typescript/typescript-original.svg',
    appsscript: 'google/google-original.svg'
  };
  // logos escuros que precisam clarear no fundo escuro
  var claros = { github: 'invert(1)', vercel: 'invert(1)', django: 'invert(1) hue-rotate(180deg) saturate(1.4)' };
  var stack = $('.stack');
  P.stack.forEach(function (s, i) {
    var t = el('div', 'tech');
    t.setAttribute('data-anim', 'fade-up');
    t.style.setProperty('--d', (i % 6) * 0.06 + 's');
    if (logos[s.icone]) {
      var img = el('img');
      img.src = cdn + logos[s.icone];
      img.alt = '';
      img.loading = 'lazy';
      if (claros[s.icone]) img.style.filter = claros[s.icone];
      t.appendChild(img);
    }
    t.appendChild(el('span', null, s.nome));
    stack.appendChild(t);
  });

  // ---------- Abas ----------
  var tabs = $$('[role="tab"]');
  function abrirAba(tab, foco) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (foco) tab.focus();
    observar();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { abrirAba(t); });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      abrirAba(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length], true);
    });
  });
  $$('[data-tab]').forEach(function (a) {
    a.addEventListener('click', function () { abrirAba(document.getElementById('tab-' + a.dataset.tab)); });
  });

  // ---------- Contato ----------
  var info = $('.info');
  [['phone', P.telefone], ['mail', P.email], ['map-pin', P.local]].forEach(function (x) {
    if (!x[1]) return;
    var li = el('li');
    li.appendChild(icone(x[0]));
    li.appendChild(el('span', null, x[1]));
    info.appendChild(li);
  });

  var reach = $('.reach-list');
  function itemContato(classe, ic, titulo, sub, rede, nome) {
    var a = linkRede(el('a', 'reach-item' + (classe === 'linkedin' ? ' wide' : '')), rede, nome, null);
    var sq = el('span', 'sq sq-' + classe);
    sq.appendChild(icone(ic));
    var tx = el('span');
    tx.appendChild(el('strong', null, titulo));
    tx.appendChild(el('small', null, sub || 'Em breve'));
    a.appendChild(sq);
    a.appendChild(tx);
    reach.appendChild(a);
  }
  itemContato('linkedin', 'linkedin', 'Vamos nos conectar', P.linkedin.usuario, P.linkedin, 'LinkedIn');
  itemContato('instagram', 'instagram', 'Instagram', P.instagram.usuario, P.instagram, 'Instagram');
  itemContato('github', 'github', 'GitHub', P.github.usuario, P.github, 'GitHub');
  itemContato('email', 'mail', 'E-mail', P.email, P.email ? { url: 'mailto:' + P.email } : null, 'O e-mail');
  itemContato('whatsapp', 'phone', 'WhatsApp', P.whatsapp ? '+' + P.whatsapp : '', P.whatsapp ? { url: 'https://wa.me/' + P.whatsapp } : null, 'O WhatsApp');

  $('.share').addEventListener('click', function () {
    var url = location.href.split('#')[0];
    if (navigator.share) navigator.share({ title: document.title, url: url }).catch(function () {});
    else if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { avisar('Link copiado!'); });
  });

  var temPlanilha = /^https:\/\/script\.google\.com\//.test(P.planilhaUrl || '');
  function enviar(dados) {
    // O Apps Script não devolve resposta legível nesse modo, então conta como enviado se a rede não falhar.
    return fetch(P.planilhaUrl, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(dados) });
  }

  // Formulário "Vamos conversar"
  var msgForm = $('.msg-form');
  msgForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = msgForm.elements.nome.value.trim();
    var email = msgForm.elements.email.value.trim();
    var msg = msgForm.elements.mensagem.value.trim();
    if (!nome || !msg) { avisar('Preencha o seu nome e a mensagem.'); return; }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { avisar('Confira o seu email.'); return; }
    if (temPlanilha) {
      var btn = msgForm.querySelector('button');
      btn.disabled = true;
      enviar({ tipo: 'mensagem', nome: nome, email: email, mensagem: msg })
        .then(function () { msgForm.reset(); avisar('Mensagem enviada! Responderei em breve.'); })
        .catch(function () { avisar('Não foi possível enviar agora. Tente de novo.'); })
        .then(function () { btn.disabled = false; });
    } else if (P.whatsapp) {
      window.open('https://wa.me/' + P.whatsapp + '?text=' + encodeURIComponent('Olá! Sou ' + nome + (email ? ' (' + email + ')' : '') + '.\n\n' + msg), '_blank', 'noopener');
    } else if (P.email) {
      location.href = 'mailto:' + P.email + '?subject=' + encodeURIComponent('Contato pelo portfólio: ' + nome) + '&body=' + encodeURIComponent(msg);
    } else {
      avisar('O envio de mensagens ainda não foi configurado.');
    }
  });

  // Comentários
  var lista = $('.comment-list'), count = $('.count');
  var comentarios = [];
  function dataBR(d) {
    var x = new Date(d);
    return isNaN(x) ? '' : x.getDate() + '/' + (x.getMonth() + 1) + '/' + x.getFullYear();
  }
  function mostrarComentarios() {
    lista.innerHTML = '';
    count.textContent = '(' + comentarios.length + ')';
    if (!comentarios.length) { lista.appendChild(el('li', 'comments-empty', 'Seja o primeiro a comentar!')); return; }
    comentarios.forEach(function (c) {
      var li = el('li', 'comment');
      var av = el('span', 'avatar');
      if (c.foto && /^data:image\//.test(c.foto)) { var im = el('img'); im.src = c.foto; im.alt = ''; av.appendChild(im); }
      else av.appendChild(icone('circle-user'));
      li.appendChild(av);
      li.appendChild(el('strong', null, c.nome));
      li.appendChild(el('time', null, dataBR(c.data)));
      li.appendChild(el('p', null, c.mensagem));
      lista.appendChild(li);
    });
    desenharIcones();
  }
  mostrarComentarios();
  if (temPlanilha) {
    fetch(P.planilhaUrl + '?acao=comentarios')
      .then(function (r) { return r.json(); })
      .then(function (j) { comentarios = (j && j.comentarios) || []; mostrarComentarios(); })
      .catch(function () {});
  }

  var cForm = $('.comment-form');
  var fotoInput = cForm.elements.foto;
  var fotoDados = '';
  fotoInput.addEventListener('change', function () {
    var f = fotoInput.files[0];
    fotoDados = '';
    $('.upload-name').textContent = 'Escolher Foto de Perfil';
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { avisar('A foto passa de 5MB.'); fotoInput.value = ''; return; }
    var img = new Image();
    img.onload = function () {
      // Reduz para 96×96 para caber na planilha
      var c = document.createElement('canvas');
      c.width = c.height = 96;
      var lado = Math.min(img.width, img.height);
      c.getContext('2d').drawImage(img, (img.width - lado) / 2, (img.height - lado) / 2, lado, lado, 0, 0, 96, 96);
      fotoDados = c.toDataURL('image/jpeg', 0.8);
      $('.upload-name').textContent = f.name;
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(f);
  });
  cForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = cForm.elements.nome.value.trim();
    var msg = cForm.elements.mensagem.value.trim();
    if (!nome || !msg) { avisar('Preencha o nome e a mensagem.'); return; }
    if (!temPlanilha) { avisar('Os comentários ainda não foram conectados à planilha.'); return; }
    var btn = cForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    enviar({ tipo: 'comentario', nome: nome, mensagem: msg, foto: fotoDados })
      .then(function () {
        comentarios.unshift({ nome: nome, mensagem: msg, foto: fotoDados, data: new Date().toISOString() });
        mostrarComentarios();
        cForm.reset();
        fotoDados = '';
        $('.upload-name').textContent = 'Escolher Foto de Perfil';
        avisar('Comentário publicado!');
      })
      .catch(function () { avisar('Não foi possível publicar agora. Tente de novo.'); })
      .then(function () { btn.disabled = false; });
  });

  // ---------- Menu ----------
  var nav = $('.nav'), toggle = $('.menu-toggle'), mobile = $('#mobile-menu');
  function menu(abrir) {
    mobile.hidden = !abrir;
    toggle.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    toggle.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
    toggle.innerHTML = '';
    toggle.appendChild(icone(abrir ? 'x' : 'menu'));
    desenharIcones();
  }
  toggle.addEventListener('click', function () { menu(mobile.hidden); });
  $$('a', mobile).forEach(function (a) { a.addEventListener('click', function () { menu(false); }); });

  var links = $$('[data-nav]'), secoes = $$('[data-section]');
  function rolagem() {
    nav.classList.toggle('is-solid', window.scrollY > 10);
    var atual = secoes[0].id;
    secoes.forEach(function (s) { if (s.getBoundingClientRect().top <= innerHeight * 0.35) atual = s.id; });
    links.forEach(function (a) { a.setAttribute('aria-current', a.dataset.nav === atual ? 'true' : 'false'); });
  }
  window.addEventListener('scroll', rolagem, { passive: true });
  rolagem();

  // ---------- Animações de entrada ----------
  var obs = ('IntersectionObserver' in window && !reduced) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      obs.unobserve(en.target);
      var n = en.target.querySelector('[data-to]');
      if (n) contar(n);
    });
  }, { rootMargin: '0px 0px -8% 0px' }) : null;
  function observar() {
    $$('[data-anim]:not(.in)').forEach(function (e) {
      if (e.closest('.hero') && body.classList.contains('is-welcome')) return;
      if (obs) obs.observe(e);
      else { e.classList.add('in'); var n = e.querySelector('[data-to]'); if (n) n.textContent = n.dataset.to; }
    });
  }
  function contar(n) {
    var alvo = Number(n.dataset.to) || 0, t0 = performance.now();
    (function f(t) {
      var k = Math.min(1, (t - t0) / 1400);
      n.textContent = Math.round(alvo * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(f);
    })(t0);
  }

  // ---------- Máquina de escrever ----------
  function escrever() {
    var alvo = $('.type');
    if (reduced) { alvo.textContent = P.funcoes[0]; return; }
    var i = 0, pos = 0, apagando = false;
    (function passo() {
      var w = P.funcoes[i];
      pos += apagando ? -1 : 1;
      alvo.textContent = w.slice(0, pos);
      var t = apagando ? 40 : 90;
      if (!apagando && pos === w.length) { apagando = true; t = 2000; }
      else if (apagando && pos === 0) { apagando = false; i = (i + 1) % P.funcoes.length; t = 400; }
      setTimeout(passo, t);
    })();
  }

  // ---------- Boas-vindas ----------
  desenharIcones();
  var welcome = $('.welcome');
  function entrar() {
    body.classList.remove('is-welcome');
    observar();
    escrever();
  }
  if (reduced) {
    welcome.remove();
    entrar();
  } else {
    var url = $('.w-type'), k = 0, saiu = false;
    setTimeout(function digitar() {
      url.textContent = 'www.' + P.site.slice(0, k++);
      if (k <= P.site.length) setTimeout(digitar, 55);
    }, 1300);
    var sair = function () {
      if (saiu) return;
      saiu = true;
      welcome.classList.add('is-out');
      setTimeout(entrar, 250);
      setTimeout(function () { welcome.remove(); }, 900);
    };
    setTimeout(sair, 1300 + P.site.length * 55 + 900);
    welcome.addEventListener('click', sair);
  }
})();
