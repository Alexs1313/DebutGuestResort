import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getMenuItemById} from '../data/menu';

const ORDERS_KEY = '@ws_dining_orders';

export type DiningCartItem = {
  itemId: string;
  quantity: number;
};

export type DiningOrderDraft = {
  items: DiningCartItem[];
  deliveryTime: string;
  guestName: string;
  contactNote: string;
  notes: string;
};

export type DiningOrder = DiningOrderDraft & {
  id: string;
  totalPrice: number;
  status: 'Order Sent';
  createdAt: string;
};

function calcTotal(items: DiningCartItem[]): number {
  return items.reduce((sum, item) => {
    const menuItem = getMenuItemById(item.itemId);
    return sum + (menuItem?.price ?? 0) * item.quantity;
  }, 0);
}

type DiningContextValue = {
  cart: DiningCartItem[];
  orders: DiningOrder[];
  cartTotal: number;
  cartItemCount: number;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  setQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  submitOrder: (draft: Omit<DiningOrderDraft, 'items'>) => DiningOrder;
};

const DiningContext = createContext<DiningContextValue | null>(null);

export function DiningProvider({children}: {children: React.ReactNode}) {
  const [cart, setCart] = useState<DiningCartItem[]>([]);
  const [orders, setOrders] = useState<DiningOrder[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(ORDERS_KEY).then(val => {
      if (val) setOrders(JSON.parse(val));
    });
  }, []);

  const persist = (next: DiningOrder[]) => {
    setOrders(next);
    AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(next));
  };

  const addToCart = useCallback((itemId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.itemId === itemId);
      if (existing) {
        return prev.map(i => i.itemId === itemId ? {...i, quantity: i.quantity + 1} : i);
      }
      return [...prev, {itemId, quantity: 1}];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prev => prev.filter(i => i.itemId !== itemId));
  }, []);

  const setQuantity = useCallback((itemId: string, qty: number) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(i => i.itemId !== itemId));
    } else {
      setCart(prev => {
        const existing = prev.find(i => i.itemId === itemId);
        if (existing) {
          return prev.map(i => i.itemId === itemId ? {...i, quantity: qty} : i);
        }
        return [...prev, {itemId, quantity: qty}];
      });
    }
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const submitOrder = useCallback(
    (draft: Omit<DiningOrderDraft, 'items'>) => {
      const order: DiningOrder = {
        ...draft,
        items: cart,
        id: `do-${Date.now()}`,
        totalPrice: calcTotal(cart),
        status: 'Order Sent',
        createdAt: new Date().toLocaleString(),
      };
      persist([order, ...orders]);
      setCart([]);
      return order;
    },
    [cart, orders],
  );

  const cartTotal = useMemo(() => calcTotal(cart), [cart]);
  const cartItemCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart]);

  const value = useMemo(
    () => ({cart, orders, cartTotal, cartItemCount, addToCart, removeFromCart, setQuantity, clearCart, submitOrder}),
    [cart, orders, cartTotal, cartItemCount, addToCart, removeFromCart, setQuantity, clearCart, submitOrder],
  );

  return <DiningContext.Provider value={value}>{children}</DiningContext.Provider>;
}

export function useDining() {
  const ctx = useContext(DiningContext);
  if (!ctx) throw new Error('useDining must be used within DiningProvider');
  return ctx;
}

export {calcTotal};
