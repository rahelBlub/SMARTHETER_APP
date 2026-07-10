import { useEffect, useMemo, useRef, useState } from "react";
import { C } from "../../constants/colors";

import Medien1 from "../../data/videos/Medien1.mp4";
import Medien2 from "../../data/videos/Medien2.mp4";
import Medien3 from "../../data/videos/Medien3.mp4";
import Medien4 from "../../data/videos/Medien4.mp4";
import Medien5 from "../../data/videos/Medien5.mp4";
import Medien6 from "../../data/videos/Medien6.mp4";
import Medien7 from "../../data/videos/Medien7.mp4";
import Bild1 from "../../data/images/Bild1.png";
import trapped_particles from "../../data/images/trapped_particles.png";
import impedance_strings from "../../data/images/impedance_strings.png";
import nanoparticle_structures from "../../data/images/nanoparticle_structures.jpg";
//import data_transfer from "../../data/images/data_transfer.jpg";
import clinician_data_transfer from "../../data/images/clinician_data_transfer.png";
import pyrolysis from "../../data/images/pyrolysis.png";

const VIDEO_SPEED = 0.75;
const PAUSE_MS = 1500;

const videoMeta = [
  {
    title: "Urine Flow & Bacterial Capture",
    description:
      "Urine flows tangentially across the SCERA surface. Due to the ceramic nanostructure's porous geometry, bacteria in the urine are captured in the pores as the fluid passes through.",
  },
  {
    title: "Smartheter — Exploded View",
    description:
      "An exploded view of the Smartheter device showing all core components: the SCERA sensor, embedded electrodes, battery, and microcontroller — engineered to fit within a standard catheter form factor.",
  },
  {
    title: "SCERA Structure",
    description:
      "A closer look at the SCERA (Smart CERAmic) material. The nanostructured ceramic surface provides a high surface area for bacterial capture while remaining biocompatible inside the urinary tract.",
  },
  {
    title: "SCERA Nanostructure",
    description:
      "At nanoscale resolution, the porous architecture of SCERA becomes visible. This structure is what enables selective trapping of bacteria — different pore sizes and surface chemistries interact differently with different bacterial species.",
  },
  {
    title: "Electrodes",
    description:
      "Conductive electrodes embedded within the SCERA material facilitate electron transfer during impedance measurement. Once bacteria are trapped, the electrodes read a characteristic electrical pattern that the microcontroller interprets.",
  },
  {
    title: "Battery",
    description:
      "A compact, low-power battery supplies energy to both the SCERA sensor and the microcontroller. The power budget is optimised for continuous measurement over typical catheter dwell times of several days.",
  },
  {
    title: "Microcontroller",
    description:
      "The microcontroller is the brain of the Smartheter. It processes the raw impedance signal from the electrodes, runs the on-device ML classification, and transmits the result to the MQTT broker via BLE or Wi-Fi.",
  },
];

// ── shared style helpers ────────────────────────────────────────
const card = (extra = {}) => ({
  background: C.white,
  border: `1px solid ${C.g200}`,
  borderRadius: 12,
  padding: 24,
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  ...extra,
});

const sectionLabel = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  color: C.teal,
  marginBottom: 6,
};

