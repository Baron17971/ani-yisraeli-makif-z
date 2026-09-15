"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SoundGraph = {
  context: AudioContext;
  oscillators: OscillatorNode[];
  lfo: OscillatorNode;
};

export default function AmbientSound() {
  const graphRef = useRef<SoundGraph | null>(null);
  const [active, setActive] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAvailable(Boolean(params.get("room")));
    return () => stopSound();
  }, []);

  const stopSound = () => {
    const graph = graphRef.current;
    if (!graph) return;
    graph.oscillators.forEach(oscillator => {
      try { oscillator.stop(); } catch {}
    });
    try { graph.lfo.stop(); } catch {}
    void graph.context.close();
    graphRef.current = null;
  };

  const startSound = async () => {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    if (context.state === "suspended") await context.resume();

    const master = context.createGain();
    master.gain.value = 0.028;

    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 520;
    filter.Q.value = 0.7;
    filter.connect(master);
    master.connect(context.destination);

    const oscillators: OscillatorNode[] = [];
    const tones = [55, 82.41, 110, 164.81];
    const levels = [0.9, 0.55, 0.35, 0.12];

    tones.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = index < 2 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index % 2 === 0 ? -4 : 4;
      gain.gain.value = levels[index];
      oscillator.connect(gain);
      gain.connect(filter);
      oscillator.start();
      oscillators.push(oscillator);
    });

    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    lfo.type = "sine";
    lfo.frequency.value = 0.075;
    lfoGain.gain.value = 0.008;
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    lfo.start();

    graphRef.current = { context, oscillators, lfo };
  };

  const toggle = async () => {
    if (active) {
      stopSound();
      setActive(false);
      return;
    }
    await startSound();
    setActive(true);
  };

  if (!available) return null;

  return <button
    type="button"
    className={`time-sound-control${active ? " active" : ""}`}
    onClick={toggle}
    aria-pressed={active}
    aria-label={active ? "השתקת צליל המסע" : "הפעלת צליל מסע"}
  >
    {active ? <VolumeX size={17}/> : <Volume2 size={17}/>}
    <span>{active ? "השתקה" : "צליל מסע"}</span>
  </button>;
}
