declare module "stores/userStore" {
  import { defineStore } from "pinia";
  export const useUserStore: ReturnType<typeof defineStore>;
}
