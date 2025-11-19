import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./store/slices/authSlice";
import AppRouter from "./router/";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user from localStorage on app start
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return <AppRouter />;
}

export default App;
