import { useEffect, useMemo, useRef, useState } from "react";
import { C } from "../../constants/colors";

import Medien1 from "../../data/videos/Medien1.mp4";
import Medien2 from "../../data/videos/Medien2.mp4";
import Medien3 from "../../data/videos/Medien3.mp4";
import Medien4 from "../../data/videos/Medien4.mp4";
import Medien5 from "../../data/videos/Medien5.mp4";
import Medien6 from "../../data/videos/Medien6.mp4";
import Medien7 from "../../data/videos/Medien7.mp4";

//https://scera-project.com/

//let Medien1 = "https://www.dropbox.com/scl/fi/fivve2fwhvn1hloz1xmi9/Medien1.mp4?rlkey=e5s48zb2ohwbiw3batlq65fpw&st=z0q8n9qa&dl=1";
//let Medien2 = "https://www.dropbox.com/scl/fi/alynisjjeorsqi2z16w2f/Medien2.mp4?rlkey=upth0lgiqbgsjc6r4ovdo8o4q&st=oz77vgrr&dl=1";
//let Medien3 = "https://www.dropbox.com/scl/fi/u1my162umje9nonybbkg1/Medien3.mp4?rlkey=btrcx3cgfl52r3s2gvj0geubt&st=mb8ew6no&dl=1";
//let Medien4 = "https://www.dropbox.com/scl/fi/1zfw09fh8ut0wboy42st1/Medien4.mp4?rlkey=jsl46x7loixmjzhjlk52wfo5n&st=fnc6wddp&dl=1";
//let Medien5 = "https://www.dropbox.com/scl/fi/5met6b2667sno1lumjomd/Medien5.mp4?rlkey=24sufjy8klik5it8bei9d482c&st=zowsrj19&dl=1";
//let Medien6 = "https://www.dropbox.com/scl/fi/2v9ls8d8692n0o994qtk8/Medien6.mp4?rlkey=twfjpzvsoi4mgmn8inl5x0c5r&st=tbznebmi&dl=1";
//let Medien7 = "https://www.dropbox.com/scl/fi/u963qhp8am2kzpbsu72od/Medien7.mp4?rlkey=43tyewwiznidnx9jrwlx5xcu6&st=39b0ywui&dl=1";


export default function TechnologyView({tscreen, setTscreen, tech}){
    const videos = useMemo(() => [
        Medien1,
        Medien2,
        Medien3,
        Medien4,
        Medien5,
        Medien6,
        Medien7
    ], []);

    const [index, setIndex] = useState(0);
    const [activeLayer, setActiveLayer] = useState(0); // 0 oder 1

    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const videoRefs = useMemo(() => [videoRef1, videoRef2], []);
    
    const VIDEO_SPEED = 0.75; // Geschwindigkeit
    const PAUSE_MS = 1500; // Pause zwischen Videos

    // ---------------------------
    // 🔥 PRELOAD ALL VIDEOS
    // ---------------------------
    // eslint-disable-next-line
    useEffect(() => {
        videos.forEach((src) => {
            const video = document.createElement("video");
            video.src = src;
            video.preload = "auto";
        });
    }, [videos]);


    // PLAY CURRENT VIDEO
    // ---------------------------
    // eslint-disable-next-line
    useEffect(() => {
        const el = videoRefs[activeLayer].current;
        if (!el) return;

        el.src = videos[index];
        el.load();
        el.playbackRate = VIDEO_SPEED;

        const playPromise = el.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {});
        }
    }, [activeLayer, index, videos, videoRefs]);

  const nextVideo = () => {
    setTimeout(() => {
      const nextIndex = (index + 1) % videos.length;
      const nextLayer = activeLayer === 0 ? 1 : 0;

        const nextVideoEl = videoRefs[nextLayer].current;
        const prevVideoEl = videoRefs[activeLayer].current;
        if (!nextVideoEl || !prevVideoEl) return;

      // Video in inaktiver Layer vorbereiten
      
      if (nextVideoEl) {
        nextVideoEl.currentTime = 0;
        nextVideoEl.playbackRate = VIDEO_SPEED;
        nextVideoEl.play().catch(() => {});
        nextVideoEl.src = videos[nextIndex];
        nextVideoEl.load(); // Preload the next video
        //prevVideoEl.pause();
      }

      setIndex(nextIndex);
      setActiveLayer(nextLayer);
    }, PAUSE_MS);
  };

  // UI --------------------------------

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "calc(100vh - 90px)",
                background: C.g100,
                padding: 24,
                gap: 20,
                overflowY: "auto",
            }}
        >
    {/* Infokarte */}
        <div
            style={{
                background: C.white,
                border: `1px solid ${C.g200}`,
                borderRadius: 10,
                padding: 20,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
        >
        <div
          style={{fontSize: 20,fontWeight: 700,color: C.green,marginBottom: 12,}}>
          {tech.name}
        </div>
        <div
          style={{fontSize: 14,lineHeight: 1.6,color: C.g800,maxWidth: 900,}}>
          {tech.detail}
        </div>
      </div>

      {/* Video */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "100vh",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
         {/* Video Layer 1 */}
          <video
            ref={videoRefs[0]}
            muted
            playsInline
            onEnded={nextVideo}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              borderRadius: 12,
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              objectFit: "cover",
              opacity: activeLayer === 0 ? 1 : 0,
              transition: "opacity 500ms ease",
            }}
          />

          {/* Video Layer 2 */}
          <video
            ref={videoRefs[1]}
            muted
            playsInline
            onEnded={nextVideo}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              borderRadius: 12,
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              objectFit: "cover",
              opacity: activeLayer === 1 ? 1 : 0,
              transition: "opacity 500ms ease",
            }}
          />
      </div>
    </div>
</div>
  );
}