import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PaymentMethod = "card" | "upi";

interface PaymentState {
  method: PaymentMethod;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  upiId: string;
  loading: boolean;
}

const initialState: PaymentState = {
  method: "card",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  upiId: "",
  loading: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setMethod: (s, a: PayloadAction<PaymentMethod>) => { s.method = a.payload; },
    setCardNumber: (s, a: PayloadAction<string>) => { s.cardNumber = a.payload; },
    setExpiryDate: (s, a: PayloadAction<string>) => { s.expiryDate = a.payload; },
    setCvv: (s, a: PayloadAction<string>) => { s.cvv = a.payload; },
    setUpiId: (s, a: PayloadAction<string>) => { s.upiId = a.payload; },
    setLoading: (s, a: PayloadAction<boolean>) => { s.loading = a.payload; },
    resetPayment: () => initialState,
  },
});

export const {
  setMethod, setCardNumber, setExpiryDate, setCvv, setUpiId, setLoading, resetPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
