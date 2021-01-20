import React from "react";

const Pagination = ({ recordsPerPage, totalRecords, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="my-2">
      <ul className="pagination justify-content-center">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item bg-light">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const paginate = (pageNumber) => setCurrentPage(pageNumber);
export default Pagination;
