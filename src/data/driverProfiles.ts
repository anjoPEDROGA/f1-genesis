type DriverProfile = {
  bio: string;
  history: string[];
};

export const driverProfiles: Record<string, DriverProfile> = {
  nor: {
    bio: "Piloto britânico conhecido por velocidade pura, carisma e constância. Revelado pela própria McLaren, tornou-se o líder da equipe e um dos competidores mais fortes da nova geração.",
    history: ["McLaren (2019-atual)"],
  },
  pia: {
    bio: "Fenômeno australiano que venceu a Fórmula 3 e a Fórmula 2 em anos consecutivos. Frio, calculista e extremamente rápido, rapidamente se consolidou como uma das maiores estrelas do esporte.",
    history: ["McLaren (2023-atual)"],
  },
  lec: {
    bio: "Monegasco considerado um especialista em voltas de classificação. Dono de um talento natural brilhante e pilotagem agressiva, é a grande esperança da Ferrari para a conquista de títulos mundiais.",
    history: ["Sauber (2018)", "Ferrari (2019-atual)"],
  },
  ham: {
    bio: "Lenda viva do automobilismo. O britânico é heptacampeão mundial e detentor dos recordes de vitórias e poles da F1. Após fazer história na Mercedes, iniciou o maior desafio de sua carreira ao se mudar para a Ferrari.",
    history: ["McLaren (2007-2012)", "Mercedes (2013-2024)", "Ferrari (2025-atual)"],
  },
  ver: {
    bio: "Piloto holandês que redefiniu o domínio na era moderna da F1. Múltiplo campeão mundial, destaca-se pela agressividade implacável, ritmo de corrida perfeito e consistência rara.",
    history: ["Toro Rosso (2015-2016)", "Red Bull (2016-atual)"],
  },
  had: {
    bio: "Jovem talento francês revelado pela academia da Red Bull. Destacou-se nas categorias de base por sua velocidade bruta e agressividade, conquistando a promoção para a equipe principal.",
    history: ["Racing Bulls (2025)", "Red Bull (2026)"],
  },
  rus: {
    bio: 'Britânico metódico e excelente classificador, apelidado de "Mr. Saturday". Assumiu o papel de líder na Mercedes, mostrando grande capacidade técnica para brigar por vitórias.',
    history: ["Williams (2019-2021)", "Mercedes (2022-atual)"],
  },
  ant: {
    bio: "Prodígio italiano que pulou etapas nas categorias de base devido ao seu talento excepcional. É a grande aposta de ouro da Mercedes para liderar o futuro da equipe.",
    history: ["Mercedes (2025-atual)"],
  },
  alo: {
    bio: "Veterano espanhol bicampeão mundial. Famoso por sua inteligência tática genial, garra e habilidade de extrair o máximo de qualquer carro, sendo um dos pilotos mais respeitados da história.",
    history: ["Minardi (2001)", "Renault (2003-2006, 2008-2009)", "McLaren (2007, 2015-2018)", "Ferrari (2010-2014)", "Alpine (2021-2022)", "Aston Martin (2023-atual)"],
  },
  str: {
    bio: "Piloto canadense que já demonstrou velocidade e conquistou pódios, com destaque para atuações na chuva. Compete pela equipe que tem seu pai como principal investidor.",
    history: ["Williams (2017-2018)", "Racing Point (2019-2020)", "Aston Martin (2021-atual)"],
  },
  gas: {
    bio: "Piloto francês rápido e resiliente. Soube dar a volta por cima após ser rebaixado precocemente no início da carreira, tornando-se um vencedor de corrida e líder no projeto da Alpine.",
    history: ["Toro Rosso (2017-2018)", "Red Bull (2019)", "AlphaTauri (2019-2022)", "Alpine (2023-atual)"],
  },
  col: {
    bio: "Argentino que chocou o paddock com sua rápida adaptação e excelentes atuações como substituto na Williams em 2024, garantindo seu espaço definitivo no grid com a Alpine.",
    history: ["Williams (2024)", "Alpine (2025-atual)"],
  },
  sai: {
    bio: "Espanhol valorizado por sua inteligência de corrida, regularidade e ética de trabalho impecável. Após passagens consistentes por grandes equipes e vitórias na Ferrari, assumiu o desafio de reerguer a Williams.",
    history: ["Toro Rosso (2015-2017)", "Renault (2017-2018)", "McLaren (2019-2020)", "Ferrari (2021-2024)", "Williams (2025-atual)"],
  },
  alb: {
    bio: "Tailandês que reconstruiu sua carreira de forma impressionante. Tornou-se o pilar da Williams nas últimas temporadas, destacando-se por conseguir resultados expressivos com carros limitados.",
    history: ["Toro Rosso (2019)", "Red Bull (2019-2020)", "Williams (2022-atual)"],
  },
  oco: {
    bio: "Francês consistente e conhecido por ser um duro defensor de posições nas pistas. Vencedor de GP, levou sua vasta experiência no pelotão intermediário para liderar o projeto da Haas.",
    history: ["Manor (2016)", "Force India (2017-2018)", "Renault (2020)", "Alpine (2021-2024)", "Haas (2025-atual)"],
  },
  bea: {
    bio: "Britânico que impressionou o mundo ao pontuar em sua estreia de emergência pela Ferrari com apenas 18 anos. Muito maduro para sua idade, garantiu rapidamente sua vaga titular.",
    history: ["Ferrari (2024 - sub)", "Haas (2024 - sub, 2025-atual)"],
  },
  law: {
    bio: "Neozelandês combativo e oportunista. Mostrou seu valor brilhando como substituto em diversas ocasiões, o que lhe rendeu uma vaga cativa na estrutura de pilotos da marca de energéticos.",
    history: ["AlphaTauri (2023 - sub)", "Racing Bulls (2024, 2025-atual)", "Red Bull (2025)"],
  },
  lin: {
    bio: "Estreante britânico de 2026. Apoiado desde cedo pela Red Bull, acelerou rápido pelas categorias de base e chega à F1 apontado como um talento promissor de altíssimo nível.",
    history: ["Racing Bulls (2026) (estreante)"],
  },
  hul: {
    bio: "Experiente piloto alemão, exímio classificador e entregador de resultados seguros. Sua vasta bagagem técnica o transformou na âncora perfeita para o início da equipe de fábrica da Audi.",
    history: ["Williams (2010)", "Force India (2012, 2014-2016)", "Sauber (2013, 2025)", "Renault (2017-2019)", "Racing Point (2020 - sub)", "Aston Martin (2022 - sub)", "Haas (2023-2024)", "Audi (2026)"],
  },
  bor: {
    bio: "Brasileiro campeão da F3 que impressionou o mundo do automobilismo por sua pilotagem cerebral, rápida e madura. Foi o escolhido pela Audi para representar o futuro do projeto alemão.",
    history: ["Sauber (2025)", "Audi (2026)"],
  },
  per: {
    bio: 'Veterano mexicano, apelidado de "Ministro da Defesa" e especialista em preservar pneus. Teve papel crucial na Red Bull e agora traz seu conhecimento para estruturar a equipe estreante americana.',
    history: ["Sauber (2011-2012)", "McLaren (2013)", "Force India (2014-2018)", "Racing Point (2019-2020)", "Red Bull (2021-2024)", "Cadillac (2026)"],
  },
  bot: {
    bio: "Finlandês muito experiente e rápido em classificações. Após anos como escudeiro fiel e vencedor na Mercedes, aporta sua bagagem técnica de ponta para ajudar a desenvolver a nova equipe Cadillac.",
    history: ["Williams (2013-2016)", "Mercedes (2017-2019)", "Alfa Romeo (2020-2023)", "Sauber (2024-2025)", "Cadillac (2026)"],
  },
};
