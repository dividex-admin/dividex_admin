import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { ALL_INVESTMENTS } from '../../API/api';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

const InvestmentTable = () => {
  const [investmentData, setInvestmentData] = useState([]);
  const navigate = useNavigate();
  if (!sessionStorage.getItem('token')) navigate('/login');
  // Fetch all investments data and display it in a table
  const getAllInvestmentData = async () => {
    try {
      const res = await fetch(ALL_INVESTMENTS + '?&pageSize=30', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data?.data);
      setInvestmentData(data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllInvestmentData();
  }, []);

  const handleEditInvestments = (id) => {
    navigate(`/investments/${id}`);
  };

  return (
    <>
      <header className='flex justify-between py-4'>
        <p>Investments</p>
        <Link className='bg-[#025464] text-white px-4 rounded py-2 text-sm' to={'/investment/add'}>Add New Investment</Link>
      </header>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Investment name</TableCell>
              <TableCell>Minimum Invested Amt</TableCell>
              <TableCell>Targeted IRR</TableCell>
              <TableCell>Is Active</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investmentData?.map((row) => (
              <TableRow
                key={row.investmentID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.investmentID}
                </TableCell>
                <TableCell>{row.investmentName}</TableCell>
                <TableCell>{row.minimumInvestmentAmount}</TableCell>
                <TableCell>{row.projectedIRR}</TableCell>
                <TableCell>Inactive</TableCell>
                <TableCell>--NA--</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEditInvestments(row.investmentID)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InvestmentTable;
