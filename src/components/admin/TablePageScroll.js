import React, { useState } from 'react';
import { TablePagination } from '@material-ui/core';

const TablePageScroll = ({ 
    employeeInfos, 
    rowsPerPage,
    page,
    setPage,
    setRowsPerPage,
    rowsPerPageDropDown }) => {

    // event: object, page: number
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        // reset to first page
        setPage(0);
    }

    return (
        <TablePagination 
            component="div"
            page={page}
            rowsPerPageOptions={rowsPerPageDropDown}
            rowsPerPage={rowsPerPage}
            count={employeeInfos ? employeeInfos.length : 0} // determines the number of pages (computed by API)
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    );
}

export default TablePageScroll;