import { useContext } from "react";
import { UserContext, hasRole } from "app/UserProvider";

const withIfHavePermissions = function(CmpntPermissionsPairList) {
    console.log("[withIfHavePermissions] initializing");
    return function WithIfHaverPermission(props, children) {
        const {user} = useContext(UserContext);
        const hasAnyRole = (user, permissions) => {
            return permissions.some(permission => hasRole(user, permission)) || permissions.length === 0;
        };

        console.log("[WithIfHaverPermission] user:: " + JSON.stringify(user));
        for (const componentPermissionPair of CmpntPermissionsPairList) {
            const [Compnt, permissions] = componentPermissionPair;
            if ( hasAnyRole(user, permissions)) {
                return (<Compnt {...props}>{children}</Compnt>)
            }
        };
        
        return null;
    }
}

export {withIfHavePermissions};