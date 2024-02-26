import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { ALL_LEADS } from '../../API/api';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const LeadList = () => {
  const [leadsData, setLeadsData] = useState([])
  const navigate = useNavigate();
  if(!sessionStorage.getItem('token')) navigate('/login');
  // Fetch all partners data and display it in a table
  const getAllLeadsData = async() => {
    try {
      const res = await fetch(ALL_LEADS, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
      setLeadsData(data);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getAllLeadsData();
  }, [])

  const handleEditLeads = (id) => {
    navigate(`/leads/${id}`);
  }
  
  return (
    <>
       <header className='flex justify-between py-4'>
        <p>Leads</p>
        <Link className='bg-[#025464] text-white px-4 rounded py-2 text-sm' to={'/leads/add'}>Add New Leads</Link>
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
            {leadsData?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell>{row.firstName} {row?.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell><Button onClick={() => handleEditLeads(row.id)}>Edit</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LeadList;
