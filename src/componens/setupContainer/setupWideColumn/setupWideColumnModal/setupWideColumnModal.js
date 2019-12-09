import React from "react";
import {Modal} from "antd";

const SetupWideColumnModal = (props) => (
   <Modal
      title="Basic Modal"
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
   >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
   </Modal>
);

export default SetupWideColumnModal;
