import { Link, Route, Routes } from "react-router-dom";
import Hw1Scene from "./scenes/hw1/Hw1Scene";
import Hw2Scene from "./scenes/hw2/Hw2Scene";

const styles = {
  app: {
    fontFamily: "sans-serif",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
  header: {
    position: "absolute" as "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    zIndex: 100,
    gap: "15px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
    transition: "background-color 0.2s, border-color 0.2s",
  },
  activeButton: {
    backgroundColor: "#007bff",
    color: "white",
    borderColor: "#007bff",
  },
};

const App = () => {
  return (
    <div style={styles.app}>
      <Routes>
        <Route
          path="/"
          element={
            <header style={styles.header}>
              <Link to="/hw1" style={{ textDecoration: "none" }}>
                <button style={styles.button}>Лабораторная работа №1</button>
              </Link>
              <Link to="/hw2" style={{ textDecoration: "none" }}>
                <button style={styles.button}>Лабораторная работа №2</button>
              </Link>
            </header>
          }
        />
        <Route path="/hw1" element={<Hw1Scene />} />
        <Route path="/hw2" element={<Hw2Scene />} />
      </Routes>
    </div>
  );
};

export default App;
