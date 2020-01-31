import React, {useState} from 'react';

import {Radio, Input, Icon} from "antd";

const GrowthToolMlpContent = ({
   youtubeField, setYoutubeField, description1,
   setDescription1, phone1, setFile, file,
   setPhone1, description2, setDescription2,
   phone2, setPhone2, actionText, setActionText
}) => {
   const [descriptionTab, setDescriptionTab] = useState(1);
   const [radioTab, setRadioTab] = useState(1);
   const [errorOfSize, setErrorOfSize] = useState(null);

   const onChange = e => {
      setRadioTab(e.target.value);
      setYoutubeField('');
      setFile(null);
   };

   const onChangeDescTab = value => {
      setDescriptionTab(value);
      setDescription1('');
      setPhone1('');
      setDescription2('');
      setPhone2('');
   };

   return (
      <div className="mlp-content">
         <div className="mlp-content__custom">
            <div className="mlp-content__media">
               <Radio.Group onChange={onChange} value={radioTab}>
                  <Radio value={1}>Изображение</Radio>
                  <Radio value={2}>Видео</Radio>
               </Radio.Group>

               <div className="mlp-content-media__box">
                  {radioTab === 1 ? (
                     <div className="mlp-content-media-box__img">
                        <input
                           className='mlp-content-media-box-img__field'
                           accept={'image/*'}
                           type="file"
                           name="mlp-picture"
                           id="mlp-picture"
                           onChange={e => {
                              if (e.target.files.length !== 0) {
                                 if (e.target.files[0].size <= 3500000) {
                                    setErrorOfSize(null);
                                    setFile(e.target.files[0]);
                                 } else {
                                    setErrorOfSize('Размер файла слишком велик')
                                 }
                              }
                           }}
                        />

                        <label className="mlp-content-media-box-img__label" htmlFor="mlp-picture">
                           <Icon type="plus"/>
                        </label>

                        <p className={`mlp-content-media-box-img__filename ${errorOfSize && 'mlp-content-media-box-img__error'}`}>{errorOfSize || (file && file.name)}</p>
                     </div>
                  ) : (
                     <div className="mlp-content-media-box__video">
                        <Input
                           type="text"
                           placeholder="Ссылка видео на Youtube"
                           value={youtubeField}
                           onChange={e => setYoutubeField(e.target.value)}
                        />
                     </div>
                  )}
               </div>
            </div>

            <div className="mlp-content__description">
               <div className="mlp-content-description__section">
                  <div className="mlp-content-description-section__tabs">
                     <p className="mlp-content-description-section-tabs__title">Первый раздел:</p>

                     <div className="mlp-content-description-section-tabs__container">
                        <p className={`mlp-content-description-section-tabs-container__item ${descriptionTab === 1 && 'mlp-content-description-section-tabs-container__item-active'}`} onClick={() => onChangeDescTab(1)}>Заголовок</p>
                        <p className={`mlp-content-description-section-tabs-container__item ${descriptionTab === 2 && 'mlp-content-description-section-tabs-container__item-active'}`} onClick={() => onChangeDescTab(2)}>Телефона</p>
                     </div>
                  </div>

                  <div className="mlp-content-description-section__info">
                     {descriptionTab === 1 && (
                        <textarea
                           className="mlp-content-description-section-info__desc"
                           value={description1}
                           placeholder="Заголовок"
                           onChange={e => setDescription1(e.target.value)}
                        />
                     )}
                     {descriptionTab === 2 && (
                        <Input
                           type="text"
                           value={phone1}
                           onChange={e => setPhone1(e.target.value)}
                           placeholder="Введите номер телефона"
                        />
                     )}
                  </div>
               </div>

               <div className="mlp-content-description__section">
                  <div className="mlp-content-description-section__tabs">
                     <p className="mlp-content-description-section-tabs__title">Второй раздел:</p>

                     <div className="mlp-content-description-section-tabs__container">
                        <p className={`mlp-content-description-section-tabs-container__item ${descriptionTab === 2 && 'mlp-content-description-section-tabs-container__item-active'}`} onClick={() => onChangeDescTab(2)}>Заголовок</p>
                        <p className={`mlp-content-description-section-tabs-container__item ${descriptionTab === 1 && 'mlp-content-description-section-tabs-container__item-active'}`} onClick={() => onChangeDescTab(1)}>Телефона</p>
                     </div>
                  </div>

                  <div className="mlp-content-description-section__info">
                     {descriptionTab === 2 && (
                        <textarea
                           className="mlp-content-description-section-info__desc"
                           value={description2}
                           placeholder="Описание"
                           onChange={e => setDescription2(e.target.value)}
                        />
                     )}
                     {descriptionTab === 1 && (
                        <Input
                           type="text"
                           value={phone2}
                           onChange={e => setPhone2(e.target.value)}
                           placeholder="Введите номер телефона"
                        />
                     )}
                  </div>
               </div>
            </div>

            <div className="mlp-content__action">
               <p className="mlp-content-action__title">Призыв к действию:</p>
               <Input
                  type="text"
                  value={actionText}
                  onChange={e => setActionText(e.target.value)}
                  placeholder="ШАГ - 1. Выберите Свой Мессенджер"
               />
            </div>
         </div>

         <div className="mlp-content__result">

         </div>
      </div>
   );
};

export default GrowthToolMlpContent;
