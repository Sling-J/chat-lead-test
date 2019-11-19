// import style from "./timerElement.module.sass";
// import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";
// import ClickOutsideHandler from "../../hoc/clickOutside";
// import {formatDateToUnix, formatUnixToDate} from "../../../utils/formatDate";
// import DatePicker from "react-datepicker";
// import ru from "date-fns/locale";
// import React from "react";
//
// const time = () => (
//    <div className={style.mainContentContainer}>
//       <div className={style.hoverBar}>
//          <HoverBarForMessage
//             {...props}
//             styleForBar={{top: '-25px', left: '320px'}}
//          />
//       </div>
//       <div className={style.mainContainer} onClick={() => setStatusIsOpenWindow(true)}>
//          {
//             <ClickOutsideHandler onClickedOutside={() => setStatusIsOpenWindow(false)}>
//                <div className={style.container}>
//                   <div
//                      className={style.timerContainer}
//                   >
//                      Потеря активности
//                      до {formatUnixToDate(valuesForTimer[Object.keys(valuesForTimer)[0]], 'send_time') || 0}
//                   </div>
//                   {
//                      isOpenWindow && (
//                         <div className={style.messageContainer}>
//                            <div className={style.header}>
//                               Потеря активности
//                            </div>
//                            <div className={style.controlsContainer}>
//                               <label>Потеря активности</label>
//                               <div className={style.inputContainer}>
//                                  <DatePicker
//                                     selected={
//                                        new Date(
//                                           formatUnixToDate(
//                                              valuesForTimer[Object.keys(valuesForTimer)[0]],
//                                              'send_time',
//                                              true
//                                           )
//                                        )
//                                     }
//                                     dateFormat={'yyyy-MM-dd'}
//                                     locale={ru}
//                                     onChange={(date) => {
//                                        const dateObject = {
//                                           target: {
//                                              value: formatDateToUnix(date)
//                                           }
//                                        };
//
//                                        updateTrigger(dateObject, 'send_time')
//                                     }}
//                                     minDate={new Date()}
//                                     className={style.datePickerInput}
//                                  />
//                               </div>
//                            </div>
//
//                         </div>
//                      )
//                   }
//
//                </div>
//             </ClickOutsideHandler>
//          }
//
//       </div>
//    </div>
// );
