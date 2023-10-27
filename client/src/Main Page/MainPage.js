import './MainPage.scss';
import {Helmet} from 'react-helmet'
import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate=()=>{
    setIsOpen(!isOpen);
  }
  const handleCancel = () => {
    setIsOpen(false); 
  }
  return (
    <div>
      <Helmet>
    <title>Home Page</title>
      </Helmet>

      <div className='home-page'>
        <div className='img'>
          <img src='https://www.gstatic.com/classroom/empty_states_home.svg'/>

        </div>


        <div className='adding'>
          <p>Add a class to get started</p>
          <div>
            <button onClick={handleCreate} className='button-5'>Create Class</button>
            {isOpen && (
        <div className="class-card">
        <div className='title'>
          Create Class

        </div>

        <div className='inputs'>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control placeholder="Class Name(required)"/>
        <Form.Control placeholder="Department (required)"/>
      </Form.Group>
    </Form>

        </div>

        <div className='cancel-create'>
        <Stack spacing={2} direction="row">
      <Button variant="text" onClick={handleCancel}>Cancel</Button>
      <Button variant="contained" ><Link to={"/mypage"}> Create</Link></Button>
      
    </Stack>
  
        </div>
        </div>
      )}
          </div>

        </div>

      </div>


        
    </div>
  )
}
