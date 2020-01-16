import React from 'react';
import {Link} from 'react-router-dom';
import {Result, Button} from 'antd';

const TariffPaymentContainerSuccess = () => (
	<Result
		status="success"
		title="Вы успешно приобрели тарифный план!"
		subTitle="Обработка платежа занимает 1-2 минуты, пожалуйста, подождите."
		extra={[
			<div style={{marginBottom: '20px'}}>
				<Link to="/bots/tariff/history">
					<Button type="primary" key="console">Посмотреть историю покупок</Button>
				</Link>
			</div>,
			<Link to="/bots/tariff/payment">
				<Button key="buy">Купить еще</Button>
			</Link>,
		]}
	/>
);

export default TariffPaymentContainerSuccess;