import React, { useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Dashboard } from './features/dashboard/dashboard'
import { Detail } from './features/detail/detail';
import { Cart } from './features/cart/Cart';
import { Login } from './features/login/Login';
import { Order } from 'features/orders/order';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomerAccount } from 'features/customerAccount/customerAccount';
import { UserContext } from 'app/UserContext';

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{user, setUser}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
        </Route>
        <Route path=":product/:cost" element={<Detail />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="users" element={<CustomerAccount />}></Route>
        <Route path="orders" element={<Order />}></Route>
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>

  );
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <Counter />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <span>
//           <span>Learn </span>
//           <a
//             className="App-link"
//             href="https://reactjs.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux-toolkit.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux Toolkit
//           </a>
//           ,<span> and </span>
//           <a
//             className="App-link"
//             href="https://react-redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React Redux
//           </a>
//         </span>
//       </header>
//     </div>
//   );
// }

export default App;
