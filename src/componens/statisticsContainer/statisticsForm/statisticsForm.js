import React from 'react';
import {connect} from 'react-redux';

import {Table, Input, Icon, Button} from 'antd';
import Highlighter from 'react-highlight-words';
import {moduleName as statisticsModule} from "../../../ducks/Statistics";

import {formatUnixToDate} from "../../../utils/formatDate";

class StatisticsForm extends React.Component {
   state = {
      selectedRowKeys: [],
      searchText: '',
      searchedColumn: '',
      newForm: []
   };

   getColumnSearchProps = dataIndex => ({
      filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
         <div style={{padding: 8}}>
            <Input
               ref={node => {
                  this.searchInput = node;
               }}
               placeholder={`Search ${dataIndex}`}
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

   onSelectChange = selectedRowKeys => {
      this.setState({selectedRowKeys});
   };

   render() {
      const {selectedRowKeys} = this.state;
      const {statistics, loadingOfStatistics} = this.props;
      const newArr = [];

      Object.keys(statistics).length !== 0 && statistics.forms.length !== 0 && statistics.forms.forEach(form => {
         newArr.push({
            submit_date: formatUnixToDate(form.submit_date),
            form: form.form
         })
      });

      const rowSelection = {
         selectedRowKeys,
         onChange: this.onSelectChange
      };

      const columns = [
         {
            title: 'Дата',
            dataIndex: 'submit_date',
         },
         {
            title: 'Форма',
            dataIndex: 'form',
            ...this.getColumnSearchProps('form'),
            width: '70%'
         },
         {
            title: 'Деиствие',
            dataIndex: 'action',
         },
      ];

      return (
         <div className="statistics-form">
            <div className="statistics-form__table">
               <Table
                  rowSelection={rowSelection}
                  loading={Object.keys(statistics).length === 0 && loadingOfStatistics}
                  columns={columns}
                  dataSource={newArr}
               />
            </div>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   statistics: state[statisticsModule].statistics,
   loadingOfStatistics: state[statisticsModule].loadingOfStatistics,
   errorOfStatistics: state[statisticsModule].errorOfStatistics
});

export default connect(mapStateToProps)(StatisticsForm);
