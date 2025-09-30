import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import * as THREE from "three";
import StaticAxes from "../../hw1/components/StaticAxes";
import BoundingCube from "../../hw1/components/BoundingCube";
import NestedShapes from "./NestedShapes";
import { ClickablePlane, RotationMarker } from "./SceneHelpers";

interface SceneContainerProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  rotationCenter: THREE.Vector3;
  setRotationCenter: (point: THREE.Vector3) => void;
  shapeProps: {
    sides: number;
    levels: number;
    mu: number;
    initialRadius: number;
    isDashed: boolean;
    zOffset: number;
  };
}

export default function SceneContainer(props: SceneContainerProps) {
  const {
    position,
    rotation,
    scale,
    rotationCenter,
    setRotationCenter,
    shapeProps,
  } = props;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#f9f9f9",
        position: "relative",
      }}
    >
      <Canvas camera={{ position: [15, 15, 25], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={0.5} />
        <OrbitControls />
        <StaticAxes size={12} />
        <Grid args={[24, 24]} cellColor="#ccc" sectionColor="#999" />

        <ClickablePlane setRotationCenter={setRotationCenter} />
        <RotationMarker position={rotationCenter} />

        <group position={position}>
          <group position={rotationCenter}>
            <group rotation={rotation}>
              <group position={rotationCenter.clone().negate()}>
                <group scale={scale}>
                  <NestedShapes {...shapeProps} />
                </group>
              </group>
            </group>
          </group>
        </group>

        <BoundingCube size={12} />
      </Canvas>
    </div>
  );
}
