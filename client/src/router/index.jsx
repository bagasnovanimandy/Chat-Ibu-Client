import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginPage from "../pages/auth/LoginPage";
// import RegisterPage from "../pages/auth/RegisterPage";
import RoomsPage from "../pages/rooms/RoomsPage";
// import ChatPage from "../pages/chat/ChatPage";
// import NotFoundPage from "../pages/common/NotFoundPage";
// import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> */}
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <RoomsPage />
            // </ProtectedRoute>
          }
        />
        {/* <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
