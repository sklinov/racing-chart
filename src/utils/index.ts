export const getRegionColor = (region: string) => {
  switch (region) {
      case "Africa":
          return "#bdbdbd";
      case "Americas":
          return "#ef5350";
      case "Oceania":
          return "#29b6f6";
      case "Europe":
          return "#66bb6a";
      case "Asia":
          return "#ffee58";
      default:
          return "#b0bec5";
  }
};