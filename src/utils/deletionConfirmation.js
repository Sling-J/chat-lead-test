import {Modal} from "antd";

export function deletionConfirmation(handle, params, desc) {
   Modal.confirm({
      title: 'Вы уверены, что хотите удалить?',
      content: desc,
      okText: 'Да',
      onOk() {
         handle(params);
      },
      onCancel() {
      },
   });
}

export function soonModal() {
   Modal.info({
      title: 'Скоро!',
      onOk() {},
   });
}