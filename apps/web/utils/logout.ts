import { authActions } from "@/modules/auth/api/auth.slice";
import axiosClient from "./axios";
import { useAppDispatch } from "@/store/store.hppks";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  try {
    const logout = async () => {
      await axiosClient.get("/auth/logout");
      dispatch(authActions.logout());
      router.push("/");
    };

    return logout;
  } catch (error) {
    console.error("Logout failed:", error);
    dispatch(authActions.logout());
  }
};

export default useLogout;
