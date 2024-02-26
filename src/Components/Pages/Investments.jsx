import React, { useMemo, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {
  INVESTMENTS_BY_ID,
  PRODUCT_OPTIONS,
  ALL_PARTNERS,
  ADD_INVESTMENT,
  UPDATE_INVESTMENT,
  UPLOAD_IMG,
} from '../../API/api';
import { useParams } from 'react-router-dom';

const Investments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [investmentData, setInvestmentData] = useState({});
  const [productOptions, setProductOptions] = useState(null);
  const [partnerOption, setPartnerOption] = useState(null);
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        investmentName: yup.string().required('This feild is required'),
        investmentCategoryId: yup
          .string()
          .required('Please enter your last name'),
        partnerId: yup.string().required('This feild is required'),
        miniDescription: yup.string().required('Please enter your description'),
        overview: yup.string().required('Please enter your description'),
        description: yup.string().required('Please enter your description'),
        riskDisclosure: yup.string().required('Please enter your description'),
        location: yup.string().required('This feild is required'),
        regulation: yup.string().required('This feild is required'),
        minimumInvestmentAmount: yup
          .string()
          .required('This feild is required'),
        projectedIRR: yup.string().required('This feild is required'),
        currentIRR: yup.string().required('This feild is required'),
        isActive: yup.boolean().nullable().notRequired(),
        partnerLogoURL: yup.string().required('This feild is required'),
        payoutTypeId: yup.string().required('This feild is required'),
      }),
    []
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const getInvestmentByID = async () => {
    try {
      const res = await fetch(`${INVESTMENTS_BY_ID}/${id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      setInvestmentData(data);
      reset(data);
    } catch (error) {
      // Handle error
    }
  };

  const getAllPartnerData = async () => {
    try {
      const res = await fetch(ALL_PARTNERS, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
      setPartnerOption(data);
    } catch (error) {
      // Handle error
    }
  };

  const getCategoryOption = async () => {
    try {
      const response = await fetch(PRODUCT_OPTIONS);

      // Check if the response status is okay (status code 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
      setProductOptions(data);
    } catch (error) {
      // Handle errors
      console.error('An error occurred:', error);
    }
  };

  const onSubmit = async (formData) => {
    const url = id ? UPDATE_INVESTMENT + '/' + id : ADD_INVESTMENT;
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
        navigate('/investments');
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (id) {
      getInvestmentByID();
    }
  }, [id]);

  useEffect(() => {
    getCategoryOption();
    getAllPartnerData();
  }, []);

  useEffect(() => {
    if (investmentData.investmentCategoryId) {
      setValue('investmentCategoryId', investmentData.investmentCategoryId);
      console.log(getValues('investmentCategoryId'));
    }
  }, [investmentData, productOptions]);

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
      setValue('partnerLogoURL', data.url);
    } catch (error) {
      // Handle error
    }
  };

  if (!sessionStorage.getItem('token')) navigate('/login');
  if (id) {
    if (!investmentData?.investmentCategoryId) return;
    if (!investmentData?.partnerId) return;
  }
  return (
    <div>
      <header className='flex justify-between py-4'>
        <p>Investment / Edit</p>
        <div className='px-4 py-2 text-sm text-gray-500 bg-gray-300 rounded'>
          id: {id}
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className='w-[70%]'>
        <div className='flex gap-4 my-7'>
          <TextField
            label='Investment Name'
            {...register('investmentName')}
            InputLabelProps={{
              shrink: true,
            }}
            id='investmentName'
            name='investmentName'
            error={!!errors.investmentName}
            helperText={errors.investmentName?.message}
            className='w-full'
          />
        </div>
        <div className='flex gap-4 my-7'>
          <FormControl className='w-[50%]'>
            <InputLabel
              id='investmentCategoryId-label'
              htmlFor='investmentCategoryId-label'
            >
              Category
            </InputLabel>
            <Select
              labelId='investmentCategoryId-label'
              id='investmentCategoryId-select-autowidth'
              className='w-full'
              {...register('investmentCategoryId')}
              InputLabelProps={{
                shrink: true,
              }}
              label='category'
              defaultValue={investmentData?.investmentCategoryId}
            >
              {productOptions &&
                productOptions.map((item) => (
                  <MenuItem
                    key={item.investmentCategoryId}
                    value={item.investmentCategoryId}
                    // aria-selected={investmentData?.investmentCategoryId == item.id}
                  >
                    {item.investmentCategoryName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl className='w-[50%]'>
            <InputLabel id='partnerId-label'>Partner</InputLabel>
            <Select
              labelId='partnerId-label'
              id='partnerId-select-autowidth'
              className='w-full'
              {...register('partnerId')}
              InputLabelProps={{
                shrink: true,
              }}
              label='Partner'
              defaultValue={investmentData?.partnerId}
            >
              {partnerOption &&
                partnerOption.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.partnerName}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>

        <div className='flex my-7'>
          <TextField
            multiline
            aria-label='Partner Description'
            inputProps={register('miniDescription')}
            minRows={3}
            maxRows={3}
            placeholder='Partner Description'
            id='miniDescription'
            name='miniDescription'
            error={!!errors.miniDescription}
            helperText={errors.miniDescription?.message}
            className='w-full'
            label='Partner Description'
          />
        </div>

        <div className='flex my-7'>
          <TextField
            multiline
            aria-label='Overview'
            inputProps={register('overview')}
            minRows={3}
            maxRows={3}
            placeholder='overview'
            id='overview'
            name='overview'
            error={!!errors.overview}
            helperText={errors.overview?.message}
            className='w-full'
            label='Overview'
          />
        </div>

        <div className='flex my-7'>
          <TextField
            multiline
            aria-label='Description'
            inputProps={register('description')}
            minRows={3}
            maxRows={3}
            placeholder='description'
            id='description'
            name='description'
            error={!!errors.description}
            helperText={errors.description?.message}
            className='w-full'
            label='Description'
          />
        </div>

        <div className='flex my-7'>
          <TextField
            multiline
            aria-label='riskDisclosure'
            inputProps={register('riskDisclosure')}
            minRows={3}
            maxRows={3}
            placeholder='Risk Disclosure'
            id='riskDisclosure'
            name='riskDisclosure'
            error={!!errors.riskDisclosure}
            helperText={errors.riskDisclosure?.message}
            className='w-full'
            label="Risk Disclosure"
          />
        </div>

        <div className='flex gap-4 my-7'>
          <TextField
            label='Location'
            {...register('location')}
            InputLabelProps={{
              shrink: true,
            }}
            id='location'
            name='location'
            error={!!errors.location}
            helperText={errors.location?.message}
            className='w-full'
          />

          <TextField
            label='Regulation'
            {...register('regulation')}
            InputLabelProps={{
              shrink: true,
            }}
            id='regulation'
            name='regulation'
            error={!!errors.regulation}
            helperText={errors.regulation?.message}
            className='w-full'
          />
        </div>

        <div className='flex gap-4 my-7'>
          <TextField
            label='Minimum Investment Amount'
            {...register('minimumInvestmentAmount')}
            InputLabelProps={{
              shrink: true,
            }}
            id='minimumInvestmentAmount'
            name='minimumInvestmentAmount'
            error={!!errors.minimumInvestmentAmount}
            helperText={errors.minimumInvestmentAmount?.message}
            className='w-full'
          />

          <TextField
            label='Projected IRR'
            {...register('projectedIRR')}
            InputLabelProps={{
              shrink: true,
            }}
            id='projectedIRR'
            name='projectedIRR'
            error={!!errors.projectedIRR}
            helperText={errors.projectedIRR?.message}
            className='w-full'
          />
        </div>

        <div className='flex gap-4 my-7'>
          <TextField
            label='Current IRR'
            {...register('currentIRR')}
            InputLabelProps={{
              shrink: true,
            }}
            id='currentIRR'
            name='currentIRR'
            error={!!errors.currentIRR}
            helperText={errors.currentIRR?.message}
            className='w-full'
          />

          <FormControl className='w-[50%]'>
            <InputLabel id='demo-simple-select-autowidth-label'>
              Is Active
            </InputLabel>
            <Select
              labelId='demo-simple-select-autowidth-label'
              id='demo-simple-select-autowidth'
              className='w-full'
              inputProps={register('isActive')}
              label='Is Active'
              defaultValue={1}
            >
              <MenuItem value={1}>True</MenuItem>
              <MenuItem value={0}>False</MenuItem>
            </Select>
          </FormControl>

          <FormControl className='w-[50%]'>
            <InputLabel id='demo-simple-select-payoutTypeId'>
              Payout Type
            </InputLabel>
            <Select
              labelId='demo-simple-select-payoutTypeId'
              id='demo-simple-select-payoutTypeId'
              className='w-full'
              inputProps={register('payoutTypeId')}
              label='Payout Type'
              defaultValue={1}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem value={1}>3 Months</MenuItem>
              <MenuItem value={2}>6 Months</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='flex justify-between gap-4 my-7'>
          {investmentData?.partnerLogoURL && (
            <img src={investmentData?.partnerLogoURL} className='flex' />
          )}
          <TextField
            type='file'
            label=''
            id='partnerLogoURL'
            name='partnerLogoURL'
            error={!!errors.partnerLogoURL}
            onChange={(e) => handleUpload(e)}
            helperText={errors.partnerLogoURL?.message}
            // inputProps={register('partnerLogoURL')}
          />
        </div>

        <div className='flex gap-4'>
          <Button variant='outlined'  onClick={() => navigate('/investments')}>Cancel</Button>
          <Button
            variant='contained'
            type='submit'
            className='!bg-[#025464]'
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Investments;
