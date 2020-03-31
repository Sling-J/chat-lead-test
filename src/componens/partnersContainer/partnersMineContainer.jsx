import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";

import {Table, Icon} from "antd"
import Button from "@material-ui/core/Button";

import CopyToClipboard from "../Containers/CopyToClipboard";

import PageLoader from "../Containers/PageLoader";
import PartnersMineModal from "./partnersMineModal";

import {getBalance, getMoneyRequests, moduleName as partnersModule} from "../../ducks/Partners";
import {getProfile, moduleName as profileModule} from "../../ducks/Profile";

import PartnersMoney from "../../images/partners/partners-money.png";
import PartnersTime from "../../images/partners/partners-time.png";
import PartnersCheck from "../../images/partners/partners-check.png";
import {formatUnixToDate} from "../../utils/formatDate";

const columns = [
   {
      title: 'Сумма выплаты:',
      dataIndex: 'amount',
      key: 'amount',
      width: '20%',
      render: amount => <span>{amount} $</span>
   },
   {
      title: 'Дата:',
      dataIndex: 'date',
      key: 'date',
   },
   {
      title: 'Статус оплаты:',
      dataIndex: 'status',
      key: 'status',
      render: status => status
         ? <span className="partners-mine-table__true">Выплачено</span>
         : <span className="partners-mine-table__false">Не выплачено</span>
   },
   {
      title: 'Номер карты',
      dataIndex: 'card',
      key: 'card'
   }
];

