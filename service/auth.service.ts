import { store } from "@/redux/store";
import { loginThunk } from "@/redux/thunk/auth.thunk";
import { setAuth } from "@/redux/slice/auth.slice";
import { setCookie, removeCookie } from "@/utils/cookie";

//Function to login admin user
export const login = async (loginPayload: any) => {
    try {
      const { payload } = await store.dispatch(loginThunk(loginPayload));
      if(payload?.status !== true) {
          return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
      }
      const authObj = {
        isLoggedIn: true,
        token: payload?.data?.accessToken,
      };
      store.dispatch(setAuth(authObj));
      setCookie("token", authObj.token);
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Something went wrong."
      );
    }
};

export const logout = () => {
  try {
    removeCookie("token");
    return { status: true, statusCode: 200, message: 'Logout Successfully.' };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
}
