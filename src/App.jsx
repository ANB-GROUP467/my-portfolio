import { HashRouter, Routes, Route, Link } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Experience from "./components/Experience";
import Portfolio from "./components/Portfolio";

function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Sidebar />

      <main
        className="min-h-screen"
        style={{
          marginLeft: 0,
        }}
      >
        <style>{`
          @media (min-width: 768px) {
            #main-inner { margin-left: 300px; }
          }

          @media (min-width: 1024px) {
            #main-inner { margin-left: 320px; }
          }
        `}</style>

        <div
          id="main-inner"
          className="px-4 sm:px-8 lg:px-12 pb-12"
          style={{
            paddingTop: "72px",
          }}
        >
          <Experience />
          <Portfolio />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}
