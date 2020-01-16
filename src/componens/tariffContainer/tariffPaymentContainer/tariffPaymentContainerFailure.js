import React from 'react';
import {Link} from 'react-router-dom';
import {Result, Button} from 'antd';

const TariffPaymentContainerSuccess = () => (
	<Result
		status="warning"
		title="Ошибка обработки оплаты."
		subTitle="Повторите попытку"
		extra={[
			<Link to="/bots/tariff/payment">
				<Button type="primary" key="console">Повторить</Button>
			</Link>,
		]}
	/>
);

export default TariffPaymentContainerSuccess;