import React from 'react';

import {Pagination as AntdPagination} from 'antd';

const Pagination = ({dataPerPage, totalData, paginate, currentPage}) => (
	<div className="pagination-container">
		<AntdPagination
			defaultCurrent={currentPage}
			pageSize={dataPerPage}
			onChange={page => paginate(page)}
			total={totalData}
		/>
	</div>
);

export default Pagination;
