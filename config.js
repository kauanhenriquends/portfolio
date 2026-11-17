// ============================================================
//  TODO O CONTEÚDO DO PORTFÓLIO FICA AQUI.
//  Itens marcados com [revisar] são rascunho: troque pelos seus dados reais.
// ============================================================
window.PORTFOLIO = {
  marca: 'Kauan',                       // logo no topo e rodapé
  site: 'kauan-portfolio.vercel.app',   // [revisar] endereço digitado na tela de boas-vindas
  nome: 'Kauan Henrique',               // [revisar]

  // Início
  selo: 'Pronto para inovar',
  titulo: ['Desenvolvedor', 'Full-stack'],
  funcoes: ['Desenvolvedor Full-stack', 'Estudante de Análise e Desenvolvimento de Sistemas', 'Back-end com Python e Django'],
  resumo: 'Desenvolvo sistemas web completos, do banco de dados à interface: regras de negócio, APIs e integrações no back-end, e telas modernas, rápidas e responsivas no front-end.',
  chips: ['Python', 'Django', 'PostgreSQL', 'JavaScript'],

  // Sobre mim
  bio: 'Sou estudante de Análise e Desenvolvimento de Sistemas e desenvolvedor full-stack. No back-end, construo sistemas com Python, Django e PostgreSQL, com filas em Celery e Redis, APIs com Django REST Framework, integrações com WhatsApp e Mercado Pago e testes automatizados. No front-end, crio interfaces responsivas com HTML, CSS, JavaScript, Tailwind e HTMX. Busco estágio em back-end, IA e dados, e gosto de resolver problemas reais com código bem pensado.',
  curriculo: '',          // link do CV em PDF (vazio: o botão avisa que ainda não está disponível)
  anosExperiencia: 1,     // [revisar]
  cartoes: {
    objetivo: 'Estágio em back-end, IA e dados',
    experiencia: 'Django, APIs & Integrações',
    competencias: 'Back-end & Front-end',
    disponibilidade: 'Remoto & Freelance'  // [revisar]
  },

  // Portfólio
  // Sem "imagem", o projeto ganha uma capa com o nome e a stack.
  // "privado: true" mostra "Código privado" no lugar do link do GitHub.
  projetos: [
    {
      titulo: 'NexusBarber',
      tipo: 'Sistema web · Back-end',
      descricao: 'Agenda online para barbearias: o cliente marca o horário por um link, a barbearia gerencia tudo em um painel e os lembretes saem pelo WhatsApp, com assinaturas pelo Mercado Pago.',
      destaques: [
        'Painel para dono e barbeiros, com convite, preços próprios e link pessoal',
        'Página pública de agendamento e lembretes pelo WhatsApp Cloud API',
        'Assinaturas mensais no Mercado Pago, com teste grátis, cupons e tolerância',
        'Webhooks de pagamento verificados por assinatura e reenvio com tentativas',
        'Testes com pytest e ambiente com Docker Compose'
      ],
      tecnologias: ['Python', 'Django', 'DRF', 'Celery', 'PostgreSQL', 'Redis', 'HTMX', 'Tailwind', 'Docker'],
      capa: ['#4f46e5', '#9333ea'],
      privado: true
    },
    {
      titulo: 'TecnoDesk',
      tipo: 'Sistema web · Back-end',
      status: 'Em desenvolvimento',
      descricao: 'Sistema multiempresa para assistências técnicas acompanharem cada equipamento, da entrada à retirada: clientes, ordens de serviço, pagamentos e acompanhamento pelo cliente.',
      destaques: [
        'Várias empresas no mesmo sistema, com dados isolados',
        'Ordens de serviço com numeração por empresa gerada em transação',
        'Pagamentos com saldo pendente e estorno sem apagar lançamentos',
        'Link público de acompanhamento com token em hash e limite de tentativas',
        'Valores em Decimal e regras de situação validadas no servidor'
      ],
      tecnologias: ['Python', 'Django', 'PostgreSQL', 'Bootstrap', 'JavaScript'],
      capa: ['#0e7490', '#6366f1'],
      privado: true
    },
    {
      titulo: 'Convite de Casamento',
      tipo: 'Landing page',
      descricao: 'Convite digital feito para celular: uma aliança desce por um fio dourado na rolagem, lista de presentes com Mercado Pago e confirmação de presença direto numa planilha do Google.',
      destaques: [
        'Animação de rolagem guiada por SVG',
        'Lista de presentes com links de pagamento do Mercado Pago',
        'Confirmação de presença gravada no Google Sheets via Apps Script'
      ],
      tecnologias: ['HTML', 'CSS', 'JavaScript', 'Apps Script', 'Vercel'],
      imagem: 'assets/projetos/convite.jpg',
      demo: 'https://convite-casamento-kappa-beryl.vercel.app',
      codigo: 'https://github.com/kauanhenriquends/convite-casamento'
    },
    {
      titulo: 'Kauan & Gabriela',
      tipo: 'Site de casamento',
      descricao: 'Site do meu casamento, feito com HTML, CSS e JavaScript e publicado na Vercel.',
      tecnologias: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
      imagem: 'assets/projetos/casamento.jpg',
      demo: 'https://casamento-weld-chi.vercel.app',
      codigo: 'https://github.com/kauanhenriquends/casamento.'
    }
  ],
  certificados: [
    // { titulo: 'Nome do curso', imagem: 'assets/certificados/curso.jpg' }
  ],
  // Ícones disponíveis: python, django, postgresql, redis, docker, html, css, javascript,
  // tailwind, bootstrap, git, github, vercel, react, nodejs, firebase, figma, vite, typescript
  stack: [
    { nome: 'Python', icone: 'python' },
    { nome: 'Django', icone: 'django' },
    { nome: 'PostgreSQL', icone: 'postgresql' },
    { nome: 'Redis', icone: 'redis' },
    { nome: 'Docker', icone: 'docker' },
    { nome: 'JavaScript', icone: 'javascript' },
    { nome: 'HTML', icone: 'html' },
    { nome: 'CSS', icone: 'css' },
    { nome: 'Tailwind CSS', icone: 'tailwind' },
    { nome: 'Git', icone: 'git' },
    { nome: 'GitHub', icone: 'github' },
    { nome: 'Vercel', icone: 'vercel' }
  ],

  // Contato
  contatoTexto: 'Compartilhe a sua ideia de sistema, site ou integração e vamos encontrar juntos a melhor solução.',
  telefone: '',             // [revisar] ex.: +55 21 99999-9999
  email: '',                // [revisar]
  local: 'Brasil · Remoto / freelancer', // [revisar]
  linkedin: { usuario: 'linkedin.com/in/kauan-silva-38112a36a', url: 'https://www.linkedin.com/in/kauan-silva-38112a36a/' },
  instagram: { usuario: '', url: '' },  // [revisar]
  github: { usuario: '@kauanhenriquends', url: 'https://github.com/kauanhenriquends' },
  whatsapp: '',             // só números, com DDI e DDD. Ex.: 5521999999999

  // Endereço do App da Web do Google Apps Script (planilha/apps-script.gs).
  // Ele guarda as mensagens do formulário e os comentários.
  planilhaUrl: ''
};
