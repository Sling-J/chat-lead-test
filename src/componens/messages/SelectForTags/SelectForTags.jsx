import React, {useState} from 'react';
import {Divider, Icon, Select} from "antd";

const SelectForTags = ({isTagCreator, placeholder, style}) => {
   const [searchValue, setSearchValue] = useState('');
   const [children] = useState([]);

   const handleChange = value => {
      console.log(`selected ${value}`);
      setSearchValue('');
   };

   return isTagCreator ? (
      <Select
         mode="tags"
         style={style}
         placeholder={placeholder}
         onChange={handleChange}
         onSearch={value => setSearchValue(value)}
         dropdownRender={menu => {
            const result = children.find(item => item === searchValue);

            return (
               <div>
                  <div
                     style={{padding: '4px 8px', cursor: 'pointer'}}
                     onMouseDown={e => e.preventDefault()}
                  >
                     {!result && searchValue.length !== 0 && (<><Icon type="plus"/> Создать «{searchValue}»</>)}
                  </div>
                  <Divider style={{margin: '4px 0'}}/>
                  {menu}
               </div>
            )
         }}
      />
   ) : (
      <Select
         mode="multiple"
         style={style}
         placeholder={placeholder}
         onChange={handleChange}
      />
   );
};

export default SelectForTags;
