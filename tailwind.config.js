// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        radar: "radar 2s linear infinite",
      },
    },
  },
};
