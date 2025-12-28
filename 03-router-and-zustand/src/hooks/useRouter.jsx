import { useLocation, useNavigate } from "react-router";

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  function navigateTo(path) {
    navigate(path);
  }

  const currentPath = location.pathname;

  return {
    currentPath,
    navigateTo,
  };
}
