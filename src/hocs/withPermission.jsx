import { UserContext, hasRole } from "app/UserProvider";
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const withPermission = function(Cmpt, permissions){
  return function WithPermission(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useContext(UserContext);
    
    const hasAnyRole = (user, permissions) => {
        return permissions.some(permission => hasRole(user, permission));
    };

    useEffect(() => {
        console.log(["withPermission useEffect hasAnyRole user: {} compt  ", JSON.stringify(user), location.pathname]);
        if (!user.isDefault && !hasAnyRole(user, permissions)) {
            navigate("/");
        }
    });
    
    if (!hasAnyRole(user, permissions)) {
        return null;
    } else {
        return (<Cmpt {...props}></Cmpt>);
    }
  }
};

export default withPermission;
