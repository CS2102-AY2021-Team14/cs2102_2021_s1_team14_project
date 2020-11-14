import React from 'react';
import { 
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
  } from '@material-ui/core';
import './Salary.css';

const Salary = ({ allSalaries }) => {
    
    return (
        <>
           { allSalaries ? 
            <Table>
                <TableHead>
                    <TableCell>Month</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Pet Days</TableCell>
                    <TableCell>Salary</TableCell>
                </TableHead>
                <TableBody>
                    {allSalaries.map(row => (
                        <TableRow>
                            <TableCell>{row.month}</TableCell>
                            <TableCell>{row.year}</TableCell>
                            <TableCell>{row.pet_days}</TableCell>
                            <TableCell>{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table> : null }
        </>
    )

}

export default Salary;