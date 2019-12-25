import React from 'react';
import style from './dialog.module.sass';
import MainHeader from '../../componens/mainHeader/mainHeader';
import NavBar from '../../componens/navbar/navbar';
import Smile from '../../images/dialog_smile.png';

const Dialog = () => {
   return (
      <div className={style.mainContainer}>
         <MainHeader
            isMainHeader={false}
         />
         <NavBar/>
         <div className={style.container}>
            <div className={style.dialog_content}>
               <img src={Smile}/>
               <h3 className={style.dialog_message}>Функция диалог скоро появится…</h3>
            </div>
         </div>
      </div>
   )
};

export default Dialog;
