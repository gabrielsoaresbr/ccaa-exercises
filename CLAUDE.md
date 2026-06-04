# Ingles Kumon - micro-SaaS

## O que é
Folhas de exercício de inglês (estilo Kumon) para meu filho de 9 anos,
baseadas no tema semanal do CCAA. Sem backend: HTML/CSS/JS puro,
JSON como fonte de dados, hospedado no GitHub Pages.

## Arquitetura
- `admin.html` — eu preencho conteúdo da semana
- `student.html?semana=XX&dia=N` — meu filho usa
- `data/semanaXX.json` — base de dados de cada semana
- `js/renderer.js` — função única `renderDay(json, dayNumber)` que monta o HTML

## Regras pedagógicas (CRÍTICO)
- Vocabulário restrito ao contexto: nunca introduzir palavras fora do JSON da semana
- Frases curtas, idade 9 anos, tom encorajador
- Português entre parênteses em dicas
- Detalhes completos em `prompt-mestre.md`

## Stack
- Vanilla JS (sem framework, sem build)
- Web Speech API para áudio (en-US, com fallback)
- localStorage no admin para rascunhos
- Fonts: Nunito e Nunito Sans via Google Fonts

## Convenções
- Mobile-first, viewport mínimo 320px
- Cores em CSS variables (ver `Ingles_Semana01_Dia1_Segunda.html` como referência visual)
- Funções JS pequenas, sem classes desnecessárias
- IDs em kebab-case, classes em kebab-case

## Comandos
- Servir local: `python -m http.server 8000` na raiz
- Deploy: push para `main`, GitHub Pages serve automaticamente