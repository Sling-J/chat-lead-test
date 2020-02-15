import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {
	facebookAuthUrl, vkAuthUrl, QRCodeUrl,
	resetUrl, editManager, getWpStatus,
	getWpScreenshot, closeWpScreenshot,
	logoutWp
} from "../../../actions/actionCreator";
import {Spin, Modal} from "antd";

import {useTheme} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SwipeableViews from "react-swipeable-views";

import style from './setupSidebar.module.sass';

const TabPanel = ({
	value, index, handleSubmit, wpStatus,
	loading, socialName, logoutData,
	loadingOfLogout, setTelegramToken,
	isFetching, loadingOfScreenshot, error,
	getWpScreenshot, logoutWp, loadingOfStatus,
   isAuth,
}) => {
	function info() {
		Modal.info({
			title: 'У вас нет доступа для WhatsApp!',
			content: (
				<div>
					<p>
						Подпишитесь на <a href="https://my.chatlead.io/bots/tariff/prices" className={style.permissionLink} target="_blank">премиум тариф</a> для использования WhatsApp.
					</p>
				</div>
			),
			onOk() {},
		});
	}

   return value === index && (
      <p className={style.tabsContainerMenu}>
         {
            value === 0 ? <p className={style.tabsContainerMenuText}>ШАГ 1:  Авторизуйтесь через ваш Facebook аккаунт. Вы должны иметь права на управление страницами Facebook. <a href="" target="_blank">Подробнее.</a></p> :
            value === 1 ? <p className={style.tabsContainerMenuText}>ШАГ 1:  Введите токен доступа скрипт ниже. <a href="" target="_blank">узнаете больше</a> о том, как получить токен.</p> :
            value === 2 ? <p className={style.tabsContainerMenuText}>ШАГ 1:  Подключите свой аккаунт Вконтакте. Вам нужно иметь права администратора.</p> :
            value === 3 ? <p className={style.tabsContainerMenuText}>ШАГ 1:  Откройте WhatsApp Web, наведите свой телефон чтобы считать код</p> :
            ''
         }

         <p className={style.socialBotName}>{socialName}</p>

			{value === 3 && (isAuth && isAuth.length !== 0) && (
				<div>
					<Spin spinning={loadingOfStatus}>
						<ul className={style.wpStatusList}>
							<li>Статус: <span>{wpStatus.status || '-----'}</span></li>
							<li>Доп. статус: <span>{wpStatus.substatus || '-----'}</span></li>
							<li>Заголовок: <span>{wpStatus.title || '-----'}</span></li>
							<li>Сообщение: <span>{wpStatus.msg || '-----'}</span></li>
							<li>Доп. сообщение: <span>{wpStatus.submsg || '-----'}</span></li>
						</ul>
					</Spin>
				</div>
			)}

         {value === 1 && (
            <p className={style.tabsContainerField}>
               <input type="text" placeholder="Token" onChange={e => setTelegramToken(e.target.value)}/>
            </p>
         )}

			{value === 3 && (isAuth && isAuth.length !== 0) && (
            <Button
					type="button"
					variant="contained"
					onClick={getWpScreenshot}
					className={style.ui_vmenu_sep_button}
					disabled={loadingOfScreenshot}
					style={{marginBottom: '20px'}}
				>
					{loadingOfScreenshot ? <CircularProgress color="white"/> : 'СКРИНШОТ'}
				</Button>
         )}

			{value === 3 ? (
				<Button
					type="button"
					variant="contained"
					onClick={socialName.length === 0 ? info : isAuth === '' || !isAuth || logoutData.ok ? handleSubmit : logoutWp}
					className={style.ui_vmenu_sep_button}
					disabled={loading || loadingOfLogout}
				>
					{isAuth === '' || !isAuth || logoutData.ok ?
						loading ? <CircularProgress color="white"/> : 'АВТОРИЗОВАТЬСЯ'
						: (
							loadingOfLogout ? <CircularProgress color="white"/> : 'ВЫХОД'
						)}
				</Button>
         ) : (
				<Button
					type="button"
					variant="contained"
					onClick={handleSubmit}
					className={style.ui_vmenu_sep_button}
					disabled={loading || isFetching}
				>
					{isAuth === '' || !isAuth ?
						loading ? <CircularProgress color="white"/> : 'АВТОРИЗОВАТЬСЯ'
						: (
							loading ? <CircularProgress color="white"/> : 'ПЕРЕАВТОРИЗАЦИЯ'
						)}
				</Button>
			)}

         <p className={style.errorMsg}>
            {error === 'Network Error' ? '' : error}
         </p>
      </p>
   );
};

