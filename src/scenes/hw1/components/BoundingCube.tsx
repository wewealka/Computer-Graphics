export default function BoundingCube({ size = 10 }: { size?: number }) {
  return (
    <mesh>
      <boxGeometry args={[size * 2, size * 2, size * 2]} />
      <meshBasicMaterial color="gray" wireframe opacity={0.3} transparent />
    </mesh>
  );
}
