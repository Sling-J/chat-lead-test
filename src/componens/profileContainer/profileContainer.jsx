import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Button from '@material-ui/core/Button';
import {Avatar, Input, Form, Spin} from 'antd';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {deletionConfirmation} from "../../utils/deletionConfirmation";

import {
   moduleName as profileModule,
   getProfile, updateProfile,
   uploadImageForProfile, refreshMedia
} from "../../ducks/Profile";

const CustomizedForm = Form.create({
   name: 'profile_info',
   mapPropsToFields(props) {
      return {
         name: Form.createFormField({
            ...props.fields && props.fields.name,
            value: props.fields && props.fields.name.value,
         }),
         surname: Form.createFormField({
            ...props.surname,
            value: props.fields && props.fields.surname.value,
         }),
         email: Form.createFormField({
            ...props.email,
            value: props.fields && props.fields.email.value,
         }),
         phone: Form.createFormField({
            ...props.phone,
            value: props.fields && props.fields.phone.value,
         }),
      };
   },
})(props => {
   const [isPassChangePage, setIsPassChangePage] = useState(false);
   const [passwordError, setPasswordError] = useState('');

   const {getFieldDecorator} = props.form;

   const handleChangeProfile = event => {
      event.preventDefault();

      props.form.validateFields((err, values) => {
         if (!err) {
            props.updateProfile({
               first_name: values.name,
               last_name: values.surname,
               email: values.email,
               phone: values.phone,
               password: props.profile.password,
               photo: props.profile.photo,
            });
         }
      });
   };

   const handleChangePassword = event => {
      event.preventDefault();

      props.form.validateFields((err, values) => {
         if (!err) {
            if (values.oldPassword !== props.profile.password) {
               setPasswordError('Неверный cтарый пароль!');
            } else if (values.newPassword !== values.newPassword2) {
               setPasswordError('Новые пароли не совпадают!');
            } else if (values.oldPassword === props.profile.password && values.newPassword === values.newPassword2) {
               setPasswordError('');
               props.updateProfile({
                  first_name: props.profile.first_name,
                  last_name: props.profile.last_name,
                  email: props.profile.email,
                  phone: props.profile.phone,
                  photo: props.profile.photo,
                  password: values.newPassword,
               })
            }
         }
      });
   };

   return !isPassChangePage ? (
      <Form className="profile-container-info__form-control" onSubmit={handleChangeProfile}>
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

         <p className={`${props.successText && 'profile-container-info__password-success'}`}>
            {props.successText}
         </p>

         <div className="profile-container-info__submit pv1-flex pv1-flex-align-center pv1-j-sb">
            <Button
               type="submit"
               variant="contained"
               className="profile-container-info-submit__btn-save"
               href=""
            >
               Сохранить
            </Button>

            <Button
               onClick={() => setIsPassChangePage(true)}
               type="button"
               variant="outlined"
               className="profile-container-info-submit__btn-change"
               href=""
            >
               Изменить пароль
            </Button>
         </div>
      </Form>
   ) : (
      <Form className="profile-container-info__form-control" onSubmit={handleChangePassword}>
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

         <Form.Item className="profile-container-info-form-control__field" label="Новый пароль:">
            {getFieldDecorator('newPassword2', {
               rules: [{required: true, message: 'Обязательно поле!'}],
            })(
               <Input.Password type="password"/>,
            )}
         </Form.Item>

         <p className={`profile-container-info__password-error ${props.successText && 'profile-container-info__password-success'}`}>
            {passwordError || props.successText}
         </p>

         <div className="profile-container-info__submit profile-container-info__submit-form pv1-flex pv1-flex-align-center pv1-j-sb">
            <Button
               type="submit"
               variant="contained"
               className="profile-container-info-submit__btn-save"
               href=""
            >
               Изменить пароль
            </Button>

            <Button
               onClick={() => setIsPassChangePage(false)}
               type="button"
               variant="outlined"
               className="profile-container-info-submit__btn-change"
               href=""
            >
               Назад в профиль
            </Button>
         </div>
      </Form>
   )
});

