import React, {useState} from 'react';
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

   const editTrigger = (e, id) => {
      setTriggerIdEdit(false);

      props.updateTrigger({
         id,
         botId: props.match.params.botId,
         caption: e.target.value
      })
   };

   const mainTriggerIdx = 0;

   return (
      <div className={style.mainContainer}>
         <h2>Начальный шаг</h2>
         {changedScenario && (
            <div
               className={style.singleTriggerContainer}
            >
               <div
                  style={changedScenario.triggers[mainTriggerIdx].id === changedTriggerId ?
                     {border: '1px solid #13ce66', color: '#13ce66'} : {}}
                  className={style.triggerElement}
                  onClick={() => changeTriggerId(changedScenario.triggers[mainTriggerIdx].id)}
               >
                  <p className={style.comentIcon}>
                     <FontAwesomeIcon icon={faCommentDots}/>
                  </p>
                  <p className={style.caption}>
                     {triggerIdEdit === mainTriggerIdx ?
                        <input
                           onBlur={(e) => editTrigger(e, changedScenario.triggers[mainTriggerIdx].id)}
                           type={'text'}
                           defaultValue={changedScenario.triggers[mainTriggerIdx].caption}
                           autoFocus={true}
                           className={style.editInput}
                        />
                        : changedScenario.triggers[mainTriggerIdx].caption
                     }
                  </p>
                  <p
                     className={style.penIcon}
                     style={triggerIdEdit === mainTriggerIdx ? {visibility: 'hidden'} : {right: '30px'}}
                     onClick={() => setTriggerIdEdit(mainTriggerIdx)}
                  >
                     <FontAwesomeIcon icon={faPen}/>
                  </p>
                  <p
                     className={style.cloneIcon}
                     style={triggerIdEdit === mainTriggerIdx ? {visibility: 'hidden'} : {right: '10px'}}
                  >
                     <FontAwesomeIcon icon={faClone}/>
                  </p>
               </div>

            </div>
         )}
         <h2>Привязанные шаги</h2>
         {changedScenario && changedScenario.triggers.map((trigger, index) => (
            index > mainTriggerIdx && (
               <div
                  key={index}
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
                        {triggerIdEdit === index ?
                           <input
                              onBlur={(e) => editTrigger(e, trigger.id)}
                              type={'text'}
                              defaultValue={trigger.caption}
                              className={style.editInput}
                           />
                           :
                           trigger.caption
                        }
                     </p>
                     <p
                        className={style.penIcon}
                        style={triggerIdEdit === index ? {visibility: 'hidden'} : {right: '30px'}}
                        onClick={e => {
                           e.stopPropagation();
                           setTriggerIdEdit(index)
                        }}
                     >
                        <FontAwesomeIcon icon={faPen}/>
                     </p>
                     {/*<p className={style.cloneIcon}*/}
                     {/*   style={triggerIdEdit === index ? {visibility: 'hidden'} : {right: '30px'}}>*/}
                     {/*   <FontAwesomeIcon icon={faClone}/>*/}
                     {/*</p>*/}
                     <p
                        className={style.trash}
                        style={triggerIdEdit === index ? {visibility: 'hidden'} : {right: '10px'}}
                        onClick={(e) => {
                           e.stopPropagation();
                           deleteHandler(trigger.id, index);
                        }}
                     >
                        <FontAwesomeIcon icon={faTrashAlt}/>
                     </p>
                  </div>
               </div>
            )
         ))}
      </div>
   )
};

const mapDispatchToProps = dispatch => ({
   deleteTrigger: (triggerData) => dispatch(deleteTrigger(triggerData)),
   updateTrigger: (triggerData) => dispatch(editTriggerCaption(triggerData))
});


export default withRouter(connect(null, mapDispatchToProps)(Triggers));
