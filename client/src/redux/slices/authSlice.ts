import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/interfaces";
import { authApiService } from "@/services/authService";
import { toast } from "sonner";
import { resetCart } from "@/redux/slices/CartSlice";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoggingIn: false,
  isRegistering: false,
  isLoggingOut: false,
  isRefreshing: false,
  isGettingUser: false,

  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authApiService.loginUser(credentials);

      toast.success("Login successful!");
      return { user: response.data.user };
    } catch (error: any) {
      toast.error(error.response?.data?.message || "login failed");
      return rejectWithValue(error.response?.data?.message || "login failed");
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await authApiService.registerUser(credentials);

      toast.success("registration successful!");
      return { user: response.data.user };
    } catch (error: any) {
      toast.error(error.response?.data?.message || "registration failed");
      return rejectWithValue(
        error.response?.data?.message || "registration failed"
      );
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async ({silent}:{silent?: boolean}= {}, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      if (state.auth.isAuthenticated) {
        await authApiService.logoutUser();
      }
      sessionStorage.clear();
      dispatch(resetCart());
     if(!silent) toast.success("Logged out successful!");
      return true;
    } catch (error: any) {
      sessionStorage.clear();
     if(!silent) toast.error(
        error.response?.data?.message || "Logout completed with errors"
      );
      return rejectWithValue(error.response?.data?.message || "logout failed");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApiService.refreshToken();
      return { user: response.data.user };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "token refresh failed"
      );
    }
  }
);
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApiService.getCurrentUser();
      return { user: response.data.user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "User not found");
    }
  }
);

const setAuthSuccess = (state: AuthState, user: User) => {
  state.user = user;
  state.isAuthenticated = true;
};
const resetAuthState = (state: AuthState) => {
  state.user = null;
  state.isAuthenticated = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetLoadingStates: (state) => {
      state.isLoggingIn = false;
      state.isRegistering = false;
      state.isLoggingOut = false;
      state.isRefreshing = false;
      state.isGettingUser = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoggingIn = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        const { user } = action.payload;
        setAuthSuccess(state, user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.error = (action.payload as string) || "login failed";
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.isRegistering = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRegistering = false;
        const { user } = action.payload;
        setAuthSuccess(state, user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRegistering = false;
        state.error = (action.payload as string) || "registration failed";
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoggingOut = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggingOut = false;
        resetAuthState(state);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoggingOut = false;
        resetAuthState(state);
        state.error = (action.payload as string) || "logout failed";
      });

    builder
      .addCase(refreshToken.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.isRefreshing = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = (action.payload as string) || "refreshing failed";
        resetAuthState(state);
      });

    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isGettingUser = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isGettingUser = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isGettingUser = false;
        state.error = (action.payload as string) || "user not found";
        resetAuthState(state);
      });
  },
});

export const { clearError, resetLoadingStates } = authSlice.actions;
export default authSlice.reducer;
