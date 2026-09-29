import { create } from "zustand";
import type { CreateProjectDTO, ProjectDTO } from "../interface/project.dto";
import { handleRequest } from "../lib/request";
import api from "../lib/axios";

interface ProjectState {
  loading: boolean;
  projects: ProjectDTO[];
  error: string | null;
}

interface ProjectActions {
  fetchProjects: () => Promise<void>;
  createProject: (data: CreateProjectDTO) => Promise<boolean>;
  getProjectBySlug: (slug: string) => Promise<ProjectDTO | null>;
}

const initialState: ProjectState = {
  loading: false,
  projects: [],
  error: null,
};

export const useProjectStore = create<ProjectState & ProjectActions>(
  (set, get) => ({
    ...initialState,

    fetchProjects: async () => {

      set({ loading: true, error: null });

      await handleRequest<any>({
        request: () => api.get("/projects/published"),
        onSuccess: (res) => {
          const projectList = (res?.data ?? res) as ProjectDTO[];
          set({
            projects: Array.isArray(projectList) ? projectList : [],
            loading: false,
            error: null,
          });
        },
        onError: (error) => {
          set({
            loading: false,
            error: error.message || "Failed to fetch projects",
          });
        },
        showToast: false,
      });
    },

    createProject: async (data: CreateProjectDTO) => {
      set({ loading: true, error: null });
      let isSuccess = false;

      await handleRequest<any>({
        request: () =>
          api.post("/projects", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
        onSuccess: (res) => {
          const newProject = (res?.data ?? res) as ProjectDTO;
          set((state) => ({
            projects: [...state.projects, newProject],
            loading: false,
            error: null,
          }));
          isSuccess = true;
        },
        onError: (error) => {
          set({
            loading: false,
            error: error.message || "Failed to create project",
          });
        },
        showToast: false,
      });

      return isSuccess;
    },

    getProjectBySlug: async (slug: string) => {
      const { projects } = get();

      // 1. Check local state cache
      const cachedProject = projects.find((p) => p.slug === slug);
      if (cachedProject) {
        return cachedProject;
      }

      set({ loading: true, error: null });
      let fetchedProject: ProjectDTO | null = null;

      // 2. Fetch from backend if missing from local cache
      await handleRequest<any>({
        request: () => api.get(`/projects/slug/${slug}`),
        onSuccess: (res) => {
          fetchedProject = (res?.data ?? res) as ProjectDTO;
          set((state) => ({
            projects: fetchedProject
              ? [...state.projects, fetchedProject]
              : state.projects,
            loading: false,
          }));
        },
        onError: (error) => {
          set({
            loading: false,
            error: error.message || "Failed to fetch project",
          });
        },
        showToast: false,
      });

      return fetchedProject;
    },


  }),
);