const SetupSidebar = props => {
	const {
		botSetupData, url, logoutWp, resetUrl,
		setupLoading, logoutData, isFetching,
		error, vkAuth, facebookAuthUrl, QRCodeUrl,
		closeWpScreenshot, loadingOfLogout,
		loadingOfScreenshot, getWpScreenshot,
		screenshot, getWpStatus, loadingOfStatus,
		wpStatus, editManager
	} = props;

	const [value, setValue] = useState(0);
	const [visible, setVisible] = useState('');
	const [telegramToken, setTelegramToken] = useState('');

   const botId = botSetupData && Object.keys(botSetupData).length !== 0 && botSetupData.id;
	const theme = useTheme();

	const showModal = () => setVisible(true);
	const hideModal = () => {
		setVisible(false);
		closeWpScreenshot();
	};

	useEffect(() => {
		botId && getWpStatus(botId);
	}, [botSetupData.whatsapp_instance]);

	useEffect(() => {
		if (screenshot.length !== 0) {
			showModal();
		}
	}, [screenshot]);

   useEffect(() => {
      if (url.length !== 0) {
         resetUrl();
      }
   }, []);

   useEffect(() => {
      if (url.length !== 0) {
         window.open(url);
         resetUrl();
      }
   }, [url]);

   const handleChange = (value) => {
      setValue(value);
   };

   const handleChangeIndex = index => {
      setValue(index);
   };

   const paidDay = Object.keys(botSetupData).length !== 0 &&
      botSetupData.payed_end_date >= 5 ? `Ваш пробный период заканчивается через ${botSetupData.payed_end_date} дней.` :
         botSetupData.payed_end_date >= 2 ? `Ваш пробный период заканчивается через ${botSetupData.payed_end_date} дня.` :
            botSetupData.payed_end_date === 1 ? `Ваш пробный период заканчивается через ${botSetupData.payed_end_date} день.` :
               botSetupData.payed_end_date === 0 ? 'Пробный период закончился.' : ' Загрузка пробного периода';

   return (
      <aside id="sidebar" className={style.setupSidebar}>
			<div className={style.setupSidebarModal}>
				<Modal
					className={style.setupSidebarModal}
					title="Скриншот"
					visible={visible}
					footer={null}
					onCancel={hideModal}
				>
					<p style={{marginBottom: "15px"}}>Картинка может долго грузиться</p>
					<img src={screenshot} alt="Screenshot" style={{width: '100%'}}/>
				</Modal>
			</div>

         <div className={style.groupBlock}>
            <p className={style.groupBlock__text}>
               {paidDay}
               <p>
                  <Link to="/bots/tariff/prices">ВЫБРАТЬ ТАРИФ</Link>
               </p>
            </p>
         </div>
         <div className={style.ui_vmenu_sep}>
            <div className={style.ui_vmenu__title}>
               <p className={style.ui_vmenu__item_p}>Добавить новый канал</p>
            </div>

            <div className={style.tabsContainer}>
               <ul>
                  <li className={`${style.tabsContainerItem} ${value === 0 && style.tabsContainerItemActive}`} onClick={() => handleChange(0)}>Facebook Messenger</li>
                  <li className={`${style.tabsContainerItem} ${value === 1 && style.tabsContainerItemActive}`} onClick={() => handleChange(1)}>Telegram</li>
                  <li className={`${style.tabsContainerItem} ${value === 2 && style.tabsContainerItemActive}`} onClick={() => handleChange(2)}>Вконтакте</li>
                  <li className={`${style.tabsContainerItem} ${value === 3 && style.tabsContainerItemActive}`} onClick={() => handleChange(3)}>WhatsApp</li>
               </ul>

               <SwipeableViews
                  onChangeIndex={handleChangeIndex}
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
               >
						<TabPanel
							value={value}
							index={0}
							loading={setupLoading}
							isFetching={isFetching}
							socialName={botSetupData.facebook_name}
							isAuth={botSetupData.facebook_name}
							handleSubmit={() => facebookAuthUrl(botId)}
							error={error}
						/>

						<TabPanel
							value={value}
							index={1}
							loading={setupLoading}
							isFetching={isFetching}
							socialName={botSetupData.telegram_name}
                     isAuth={botSetupData.telegram_name}
							handleSubmit={() => editManager({idBot: botId, telegram_token: telegramToken, optional_params: ["telegram_token"]})}
							setTelegramToken={setTelegramToken}
							error={error}
						/>

						<TabPanel
							value={value}
							index={2}
							loading={setupLoading}
							isFetching={isFetching}
							socialName={botSetupData.vk_name}
                     isAuth={botSetupData.vk_name}
							handleSubmit={() => vkAuth(botId)}
							error={error}
						/>

						<TabPanel
							value={value}
							index={3}
							loading={setupLoading}
							isFetching={isFetching}
							socialName={botSetupData.whatsapp_instance}
                     isAuth={wpStatus.status}
							handleSubmit={() => QRCodeUrl(botId)}
							error={error}
							getWpScreenshot={() => getWpScreenshot(botId)}
							logoutWp={() => logoutWp(botId)}
							logoutData={logoutData}
							loadingOfLogout={loadingOfLogout}
							loadingOfScreenshot={loadingOfScreenshot}
							loadingOfStatus={loadingOfStatus}
							wpStatus={wpStatus}
						/>
               </SwipeableViews>
            </div>
         </div>
      </aside>
   )
};

