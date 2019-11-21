import React, {useState, Fragment} from 'react';
import ActionsContextMenu from './actionsContextMenu/actionsContextMenu';
import {connect} from "react-redux";
import {updateTrigger} from "../../../../actions/actionCreator";
import {tagsTypes} from "../../../../constants/defaultValues";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ListItem from '@material-ui/core/ListItem';
import CreateIcon from '@material-ui/icons/Create';
import DoneIcon from '@material-ui/icons/Done';

import style from './actions.module.sass';

const Actions = (props) => {
   const {buttonEditHandler, typeButton, indexButton, buttonData} = props;
   const [isOpenContextMenu, openContextMenu] = useState(false);
   const [editTagField, setEditTagField] = useState(false);
   const [createTagField, setCreateTagField] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [newTag, setNewTag] = useState('');
   const [editedTag, setEditedTag] = useState('');

   const handleOpen = event => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const editTagsInButton = (typeTag) => {
      if (!buttonData[typeTag]) {
         Object.assign(buttonData, {
            [typeTag]: []
         });
      }

      buttonEditHandler(typeButton, buttonData, indexButton, buttonData.isEmpty);
   };

   const openTagField = () => {
      setEditTagField(true);
   };

   const handleSubmit = (event, key) => {
      event.preventDefault();

      if (newTag.length !== 0) {
         buttonData[key].push(newTag);
         buttonEditHandler(typeButton, buttonData, indexButton, buttonData.isEmpty);
         setNewTag('');
      }

      setCreateTagField(false)
   };

   const handleEditExistingTag = (event, key, index) => {
      event.preventDefault();

      if (editedTag.length !== 0) {
         buttonData[key][index] = editedTag;
         buttonEditHandler(typeButton, buttonData, indexButton, buttonData.isEmpty);
         setEditedTag('');
      }

      setEditTagField(false)
   };

   console.log(editedTag);

   return (
      <div className={style.actionsMainContainer}>
         <h2 style={{color: '#82848B', textAlign: 'center'}}>Дополнительные действия: </h2>

         {Object.keys(buttonData).map(key => (
            (key === tagsTypes.AddTags || key === tagsTypes.Remove_Tags) && (
               <Fragment>
                  <div>
                     <div className={style.tagsListBtn}>
                        <Button
                           aria-controls="simple-menu"
                           aria-haspopup="true"
                           onClick={handleOpen}
                           href=""
                           variant="outlined"
                        >
                           Теги
                        </Button>
                     </div>
                     <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        className={style.tagsListBox}
                     >
                        {buttonData[key].map((elem, index) => (
                           <ListItem>
                              <div>
                                 {editTagField ? (
                                    <form onSubmit={e => handleEditExistingTag(e, key, index)}>
                                       <input
                                          type="text"
                                          defaultValue={elem}
                                          onChange={e => setEditedTag(e.target.value)}
                                       />
                                    </form>
                                 ) : elem}
                              </div>

                              <Button
                                 color="primary" size="small"
                                 onClick={e => editTagField ? handleEditExistingTag(e, key, index) : openTagField(true)}
                              >
                                 {editTagField
                                    ? <DoneIcon/>
                                    : <CreateIcon/>}
                              </Button>
                           </ListItem>
                        ))}
                     </Menu>
                  </div>

                  <div className={style.createTagBtnBox}>
                     {createTagField ? (
                        <form onSubmit={e => handleSubmit(e, key)}>
                           <input
                              type="text"
                              value={newTag}
                              placeholder="Введите тег"
                              onChange={e => setNewTag(e.target.value)}
                           />
                           {}
                           <Button variant="contained" className={style.createTagBtn} href="">Добавить</Button>
                        </form>
                     ) : (
                        <Button
                           variant="contained"
                           className={style.createTagBtn}
                           onClick={() => setCreateTagField(true)}
                           href=""
                        >
                           {key === tagsTypes.AddTags ? (
                              'Добавить тег'
                           ) : (
                              'Убрать тег'
                           )}
                        </Button>
                     )}
                  </div>
               </Fragment>
            )
         ))}

         <div className={style.controlsContainer} onClick={() => openContextMenu(true)}>
            {isOpenContextMenu && (
               <ActionsContextMenu
                  openContextMenu={openContextMenu}
                  editTagsInButton={editTagsInButton}
               />
            )}

            <div style={{color: '#82848B'}} className={style.actionsContainer}>
               + Действие
            </div>
         </div>
      </div>
   )
};

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, updationData) => dispatch(updateTrigger(triggerData, updationData)),
});

export default connect(mapDispatchToProps)(Actions);
