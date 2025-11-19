import { BrowserRouter, Routes, Route } from "react-router";
import "./styles/App.css";
import RoomsPage from "./pages/rooms/RoomsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoomsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
