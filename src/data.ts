export type NavKey = 'today' | 'calendar' | 'raids' | 'strings' | 'tools'

export type EventCategory =
  | 'event'
  | 'community'
  | 'raid'
  | 'spotlight'
  | 'max'
  | 'battle'
  | 'season'

export type EventItem = {
  id: string
  title: string
  category: EventCategory
  start: string
  end: string
  timeLabel: string
  summary: string
  tag: string
  sourceName: string
  sourceUrl: string
}

export type RaidBoss = {
  id: string
  name: string
  tier: '1-star' | '3-star' | '5-star' | 'Mega' | 'Shadow 1-star' | 'Shadow 3-star' | 'Shadow 5-star'
  types: string[]
  cp: string
  boostedCp: string
  weather: string[]
  window: string
}

export type FeaturedRaid = {
  id: string
  name: string
  tier: string
  activeUntil: string
  weaknesses: string[]
  note: string
}

export type SearchString = {
  id: string
  title: string
  category: 'Cleanup' | 'IV' | 'PvP' | 'Raid prep' | 'Trade' | 'Event'
  string: string
  note: string
}

export const dataSnapshot = {
  label: 'Updated Jun 23, 2026',
  detail: 'Event and raid snapshot for local-time schedules.',
  sources: [
    {
      label: 'Official Forever Forward season',
      url: 'https://pokemongo.com/seasons/forever-forward',
    },
    {
      label: 'Leek Duck events',
      url: 'https://leekduck.com/events/',
    },
    {
      label: 'Leek Duck current raids',
      url: 'https://leekduck.com/raid-bosses/',
    },
  ],
}

export const eventCategories: { id: 'all' | EventCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'event', label: 'Events' },
  { id: 'community', label: 'Community' },
  { id: 'raid', label: 'Raids' },
  { id: 'spotlight', label: 'Spotlight' },
  { id: 'max', label: 'Max' },
  { id: 'battle', label: 'GBL' },
]

