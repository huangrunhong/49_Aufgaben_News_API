import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dynamic-router/:index/:language/:search"
            element={<Detail />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
