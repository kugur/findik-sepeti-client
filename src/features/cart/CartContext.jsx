import httpClientWrapper from "components/Common/HttpClientWrapper";
import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext([]);
const CartDispatchContext = createContext(null);

const actions = {
  added: "added",
  deleted: "deleted",
  replace: "replaced",
  initilize: "initiliazed",
};

const createCartItemId = function () {
  return Date.now();
};

const cartReducer = function (carts, action) {
  switch (action.type) {
    case actions.added: {
      const cartItem = {
        id: createCartItemId(),
        product: action.product,
        quantity: action.quantity,
        sync: false,
      };
      return [...carts, cartItem];
    }
    case actions.deleted: {
      return carts.map((cartItem) => {
        if (cartItem.id === action.id) {
          return { ...cartItem, deleted: true, sync: false };
        }
        return cartItem;
      });
    }
    case actions.replace: {
      if (action.cartItem.deleted) {
        return carts.filter((cart) => cart.id !== action.cartItem.id);
      }

      return carts.map((cart) => {
        if (cart.id === action.cartItem.id) {
          return action.cartItem;
        }
        return cart;
      });
    }

    case actions.initilize: {
      return action.cartItems;
    }
    default: {
      return [...carts];
    }
  }
};

const addCart = function (cartItem, dispatch) {
  httpClientWrapper.post(
    "/cart",
    cartItem,
    function (success) {
      const updatedCartitem = {
        ...cartItem,
        sync: true,
      };
      dispatch({
        type: actions.replace,
        cartItem: updatedCartitem,
      });
    },
    function (error) {
      dispatch({
        type: actions.deleted,
        id: cartItem.id,
      });
    }
  );
};

const deleteCart = function (cartItem, dispatch) {
  const requestParam = new Map();
  requestParam.set("productId", cartItem.id);
  httpClientWrapper.delete(
    "/cart",
    function (success) {
      const deletedCartItem = {
        ...cartItem,
        sync: true,
        deleted: true,
      };

      dispatch({
        type: actions.replace,
        cartItem: deletedCartItem,
      });
    },
    function (error) {
      const deletedCartItem = {
        ...cartItem,
        sync: true,
        deleted: false,
      };

      dispatch({
        type: actions.replace,
        cartItem: deletedCartItem,
      });
    },
    requestParam
  );
};

const CartProvider = function ({ children }) {
  const [carts, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    httpClientWrapper.get(
      "/cart",
      function (response) {
        const cartItems = response.map((cartItem) => {
          return { ...cartItem, sync: true };
        });
        dispatch({
          type: actions.initilize,
          cartItems: cartItems, 
        });
      },
      function (error) {}
    );
  }, []);

  useEffect(() => {
    const toBeSync = carts.filter((cart) => !cart.sync);
    const handleNotSyncItem = function (cart, dispatch) {
      if (cart.deleted) {
        deleteCart(cart, dispatch);
      } else {
        addCart(cart, dispatch);
      }
    };

    toBeSync.forEach((cart) => {
      if (!cart.sync && !cart.requestSent) {
        handleNotSyncItem(cart, dispatch);
      }
    });
  }, [carts]);

  return (
    <CartContext.Provider value={carts}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

const useCarts = function () {
  return useContext(CartContext);
};

const useCartsDispatch = function () {
  return useContext(CartDispatchContext);
};

export { useCarts, useCartsDispatch, CartProvider, actions };
