import React from 'react';

import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

const CssTextField = withStyles({
   root: {
      width: '300px',
      borderRadius: '25px !important',
      '& label.Mui-focused': {
         color: '#4680FE',
      },
      '& .MuiOutlinedInput-root': {
         '&.Mui-focused fieldset': {
            borderColor: '#4680FE',
         },
      },
   },
})(TextField);

const SearchData = ({handler, data, placeholder}) => {
   const dynamicSearchData = (data, searchString) => {
      const searchData = [];

      data.forEach(elem => {
         if (searchString) {
            if (elem.trigger_text.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
               searchData.push(elem);
            }
         } else if (!searchString) {
            searchData.push(elem);
         }
      });

      handler(searchData);
   };

   return (
      <div>
         <CssTextField
            className="search-data"
            id="input-with-icon-adornment"
            label={placeholder}
            variant="outlined"
            onChange={e => dynamicSearchData(data, e.target.value)}
            InputProps={{
               endAdornment: (
                  <InputAdornment position="end">
                     <SearchIcon/>
                  </InputAdornment>
               ),
            }}
         />
      </div>
   );
};

export default SearchData;
