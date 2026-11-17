// Cole em Extensões > Apps Script numa planilha nova e implante como "App da Web"
// (Executar como: Eu · Quem pode acessar: Qualquer pessoa).
// Guarda as mensagens do formulário "Vamos conversar" e os comentários do mural.

var ABAS = {
  mensagem: { nome: 'Mensagens', cabecalho: ['Data', 'Nome', 'Email', 'Mensagem'] },
  comentario: { nome: 'Comentários', cabecalho: ['Data', 'Nome', 'Mensagem', 'Foto', 'Visível'] }
};

function aba(tipo) {
  var cfg = ABAS[tipo];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(cfg.nome) || ss.insertSheet(cfg.nome);
  if (sh.getLastRow() === 0) {
    sh.appendRow(cfg.cabecalho);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, cfg.cabecalho.length).setFontWeight('bold');
  }
  return sh;
}

// Lista os comentários visíveis, do mais novo para o mais antigo.
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.acao !== 'comentarios') return json({ ok: true });
  var sh = aba('comentario');
  var linhas = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 5).getValues() : [];
  var lista = linhas
    .filter(function (l) { return String(l[4]).toLowerCase() !== 'não'; }) // escreva "não" na coluna Visível para esconder
    .map(function (l) { return { data: l[0], nome: l[1], mensagem: l[2], foto: l[3] }; })
    .reverse()
    .slice(0, 100);
  return json({ comentarios: lista });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var p = (e && e.parameter) || {};
    if (p.tipo === 'mensagem') {
      aba('mensagem').appendRow([new Date(), limpar(p.nome, 80), limpar(p.email, 120), limpar(p.mensagem, 1000)]);
    } else if (p.tipo === 'comentario') {
      var foto = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(p.foto || '') && p.foto.length < 45000 ? p.foto : '';
      aba('comentario').appendRow([new Date(), limpar(p.nome, 60), limpar(p.mensagem, 500), foto, 'sim']);
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false });
  } finally {
    lock.releaseLock();
  }
}

// Impede que um texto vire fórmula na planilha.
function limpar(v, max) {
  var t = String(v || '').replace(/\s+/g, ' ').trim().slice(0, max);
  return /^[=+\-@]/.test(t) ? "'" + t : t;
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
