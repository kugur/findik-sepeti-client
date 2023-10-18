import httpClientWrapper from "components/Common/HttpClientWrapper";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { States as CustomerAccountStates } from "features/customerAccount/customerAccount";

const UserContext = createContext({});

const isPreUser = (userInfo) => {
  return (
    userInfo &&
    userInfo.authorities &&
    userInfo.authorities.findIndex(
      (authority) => authority.authority === "ROLE_PRE_USER"
    ) > -1
  );
};

const hasRole = (userInfo, role) => {
  return (
    userInfo &&
    userInfo.authorities &&
    userInfo.authorities.findIndex(
      (authority) => authority.authority === role
    ) > -1
  );
};

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({ email: "", isDefault: true });
  

  const handlePreUser = useCallback(() => {
    console.log("handlePreUser re-created");
    if (location.pathname !== "/users") {
      console.log(`[UserProvider] navigate`);
      navigate("/users", {
        state: {
          state: CustomerAccountStates.NEW,
          email: user.email,
        },
      });
    }
  }, [location.pathname, user.email, navigate]);

  const logout = () => {
    console.log("Logout has been clicked");
    httpClientWrapper.post(
      "/logout",
      {},
      function (response) {
        setUser({});
        navigate("/");
      },
      function (error) {}
    );
  };

  // console.log(`UserProvider before user:::: ${JSON.stringify(user)}`);

  useEffect(() => {
    console.log("[UserProvider] useEffect fetching userInfo");
    httpClientWrapper.get("/users", function (response) {
      setUser(response);

      if (
        response.authorities.length > 0 &&
        response.authorities.findIndex(
          (authority) => authority.authority === "ROLE_PRE_USER"
        ) > -1
      ) {
        handlePreUser();
      }
    }, function(error) {
      setUser({...user, isDefault: false})
    });
  }, [user.version, handlePreUser]);

  // Eger useEffect koymazsak sikinti oluyor. Render etmesine engel oluyor
  //TODO(ugur) Baska bir yere koyabilir miyiz ? Yada useEffect  siz olabilir mi acaba ?
  //TODO(ugur) dependency lerden 'user' i cikartabilir miyiz ??
  useEffect(() => {
    console.log(
      `[UserProvider] handlePreUser ${user?.email} useEffect `
    );
    if (isPreUser(user)) {
      handlePreUser();
    }
  }, [user, user.email, location.pathname, handlePreUser]);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext, isPreUser, hasRole };
