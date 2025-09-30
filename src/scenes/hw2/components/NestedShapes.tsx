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
}

export default function NestedShapes({
  sides = 4,
  levels = 15,
  initialRadius = 8,
  mu = 0.1,
  isDashed = false,
  zOffset = 0,
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
      allPolygons.push(nextVertices);
      currentVertices = nextVertices;
    }
    return allPolygons;
  }, [sides, levels, initialRadius, mu, zOffset]);

  const linePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    if (polygons.length < 2) return points;

    const firstPolygon = polygons[0];
    for (let i = 0; i < sides; i++) {
      points.push(firstPolygon[i]);
      points.push(firstPolygon[(i + 1) % sides]);
    }

    for (let i = 0; i < polygons.length - 1; i++) {
      const outerPolygon = polygons[i];
      const innerPolygon = polygons[i + 1];
      for (let j = 0; j < sides; j++) {
        points.push(outerPolygon[j]);
        points.push(innerPolygon[j]);
      }
    }
    return points;
  }, [polygons, sides]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  return (
    <lineSegments geometry={geometry}>
      {isDashed ? (
        <lineDashedMaterial color="tomato" dashSize={0.5} gapSize={0.25} />
      ) : (
        <lineBasicMaterial color="dodgerblue" />
      )}
    </lineSegments>
  );
}
