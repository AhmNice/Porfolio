import type { UserDTO } from "../interface/user.dto";
import { create } from "zustand";
interface AuthState {
  user: UserDTO | null;
  loading: boolean;
  error: string | null;
}
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}
interface AuthActions {
  reset: () => void;
}
export const useAuthStore = create<AuthState & AuthActions>((set,) => ({
  ...initialState,
  reset: () => set({ ...initialState }),
}))