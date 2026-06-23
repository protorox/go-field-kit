import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Clipboard,
  Copy,
  ExternalLink,
  Flame,
  Gift,
  Home,
  ListFilter,
  MapPinned,
  Menu,
  Radar,
  Route,
  Search,
  Settings,
  Shield,
  Sparkles,
  Swords,
  Timer,
  Trophy,
  Wrench,
  X,
} from 'lucide-react'
import './App.css'
import {
  checklistItems,
  dailyDiscoveries,
  dataSnapshot,
  eventCategories,
  events,
  featuredRaids,
  quickLinks,
  raidBosses,
  searchStrings,
  type EventCategory,
  type EventItem,
  type NavKey,
  type RaidBoss,
  type SearchString,
} from './data'

type EventStatus = 'live' | 'upcoming' | 'done'

const navItems: { id: NavKey; label: string; icon: typeof Home }[] = [
  { id: 'today', label: 'Today', icon: Home },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'raids', label: 'Raids', icon: Radar },
  { id: 'strings', label: 'Strings', icon: Search },
  { id: 'tools', label: 'Tools', icon: Wrench },
]

const stringCategories = ['All', 'Cleanup', 'IV', 'PvP', 'Raid prep', 'Trade', 'Event'] as const

function App() {
  const [activeNav, setActiveNav] = useState<NavKey>('today')
  const [category, setCategory] = useState<'all' | EventCategory>('all')
  const [stringCategory, setStringCategory] = useState<(typeof stringCategories)[number]>('All')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [checked, setChecked] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('go-field-kit-checklist') || '[]') as string[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('go-field-kit-checklist', JSON.stringify(checked))
  }, [checked])

  const todayDiscovery = useMemo(() => {
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date())
    return dailyDiscoveries.find((item) => item.day === dayName) ?? dailyDiscoveries[0]
  }, [])

  const liveEvents = useMemo(() => events.filter((event) => eventStatus(event) === 'live'), [])
  const nextEvents = useMemo(
    () =>
      events
        .filter((event) => eventStatus(event) !== 'done')
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()),
    [],
  )
  const upcomingEvents = useMemo(
    () =>
      events
        .filter((event) => eventStatus(event) === 'upcoming')
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()),
    [],
  )

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => category === 'all' || event.category === category)
      .filter((event) => matchesQuery([event.title, event.summary, event.tag], query))
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
  }, [category, query])

  const filteredStrings = useMemo(() => {
    return searchStrings.filter((item) => {
      const categoryMatch = stringCategory === 'All' || item.category === stringCategory
      return categoryMatch && matchesQuery([item.title, item.note, item.string, item.category], query)
    })
  }, [query, stringCategory])

  const filteredRaidBosses = useMemo(
    () => raidBosses.filter((boss) => matchesQuery([boss.name, boss.tier, ...boss.types, boss.window], query)),
    [query],
  )

  async function handleCopy(item: SearchString) {
    await copyText(item.string)
    setCopiedId(item.id)
    window.setTimeout(() => setCopiedId((current) => (current === item.id ? null : current)), 1600)
  }

  function toggleChecklist(item: string) {
    setChecked((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item],
    )
  }

  return (
    <div className="app-shell">
      <aside className="side-nav" aria-label="Main navigation">
        <div className="brand-mark" aria-hidden="true">
          <Sparkles size={20} />
        </div>
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            active={activeNav === item.id}
            onClick={() => setActiveNav(item.id)}
            compact
          />
        ))}
      </aside>

      <main className="app-main">
        <header className="topbar">
          <button className="icon-button" type="button" aria-label="Open menu">
            <Menu size={23} />
          </button>

          <div className="app-title">
            <h1>GO Field Kit</h1>
            <p>
              <span className="status-dot" aria-hidden="true" />
              {dataSnapshot.label}
            </p>
          </div>

          <div className="top-actions">
            <button
              className="icon-button"
              type="button"
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              onClick={() => setSearchOpen((current) => !current)}
            >
              {searchOpen ? <X size={22} /> : <Search size={22} />}
            </button>
            <button className="icon-button" type="button" aria-label="Settings">
              <Settings size={22} />
            </button>
          </div>
        </header>

        {searchOpen ? (
          <div className="search-bar">
            <Search size={18} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search events, raids, strings"
              autoFocus
            />
            {query ? (
              <button type="button" className="text-button" onClick={() => setQuery('')}>
                Clear
              </button>
            ) : null}
          </div>
        ) : null}

        <div className="content-area">
          {activeNav === 'today' ? (
            <TodayScreen
              todayDiscovery={todayDiscovery}
              liveEvents={liveEvents}
              nextEvents={nextEvents}
              upcomingEvents={upcomingEvents}
              checked={checked}
              onToggleChecklist={toggleChecklist}
              onJump={setActiveNav}
              onCopy={handleCopy}
              copiedId={copiedId}
            />
          ) : null}
          {activeNav === 'calendar' ? (
            <CalendarScreen category={category} events={filteredEvents} onCategoryChange={setCategory} />
          ) : null}
          {activeNav === 'raids' ? <RaidsScreen bosses={filteredRaidBosses} /> : null}
          {activeNav === 'strings' ? (
            <StringsScreen
              category={stringCategory}
              items={filteredStrings}
              copiedId={copiedId}
              onCategoryChange={setStringCategory}
              onCopy={handleCopy}
            />
          ) : null}
          {activeNav === 'tools' ? (
            <ToolsScreen checked={checked} onToggleChecklist={toggleChecklist} onJump={setActiveNav} />
          ) : null}
        </div>
      </main>

      <nav className="bottom-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavButton key={item.id} item={item} active={activeNav === item.id} onClick={() => setActiveNav(item.id)} />
        ))}
      </nav>
    </div>
  )
}

