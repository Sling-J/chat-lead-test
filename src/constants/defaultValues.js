import moment from 'moment';

export const defaultValuesForNewMessages = {
   text: {text: '', keyboard: [], customs:{}},
   photo: {photo: '', keyboard: [], customs:{}},
   audio: {audio: '', keyboard: [], customs:{}},
   video: {video: '', keyboard: [], customs:{}},
   file: {file: '', keyboard: [], customs:{}},
   type_processing: {type_processing: {delay: 5}, customs:{}},
   card: {card: [{photo: '', title: '', text: '', keyboard: []}], customs:{}},
   gallery: {gallery: [{photo: '', title: '', text: '', keyboard: []}], customs:{}},
   list: {list: [{photo: '', title: '', text: '', keyboard: []}, {photo: '', title: '', text: '', keyboard: []}], customs:{}},
   pause_delay: {timer: {pause_delay: '', format: {value: 0, key: 'sec', keyValue: 'Секунды'}}, keyboard: [], text: "", customs:{}},
   activity_lost: {timer: {activity_lost: moment().format('YYYY-MM-DD, h:mm')}, keyboard: [], text: "", customs:{}},
   send_time: {timer: {send_time: {day: '', hours: '', min: ''}}, keyboard: [], text: "", customs:{}},
   form: {form: [""], keyboard: [], customs:{}},
   location: {location: "", keyboard: [], customs:{}},
	contact: {
		contact: "",
		sendContact: {
			contactId: ""
		},
		keyboard: [],
		customs:{}
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
		customs:{}
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
