import React from 'react';
import SetupSidebar from './setupSidebar/setupSidebar';
import SetupWideColumn from './setupWideColumn/setupWideColumn';

import style from './setupContainer.module.sass';

const SetupContainer = () => {
   return (
      <section className={style.settingsBodyColumn}>
         <div className={style.container + " " + style.columnsContainer}>
            <div className={style.menuTriggerBtn} id="faq-menu-trigger"/>
            <SetupSidebar/>
            <SetupWideColumn/>
         </div>
      </section>
   )
};

export default SetupContainer
