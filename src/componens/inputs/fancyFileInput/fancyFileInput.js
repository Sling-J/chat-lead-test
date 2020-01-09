import React, {Fragment, useState} from 'react';
import {Spin, Upload, Modal, Icon, message} from "antd";

import HoverBarForMessage from "../../messages/hoverBarForMessage/hoverBarForMessage";
import {staticMedia} from "../../../config/service/service";

import style from './fancyFileInput.module.sass';

function getBase64(file) {
	return new Promise((resolve, reject) => {
	  const reader = new FileReader();
	  reader.readAsDataURL(file);
	  reader.onload = () => resolve(reader.result);
	  reader.onerror = error => reject(error);
	});
}

const FancyFileInput = props => {
	const {accept, onChange, index, pictureForLabel, value, type} = props;

	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [file, setFile] = useState(null);

   const pathFile = Object.values(value)[0];
   let nameFile = pathFile ? pathFile.split('/')[pathFile.split('/').length - 1] : '';

   if (pictureForLabel.label === 'photo') {
      nameFile = <img src={staticMedia + pathFile} alt={nameFile}/>
	}

	const beforeUpload = file => {
		const isJpgOrPng = type === 'photo' && file.type === 'image/jpeg' || file.type === 'image/png';
		const isLt2M = file.size / 1024 / 1024 < type === 'photo' ? 10 : 30;
	
		if (type === 'photo' && !isJpgOrPng) message.error('Вы можете загружать только JPG/PNG изображения!');	
		if (!isLt2M) message.error(type === 'photo' ? 'Изображение должно быть меньше 10MБ' : 'Файл должен быть меньше 30MБ');
	
		return isJpgOrPng && isLt2M;
	}

	const handleCancel = () => setPreviewVisible(false);
	const handleRemove = (s) => {
		console.log(s)
		setFile(null)
	};
	const handleChange = ({file}) => setFile(file);

	const handlePreview = async file => {
		if (!file.url && !file.preview) {
		  file.preview = await getBase64(file.originFileObj);
		}

		setPreviewImage(file.url || file.preview);
		setPreviewVisible(true);
	};

	const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
	);
	
   return (
      <div className={style.mainContainer}>
         <div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
            />
         </div>
					
         {pathFile !== undefined ? (
            <Fragment>
					<div className="clearfix">
						<Upload
							action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							className={`fancy-file-uploader ${type === 'photo' && 'fancy-file-uploader-img'}`}
							listType="picture-card"
							file={file}
							onPreview={handlePreview}
							beforeUpload={beforeUpload}
							onChange={handleChange}
							onRemove={handleRemove}
						>
							{(!file || (file && file.status === 'removed')) && uploadButton}
						</Upload>
						<Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
							<img alt="example" style={{ width: '100%' }} src={previewImage} />
						</Modal>
					</div>
{/* 
               <input
                  type={'file'}
                  accept={accept}
                  name={index}
                  id={index}
                  onChange={(e) => {
                     if (e.target.files[0].size <= 3500000) {
                        onChange(e);
                        setSizeError('');
                     } else {
                        setSizeError('Размер файла слишком велик')
                     }
                  }}
                  className={style.inputFile}
               />
               <label htmlFor={index}>
                  <div className={style.pictureContainer}>
                     <h2>{pathFile.length > 0 ? nameFile : pictureForLabel.img}</h2>
                     <p>{pathFile.length === 0 && pictureForLabel.label}</p>
                  </div>
               </label>

               <p className={style.sizeError}>
                  {sizeError.length !== 0 && sizeError}
               </p> */}
            </Fragment>
         ) : (
            <Spin spinning={pathFile}>
               <input
                  id={index}
                  className={style.inputFile}
               />
               <label htmlFor={index}>
                  <div className={style.pictureContainer}>
                     <p style={{margin: '0 0 15px'}}>Ошибка загрузки!</p>
                     <h2 style={{fontSize: '17px'}}>Установите компонент заново</h2>
                  </div>
               </label>
            </Spin>
         )}
      </div>
   )
};

export default FancyFileInput;
