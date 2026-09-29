import { create } from "zustand";
import type { ArticleDTO } from "../interface/article.dto";
import { handleRequest } from "../lib/request";
import api from "../lib/axios";

interface ArticleState {
  loading: boolean;
  articles: ArticleDTO[];
  error: string | null;
}

interface ArticleActions {
  fetchArticles: () => Promise<void>;
  getArticleBySlug: (slug: string) => Promise<ArticleDTO | undefined>;
}

const initialState: ArticleState = {
  loading: true,
  articles: [],
  error: null,
};

export const useArticleStore = create<ArticleState & ArticleActions>(
  (set, get) => ({
    ...initialState,

    fetchArticles: async () => {
      set({ loading: true, error: null });

      await handleRequest<ArticleDTO[]>({
        request: () => api.get("/articles/published"),
        onSuccess: (data) => {
          set({ articles: data.data as ArticleDTO[], loading: false });
        },
        onError: (error) => {
          set({
            error: error.message || "Failed to fetch articles",
            loading: false,
          });
        },
        showToast: false,
      });
    },
    getArticleBySlug: async (slug: string) => {
      const { articles } = get();
      set({ loading: true, error: null });
      let blog = articles.find((article) => article.slug === slug);

      if (!blog) {
        await handleRequest({
          request: () => api.get(`/articles/slug/${slug}`),
          onSuccess: (data) => {
            blog = data.data as ArticleDTO;
            set({ loading: false });
          },
          onError: (error) => {
            set({
              error: error.message || "Failed to fetch article",
              loading: false,
            });
          },
          showToast: false,
        });
      }
      set({loading: false})
      return blog;
    },
  }),
);
