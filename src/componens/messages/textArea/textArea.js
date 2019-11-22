import React, {useState} from 'react';
import style from './textArea.module.sass';
import ButtonsContainer from "../../messages/buttonsContainer/buttonsContainer";
import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import ContentEditable from 'react-contenteditable';
import {connect} from "react-redux";
import FastButtons from "../../scenariosAndTriggers/triggersContainer/fastButtons/fastButtons";


const TextArea = (props) => {
   const {value, handler, index, type, changedTrigger} = props;
   const [valueTextArea, setValueTextArea] = useState({
      target: {
         value: Object.values(value)[0]
      }
   });

   const [isTextAreaHovering, setIsTextAreaHovering] = useState(false);

   const addName = () => {
      let myField = document.querySelector("#insertVariable");
      let myValue = " {first_name}";
      let input = myField.value;
      input += myValue;
      myField.value = input;
   };

   const addLastName = () => {
      let myField = document.querySelector("#insertVariable");
      let myValue = " {last_name}";
      let input = myField.value;
      input += myValue;
      myField.value = input;
   };

   const handleMouseHover = () => {
      setIsTextAreaHovering(!isTextAreaHovering);
      console.log(isTextAreaHovering);
   };


   return (
      <div className={style.textArea} key={Object.values(value)[0]}>
         <div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
               styleForBar={{top: '-100px', left: '160px'}}
               // statusDraggable={(status) => setStatusDragable(status)}
            />
         </div>
         {/*<ContentEditable*/}
         {/*// innerRef={this.contentEditable}*/}
         {/*html={valueTextArea.target.value} // innerHTML of the editable div*/}
         {/*disabled={false}       // use true to disable editing*/}
         {/*onChange={(e) => setValueTextArea(e)} // handle innerHTML change*/}
         {/*// onInput={() => console.log(value)}*/}
         {/*onBlur={() => console.log(valueTextArea.target.value)}*/}
         {/*className={style.editable}*/}
         {/*tagName='article' // Use a custom HTML tag (uses a div by default)*/}
         {/*/>*/}
         {/*<p onInput={(e) => console.log(e.target)} tabIndex={1} contentEditable={true}>{valueTextArea}</p>*/}
         <textarea
            id="insertVariable"
            onBlur={(e) => handler(e, index, type)}
            defaultValue={Object.values(value)[0]}
         />
         <div className={style.actionNav}>
            <div className={style.actionButtons}>
               <div
                  className={style.actionNavSmile}
               >
               </div>
               <div
                  className={style.actionNavVars}
                  onMouseEnter={handleMouseHover}
                  onMouseLeave={handleMouseHover}
               >
                  {isTextAreaHovering &&
                  <div className={style.actionNavVarsMenu}>
                     <h3>Макросы</h3>
                     <ul>
                        <li onClick={addName}>Имя</li>
                        <li onClick={addLastName}>Фамилия</li>
                     </ul>
                  </div>}
               </div>

            </div>
            <div/>
         </div>
         <ButtonsContainer
            {...props}
         />
         {(props.changedSocial === 'facebook' || props.changedSocial === 'telegram') && (
            <FastButtons
               {...props}
            />
         )}
      </div>
   )
};

