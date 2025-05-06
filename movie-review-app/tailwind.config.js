export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        aurora:
          "linear-gradient(135deg, rgb(105, 111, 202) 10%, rgb(105, 111, 202) 20%, rgb(38, 21, 190) 55%, rgb(2, 6, 57) 100%)",
      },
      colors: {
        auroraStart: "#93f2f0",
        auroraMid: "#4c61d2",
        auroraDark: "#0f1020",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
};
