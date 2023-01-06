import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import CreateSongForm from './createsong'

import { getAllAlbumsThunkCreator } from '../../store/albums'

import './CreateSongForm.css'


function CreateForm() {
  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllAlbumsThunkCreator());
  }, [dispatch]);

  return (
    <div className="bodycontainer center">
      <div className="formContainer">
        <CreateSongForm user={user}/>
      </div>
    </div>
  );

}

export default CreateForm