function TodayScreen({
  todayDiscovery,
  liveEvents,
  nextEvents,
  upcomingEvents,
  checked,
  onToggleChecklist,
  onJump,
  onCopy,
  copiedId,
}: {
  todayDiscovery: (typeof dailyDiscoveries)[number]
  liveEvents: EventItem[]
  nextEvents: EventItem[]
  upcomingEvents: EventItem[]
  checked: string[]
  onToggleChecklist: (item: string) => void
  onJump: (nav: NavKey) => void
  onCopy: (item: SearchString) => void
  copiedId: string | null
}) {
  const priorityStrings = searchStrings.filter((item) =>
    ['storage-cleanup', 'great-league', 'distance-trades'].includes(item.id),
  )

  return (
    <>
      <section className="today-panel">
        <div className="today-copy">
          <span className="section-kicker">Today</span>
          <h2>{todayDiscovery.title}</h2>
          <p>{todayDiscovery.summary}</p>
        </div>
        <div className="today-stats" aria-label="Today stats">
          <Metric icon={Route} label="Live events" value={String(liveEvents.length)} tone="teal" />
          <Metric icon={Timer} label="Next up" value={daysUntil(upcomingEvents[0]?.start)} tone="yellow" />
        </div>
      </section>

      <SectionHeader title="Raid Watch" action="View all" onAction={() => onJump('raids')} />
      <div className="featured-raid-grid">
        {featuredRaids.map((raid) => (
          <article className="raid-card" key={raid.id}>
            <div className="raid-card-top">
              <span className={`tier-badge tier-${raid.tier.toLowerCase().replaceAll(' ', '-')}`}>{raid.tier}</span>
              <span className="time-chip">{raid.activeUntil}</span>
            </div>
            <h3>{raid.name}</h3>
            <p>{raid.note}</p>
            <div className="weakness-row">
              {raid.weaknesses.map((type) => (
                <span key={type}>{type}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <SectionHeader title="Event Timeline" action="Calendar" onAction={() => onJump('calendar')} />
      <div className="timeline-panel">
        {nextEvents.slice(0, 5).map((event) => (
          <EventRow key={event.id} event={event} />
        ))}
      </div>

      <SectionHeader title="Search Strings" action="See all" onAction={() => onJump('strings')} />
      <div className="string-panel">
        {priorityStrings.map((item) => (
          <StringRow key={item.id} item={item} copied={copiedId === item.id} onCopy={onCopy} />
        ))}
      </div>

      <SectionHeader title="Field Checklist" action="Tools" onAction={() => onJump('tools')} />
      <Checklist checked={checked} onToggle={onToggleChecklist} compact />
    </>
  )
}

function CalendarScreen({
  category,
  events: filteredEvents,
  onCategoryChange,
}: {
  category: 'all' | EventCategory
  events: EventItem[]
  onCategoryChange: (category: 'all' | EventCategory) => void
}) {
  return (
    <>
      <ScreenHeading icon={CalendarDays} title="Event Calendar" subtitle="Local-time dates from the current snapshot." />

      <div className="segmented-control" aria-label="Filter events">
        {eventCategories.map((item) => (
          <button
            key={item.id}
            className={category === item.id ? 'active' : ''}
            type="button"
            onClick={() => onCategoryChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="timeline-panel expanded">
        {filteredEvents.map((event) => (
          <EventRow key={event.id} event={event} showSource />
        ))}
      </div>
    </>
  )
}

function RaidsScreen({ bosses }: { bosses: RaidBoss[] }) {
  const grouped = groupBy(bosses, (boss) => boss.tier)

  return (
    <>
      <ScreenHeading icon={Radar} title="Raid Board" subtitle="Current bosses, CP windows, and counter notes." />

      <div className="featured-raid-grid">
        {featuredRaids.map((raid) => (
          <article className="raid-card elevated" key={raid.id}>
            <div className="raid-card-top">
              <span className="tier-badge">{raid.tier}</span>
              <Shield size={18} aria-hidden="true" />
            </div>
            <h3>{raid.name}</h3>
            <p>{raid.note}</p>
            <div className="weakness-row">
              {raid.weaknesses.map((type) => (
                <span key={type}>{type}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {Object.entries(grouped).map(([tier, tierBosses]) => (
        <section className="boss-group" key={tier}>
          <SectionHeader title={tier} />
          <div className="boss-list">
            {tierBosses.map((boss) => (
              <article className="boss-row" key={boss.id}>
                <div className="boss-main">
                  <h3>{boss.name}</h3>
                  <p>{boss.types.join(' / ')}</p>
                </div>
                <div className="boss-meta">
                  <span>{boss.cp}</span>
                  <small>Boosted {boss.boostedCp}</small>
                </div>
                <div className="weather-list" aria-label={`${boss.name} weather boosts`}>
                  {boss.weather.map((weather) => (
                    <span key={weather}>{weather}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}

function StringsScreen({
  category,
  items,
  copiedId,
  onCategoryChange,
  onCopy,
}: {
  category: (typeof stringCategories)[number]
  items: SearchString[]
  copiedId: string | null
  onCategoryChange: (category: (typeof stringCategories)[number]) => void
  onCopy: (item: SearchString) => void
}) {
  return (
    <>
      <ScreenHeading icon={Clipboard} title="Search Strings" subtitle="Tap copy, paste into Pokemon GO search." />

      <div className="segmented-control wrap" aria-label="Filter strings">
        {stringCategories.map((item) => (
          <button
            key={item}
            className={category === item ? 'active' : ''}
            type="button"
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="string-panel expanded">
        {items.map((item) => (
          <StringRow key={item.id} item={item} copied={copiedId === item.id} onCopy={onCopy} />
        ))}
      </div>
    </>
  )
}

function ToolsScreen({
  checked,
  onToggleChecklist,
  onJump,
}: {
  checked: string[]
  onToggleChecklist: (item: string) => void
  onJump: (nav: NavKey) => void
}) {
  return (
    <>
      <ScreenHeading icon={Wrench} title="Tools" subtitle="Daily actions, source links, and pocket references." />

      <SectionHeader title="Daily Discoveries" />
      <div className="discovery-grid">
        {dailyDiscoveries.map((item) => (
          <article className="discovery-card" key={item.day}>
            <span>{item.day}</span>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>

      <SectionHeader title="Field Checklist" />
      <Checklist checked={checked} onToggle={onToggleChecklist} />

      <SectionHeader title="Quick Links" />
      <div className="link-grid">
        {quickLinks.map((link) => (
          <a key={link.url} className="quick-link" href={link.url} target="_blank" rel="noreferrer">
            <span>{link.label}</span>
            <ExternalLink size={17} aria-hidden="true" />
          </a>
        ))}
      </div>

      <SectionHeader title="Pocket Counters" action="Raid board" onAction={() => onJump('raids')} />
      <div className="counter-strip">
        {featuredRaids.map((raid) => (
          <div className="counter-card" key={raid.id}>
            <span>{raid.name}</span>
            <strong>{raid.weaknesses.join(' / ')}</strong>
          </div>
        ))}
      </div>

      <SourcePanel />
    </>
  )
}

function NavButton({
  item,
  active,
  onClick,
  compact = false,
}: {
  item: (typeof navItems)[number]
  active: boolean
  onClick: () => void
  compact?: boolean
}) {
  const Icon = item.icon
  return (
    <button className={`nav-button ${active ? 'active' : ''} ${compact ? 'compact' : ''}`} type="button" onClick={onClick}>
      <Icon size={compact ? 21 : 22} aria-hidden="true" />
      <span>{item.label}</span>
    </button>
  )
}

function SectionHeader({
  title,
  action,
  onAction,
}: {
  title: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {action ? (
        <button type="button" onClick={onAction} className="inline-action">
          {action}
          <ChevronRight size={17} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  )
}

function ScreenHeading({ icon: Icon, title, subtitle }: { icon: typeof Home; title: string; subtitle: string }) {
  return (
    <div className="screen-heading">
      <div className="heading-icon" aria-hidden="true">
        <Icon size={22} />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

function Metric({ icon: Icon, label, value, tone }: { icon: typeof Home; label: string; value: string; tone: string }) {
  return (
    <div className={`metric metric-${tone}`}>
      <Icon size={18} aria-hidden="true" />
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  )
}

function EventRow({ event, showSource = false }: { event: EventItem; showSource?: boolean }) {
  const status = eventStatus(event)
  return (
    <article className={`event-row status-${status}`}>
      <div className="timeline-dot" aria-hidden="true">
        {eventIcon(event.category)}
      </div>
      <div className="event-date">
        <span>{event.timeLabel}</span>
        <small>{statusLabel(status, event)}</small>
      </div>
      <div className="event-details">
        <div>
          <h3>{event.title}</h3>
          <p>{event.summary}</p>
        </div>
        {showSource ? (
          <a href={event.sourceUrl} target="_blank" rel="noreferrer" aria-label={`${event.title} source`}>
            {event.sourceName}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        ) : (
          <ChevronRight size={18} aria-hidden="true" />
        )}
      </div>
    </article>
  )
}

function StringRow({
  item,
  copied,
  onCopy,
}: {
  item: SearchString
  copied: boolean
  onCopy: (item: SearchString) => void
}) {
  return (
    <article className="string-row">
      <div className="string-icon" aria-hidden="true">
        {stringIcon(item.category)}
      </div>
      <div className="string-copy">
        <div className="string-title-line">
          <h3>{item.title}</h3>
          <span>{item.category}</span>
        </div>
        <code>{item.string}</code>
        <p>{item.note}</p>
      </div>
      <button className={`copy-button ${copied ? 'copied' : ''}`} type="button" onClick={() => onCopy(item)}>
        {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </article>
  )
}

function Checklist({
  checked,
  onToggle,
  compact = false,
}: {
  checked: string[]
  onToggle: (item: string) => void
  compact?: boolean
}) {
  return (
    <div className={`checklist ${compact ? 'compact' : ''}`}>
      {checklistItems.map((item) => {
        const done = checked.includes(item)
        return (
          <button className={done ? 'done' : ''} type="button" key={item} onClick={() => onToggle(item)}>
            <span className="checkbox">{done ? <Check size={16} aria-hidden="true" /> : null}</span>
            <span>{item}</span>
          </button>
        )
      })}
    </div>
  )
}

function SourcePanel() {
  return (
    <section className="source-panel">
      <div>
        <h2>Snapshot Sources</h2>
        <p>{dataSnapshot.detail}</p>
      </div>
      <div>
        {dataSnapshot.sources.map((source) => (
          <a href={source.url} key={source.url} target="_blank" rel="noreferrer">
            {source.label}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  )
}

function eventStatus(event: EventItem): EventStatus {
  const now = new Date()
  const start = new Date(event.start)
  const end = new Date(event.end)

  if (now < start) {
    return 'upcoming'
  }

  if (now <= end) {
    return 'live'
  }

  return 'done'
}

function statusLabel(status: EventStatus, event: EventItem) {
  if (status === 'live') {
    return 'Live now'
  }

  if (status === 'upcoming') {
    return `Starts ${daysUntil(event.start)}`
  }

  return 'Done'
}

function daysUntil(dateString: string | undefined) {
  if (!dateString) {
    return 'soon'
  }

  const start = new Date(dateString)
  const now = new Date()
  const diff = start.getTime() - now.getTime()
  const days = Math.ceil(diff / 86_400_000)

  if (days <= 0) {
    return 'today'
  }

  if (days === 1) {
    return 'tomorrow'
  }

  return `${days} days`
}

function matchesQuery(values: string[], query: string) {
  const cleanQuery = query.trim().toLowerCase()

  if (!cleanQuery) {
    return true
  }

  return values.join(' ').toLowerCase().includes(cleanQuery)
}

function groupBy<T>(items: T[], getKey: (item: T) => string) {
  return items.reduce<Record<string, T[]>>((accumulator, item) => {
    const key = getKey(item)
    accumulator[key] = accumulator[key] ? [...accumulator[key], item] : [item]
    return accumulator
  }, {})
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

function eventIcon(category: EventCategory) {
  const icons: Record<EventCategory, ReactNode> = {
    event: <Sparkles size={18} />,
    community: <Trophy size={18} />,
    raid: <Swords size={18} />,
    spotlight: <Bell size={18} />,
    max: <Flame size={18} />,
    battle: <Shield size={18} />,
    season: <CalendarDays size={18} />,
  }

  return icons[category]
}

function stringIcon(category: SearchString['category']) {
  const icons: Record<SearchString['category'], ReactNode> = {
    Cleanup: <ListFilter size={20} />,
    IV: <Sparkles size={20} />,
    PvP: <Swords size={20} />,
    'Raid prep': <Radar size={20} />,
    Trade: <Gift size={20} />,
    Event: <MapPinned size={20} />,
  }

  return icons[category]
}

export default App
