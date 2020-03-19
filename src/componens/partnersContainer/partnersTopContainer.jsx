import React from 'react';

import {Table} from "antd";

const columns = [
   {
      title: 'Партнеры:',
      dataIndex: 'partners',
      key: 'partners',
      width: '60%'
   },
   {
      title: 'Количество приглашенных рефералов:',
      dataIndex: 'count',
      key: 'count',
   }
];

const PartnersTopContainer = () => {
   return (
      <div className="main-container">
         <div className="partners-top-container">
            <h2 className="partners-top-container__title">
               Рейтинг:
            </h2>

            <div className="partners-top-container__table">
               <Table
                  columns={columns}
                  dataSource={[]}
               />
            </div>
         </div>
      </div>
   );
};

export default PartnersTopContainer;