import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import datatableSlice from "./datatable.slice";
import industrySlice from "./industry.slice";
import profileSlice from "./profile.slice";
import countrySlice from "./country.slice"
import globalSettingSlice from "./global-setting.slice";
import modalSlice from "./modal.slice";
import stateSlice from "./state.slice";
import citySlice from "./city.slice";
const rootReducer = combineReducers({
    auth: authSlice,
    datatable: datatableSlice,
    industry: industrySlice,
    profile: profileSlice,
    country:countrySlice,
    globalSetting: globalSettingSlice,
    modal:modalSlice,
    city:citySlice
});

export default rootReducer;
