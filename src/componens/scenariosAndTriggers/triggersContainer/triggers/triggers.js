import React, {useEffect, useState} from 'react';
import style from './triggers.module.sass';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClone, faCommentDots, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {deleteTrigger, editTriggerCaption} from "../../../../actions/actionCreator";
import {withRouter} from "react-router-dom";


const Triggers = (props) => {
   const {changedScenario, changeTriggerId, changedTriggerId} = props;
   const [triggerIdEdit, setTriggerIdEdit] = useState(false);

   const deleteHandler = (id, index) => {
      const triggerData = {
         id,
         botId: props.match.params.botId
      };

      props.deleteTrigger(triggerData);
   };

   useEffect(() => {
      changeTriggerId(changedScenario.triggers[0].id)
   }, [changedScenario.triggers.length]);

   const editTrigger = (e, id) => {
      setTriggerIdEdit(false);

      props.updateTrigger({
         id,
         botId: props.match.params.botId,
         caption: e.target.value
      })
   };

   return (
      <div className={style.mainContainer}>
         <h2>Начальный шаг</h2>
         {
            changedScenario && (
               <div
                  className={style.singleTriggerContainer}
               >
                  <div
                     style={changedScenario.triggers[0].id === changedTriggerId ?
                        {border: '1px solid #13ce66', color: '#13ce66'} : {}}
                     className={style.triggerElement}
                     onClick={() => changeTriggerId(changedScenario.triggers[0].id)}
                  >
                     <p className={style.comentIcon}>
                        <FontAwesomeIcon icon={faCommentDots}/>
                     </p>
                     <p className={style.caption}>
                        {
                           triggerIdEdit === '0' ?
                              <input
                                 onBlur={(e) => editTrigger(e, changedScenario.triggers[0].id)}
                                 type={'text'}
                                 defaultValue={changedScenario.triggers[0].caption}
                                 autoFocus={true}
                                 className={style.editInput}
                              />
                              : changedScenario.triggers[0].caption
                        }
                        {/*{changedScenario.triggers[0].caption}*/}
                     </p>
                     <p
                        className={style.penIcon}
                        style={triggerIdEdit === '0' ? {visibility: 'hidden'} : {right: '30px'}}
                        onClick={() => setTriggerIdEdit('0')}
                     >
                        <FontAwesomeIcon icon={faPen}/>
                     </p>
                     <p
                        className={style.cloneIcon}
                        style={triggerIdEdit === '0' ? {visibility: 'hidden'} : {right: '10px'}}
                     >
                        <FontAwesomeIcon icon={faClone}/>
                     </p>
                  </div>

               </div>
            )
         }
         <h2>Привязанные шаги</h2>
         {
            changedScenario && changedScenario.triggers.map((trigger, index) => (
               index > 0 && (
                  <div
                     className={style.singleTriggerContainer}
                  >
                     <div
                        style={trigger.id === changedTriggerId ?
                           {border: '1px solid #13ce66', color: '#13ce66'} : {}}
                        className={style.triggerElement}
                        onClick={() => changeTriggerId(trigger.id)}
                     >
                        <p className={style.comentIcon}>
                           <FontAwesomeIcon icon={faCommentDots}/>
                        </p>
                        <p className={style.caption}>
                           {/*{trigger.caption}*/}
                           {
                              triggerIdEdit === index ?
                                 <input
                                    onBlur={(e) => editTrigger(e, trigger.id)}
                                    type={'text'}
                                    defaultValue={trigger.caption}
                                    className={style.editInput}
                                 />
                                 : trigger.caption
                           }
                        </p>
                        <p
                           className={style.penIcon}
                           style={triggerIdEdit === index ? {visibility: 'hidden'} : {right: '50px'}}
                           onClick={() => setTriggerIdEdit(index)}
                        >
                           <FontAwesomeIcon icon={faPen}/>
                        </p>
                        <p className={style.cloneIcon}
                           style={triggerIdEdit === index ? {visibility: 'hidden'} : {right: '30px'}}>
                           <FontAwesomeIcon icon={faClone}/>
                        </p>
                        <p
                           className={style.trash}
                           style={triggerIdEdit === index ? {visibility: 'hidden'} : {right: '10px'}}
                           onClick={() => {
                              deleteHandler(trigger.id, index);
                           }}
                        >
                           <FontAwesomeIcon icon={faTrashAlt}/>
                        </p>
                     </div>
                  </div>
               )
            ))
         }
      </div>
   )
};

const mapDispatchToProps = dispatch => ({
   deleteTrigger: (triggerData) => dispatch(deleteTrigger(triggerData)),
   updateTrigger: (triggerData) => dispatch(editTriggerCaption(triggerData))
});


export default withRouter(connect(null, mapDispatchToProps)(Triggers));
