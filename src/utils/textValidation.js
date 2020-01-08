export const sliceExtraText = (str, divider) => {
   return str && str.length > divider
      ? `${str.slice(0, divider)}...`
      : str
};

export const matchNumber = (event, length) => {
   const reg = /\D*/g;

   if (length) {
      if (event.target.value.search(reg) !== -1 && event.target.value > 4) {
         event.target.value = event.target.value.replace(reg, '');
      }
   } else {
      if (event.target.value.search(reg) !== -1) {
         event.target.value = event.target.value.replace(reg, '');
      }
   }
};

export const matchWithoutSpaces = event => {
   const reg = /\s/g;

   if (event.target.value.search(reg) !== -1) {
      event.target.value = event.target.value.replace(reg, '');
   }
};
