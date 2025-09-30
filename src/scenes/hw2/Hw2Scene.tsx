import React, { useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import ControlPanel from "./components/ControlPanel";
import SceneContainer from "./components/SceneContainer";

export default function Hw2Scene() {
  const [sides, setSides] = useState(4);
  const [levels, setLevels] = useState(15);
  const [initialRadius, setInitialRadius] = useState(8);
  const [manualMu, setManualMu] = useState(0.1);
  const [zOffset, setZOffset] = useState(0);

  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [scale, setScale] = useState<[number, number, number]>([1, 1, 1]);

  const [isOrdered, setIsOrdered] = useState(false);
  const [k, setK] = useState(1);
  const [isDashed, setIsDashed] = useState(false);
  const [rotationCenter, setRotationCenter] = useState(
    new THREE.Vector3(0, 0, 0)
  );

  const calculatedMu = useMemo(() => {
    if (!isOrdered || levels === 0) return manualMu;
    const angle = (k * Math.PI) / (4 * levels);
    const tanValue = Math.tan(angle);
    return tanValue / (tanValue + 1);
  }, [isOrdered, k, levels, manualMu]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const posStep = 0.5,
        angleStep = Math.PI / 18,
        scaleStep = 0.1;
      switch (event.key.toLowerCase()) {
        case "w":
        case "arrowup":
          setPosition((p) => [p[0], p[1] + posStep, p[2]]);
          break;
        case "s":
        case "arrowdown":
          setPosition((p) => [p[0], p[1] - posStep, p[2]]);
          break;
        case "a":
        case "arrowleft":
          setPosition((p) => [p[0] - posStep, p[1], p[2]]);
          break;
        case "d":
        case "arrowright":
          setPosition((p) => [p[0] + posStep, p[1], p[2]]);
          break;
        case "q":
          setRotation((r) => [r[0], r[1], r[2] + angleStep]);
          break;
        case "e":
          setRotation((r) => [r[0], r[1], r[2] - angleStep]);
          break;
        case "+":
        case "=":
          setScale((s) => [
            s[0] + scaleStep,
            s[1] + scaleStep,
            s[2] + scaleStep,
          ]);
          break;
        case "-":
        case "_":
          setScale((s) => [
            Math.max(0.1, s[0] - scaleStep),
            Math.max(0.1, s[1] - scaleStep),
            Math.max(0.1, s[2] - scaleStep),
          ]);
          break;
        case "n":
          setLevels((l) => l + 1);
          break;
        case "m":
          setLevels((l) => Math.max(1, l - 1));
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const controlPanelProps = {
    sides,
    setSides,
    levels,
    setLevels,
    initialRadius,
    setInitialRadius,
    zOffset,
    setZOffset,
    isOrdered,
    setIsOrdered,
    isDashed,
    setIsDashed,
    k,
    setK,
    manualMu,
    setManualMu,
  };

  const sceneContainerProps = {
    position,
    rotation,
    scale,
    rotationCenter,
    setRotationCenter,
    shapeProps: {
      sides,
      levels,
      mu: calculatedMu,
      initialRadius,
      isDashed,
      zOffset,
    },
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ControlPanel {...controlPanelProps} />
      <SceneContainer {...sceneContainerProps} />
    </div>
  );
}
