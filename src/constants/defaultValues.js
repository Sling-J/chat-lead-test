import moment from 'moment';

export const defaultValuesForNewMessages = {
   text: {text: '', keyboard: [], conditions: false},
   photo: {photo: '', keyboard: [], conditions: false},
   audio: {audio: '', keyboard: [], conditions: false},
   video: {video: '', keyboard: [], conditions: false},
   file: {file: '', keyboard: [], conditions: false},
   type_processing: {type_processing: {delay: 5}, conditions: false},
   card: {card: [{photo: '', title: '', text: '', keyboard: []}], conditions: false},
   gallery: {gallery: [{photo: '', title: '', text: '', keyboard: []}], conditions: false},
   list: {list: [{photo: '', title: '', text: '', keyboard: []}, {photo: '', title: '', text: '', keyboard: []}], conditions: false},
   pause_delay: {timer: {pause_delay: '', format: {value: 0, key: 'sec', keyValue: 'Секунды'}}, keyboard: [], text: "", conditions: false},
   activity_lost: {timer: {activity_lost: moment().format('YYYY-MM-DD, h:mm')}, keyboard: [], text: "", conditions: false},
   send_time: {timer: {send_time: {day: '', hours: '', min: ''}}, keyboard: [], text: "", conditions: false},
   form: {form: [""], keyboard: [], conditions: false},
   location: {location: "", keyboard: [], conditions: false},
	tags: {tags: "", keyboard: [], conditions: false},
	sendLink: {sendLink: "", keyboard: [], conditions: false},
   customs: {customs: {}, keyboard: [], conditions: false},
	contact: {
		contact: "",
		sendContact: {
			contactId: ""
		},
		keyboard: [],
      conditions: false
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
