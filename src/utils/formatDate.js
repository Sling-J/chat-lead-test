import moment from "moment";

/** Date formatting to timestamp **/

export const formatDateToUnix = date => {
    if (typeof date === 'object') {
        return moment(date).unix();
    }

    return date;
};

export const formatUnixToDate = (date, type, isCalendar) => {
    if (typeof date === 'number') {
        // type of format to display
        const formatType =
            (type === 'activity_lost') ? 'YYYY-MM-DD, h:mm' :
            (type === 'send_time')     ? 'YYYY-MM-DD' :
                'YYYY-MM-DD';

        return isCalendar ?
            new Date(date * 1000) :
            moment(date * 1000).format(formatType)
    }

    return date;
};
