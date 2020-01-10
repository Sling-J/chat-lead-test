import React, {Fragment, useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';

import {Spin, Upload, Modal, message} from "antd";

import HoverBarForMessage from "../../messages/hoverBarForMessage/hoverBarForMessage";
import {staticMedia} from "../../../config/service/service";
import {userAccessToken} from "../../../utils/userToken";

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
	const {accept, index, pictureForLabel, value, type, changedTrigger, match} = props;

	const [previewImage, setPreviewImage] = useState('');
	const [previewVisible, setPreviewVisible] = useState(false);
	const [file, setFile] = useState(null);

	const pathFile = value[type];
	let nameFile = pathFile ? pathFile.split('/')[pathFile.split('/').length - 1] : '';
	
	useEffect(() => {
		if (pathFile.length !== 0) {
			setFile({
				uid: '-1',
				name: nameFile,
				status: 'done',
				url: staticMedia + pathFile,
			})
		}
	}, []);

	const beforeUpload = file => {
		const isLt2M = file.size / 1024 / 1024 < type === 'photo' ? 10 : 30;
		
		if (!isLt2M) {
			message.error(type === 'photo' ? 'Изображение должно быть меньше 10MБ' : 'Файл должен быть меньше 30MБ')
		};
	
		return isLt2M;
	}

	const handleCancel = () => setPreviewVisible(false);
	const handleChange = ({file}) => setFile(file)

	const handlePreview = async file => {
		if (!file.url && !file.preview) {
		  file.preview = await getBase64(file.originFileObj);
		}

		setPreviewImage(file.url || file.preview);
		setPreviewVisible(true);
	};

	const uploadButton = (
      <div className="ant-upload-text" style={{fontSize: "17px"}}>
		  	<div className={style.pictureContainer}>
				<h2>{pictureForLabel.img}</h2>
				<p>{pictureForLabel.label}</p>
			</div>
		</div>
	);

	console.log(value);
	
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
							accept={accept}
							action="https://api.chatlead.io/app/api/UploadFile/"
							data={() => {
								return {
									type: type,
									trigger_id: changedTrigger.id,
									caption: changedTrigger.caption,
									manager_id: match.params.botId,
									user_token: userAccessToken()
								}
							}}
							className={`fancy-file-uploader ${type === 'photo' && 'fancy-file-uploader-img'}`}
							listType="picture-card"
							file={file}
							onPreview={handlePreview}
							beforeUpload={beforeUpload}
							onChange={handleChange}
						>
							{(!file || (file && file.status === 'removed')) && uploadButton}
						</Upload>
						<Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
							<img alt="example" style={{width: '100%'}} src={previewImage} />
						</Modal>
					</div>
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

export default withRouter(FancyFileInput);
