import type { SiteContent } from './types';

/**
 * Copy escrita de raiz em português europeu. Não é a versão brasileira
 * traduzida: muda o vocabulário, a colocação dos pronomes, o ritmo da
 * frase e as referências de mercado.
 */
export const pt: SiteContent = {
  region: 'pt',
  lang: 'pt-PT',

  meta: {
    title: 'CUCA. — Estúdio de marca | Portugal',
    description:
      'Estúdio de branding e marketing digital. Poucos projetos de cada vez, todos acompanhados de perto. Trabalhamos em Portugal e no Brasil.',
  },

  nav: [
    { label: 'Estúdio', href: '#estudio' },
    { label: 'O que fazemos', href: '#servicos' },
    { label: 'Candidatura', href: '#candidatura' },
  ],
  navCta: 'Apresentar um projeto',

  hero: {
    eyebrow: 'Portugal · Brasil',
    line1: 'Marca não é',
    line2: 'maquilhagem.',
    lead: 'A CUCA constrói marcas que aguentam o preço que pedem, resistem à comparação e não dependem de quem está a publicar naquele mês. Aceitamos poucos clientes de cada vez, e isso é de propósito.',
    cta: 'Apresentar um projeto',
    ctaSecondary: 'Como trabalhamos',
    marks: ['Branding', 'Conteúdo', 'Estratégia digital'],
  },

  about: {
    eyebrow: 'O estúdio',
    title: 'Poucos projetos. Nenhum entregue a meio.',
    body: [
      'Há um género de agência que cresce a dizer que sim a tudo, reparte o trabalho por gente que nunca falou com o cliente e entrega dentro do prazo qualquer coisa que parece certa. Resulta durante algum tempo. Depois a marca fica igual à do concorrente do lado e ninguém sabe explicar porquê.',
      'A CUCA foi pensada ao contrário. Pegamos em poucos projetos ao mesmo tempo porque uma marca a sério obriga a convivência: perceber por onde entra o dinheiro, onde é que a venda encrava, o que é que o cliente diz quando o comercial já não está a ouvir. Isso não cabe num briefing de uma página.',
      'Se o seu caso não for para nós, dizemo-lo logo na primeira conversa. Vale mais para os dois lados do que uma proposta simpática.',
    ],
    pillars: [
      {
        title: 'Selecionamos, não fazemos fila',
        text: 'Avaliamos cada projeto antes de aceitar: encaixe de âmbito, de momento e de expectativa. Não é exclusividade de brochura, é limite de agenda.',
      },
      {
        title: 'Quem pensa é quem faz',
        text: 'Quem desenha a estratégia é quem assina a entrega. Não passamos o trabalho a uma camada de execução que ficou de fora da conversa.',
      },
      {
        title: 'Dois mercados, uma cabeça',
        text: 'Trabalhamos em Portugal e no Brasil. São mercados que compram de maneira diferente, falam de maneira diferente e reagem de maneira diferente ao mesmo argumento. Tratamos cada um como ele é.',
      },
    ],
  },

  services: {
    eyebrow: 'O que fazemos',
    title: 'Três frentes que só resultam juntas.',
    lead: 'Não vendemos pacotes avulso. Cada frente existe porque a outra precisa dela para se aguentar de pé.',
    items: [
      {
        n: '01',
        title: 'Branding',
        text: 'A marca como decisão de negócio, não como manual de cores. Definimos posicionamento, território de discurso e sistema visual a partir de onde a empresa quer estar daqui a três anos.',
        bullets: [
          'Posicionamento e arquitetura de marca',
          'Identidade visual e sistema de aplicação',
          'Narrativa, tom de voz e discurso',
          'Naming de marca e de linhas',
        ],
      },
      {
        n: '02',
        title: 'Conteúdo',
        text: 'Conteúdo que constrói autoridade em vez de correr atrás de alcance. Menos volume e mais peças que continuam a servir seis meses depois de publicadas.',
        bullets: [
          'Linha editorial e temas com tese',
          'Direção de arte para social e campanha',
          'Guião e realização de vídeo',
          'Materiais comerciais e apresentações',
        ],
      },
      {
        n: '03',
        title: 'Estratégia digital',
        text: 'A ponte entre a marca e a faturação. Onde é que as pessoas o encontram, o que percebem em cinco segundos no ecrã e o que as leva a dar o passo seguinte.',
        bullets: [
          'Sites e páginas de conversão',
          'Funil, percurso e pontos de contacto',
          'Meios pagos com leitura de marca',
          'Medir o que conta, não o que é fácil de medir',
        ],
      },
    ],
  },

  form: {
    eyebrow: 'Candidatura',
    title: 'Antes da conversa, quatro perguntas.',
    lead: 'Isto não é um "fale connosco". É o que precisamos de saber para lhe responder com alguma coisa útil em vez de uma apresentação igual para todos. Leva dois minutos e respondemos em dois dias úteis.',
    fields: [
      { name: 'nome', label: 'O seu nome', kind: 'text', required: true, placeholder: 'Como prefere que lhe chamem' },
      { name: 'email', label: 'E-mail', kind: 'email', required: true, placeholder: 'voce@empresa.pt' },
      { name: 'empresa', label: 'Empresa ou marca', kind: 'text', required: true, placeholder: 'Nome do negócio' },
      {
        name: 'segmento',
        label: 'Setor de atividade',
        kind: 'select',
        required: true,
        options: [
          'Serviços profissionais (advocacia, saúde, consultoria)',
          'Produto e retalho',
          'Tecnologia ou software',
          'Restauração e hotelaria',
          'Formação e cursos',
          'Imobiliário e construção',
          'Indústria',
          'Outro',
        ],
      },
      {
        name: 'momento',
        label: 'Em que momento está a empresa',
        kind: 'select',
        required: true,
        options: [
          'Vamos lançar, ainda não há marca',
          'Existe há pouco tempo e já não chega',
          'Fatura bem, mas a marca não acompanha',
          'Vamos mudar de posicionamento ou de público',
          'Vamos entrar num mercado novo',
          'Precisa de reposicionamento de raiz',
        ],
      },
      {
        name: 'desafio',
        label: 'Qual é o principal desafio neste momento',
        kind: 'textarea',
        required: true,
        placeholder: 'Seja concreto. "Vender mais" não nos diz nada. "Perdemos para um concorrente mais caro sempre que chega à proposta" diz-nos muito.',
        hint: 'Quanto mais concreto for, melhor é a resposta que recebe.',
      },
      {
        name: 'investimento',
        label: 'Verba prevista para o projeto',
        kind: 'select',
        required: true,
        options: [
          'Até 5 mil €',
          '5 mil € a 15 mil €',
          '15 mil € a 30 mil €',
          'Acima de 30 mil €',
          'Ainda por definir',
        ],
      },
    ],
    submit: 'Enviar candidatura',
    sending: 'A enviar',
    note: 'Os seus dados ficam connosco e servem apenas para responder a esta candidatura.',
    success: {
      title: 'Recebido.',
      text: 'Vamos ler com atenção e responder em dois dias úteis. Se houver encaixe, a conversa seguinte já entra mesmo no assunto.',
    },
    error: 'Alguma coisa falhou no envio. Tente outra vez ou escreva diretamente para o e-mail do rodapé.',
  },

  footer: {
    line: 'Estúdio de marca. Portugal e Brasil.',
    email: 'cucaestudiocriativo@gmail.com',
    switchLabel: 'Ver a versão do Brasil',
    rights: 'Todos os direitos reservados.',
  },
};
