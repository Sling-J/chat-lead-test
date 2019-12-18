export const sliceExtraText = (str, divider) => {
   return str && str.length > divider
      ? `${str.slice(0, divider)}...`
      : str
};

export const matchNumber = (e) => {
   const reg = /\D*/g;

   if (e.target.value.search(reg) !== -1) {
      e.target.value = e.target.value.replace(reg, '');
   }
};