export const events: EventItem[] = [
  {
    id: 'fossil-fun',
    title: 'Choose Your Path: Fossil Fun',
    category: 'event',
    start: '2026-06-17T10:00:00',
    end: '2026-06-21T20:00:00',
    timeLabel: 'Ends Jun 21, 8:00 PM',
    summary: 'Path event wraps up tonight.',
    tag: 'Now',
    sourceName: 'Leek Duck',
    sourceUrl: 'https://leekduck.com/events/',
  },
  {
    id: 'frigibax-community-day',
    title: 'Frigibax Community Day',
    category: 'community',
    start: '2026-06-20T14:00:00',
    end: '2026-06-20T17:00:00',
    timeLabel: 'Jun 20, 2:00 PM - 5:00 PM',
    summary: 'June Community Day from the Forever Forward season.',
    tag: 'Community Day',
    sourceName: 'Pokemon GO',
    sourceUrl: 'https://pokemongo.com/seasons/forever-forward',
  },
  {
    id: 'max-hoothoot',
    title: 'Dynamax Hoothoot Max Monday',
    category: 'max',
    start: '2026-06-22T06:00:00',
    end: '2026-06-22T21:00:00',
    timeLabel: 'Jun 22, 6:00 AM - 9:00 PM',
    summary: 'Max Monday feature with extra Power Spot activity.',
    tag: 'Max Monday',
    sourceName: 'Leek Duck',
    sourceUrl: 'https://leekduck.com/events/',
  },
  {
    id: 'flying-taxi',
    title: 'Flying Taxi',
    category: 'event',
    start: '2026-06-23T10:00:00',
    end: '2026-06-29T20:00:00',
    timeLabel: 'Jun 23, 10:00 AM - Jun 29, 8:00 PM',
    summary: 'Squawkabilly debuts with Flying-type spawns and event raids.',
    tag: 'Event',
    sourceName: 'Leek Duck',
    sourceUrl: 'https://leekduck.com/events/flying-taxi-2026/',
  },
  {
    id: 'mega-pidgeot',
    title: 'Mega Pidgeot raids',
    category: 'raid',
    start: '2026-06-24T06:00:00',
    end: '2026-07-01T06:00:00',
    timeLabel: 'Jun 24, 6:00 AM - Jul 1, 6:00 AM',
    summary: 'Mega Pidgeot rotates into Mega Raids.',
    tag: 'Mega',
    sourceName: 'Leek Duck',
    sourceUrl: 'https://leekduck.com/events/mega-pidgeot-in-mega-raids-june-2026/',
  },
  {
    id: 'celesteela-kartana',
    title: 'Celesteela and Kartana raids',
    category: 'raid',
    start: '2026-06-24T06:00:00',
    end: '2026-06-30T22:00:00',
    timeLabel: 'Jun 24, 6:00 AM - Jun 30, 10:00 PM',
    summary: 'Ultra Beasts rotate into 5-star raids.',
    tag: '5-star',
    sourceName: 'Leek Duck',
    sourceUrl: 'https://leekduck.com/events/celesteela-kartana-in-5-star-raid-battles-june-2026/',
  },
  {
    id: 'raid-hour-celesteela-kartana',
    title: 'Celesteela and Kartana Raid Hour',
    category: 'raid',
    start: '2026-06-24T18:00:00',
    end: '2026-06-24T19:00:00',
    timeLabel: 'Jun 24, 6:00 PM - 7:00 PM',
    summary: 'Focused Wednesday Raid Hour.',
    tag: 'Raid Hour',
    sourceName: 'Leek Duck',
    sourceUrl: 'https://leekduck.com/events/celesteela-kartana-in-5-star-raid-battles-june-2026/',
  },
  {
    id: 'flying-taxi-taken-over',
    title: 'Flying Taxi: Taken Over',
    category: 'event',
    start: '2026-06-25T00:00:00',
    end: '2026-06-29T20:00:00',
    timeLabel: 'Jun 25, 12:00 AM - Jun 29, 8:00 PM',
    summary: 'Team GO Rocket takeover with Shadow Reshiram and Frustration TM window.',
    tag: 'Rocket',
    sourceName: 'Leek Duck',
    sourceUrl: 'https://leekduck.com/events/flying-taxi-taken-over-2026/',
  },
  {
    id: 'wingull-spotlight',
    title: 'Wingull Spotlight Hour',
    category: 'spotlight',
    start: '2026-06-25T18:00:00',
    end: '2026-06-25T19:00:00',
    timeLabel: 'Jun 25, 6:00 PM - 7:00 PM',
    summary: 'Wingull featured with 2x Catch Stardust.',
    tag: 'Spotlight',
    sourceName: 'Leek Duck',
    sourceUrl: 'https://leekduck.com/events/pokemonspotlighthour2026-06-25/',
  },
  {
    id: 'skarmory-raid-day',
    title: 'Skarmory Super Mega Raid Day',
    category: 'raid',
    start: '2026-06-27T14:00:00',
    end: '2026-06-27T17:00:00',
    timeLabel: 'Jun 27, 2:00 PM - 5:00 PM',
    summary: 'Mega Skarmory debuts, with up to six free Raid Passes.',
    tag: 'Raid Day',
    sourceName: 'Leek Duck',
    sourceUrl: 'https://leekduck.com/events/skarmory-super-mega-raid-day-2026/',
  },
  {
    id: 'charged-embers',
    title: 'Choose Your Path: Charged Embers',
    category: 'event',
    start: '2026-06-30T10:00:00',
    end: '2026-07-03T20:00:00',
    timeLabel: 'Jun 30, 10:00 AM - Jul 3, 8:00 PM',
    summary: 'Next path event in the season calendar.',
    tag: 'Path',
    sourceName: 'Leek Duck',
    sourceUrl: 'https://leekduck.com/events/',
  },
  {
    id: 'sobble-community-day',
    title: 'Sobble Community Day',
    category: 'community',
    start: '2026-07-04T14:00:00',
    end: '2026-07-04T17:00:00',
    timeLabel: 'Jul 4, 2:00 PM - 5:00 PM',
    summary: 'Sobble spawns, Hydro Cannon Inteleon, 1/4 Hatch Distance, and 2x Catch Candy.',
    tag: 'Community Day',
    sourceName: 'Leek Duck',
    sourceUrl: 'https://leekduck.com/events/july-communityday2026/',
  },
  {
    id: 'anniversary-party',
    title: '10th Anniversary Party',
    category: 'event',
    start: '2026-07-04T10:00:00',
    end: '2026-07-06T20:00:00',
    timeLabel: 'Jul 4, 10:00 AM - Jul 6, 8:00 PM',
    summary: 'Anniversary event starts the July slate.',
    tag: 'Event',
    sourceName: 'Leek Duck',
    sourceUrl: 'https://leekduck.com/events/',
  },
  {
    id: 'go-fest-global',
    title: 'Pokemon GO Fest 2026: Global',
    category: 'community',
    start: '2026-07-11T10:00:00',
    end: '2026-07-12T19:00:00',
    timeLabel: 'Jul 11 - Jul 12',
    summary: 'Free global event featuring Mewtwo and Zeraora.',
    tag: 'GO Fest',
    sourceName: 'Pokemon GO',
    sourceUrl: 'https://pokemongo.com/seasons/forever-forward',
  },
  {
    id: 'august-community-day',
    title: 'August Community Day',
    category: 'community',
    start: '2026-08-16T14:00:00',
    end: '2026-08-16T17:00:00',
    timeLabel: 'Aug 16, 2:00 PM - 5:00 PM',
    summary: 'Forever Forward Community Day date.',
    tag: 'Community Day',
    sourceName: 'Pokemon GO',
    sourceUrl: 'https://pokemongo.com/seasons/forever-forward',
  },
]

