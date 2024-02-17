import React, { useEffect, useRef, useState } from "react";
import { galaxia } from "./components/galaxia";
import "./App.css";

function App() {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("div > div")[currentIndex];
    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const scrollToImage = (direccion) => {
    if (direccion === "prev") {
      setCurrentIndex((curr) => {
        const primeraimg = currentIndex === 0;
        return primeraimg ? 0 : curr - 1;
      });
    } else {
      const ultimaimg = currentIndex === galaxia.length - 1;
      if (!ultimaimg) {
        setCurrentIndex((curr) => curr + 1);
      }
    }
  };
  console.log(currentIndex);
  const gotToslide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="main">
      <div className="leftArrow" onClick={() => scrollToImage("prev")}>
        &#10092;
      </div>
      <div className="rightArrow" onClick={() => scrollToImage("next")}>
        &#10093;
      </div>
      <div className="slider">
        <div ref={listRef} className="container">
          {galaxia.map((item) => {
            return (
              <div key={item.id} className="planeta">
                <h1>{item.titulo}</h1>
                <img src={item.imgUrl} width={500} height={400} />
                <p>{item.texto}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="puntos">
        {galaxia.map((_, idx) => (
          <div
            key={idx}
            className={`puntos-item ${idx === currentIndex ? "active" : ""}`}
            onClick={() => gotToslide(idx)}
          >
            &#9865;
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