const PartnersMineContainer = props => {
   const {
      getBalance, balance,
      getProfile, profile,
      getMoneyRequests, pays,
      loadingOfBalance, loadingOfProfile,
      loadingOfPays
   } = props;

   const [modalVisibility, setModalVisibility] = useState(false);
   const [paysData, setPaysData] = useState(false);

   useEffect(() => {
      getBalance();
      getProfile();
      getMoneyRequests();
   }, []);

   useEffect(() => {
      if (pays.length !== 0) {
         const arr = pays.map(item => ({
            amount: item.amount,
            date: formatUnixToDate(item.date),
            status: item.is_approved,
            card: item.card_number,
         }));

         setPaysData(arr);
      }
   }, [pays]);

   const showModal = () => setModalVisibility(true);

   return (
      <PageLoader loading={loadingOfBalance || loadingOfProfile || loadingOfPays}>
         <PartnersMineModal
            modalVisibility={modalVisibility}
            setModalVisibility={setModalVisibility}
         />

         <div className="main-container partners-mine-container">
            <div className="pv1-flex pv1-j-sb">
               <div className="partners-mine-container__money">
                  <div className="partners-mine-container-money__item pv1-flex pv1-flex-align-center">
                     <div className="partners-mine-container-money-item__icon">
                        <img src={PartnersMoney} alt="Chatlead balance"/>
                     </div>

                     <div className="partners-mine-container-money-item__info">
                        <p className="partners-mine-container-money-item-info__title">
                           Ваш баланс:
                        </p>

                        <p className="partners-mine-container-money-item-info__desc">
                           {Object.keys(balance).length !== 0 ? `${balance.balance} $` : 'Загрузка ...'}
                        </p>
                     </div>
                  </div>

                  <Button
                     className="partners-mine-container-money__btn"
                     onClick={showModal}
                     variant="contained"
                  >
                     Заказать выплату
                  </Button>

                  <div className="partners-mine-container-money__item pv1-flex pv1-flex-align-center">
                     <div className="partners-mine-container-money-item__icon">
                        <img src={PartnersTime} alt="Chatlead balance"/>
                     </div>

                     <div className="partners-mine-container-money-item__info">
                        <p className="partners-mine-container-money-item-info__title">
                           В обработке:
                        </p>

                        <p className="partners-mine-container-money-item-info__desc">
                           {Object.keys(balance).length !== 0 ? `${balance.in_processing} $` : 'Загрузка ...'}
                        </p>
                     </div>
                  </div>

                  <div className="partners-mine-container-money__item pv1-flex pv1-flex-align-center">
                     <div className="partners-mine-container-money-item__icon">
                        <img src={PartnersCheck} alt="Chatlead balance"/>
                     </div>

                     <div className="partners-mine-container-money-item__info">
                        <p className="partners-mine-container-money-item-info__title">
                           Выплачено:
                        </p>

                        <p className="partners-mine-container-money-item-info__desc">
                           {Object.keys(balance).length !== 0 ? `${balance.paid_out} $` : 'Загрузка ...'}
                        </p>
                     </div>
                  </div>
               </div>

               <div className="partners-mine-container__info">
                  <h2 className="partners-mine-container-info__title">
                     Зарабатывайте вместе с Chatlead.io!
                  </h2>

                  <p className="partners-mine-container-info__desc">
                     Мы дадим вам $5 за каждого пользователя который оплатил любой из тарифов,
                     а тем кого вы пригласили будет доступен <span>1 месяц</span> пользования тарифа
                     <br/>
                     <span>«Стандарт» бесплатно.</span>
                  </p>

                  <p className="partners-mine-container-info__sub-desc">
                     <span>5$</span> отчисления от пополнений баланса
                     рефералами разово, не зависимости от выбранного тарифа.
                  </p>

                  <div className="partners-mine-container-info__links">
                     <div className="partners-mine-container-info-links__auto">
                        <p className="partners-mine-container-info-links-auto__desc">
                           Поделитесь своей ссылкой:
                        </p>

                        <div className="partners-mine-container-info-links-auto__field pv1-flex pv1-flex-align-center">
                           <div
                              className="partners-mine-container-info-links-auto-field__link pv1-flex pv1-j-sb pv1-flex-align-center">
                              <p>{profile.id ? `http://my.chatlead.io/${profile.id}` : 'Загрузка...'}</p>
                              <CopyToClipboard>
                                 {({copy}) => (
                                    <Icon
                                       type="copy"
                                       onClick={() => copy(`http://my.chatlead.io/${profile.id}`)}
                                    />
                                 )}
                              </CopyToClipboard>
                           </div>

                           <div
                              className="partners-mine-container-info-links-auto-field__socials pv1-flex pv1-flex-align-center">
                              <div
                                 className="partners-mine-container-info-links-auto-field-socials__item partners-mine-container-info-links-auto-field-socials__item-vk">
                                 <svg
                                    aria-hidden="true" focusable="false" data-prefix="fab" data-icon="vk"
                                    className="svg-inline--fa fa-vk fa-w-18" role="img"
                                    viewBox="0 0 576 512"
                                 >
                                    <path
                                       fill="currentColor"
                                       d="M545 117.7c3.7-12.5 0-21.7-17.8-21.7h-58.9c-15 0-21.9 7.9-25.6 16.7 0 0-30 73.1-72.4 120.5-13.7 13.7-20 18.1-27.5 18.1-3.7 0-9.4-4.4-9.4-16.9V117.7c0-15-4.2-21.7-16.6-21.7h-92.6c-9.4 0-15 7-15 13.5 0 14.2 21.2 17.5 23.4 57.5v86.8c0 19-3.4 22.5-10.9 22.5-20 0-68.6-73.4-97.4-157.4-5.8-16.3-11.5-22.9-26.6-22.9H38.8c-16.8 0-20.2 7.9-20.2 16.7 0 15.6 20 93.1 93.1 195.5C160.4 378.1 229 416 291.4 416c37.5 0 42.1-8.4 42.1-22.9 0-66.8-3.4-73.1 15.4-73.1 8.7 0 23.7 4.4 58.7 38.1 40 40 46.6 57.9 69 57.9h58.9c16.8 0 25.3-8.4 20.4-25-11.2-34.9-86.9-106.7-90.3-111.5-8.7-11.2-6.2-16.2 0-26.2.1-.1 72-101.3 79.4-135.6z"
                                    />
                                 </svg>
                              </div>

                              <div
                                 className="partners-mine-container-info-links-auto-field-socials__item partners-mine-container-info-links-auto-field-socials__item-tg">
                                 <svg
                                    aria-hidden="true" focusable="false" data-prefix="fab" data-icon="telegram"
                                    className="svg-inline--fa fa-telegram fa-w-16" role="img"
                                    viewBox="0 0 496 512"
                                 >
                                    <path
                                       fill="currentColor"
                                       d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"
                                    />
                                 </svg>
                              </div>

                              <div
                                 className="partners-mine-container-info-links-auto-field-socials__item partners-mine-container-info-links-auto-field-socials__item-fb">
                                 <svg
                                    aria-hidden="true" focusable="false" data-prefix="fab"
                                    data-icon="facebook-messenger"
                                    className="svg-inline--fa fa-facebook-messenger fa-w-16" role="img"
                                    viewBox="0 0 512 512"
                                 >
                                    <path
                                       fill="currentColor"
                                       d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z"
                                    />
                                 </svg>
                              </div>

                              <div
                                 className="partners-mine-container-info-links-auto-field-socials__item partners-mine-container-info-links-auto-field-socials__item-wp">
                                 <svg
                                    aria-hidden="true" focusable="false" data-prefix="fab" data-icon="whatsapp"
                                    className="svg-inline--fa fa-whatsapp fa-w-14" role="img"
                                    viewBox="0 0 448 512"
                                 >
                                    <path
                                       fill="currentColor"
                                       d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                                    />
                                 </svg>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="partners-mine-container-info-links__promo">
                        <p className="partners-mine-container-info-links-auto__desc">
                           Промокод:
                        </p>

                        <div className="partners-mine-container-info-links-auto__field">
                           <div
                              className="partners-mine-container-info-links-auto-field__link pv1-flex pv1-j-sb pv1-flex-align-center">
                              <p>{profile.id ? profile.id : 'Загрузка...'}</p>
                              <CopyToClipboard placement="top">
                                 {({copy}) => (
                                    <Icon
                                       type="copy"
                                       onClick={() => copy(profile.id)}
                                    />
                                 )}
                              </CopyToClipboard>
                           </div>
                        </div>

                        <p className="partners-mine-container-info-links-auto__sub-desc">
                           Или попросите вести этот промокод при регистрации
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="partners-mine-table">
               <h2 className="partners-mine-table__title partners-table-title">
                  История выплат:
               </h2>

               <Table
                  columns={columns}
                  dataSource={paysData}
               />
            </div>
         </div>
      </PageLoader>
   );
};

const mapStateToProps = state => ({
   pays: state[partnersModule].pays,
   profile: state[profileModule].profile,
   balance: state[partnersModule].balance,
   loadingOfPays: state[partnersModule].loadingOfPays,
   loadingOfProfile: state[profileModule].loadingOfProfile,
   loadingOfBalance: state[partnersModule].loadingOfBalance,
});

const mapDispatchToProps = dispatch => ({
   getBalance: () => dispatch(getBalance()),
   getProfile: () => dispatch(getProfile()),
   getMoneyRequests: () => dispatch(getMoneyRequests()),
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(PartnersMineContainer);