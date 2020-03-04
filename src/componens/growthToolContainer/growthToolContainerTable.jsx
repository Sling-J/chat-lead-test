import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import Highlighter from "react-highlight-words";
import {Button, Icon, Input, Table, Popconfirm, Tooltip} from "antd";

import {moduleName as growthToolModule, deleteMLP} from "../../ducks/GrowthTool";

import {formatUnixToDate} from "../../utils/formatDate";

class GrowthToolContainerTable extends Component {
   state = {
      searchText: '',
      searchedColumn: '',
      mlpData: []
   };

   componentDidUpdate(prevProps, prevState, snapshot) {
      const {allMLP} = this.props;

      if (allMLP !== prevProps.allMLP) {
         if (allMLP.length !== 0) {
            const mlpData = [];

            allMLP.forEach(mlp => mlpData.push({
               key: mlp.id,
               title: mlp.settings.title,
               type: 'MLP',
               date: formatUnixToDate(mlp.create_date),
            }));

            this.setState({mlpData})
         }
      }
   }

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
               placeholder={`Введите тег`}
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

   columns = [
      {title: 'Название лидгентула', dataIndex: 'title', key: 'title', ...this.getColumnSearchProps('title')},
      {title: 'Тип', dataIndex: 'type', key: 'type'},
      {title: 'Дата создания', dataIndex: 'date', key: 'date'},
      {
         title: 'Действие',
         dataIndex: '',
         key: 'x',
         render: record => (
            <div className="growth-tool-table-icons">
               <Tooltip title="Редактировать">
                  <Icon type="edit" onClick={() => {
                     this.props.setMLPId(record.key);
                     this.props.setPage(1)
                  }}/>
               </Tooltip>
               <Popconfirm title="Вы уверены что хотите удалить?" onConfirm={() => this.props.deleteMLP({
                  botId: this.props.match.params.botId,
                  mlpId: record.key
               })}>
                  <Icon type="delete"/>
               </Popconfirm>
            </div>
         ),
      },
   ];

   render() {
      const {loadingOfMLP, loadingOfDeleting} = this.props;
      const {mlpData} = this.state;

      return (
         <div className="growth-tool-table">
            <Table
               columns={this.columns}
               dataSource={mlpData}
               loading={loadingOfMLP || loadingOfDeleting}
               rowClassName="growth-tool-table__row"
            />
         </div>
      )
   }
}

export default compose(
   connect(
      state => ({
         allMLP: state[growthToolModule].allMLP,
         loadingOfMLP: state[growthToolModule].loadingOfMLP,
         loadingOfDeleting: state[growthToolModule].loadingOfDeleting,
      }), {
         deleteMLP
      }
   ),
   withRouter
)(GrowthToolContainerTable);