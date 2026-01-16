"use client";

import { Product } from "@/app/dashboard/interfaces";
import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "INCREASE_QUANTITY"; payload: string }
  | { type: "DECREASE_QUANTITY"; payload: string }
  | { type: "LOAD_CART"; payload: CartState };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatedItems: CartItem[];

      if (existingItemIndex !== -1) {
        // Товар уже в корзине - увеличиваем количество
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Новый товар - добавляем с quantity: 1
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = updatedItems.reduce(
        (count, item) => count + item.quantity,
        0
      );

      return { items: updatedItems, total, itemCount };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = updatedItems.reduce(
        (count, item) => count + item.quantity,
        0
      );
      return { items: updatedItems, total, itemCount };
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = updatedItems.reduce(
        (count, item) => count + item.quantity,
        0
      );
      return { items: updatedItems, total, itemCount };
    }
    case "INCREASE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = updatedItems.reduce(
        (count, item) => count + item.quantity,
        0
      );
      return { items: updatedItems, total, itemCount };
    }

    case "DECREASE_QUANTITY": {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0);
      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = updatedItems.reduce(
        (count, item) => count + item.quantity,
        0
      );
      return { items: updatedItems, total, itemCount };
    }

    case "CLEAR_CART": {
      return { items: [], total: 0, itemCount: 0 };
    }
    case "LOAD_CART": {
      return action.payload;
    }

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    { items: [], total: 0, itemCount: 0 },
    (initial) => {
      // Эта функция выполняется только один раз при создании reducer
      if (typeof window !== "undefined") {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          try {
            return JSON.parse(savedCart);
          } catch (error) {
            console.error("Ошибка загрузки корзины:", error);
          }
        }
      }
      return initial;
    }
  );

  // Сохранение при каждом изменении
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(state));
      console.log("Сохранено:", state);
    }
  }, [state]);

  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
  };

  const increaseQuantity = (productId: string) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: productId });
  };
  const decreaseQuantity = (productId: string) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: productId });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
