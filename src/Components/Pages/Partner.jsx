import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { PARTNER_BY_ID, ADD_PARTNER, UPDATE_PARTNER, UPLOAD_IMG } from '../../API/api';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Partner = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState({});
  const navigate = useNavigate();

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        partnerName: yup.string().required('This feild is required'),
        email: yup.string().email().required('Email is required'),
        description: yup.string().required('Please enter your description'),
        mobileNumber: yup
          .string()
          .min(10)
          .max(10)
          .required('Mobile number is required'),
        logo: yup.string().required('This feild is required'),
      }),
    []
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      partnerName: partner.partnerName || '',
      email: partner.email || '',
      description: partner.description || '',
      mobileNumber: partner.mobileNumber || '',
      logo: partner.logo || '',
    },
  });

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageType', 'product');
    try {
      const res = await fetch(UPLOAD_IMG, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setValue('logo', data.url);
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  const onSubmit = async (formData) => {
    const url = id ? UPDATE_PARTNER + '/' + id : ADD_PARTNER;
    const method = id ? 'PATCH' : 'POST';
    try {
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(formData),
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      // console.log(data);
      if (data) {
        navigate('/partners');
      }
    } catch (error) {}
  };

  const getAllPartnerData = async () => {
    try {
      const res = await fetch(`${PARTNER_BY_ID}/${id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      setPartner(data);
      reset(data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    if (id) {
      getAllPartnerData();
    }
  }, []);

  if (!sessionStorage.getItem('token')) navigate('/login');

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='w-[70%]'>
        <div className='flex gap-4 my-7'>
          <TextField
            label='Partner Name'
            {...register('partnerName')}
            InputLabelProps={{
              shrink: true,
            }}
            id='partnerName'
            name='partnerName'
            error={!!errors.partnerName}
            helperText={errors.partnerName?.message}
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
        <div className='flex my-7'>
          <TextField
            multiline
            aria-label='Description'
            {...register('description')}
            minRows={3}
            maxRows={3}
            placeholder='Description'
            id='description'
            name='description'
            error={!!errors.description}
            helperText={errors.description?.message}
            className='w-full'
            label='Description'
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
            type='file'
            id='logo'
            name='logo'
            error={!!errors.logo}
            onChange={(e) => handleUpload(e)}
            helperText={errors.logo?.message}
            InputLabelProps={{
              shrink: true,
            }}
            label='Partner Logo'
          />
        </div>

        <div className='flex gap-4'>
          <Button variant='outlined'  onClick={() => navigate('/partners')}>Cancel</Button>
          <Button
            variant='contained'
            type='submit'
            className='!bg-[#025464]'
            startIcon={<CloudUploadIcon />}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Partner;