export const featuredRaids: FeaturedRaid[] = [
  {
    id: 'mega-scizor',
    name: 'Mega Scizor',
    tier: 'Mega',
    activeUntil: 'Jun 24, 6:00 AM',
    weaknesses: ['Fire'],
    note: 'Double weak to Fire. Prioritize Mega Charizard Y, Reshiram, Heatran, and Shadow fire attackers.',
  },
  {
    id: 'shadow-dialga',
    name: 'Shadow Dialga',
    tier: 'Shadow 5-star',
    activeUntil: 'Jun 30, 10:00 PM',
    weaknesses: ['Fighting', 'Ground'],
    note: 'Plan for purified gems and strong Fighting or Ground teams.',
  },
  {
    id: 'celesteela-kartana',
    name: 'Celesteela + Kartana',
    tier: '5-star',
    activeUntil: 'Starts Jun 24, 6:00 AM',
    weaknesses: ['Fire', 'Electric'],
    note: 'Kartana appears in the Northern Hemisphere; Celesteela appears in the Southern Hemisphere.',
  },
]

export const raidBosses: RaidBoss[] = [
  {
    id: 'omanyte',
    name: 'Omanyte',
    tier: '1-star',
    types: ['Rock', 'Water'],
    cp: '826 - 882',
    boostedCp: '1033 - 1103',
    weather: ['Partly Cloudy', 'Rainy'],
    window: 'Jun 17 - Jun 23',
  },
  {
    id: 'kabuto',
    name: 'Kabuto',
    tier: '1-star',
    types: ['Rock', 'Water'],
    cp: '730 - 783',
    boostedCp: '913 - 979',
    weather: ['Partly Cloudy', 'Rainy'],
    window: 'Jun 17 - Jun 23',
  },
  {
    id: 'beldum',
    name: 'Beldum',
    tier: '1-star',
    types: ['Steel', 'Psychic'],
    cp: '513 - 558',
    boostedCp: '642 - 697',
    weather: ['Snow', 'Windy'],
    window: 'Jun 17 - Jun 23',
  },
  {
    id: 'rockruff',
    name: 'Rockruff',
    tier: '1-star',
    types: ['Rock'],
    cp: '499 - 543',
    boostedCp: '624 - 679',
    weather: ['Partly Cloudy'],
    window: 'Jun 17 - Jun 23',
  },
  {
    id: 'aerodactyl',
    name: 'Aerodactyl',
    tier: '3-star',
    types: ['Rock', 'Flying'],
    cp: '1515 - 1590',
    boostedCp: '1894 - 1988',
    weather: ['Partly Cloudy', 'Windy'],
    window: 'Jun 17 - Jun 23',
  },
  {
    id: 'druddigon',
    name: 'Druddigon',
    tier: '3-star',
    types: ['Dragon'],
    cp: '1487 - 1561',
    boostedCp: '1859 - 1951',
    weather: ['Windy'],
    window: 'Jun 17 - Jun 23',
  },
  {
    id: 'hisuian-decidueye',
    name: 'Hisuian Decidueye',
    tier: '3-star',
    types: ['Grass', 'Fighting'],
    cp: '1579 - 1655',
    boostedCp: '1974 - 2069',
    weather: ['Sunny', 'Cloudy'],
    window: 'Jun 17 - Jun 23',
  },
  {
    id: 'necrozma-boss',
    name: 'Necrozma',
    tier: '5-star',
    types: ['Psychic'],
    cp: '2018 - 2104',
    boostedCp: '2522 - 2630',
    weather: ['Windy'],
    window: 'Jun 17 - Jun 23',
  },
  {
    id: 'mega-scizor-boss',
    name: 'Mega Scizor',
    tier: 'Mega',
    types: ['Bug', 'Steel'],
    cp: '1636 - 1714',
    boostedCp: '2046 - 2143',
    weather: ['Rainy', 'Snow'],
    window: 'Jun 17 - Jun 24',
  },
  {
    id: 'shadow-horsea',
    name: 'Shadow Horsea',
    tier: 'Shadow 1-star',
    types: ['Water'],
    cp: '522 - 603',
    boostedCp: '653 - 754',
    weather: ['Rainy'],
    window: 'Jun 2 - Jun 30',
  },
  {
    id: 'shadow-porygon',
    name: 'Shadow Porygon',
    tier: 'Shadow 1-star',
    types: ['Normal'],
    cp: '879 - 982',
    boostedCp: '1098 - 1228',
    weather: ['Partly Cloudy'],
    window: 'Jun 2 - Jun 30',
  },
  {
    id: 'shadow-beldum',
    name: 'Shadow Beldum',
    tier: 'Shadow 1-star',
    types: ['Steel', 'Psychic'],
    cp: '480 - 558',
    boostedCp: '600 - 697',
    weather: ['Snow', 'Windy'],
    window: 'Jun 2 - Jun 30',
  },
  {
    id: 'shadow-golett',
    name: 'Shadow Golett',
    tier: 'Shadow 1-star',
    types: ['Ground', 'Ghost'],
    cp: '592 - 679',
    boostedCp: '740 - 849',
    weather: ['Sunny', 'Fog'],
    window: 'Jun 2 - Jun 30',
  },
  {
    id: 'shadow-alolan-marowak',
    name: 'Shadow Alolan Marowak',
    tier: 'Shadow 3-star',
    types: ['Fire', 'Ghost'],
    cp: '941 - 1048',
    boostedCp: '1176 - 1311',
    weather: ['Sunny', 'Fog'],
    window: 'Jun 2 - Jun 30',
  },
  {
    id: 'shadow-hitmonlee',
    name: 'Shadow Hitmonlee',
    tier: 'Shadow 3-star',
    types: ['Fighting'],
    cp: '1342 - 1472',
    boostedCp: '1677 - 1840',
    weather: ['Cloudy'],
    window: 'Jun 2 - Jun 30',
  },
  {
    id: 'shadow-gligar',
    name: 'Shadow Gligar',
    tier: 'Shadow 3-star',
    types: ['Ground', 'Flying'],
    cp: '952 - 1061',
    boostedCp: '1191 - 1326',
    weather: ['Sunny', 'Windy'],
    window: 'Jun 2 - Jun 30',
  },
  {
    id: 'shadow-dialga-boss',
    name: 'Shadow Dialga',
    tier: 'Shadow 5-star',
    types: ['Steel', 'Dragon'],
    cp: '2145 - 2307',
    boostedCp: '2682 - 2884',
    weather: ['Snow', 'Windy'],
    window: 'Jun 2 - Jun 30',
  },
]

