import React, { useMemo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

export function generateCissoidPoints(a: number = 2, tMax = 5, step = 0.01) {
  const points: THREE.Vector3[] = [];
  for (let t = -tMax; t <= tMax; t += step) {
    if (Math.abs(1 + t * t) < 1e-6) continue;
    const x = (a * t * t) / (1 + t * t);
    const y = (a * t * t * t) / (1 + t * t);
    points.push(new THREE.Vector3(x, y, 0));
  }
  return points;
}

interface CissoidProps {
  a: number;
}

export default function Cissoid({ a }: CissoidProps) {
  const points = useMemo(() => generateCissoidPoints(a), [a]);

  return <Line points={points} color="#ff8800" lineWidth={2} />;
}
