import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BookOpen,
  ChevronRight,
  Crown,
  Camera,
  Film,
  Flame,
  Gem,
  Globe,
  Heart,
  Mail,
  Menu,
  MessageCircle,
  Play,
  Search,
  Send,
  Shield,
  Sparkles,
  Star,
  Swords,
  UserRound,
  Users,
  X,
} from "lucide-react";

const animeList = [
  {
    id: "violet-eclipse",
    title: "Violet Eclipse",
    genre: "Fantasy",
    rating: 9.8,
    year: "2026",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
    banner: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
    description:
      "A royal spellblade crosses a moonlit empire to reclaim a stolen constellation before dawn erases magic forever.",
  },
  {
    id: "neon-shogun",
    title: "Neon Shogun",
    genre: "Action",
    rating: 9.6,
    year: "2025",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=80",
    banner: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1800&q=80",
    description:
      "Blade clans and cybernetic heirs collide under a rain-soaked capital ruled by honor, debt, and neon light.",
  },
  {
    id: "silver-orbit",
    title: "Silver Orbit",
    genre: "Sci-Fi",
    rating: 9.4,
    year: "2024",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80",
    banner: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1800&q=80",
    description:
      "An elite academy aboard Saturn trains pilots who can hear the memories of extinct stars.",
  },
  {
    id: "rose-samurai",
    title: "Rose Samurai",
    genre: "Drama",
    rating: 9.2,
    year: "2023",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=900&q=80",
    banner: "https://images.unsplash.com/photo-1505069446780-4ef442b5207f?auto=format&fit=crop&w=1800&q=80",
    description:
      "A forbidden duelist becomes the secret guardian of a dynasty that fears her name and needs her sword.",
  },
  {
    id: "midnight-idol",
    title: "Midnight Idol",
    genre: "Music",
    rating: 8.9,
    year: "2025",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
    banner: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1800&q=80",
    description:
      "A secretive singer turns every midnight concert into a ritual that wakes impossible memories in her audience.",
  },
  {
    id: "oracle-garden",
    title: "Oracle Garden",
    genre: "Mystery",
    rating: 8.8,
    year: "2024",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
    banner: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=80",
    description:
      "Students at a secluded conservatory solve prophecies hidden in flowers before the garden chooses its next victim.",
  },
];

