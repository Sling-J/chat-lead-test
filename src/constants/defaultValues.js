import moment from 'moment';

export const defaultValuesForNewMessages = {
   text: {text: '', keyboard: [], conditions: false, tag: ''},
   file: {file: '', keyboard: [], conditions: false, tag: ''},
   updateTag: {updateTag: {setTag: [], removeTag: []}, keyboard: [], conditions: false, tag: ''},
   photo: {photo: '', keyboard: [], conditions: false, tag: ''},
   audio: {audio: '', keyboard: [], conditions: false, tag: ''},
   video: {video: '', keyboard: [], conditions: false, tag: ''},
   form: {form: [""], keyboard: [], conditions: false, tag: ''},
   customs: {customs: {}, keyboard: [], conditions: false, tag: ''},
   sendLink: {sendLink: "", keyboard: [], conditions: false, tag: ''},
   location: {location: "", keyboard: [], conditions: false, tag: ''},
   type_processing: {type_processing: {delay: 5}, conditions: false, tag: ''},
   card: {card: [{photo: '', title: '', text: '', keyboard: []}], conditions: false, tag: ''},
   gallery: {gallery: [{photo: '', title: '', text: '', keyboard: []}], conditions: false, tag: ''},
   pause_delay: {
      timer: {pause_delay: '', format: {key: 'sec', keyValue: 'Секунды'}},
      keyboard: [],
      text: "",
      conditions: false,
      tag: '',
   },
   activity_lost: {
      timer: {activity_lost: moment().format('YYYY-MM-DD, h:mm')},
      keyboard: [],
      text: "",
      conditions: false,
      tag: ''
   },
   send_time: {timer: {send_time: {day: '', hours: '', min: ''}}, keyboard: [], text: "", conditions: false, tag: ''},
   contact: {
      contact: "",
      sendContact: {
         contactId: ""
      },
      keyboard: [],
      tag: '',
      conditions: false,
   },
   payment: {
      payment: 'payment',
      amount: 0,
      text: '',
      recipient_full_name: '',
      surname: '',
      name: '',
      patronymic: '',
      recipient_card_info: '',
      trigger_id: '',
      failure_text: '',
      tag: '',
      conditions: false
   },


   list: {
      list: [{photo: '', title: '', text: '', keyboard: []}, {photo: '', title: '', text: '', keyboard: []}],
      conditions: false
   },
};

export const buttonsTypes = {
   text_buttons: 'text_buttons',
   url_buttons: 'url_buttons',
   call_buttons: 'call_buttons',
   fast_buttons: 'fast_buttons',
   trigger_buttons: 'trigger_buttons',
};

export const defaultValuesForNewButtons = {
   text_buttons: {caption: 'Новая кнопка', payload: {trigger_id: ''}, type: 'text_buttons', createdTrigger: {}},
   url_buttons: {caption: 'Новая кнопка', payload: {url: ''}, type: 'url_buttons'},
   fast_buttons: {caption: 'Новая кнопка', payload: {trigger_id: ''}, type: 'fast_buttons'},
   call_buttons: {caption: 'Новая кнопка', payload: {tel: ''}, type: 'call_buttons'}
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
