import React from 'react';
import {connect} from 'react-redux';

import {Table, Input, Button, Icon} from 'antd';
import Highlighter from 'react-highlight-words';
import {moduleName as growthToolModule} from "../../../ducks/GrowthTool";

class StatisticsMLP extends React.Component {
   state = {
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
               placeholder={`Поиск`}
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

   render() {
      const {mlpForms, loadingOfMLPForms} = this.props;
      const newArr = [];

      mlpForms.forEach(form => {
         newArr.push({
            mlp_id: `http://chatlead.me/${form.mlp_id}`,
            phone: form.phone
         })
      });

      const columns = [
         {
            title: 'Домен',
            dataIndex: 'mlp_id',
            width: '60%',
            ...this.getColumnSearchProps('mlp_id'),
            render: text => <a href={text} target="_blank">{text}</a>
         },
         {
            title: 'Номер телефона',
            dataIndex: 'phone',
            ...this.getColumnSearchProps('phone'),
         },
         {
            title: 'Деиствие',
            dataIndex: 'action',
            // render: () => (
            //    <div className="statistics-tag-actions">
            //       <div className="statistics-tag-actions__delete">
            //          <Tooltip title="Удалить">
            //             <Icon type="delete"/>
            //          </Tooltip>
            //       </div>
            //    </div>
            // )
         },
      ];

      return (
         <div className="statistics-mlp">
            <div className="statistics-mlp__table">
               <p className="statistics-table__title">Заявки с MLP</p>

               <Table
                  loading={loadingOfMLPForms}
                  columns={columns}
                  dataSource={newArr}
               />
            </div>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   mlpForms: state[growthToolModule].mlpForms,
   loadingOfMLPForms: state[growthToolModule].loadingOfMLPForms,
   errorOfMLPForms: state[growthToolModule].errorOfMLPForms
});

export default connect(mapStateToProps)(StatisticsMLP);
