import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { ALL_PARTNERS } from '../../API/api';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const PartnerList = () => {
  const [partnerData, setPartnerData] = useState([])
  const navigate = useNavigate();
  if(!sessionStorage.getItem('token')) navigate('/login');
  // Fetch all partners data and display it in a table
  const getAllPartnerData = async() => {
    try {
      const res = await fetch(ALL_PARTNERS, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      setPartnerData(data);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getAllPartnerData();
  }, [])

  const handleEditInvestments = (id) => {
    navigate(`/partners/${id}`);
  }
  
  return (
    <>
       <header className='flex justify-between py-4'>
        <p>Partners</p>
        <Link className='bg-[#025464] text-white px-4 rounded py-2 text-sm' to={'/partner/add'}>Add New Partner</Link>
      </header>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>EDIT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partnerData?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell>{row.partnerName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell><Button onClick={() => handleEditInvestments(row.id)}>Edit</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PartnerList;
