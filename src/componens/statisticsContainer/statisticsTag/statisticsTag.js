import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {Button, Icon, Input, Table, Tooltip} from 'antd';
import MuiButton from "@material-ui/core/Button";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Highlighter from "react-highlight-words";

import {moduleName as tagsModule, deleteTag, addTag} from "../../../ducks/Tags";
import {deletionConfirmation} from "../../../utils/deletionConfirmation";

class StatisticsTag extends React.Component {
   state = {
      searchText: '',
      searchedColumn: '',
      open: false,
      tagField: '',
      data: [],
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

   handleClickOpen = () => this.setState({open: true});
   handleClose = () => this.setState({open: false});

   render() {
      const {tags, loadingOfDeleting, loadingOfTags, loadingOfAdding, addTag, match, deleteTag} = this.props;
      const {open, tagField} = this.state;

      const columns = [
         {
            title: 'Теги',
            dataIndex: 'name',
            width: '60%',
            ...this.getColumnSearchProps('name'),
            render: text => text.charAt(0).toUpperCase() + text.slice(1),
         },
         {
            title: 'Количество',
            dataIndex: 'count',
            key: 'count',
         },
         {
            title: 'Действие',
            dataIndex: '',
            key: 'x',
            render: text => (
               <div className="statistics-tag-actions">
                  <div className="statistics-tag-actions__delete">
                     <Tooltip title="Удалить">
                        <Icon type="delete" onClick={() => deletionConfirmation(
                           deleteTag,
                           {
                              tag: text.name,
                              botId: match.params.botId
                           },
                           `Удаление тега: ${text.name}`
                        )}/>
                     </Tooltip>
                  </div>
               </div>
            )
         },
      ];

      return (
         <div className="statistics-tag">
            <Dialog open={open} onClose={this.handleClose} className="statistics-tag-popup">
               <DialogTitle id="simple-dialog-title">Введите название тега:</DialogTitle>

               <div className="statistics-tag-popup-container">
                  <div className="statistics-tag-popup-content">
                     <Input
                        type="text"
                        value={tagField}
                        onChange={e => this.setState({tagField: e.target.value})}
                        placeholder="Тег"
                     />
                  </div>

                  <div className="statistics-tag-popup-footer">
                     <MuiButton
                        className="statistics-tag-popup-footer__close"
                        variant="outlined"
                        onClick={this.handleClose}
                     >
                        Отмена
                     </MuiButton>
                     <MuiButton
                        className="statistics-tag-popup-footer__create"
                        variant="contained"
                        onClick={() => {
                           addTag({botId: match.params.botId, tag: tagField.toLowerCase()});
                           this.handleClose();
                        }}
                        disabled={tagField.length === 0}
                     >
                        Создать
                     </MuiButton>
                  </div>
               </div>
            </Dialog>

            <div className="statistics-tag-container">
               <p className="statistics-table__title">Статистика тегов</p>
               <div>
                  <MuiButton
                     className="statistics-table__btn"
                     variant="contained"
                     onClick={this.handleClickOpen}
                  >
                     + Добавить тег
                  </MuiButton>
               </div>
            </div>
            <Table
               columns={columns}
               loading={loadingOfDeleting || loadingOfTags || loadingOfAdding}
               dataSource={tags}
            />
         </div>
      );
   }
}

export default compose(
   connect(state => ({
      loadingOfAdding: state[tagsModule].loadingOfAdding,
      loadingOfDeleting: state[tagsModule].loadingOfDeleting,
      loadingOfTags: state[tagsModule].loadingOfTags,
      tagsStatistics: state[tagsModule].tagsStatistics,
      tags: state[tagsModule].tags,
   }), {deleteTag, addTag}),
   withRouter
)(StatisticsTag);