// class TextArea extends React.Component {
//
//
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             valueTextArea: {
//                 target: {
//                     value: Object.values(props.value)[0]
//                 }
//             },
//             social: props.changedSocial,
//             changedTriggerId: props.changedTrigger.id
//         }
//     }
//
//     static getDerivedStateFromProps(nextProps, prevState) {
//         // console.log(nextProps.changedTriggerId, prevState.changedTriggerId);
//         // console.log(nextProps.changedTrigger.id);
//
//         if(nextProps.changedSocial !== prevState.social || nextProps.changedTrigger.id !== prevState.changedTriggerId) {
//             return {
//                ...prevState,
//                 social: nextProps.changedSocial,
//                 valueTextArea: {
//                     target: {
//                         value: Object.values(nextProps.value)[0]
//                     }
//                 },
//                 changedTriggerId: nextProps.changedTrigger.id
//             }
//         }
//         // console.log(Object.values(nextProps.value)[0] + '1', prevState.valueTextArea.target.value + '2');
//         // if(Object.values(nextProps.value)[0] !== prevState.valueTextArea.target.value) {
//         //     return {
//         //         valueTextArea: {
//         //             target: {
//         //                 value: Object.values(nextProps.value)[0]
//         //             }
//         //         }
//         //     }
//         // }
//         //
//         // return {
//         //    ...prevState,
//         //     valueTextArea: {
//         //         target: {
//         //             value: prevState.valueTextArea.target.value
//         //         }
//         //     }
//         // }
//
//
//     }
//
//
//     // const {value, handler, index, type, changedTrigger} = props;
//     // const [valueTextArea, setValueTextArea] = useState({
//     //     target: {
//     //         value: Object.values(value)[0]
//     //     }
//     // });
//
//     // console.log(Object.values(value)[0].indexOf('{phone}'));
//
//     // console.log(Object.values(value)[0].replace(/{phone}/g, <div className={style.var}>Phone</div>));
//
//
//     // Object.values(value)[0]
//     //     .splice(
//     //         Object.values(value)[0].indexOf('{phone}'),
//     //         7,
//     //         <div className={style.var}>Phone</div>
//     //     )
//
//     // console.log(valueTextArea);
//
//     // const setValueToState = (e) => {
//     //     console.log(e.target.value);
//     //     // console.log(e.target.value.indexOf('<p>'))
//     // }
//
//     // console.log(valueTextArea.target.value);
//     //
//     // componentDidMount() {
//     //     // const stringArray = this.state.valueTextArea.target.value.split(' ');
//     //     //
//     //     // console.log(stringArray);
//     //     // const obj = <div className={style.var}>Phone</div>;
//     //     const value = this.state.valueTextArea.target.value.replace(
//     //         /{phone}/g,
//     //         <div className={style.var}>Phone</div>
//     //     );
//     //     this.setState({
//     //         valueTextArea: {
//     //             target: {
//     //                 value: (
//     //                     <>
//     //                         {value}
//     //                     </>
//     //                 )
//     //             }
//     //         }
//     //     })
//     // }
//
//
//     render() {
//         const {value, handler, index, type, changedTrigger} = this.props;
//         const {target} = this.state.valueTextArea;
//         return (
//             <div className={style.textArea} key={Object.values(value)[0]}>
//                 <div className={style.hoverBar}>
//                     <HoverBarForMessage
//                         {...this.props}
//                         styleForBar={{top: '-100px', left: '160px'}}
//                         // statusDraggable={(status) => setStatusDragable(status)}
//                     />
//                 </div>
//                 <ContentEditable
//                     // innerRef={this.contentEditable}
//                     html={this.state.valueTextArea.target.value} // innerHTML of the editable div
//                     disabled={false}       // use true to disable editing
//                     onChange={(e) => this.setState({
//                         valueTextArea: e
//                     })} // handle innerHTML change
//                     // onInput={() => console.log(value)}
//                     onBlur={() => handler(this.state.valueTextArea, index, type)}
//                     className={style.editable}
//                     tagName='div' // Use a custom HTML tag (uses a div by default)
//                 />
//                 {/*<p onInput={(e) => console.log(e.target)} tabIndex={1} contentEditable={true}>{valueTextArea}</p>*/}
//                 {/*<textarea onBlur={(e) => handler(e, index, type)} defaultValue={Object.values(value)[0]} />*/}
//                 <ButtonsContainer
//                     {...this.props}
//                 />
//
//             </div>
//         )
//     }
// };

const mapStateToProps = state => {
   const {changedSocial} = state.singleBotReducers;

   return {
      changedSocial
   }
};

export default connect(mapStateToProps)(TextArea);
