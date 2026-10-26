import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { getTreeBySlug } from "../data/trees.js";
import NotFound from "./NotFound.jsx";
import nishaaImage from "/images/leaders/nishaa.webp";

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

  const treeUrl = window.location.href;
  const localName = tree.localName || tree.commonName;
  const mapUrl = tree.coordinates
    ? `https://www.google.com/maps?q=${tree.coordinates.lat},${tree.coordinates.lng}`
    : null;

  const conceptBy = [
    {
      name: "Sau. Nisha Sachin Manwatkar",
      roles: [
        "Municipal Councillor, Pune Municipal Corporation",
        "Standing Committee Member, Pune Municipal Corporation",
      ],
      image: "/images/leaders/nisha.jpg",
      alt: "Sau. Nisha Sachin Manwatkar",
    },
    {
      name: "Shri. Sachinbhau Manwatkar",
      roles: ["Social Worker"],
      image: "/images/leaders/sachin.jpg",
      alt: "Shri. Sachinbhau Manwatkar",
    },
  ];

  const galleryCaptions = [
    "A majestic tree",
    "Nature's details",
    "Leaves & branches",
  ];

  return (
    <main className="min-h-screen bg-[#e8eee0] px-0 py-0 sm:px-4 sm:py-5">
      <article className="relative mx-auto w-full max-w-[960px] overflow-hidden bg-[#fbfcf3] text-[#174b31] shadow-[0_18px_55px_rgba(22,65,39,0.16)] sm:rounded-2xl">
        {/* Hero */}
        <header className="relative isolate min-h-[420px] overflow-hidden bg-[#eff6df] sm:min-h-[360px]">
          <div className="absolute inset-0 -z-20">
            <img
              src={tree.images?.[0]}
              alt={tree.commonName}
              className="h-full w-full object-cover object-center sm:object-[center_45%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082f1d]/85 via-[#0b3821]/35 to-[#0b3821]/5 sm:bg-gradient-to-r sm:from-[#f7fae9] sm:via-[#f7fae9]/95 sm:via-45% sm:to-[#0b3821]/10" />
          </div>

          <div className="relative z-10 flex min-h-[420px] flex-col justify-end px-5 pb-7 pt-8 sm:min-h-[360px] sm:max-w-[62%] sm:justify-center sm:px-10 sm:py-10">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/50 bg-white/75 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#145b35] shadow-sm backdrop-blur-sm">
              <span className="text-base">🍃</span>
              Tree No. {tree.treeNumber || tree.id}
            </span>

            <h1 className="max-w-[620px] font-serif text-4xl font-black leading-[0.98] tracking-tight text-white drop-shadow sm:text-[#064d2c] sm:text-6xl lg:text-7xl">
              {tree.commonName}
            </h1>
            <p className="mt-3 font-serif text-2xl font-bold italic text-[#e6f5cf] drop-shadow sm:text-3xl sm:text-[#126238]">
              {tree.tagline || "The Tree of Life"}
            </p>
            <div className="mt-4 h-1 w-24 rounded-full bg-[#76b84b]" />
            <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-white/95 sm:text-base sm:text-[#276340]">
              A symbol of strength, wisdom and a greener tomorrow.
            </p>
          </div>

          <div className="absolute right-4 top-4 z-10 hidden rounded-bl-[72px] border-4 border-white/70 shadow-xl sm:block sm:h-[210px] sm:w-[250px] lg:h-[245px] lg:w-[300px]">
            <img
              src={tree.images?.[0]}
              alt={`${tree.commonName} canopy`}
              className="h-full w-full rounded-bl-[66px] object-cover"
            />
          </div>
          <span className="pointer-events-none absolute right-5 top-5 z-10 text-4xl opacity-80 sm:hidden">
            🌿
          </span>
        </header>

        {/* Main information and QR */}
        <section className="grid grid-cols-1 gap-5 px-4 py-5 sm:grid-cols-[1.35fr_0.85fr] sm:gap-7 sm:px-8 sm:py-8">
          <div className="space-y-4">
            <section className="rounded-2xl border border-[#e1edcf] bg-white/80 p-4 shadow-[0_4px_18px_rgba(43,91,49,0.04)] sm:p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f4d6] text-xl">
                  🌳
                </span>
                <div>
                  <h2 className="font-serif text-lg font-black text-[#145b35] sm:text-xl">
                    Meet the {tree.commonName}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#405247]">
                    {tree.description ||
                      `The ${tree.commonName} (${tree.scientificName}) is an important part of our natural heritage, supporting biodiversity and a greener environment.`}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#e1edcf] bg-white/80 p-4 shadow-[0_4px_18px_rgba(43,91,49,0.04)] sm:p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f4d6] text-xl">
                  🍃
                </span>
                <h2 className="font-serif text-lg font-black text-[#145b35] sm:text-xl">
                  Tree at a glance
                </h2>
              </div>
              <dl className="grid grid-cols-2 gap-2.5">
                {[
                  ["Common name", tree.commonName],
                  ["Local name", localName],
                  ["Scientific name", tree.scientificName],
                  ["Family", tree.family],
                  ["Approx. age", tree.age],
                  ["Height", tree.height],
                ]
                  .filter(([, value]) => value)
                  .map(([label, value]) => (
                    <div
                      key={label}
                      className="min-w-0 rounded-xl bg-[#f2f7e9] p-3"
                    >
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-[#6a8668] sm:text-[11px]">
                        {label}
                      </dt>
                      <dd className="mt-1 break-words text-sm font-bold text-[#214e32]">
                        {value}
                      </dd>
                    </div>
                  ))}
              </dl>
            </section>

            <section className="rounded-2xl border border-[#e1edcf] bg-white/80 p-4 shadow-[0_4px_18px_rgba(43,91,49,0.04)] sm:p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f4d6] text-xl">
                  💚
                </span>
                <h2 className="font-serif text-lg font-black text-[#145b35] sm:text-xl">
                  Why this tree matters
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  ["Environmental", tree.importance?.environmental],
                  ["Ecological", tree.importance?.ecological],
                  ["Wildlife", tree.importance?.wildlife],
                  ["Cultural", tree.importance?.cultural],
                  ["Traditional uses", tree.importance?.medicinal],
                ]
                  .filter(([, value]) => value)
                  .map(([label, value]) => (
                    <div
                      key={label}
                      className="flex gap-2.5 text-sm leading-relaxed text-[#405247]"
                    >
                      <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#65a744]" />
                      <p>
                        <strong className="text-[#205a35]">{label}: </strong>
                        {value}
                      </p>
                    </div>
                  ))}
              </div>
            </section>
          </div>

          {/* QR / location panel */}
          <aside className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#d9efbf] via-[#edf7df] to-[#d0e9b2] p-4 text-center sm:p-5">
              <span className="absolute -right-3 -top-5 text-7xl opacity-20">
                🌿
              </span>
              <p className="relative text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#50794a]">
                Scan to discover
              </p>
              <h2 className="relative mt-1 font-serif text-xl font-black text-[#145b35]">
                Know this tree
              </h2>
              <div className="relative mx-auto mt-4 inline-flex rounded-2xl border border-white bg-white p-3 shadow-[0_10px_25px_rgba(25,75,40,0.12)]">
                <QRCodeCanvas
                  value={treeUrl}
                  size={190}
                  level="H"
                  marginSize={3}
                  bgColor="#ffffff"
                  fgColor="#102b1a"
                  className="h-[170px] w-[170px] sm:h-[190px] sm:w-[190px]"
                  aria-label={`QR code for ${tree.commonName}`}
                />
              </div>
              <p className="relative mt-3 text-sm font-extrabold text-[#145b35]">
                {localName}
              </p>
              <p className="relative mt-1 text-xs italic text-[#52715b]">
                {tree.scientificName}
              </p>
              <p className="relative mt-2 inline-flex rounded-full bg-white/75 px-3 py-1 text-xs font-bold text-[#276340]">
                Tree No. {tree.treeNumber || tree.id}
              </p>
            </div>

            {tree.location && (
              <div className="rounded-2xl border border-[#e1edcf] bg-white p-4 shadow-[0_4px_18px_rgba(43,91,49,0.04)] sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f4d6] text-xl">
                    📍
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-serif text-lg font-black text-[#145b35]">
                      Tree location
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-[#526657]">
                      {tree.location}
                    </p>
                  </div>
                </div>
                {mapUrl && (
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#126238] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0b4d2b] focus:outline-none focus:ring-2 focus:ring-[#79b65c] focus:ring-offset-2"
                  >
                    Open in Google Maps <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            )}

            <div className="rounded-2xl border border-[#dcebc9] bg-[#f2f7e9] p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#62815b]">
                A greener future
              </p>
              <p className="mt-2 font-serif text-lg font-bold italic leading-snug text-[#145b35]">
                “Small steps today. A greener world tomorrow.”
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#62815b]">
                <span>🌱</span> Plant • Protect • Preserve
              </div>
            </div>
          </aside>
        </section>

        {/* Compact photo gallery */}
        {tree.images?.length > 0 && (
          <section className="px-4 pb-6 sm:px-8 sm:pb-8">
            <div className="mb-4 flex items-end justify-between gap-3 border-b border-[#dcebc9] pb-3">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#719065]">
                  A closer look
                </p>
                <h2 className="mt-1 font-serif text-2xl font-black text-[#145b35]">
                  More Trees, More Life
                </h2>
              </div>
              <span className="pb-1 text-2xl">🌿</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {tree.images.slice(0, 3).map((image, index) => (
                <figure
                  key={`${image}-${index}`}
                  className={`group overflow-hidden rounded-2xl border border-[#d8e8c6] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md ${index === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  <div className="relative h-32 overflow-hidden bg-[#eaf2df] sm:h-40">
                    <img
                      src={image}
                      alt={`${tree.commonName} — ${galleryCaptions[index]}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold text-[#145b35]">
                      0{index + 1}
                    </span>
                  </div>
                  <figcaption className="px-3 py-3 text-xs font-bold text-[#276340] sm:text-sm">
                    {galleryCaptions[index]}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Concept by — no organization/project details */}
        <footer className="relative overflow-hidden border-t border-[#d7e8c3] bg-gradient-to-b from-[#f4f8e9] to-[#e5f1d8] px-4 py-7 sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute -left-8 bottom-0 text-7xl opacity-10">
            🌿
          </div>
          <div className="pointer-events-none absolute -right-8 top-0 rotate-180 text-7xl opacity-10">
            🍃
          </div>
          <div className="relative mx-auto max-w-[650px]">
            <div className="mb-5 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#c9dfb1] bg-white/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#276340] shadow-sm">
                <span>✦</span> Concept by <span>✦</span>
              </span>
              <h2 className="mt-3 font-serif text-xl font-black text-[#145b35] sm:text-2xl">
                People behind the green vision
              </h2>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-[#d5e6c3] bg-white p-2 shadow-md">
                <img
                  src={nishaaImage}
                  alt="Concept by"
                  loading="lazy"
                  className="block h-auto w-full rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
          <div className="relative mt-7 flex items-center justify-center gap-2 border-t border-[#cfe1bd] pt-4 text-center text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#4f7650] sm:text-xs">
            <span>🌱</span> More Trees <span className="text-[#93b66f">•</span>{" "}
            More Life <span className="text-[#93b66f">•</span> A Greener
            Tomorrow
          </div>
        </footer>
      </article>
    </main>
  );
}