export default function TechnologyView({ tscreen, setTscreen, tech }) {
  const videos = useMemo(
    () => [Medien1, Medien2, Medien3, Medien4, Medien5, Medien6, Medien7],
    []
  );

  const [index, setIndex] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRefs = useMemo(() => [videoRef1, videoRef2], []);

  // preload
  useEffect(() => {
    videos.forEach((src) => {
      const v = document.createElement("video");
      v.src = src;
      v.preload = "auto";
    });
  }, [videos]);

  // play current
  useEffect(() => {
    const el = videoRefs[activeLayer].current;
    if (!el) return;
    el.src = videos[index];
    el.load();
    el.playbackRate = VIDEO_SPEED;
    el.play().catch(() => { });
  }, [activeLayer, index, videos, videoRefs]);

  const nextVideo = () => {
    setTimeout(() => {
      const nextIndex = (index + 1) % videos.length;
      const nextLayer = activeLayer === 0 ? 1 : 0;
      const nextEl = videoRefs[nextLayer].current;
      if (!nextEl) return;
      nextEl.src = videos[nextIndex];
      nextEl.load();
      nextEl.currentTime = 0;
      nextEl.playbackRate = VIDEO_SPEED;
      nextEl.play().catch(() => { });
      setIndex(nextIndex);
      setActiveLayer(nextLayer);
    }, PAUSE_MS);
  };

  const togglePause = () => {
    const el = videoRefs[activeLayer].current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => { });
      setIsPaused(false);
    } else {
      el.pause();
      setIsPaused(true);
    }
  };

  const meta = videoMeta[index];

  // ── render ──────────────────────────────────────────────────
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 90px)",
        background: C.g100,
        overflowY: "auto",
      }}
    >
      {/* Infokarte */}
      <div
        style={{
          background: C.white,
          border: `1px solid ${C.g200}`,
          borderRadius: 10,
          padding: "24px 20px",
          gap: 24,
          margin: "24px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{ fontSize: 20, fontWeight: 700, color: C.green, marginBottom: 12, }}>
          What if a catheter could <b style={{ color: "orange" }}>see</b> what patients cannot <b style={{ color: "orange" }}>feel</b>?
        </div>
        <div
          style={{ fontSize: 14, lineHeight: 1.6, color: C.g800, maxWidth: 900, marginLeft: 20, }}>
          <strong style={{ fontSize: 16 }}>Smartheter</strong> is a smart catheter system that monitors urine output and detects early signs of urinary tract infections (UTIs) in patients with indwelling catheters. It provides real-time data to clinicians and patients, enabling timely interventions and improved patient care.
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: C.g800, maxWidth: 900, marginLeft: 20, }}>
          A concrete & measurable contribution to combating the silent pandemic.
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px", width: "100%" }}>

        {/* ── VIDEO PLAYER ── */}
        <div style={card({ marginBottom: 24, padding: 0, overflow: "hidden" })}>
          <div
            onClick={togglePause}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              background: "#000",
              cursor: "pointer",   // ← shows hand cursor on hover
            }}
          >
            {/* video */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000" }}>
            </div>
            {[0, 1].map((layer) => (
              <video
                key={layer}
                ref={videoRefs[layer]}
                muted
                playsInline
                onEnded={nextVideo}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: activeLayer === layer ? 1 : 0,
                  transition: "opacity 500ms ease",
                }}
              />
            ))}
            {isPaused && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "rgba(0,0,0,0.5)",
                  borderRadius: "50%",
                  width: 56,
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",   // ← click passes through to the div
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5h3v14H8zm5 0h3v14h-3z" />
                </svg>
              </div>
            )}
            {/* progress dots */}
            <div
              style={{
                position: "absolute",
                bottom: 14,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 6,
              }}
            >
              {videos.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === index ? 20 : 7,
                    height: 7,
                    borderRadius: 4,
                    background: i === index ? C.tealM : "rgba(255,255,255,0.4)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* video caption */}
          <div style={{ padding: "16px 20px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.g800, marginBottom: 4 }}>
              {index + 1} / {videos.length} — {meta.title}
            </div>
            <div style={{ fontSize: 13, color: C.g600, lineHeight: 1.6 }}>
              {meta.description}
            </div>

            {/* manual nav buttons */}
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button
                onClick={() => {
                  const prev = (index - 1 + videos.length) % videos.length;
                  const nextLayer = activeLayer === 0 ? 1 : 0;
                  const el = videoRefs[nextLayer].current;
                  if (!el) return;
                  el.src = videos[prev];
                  el.load();
                  el.playbackRate = VIDEO_SPEED;
                  el.play().catch(() => { });
                  setIndex(prev);
                  setActiveLayer(nextLayer);
                }}
                style={{
                  fontSize: 12, padding: "5px 14px", borderRadius: 20,
                  border: `1px solid ${C.g300}`, background: C.white,
                  color: C.g600, cursor: "pointer",
                }}
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  const next = (index + 1) % videos.length;
                  const nextLayer = activeLayer === 0 ? 1 : 0;
                  const el = videoRefs[nextLayer].current;
                  if (!el) return;
                  el.src = videos[next];
                  el.load();
                  el.playbackRate = VIDEO_SPEED;
                  el.play().catch(() => { });
                  setIndex(next);
                  setActiveLayer(nextLayer);
                }}
                style={{
                  fontSize: 12, padding: "5px 14px", borderRadius: 20,
                  border: `1px solid ${C.g300}`, background: C.white,
                  color: C.g600, cursor: "pointer",
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div style={card({ marginBottom: 24 })}>
          <div style={sectionLabel}>How it works</div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: C.g800, marginBottom: 20 }}>
            From urine to diagnosis in real time
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
            {[
              {
                image: <img src={trapped_particles} alt="Trapped Particles" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />,
                step: "01",
                title: "Bacterial capture",
                body: "As urine flows tangentially across the SCERA surface, bacteria become trapped in the ceramic nanostructure's pores due to their size and surface charge.",
              },
              {
                image: <img src={impedance_strings} alt="Impedance Measurement" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />,
                step: "02",
                title: "Impedance measurement",
                body: "Embedded electrodes measure an impedance spectrum across the trapped material. Each bacterial species produces a distinct electrical signature.",
              },
              {
                image: <img src={nanoparticle_structures} alt="ML Classification" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />,
                step: "03",
                title: "ML classification",
                body: "An on-device machine learning model classifies the impedance pattern in real time, identifying the likely pathogen without sending raw data to the cloud.",
              },
              {
                image: <img src={clinician_data_transfer} alt="Data Transfer" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />,
                step: "04",
                title: "Data Transfer & Alert",
                body: "The classification result is transmitted to the hospital's monitoring system via BLE or Wi-Fi. If a potential infection is detected, an alert is sent to the responsible clinician.",
              },
              {
                image: <img src={pyrolysis} alt="Self-cleaning via Pyrolysis" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />,
                step: "05",
                title: "Self-cleaning via pyrolysis",
                body: "After measurement, SCERA destroys the trapped particles through pyrolysis — burning them off at high temperature — making the sensor reusable by design.",
              },
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  background: C.g50,
                  borderRadius: 10,
                  padding: "14px 16px",
                  borderLeft: `3px solid ${C.teal}`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                {/* Bild */}
                <div
                  style={{
                    position: "relative",
                    borderRadius: 12,
                    overflow: "hidden",
                    height: 300,
                    boxShadow: "0 2px 18px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
                  }}
                >
                  {s.image}
                  <div
                    style={{
                      position: "absolute",
                      right: 20,
                      bottom: 20,
                      width: 280,
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.05) 60%, transparent)",
                      backdropFilter: "blur(6px)",
                      boxShadow: "0 2px 18px rgba(0,0,0,0.1)",
                      padding: 16,
                      borderRadius: 10,
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 800, color: C.teal, marginBottom: 4 }}>
                      Step {s.step}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "white", textShadow: "0.5px 1px 2px rgba(0,0,0,0.3)", marginBottom: 6 }}>
                      {s.title}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", textShadow: "0.5px 1px 2px rgba(0,0,0,0.3)", lineHeight: 1.6 }}>
                      {s.body}
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 12,
                      right: 12,
                      background: "rgba(0,0,0,0.55)",
                      backdropFilter: "blur(4px)",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: 6,
                      fontSize: 10,
                      fontWeight: 500,
                    }}
                  >
                    ✦ AI-generated
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SCERA LINK ── */}
        <div
          style={card({
            marginBottom: 24,
            background: C.navy,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          })}
        >
          <div>
            <div style={{ ...sectionLabel, color: C.tealM }}>External resource</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 6 }}>
              Learn more about SCERA
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", maxWidth: 560 }}>
              SCERA (Smart CERAmic) is the nanostructured ceramic biosensor at the heart of
              Smartheter. Visit the official SCERA project website for peer-reviewed research,
              material science background, and clinical evidence.
            </div>
          </div>
          <a
            href="https://scera-project.com/"
            target="_blank"
            rel="noreferrer"
            style={{
              flexShrink: 0,
              background: C.teal,
              color: "white",
              padding: "10px 22px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 13,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Visit scera-project.com →
          </a>
        </div>

        {/* ── DISCLAIMER BANNER ── */}
        <div
          style={{
            background: "#FFFBF2",
            border: `1px solid #F5CBA7`,
            borderRadius: 10,
            padding: "12px 18px",
            fontSize: 12,
            color: C.g700,
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          <strong>⚠ Prototype disclaimer:</strong> Smartheter is a student research prototype
          developed at Hochschule Mannheim. It is not a certified medical device and is not
          intended for clinical use. All patient data shown in this application is fictional and
          for demonstration purposes only.
        </div>
      </div>

      {/* ── FOOTER / IMPRESSUM ── */}
      <footer
        style={{
          background: C.navy,
          color: "rgba(255,255,255,0.6)",
          padding: "40px 40px 28px",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            width: "100%",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 40,
            marginBottom: 32,
          }}
        >
          {/* about */}
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 15, marginBottom: 10 }}>
              Smartheter
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.7 }}>
              A student research project exploring catheter-associated urinary tract infection
              (CAUTI) prevention through real-time biosensing, machine learning, and
              user-centred design.
              <br /><br />
              Built as part of a product development course at{" "}
              <a
                href="https://www.hs-mannheim.de"
                target="_blank"
                rel="noreferrer"
                style={{ color: C.tealM, textDecoration: "none" }}
              >
                Hochschule Mannheim
              </a>
              .
            </div>
          </div>

          {/* team */}
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
              Team
            </div>
            {[
              "Minh Giang Van",
              "Rahel Grandi",
              "Lucas Hoffmann",
              "Michael Pochtar",
              "John Schomaker",
            ].map((name) => (
              <div key={name} style={{ fontSize: 12, marginBottom: 4 }}>
                {name}
              </div>
            ))}
            <div>
              <img src={Bild1} alt="logo" width={80} marginTop={20} />
            </div>
          </div>

          {/* links & legal */}
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
              Links
            </div>
            {[
              { label: "SCERA Project", href: "https://scera-project.com/" },
              { label: "Hochschule Mannheim", href: "https://www.hs-mannheim.de" },
              { label: "inno.space", href: "https://inno-space.de" },
              { label: "instagram", href: "https://www.instagram.com/inno.space/" },
            ].map((l) => (
              <div key={l.label} style={{ fontSize: 12, marginBottom: 4 }}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: C.tealM, textDecoration: "none" }}
                >
                  {l.label} →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            fontSize: 11,
          }}
        >
          <span>© 2025 Smartheter — Student Prototype. Not a medical device.</span>
          <span>
            Core sensor technology:{" "}
            <a
              href="https://scera-project.com/"
              target="_blank"
              rel="noreferrer"
              style={{ color: C.tealM, textDecoration: "none" }}
            >
              SCERA Project
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
