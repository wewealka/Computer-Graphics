import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import StaticAxes from "./components/StaticAxes";
import Cissoid from "./components/Cissoid";
import BoundingCube from "./components/BoundingCube";

export default function Hw1Scene() {
  const [a, setA] = useState(3);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

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

      <label>
        a:
        <input
          type="range"
          min="1"
          max="10"
          step="0.1"
          value={a}
          onChange={(e) => setA(Number(e.target.value))}
          style={{ margin: "0.5rem", width: "400px" }}
        />
      </label>

      <label>
        X:
        <input
          type="range"
          min="-10"
          max="10"
          step="0.1"
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          style={{ margin: "0.5rem", width: "400px" }}
        />
      </label>

      <label>
        Y:
        <input
          type="range"
          min="-10"
          max="10"
          step="0.1"
          value={y}
          onChange={(e) => setY(Number(e.target.value))}
          style={{ margin: "0.5rem", width: "400px" }}
        />
      </label>

      <label>
        Z:
        <input
          type="range"
          min="-10"
          max="10"
          step="0.1"
          value={z}
          onChange={(e) => setZ(Number(e.target.value))}
          style={{ margin: "0.5rem", width: "400px" }}
        />
      </label>

      <div style={{ width: "80%", height: "80%" }}>
        <Canvas camera={{ position: [15, 15, 15], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />

          <OrbitControls />
          <StaticAxes size={10} />
          <Grid
            args={[20, 20]}
            position={[0, 0, 0]}
            cellColor="#ccc"
            sectionColor="#999"
          />

          <Cissoid a={a} position={[x, y, z]} />
          <BoundingCube size={10} />
        </Canvas>
      </div>
    </div>
  );
}
