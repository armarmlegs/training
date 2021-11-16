import React from "react";
import _ from 'lodash'

const Pagination = props => {
  const {pageSize, itemCount, onPageChange} = props;
  const pageCount = Math.ceil(itemCount /pageSize);
  console.log(pageCount)
  if (pageCount.length === 1) return null;
  const pages = _.range(1, pageCount +1);
  


  return (
    <nav>
      <ul className="pagination">
      {pages.map(page =>  <li  key={page}className="page-item">
          <a style={{ cursor: "pointer" }} className="page-link" onClick={onPageChange}>
           {page}
          </a>
        </li>)}
       
      </ul>
    </nav>
  );
};

export default Pagination;
