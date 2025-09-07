import React, { useState, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Text, Grid } from "@react-three/drei";
import * as THREE from "three";

function generateCissoidPoints(a: number = 3, tMax = 5, step = 0.01) {
  const points: THREE.Vector3[] = [];
  const colors: THREE.Color[] = [];

  for (let t = -tMax; t <= tMax; t += step) {
    if (Math.abs(1 + t * t) < 1e-6) continue;
    const x = (a * t * t) / (1 + t * t);
    const y = (a * t * t * t) / (1 + t * t);
    points.push(new THREE.Vector3(x, y, 0));

    const color = new THREE.Color().setHSL(0.08 + 0.5 * ((t + tMax) / (2 * tMax)), 1, 0.5);
    colors.push(color);
  }

  return { points, colors };
}

function Cissoid({ a }: { a: number }) {
  const { points, colors } = useMemo(() => generateCissoidPoints(a), [a]);
  return <Line points={points} vertexColors={colors} lineWidth={3} />;
}

function StaticAxes({ size = 10 }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.position.copy(camera.position);
      groupRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group ref={groupRef}>
      <Line points={[[-size, 0, 0], [size, 0, 0]]} color="red" lineWidth={2} />
      <Line points={[[0, -size, 0], [0, size, 0]]} color="blue" lineWidth={2} />
      <Line points={[[0, 0, -size], [0, 0, size]]} color="green" lineWidth={2} />

      <Text position={[size, 0, 0]} fontSize={0.5} color="red">X</Text>
      <Text position={[0, size, 0]} fontSize={0.5} color="blue">Y</Text>
      <Text position={[0, 0, size]} fontSize={0.5} color="green">Z</Text>
    </group>
  );
}

function BoundingCube({ size = 10 }) {
  return (
    <mesh>
      <boxGeometry args={[size * 2, size * 2, size * 2]} />
      <meshBasicMaterial color="gray" wireframe opacity={0.3} transparent />
    </mesh>
  );
}

export default function App() {
  const [a, setA] = useState(3);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f0f0f0",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Циссоид в 3D кубе</h1>
      <input
        type="range"
        min="1"
        max="10"
        step="0.1"
        value={a}
        onChange={(e) => setA(Number(e.target.value))}
        style={{ marginBottom: "1rem", width: "400px" }}
      />
      <div style={{ width: "80%", height: "80%" }}>
        <Canvas camera={{ position: [15, 15, 15], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <OrbitControls />
          <StaticAxes size={10} />
          <Grid args={[20, 20]} position={[0, 0, 0]} cellColor="#ccc" sectionColor="#999" />
          <Cissoid a={a} />
          <BoundingCube size={10} />
        </Canvas>
      </div>
    </div>
  );
}
