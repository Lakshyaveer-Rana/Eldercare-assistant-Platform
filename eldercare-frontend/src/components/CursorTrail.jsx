// src/components/CursorTrail.jsx
import React, { useState, useEffect } from "react";

const CursorTrail = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // 1. Randomly decide if this particle is a Heart or a Cross
      const types = ["heart", "cross"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      // 2. Add some randomness to position so they don't look like a straight line
      const offsetX = (Math.random() - 0.5) * 10; 
      const offsetY = (Math.random() - 0.5) * 10;

      const newParticle = {
        x: e.clientX + offsetX,
        y: e.clientY + offsetY,
        id: Date.now() + Math.random(), // Ensure unique ID
        type: randomType,
        color: randomType === "heart" ? "text-red-500" : "text-blue-500", // Red Hearts, Blue Crosses
      };

      setParticles((prev) => [...prev, newParticle]);

      // 3. Remove particle after 1 second (longer float time)
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 800);
    };

    // Throttle: Only create particle every 30ms to prevent lag
    let lastTime = 0;
    const throttledHandler = (e) => {
      const now = Date.now();
      if (now - lastTime > 40) {
        handleMouseMove(e);
        lastTime = now;
      }
    };

    window.addEventListener("mousemove", throttledHandler);
    return () => window.removeEventListener("mousemove", throttledHandler);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute text-xl font-bold ${p.color}`}
          style={{
            left: p.x,
            top: p.y,
            // Inline animation for floating UP
            animation: "floatAndFade 0.8s ease-out forwards",
          }}
        >
          {/* Render the Symbol */}
          {p.type === "heart" ? "❤️" : "✚"}
        </div>
      ))}
    </div>
  );
};

export default CursorTrail;