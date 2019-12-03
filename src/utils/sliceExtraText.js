export const sliceExtraText = (str, divider) => {
   return str && str.length > divider
      ? `${str.slice(0, divider)}...`
      : str
};
