import React from "react";
import { Line, Text } from "@react-three/drei";

export default function StaticAxes({ size = 10 }: { size?: number }) {
  return (
    <group>
      <Line points={[[-size, 0, 0], [size, 0, 0]]} color="red" lineWidth={2} />
      <Line points={[[0, -size, 0], [0, size, 0]]} color="blue" lineWidth={2} />
      <Line points={[[0, 0, -size], [0, 0, size]]} color="green" lineWidth={2} />

      <Text position={[size + 0.5, 0, 0]} fontSize={0.5} color="red">X</Text>
      <Text position={[0, size + 0.5, 0]} fontSize={0.5} color="blue">Y</Text>
      <Text position={[0, 0, size + 0.5]} fontSize={0.5} color="green">Z</Text>
    </group>
  );
}
