import { UserContext, hasRole } from "app/UserProvider";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withPermission = function(Cmpt, permissions){
  return function WithPermission(props) {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    
    const hasAnyRole = (user, permissions) => {
        return permissions.some(permission => hasRole(user, permission));
    };

    useEffect(() => {
        if (!hasAnyRole(user, permissions)) {
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
