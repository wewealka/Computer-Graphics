import * as THREE from 'three';

export const ClickablePlane = ({ setRotationCenter }: { setRotationCenter: (point: THREE.Vector3) => void }) => (
  <mesh
    onDoubleClick={(e) => {
      e.stopPropagation();
      setRotationCenter(e.point);
    }}
    rotation={[-Math.PI / 2, 0, 0]}
    visible={false}
  >
    <planeGeometry args={[100, 100]} />
  </mesh>
);

export const RotationMarker = ({ position }: { position: THREE.Vector3 }) => (
  <mesh position={position}>
    <sphereGeometry args={[0.2, 16, 16]} />
    <meshBasicMaterial color="red" />
  </mesh>
);