export const getFilledStatus = (social, changedTrigger) => {
   let checkedSocial = [];

   if (changedTrigger) {
      checkedSocial = changedTrigger.messages[social];
   }

   let status = false;

   checkedSocial.forEach(item => {
      status = !!(
         (item.text && item.text.length !== 0) ||
         (item.photo && item.photo.length !== 0) ||
         (item.audio && item.audio.length !== 0) ||
         (item.video && item.video.length !== 0) ||
         (item.file && item.file.length !== 0) ||
         (item.type_processing && item.type_processing.length !== 0) ||
         (item.card && item.card.length !== 0) ||
         (item.gallery && item.gallery.length !== 0) ||
         (item.list && item.list.length !== 0) ||
         (item.timer && item.timer.length !== 0) ||
         (item.form && item.form.length !== 0) ||
         (item.location && item.location.length !== 0) ||
         (item.payment && item.text.length !== 0) ||
         (item.customs && Object.keys(item.customs).length !== 0) ||
         (item.updateTag && (Object.keys(item.updateTag.setTag).length !== 0 || Object.keys(item.updateTag.removeTag).length !== 0)) ||
         (item.contact && item.contact.length !== 0) ||
         (item.sendUrl && item.sendUrl.url.length !== 0) ||
         (item.nextTrigger && item.nextTrigger.trigger_id.length !== 0)
      );
   });

   return status;
};
