import React, {useState} from 'react';

import Button from '@material-ui/core/Button';
import {Avatar, Input} from 'antd';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

import {matchNumber} from "../../utils/textValidation";

const ProfileContainer = () => {
   const [name, setName] = useState('');
   const [surname, setSurname] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');

   const handleSubmit = event => {
      event.preventDefault();
      console.log('Скоро!');
   };

   return (
      <div className="main-container profile-container">
         <h1 className="profile-container__title">Профиль пользователя</h1>

         <div className="profile-box pv1-flex pv1-j-sb">
            <div className="profile-container__avatar">
               <div className="profile-container-avatar__img">
                  <Avatar shape="square" size={102} icon="user"/>
               </div>

               <div className="profile-container-avatar__edit pv1-flex pv1-j-sb pv1-flex-align-center">
                  <p className="profile-container-avatar-edit__link">Изменить</p>
                  <p className="profile-container-avatar-edit__delete"><FontAwesomeIcon icon={faTrash}/></p>
               </div>
            </div>

            <div className="profile-container__info">
               <form onSubmit={handleSubmit}>
                  <div className="profile-container-info__form-control">
                     <div className="profile-container-info-form-control__field">
                        <label>
                           <p className="profile-container-info-form-control-field__label">Имя</p>

                           <Input
                              placeholder="Елдос"
                              type="text"
                              value={name}
                              onChange={e => setName(e.target.value)}
                           />
                        </label>
                     </div>

                     <div className="profile-container-info-form-control__field">
                        <label>
                           <p className="profile-container-info-form-control-field__label">Фамилия</p>

                           <Input
                              placeholder="Жақсынов"
                              type="text"
                              value={surname}
                              onChange={e => setSurname(e.target.value)}
                           />
                        </label>
                     </div>

                     <div className="profile-container-info-form-control__field">
                        <label>
                           <p className="profile-container-info-form-control-field__label">Email</p>

                           <Input
                              placeholder="eldos.12.02@gmail.com"
                              type="email"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                           />
                        </label>
                     </div>

                     <div className="profile-container-info-form-control__field">
                        <label>
                           <p className="profile-container-info-form-control-field__label">Телефон</p>

                           <Input
                              placeholder="87782599040"
                              type="text"
                              onInput={matchNumber}
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                           />
                        </label>
                     </div>

                     <div className="profile-container-info-form-control__field pv1-flex pv1-j-sb">
                        <div className="profile-container-info-form-control-field__input">
                           <label>
                              <p className="profile-container-info-form-control-field__label">Старый пароль:</p>

                              <Input.Password
                                 type="password"
                                 value={oldPassword}
                                 onChange={e => setOldPassword(e.target.value)}
                              />
                           </label>
                        </div>

                        <div className="profile-container-info-form-control-field__input">
                           <label>
                              <p className="profile-container-info-form-control-field__label">Новый пароль:</p>

                              <Input.Password
                                 type="password"
                                 value={newPassword}
                                 onChange={e => setNewPassword(e.target.value)}
                              />
                           </label>
                        </div>
                     </div>
                  </div>

                  <div className="profile-container-info__submit">
                     <Button
                        type="submit"
                        variant="contained"
                        className="profile-container-info-submit__btn main-theme-button"
                        href=""
                     >
                        Сохранить
                     </Button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default ProfileContainer;
