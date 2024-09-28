// features/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: string;
    name: string;
    price: number;
    size: string;
    imageUrl: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const existingItem = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        incrementQuantity(state, action: PayloadAction<string>) {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity(state, action: PayloadAction<string>) {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
