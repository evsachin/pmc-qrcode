import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { getTreeBySlug } from "../data/trees.js";
import NotFound from "./NotFound.jsx";

/* ---------- Small reusable pieces ---------- */

function SectionTitle({ eyebrow, title, icon }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1f6b43] text-xl text-white shadow-md ring-4 ring-[#dcefc9]">
        {icon}
      </span>
      <div>
        {eyebrow && (
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6b8f6f]">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-2xl font-black leading-tight text-[#0f4a2b]">
          {title}
        </h2>
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-[#d5e9bf] bg-white/80 p-5 shadow-[0_4px_18px_rgba(31,107,67,0.07)] backdrop-blur-sm sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

function Fact({ label, value, icon }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#d5e9bf] bg-[#f4fae8] px-4 py-3">
      <span className="text-2xl">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b8f6f]">
          {label}
        </p>
        <p className="truncate text-sm font-extrabold text-[#145b35]">
          {value}
        </p>
      </div>
    </div>
  );
}

function LeafDivider() {
  return (
    <div className="mx-auto my-8 flex max-w-[360px] items-center gap-3 px-6">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#7fbf8e]" />
      <span className="text-xl">🌿</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#7fbf8e]" />
    </div>
  );
}

/* ---------- Page ---------- */

export default function TreePage() {
  const { slug } = useParams();
  const tree = getTreeBySlug(slug);

  useEffect(() => {
    document.title = tree
      ? `${tree.commonName} - Tree Information`
      : "Tree Not Found";

    window.scrollTo(0, 0);
  }, [tree]);

  if (!tree) {
    return (
      <NotFound
        message="The requested tree information could not be found."
        title="Tree Not Found"
      />
    );
  }

  const mapUrl = tree.coordinates
    ? `https://www.google.com/maps?q=${tree.coordinates.lat},${tree.coordinates.lng}`
    : null;

  const treeUrl = window.location.href;
  const localName = tree.localName || tree.commonName;
  const treeNo = tree.treeNumber || tree.id;

  const importancePoints = [
    { icon: "🌍", label: "Environmental", text: tree.importance?.environmental },
    { icon: "🦋", label: "Ecological", text: tree.importance?.ecological },
    { icon: "🐦", label: "Wildlife", text: tree.importance?.wildlife },
  ].filter((p) => p.text);

  const galleryCaptions = [
    "A majestic tree",
    "Nature's details",
    "Leaves & branches",
  ];

  // Concept contributors displayed at the bottom of each tree page.
  const conceptBy = [
    {
      name: "Sau. Nisha Sachin Manvatkar",
      roles: [
        "Municipal Councillor, Pune Municipal Corporation",
        "Standing Committee Member, Pune Municipal Corporation",
      ],
      image: "/images/leaders/nisha.jpg",
      alt: "Sau. Nisha Sachin Manvatkar",
    },
    {
      name: "Shri. Sachinbhau Manvatkar",
      roles: ["Social Worker"],
      image: "/images/leaders/sachin.jpg",
      alt: "Shri. Sachinbhau Manvatkar",
    },
  ];

  return (
    <main className="min-h-screen bg-[#dfe8d2] bg-[radial-gradient(circle_at_20%_10%,#eef6df_0,transparent_45%),radial-gradient(circle_at_90%_80%,#cfe3b8_0,transparent_40%)] px-0 py-0 sm:px-4 sm:py-8">
      <article className="relative mx-auto w-full max-w-[960px] overflow-hidden bg-[#f8fbec] text-[#174b31] shadow-[0_20px_60px_rgba(15,74,43,0.22)] sm:rounded-[28px]">
        {/* ============ HERO ============ */}
        <header className="relative overflow-hidden bg-gradient-to-br from-[#0b4a2a] via-[#12633a] to-[#1f7d4b] text-white">
          {/* decorative circles */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute bottom-[-80px] left-1/3 h-72 w-72 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute right-6 top-4 rotate-12 text-6xl opacity-20">
            🌿
          </div>

          <div className="relative grid grid-cols-1 items-center gap-6 px-6 pb-10 pt-8 sm:grid-cols-[1.1fr_0.9fr] sm:gap-10 sm:px-12 sm:pb-14 sm:pt-12">
            <div className="order-2 sm:order-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur">
                🌱 Garden Tree Guide · No. {treeNo}
              </span>

              <h1 className="mt-4 font-serif text-[46px] font-black leading-[0.95] sm:text-[68px]">
                {tree.commonName}
              </h1>

              <p className="mt-3 font-serif text-xl font-semibold italic text-[#c9ee9f] sm:text-3xl">
                {tree.tagline || "The Tree of Life"}
              </p>

              <p className="mt-1 text-sm italic text-white/70">
                {tree.scientificName}
              </p>

              <div className="mt-5 h-[3px] w-24 rounded-full bg-[#9bd67a]" />

              <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
                A symbol of strength, wisdom and a greener tomorrow.
              </p>

              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-[#0f4a2b] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#eaf7d4]"
                >
                  📍 View location on map
                </a>
              )}
            </div>

            {/* Arched photo frame */}
            <div className="order-1 mx-auto w-full max-w-[340px] sm:order-2 sm:max-w-none">
              <div className="relative">
                <div className="absolute -inset-3 rounded-t-[999px] rounded-b-[28px] border-2 border-dashed border-white/30" />
                <div className="relative h-[320px] overflow-hidden rounded-t-[999px] rounded-b-[24px] border-4 border-white/90 bg-[#0b4a2a] shadow-2xl sm:h-[420px]">
                  <img
                    src={tree.images?.[0]}
                    alt={tree.commonName}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#f8fbec] px-4 py-1.5 text-xs font-extrabold text-[#145b35] shadow-lg">
                  🌳 {localName}
                </span>
              </div>
            </div>
          </div>

          {/* wavy bottom edge */}
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="block h-[30px] w-full sm:h-[50px]"
            aria-hidden="true"
          >
            <path
              d="M0,30 C240,70 480,0 720,28 C960,56 1200,6 1440,30 L1440,60 L0,60 Z"
              fill="#f8fbec"
            />
          </svg>
        </header>

        {/* ============ QUICK FACTS ============ */}
        <section className="relative z-10 -mt-2 px-5 sm:px-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Fact icon="🧬" label="Family" value={tree.family} />
            <Fact icon="⏳" label="Approx. Age" value={tree.age} />
            <Fact icon="📏" label="Height" value={tree.height} />
            <Fact icon="🏷️" label="Tree No." value={String(treeNo)} />
          </div>
        </section>

        {/* ============ MAIN CONTENT ============ */}
        <section className="grid grid-cols-1 gap-6 px-5 pt-8 sm:grid-cols-[1.35fr_0.85fr] sm:px-10">
          {/* Left column */}
          <div className="space-y-6">
            <Card>
              <SectionTitle
                eyebrow="Introduction"
                title={`What is a ${tree.commonName}?`}
                icon="🌳"
              />
              <p className="text-[15px] leading-[1.7] text-[#263d30]">
                The {tree.commonName} <i>({tree.scientificName})</i> is a
                remarkable tree known for its natural beauty, ecological
                importance and connection with the environment.
              </p>

              <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-dashed border-[#c7e3a7] pt-4 text-sm sm:grid-cols-2">
                <div className="flex justify-between gap-2">
                  <dt className="font-bold text-[#6b8f6f]">Common Name</dt>
                  <dd className="text-right font-semibold">{tree.commonName}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="font-bold text-[#6b8f6f]">Local Name</dt>
                  <dd className="text-right font-semibold">{localName}</dd>
                </div>
                <div className="flex justify-between gap-2 sm:col-span-2">
                  <dt className="font-bold text-[#6b8f6f]">Scientific Name</dt>
                  <dd className="text-right font-semibold italic">
                    {tree.scientificName}
                  </dd>
                </div>
              </dl>
            </Card>

            {importancePoints.length > 0 && (
              <Card>
                <SectionTitle
                  eyebrow="Why it matters"
                  title="Importance"
                  icon="💚"
                />
                <ul className="space-y-3">
                  {importancePoints.map((p) => (
                    <li
                      key={p.label}
                      className="flex gap-3 rounded-xl bg-[#f4fae8] p-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm">
                        {p.icon}
                      </span>
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-wider text-[#267044]">
                          {p.label}
                        </p>
                        <p className="text-[14px] leading-[1.6] text-[#263d30]">
                          {p.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {tree.importance?.cultural && (
              <Card className="border-l-4 border-l-[#e0a93b]">
                <SectionTitle
                  eyebrow="Heritage"
                  title="Cultural Significance"
                  icon="🪔"
                />
                <p className="text-[15px] leading-[1.7] text-[#263d30]">
                  {tree.importance.cultural}
                </p>
              </Card>
            )}

            {tree.importance?.medicinal && (
              <Card className="border-l-4 border-l-[#55a970]">
                <SectionTitle
                  eyebrow="Natural remedies"
                  title="Traditional Uses"
                  icon="🌿"
                />
                <p className="text-[15px] leading-[1.7] text-[#263d30]">
                  {tree.importance.medicinal}
                </p>
              </Card>
            )}
          </div>

          {/* Right column: sticky QR specimen tag */}
          <aside className="sm:sticky sm:top-6 sm:self-start">
            <div className="relative overflow-hidden rounded-[24px] border border-[#c7e3a7] bg-gradient-to-b from-[#e4f4cd] to-[#f2f9e4] p-5 text-center shadow-[0_8px_26px_rgba(31,107,67,0.12)]">
              {/* tag hole */}
              <div className="mx-auto mb-4 h-3 w-3 rounded-full border-2 border-[#9bc57f] bg-[#f8fbec]" />

              <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#54805c]">
                Scan to know more
              </p>

              <div className="mx-auto mt-4 w-fit rounded-2xl bg-white p-4 shadow-[0_5px_20px_rgba(38,92,54,0.1)] ring-4 ring-[#d9f2b7]">
                <QRCodeCanvas
                  value={treeUrl}
                  size={230}
                  level="H"
                  marginSize={4}
                  bgColor="#ffffff"
                  fgColor="#0b3d22"
                  className="h-[180px] w-[180px] sm:h-[190px] sm:w-[190px]"
                  aria-label={`QR code for ${tree.commonName}`}
                />
              </div>

              <div className="mt-5 border-t border-dashed border-[#9bc57f] pt-4">
                <p className="font-serif text-2xl font-black text-[#145b35]">
                  {localName}
                </p>
                <p className="text-sm italic text-[#276340]">
                  {tree.scientificName}
                </p>
                <p className="mt-3 inline-block rounded-full bg-[#1f6b43] px-4 py-1 text-xs font-bold tracking-wide text-white">
                  Tree No: {treeNo}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-[#0f4a2b] p-5 text-white shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9bd67a]">
                A Greener Future
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                Planting and protecting {tree.commonName} trees helps build a
                healthier environment and a more sustainable planet.
              </p>
            </div>
          </aside>
        </section>

        <LeafDivider />

        {/* ============ BANNER ============ */}
        <section className="relative mx-5 overflow-hidden rounded-3xl bg-gradient-to-br from-[#edf7df] via-[#f7fae9] to-[#d6ebbd] px-6 py-7 sm:mx-10 sm:px-10">
          <div className="pointer-events-none absolute -right-3 -top-6 rotate-12 text-8xl opacity-15">
            🌿
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#54805c] sm:text-xs">
                Protect Nature • Preserve Life
              </p>
              <h2 className="font-serif text-3xl font-black italic leading-[0.95] text-[#08703e] sm:text-5xl">
                More Trees,
                <br />
                More Life
              </h2>
              <div className="mt-3 h-1 w-20 rounded-full bg-[#19804d]" />
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#42684a]">
                Every tree tells a story. Discover the beauty, growth and
                natural wonder of our green heritage.
              </p>
            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#c7e3a7] bg-white/80 text-4xl shadow-sm sm:h-28 sm:w-28 sm:text-6xl">
              🌳
            </div>
          </div>
        </section>

        {/* ============ GALLERY ============ */}
        {tree.images && tree.images.length > 0 && (
          <section className="px-5 pb-4 pt-8 sm:px-10">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6b8f6f]">
                  Photo Gallery
                </p>
                <h3 className="font-serif text-2xl font-black text-[#0f4a2b]">
                  Explore the Tree
                </h3>
              </div>

              <span className="rounded-full border border-[#d5e9bf] bg-[#edf7df] px-3 py-1 text-xs font-bold text-[#267044]">
                {Math.min(tree.images.length, 3)} Photos
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
              {tree.images.slice(0, 3).map((image, index) => (
                <figure
                  key={`${image}-${index}`}
                  className={`group rounded-2xl border border-[#d5e9bf] bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    index === 2 ? "col-span-2 sm:col-span-1" : ""
                  } ${
                    index === 0
                      ? "sm:-rotate-1"
                      : index === 2
                      ? "sm:rotate-1"
                      : ""
                  }`}
                >
                  <div className="relative h-40 overflow-hidden rounded-xl bg-[#e8f0dc] sm:h-52">
                    <img
                      src={image}
                      alt={`${tree.commonName} - ${galleryCaptions[index]}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/45 to-transparent" />
                    <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#145b35]">
                      0{index + 1}
                    </span>
                  </div>

                  <figcaption className="flex items-center gap-2 px-2 pb-1 pt-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf7df] text-sm">
                      {index === 0 ? "🌳" : index === 1 ? "🍃" : "🌱"}
                    </span>
                    <span className="text-xs font-bold leading-snug text-[#267044] sm:text-sm">
                      {galleryCaptions[index]}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs font-semibold tracking-[0.2em] text-[#54805c]">
              <span>🌱</span>
              <span>GROW GREEN. LIVE GREEN.</span>
              <span>🌱</span>
            </div>
          </section>
        )}

        {/* ============ FOOTER ============ */}
        <footer className="relative mt-8 overflow-hidden bg-[#eef6df] px-5 pb-12 pt-10 text-center">
          <div className="pointer-events-none absolute -left-6 top-2 rotate-[-20deg] text-6xl opacity-20">
            🍃
          </div>
          <div className="pointer-events-none absolute -right-4 bottom-4 rotate-[25deg] text-6xl opacity-20">
            🌿
          </div>

          <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.3em] text-[#276340]">
            ✦ Concept by ✦
          </p>

          <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-8 sm:grid-cols-2">
            {conceptBy.map((person) => (
              <div key={person.name} className="flex flex-col items-center">
                <div className="rounded-full bg-gradient-to-br from-[#55a970] to-[#c9ee9f] p-[3px] shadow-md">
                  <div className="h-[140px] w-[140px] overflow-hidden rounded-full border-4 border-white bg-white sm:h-[160px] sm:w-[160px]">
                    <img
                      src={person.image}
                      alt={person.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="mt-4 font-serif text-lg font-black leading-snug text-[#145b35]">
                  {person.name}
                </h3>

                {person.roles.map((role) => (
                  <p
                    key={role}
                    className="mt-1 max-w-[300px] text-sm leading-snug text-[#3e684d]"
                  >
                    {role}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="absolute inset-x-[-20px] bottom-0 h-[14px] bg-[#128447]" />
        </footer>
      </article>
    </main>
  );
}
