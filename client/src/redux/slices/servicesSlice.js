import { createSlice } from "@reduxjs/toolkit";

const servicesInitialState = localStorage.getItem("services")
  ? JSON.parse(localStorage.getItem("services"))
  : null;

const initialState = {
  services: servicesInitialState,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: function (state, action) {
      state.services = action.payload;
    },
    setService: function (state, action) {
      state.service = action.payload;
    },
  },
});

export const { setServices, setService } = servicesSlice.actions;

export const selectServices = (state) => state.services.services;

const serviceReducer = servicesSlice.reducer;

export default serviceReducer;
