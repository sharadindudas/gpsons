import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddress } from "@/types/types";

interface CheckoutState {
  currentStep: number;
  shippingAddress: IAddress | null;
  billingAddress: IAddress | null;
  sameAsShippingAddress: boolean;
  deliveryCharges: number;
}

const initialState: CheckoutState = {
  currentStep: 1,
  shippingAddress: null,
  billingAddress: null,
  sameAsShippingAddress: true,
  deliveryCharges: 0,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setBillingAddress: (state, action: PayloadAction<IAddress | null>) => {
      state.billingAddress = action.payload;
    },
    setShippingAddress: (state, action: PayloadAction<IAddress | null>) => {
      state.shippingAddress = action.payload;
    },
    setSameAsShippingAddress: (state, action: PayloadAction<boolean>) => {
      state.sameAsShippingAddress = action.payload;
    },
    setBillingAddressFromShipping: (state) => {
      state.billingAddress = state.shippingAddress;
      state.sameAsShippingAddress = true;
    },
    setDeliveryCharges: (state, action: PayloadAction<number>) => {
      state.deliveryCharges = action.payload;
    },
    resetCheckoutState: (state) => {
      state.currentStep = 1;
      state.billingAddress = null;
      state.shippingAddress = null;
      state.sameAsShippingAddress = true;
      state.deliveryCharges = 0;
    },
  },
});

export const {
  setCurrentStep,
  setBillingAddress,
  setShippingAddress,
  setSameAsShippingAddress,
  setBillingAddressFromShipping,
  setDeliveryCharges,
  resetCheckoutState,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
