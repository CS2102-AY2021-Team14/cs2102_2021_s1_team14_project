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
                <TableHead style={{
                    backgroundColor: '#364F6B',
                }}>
                    <TableCell><h2 className="tableHead">Month</h2></TableCell>
                    <TableCell><h2 className="tableHead">Year</h2></TableCell>
                    <TableCell><h2 className="tableHead">Pet days</h2></TableCell>
                    <TableCell><h2 className="tableHead">Salary</h2></TableCell>
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