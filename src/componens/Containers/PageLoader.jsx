import React from 'react';
import {Spin} from 'antd'

const PageLoader = ({loading, children}) => (
   <div>
      <Spin spinning={loading}>
         {children}
      </Spin>
   </div>
);

export default PageLoader;