const characters = [
  { name: "Aurelia Kaen", role: "Moon Crown Heir", anime: "Violet Eclipse", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80", bio: "Elegant, ruthless, and bound to a celestial blade that burns with violet fire." },
  { name: "Ren Kurosai", role: "Neon Ronin", anime: "Neon Shogun", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80", bio: "A fallen clan prodigy who trades courtly privilege for a city of dangerous contracts." },
  { name: "Mira Sol", role: "Orbit Listener", anime: "Silver Orbit", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80", bio: "A cadet who can translate starlight into warnings, lullabies, and secrets." },
  { name: "Sena Akabane", role: "Rose Duelist", anime: "Rose Samurai", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=700&q=80", bio: "The calmest sword in the empire, hiding a heart that refuses to kneel." },
];

const genres = ["All", "Action", "Fantasy", "Sci-Fi", "Drama", "Music", "Mystery"];

const news = [
  { title: "Violet Eclipse reveals its final arc visual", tag: "Premiere", date: "Feb 18, 2026", image: "https://images.unsplash.com/photo-1527269534026-c86f4009eace?auto=format&fit=crop&w=900&q=80" },
  { title: "Neon Shogun composer announces live symphonic tour", tag: "Music", date: "Mar 02, 2026", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80" },
  { title: "Silver Orbit studio opens limited concept gallery", tag: "Culture", date: "Mar 15, 2026", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80" },
];

const communityPosts = [
  { user: "Mika", title: "Best opening sequence this season?", body: "Violet Eclipse feels like a theater curtain rising over a war dream.", likes: 128, comments: 24 },
  { user: "Jun", title: "Theory: Ren never left the clan", body: "Episode 7 has a gold crest hidden in the reflection. I need answers.", likes: 93, comments: 31 },
  { user: "Luna", title: "Midnight Idol stage lighting appreciation", body: "The purple and gold palette makes every performance look like a royal hallucination.", likes: 156, comments: 18 },
];

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/catalog", label: "Catalog" },
  { path: "/characters", label: "Characters" },
  { path: "/genres", label: "Genres" },
  { path: "/rankings", label: "Rankings" },
  { path: "/news", label: "News" },
  { path: "/community", label: "Community" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const pageMotion = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
  transition: { duration: 0.45, ease: "easeOut" },
};

function LuxuryButton({ children, to, variant = "primary" }) {
  const classes =
    variant === "primary"
      ? "bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-200 text-black shadow-lg shadow-amber-500/20"
      : "border border-white/15 bg-white/5 text-white backdrop-blur-xl hover:border-amber-300/50";

  return (
    <Link to={to} className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${classes}`}>
      {children}
      <ChevronRight size={16} />
    </Link>
  );
}

function Section({ eyebrow, title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10"
    >
      <div className="mb-9 max-w-2xl">
        {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80">{eyebrow}</p>}
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function AnimeCard({ anime, featured = false }) {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-xl">
      <Link to={`/anime/${anime.id}`}>
        <div className={featured ? "relative h-96" : "relative h-72"}>
          <img src={anime.image} alt={anime.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="mb-3 flex items-center justify-between text-xs text-white/70">
              <span className="rounded-full border border-amber-300/30 bg-black/35 px-3 py-1 text-amber-200 backdrop-blur-md">{anime.genre}</span>
              <span className="flex items-center gap-1"><Star size={14} className="fill-amber-300 text-amber-300" /> {anime.rating}</span>
            </div>
            <h3 className="text-2xl font-semibold text-white">{anime.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/65">{anime.description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${scrolled || open ? "border-b border-white/10 bg-black/80 shadow-2xl shadow-purple-950/30 backdrop-blur-2xl" : "bg-transparent"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-purple-800 via-black to-amber-300 text-amber-200 ring-1 ring-amber-200/30">
            <Crown size={22} />
          </span>
          <span className="font-serif text-2xl font-semibold tracking-wide text-white">Aurelia Anime</span>
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={({ isActive }) => `text-sm font-medium transition ${isActive ? "text-amber-300" : "text-white/68 hover:text-white"}`}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <button onClick={() => setOpen((value) => !value)} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white lg:hidden" aria-label="Toggle menu">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden lg:hidden">
            <div className="grid gap-2 px-5 pb-5 sm:px-8">
              {navLinks.map((link) => (
                <NavLink key={link.path} to={link.path} className={({ isActive }) => `rounded-2xl px-4 py-3 text-sm ${isActive ? "bg-amber-300 text-black" : "bg-white/5 text-white/80"}`}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/70 px-5 py-12 backdrop-blur-2xl sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3 text-white">
            <Crown className="text-amber-300" />
            <span className="font-serif text-2xl font-semibold">Aurelia Anime</span>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/60">A cinematic sanctuary for premium anime discovery, rankings, characters, and community rituals beneath a violet-gold night.</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-amber-200">Social</h3>
          <div className="flex gap-3">
            {[Camera, Globe, Film].map((Icon, index) => (
              <a key={index} href="#" className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition hover:border-amber-300/50 hover:text-amber-300">
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-amber-200">Newsletter</h3>
          <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <input className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/35" placeholder="Your email" />
            <button className="bg-amber-300 px-4 text-black"><Send size={18} /></button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <motion.main {...pageMotion}>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=2200&q=85" alt="Cinematic neon city" className="h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-purple-950/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(245,158,11,0.22),transparent_28%),radial-gradient(circle_at_25%_65%,rgba(88,28,135,0.5),transparent_35%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.45em] text-amber-300">Aurelia Anime</p>
            <motion.h1 initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 1.1, delay: 0.15 }} className="font-serif text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Enter the World of Anime
            </motion.h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">Streamline your next obsession through curated sagas, prestige rankings, character dossiers, and a community built for after-midnight theories.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <LuxuryButton to="/catalog"><Play size={17} /> Explore Catalog</LuxuryButton>
              <LuxuryButton to="/rankings" variant="secondary"><Award size={17} /> View Rankings</LuxuryButton>
            </div>
          </motion.div>
        </div>
      </section>

      <Section eyebrow="Featured" title="Prestige selections for the season">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {animeList.slice(0, 3).map((anime) => <AnimeCard anime={anime} key={anime.id} featured />)}
        </div>
      </Section>

      <Section eyebrow="Trending" title="What the night court is watching">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {animeList.slice(3).map((anime) => <AnimeCard anime={anime} key={anime.id} />)}
        </div>
      </Section>
    </motion.main>
  );
}

function CatalogPage() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const filtered = animeList.filter((anime) => (genre === "All" || anime.genre === genre) && anime.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <motion.main {...pageMotion} className="pt-24">
      <Section eyebrow="Catalog" title="Search the gilded archive">
        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-white backdrop-blur-xl">
            <Search className="text-amber-300" size={20} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search anime titles" className="w-full bg-transparent text-sm outline-none placeholder:text-white/35" />
          </label>
          <div className="flex flex-wrap gap-2">
            {genres.map((item) => (
              <button key={item} onClick={() => setGenre(item)} className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${genre === item ? "bg-amber-300 text-black" : "border border-white/10 bg-white/5 text-white/70 hover:text-white"}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((anime) => <AnimeCard anime={anime} key={anime.id} />)}
        </div>
      </Section>
    </motion.main>
  );
}

function AnimeDetailsPage() {
  const { id } = useParams();
  const anime = animeList.find((item) => item.id === id) || animeList[0];
  const episodes = Array.from({ length: 8 }, (_, index) => `Episode ${String(index + 1).padStart(2, "0")} - ${["Crownfall", "Velvet Rain", "The Hidden Gate", "Gold Ashes", "Moon Duel", "Memory Opera", "Silent Empire", "Dawn Contract"][index]}`);

  return (
    <motion.main {...pageMotion} className="pt-20">
      <section className="relative min-h-[72vh] overflow-hidden">
        <img src={anime.banner} alt={anime.title} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-end px-5 pb-16 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <span className="rounded-full border border-amber-300/30 bg-black/30 px-4 py-2 text-sm text-amber-200 backdrop-blur-xl">{anime.genre} • {anime.year}</span>
            <h1 className="mt-6 font-serif text-5xl font-semibold text-white sm:text-7xl">{anime.title}</h1>
            <div className="mt-5 flex items-center gap-4 text-white/75">
              <span className="flex items-center gap-2 text-amber-300"><Star className="fill-amber-300" size={20} /> {anime.rating}</span>
              <span>Prestige Edition</span>
            </div>
            <p className="mt-6 text-lg leading-8 text-white/72">{anime.description}</p>
          </div>
        </div>
      </section>
      <Section eyebrow="Episodes" title="Season one watchlist">
        <div className="grid gap-3">
          {episodes.map((episode, index) => (
            <motion.div whileHover={{ x: 8 }} key={episode} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4 text-white backdrop-blur-xl">
              <span>{episode}</span>
              <span className="text-sm text-amber-200">{24 + index} min</span>
            </motion.div>
          ))}
        </div>
      </Section>
    </motion.main>
  );
}

function CharactersPage() {
  const [selected, setSelected] = useState(null);

  return (
    <motion.main {...pageMotion} className="pt-24">
      <Section eyebrow="Characters" title="Icons of the violet court">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {characters.map((character) => (
            <motion.button whileHover={{ y: -8 }} key={character.name} onClick={() => setSelected(character)} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] text-left backdrop-blur-xl">
              <img src={character.image} alt={character.name} className="h-80 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-white">{character.name}</h3>
                <p className="mt-1 text-sm text-amber-200">{character.role}</p>
                <p className="mt-3 text-sm text-white/55">{character.anime}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-black/75 px-5 backdrop-blur-xl" onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.92, y: 25 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 25 }} onClick={(event) => event.stopPropagation()} className="max-w-lg overflow-hidden rounded-2xl border border-amber-300/20 bg-zinc-950 text-white shadow-2xl shadow-purple-950/40">
              <img src={selected.image} alt={selected.name} className="h-80 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-3xl font-semibold">{selected.name}</h3>
                    <p className="mt-1 text-amber-200">{selected.role}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="rounded-full bg-white/10 p-2"><X size={18} /></button>
                </div>
                <p className="mt-5 leading-7 text-white/65">{selected.bio}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

function GenresPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? animeList : animeList.filter((anime) => anime.genre === active);

  return (
    <motion.main {...pageMotion} className="pt-24">
      <Section eyebrow="Genres" title="Choose a mood, reveal a saga">
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {genres.map((genre) => (
            <motion.button whileHover={{ scale: 1.03 }} key={genre} onClick={() => setActive(genre)} className={`rounded-2xl border p-6 text-left transition ${active === genre ? "border-amber-300 bg-amber-300 text-black" : "border-white/10 bg-white/[0.045] text-white backdrop-blur-xl"}`}>
              <Sparkles className={active === genre ? "text-black" : "text-amber-300"} />
              <h3 className="mt-5 text-2xl font-semibold">{genre}</h3>
              <p className={`mt-2 text-sm ${active === genre ? "text-black/65" : "text-white/55"}`}>{genre === "All" ? "Every premium title" : `Curated ${genre.toLowerCase()} selections`}</p>
            </motion.button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((anime) => <AnimeCard anime={anime} key={anime.id} />)}
        </div>
      </Section>
    </motion.main>
  );
}

function TopRankingsPage() {
  const rankings = [...animeList, ...animeList.slice(0, 4)].slice(0, 10).map((anime, index) => ({ ...anime, rank: index + 1 }));

  return (
    <motion.main {...pageMotion} className="pt-24">
      <Section eyebrow="Top rankings" title="The Aurelia top ten">
        <div className="space-y-4">
          {rankings.map((anime) => {
            const rankStyle = anime.rank === 1 ? "from-amber-200 to-yellow-600 text-black" : anime.rank === 2 ? "from-slate-200 to-slate-500 text-black" : anime.rank === 3 ? "from-orange-300 to-orange-700 text-black" : "from-white/10 to-white/5 text-white";
            return (
              <motion.div whileHover={{ x: 10 }} key={`${anime.id}-${anime.rank}`} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl sm:gap-6">
                <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${rankStyle} text-xl font-black`}>{anime.rank}</div>
                <img src={anime.image} alt={anime.title} className="h-20 w-20 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-xl font-semibold text-white">{anime.title}</h3>
                  <p className="text-sm text-white/55">{anime.genre} • {anime.year}</p>
                </div>
                <div className="hidden items-center gap-2 text-amber-300 sm:flex"><Star className="fill-amber-300" size={18} /> {anime.rating}</div>
              </motion.div>
            );
          })}
        </div>
      </Section>
    </motion.main>
  );
}

function NewsPage() {
  return (
    <motion.main {...pageMotion} className="pt-24">
      <Section eyebrow="News" title="Dispatches from the premium anime world">
        <div className="grid gap-6 lg:grid-cols-3">
          {news.map((item) => (
            <motion.article whileHover={{ y: -8 }} key={item.title} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-xl">
              <img src={item.image} alt={item.title} className="h-64 w-full object-cover" />
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-amber-200"><span>{item.tag}</span><span>{item.date}</span></div>
                <h3 className="text-2xl font-semibold leading-tight text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/58">Exclusive visual notes, release context, and collector-grade details from the Aurelia editorial desk.</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>
    </motion.main>
  );
}

function CommunityPage() {
  const [posts, setPosts] = useState(communityPosts.map((post) => ({ ...post, liked: false, commentsOpen: false })));
  const toggleLike = (index) => setPosts((items) => items.map((post, postIndex) => postIndex === index ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post));
  const toggleComments = (index) => setPosts((items) => items.map((post, postIndex) => postIndex === index ? { ...post, commentsOpen: !post.commentsOpen } : post));

  return (
    <motion.main {...pageMotion} className="pt-24">
      <Section eyebrow="Community" title="After-dark discussions">
        <div className="grid gap-5 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article whileHover={{ y: -6 }} key={post.title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 text-white backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-purple-900/70 text-amber-200"><UserRound size={19} /></div>
                <div><p className="font-semibold">{post.user}</p><p className="text-xs text-white/45">Aurelia member</p></div>
              </div>
              <h3 className="text-2xl font-semibold">{post.title}</h3>
              <p className="mt-3 leading-7 text-white/62">{post.body}</p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => toggleLike(index)} className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm ${post.liked ? "bg-amber-300 text-black" : "bg-white/8 text-white/70"}`}><Heart size={16} className={post.liked ? "fill-black" : ""} /> {post.likes}</button>
                <button onClick={() => toggleComments(index)} className="flex items-center gap-2 rounded-2xl bg-white/8 px-4 py-2 text-sm text-white/70"><MessageCircle size={16} /> {post.comments}</button>
              </div>
              <AnimatePresence>
                {post.commentsOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 overflow-hidden rounded-2xl bg-black/25 p-4 text-sm text-white/55">Comments are open for this thread. Add your theory when the royal forum launches.</motion.div>}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>
      </Section>
    </motion.main>
  );
}

function AboutPage() {
  return (
    <motion.main {...pageMotion} className="pt-24">
      <Section eyebrow="About" title="A luxury house for anime obsession">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6 text-lg leading-8 text-white/68">
            <p>Aurelia Anime was shaped as a boutique destination for viewers who treat animation like cinema, mythology, fashion, music, and memory in motion.</p>
            <p>Our world blends royal curation with fan energy: polished rankings, atmospheric details, character-led discovery, and a community that celebrates the art behind every frame.</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[Gem, Shield, Swords].map((Icon, index) => <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 text-amber-200 backdrop-blur-xl"><Icon /><p className="mt-3 text-sm text-white/60">Premium curation</p></div>)}
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80" alt="Japanese night street" className="h-[520px] w-full rounded-2xl object-cover shadow-2xl shadow-purple-950/30" />
        </div>
      </Section>
    </motion.main>
  );
}

function ContactPage() {
  return (
    <motion.main {...pageMotion} className="pt-24">
      <Section eyebrow="Contact" title="Send a message to the royal desk">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-7 text-white backdrop-blur-xl">
            <Mail className="text-amber-300" size={34} />
            <h3 className="mt-6 text-2xl font-semibold">Collaborations, editorials, and support</h3>
            <p className="mt-4 leading-7 text-white/60">Reach out for anime features, community partnerships, launch ideas, or feedback about the Aurelia experience.</p>
          </div>
          <form className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
            <input className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-amber-300/60" placeholder="Name" />
            <input type="email" className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-amber-300/60" placeholder="Email" />
            <textarea rows="6" className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-amber-300/60" placeholder="Message" />
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-200 px-6 py-4 font-semibold text-black transition hover:-translate-y-0.5"><Send size={18} /> Send Message</button>
          </form>
        </div>
      </Section>
    </motion.main>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/anime/:id" element={<AnimeDetailsPage />} />
        <Route path="/details" element={<AnimeDetailsPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/rankings" element={<TopRankingsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const particles = useMemo(() => Array.from({ length: 18 }, (_, index) => ({ id: index, left: `${(index * 13) % 100}%`, delay: index * 0.33, duration: 8 + (index % 5) })), []);

  return (
    <BrowserRouter>
      <div className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-amber-300 selection:text-black" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(88,28,135,0.36),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.12),transparent_30%)]" />
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.span key={particle.id} initial={{ y: "105vh", opacity: 0 }} animate={{ y: "-10vh", opacity: [0, 0.8, 0] }} transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "linear" }} className="absolute h-1 w-1 rounded-full bg-amber-200/70" style={{ left: particle.left }} />
          ))}
        </div>
        <div className="relative z-10">
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}