import React from 'react';

import smile from '../../images/dialog_smile.png';
import style from './inDevelopment.module.sass';

const SingleBot = () => (
   <div className={style.contentBlock}>
      <div>
         <img src={smile} alt={'smile'}/>
         <h1>Функция скоро появится...</h1>
      </div>
   </div>
);

export default SingleBot;
