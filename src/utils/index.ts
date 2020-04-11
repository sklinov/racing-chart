export const getRegionColor = (region: string) => {
  switch (region) {
      case "Africa":
          return "#212121";
      case "Americas":
          return "#d32f2f";
      case "Oceania":
          return "#1565c0";
      case "Europe":
          return "#2e7d32";
      case "Asia":
          return "#ffeb3b";
      default:
          return "#424242";
  }
};