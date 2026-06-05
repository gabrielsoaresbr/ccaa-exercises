# Ingles Kumon - micro-SaaS

## O que é
Folhas de exercício de inglês (estilo Kumon) para meu filho de 9 anos,
baseadas no tema semanal do CCAA. Sem backend: HTML/CSS/JS puro,
JSON como fonte de dados, hospedado no GitHub Pages.

## Arquitetura
- `student.html?semana=XX&dia=N` — meu filho usa
- `data/semanaXX.json` — base de dados de cada semana, gerado via chat com Claude usando o `prompt-mestre.md`
- `js/renderer.js` — função única `renderDay(json, dayNumber)` que monta o HTML

## Fluxo de geração de conteúdo
1. Abrir nova conversa com Claude (claude.ai)
2. Colar o conteúdo de `prompt-mestre.md` com as variáveis da semana preenchidas
3. Claude gera o arquivo `semanaXX.json` completo (todos os 5 dias)
4. Salvar o JSON em `data/semanaXX.json`
5. Push para `main` → GitHub Pages serve automaticamente

## Regras pedagógicas (CRÍTICO)
- Vocabulário restrito ao contexto: nunca introduzir palavras fora do JSON da semana
- Frases curtas, idade 9 anos, tom encorajador
- Português entre parênteses em dicas
- Detalhes completos em `prompt-mestre.md`

## Stack
- Vanilla JS (sem framework, sem build)
- Web Speech API para áudio (en-US, com fallback)
- Fonts: Nunito e Nunito Sans via Google Fonts

## Convenções
- Mobile-first, viewport mínimo 320px
- Cores em CSS variables (ver `Ingles_Semana01_Dia1_Segunda.html` como referência visual)
- Funções JS pequenas, sem classes desnecessárias
- IDs em kebab-case, classes em kebab-case

## Comandos
- Servir local: `python -m http.server 8000` na raiz
- Deploy: push para `main`, GitHub Pages serve automaticamente