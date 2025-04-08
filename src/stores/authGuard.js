import { useAuthStore } from "@/stores/auth";

export const requireAuth = (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return next({ name: "login" });
  }

  const requiredRole = to.meta.role;
  const userRole = authStore.role;

  if (requiredRole && userRole !== requiredRole) {
    return next({ path: "/unauthorized" });
  }

  next();
};
