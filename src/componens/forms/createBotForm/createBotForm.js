import React, {useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import {createBot} from "../../../actions/actionCreator";
import Button from '@material-ui/core/Button';

import style from './createBotForm.module.sass';

const CreateBotForm = props => {
   const [botName, setBotName] = useState('');

   const handleSubmit = event => {
      event.preventDefault();

      if (botName.length !== 0) {
         props.createBot(botName)
      }

      setBotName('');
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <div className={style.formContainer}>
               <div>
                  <input
                     placeholder="Название бота"
                     className={style.addBotField}
                     onChange={e => setBotName(e.target.value)}
                     value={botName}
                     type="text"
                  />
               </div>

               <Button className={style.submitButton} type="submit" variant="contained">
                  Добавить
               </Button>

               <div className={style.error}>
                  {props.error && "Просим прощения, проблемы с сервером!"}
               </div>
            </div>
         </form>
      </div>
   )
};


const mapStateToProps = ({botsReducers}) => ({
   botsData: botsReducers.botsData,
   isFetching: botsReducers.isFetching,
   error: botsReducers.error
});

const mapDispatchToProps = dispatch => ({
   createBot: (nameBot) => dispatch(createBot(nameBot))
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(CreateBotForm);
