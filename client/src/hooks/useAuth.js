import { useSelector, useDispatch } from "react-redux";
import { logout, clearError } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  // const clearAuthError = () => {
  //   dispatch(clearError());
  // };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    logout: handleLogout,
    // clearError: clearAuthError,
  };
};
