import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import React, { useMemo, useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { ALL_LEADS, CREATE_LEADS, UPDATE_LEADS } from '../../API/api';

const Leads = () => {
  const { id } = useParams();
  const [lead, setLead] = useState({});
  const navigate = useNavigate();
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        firstName: yup.string().required('Please enter your first name'),
        lastName: yup.string().required('Please enter your last name'),
        email: yup.string().email().required('Email is required'),
        mobileNumber: yup
          .string()
          .min(10)
          .max(10)
          .required('Mobile number is required'),
        investmentId: yup.string().notRequired(),
      }),
    []
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: lead.firstName || '',
      lastName: lead.lastName || '',
      email: lead.email || '',
      mobileNumber: lead.mobileNumber || '',
      investmentId: lead.investmentId || ''
    },
  });

  const onSubmit = async (formData) => {
    const url = id ? UPDATE_LEADS + '/' + id : CREATE_LEADS;
    const method = 'PUT';
    try {
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(formData),
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
      if (data) {
        navigate('/leads');
      }
    } catch (error) {}
  };

  const getLeadById = async () => {
    try {
      const res = await fetch(`${ALL_LEADS}/${id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      setLead(data);
      reset(data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    if (id) {
      getLeadById();
    }
  }, []);

  console.log(errors);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='w-[70%]'>
        <div className='flex gap-4 my-7'>
          <TextField
            label='First Name'
            inputProps={register('firstName')}
            id='firstName'
            name='firstName'
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            className='w-full'
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label='Last Name'
            inputProps={register('lastName')}
            id='lastName'
            name='lastName'
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            className='w-full'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className='flex gap-4 my-7'>
          <TextField
            label='Mobile Number'
            {...register('mobileNumber')}
            InputLabelProps={{
              shrink: true,
            }}
            id='mobileNumber'
            name='mobileNumber'
            error={!!errors.mobileNumber}
            helperText={errors.mobileNumber?.message}
            className='w-full'
          />

          <TextField
            label='Email'
            {...register('email')}
            InputLabelProps={{
              shrink: true,
            }}
            id='email'
            name='email'
            error={!!errors.email}
            helperText={errors.email?.message}
            className='w-full'
          />
        </div>

        <div className='flex gap-4 my-7'>
        <TextField
            label='Invesment Id'
            {...register('investmentId')}
            InputLabelProps={{
              shrink: true,
            }}
            id='investmentId'
            name='investmentId'
            error={!!errors.investmentId}
            helperText={errors.investmentId?.message}
            className='w-full'
          />
        </div>

        <div className='flex gap-4'>
          <Button variant='outlined' onClick={() => navigate('/leads')}>Cancel</Button>
          <Button variant='contained' type='submit' className='!bg-[#025464]'>
            Update
          </Button>
        </div>
      </form>
    </>
  );
};

export default Leads;
