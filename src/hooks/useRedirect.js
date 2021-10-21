import { useEffect } from "react";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import { useDID } from "../Contexts/DID/DIDContext";

export const useRedirect = () => {
  const location = useLocation();
  const { isAuthenticated } = useDID();
  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/") {
      navigate("/");
    }
  }, [location]);
};
