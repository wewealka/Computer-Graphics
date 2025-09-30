import React, { useMemo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

function generateCissoidPoints(a: number = 3, tMax = 5, step = 0.01) {
  const points: THREE.Vector3[] = [];
  const colors: THREE.Color[] = [];

  for (let t = -tMax; t <= tMax; t += step) {
    if (Math.abs(1 + t * t) < 1e-6) continue;

    const x = (a * t * t) / (1 + t * t);
    const y = (a * t * t * t) / (1 + t * t);

    points.push(new THREE.Vector3(x, y, 0));

    const color = new THREE.Color().setHSL(
      0.08 + 0.5 * ((t + tMax) / (2 * tMax)),
      1,
      0.5
    );
    colors.push(color);
  }

  return { points, colors };
}

export default function Cissoid({
  a,
  position,
}: {
  a: number;
  position?: [number, number, number];
}) {
  const { points, colors } = useMemo(() => generateCissoidPoints(a), [a]);

  return (
    <Line
      points={points}
      vertexColors={colors}
      lineWidth={3}
      position={position}
    />
  );
}
