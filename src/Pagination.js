import React from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const Pagination = ({ recordsPerPage, totalRecords, paginate }) => {

    const pageNumbers = [];

    for (let i = 1; i < Math.ceil(totalRecords / recordsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (

        <nav className="my-2">
            <ul className="pagination justify-content-center">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item bg-light">
                        <a onClick={() => paginate(number) } className="page-link">{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination; 