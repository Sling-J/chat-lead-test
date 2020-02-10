import moment from 'moment';

export const defaultValuesForNewMessages = {
   text: {text: '', keyboard: [], conditions: false, tag: '', exclude_tags: ''},
   file: {file: '', keyboard: [], conditions: false, tag: '', exclude_tags: ''},
   updateTag: {updateTag: {setTag: [], removeTag: []}, keyboard: [], conditions: false, tag: '', exclude_tags: ''},
   photo: {photo: '', keyboard: [], conditions: false, tag: '', exclude_tags: ''},
   audio: {audio: '', keyboard: [], conditions: false, tag: '', exclude_tags: ''},
   video: {video: '', keyboard: [], conditions: false, tag: '', exclude_tags: ''},
   form: {form: [""], keyboard: [], conditions: false, tag: '', exclude_tags: ''},
   customs: {customs: {}, keyboard: [], conditions: false, tag: '', exclude_tags: ''},
   sendUrl: {sendUrl: {url: "", setTag: [], delTag: []}, keyboard: [], conditions: false, tag: '', exclude_tags: ''},
   location: {location: "", keyboard: [], conditions: false, tag: '', exclude_tags: ''},
   type_processing: {type_processing: {delay: 5}, conditions: false, tag: '', exclude_tags: ''},
   card: {card: [{photo: '', title: '', text: '', keyboard: []}], conditions: false, tag: '', exclude_tags: ''},
   gallery: {gallery: [{photo: '', title: '', text: '', keyboard: []}], conditions: false, tag: '', exclude_tags: ''},
   nextTrigger: {nextTrigger: {trigger_id: ''}, conditions: false, tag: '', exclude_tags: ''},
   pause_delay: {
      timer: {pause_delay: '', format: {key: 'sec', keyValue: 'Секунды'}},
      keyboard: [],
      text: "",
      conditions: false,
      tag: '',
      exclude_tags: ''
   },
   activity_lost: {
      timer: {activity_lost: moment().format('YYYY-MM-DD, h:mm')},
      keyboard: [],
      text: "",
      conditions: false,
      tag: '',
      exclude_tags: ''
   },
   send_time: {timer: {send_time: {day: '', hours: '', min: ''}}, keyboard: [], text: "", conditions: false, tag: '', exclude_tags: ''},
   contact: {
      contact: "",
      sendContact: {
         contactId: ""
      },
      keyboard: [],
      conditions: false,
      tag: '',
      exclude_tags: ''
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
      conditions: false,
      tag: '',
      exclude_tags: ''
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
   url_buttons: {caption: 'Новая кнопка', payload: {url: ''}, type: 'url_buttons', addTags: '', deleteTags: ''},
   fast_buttons: {caption: 'Новая кнопка', payload: {trigger_id: ''}, type: 'fast_buttons'},
   call_buttons: {caption: 'Новая кнопка', payload: {tel: ''}, type: 'call_buttons'}
};

export const destinationScenario = {
   default: 'undefined',
   broadcast: 'broadcast',
   autoride: 'autoride',
   welcome_message: 'welcome_message',
   subscription_message: 'subscription_message',
   default_response: 'default_response'
};
