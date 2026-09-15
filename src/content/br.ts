import type { SiteContent } from './types';

export const br: SiteContent = {
  region: 'br',
  lang: 'pt-BR',

  meta: {
    title: 'CUCA. — Estúdio de marca | Brasil',
    description:
      'Estúdio de branding e marketing digital. Poucos projetos por vez, cada um conduzido de perto. Atendimento no Brasil e em Portugal.',
  },

  nav: [
    { label: 'Estúdio', href: '#estudio' },
    { label: 'O que fazemos', href: '#servicos' },
    { label: 'Contato', href: '#contato' },
  ],
  navCta: 'Falar com a CUCA',

  hero: {
    eyebrow: 'Brasil · Portugal',
    line1: 'A CUCA não atende todo mundo.',
    line2: 'Atende quem entende por quê.',
    lead: 'A CUCA constrói marcas que sustentam preço, aguentam comparação e não dependem de quem está postando naquele mês. Trabalhamos com poucos clientes por vez, e é de propósito.',
    cta: 'Falar com a CUCA',
    ctaSecondary: 'Como trabalhamos',
    marks: ['Branding', 'Conteúdo', 'Estratégia digital'],
  },

  about: {
    eyebrow: 'O estúdio',
    title: 'Poucos projetos. Nenhum no piloto automático.',
    body: [
      'A CUCA trabalha com poucos projetos por vez. Cada um recebe atenção real, do briefing à entrega.',
      'Marca de verdade exige convivência: entender como o dinheiro entra, onde a venda trava, o que o cliente fala quando o vendedor não está ouvindo. Isso não cabe num briefing de uma página.',
      'O resultado é menos apresentação bonita e mais decisão tomada com informação na mão. É mais lento no começo e bem mais firme depois.',
    ],
    pillars: [
      {
        title: 'Poucos de cada vez',
        text: 'Poucos projetos por vez, cada um com atenção real. A agenda é curta por escolha, e isso aparece no tempo que sobra para pensar cada entrega.',
      },
      {
        title: 'Quem pensa é quem executa',
        text: 'A pessoa que desenha a estratégia é a mesma que assina a entrega. Sem repasse para uma camada de execução que não participou da conversa.',
      },
      {
        title: 'Duas praças, uma cabeça',
        text: 'Atendemos Brasil e Portugal. São mercados que compram diferente, falam diferente e reagem diferente ao mesmo argumento. Tratamos cada um como ele é.',
      },
    ],
  },

  services: {
    eyebrow: 'O que fazemos',
    title: 'Três frentes que só funcionam juntas.',
    lead: 'Não vendemos pacote solto. Cada frente existe porque a outra precisa dela para parar de pé.',
    items: [
      {
        n: '01',
        title: 'Branding',
        text: 'A marca como decisão de negócio, não como manual de cores. Definimos posicionamento, território de fala e sistema visual a partir de onde a empresa quer estar daqui a três anos.',
        bullets: [
          'Posicionamento e arquitetura de marca',
          'Identidade visual e sistema de aplicação',
          'Narrativa, tom de voz e verbal',
          'Nomeação e naming de linhas',
        ],
      },
      {
        n: '02',
        title: 'Conteúdo',
        text: 'Conteúdo que constrói autoridade em vez de perseguir alcance. Menos volume, mais peça que continua servindo seis meses depois de publicada.',
        bullets: [
          'Linha editorial e pautas com tese',
          'Direção de arte para social e campanha',
          'Roteiro e direção audiovisual',
          'Materiais de venda e apresentação',
        ],
      },
      {
        n: '03',
        title: 'Estratégia digital',
        text: 'A ponte entre a marca e a receita. Onde a pessoa encontra você, o que ela entende em cinco segundos e o que a faz dar o próximo passo.',
        bullets: [
          'Sites e páginas de conversão',
          'Funil, jornada e pontos de contato',
          'Mídia paga com leitura de marca',
          'Medição do que importa, não do que é fácil',
        ],
      },
    ],
  },

  form: {
    eyebrow: 'Contato',
    title: 'Conte sobre o seu projeto.',
    lead: 'Quanto mais a gente souber antes da primeira conversa, mais útil ela fica. Os campos abaixo levam dois minutos e evitam que a nossa resposta seja uma apresentação genérica.',
    fields: [
      { name: 'nome', label: 'Seu nome', kind: 'text', required: true, placeholder: 'Como prefere ser chamado' },
      { name: 'email', label: 'E-mail', kind: 'email', required: true, placeholder: 'voce@empresa.com.br' },
      { name: 'empresa', label: 'Empresa ou marca', kind: 'text', required: true, placeholder: 'Nome do negócio' },
      {
        name: 'segmento',
        label: 'Segmento do negócio',
        kind: 'select',
        required: true,
        options: [
          'Serviço profissional (advocacia, saúde, consultoria)',
          'Produto físico e varejo',
          'Tecnologia ou software',
          'Alimentação e hospitalidade',
          'Educação e infoproduto',
          'Imobiliário e construção',
          'Indústria',
          'Outro',
        ],
      },
      {
        name: 'momento',
        label: 'Momento atual da empresa',
        kind: 'select',
        required: true,
        options: [
          'Vou lançar, ainda não existe marca',
          'Existe há pouco tempo e já não dá conta',
          'Fatura bem, mas a marca não acompanha',
          'Vamos mudar de posicionamento ou de público',
          'Vamos entrar num mercado novo',
          'Precisa de reposicionamento completo',
        ],
      },
      {
        name: 'desafio',
        label: 'Qual é o principal desafio hoje',
        kind: 'textarea',
        required: true,
        placeholder: 'Por exemplo: perdemos para um concorrente mais caro toda vez que chega na proposta.',
        hint: 'Escreva do seu jeito. Detalhe ajuda, mas não precisa caprichar.',
      },
      {
        name: 'investimento',
        label: 'Faixa de investimento previsto (opcional)',
        kind: 'select',
        options: [
          'Até R$ 15 mil',
          'R$ 15 mil a R$ 40 mil',
          'R$ 40 mil a R$ 80 mil',
          'Acima de R$ 80 mil',
          'Ainda não defini',
        ],
      },
    ],
    submit: 'Enviar solicitação',
    sending: 'Enviando',
    note: 'Envie a solicitação e entraremos em contato.',
    privacy: 'Seus dados ficam com a gente e servem só para responder esta solicitação.',
    success: {
      title: 'Recebido.',
      text: 'Sua solicitação chegou aqui. Vamos entrar em contato pelo e-mail que você deixou.',
    },
    error: 'Alguma coisa travou no envio. Tente de novo ou escreva direto para o e-mail do rodapé.',
  },

  footer: {
    line: 'Estúdio de marca. Brasil e Portugal.',
    email: 'cucaestudiocriativo@gmail.com',
    switchLabel: 'Ver a versão de Portugal',
    rights: 'Todos os direitos reservados.',
  },
};
