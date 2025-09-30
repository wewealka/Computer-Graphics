import React from "react";

interface ControlPanelProps {
  sides: number;
  setLevels: (value: React.SetStateAction<number>) => void;
  setSides: (value: number) => void;
  levels: number;
  initialRadius: number;
  setInitialRadius: (value: number) => void;
  zOffset: number;
  setZOffset: (value: number) => void;
  isOrdered: boolean;
  setIsOrdered: (value: boolean) => void;
  isDashed: boolean;
  setIsDashed: (value: boolean) => void;
  k: number;
  setK: (value: number) => void;
  manualMu: number;
  setManualMu: (value: number) => void;
}

export default function ControlPanel(props: ControlPanelProps) {
  const {
    sides,
    setSides,
    levels,
    setLevels,
    initialRadius,
    setInitialRadius,
    zOffset,
    setZOffset,
    isOrdered,
    setIsOrdered,
    isDashed,
    setIsDashed,
    k,
    setK,
    manualMu,
    setManualMu,
  } = props;

  return (
    <div
      style={{
        position: "absolute",
        top: "70px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        pointerEvents: "auto",
        width: "100%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Лаба 2</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem 1.5rem",
          marginBottom: "0.5rem",
          justifyContent: "center",
          maxWidth: "90vw",
          margin: "0 auto",
          fontSize: "0.9em",
        }}
      >
        <label>
          Стороны: {sides}
          <input
            type="range"
            min="3"
            max="12"
            step="1"
            value={sides}
            onChange={(e) => setSides(Number(e.target.value))}
          />
        </label>
        <label>
          Уровни (N/M): {levels}
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={levels}
            onChange={(e) => setLevels(Number(e.target.value))}
          />
        </label>
        <label>
          Радиус: {initialRadius.toFixed(1)}
          <input
            type="range"
            min="1"
            max="15"
            step="0.1"
            value={initialRadius}
            onChange={(e) => setInitialRadius(Number(e.target.value))}
          />
        </label>
        <label>
          Смещение Z: {zOffset.toFixed(2)}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={zOffset}
            onChange={(e) => setZOffset(Number(e.target.value))}
          />
        </label>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isOrdered}
              onChange={() => setIsOrdered(!isOrdered)}
            />{" "}
            Упорядоченный
          </label>
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="checkbox"
              checked={isDashed}
              onChange={() => setIsDashed(!isDashed)}
            />{" "}
            Пунктир
          </label>
        </div>
        {isOrdered ? (
          <label>
            k (k*π/4): {k}
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
            />
          </label>
        ) : (
          <label>
            μ: {manualMu.toFixed(2)}
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={manualMu}
              onChange={(e) => setManualMu(Number(e.target.value))}
            />
          </label>
        )}
      </div>
      <div
        style={{
          fontSize: "0.9em",
          color: "#333",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <div>
          <b>onDoubleClick по сетке</b> - установить центр вращения (красный маркер).
        </div>
        <div>
          Управление: <b>WASD/Стрелки</b> - перемещение, <b>Q/E</b> - вращение,{" "}
          <b>+/-</b> - масштаб, <b>N/M</b> - уровни.
        </div>
      </div>
    </div>
  );
}
