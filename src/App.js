import { Dashboard } from "./features/dashboard/dashboard";
import { Detail } from "./features/detail/detail";
import { Cart } from "./features/cart/Cart";
import { Payment } from "features/payment/payment";
import { Login } from "./features/login/Login";
import { Order } from "features/orders/order";
import { Admin } from "features/admin/Admin";
import { EditProduct } from "features/admin/product/EditProduct";
import { CreateProduct } from "features/admin/product/CreateProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomerAccount } from "features/customerAccount/customerAccount";
import { UserProvider } from "app/UserProvider";
import withPermission from "hocs/withPermission";
import { withIfHavePermissions } from "hocs/withIfHavePermissions";
import { CartProvider } from "features/cart/CartContext";

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
        <CartProvider>
          <Routes>
            <Route path="/" element={<DashboardWrapper />}></Route>
            <Route path="product/:id" element={<Detail />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="payment" element={<Payment/>}></Route>
            <Route
              path="users"
              element={
                <CustomerAccountWithPermission values={{ anana: "1234" }} />
              }
            ></Route>
            <Route path="orders" element={<OrderWithPermission />}></Route>
            <Route
              path="admin"
              element={() => <div>Admin Sayfasi</div>}
            ></Route>
            <Route
              path="admin/product/edit/:productId"
              element={<EditProduct></EditProduct>}
            ></Route>
            <Route
              path="admin/product/new"
              element={<CreateProduct></CreateProduct>}
            ></Route>
          </Routes>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
