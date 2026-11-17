# Portfólio · Kauan

Portfólio pessoal de desenvolvedor full-stack: tela de boas-vindas animada, sobre mim, vitrine com projetos, certificados e stack, e contato com formulário e mural de comentários.

Feito em HTML, CSS e JavaScript puro, com ícones Lucide e logos do Devicon. As mensagens e os comentários ficam numa planilha do Google, via Apps Script.

## Como editar

Todo o conteúdo fica em `config.js`: textos, projetos, certificados, stack e contatos.

- **Foto:** `assets/perfil.jpg`
- **Capas dos projetos:** `assets/projetos/`. Projeto sem imagem ganha uma capa automática com o nome e a stack.
- **Certificados:** coloque as imagens em `assets/certificados/` e adicione em `certificados` no `config.js`.

## Mensagens e comentários

1. Crie uma planilha no Google Planilhas e abra **Extensões > Apps Script**.
2. Cole o conteúdo de `planilha/apps-script.gs` e salve.
3. Vá em **Implantar > Nova implantação > App da Web**, com "Executar como: Eu" e "Quem pode acessar: Qualquer pessoa".
4. Copie o endereço que termina em `/exec` e cole em `planilhaUrl` no `config.js`.

As mensagens vão para a aba **Mensagens**. Os comentários vão para a aba **Comentários**: para esconder um, escreva `não` na coluna **Visível**.

## Ver no computador

```bash
python -m http.server 4190
```

Depois, abra `http://localhost:4190`.