const ProfileContainer = props => {
   const {
      profile, successText,
      loadingOfProfile,
      loadingOfProfileUpdating,
      getProfile, updateProfile,
      uploadImageForProfile,
      uploadedData, loadingOfUploading,
      match, refreshMedia
   } = props;

   const [fields, setFields] = useState({});

   useEffect(() => {
      getProfile();
   }, []);

   useEffect(() => {
      if (Object.keys(profile).length !== 0) {
         setFields({
            fields: {
               name: {
                  value: profile.first_name,
               },
               surname: {
                  value: profile.last_name,
               },
               email: {
                  value: profile.email,
               },
               phone: {
                  value: profile.phone,
               },
            }
         });
      }
   }, [profile]);

   useEffect(() => {
      if (uploadedData) {
         updateProfile({
            first_name: profile.first_name,
            last_name: profile.last_name,
            password: profile.password,
            email: profile.email,
            phone: profile.phone,
            photo: uploadedData,
         });
         refreshMedia();
      }
   }, [uploadedData]);

   return (
      <Spin spinning={loadingOfProfile || loadingOfProfileUpdating || loadingOfUploading}>
         <div className="main-container profile-container">
            <h1 className="profile-container__title">Профиль пользователя</h1>

            <div className="profile-box pv1-flex pv1-j-sb">
               <div className="profile-container__avatar">
                  <input
                     className="profile-container-avatar__input"
                     accept={'image/*'}
                     type="file"
                     name="profile-avatar"
                     id="profile-avatar"
                     onChange={e => {
                        if (e.target.files.length !== 0) {
                           uploadImageForProfile({
                              file: e.target.files[0],
                              botId: match.params.botId
                           });
                        }
                     }}
                  />
                  <div className="profile-container-avatar__img">
                     {profile.photo
                        ? <img src={profile.photo} alt="Chatlead Avatar"/>
                        : <Avatar shape="square" size={102} icon="user"/>
                     }
                  </div>

                  <div className="profile-container-avatar__edit pv1-flex pv1-j-sb pv1-flex-align-center">
                     <p className="profile-container-avatar-edit__link">
                        {/*<label htmlFor={`${!loadingOfUploading && 'profile-avatar'}`}>Изменить</label>*/}
                        Изменить
                     </p>
                     <p className="profile-container-avatar-edit__delete">
                     {/*   onClick={() => deletionConfirmation(*/}
                     {/*   updateProfile,*/}
                     {/*   {*/}
                     {/*      first_name: profile.first_name,*/}
                     {/*      last_name: profile.last_name,*/}
                     {/*      password: profile.password,*/}
                     {/*      email: profile.email,*/}
                     {/*      phone: profile.phone,*/}
                     {/*      photo: null,*/}
                     {/*   },*/}
                     {/*   "Удаление аватара"*/}
                     {/*)}*/}
                        <FontAwesomeIcon icon={faTrash}/>
                     </p>
                  </div>
               </div>

               <div className="profile-container__info">
                  <CustomizedForm
                     {...fields}
                     profile={profile}
                     successText={successText}
                     updateProfile={updateProfile}
                     loadingOfProfile={loadingOfProfile}
                     loadingOfProfileUpdating={loadingOfProfileUpdating}
                  />
               </div>
            </div>
         </div>
      </Spin>

   );
};

const mapStateToProps = state => ({
   profile: state[profileModule].profile,
   successText: state[profileModule].successText,
   uploadedData: state[profileModule].uploadedData,
   loadingOfUploading: state[profileModule].loadingOfUploading,
   loadingOfProfile: state[profileModule].loadingOfProfile,
   loadingOfProfileUpdating: state[profileModule].loadingOfProfileUpdating,
});

const mapDispatchToProps = dispatch => ({
   getProfile: () => dispatch(getProfile()),
   refreshMedia: () => dispatch(refreshMedia()),
   updateProfile: data => dispatch(updateProfile(data)),
   uploadImageForProfile: data => dispatch(uploadImageForProfile(data)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(ProfileContainer);