export const searchStrings: SearchString[] = [
  {
    id: 'storage-cleanup',
    title: 'Storage cleanup',
    category: 'Cleanup',
    string: '0*,1*,2*&!favorite&!shiny&!legendary&!mythical&!ultra beasts&!costume',
    note: 'Low appraisal review with common keepers excluded.',
  },
  {
    id: 'new-catches',
    title: 'New catches review',
    category: 'Cleanup',
    string: 'age0-7&!favorite&!shiny&!legendary&!mythical',
    note: 'Recent catches that still need a manual keep or transfer decision.',
  },
  {
    id: 'perfects',
    title: 'Perfect IVs',
    category: 'IV',
    string: '4*',
    note: 'Fast hundo check.',
  },
  {
    id: 'nundos',
    title: 'Nundo check',
    category: 'IV',
    string: '0attack&0defense&0hp',
    note: 'Collectors often keep these.',
  },
  {
    id: 'great-league',
    title: 'Great League PvP check',
    category: 'PvP',
    string: '0-1attack&3-4defense&3-4hp&cp-1500',
    note: 'Low Attack, high bulk candidates under 1500 CP.',
  },
  {
    id: 'ultra-league',
    title: 'Ultra League PvP check',
    category: 'PvP',
    string: '0-1attack&3-4defense&3-4hp&cp-2500',
    note: 'Low Attack, high bulk candidates under 2500 CP.',
  },
  {
    id: 'distance-trades',
    title: 'Distance trades',
    category: 'Trade',
    string: 'distance100-',
    note: 'Good for XL candy distance trades.',
  },
  {
    id: 'evolve-queue',
    title: 'Evolve queue',
    category: 'Cleanup',
    string: 'evolve&!favorite&!shiny',
    note: 'Mass-evolve candidates after favorites and shinies are excluded.',
  },
  {
    id: 'dark-ghost-raiders',
    title: 'Dark/Ghost raid prep',
    category: 'Raid prep',
    string: '@dark,@ghost&3*,4*',
    note: 'Useful for Necrozma-style Psychic raid targets.',
  },
  {
    id: 'fire-raiders',
    title: 'Fire raid prep',
    category: 'Raid prep',
    string: '@fire&3*,4*',
    note: 'Quick Fire roster for Mega Scizor.',
  },
  {
    id: 'fighting-ground-raiders',
    title: 'Fighting/Ground raid prep',
    category: 'Raid prep',
    string: '@fighting,@ground&3*,4*',
    note: 'Useful for Shadow Dialga.',
  },
  {
    id: 'frigibax-check',
    title: 'Frigibax keeps',
    category: 'Event',
    string: 'frigibax&3*,4*,shiny',
    note: 'Post-Community Day review string.',
  },
  {
    id: 'sobble-prep',
    title: 'Sobble Community Day',
    category: 'Event',
    string: 'sobble&3*,4*,shiny',
    note: 'Save for July Community Day catches.',
  },
]

