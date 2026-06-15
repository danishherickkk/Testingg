export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: 'match-report' | 'preview' | 'news' | 'analysis' | 'feature';
  author: string;
  publishedAt: string;
  readTime: number;
  image: string;
  imageColor: string;
  tags: string[];
  featured: boolean;
}

export const news: NewsArticle[] = [
  {
    id: "n1",
    slug: "brazil-thrash-mexico-3-1",
    title: "Brazil Demolish Mexico 3-1 in Stunning Group Stage Display",
    summary: "Vinicius Jr. leads Brazil to a commanding victory with a masterclass performance at MetLife Stadium.",
    content: `Brazil put on a breathtaking display of attacking football to dismantle Mexico 3-1 at MetLife Stadium in what was one of the most entertaining matches of the tournament so far.

Vinicius Jr. opened the scoring with a trademark goal in the 12th minute, cutting inside from the left before curling a sublime effort into the top corner. The Brazilian forward was electric throughout, causing the Mexican defense constant problems with his pace and trickery.

Mexico briefly leveled the scoring through Hirving Lozano's composed finish from the edge of the box, but Brazil quickly reasserted their dominance. Rodrygo added a second before the hour mark, and the win was sealed when Lozano's clearance hit teammate Oscar Jimenez and deflected past Ochoa.

The victory puts Brazil top of Group E with maximum points, while Mexico face a must-win situation in their final group game.

Selecao coach Dorival Junior was effusive in his praise: "We are playing with great intensity and belief. The players understood the mission and executed perfectly."

Brazil's next challenge comes against a tough Japan side on June 16th.`,
    category: "match-report",
    author: "James Rodriguez",
    publishedAt: "2026-06-13T23:30:00Z",
    readTime: 4,
    image: "/news/brazil-mexico.jpg",
    imageColor: "#006400",
    tags: ["Brazil", "Mexico", "Group E", "Match Report"],
    featured: true
  },
  {
    id: "n2",
    slug: "mbappe-hat-trick-france-vs-senegal",
    title: "Mbappé's Hat-Trick Fires France Into Last 16 Early",
    summary: "France's star striker becomes the youngest player to score a World Cup hat-trick as Les Bleus cruise to victory.",
    content: `Kylian Mbappé etched his name further into World Cup history with a magnificent hat-trick as France cruised past Senegal 4-1 to secure their place in the Round of 16 with a game to spare.

The Real Madrid forward was unstoppable from the first whistle, opening the scoring after just six minutes when he latched onto a through ball from Griezmann before coolly slotting past the goalkeeper.

Mbappé completed his hat-trick by the 73rd minute, showcasing three different facets of his game: clinical finishing, brilliant dribbling, and composure under pressure.

Griezmann added a fourth goal late in the second half to put the result beyond any doubt.

"Kylian is in the form of his life," said coach Didier Deschamps. "When he is like this, he is almost impossible to stop. We are very happy with how the tournament is going."

France will face a decisive match against Germany in Group D on June 13th.`,
    category: "match-report",
    author: "Sophie Laurent",
    publishedAt: "2026-06-12T21:45:00Z",
    readTime: 5,
    image: "/news/france-senegal.jpg",
    imageColor: "#002395",
    tags: ["France", "Mbappé", "Hat-trick", "Group D"],
    featured: true
  },
  {
    id: "n3",
    slug: "messi-makes-history",
    title: "Messi Breaks All-Time World Cup Goals Record in Argentina Win",
    summary: "At 38 years old, Lionel Messi surpasses Ronaldo's record to become the all-time leading scorer in World Cup history.",
    content: `History was made at Levi's Stadium as Lionel Messi became the all-time leading scorer in FIFA World Cup history, surpassing his long-time rival Cristiano Ronaldo with a breathtaking free-kick in Argentina's 2-0 win over Poland.

The crowd erupted as Messi's perfectly struck free-kick curled around the wall and into the top right corner in the 54th minute – his record-breaking goal – bringing his tally to 16 World Cup goals, one more than Ronaldo's previous record.

The 38-year-old maestro, appearing in what is likely his final World Cup, received a standing ovation from all four corners of the stadium, with even the Polish fans rising to applaud.

"This is for Argentina, for my family, for everyone who has believed in me," Messi said in an emotional post-match interview. "I'm so grateful to be here, still playing football at this level."

Argentina coach Lionel Scaloni was visibly moved: "Leo is a gift to football. What he did today, at his age, is simply extraordinary."

Argentina march on to the knockout stages as group winners.`,
    category: "feature",
    author: "Carlos Mendes",
    publishedAt: "2026-06-11T20:00:00Z",
    readTime: 6,
    image: "/news/messi-record.jpg",
    imageColor: "#74ACDF",
    tags: ["Argentina", "Messi", "Record", "History"],
    featured: true
  },
  {
    id: "n4",
    slug: "usa-england-preview",
    title: "USA vs England: The Battle for Group B Supremacy",
    summary: "Friday's marquee clash at MetLife Stadium promises fireworks as the Americans face the Three Lions.",
    content: `One of the most anticipated matches of the group stage is upon us as the United States host England in what promises to be a pulsating encounter in Group B.

The last time these sides met at a World Cup was the famous 1-1 draw at the 2010 South Africa World Cup, and both nations have progressed significantly since then.

For the US, Christian Pulisic and the new generation of American talent will be eager to prove their worth on the global stage in front of a home crowd. With performances in the Champions League for AC Milan, Pulisic arrives in superb form.

England meanwhile will be looking to avoid another international tournament heartbreak. The arrival of Jude Bellingham at Real Madrid has elevated the Three Lions to genuine contenders, while Harry Kane has never looked more lethal.

Key Battle: Bellingham vs McKennie in central midfield. Both players are among the most dynamic midfielders in world football and their battle could define the outcome.

Prediction: This feels like a 1-1 draw is the most likely outcome, but don't rule out a surprise American win in front of their home fans.`,
    category: "preview",
    author: "Michael Thompson",
    publishedAt: "2026-06-13T10:00:00Z",
    readTime: 5,
    image: "/news/usa-england.jpg",
    imageColor: "#002868",
    tags: ["USA", "England", "Preview", "Group B"],
    featured: false
  },
  {
    id: "n5",
    slug: "tournament-golden-boot-race",
    title: "Golden Boot Race Heats Up: Mbappé, Messi & Kane All in Contention",
    summary: "After the group stages, three of football's biggest stars are tied on four goals each in the race for the tournament's top scorer award.",
    content: `The race for the FIFA World Cup 2026 Golden Boot is shaping up to be one of the most exciting in tournament history, with Kylian Mbappé, Lionel Messi, and Harry Kane all tied on four goals after the first round of group stage matches.

Mbappé has been in electric form for France, showcasing the full range of his devastating attacking repertoire. His hat-trick against Senegal was one of the performances of the tournament so far.

Messi's historic record-breaking goal and two other finishes have demonstrated that even at 38, he remains one of football's most lethal finishers. The Argentine legend appears motivated like never before.

Kane, who has struggled to translate his club form to international level in previous tournaments, finally looks to be firing on all cylinders, scoring with clinical efficiency in three of England's four matches.

Dark horses include Vinicius Jr. of Brazil (3 goals, 2 assists) and Japan's Takumi Minamino (2 goals, 1 assist).

With the knockout stages approaching, the Golden Boot race is far from decided.`,
    category: "analysis",
    author: "Ana Oliveira",
    publishedAt: "2026-06-13T14:00:00Z",
    readTime: 4,
    image: "/news/golden-boot.jpg",
    imageColor: "#FFD700",
    tags: ["Golden Boot", "Mbappé", "Messi", "Kane", "Stats"],
    featured: false
  },
  {
    id: "n6",
    slug: "morocco-surprises-europe",
    title: "Morocco Continue to Surprise as African Football's New Power",
    summary: "Building on their historic 2022 World Cup run, the Atlas Lions are again threatening the established European order.",
    content: `Morocco are once again proving to be the tournament's most fascinating story. Following their extraordinary run to the semi-finals of the 2022 World Cup in Qatar, Walid Regragui's side are continuing to defy expectations in 2026.

Three wins from three in Group G, conceding just one goal, Morocco have demonstrated the tactical organization and collective spirit that has become their trademark.

Achraf Hakimi has been particularly impressive, contributing not only defensively but also providing two crucial assists from his right-back position. His understanding of Hakim Ziyech and how to complement his creativity makes Morocco's right flank one of the most dangerous in the tournament.

"We don't feel like underdogs anymore," said Hakimi after their victory over Uruguay. "We are Morocco. We are here to compete with anyone."

With a favorable draw in the Round of 16, Morocco could be the team to upset another European giant.`,
    category: "analysis",
    author: "Youssef Benali",
    publishedAt: "2026-06-12T16:30:00Z",
    readTime: 5,
    image: "/news/morocco.jpg",
    imageColor: "#006233",
    tags: ["Morocco", "Africa", "Group G", "Analysis"],
    featured: false
  },
  {
    id: "n7",
    slug: "world-cup-2026-host-cities",
    title: "Inside the 16 World Cup Host Cities: From LA to Toronto",
    summary: "An in-depth look at the incredible venues and cities hosting the FIFA World Cup 2026 across the USA, Canada, and Mexico.",
    content: `FIFA World Cup 2026 is making history as the first tournament to be hosted across three nations – the United States, Canada, and Mexico – and 16 cities. We take an in-depth look at what makes each host city special.

Los Angeles is undoubtedly the centrepiece, hosting the Final at SoFi Stadium and several other matches at the legendary Rose Bowl. The City of Angels offers everything from Hollywood glamour to pristine beaches, making it the perfect final destination.

New York/New Jersey provides the tournament's east coast hub with MetLife Stadium, easily accessible to tens of millions of fans from the tri-state area and beyond.

Mexico City's legendary Estadio Azteca, scene of two World Cup Finals, hosts matches for the third time, continuing its unparalleled football legacy.

Toronto's BMO Field brings a uniquely Canadian atmosphere to the tournament, while Vancouver's BC Place offers stunning mountain backdrop views.

Each city has prepared unprecedented fan zones, cultural experiences, and transport infrastructure for an estimated 1.5 million visiting fans.`,
    category: "feature",
    author: "Emma Wilson",
    publishedAt: "2026-06-10T09:00:00Z",
    readTime: 8,
    image: "/news/host-cities.jpg",
    imageColor: "#0B1F3A",
    tags: ["Host Cities", "USA", "Canada", "Mexico", "Venues"],
    featured: false
  },
  {
    id: "n8",
    slug: "ronaldo-final-world-cup",
    title: "Ronaldo: 'This Is My Last World Cup – I Want to Win It'",
    summary: "Cristiano Ronaldo makes an emotional declaration ahead of Portugal's crucial group stage match.",
    content: `Cristiano Ronaldo has confirmed that FIFA World Cup 2026 will be his final tournament, dedicating his remaining World Cup career to one ultimate goal: lifting the trophy.

"This is my last World Cup. I've given everything to reach this stage, and now I want to win it," the Al-Nassr forward said in a pre-match press conference. "I know people say I'm old, but I'm Cristiano Ronaldo. Age is just a number."

At 41, Ronaldo remains in remarkable physical condition, having scored over 50 goals in the Saudi Pro League last season. His determination, fitness regime, and mental resilience continue to defy the normal career trajectory of a footballer.

Portugal coach Roberto Martínez has built the team around a balance of youth and experience: "Cristiano brings irreplaceable leadership and experience. But this is a team, and we need everyone."

Ronaldo has long been chasing the one major international trophy to match Messi's 2022 triumph. Portugal have drawn with Uruguay and beaten Saudi Arabia in their first two matches.

Can Ronaldo finally get his hands on the World Cup? The tournament awaits his answer.`,
    category: "news",
    author: "Pedro Santos",
    publishedAt: "2026-06-11T12:00:00Z",
    readTime: 4,
    image: "/news/ronaldo.jpg",
    imageColor: "#006600",
    tags: ["Ronaldo", "Portugal", "Interview"],
    featured: false
  },
];

export const getFeaturedNews = () => news.filter(n => n.featured);
export const getLatestNews = () => [...news].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
export const getNewsBySlug = (slug: string) => news.find(n => n.slug === slug);
export const getNewsByCategory = (category: string) => news.filter(n => n.category === category);
