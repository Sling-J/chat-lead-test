import React from 'react';
import moment from "moment";
import styled from 'styled-components';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from "date-fns/locale/ru";

import {formatDateToUnix, formatUnixToDate} from "../../../../utils/formatDate";
registerLocale("ru", ru);





const CalendarSelectTime = (props) => {
    const {valuesForTimer, updateTrigger} = props;

    const FixDatePickerTimer = styled.span`
      & .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
        padding-left: unset !important;
        padding-right: unset !important;
        width: 100px !important;
      }
      & .react-datepicker__input-container {
        width:100% !important;
      }
      & .react-datepicker-wrapper {
        width:100% !important;
      }
      & .react-datepicker {
        width: 314px !important;
      }
    `;


    return (
        <FixDatePickerTimer>
            <DatePicker
                selected={new Date(
                    formatUnixToDate(
                        valuesForTimer[Object.keys(valuesForTimer)[0]],
                        'activity_lost',
                        true
                    )
                )}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                locale={ru}
                onChange={(date) => {
                    const dateObject = {
                        target: {
                            value: formatDateToUnix(date)
                        }
                    };

                    updateTrigger(dateObject, 'activity_lost')
                }}
                minDate={new Date()}
                // className={style.datePickerInput}
                showTimeSelect
                // style={style}
            />
        </FixDatePickerTimer>
    )
};

export default CalendarSelectTime;
