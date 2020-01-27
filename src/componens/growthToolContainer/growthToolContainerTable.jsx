import React, {Component} from 'react';

import Highlighter from "react-highlight-words";
import {Button, Icon, Input, Table, Tooltip} from "antd";
import mlpImage from "../../images/growthTool/mlp.PNG";
import MuiButton from "@material-ui/core/Button";
import lpShareImage from "../../images/growthTool/lpshare.PNG";
import widgetImage from "../../images/growthTool/widget.PNG";

const tableData = [
   // {
   //    key: 1,
   //    title: 'Название 1',
   //    type: 'MLP',
   //    date: '12.02.2000',
   //    description: 'Подключен к автоворонке: "/start"'
   // },
   // {
   //    key: 2,
   //    title: 'Название 2',
   //    type: 'LP поделиться',
   //    date: '12.02.2000',
   //    description: 'Подключен к автоворонке: "/start"'
   // },
   // {
   //    key: 3,
   //    title: 'Название 3',
   //    type: 'MLP',
   //    date: '12.02.2000',
   //    description: 'Подключен к автоворонке: "/start"'
   // },
   // {
   //    key: 4,
   //    title: 'Название 4',
   //    type: 'Виджет',
   //    date: '12.02.2000',
   //    description: 'Подключен к автоворонке: "/start"'
   // },
];

export default class GrowthToolContainerTable extends Component {
   state = {
      searchText: '',
      searchedColumn: '',
   };

   handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
         searchText: selectedKeys[0],
         searchedColumn: dataIndex,
      });
   };

   handleReset = clearFilters => {
      clearFilters();
      this.setState({searchText: ''});
   };

   getColumnSearchProps = dataIndex => ({
      filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
         <div style={{padding: 8}}>
            <Input
               ref={node => {
                  this.searchInput = node;
               }}
               placeholder={`Введите название`}
               value={selectedKeys[0]}
               onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
               onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
               style={{width: 188, marginBottom: 8, display: 'block'}}
            />
            <Button
               type="primary"
               onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
               icon="search"
               size="small"
               style={{width: 90, marginRight: 8}}
            >
               Поиск
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
               Сбросить
            </Button>
         </div>
      ),
      filterIcon: filtered => (
         <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
      ),
      onFilter: (value, record) =>
         record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
         if (visible) {
            setTimeout(() => this.searchInput.select());
         }
      },
      render: text =>
         this.state.searchedColumn === dataIndex ? (
            <Highlighter
               highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
               searchWords={[this.state.searchText]}
               autoEscape
               textToHighlight={text.toString()}
            />
         ) : (
            text
         ),
   });

   render() {
      const columns = [
         {title: 'Название лидгентула', dataIndex: 'title', key: 'title', ...this.getColumnSearchProps('title')},
         {title: 'Тип', dataIndex: 'type', key: 'type'},
         {title: 'Дата создания', dataIndex: 'date', key: 'date'},
         {
            title: 'Действие',
            dataIndex: '',
            key: 'x',
            render: () => (
               <div className="growth-tool-table-icons">
                  <Tooltip title="Редактировать">
                     <Icon type="edit"/>
                  </Tooltip>
                  <Tooltip title="Копировать">
                     <Icon type="copy"/>
                  </Tooltip>
                  <Tooltip title="Удалить">
                     <Icon type="delete"/>
                  </Tooltip>
               </div>
            ),
         },
      ];

      return (
         <div className="growth-tool-table">
            <Table
               columns={columns}
               expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
               dataSource={tableData}
            />
         </div>
      )
   }
}
