import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./store/slices/authSlice";
import { SocketProvider } from "./context/socket";
import AppRouter from "./router";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user from localStorage on app start
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <SocketProvider>
      <AppRouter />
    </SocketProvider>
  );
}

export default App;
