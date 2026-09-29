import { create } from "zustand";
import type { ContactFormDTO } from "../interface/contact.dto";
import api from "../lib/axios";
import { handleRequest } from "../lib/request";

interface Response {
  success: boolean;
  message?: string;
}

interface ContactState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface ContactActions {
  sendContactForm: (formData: ContactFormDTO) => Promise<Response>;
  reset: () => void;
}

const initialState: ContactState = {
  loading: false,
  error: null,
  success: false,
};

export const useContactStore = create<ContactState & ContactActions>((set) => ({
  ...initialState,

  sendContactForm: async (formData: ContactFormDTO): Promise<Response> => {
    set({ loading: true, error: null, success: false });

    let result: Response = { success: false };

    await handleRequest({
      request: () => api.post("/messages", formData),
      onSuccess: () => {
        set({ loading: false, success: true, error: null });
        result = { success: true, message: "Message sent successfully" };
      },
      onError: (error) => {
        set({ loading: false, error: error.message, success: false });
        result = {
          success: false,
          message: error.message || "Failed to send message",
        };
      },
    });

    return result;
  },

  reset: () => {
    set(initialState);
  },
}));
