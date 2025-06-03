// types/cart.types.ts
export interface CartProduct {
    product: string; // Product ID
    name: string;
    quantity: number;
    price: number;
    totalprice: number;
    status: 'Not_processed' | 'Processing' | 'Shipped' | 'Delivered';
    image?: string;
    sku?: string;
    category?: string;
  }
  
  export interface ServerCartResponse {
    success: boolean;
    message: string;
    updatedCart: {
      products: CartProduct[];
      totalCartPrice: number;
      cartId?: string;
      userId?: string;
      updatedAt: string;
    };
  }
  
  export interface CartState {
    items: CartProduct[];
    totalAmount: number;
    cartId: string | null;
    loading: boolean;
    error: string | null;
    isOnline: boolean;
    lastSyncedAt: string | null;
    
    // Rollback functionality
    previousState?: {
      items: CartProduct[];
      totalAmount: number;
    };
    
    // Retry functionality
    retryQueue: RetryOperation[];
    maxRetries: number;
  }
  
  export interface RetryOperation {
    id: string;
    type: 'add' | 'remove' | 'update' | 'clear';
    payload: any;
    attempts: number;
    timestamp: number;
  }
  
  export interface SocketCartEvent {
    type: 'CART_UPDATED' | 'CART_SYNCED' | 'CART_ERROR';
    data: {
      cartId: string;
      userId: string;
      cart: ServerCartResponse['updatedCart'];
      timestamp: string;
    };
  }
  
  export interface ToastNotification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
  }
  
  // services/cartApi.service.ts
  import axios, { AxiosResponse } from 'axios';
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
  
  class CartApiService {
    private baseURL: string;
  
    constructor() {
      this.baseURL = `${API_BASE_URL}/cart`;
    }
  
    async getCart(userId?: string): Promise<ServerCartResponse> {
      const response: AxiosResponse<ServerCartResponse> = await axios.get(
        `${this.baseURL}${userId ? `?userId=${userId}` : ''}`
      );
      return response.data;
    }
  
    async addToCart(payload: {
      productId: string;
      quantity: number;
      userId?: string;
    }): Promise<ServerCartResponse> {
      const response: AxiosResponse<ServerCartResponse> = await axios.post(
        `${this.baseURL}/add`,
        payload
      );
      return response.data;
    }
  
    async removeFromCart(productId: string, userId?: string): Promise<ServerCartResponse> {
      const response: AxiosResponse<ServerCartResponse> = await axios.delete(
        `${this.baseURL}/remove/${productId}${userId ? `?userId=${userId}` : ''}`
      );
      return response.data;
    }
  
    async updateQuantity(payload: {
      productId: string;
      quantity: number;
      userId?: string;
    }): Promise<ServerCartResponse> {
      const response: AxiosResponse<ServerCartResponse> = await axios.put(
        `${this.baseURL}/update`,
        payload
      );
      return response.data;
    }
  
    async clearCart(userId?: string): Promise<ServerCartResponse> {
      const response: AxiosResponse<ServerCartResponse> = await axios.delete(
        `${this.baseURL}/clear${userId ? `?userId=${userId}` : ''}`
      );
      return response.data;
    }
  
    async syncCart(cartData: {
      items: CartProduct[];
      userId?: string;
    }): Promise<ServerCartResponse> {
      const response: AxiosResponse<ServerCartResponse> = await axios.post(
        `${this.baseURL}/sync`,
        cartData
      );
      return response.data;
    }
  }
  
  export const cartApiService = new CartApiService();
  
  // services/socket.service.ts
  import { io, Socket } from 'socket.io-client';
  import { SocketCartEvent } from '../types/cart.types';
  
  class SocketService {
    private socket: Socket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
  
    connect(userId: string): Socket {
      if (this.socket?.connected) {
        return this.socket;
      }
  
      this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
        auth: { userId },
        transports: ['websocket', 'polling'],
        timeout: 10000,
        retries: 3,
      });
  
      this.setupEventListeners();
      return this.socket;
    }
  
    private setupEventListeners(): void {
      if (!this.socket) return;
  
      this.socket.on('connect', () => {
        console.log('Socket connected:', this.socket?.id);
        this.reconnectAttempts = 0;
      });
  
      this.socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        this.handleReconnection();
      });
  
      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        this.handleReconnection();
      });
    }
  
    private handleReconnection(): void {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => {
          this.socket?.connect();
        }, Math.pow(2, this.reconnectAttempts) * 1000); // Exponential backoff
      }
    }
  
    joinCartRoom(cartId: string): void {
      this.socket?.emit('joinCart', { cartId });
    }
  
    leaveCartRoom(cartId: string): void {
      this.socket?.emit('leaveCart', { cartId });
    }
  
    onCartUpdated(callback: (event: SocketCartEvent) => void): void {
      this.socket?.on('cartUpdated', callback);
    }
  
    onCartSynced(callback: (event: SocketCartEvent) => void): void {
      this.socket?.on('cartSynced', callback);
    }
  
    onCartError(callback: (event: SocketCartEvent) => void): void {
      this.socket?.on('cartError', callback);
    }
  
    disconnect(): void {
      this.socket?.disconnect();
      this.socket = null;
    }
  
    isConnected(): boolean {
      return this.socket?.connected || false;
    }
  }
  
  export const socketService = new SocketService();
  
  // utils/toast.util.ts
  import { ToastNotification } from '../types/cart.types';
  
  class ToastManager {
    private toasts: ToastNotification[] = [];
    private listeners: Array<(toasts: ToastNotification[]) => void> = [];
  
    show(toast: Omit<ToastNotification, 'id'>): string {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast: ToastNotification = {
        ...toast,
        id,
        duration: toast.duration || 5000,
      };
  
      this.toasts.push(newToast);
      this.notifyListeners();
  
      // Auto-remove toast after duration
      if (newToast.duration > 0) {
        setTimeout(() => {
          this.remove(id);
        }, newToast.duration);
      }
  
      return id;
    }
  
    remove(id: string): void {
      this.toasts = this.toasts.filter(toast => toast.id !== id);
      this.notifyListeners();
    }
  
    clear(): void {
      this.toasts = [];
      this.notifyListeners();
    }
  
    subscribe(listener: (toasts: ToastNotification[]) => void): () => void {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }
  
    private notifyListeners(): void {
      this.listeners.forEach(listener => listener([...this.toasts]));
    }
  
    // Convenience methods
    success(title: string, message: string): string {
      return this.show({ type: 'success', title, message });
    }
  
    error(title: string, message: string, duration = 0): string {
      return this.show({ type: 'error', title, message, duration });
    }
  
    warning(title: string, message: string): string {
      return this.show({ type: 'warning', title, message });
    }
  
    info(title: string, message: string): string {
      return this.show({ type: 'info', title, message });
    }
  }
  
  export const toastManager = new ToastManager();
  
  // store/cart.slice.ts
  import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
  import { CartState, ServerCartResponse, CartProduct, RetryOperation, SocketCartEvent } from '../types/cart.types';
  import { cartApiService } from '../services/cartApi.service';
  import { socketService } from '../services/socket.service';
  import { toastManager } from '../utils/toast.util';
  
  // Initial state
  const initialState: CartState = {
    items: [],
    totalAmount: 0,
    cartId: null,
    loading: false,
    error: null,
    isOnline: true,
    lastSyncedAt: null,
    retryQueue: [],
    maxRetries: 3,
  };
  
  // Utility functions
  const generateOperationId = () => `op-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const createBackupState = (state: CartState) => ({
    items: [...state.items],
    totalAmount: state.totalAmount,
  });
  
  const applyServerResponse = (state: CartState, payload: ServerCartResponse) => {
    if (payload.updatedCart) {
      state.items = payload.updatedCart.products;
      state.totalAmount = payload.updatedCart.totalCartPrice;
      state.cartId = payload.updatedCart.cartId || state.cartId;
      state.lastSyncedAt = payload.updatedCart.updatedAt;
    }
    delete state.previousState;
  };
  
  const restoreFromBackup = (state: CartState) => {
    if (state.previousState) {
      state.items = state.previousState.items;
      state.totalAmount = state.previousState.totalAmount;
      delete state.previousState;
    }
  };
  
  const addToRetryQueue = (state: CartState, operation: Omit<RetryOperation, 'id' | 'attempts' | 'timestamp'>) => {
    const retryOp: RetryOperation = {
      ...operation,
      id: generateOperationId(),
      attempts: 0,
      timestamp: Date.now(),
    };
    state.retryQueue.push(retryOp);
  };
  
  // Async thunks
  export const initializeCart = createAsyncThunk<
    ServerCartResponse,
    { userId?: string },
    { rejectValue: string }
  >(
    'cart/initialize',
    async ({ userId }, { rejectWithValue }) => {
      try {
        const response = await cartApiService.getCart(userId);
        
        // Initialize socket connection
        if (userId) {
          socketService.connect(userId);
          if (response.updatedCart.cartId) {
            socketService.joinCartRoom(response.updatedCart.cartId);
          }
        }
        
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to initialize cart');
      }
    }
  );
  
  export const addItemToCart = createAsyncThunk<
    ServerCartResponse,
    { productId: string; quantity: number; userId?: string },
    { rejectValue: string }
  >(
    'cart/addItem',
    async (payload, { rejectWithValue, getState }) => {
      try {
        const response = await cartApiService.addToCart(payload);
        
        toastManager.success(
          'Item Added',
          `Added ${payload.quantity} item(s) to cart`
        );
        
        return response;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to add item to cart';
        
        toastManager.error(
          'Add Item Failed',
          errorMessage
        );
        
        return rejectWithValue(errorMessage);
      }
    }
  );
  
  export const removeItemFromCart = createAsyncThunk<
    ServerCartResponse,
    { productId: string; userId?: string },
    { rejectValue: string }
  >(
    'cart/removeItem',
    async ({ productId, userId }, { rejectWithValue }) => {
      try {
        const response = await cartApiService.removeFromCart(productId, userId);
        
        toastManager.success(
          'Item Removed',
          'Item removed from cart'
        );
        
        return response;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to remove item from cart';
        
        toastManager.error(
          'Remove Item Failed',
          errorMessage
        );
        
        return rejectWithValue(errorMessage);
      }
    }
  );
  
  export const updateItemQuantity = createAsyncThunk<
    ServerCartResponse,
    { productId: string; quantity: number; userId?: string },
    { rejectValue: string }
  >(
    'cart/updateQuantity',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await cartApiService.updateQuantity(payload);
        
        toastManager.success(
          'Quantity Updated',
          `Updated quantity to ${payload.quantity}`
        );
        
        return response;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to update quantity';
        
        toastManager.error(
          'Update Failed',
          errorMessage
        );
        
        return rejectWithValue(errorMessage);
      }
    }
  );
  
  export const clearCart = createAsyncThunk<
    ServerCartResponse,
    { userId?: string },
    { rejectValue: string }
  >(
    'cart/clear',
    async ({ userId }, { rejectWithValue }) => {
      try {
        const response = await cartApiService.clearCart(userId);
        
        toastManager.success(
          'Cart Cleared',
          'All items removed from cart'
        );
        
        return response;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to clear cart';
        
        toastManager.error(
          'Clear Cart Failed',
          errorMessage
        );
        
        return rejectWithValue(errorMessage);
      }
    }
  );
  
  export const retryFailedOperations = createAsyncThunk<
    void,
    void,
    { state: { cart: CartState } }
  >(
    'cart/retryOperations',
    async (_, { getState, dispatch }) => {
      const { cart } = getState();
      const operationsToRetry = cart.retryQueue.filter(
        op => op.attempts < cart.maxRetries
      );
  
      for (const operation of operationsToRetry) {
        try {
          switch (operation.type) {
            case 'add':
              await dispatch(addItemToCart(operation.payload)).unwrap();
              break;
            case 'remove':
              await dispatch(removeItemFromCart(operation.payload)).unwrap();
              break;
            case 'update':
              await dispatch(updateItemQuantity(operation.payload)).unwrap();
              break;
            case 'clear':
              await dispatch(clearCart(operation.payload)).unwrap();
              break;
          }
        } catch (error) {
          // Will be handled by individual thunk rejections
        }
      }
    }   
  );
  
  // Optimistic update helpers
  const applyOptimisticAdd = (state: CartState, productId: string, quantity: number, estimatedPrice = 0) => {
    const existingIndex = state.items.findIndex(item => item.product === productId);
    
    if (existingIndex !== -1) {
      const existingItem = state.items[existingIndex];
      existingItem.quantity += quantity;
      existingItem.totalprice = existingItem.price * existingItem.quantity;
      state.totalAmount += existingItem.price * quantity;
    } else {
      const newItem: CartProduct = {
        product: productId,
        name: 'Loading...',
        quantity,
        price: estimatedPrice,
        totalprice: estimatedPrice * quantity,
        status: 'Not_processed',
      };
      state.items.push(newItem);
      state.totalAmount += estimatedPrice * quantity;
    }
  };
  
  const applyOptimisticRemove = (state: CartState, productId: string) => {
    const index = state.items.findIndex(item => item.product === productId);
    if (index !== -1) {
      const item = state.items[index];
      state.totalAmount -= item.totalprice;
      state.items.splice(index, 1);
    }
  };
  
  const applyOptimisticQuantityUpdate = (state: CartState, productId: string, newQuantity: number) => {
    const index = state.items.findIndex(item => item.product === productId);
    if (index !== -1) {
      const item = state.items[index];
      const oldTotal = item.totalprice;
      item.quantity = newQuantity;
      item.totalprice = item.price * newQuantity;
      state.totalAmount = state.totalAmount - oldTotal + item.totalprice;
    }
  };
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      // Socket event handlers
      handleSocketCartUpdate: (state, action: PayloadAction<SocketCartEvent>) => {
        const { data } = action.payload;
        if (data.cart) {
          state.items = data.cart.products;
          state.totalAmount = data.cart.totalCartPrice;
          state.cartId = data.cart.cartId || state.cartId;
          state.lastSyncedAt = data.timestamp;
          
          toastManager.info(
            'Cart Synced',
            'Cart updated from another device'
          );
        }
      },
  
      // Network status
      setOnlineStatus: (state, action: PayloadAction<boolean>) => {
        const wasOffline = !state.isOnline;
        state.isOnline = action.payload;
        
        if (wasOffline && action.payload) {
          // Back online - show retry option
          if (state.retryQueue.length > 0) {
            toastManager.warning(
              'Back Online',
              'Retrying failed operations...'
            );
          }
        }
      },
  
      // Retry queue management
      removeFromRetryQueue: (state, action: PayloadAction<string>) => {
        state.retryQueue = state.retryQueue.filter(op => op.id !== action.payload);
      },
  
      incrementRetryAttempt: (state, action: PayloadAction<string>) => {
        const operation = state.retryQueue.find(op => op.id === action.payload);
        if (operation) {
          operation.attempts += 1;
        }
      },
  
      clearRetryQueue: (state) => {
        state.retryQueue = [];
      },
  
      // Manual actions
      clearError: (state) => {
        state.error = null;
      },
  
      resetCart: (state) => {
        Object.assign(state, initialState);
      },
    },
    extraReducers: (builder) => {
      // Initialize Cart
      builder
        .addCase(initializeCart.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(initializeCart.fulfilled, (state, action) => {
          state.loading = false;
          applyServerResponse(state, action.payload);
        })
        .addCase(initializeCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to initialize cart';
        })
  
      // Add Item
        .addCase(addItemToCart.pending, (state, action) => {
          state.loading = true;
          state.error = null;
          state.previousState = createBackupState(state);
          
          const { productId, quantity } = action.meta.arg;
          applyOptimisticAdd(state, productId, quantity);
        })
        .addCase(addItemToCart.fulfilled, (state, action) => {
          state.loading = false;
          applyServerResponse(state, action.payload);
        })
        .addCase(addItemToCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to add item to cart';
          restoreFromBackup(state);
          
          if (!state.isOnline) {
            addToRetryQueue(state, {
              type: 'add',
              payload: action.meta.arg,
            });
          }
        })
  
      // Remove Item
        .addCase(removeItemFromCart.pending, (state, action) => {
          state.loading = true;
          state.error = null;
          state.previousState = createBackupState(state);
          
          const { productId } = action.meta.arg;
          applyOptimisticRemove(state, productId);
        })
        .addCase(removeItemFromCart.fulfilled, (state, action) => {
          state.loading = false;
          applyServerResponse(state, action.payload);
        })
        .addCase(removeItemFromCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to remove item from cart';
          restoreFromBackup(state);
          
          if (!state.isOnline) {
            addToRetryQueue(state, {
              type: 'remove',
              payload: action.meta.arg,
            });
          }
        })
  
      // Update Quantity
        .addCase(updateItemQuantity.pending, (state, action) => {
          state.loading = true;
          state.error = null;
          state.previousState = createBackupState(state);
          
          const { productId, quantity } = action.meta.arg;
          applyOptimisticQuantityUpdate(state, productId, quantity);
        })
        .addCase(updateItemQuantity.fulfilled, (state, action) => {
          state.loading = false;
          applyServerResponse(state, action.payload);
        })
        .addCase(updateItemQuantity.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to update quantity';
          restoreFromBackup(state);
          
          if (!state.isOnline) {
            addToRetryQueue(state, {
              type: 'update',
              payload: action.meta.arg,
            });
          }
        })
  
      // Clear Cart
        .addCase(clearCart.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.previousState = createBackupState(state);
          
          // Optimistic clear
          state.items = [];
          state.totalAmount = 0;
        })
        .addCase(clearCart.fulfilled, (state, action) => {
          state.loading = false;
          applyServerResponse(state, action.payload);
        })
        .addCase(clearCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to clear cart';
          restoreFromBackup(state);
          
          if (!state.isOnline) {
            addToRetryQueue(state, {
              type: 'clear',
              payload: action.meta.arg,
            });
          }
        })
  
      // Retry Operations
        .addCase(retryFailedOperations.pending, (state) => {
          state.loading = true;
        })
        .addCase(retryFailedOperations.fulfilled, (state) => {
          state.loading = false;
          state.retryQueue = [];
          
          toastManager.success(
            'Operations Retried',
            'All failed operations have been retried'
          );
        })
        .addCase(retryFailedOperations.rejected, (state) => {
          state.loading = false;
          
          toastManager.error(
            'Retry Failed',
            'Some operations could not be retried'
          );
        });
    },
  });
  
  export const {
    handleSocketCartUpdate,
    setOnlineStatus,
    removeFromRetryQueue,
    incrementRetryAttempt,
    clearRetryQueue,
    clearError,
    resetCart,
  } = cartSlice.actions;
  
  export default cartSlice.reducer;
  
  // Selectors
  export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
  export const selectCartTotal = (state: { cart: CartState }) => state.cart.totalAmount;
  export const selectCartLoading = (state: { cart: CartState }) => state.cart.loading;
  export const selectCartError = (state: { cart: CartState }) => state.cart.error;
  export const selectCartItemCount = (state: { cart: CartState }) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0);
  export const selectIsOnline = (state: { cart: CartState }) => state.cart.isOnline;
  export const selectRetryQueue = (state: { cart: CartState }) => state.cart.retryQueue;
  export const selectLastSyncedAt = (state: { cart: CartState }) => state.cart.lastSyncedAt;
  
  // hooks/useCart.ts
  import { useEffect } from 'react';
  import { useAppDispatch, useAppSelector } from './redux';
  import { socketService } from '../services/socket.service';
  import {
    initializeCart,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart,
    retryFailedOperations,
    handleSocketCartUpdate,
    setOnlineStatus,
    selectCartItems,
    selectCartTotal,
    selectCartLoading,
    selectCartError,
    selectCartItemCount,
    selectIsOnline,
    selectRetryQueue,
  } from '../store/cart.slice';
  
  export const useCart = (userId?: string) => {
    const dispatch = useAppDispatch();
    
    const items = useAppSelector(selectCartItems);
    const totalAmount = useAppSelector(selectCartTotal);
    const loading = useAppSelector(selectCartLoading);
    const error = useAppSelector(selectCartError);
    const itemCount = useAppSelector(selectCartItemCount);
    const isOnline = useAppSelector(selectIsOnline);
    const retryQueue = useAppSelector(selectRetryQueue);
  
    // Initialize cart and socket connections
    useEffect(() => {
      dispatch(initializeCart({ userId }));
  
      // Network status monitoring
      const handleOnline = () => dispatch(setOnlineStatus(true));
      const handleOffline = () => dispatch(setOnlineStatus(false));
  
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
  
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        socketService.disconnect();
      };
    }, [dispatch, userId]);
  
    // Socket event listeners
    useEffect(() => {
      if (userId) {
        socketService.onCartUpdated((event) => {
          dispatch(handleSocketCartUpdate(event));
        });
  
        socketService.onCartSynced((event) => {
          dispatch(handleSocketCartUpdate(event));
        });
  
        socketService.onCartError((event) => {
          console.error('Socket cart error:', event);
        });
      }
    }, [dispatch, userId]);
  
    // Auto-retry when back online
    useEffect(() => {
      if (isOnline && retryQueue.length > 0) {
        dispatch(retryFailedOperations());
      }
    }, [isOnline, retryQueue.length, dispatch]);
  
    return {
      // State
      items,
      totalAmount,
      loading,
      error,
      itemCount,
      isOnline,
      retryQueue,
  
      // Actions
      addItem: (productId: string, quantity: number) =>
        dispatch(addItemToCart({ productId, quantity, userId })),
      
      removeItem: (productId: string) =>
        dispatch(removeItemFromCart({ productId, userId })),
      
      updateQuantity: (productId: string, quantity: number) =>
        dispatch(updateItemQuantity({ productId, quantity, userId })),
      
      clearAllItems: () =>
        dispatch(clearCart({ userId })),
      
      retryFailedOperations: () =>
        dispatch(retryFailedOperations()),
  
      // Utilities
      getItemQuantity: (productId: string) =>
        items.find(item => item.product === productId)?.quantity || 0,
      
      isItemInCart: (productId: string) =>
        items.some(item => item.product === productId),
    };
  };