import React, {useState} from 'react';
import {connect} from "react-redux";

import {Radio, Input, Icon} from "antd";

import {uploadImageForMLP}  from "../../../ducks/GrowthTool";

import GrowthToolMLPDemo from "./growthToolMLPDemo";

const GrowthToolMlpContent = props => {
   const {
      youtubeField, setYoutubeField, description1,
      setDescription1, setFile, file,
      description2, setDescription2,
      actionText, setActionText,
      firstSectionTabs, setFirstSectionTabs,
      secondSectionTabs, setSecondSectionTabs,
      radioTab, setRadioTab, uploadImageForMLP
   } = props;
   const [errorOfSize, setErrorOfSize] = useState(null);

   const onChange = e => {
      setRadioTab(e.target.value);
      setYoutubeField('');
      setFile(null);
   };

   const onChangeDescTab = (section, value) => section === 1
      ? setFirstSectionTabs(value)
      : setSecondSectionTabs(value);

   return (
      <div className="mlp-content">
         <div className="mlp-content-custom">
            <div className="mlp-content__media">
               <Radio.Group onChange={onChange} value={radioTab}>
                  <Radio value={1}>Изображение</Radio>
                  <Radio value={2}>Видео</Radio>
               </Radio.Group>

               <div className="mlp-content-media__box">
                  {radioTab === 1 && (
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
                                    uploadImageForMLP(e.target.files[0]);
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
                  )}

                  {radioTab === 2 && (
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
                        <p
                           className={`mlp-content-description-section-tabs-container__item ${firstSectionTabs === 1 && 'mlp-content-description-section-tabs-container__item-active'}`}
                           onClick={() => {
                              onChangeDescTab(1, 1);
                              setDescription1('');
                           }}
                        >
                           Заголовок
                        </p>

                        <p
                           className={`mlp-content-description-section-tabs-container__item ${firstSectionTabs === 2 && 'mlp-content-description-section-tabs-container__item-active'}`}
                           onClick={() => {
                              if (secondSectionTabs === 2) {
                                 onChangeDescTab(1, 2);
                                 onChangeDescTab(2, 1);
                                 setDescription1('');
                              } else {
                                 onChangeDescTab(1, 2);
                              }
                           }}
                        >
                           Телефона
                        </p>
                     </div>
                  </div>

                  <div className="mlp-content-description-section__info">
                     {firstSectionTabs === 1 && (
                        <textarea
                           className="mlp-content-description-section-info__desc"
                           value={description1}
                           placeholder="Заголовок"
                           onChange={e => setDescription1(e.target.value)}
                        />
                     )}
                     {firstSectionTabs === 2 && (
                        <Input
                           className="mlp-content-description-section-info__input"
                           disabled
                           type="text"
                           placeholder="Ввод телефона"
                        />
                     )}
                  </div>
               </div>

               <div className="mlp-content-description__section">
                  <div className="mlp-content-description-section__tabs">
                     <p className="mlp-content-description-section-tabs__title">Второй раздел:</p>

                     <div className="mlp-content-description-section-tabs__container">
                        <p
                           className={`mlp-content-description-section-tabs-container__item ${secondSectionTabs === 1 && 'mlp-content-description-section-tabs-container__item-active'}`}
                           onClick={() => {
                              onChangeDescTab(2, 1);
                              setDescription2('');
                           }}
                        >
                           Описание
                        </p>
                        <p
                           className={`mlp-content-description-section-tabs-container__item ${secondSectionTabs === 2 && 'mlp-content-description-section-tabs-container__item-active'}`}
                           onClick={() => {
                              if (firstSectionTabs === 2) {
                                 onChangeDescTab(2, 2);
                                 onChangeDescTab(1, 1);
                                 setDescription2('');
                              } else {
                                 onChangeDescTab(2, 2);
                              }
                           }}
                        >
                           Телефона
                        </p>
                     </div>
                  </div>

                  <div className="mlp-content-description-section__info">
                     {secondSectionTabs === 1 && (
                        <textarea
                           className="mlp-content-description-section-info__desc"
                           value={description2}
                           placeholder="Описание"
                           onChange={e => setDescription2(e.target.value)}
                        />
                     )}
                     {secondSectionTabs === 2 && (
                        <Input
                           className="mlp-content-description-section-info__input"
                           disabled
                           type="text"
                           placeholder="Ввод телефона"
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

         <GrowthToolMLPDemo {...props}/>
      </div>
   );
};

export default connect(null, {
   uploadImageForMLP
})(GrowthToolMlpContent);
