import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    userId: string | null; // User ID from the token
    email: string | null; // Email from user input
}

// Initial state
const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    userId: null, // Initialize userId to null
    email: null, // Initialize email to null
};

// Define the payload structure of the decoded token
interface DecodedToken {
    sub: string; // Assuming 'sub' contains the user ID
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ token: string; email: string }>) {
            const { token, email } = action.payload;

            // Decode the token to get user ID (sub)
            const decoded: DecodedToken = jwtDecode(token);

            state.isAuthenticated = true;
            state.token = token;
            state.userId = decoded.sub; // Set userId from decoded token
            state.email = email; // Set email from user input
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.userId = null; // Reset userId on logout
            state.email = null; // Reset email on logout
        },
    },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
