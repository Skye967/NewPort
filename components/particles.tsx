"use client";

import {
  Particles as TsParticles,
  ParticlesProvider,
  type IParticlesProps,
} from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// Module-level so the reference is stable: Particles re-creates its container
// whenever the options object changes identity.
const options: IParticlesProps["options"] = {
  fpsLimit: 30,
  fullScreen: false,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "grab" },
    },
    modes: { grab: { distance: 140 } },
  },
  particles: {
    links: { enable: true, distance: 150, opacity: 0.5, width: 1 },
    move: { enable: true, speed: 1, outModes: "out" },
    number: { value: 100, limit: { value: 150 } },
    opacity: { value: 0.5 },
    size: { value: 2 },
  },
};

export function Particles() {
  return (
    <ParticlesProvider init={loadSlim}>
      <TsParticles
        id="hero-particles"
        className="size-full"
        options={options}
      />
    </ParticlesProvider>
  );
}
