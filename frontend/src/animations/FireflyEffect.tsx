// components/FireflyEffect.tsx
import React from "react";
import Particles from "react-tsparticles";
import { loadFireflyPreset } from "tsparticles-preset-firefly";
import type { Engine } from "tsparticles-engine";
import { useCallback } from "react";

const FireflyEffect = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFireflyPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "firefly",
        fullScreen: {
          enable: false,
        },
        background: {
          color: {
            value: "transprant",
          },
        },
        style: {
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: "0",
        },
        particles: {
          color: {
            value: "#10b981",
          },
          size: {
            value: { min: 1, max: 3 },
          },
          number: {
            value: 10,
          },
          life: {
            duration: {
              value: 1, // lifespan in seconds (try 1–3 for short-lived particles)
            },
            count: 1, // number of times a particle is "reborn"
          },
        },
      }}
    />
  );
};

export default FireflyEffect;
