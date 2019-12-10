import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles, makeStyles} from "@material-ui/core/styles";
import {Modal} from "antd";

import style from '../setupWideColumn.module.sass';
import {editManager} from "../../../../actions/actionCreator";
import CircularProgress from "@material-ui/core/CircularProgress";

const SetupTextField = withStyles({
   root: {
      '& label.Mui-focused': {
         color: '#4680fe',
      },
      '& .MuiInput-underline:after': {
         borderBottomColor: '#4680fe',
      }
   },
})(TextField);

const useStyles = makeStyles(theme => ({
   root: {
      display: 'flex',
      flexWrap: 'wrap',
   }
}));

const SetupWideColumnModal = ({visible, handleCancel, isEmail, editManager, setWillSend, botSetupData, isFetching}) => {
   const [textField, setTextField] = useState('');
   const classes = useStyles();

   const botId = botSetupData.id;

   useEffect(() => {
      if (Object.keys(botSetupData).length !== 0) {
         if (isEmail === 'email') {
            botSetupData.application_email !== ',' && setTextField(botSetupData.application_email)
         } else {
            botSetupData.application_telegram_id !== ',' && setTextField(botSetupData.application_telegram_id)
         }
      }
   }, [botSetupData, isEmail]);

   const handleSubmit = event => {
      event.preventDefault();

      if (isEmail === 'email') {
         setWillSend(true);

         editManager({
            idBot: botId,
            application_will_send: true,
            application_email: textField,
            application_telegram_id: botSetupData.application_telegram_id,
            optional_params: ["application_email", "application_telegram_id", "application_will_send"]
         });
      } else {
         setWillSend(true);

         editManager({
            idBot: botId,
            application_will_send: true,
            application_email: botSetupData.application_email,
            application_telegram_id: textField,
            optional_params: ["application_email", "application_telegram_id", "application_will_send"]
         });
      }
   };

   return (
      <Modal
         title={`Подключение сервиса приёма данных: ${isEmail === 'email' ? 'Email' : 'Telegram'}`}
         visible={visible}
         footer={null}
         onCancel={handleCancel}
      >
         <div className={style.setupModal}>
            {isEmail === "email" ? (
               <p className={style.setupModalInfo}>
                  Важно: добавьте адрес <span>chatlead.io@gmail.com</span> в адресную
                  книгу в вашем почтовом клиенте и открывайте все
                  письма перед удалением, чтобы они не попадали в спам.
               </p>
            ) : (
               <p className={style.setupModalInfo}>
                  Нужно найти в Телеграме
                  <a href="https://t.me/chatleadforms_bot" target="_blank" rel="noopener noreferrer">@chatleadforms_bot</a>,
                  нажать кнопку «Start» и ввести любой текст, например «Дай ключ». В ответ
                  вы получите Ваш ключ, который нужно вставить в поле ниже.
               </p>
            )}

            <div>
               <form className={classes.root} onSubmit={handleSubmit}>
                  <SetupTextField
                     value={textField}
                     style={{width: '100%'}}
                     type={isEmail === 'email' ? 'email' : 'number'}
                     onChange={e => setTextField(e.target.value)}
                     label={isEmail === "email" ? 'mail@potokbot.io' : '380894576'}
                     helperText={isEmail === "email"
                        ? "Добавьте емейл, на который отправлять уведомления и нажмите Enter."
                        : "Напишите номер id который пришел в telegram."
                     }
                  />
                  <Button
                     className={style.submitModalForm}
                     style={{width: "100%", marginTop: "45px"}}
                     type="submit"
                     variant="contained"
                     disabled={isFetching}
                  >
                     {isFetching ? <CircularProgress color="white" size={21}/> : 'Сохранить'}
                  </Button>
               </form>
            </div>
         </div>
      </Modal>
   )
};

const mapStateToProps = ({botSetupReducers}) => ({
   botSetupData: botSetupReducers.botSetupData,
   isFetching: botSetupReducers.isFetching,
   error: botSetupReducers.error
});

const mapDispatchToProps = dispatch => ({
   editManager: (setupData) => dispatch(editManager(setupData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupWideColumnModal);
