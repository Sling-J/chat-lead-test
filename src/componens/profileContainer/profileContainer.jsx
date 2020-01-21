import React from 'react';

import Button from '@material-ui/core/Button';
import {Avatar, Input, Form, Select} from 'antd';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const ProfileContainer = props => {
   const {form} = props;

   const {getFieldDecorator} = form;

   const handleSubmit = e => {
      e.preventDefault();

      form.validateFields((err, values) => {
         if (!err) {
            console.log('Скоро: ', values);
         }
      });
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
               <Form onSubmit={handleSubmit} className="profile-container-info__form-control">
                  <Form.Item className="profile-container-info-form-control__field" label="Имя">
                     {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Обязательно поле!'}],
                     })(
                        <Input
                           placeholder="Елдос"
                           type="text"
                        />,
                     )}
                  </Form.Item>

                  <Form.Item className="profile-container-info-form-control__field" label="Фамилия">
                     {getFieldDecorator('surname', {
                        rules: [{required: true, message: 'Обязательно поле!'}],
                     })(
                        <Input
                           placeholder="Жақсынов"
                           type="text"
                        />,
                     )}
                  </Form.Item>

                  <Form.Item className="profile-container-info-form-control__field" label="Email">
                     {getFieldDecorator('email', {
                        rules: [
                           {required: true, message: 'Обязательно поле!'},
                           {type: 'email', message: 'Введите корректный E-mail',}
                        ],
                     })(
                        <Input
                           placeholder="eldos.12.02@gmail.com"
                           type="email"
                        />,
                     )}
                  </Form.Item>

                  <Form.Item className="profile-container-info-form-control__field" label="Телефон">
                     {getFieldDecorator('phone', {
                        rules: [{required: true, message: 'Обязательно поле!'}],
                     })(
                        <Input
                           placeholder="87782599040"
                           type="text"
                        />,
                     )}
                  </Form.Item>

                  <div className="profile-extra-class pv1-flex pv1-j-sb">
                     <Form.Item className="profile-container-info-form-control__field" label="Старый пароль:">
                        {getFieldDecorator('oldPassword', {
                           rules: [{required: true, message: 'Обязательно поле!'}],
                        })(
                           <Input.Password type="password"/>,
                        )}
                     </Form.Item>

                     <Form.Item className="profile-container-info-form-control__field" label="Новый пароль:">
                        {getFieldDecorator('newPassword', {
                           rules: [{required: true, message: 'Обязательно поле!'}],
                        })(
                           <Input.Password type="password"/>,
                        )}
                     </Form.Item>
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
               </Form>
            </div>
         </div>
      </div>
   );
};

const WrappedProfileInfo = Form.create({ name: 'profile_info' })(ProfileContainer);

export default WrappedProfileInfo;
