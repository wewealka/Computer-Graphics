import React, { useMemo } from "react";
import * as THREE from "three";

type Polygon = THREE.Vector3[];

interface NestedShapesProps {
  sides?: number;
  levels?: number;
  initialRadius?: number;
  mu?: number;
  isDashed?: boolean;
  zOffset?: number;
  rotationStep?: number;
}

export default function NestedShapes({
  sides = 4,
  levels = 15,
  initialRadius = 8,
  mu = 0.1,
  isDashed = false,
  zOffset = 0,
  rotationStep = Math.PI / 20,
}: NestedShapesProps) {
  const polygons = useMemo(() => {
    const allPolygons: Polygon[] = [];

    if (sides < 3) return allPolygons;

    let currentVertices: THREE.Vector3[] = [];
    const angleOffset = sides === 4 ? Math.PI / 4 : 0;

    for (let i = 0; i < sides; i++) {
      const angle = angleOffset + (i / sides) * 2 * Math.PI;
      currentVertices.push(
        new THREE.Vector3(
          initialRadius * Math.cos(angle),
          initialRadius * Math.sin(angle),
          0
        )
      );
    }

    allPolygons.push(currentVertices);

    const rotationMatrix = new THREE.Matrix4();

    for (let i = 0; i < levels; i++) {
      const nextVertices: THREE.Vector3[] = [];
      const currentZ = (i + 1) * zOffset;

      for (let j = 0; j < sides; j++) {
        const p1 = currentVertices[j];
        const p2 = currentVertices[(j + 1) % sides];
        const newVertex = new THREE.Vector3().lerpVectors(p1, p2, mu);
        newVertex.z = currentZ;
        nextVertices.push(newVertex);
      }

      rotationMatrix.makeRotationZ(rotationStep);
      for (let j = 0; j < nextVertices.length; j++) {
        nextVertices[j].applyMatrix4(rotationMatrix);
      }

      allPolygons.push(nextVertices);
      currentVertices = nextVertices;
    }

    return allPolygons;
  }, [sides, levels, initialRadius, mu, zOffset, rotationStep]);

  return (
    <group>
      {polygons.map((polygon, index) => {
        const points = [...polygon, polygon[0]];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = isDashed
          ? new THREE.LineDashedMaterial({
              color: 0x0077ff,
              dashSize: 0.3,
              gapSize: 0.2,
            })
          : new THREE.LineBasicMaterial({
              color: 0x0077ff,
              linewidth: 1,
            });
  
        const line = isDashed
          ? new THREE.Line(geometry, material as THREE.LineDashedMaterial)
          : new THREE.Line(geometry, material);
  
        if (isDashed) line.computeLineDistances();
  
        return <primitive key={index} object={line} />;
      })}
    </group>
  );
  
}
