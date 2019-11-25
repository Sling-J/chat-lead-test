import moment from 'moment';

export const defaultValuesForNewMessages = {
   text: {text: '', keyboard: []},
   photo: {photo: '', keyboard: []},
   audio: {audio: '', keyboard: []},
   video: {video: '', keyboard: []},
   file: {file: '', keyboard: []},
   type_processing: {type_processing: {delay: 5}},
   card: {card: [{photo: '', title: '', text: '', keyboard: []}]},
   gallery: {gallery: [{photo: '', title: '', text: '', keyboard: []}]},
   list: {list: [{photo: '', title: '', text: '', keyboard: []}, {photo: '', title: '', text: '', keyboard: []}]},
   pause_delay: {timer: {pause_delay: {value: 1, key: 'sec', keyValue: 'секунды'}}, keyboard: []},
   activity_lost: {timer: {activity_lost: moment().format('YYYY-MM-DD, h:mm')}, keyboard: []},
   send_time: {timer: {send_time: {day: '', hours: '', min: ''}}, keyboard: [], text: ""},
   form: {form: [""], keyboard: []},
   location: {location: [""], keyboard: []},
   payment: {payment: [""], keyboard: []},
   contact: {contact: [""], keyboard: []},
};

export const buttonsTypes = {
   text_buttons: 'text_buttons',
   url_buttons: 'url_buttons',
   call_buttons: 'call_buttons',
   fast_buttons: 'fast_buttons',
   trigger_buttons: 'trigger_buttons',
};

export const defaultValuesForNewButtons = {
   text_buttons: {caption: 'Новая кнопка', payload: {trigger: ''}, type: 'text_buttons'},
   url_buttons: {caption: 'Новая кнопка', payload: {url: ''}, type: 'url_buttons'},
   fast_buttons: {caption: 'Новая кнопка', payload: {trigger_id: ''}, type: 'fast_buttons'},
   call_buttons: {caption: 'Новая кнопка', payload: {tel: ''}, type: 'call_buttons'},
   trigger_buttons: {caption: 'Новая кнопка', payload: {trigger_id: ''}, type: 'trigger_buttons'},
};

export const tagsTypes = {
   AddTags: 'Add_Tags',
   Remove_Tags: 'Remove_Tags'
};

export const tagsTranscription = {
   Add_Tags: 'Добавить тег',
   Remove_Tags: 'Удалить тег'
};

export const destinationScenario = {
   default: 'undefined',
   broadcast: 'broadcast',
   autoride: 'autoride',
   welcome_message: 'welcome_message',
   subscription_message: 'subscription_message',
   default_response: 'default_response'
};
