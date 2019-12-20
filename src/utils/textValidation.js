export const sliceExtraText = (str, divider) => {
   return str && str.length > divider
      ? `${str.slice(0, divider)}...`
      : str
};

export const matchNumber = (e, length) => {
   const reg = /\D*/g;

   if (length) {
      if (e.target.value.search(reg) !== -1 && e.target.value > 4) {
         e.target.value = e.target.value.replace(reg, '');
      }
   } else {
      if (e.target.value.search(reg) !== -1) {
         e.target.value = e.target.value.replace(reg, '');
      }
   }
};
