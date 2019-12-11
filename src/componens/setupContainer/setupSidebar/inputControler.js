export const InputControler = () => {
   document.querySelector(".for-fb").style.display = "block";
   document.querySelector(".for-telegram").style.display = "none";
   document.querySelector(".for-whatsapp").style.display = "none";
   document.querySelector(".for-vk").style.display = "none";

   const radiobtns = document.querySelectorAll('input[type=radio][name=radio]');

   radiobtns[0].checked = true;

   for (let radiobtn of radiobtns) {
      radiobtn.onchange = function () {
         if (this.value === 'fb') {
            document.querySelector(".for-fb").style.display = "block";
            document.querySelector(".for-telegram").style.display = "none";
            document.querySelector(".for-whatsapp").style.display = "none";
            document.querySelector(".for-vk").style.display = "none";
         } else if (this.value === 'telegram') {
            document.querySelector(".for-fb").style.display = "none";
            document.querySelector(".for-telegram").style.display = "block";
            document.querySelector(".for-whatsapp").style.display = "none";
            document.querySelector(".for-vk").style.display = "none";
         } else if (this.value === 'whatsapp') {
            document.querySelector(".for-fb").style.display = "none";
            document.querySelector(".for-telegram").style.display = "none";
            document.querySelector(".for-whatsapp").style.display = "block";
            document.querySelector(".for-vk").style.display = "none";
         } else if (this.value === 'vk') {
            document.querySelector(".for-fb").style.display = "none";
            document.querySelector(".for-telegram").style.display = "none";
            document.querySelector(".for-whatsapp").style.display = "none";
            document.querySelector(".for-vk").style.display = "block";
         }
      }
   }
};
