import React from 'react';
import style from './messagesContainer.module.sass';
import {fileDefinition} from "../../../../utils/fileDefinition/fileDefinition";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {connect} from "react-redux";


const MessagesContainer = (props) => {
   const {
      changedTrigger, updateTriggerUpdateMessageHandler,
      updateTriggerDeleteMessageHandler, changedScenario,
      changeTriggerId
   } = props;

   // const reorder = (list, startIndex, endIndex) => {
   //     const result = Array.from(list);
   //     const [removed] = result.splice(startIndex, 1);
   //     result.splice(endIndex, 0, removed);
   //
   //     return result;
   // };


   // const onDragEnd = (result) => {
   //     // dropped outside the list
   //
   //     console.log(result);
   //     // if (!result.destination) {
   //     //     return;
   //     // }
   //     //
   //     // const items = reorder(
   //     //     this.state.items,
   //     //     result.source.index,
   //     //     result.destination.index
   //     // );
   //     //
   //     // this.setState({
   //     //     items
   //     // });
   // };
   //
   // const getElements = () => {
   //     const messagesCopy = changedTrigger.messages.concat();
   //
   //     messagesCopy.forEach((elem, index) => {
   //        elem.id = index;
   //     });
   //
   //     return messagesCopy;
   // };

   return (
      <>
         {
            changedTrigger.messages[props.changedSocial].map((elem, index) => (
               <div className={style.message}>
                  {
                     fileDefinition(
                        Object.keys(elem)[0],
                        elem,
                        updateTriggerUpdateMessageHandler,
                        index,
                        updateTriggerDeleteMessageHandler,
                        changedTrigger,
                        changedScenario,
                        changeTriggerId
                     )
                  }
               </div>
            ))
         }
      </>
      // {/*<DragDropContext onDragEnd={onDragEnd}>*/}
      //     {/*<Droppable droppableId="droppable">*/}
      //         {/*{(provided, snapshot) => (*/}
      //             {/*<div*/}
      //                 {/*{...provided.droppableProps}*/}
      //                 {/*ref={provided.innerRef}*/}
      //                 {/*// style={getListStyle(snapshot.isDraggingOver)}*/}
      //             {/*>*/}
      //                     {changedTrigger.messages.map((elem, index) => (
      //                         <Draggable key={elem.id} draggableId={elem.id} index={index}>
      //                             {(provided, snapshot) => (
      //                                 <div className={style.message}>
      //                                     {
      //                                         fileDefinition(
      //                                             Object.keys(elem)[0],
      //                                             elem,
      //                                             // Object.values(elem)[0],
      //                                             updateTriggerUpdateMessageHandler,
      //                                             index,
      //                                             updateTriggerDeleteMessageHandler,
      //                                             changedTrigger
      //                                         )
      //                                     }
      //                                 </div>
      //                             )}
      //                         </Draggable>
      //                     ))}
      //                     {provided.placeholder}
      //                 </div>
      //             )}
      //         </Droppable>
      //     </DragDropContext>
   )
};

const mapStateToProps = state => {
   const {changedSocial} = state.singleBotReducers;

   return {
      changedSocial
   }
};

export default connect(mapStateToProps)(MessagesContainer);
