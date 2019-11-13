import React, {useEffect} from 'react';
import style from './setupContainer.module.sass';
import {connect} from 'react-redux';
import SetupSidebar from './setupSidebar/setupSidebar';
import SetupWideColumn from './setupWideColumn/setupWideColumn';

import {withRouter} from "react-router-dom";



const SetupContainer = (props) => {



    return(
        <section className={style.settingsBodyColumn+ " "+style.settingsBodyColumn__page} style={{marginTop: "10px;"}}>
                <div className={style.container+" "+style.columnsContainer}>
                    <div className={style.menuTriggerBtn} id="faq-menu-trigger"> </div>
                    <SetupSidebar />
                    <SetupWideColumn />
                </div>
            </section>
    )
};

export default withRouter(SetupContainer);