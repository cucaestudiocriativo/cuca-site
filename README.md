# CUCA. — site

Landing do estúdio, com abertura animada, seleção de região e duas rotas de
conteúdo: `/br` (português do Brasil) e `/pt` (português europeu).

## Rodar local

```bash
npm install
npm run dev     # http://localhost:3000
```

Build de produção (exporta HTML estático para `out/`):

```bash
npm run build
```

## Rotas

| Rota | O que é |
| --- | --- |
| `/` | Abertura animada e escolha de região |
| `/br` | Landing completa, copy brasileira |
| `/pt` | Landing completa, copy portuguesa |
| `/lab/intro` | Bancada da abertura, isolada do resto do site |

`/lab/intro` existe para afinar a animação sem carregar a página inteira:
tem replay, alternância entre versão cheia e leve, câmera lenta em 1/4 e
uma régua de tempo que acende cada marca (quiques e entrada das letras) no
milissegundo em que ela acontece. Não é indexada.

## A abertura

A letra C cai de fora da tela, quica quatro vezes em amplitude decrescente
e pousa como primeiro caractere de **CUCA.** Fechada a queda, a extrusão
recolhe e sobra o logotipo chapado da marca.

Duas decisões que valem registro:

**Sem Three.js.** A profundidade do C é feita com cópias da letra empilhadas
em `translateZ`, escurecendo para trás. Um renderer 3D custaria centenas de
KB de JavaScript antes de qualquer conteúdo aparecer, para três segundos de
animação. O resultado aqui roda em CSS puro e some no fim de qualquer forma.

**Sem arquivo de áudio.** O baque do impacto é sintetizado na hora com Web
Audio (`src/lib/useThud.ts`): um seno que despenca de 164 Hz para 41 Hz,
somado a um estalo de ruído filtrado. O disparo é agendado no relógio do
próprio `AudioContext`, então bate no frame do quique em vez de depender de
um mp3 ter terminado de baixar. Cada quique seguinte vem mais fraco.

Navegador nenhum toca som antes de um gesto do usuário. O contexto é
destravado no primeiro toque, clique ou tecla — inclusive o clique no botão
de som. Numa aba recém-aberta, sem nenhuma interação, a abertura roda muda:
é limitação do navegador, não do código.

Os tempos ficam todos em `src/components/intro/timeline.ts` e são espelhados
nos `@keyframes` de `intro.module.css`. **Mexeu num lado, mexa no outro** —
senão o som descola do quique.

### Versão leve

Em tela pequena, ponteiro de toque, aparelho com pouca memória, `save-data`
ligado ou conexão 2G/3G, a abertura troca para a versão leve: oito camadas
em vez de vinte e profundidade por deslocamento diagonal, sem 3D. Mesma
curva, mesmo tempo, mesmo som. Quem pediu menos movimento no sistema
(`prefers-reduced-motion`) vai direto para a tela de escolha.

## Região

A escolha fica em `localStorage` (`cuca:region`). Quem já escolheu vai
direto para a sua rota na visita seguinte, sem passar pela abertura de novo.

Para voltar à tela de escolha: `/?trocar=1`. O rodapé de cada landing traz
um link discreto para a outra região, que também atualiza a preferência.

## Formulário

As respostas vão para o [Formspree](https://formspree.io). Crie um
formulário lá, copie o ID do endpoint e guarde como secret do repositório
com o nome `FORMSPREE_ID` — o workflow de deploy injeta no build. Para
rodar local, copie `.env.example` para `.env.local` e preencha.

Sem o ID configurado, o formulário valida normalmente e mostra a tela de
sucesso, mas **não envia nada**: as respostas vão para o console do
navegador, o que serve para revisar o layout sem gastar cota.

Trocar de serviço mexe em um lugar só: a função `handleSubmit` em
`src/components/site/QualifyForm.tsx`.

## Publicação

`.github/workflows/deploy.yml` builda e publica em GitHub Pages a cada push
na `main`. Para ligar: Settings → Pages → Source: **GitHub Actions**.

O arquivo vazio `public/.nojekyll` é obrigatório. Sem ele o Pages passa o
site pelo Jekyll, que ignora pastas começadas em `_`, e todo o `_next/`
some — o site sobe sem CSS nem JavaScript.

## Estrutura

```
src/
  app/                 rotas (/, /br, /pt, /lab/intro)
  components/
    intro/             abertura: marca animada, controles, bancada, tempos
    region/            tela de escolha de região
    site/              seções das landings e formulário
  content/             copy de cada região, tipada em types.ts
  lib/                 som, detecção de versão leve, persistência de região
legacy/                versões anteriores do site, em HTML solto
```

A copy das duas regiões mora em `src/content/br.ts` e `src/content/pt.ts`,
separada dos componentes. Dá para reescrever texto sem tocar em layout.

A versão portuguesa não é tradução da brasileira: muda vocabulário
(*equipa*, *gerir*, *ecrã*, *retalho*, *verba*), colocação de pronome
(*dizemo-lo*, *diz-nos*), construção verbal (*está a publicar*, não *está
postando*) e as faixas de investimento, que vêm em euro.
