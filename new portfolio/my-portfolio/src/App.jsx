import React, { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.10.32/build/spline-viewer.js";
    document.body.appendChild(script);
  }, []);

  return (
    <spline-viewer
      url="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
}