import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform, Linking } from 'react-native';
import { MenuItem, MenuItemVariant, RESTAURANT_INFO } from '../data/menuData';

export interface CartItem {
  id: string; // unique cart item id: `${item.id}_${prepType || ''}_${variant?.id || ''}`
  menuItem: MenuItem;
  prepType?: string; // "Fried Rice" | "Noodles"
  variant?: MenuItemVariant;
  unitPrice: number;
  quantity: number;
  itemNotes?: string;
}

interface CartContextType {
  cart: CartItem[];
  tableNumber: string;
  setTableNumber: (table: string) => void;
  orderType: 'dine_in' | 'takeaway';
  setOrderType: (type: 'dine_in' | 'takeaway') => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  specialInstructions: string;
  setSpecialInstructions: (instructions: string) => void;
  addToCart: (item: MenuItem, prepType?: string, variant?: MenuItemVariant, notes?: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalAmount: number;
  sendOrderViaWhatsApp: () => Promise<boolean>;
  lastOrderDetails: any | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tableNumber, setTableNumber] = useState<string>('Table 1');
  const [orderType, setOrderType] = useState<'dine_in' | 'takeaway'>('dine_in');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [lastOrderDetails, setLastOrderDetails] = useState<any | null>(null);

  // Parse URL query parameter (e.g. ?table=3 or #table=3) when running on Web
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const tableParam = urlParams.get('table');
        if (tableParam) {
          const formatted = tableParam.toLowerCase().startsWith('table')
            ? tableParam
            : `Table ${tableParam}`;
          setTableNumber(formatted);
          setOrderType('dine_in');
        } else {
          // Check hash
          const hash = window.location.hash;
          if (hash.includes('table=')) {
            const match = hash.match(/table=([^&]+)/);
            if (match && match[1]) {
              const formatted = match[1].toLowerCase().startsWith('table')
                ? decodeURIComponent(match[1])
                : `Table ${decodeURIComponent(match[1])}`;
              setTableNumber(formatted);
              setOrderType('dine_in');
            }
          }
        }
      } catch (e) {
        console.warn('Could not parse table param', e);
      }
    }
  }, []);

  const addToCart = (item: MenuItem, prepType?: string, variant?: MenuItemVariant, notes?: string) => {
    const key = `${item.id}_${prepType || 'default'}_${variant?.id || 'none'}`;
    const price = variant ? variant.price : item.basePrice;

    setCart((prev) => {
      const existingIdx = prev.findIndex((ci) => ci.id === key);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + 1,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: key,
            menuItem: item,
            prepType,
            variant,
            unitPrice: price,
            quantity: 1,
            itemNotes: notes || '',
          },
        ];
      }
    });
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setSpecialInstructions('');
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const sendOrderViaWhatsApp = async (): Promise<boolean> => {
    if (cart.length === 0) return false;

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    let message = `🍽️ *NEW ORDER - ${RESTAURANT_INFO.name}*\n`;
    message += `📍 *Service:* ${orderType === 'dine_in' ? `Dine-in (${tableNumber})` : '🛍️ Takeaway / Parcel'}\n`;
    if (customerName.trim()) {
      message += `👤 *Customer:* ${customerName.trim()}${customerPhone.trim() ? ` (${customerPhone.trim()})` : ''}\n`;
    }
    message += `🕒 *Time:* ${formattedDate}, ${formattedTime}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🛒 *ORDER ITEMS:*\n\n`;

    cart.forEach((item, index) => {
      let displayName = item.menuItem.name;
      if (item.prepType) {
        displayName = displayName.replace('Fried Rice / Noodles', item.prepType);
      }
      if (item.variant) {
        displayName += ` [${item.variant.name}]`;
      }
      const itemSubtotal = item.unitPrice * item.quantity;
      message += `${index + 1}. *${displayName}*\n`;
      message += `   ₹${item.unitPrice} × ${item.quantity} = *₹${itemSubtotal}*\n`;
      if (item.itemNotes) {
        message += `   ↪ _Note: ${item.itemNotes}_\n`;
      }
    });

    message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL BILL:* *₹${totalAmount}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;

    if (specialInstructions.trim()) {
      message += `📝 *Kitchen Note:* ${specialInstructions.trim()}\n\n`;
    }

    message += `📍 *The Mom's Kitchen*\n`;
    message += `_506, Villarasampatti Rd, opp. Velalar Engg College, Erode_\n`;
    message += `🙏 *Thank you for your order!*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedMessage}`;

    setLastOrderDetails({
      items: [...cart],
      totalAmount,
      tableNumber: orderType === 'dine_in' ? tableNumber : 'Takeaway',
      orderTime: `${formattedDate}, ${formattedTime}`,
      customerName,
      customerPhone,
      specialInstructions,
    });

    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        // Fallback directly on web
        if (Platform.OS === 'web' && typeof window !== 'undefined') {
          window.open(whatsappUrl, '_blank');
        } else {
          await Linking.openURL(whatsappUrl);
        }
      }
      return true;
    } catch (err) {
      console.warn('Error opening WhatsApp URL', err);
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank');
      }
      return true;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        tableNumber,
        setTableNumber,
        orderType,
        setOrderType,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        specialInstructions,
        setSpecialInstructions,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
        totalAmount,
        sendOrderViaWhatsApp,
        lastOrderDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
