import { defineStore } from "pinia";
import axios from "axios";

const TOKEN_REFRESH_INTERVAL = 2 * 60 * 1000;
const INACTIVITY_LOGOUT_TIME = 30 * 60 * 1000;

export const sessionStore = defineStore("session", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    isPageActive: true,
    lastActivityTime: Date.now(),
    tokenRefreshTimer: null,
    inactivityTimer: null,
  }),

  actions: {
    isTokenExpired() {
      if (!this.token) return true;
      try {
        const decoded = JSON.parse(atob(this.token.split(".")[1]));
        const expirationTime = decoded.exp * 1000;
        return Date.now() > expirationTime;
      } catch (error) {
        return true;
      }
    },
    async refreshAuthToken() {
      const currentToken = this.token;
      console.log("Sent Token:", currentToken);

      if (
        !currentToken ||
        currentToken.trim() === "" ||
        currentToken.split(".").length !== 3
      ) {
        console.warn("No valid or malformed token found, skipping refresh.");
        this.logoutUser();
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${currentToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.post(
          "/auth/get/refresh-token",
          {},
          { headers },
        );
        const newToken = response.data.token;
        if (newToken) {
          this.token = newToken;
          localStorage.setItem("token", newToken);
          console.log("Token refreshed");
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        this.logoutUser();
      }
    },

    logoutUser() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.token = null;
      alert("Session expired due to inactivity or token expiration");
    },

    resetInactivityTimer() {
      this.lastActivityTime = Date.now();
      if (this.inactivityTimer) clearTimeout(this.inactivityTimer);

      this.inactivityTimer = setTimeout(() => {
        if (this.isTokenExpired() || !this.isPageActive) {
          this.logoutUser();
        }
      }, INACTIVITY_LOGOUT_TIME);
    },
    handleVisibilityChange() {
      this.isPageActive = !document.hidden;
      if (this.isPageActive) {
        this.resetInactivityTimer();
      }
    },

    startSessionManagement() {
      window.addEventListener("mousemove", this.resetInactivityTimer);
      window.addEventListener("keydown", this.resetInactivityTimer);
      window.addEventListener("scroll", this.resetInactivityTimer);
      document.addEventListener(
        "visibilitychange",
        this.handleVisibilityChange,
      );

      this.tokenRefreshTimer = setInterval(
        () => this.refreshAuthToken(),
        TOKEN_REFRESH_INTERVAL,
      );

      this.resetInactivityTimer();
    },

    stopSessionManagement() {
      window.removeEventListener("mousemove", this.resetInactivityTimer);
      window.removeEventListener("keydown", this.resetInactivityTimer);
      window.removeEventListener("scroll", this.resetInactivityTimer);
      document.removeEventListener(
        "visibilitychange",
        this.handleVisibilityChange,
      );

      clearInterval(this.tokenRefreshTimer);
      clearTimeout(this.inactivityTimer);
    },
  },
});
