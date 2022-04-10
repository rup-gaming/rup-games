import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return { windowWidth: "", darkMode: false };
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
  },
});
