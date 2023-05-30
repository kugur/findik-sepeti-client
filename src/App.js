import { Dashboard } from "./features/dashboard/dashboard";
import { Detail } from "./features/detail/detail";
import { Cart } from "./features/cart/Cart";
import { Login } from "./features/login/Login";
import { Order } from "features/orders/order";
import { Admin } from "features/admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomerAccount } from "features/customerAccount/customerAccount";
import { UserProvider } from "app/UserProvider";
import withPermission from "hocs/withPermission";
import { withIfHavePermissions } from "hocs/withIfHavePermissions";

const CustomerAccountWithPermission = withPermission(CustomerAccount, [
  "ROLE_PRE_USER",
  "ROLE_USER",
  "ROLE_ADMIN",
]);
const OrderWithPermission = withPermission(Order, ["ROLE_USER", "ROLE_ADMIN"]);
const AdminWithPermission = withPermission(Admin, ["ROLE_ADMIN"]);
const DashboardWrapper = withIfHavePermissions([
  [AdminWithPermission, ["ROLE_ADMIN"]],
  [Dashboard, []],
]);
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<DashboardWrapper />}></Route>
          <Route path=":product/:cost" element={<Detail />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route
            path="users"
            element={
              <CustomerAccountWithPermission values={{ anana: "1234" }} />
            }
          ></Route>
          <Route path="orders" element={<OrderWithPermission />}></Route>
          <Route path="admin" element={() => <div>Admin Sayfasi</div>}></Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