export const dailyDiscoveries = [
  {
    day: 'Sunday',
    title: 'Scenic Sunday',
    summary: 'More Route spawns, stronger Route Incense, reduced Buddy Candy distance, and Mateo up to three times.',
  },
  {
    day: 'Monday',
    title: 'Max Monday',
    summary: 'More active Power Spots, faster refreshes, and rotating Dynamax Pokemon from 6:00 AM to 9:00 PM.',
  },
  {
    day: 'Tuesday',
    title: 'Showcase Tuesday',
    summary: 'Enter up to five PokeStop Showcases.',
  },
]

export const checklistItems = [
  'Claim free box',
  'Send and open gifts',
  'Use Daily Adventure Incense',
  'Check local raids',
  'Review new catches',
  'Walk a Route',
]

export const quickLinks = [
  {
    label: 'Official events',
    url: 'https://pokemongo.com/events',
  },
  {
    label: 'Official map',
    url: 'https://pokemongo.com/map',
  },
  {
    label: 'Leek Duck event list',
    url: 'https://leekduck.com/events/',
  },
  {
    label: 'Current raid bosses',
    url: 'https://leekduck.com/raid-bosses/',
  },
  {
    label: 'Promo code redemption',
    url: 'https://store.pokemongo.com/offer-redemption',
  },
]
