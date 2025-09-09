import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import Cissoid from "./Cissoid";
import StaticAxes from "./StaticAxes";
import BoundingCube from "./BoundingCube";

export default function Hw1Scene() {
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