const mapStateToProps = ({botSetupReducers, singleBotReducers}) => ({
   botSetupData: botSetupReducers.botSetupData,
   setupLoading: botSetupReducers.setupLoading,
   isFetching: botSetupReducers.isFetching,
   errorOfSocial: botSetupReducers.errorOfSocial,
	error: botSetupReducers.error,
	loadingOfScreenshot: botSetupReducers.loadingOfScreenshot,
	loadingOfStatus: botSetupReducers.loadingOfStatus,
	wpStatus: botSetupReducers.wpStatus,
	loadingOfLogout: botSetupReducers.loadingOfLogout,
	logoutData: botSetupReducers.logoutData,
	screenshot: botSetupReducers.screenshot,
	errorOfScreenshot: botSetupReducers.errorOfScreenshot,
   url: botSetupReducers.url,
});

const mapDispatchToProps = dispatch => ({
	editManager: telegramData => dispatch(editManager(telegramData)),
	facebookAuthUrl: botId => dispatch(facebookAuthUrl(botId)),
	getWpScreenshot: botId => dispatch(getWpScreenshot(botId)),
	closeWpScreenshot: () => dispatch(closeWpScreenshot()),
	getWpStatus: botId => dispatch(getWpStatus(botId)),
	QRCodeUrl: botId => dispatch(QRCodeUrl(botId)),
	logoutWp: botId => dispatch(logoutWp(botId)),
	vkAuth: botId => dispatch(vkAuthUrl(botId)),
	resetUrl: () => dispatch(resetUrl()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupSidebar);
