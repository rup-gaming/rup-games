import { defineStore } from "pinia";

interface UserDataValues {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export const useStore = defineStore("main", {
  state: () => {
    return {
      windowWidth: "",
      darkMode: false,
      user: {
        id: "",
        email: "",
        username: "",
        avatar_url: "",
        created_at: "",
        updated_at: "",
      },
    };
  },
  actions: {
    setDarkMode(isDark: boolean) {
      this.darkMode = isDark;
    },
    setWindowWidth() {
      if (innerWidth <= 600) {
        this.windowWidth = "xs";
      } else if (innerWidth > 600 && innerWidth <= 960) {
        this.windowWidth = "sm";
      } else if (innerWidth > 960 && innerWidth <= 1264) {
        this.windowWidth = "md";
      } else if (innerWidth > 1264 && innerWidth <= 1904) {
        this.windowWidth = "lg";
      } else {
        this.windowWidth = "xl";
      }
    },
    setUser(userData: UserDataValues) {
      const newData: UserDataValues = {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        avatar_url: userData.avatar_url,
        created_at: userData.created_at,
        updated_at: userData.created_at,
      };
      this.user = { ...this.user, ...newData };
    },
  },
});
