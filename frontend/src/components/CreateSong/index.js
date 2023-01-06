import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import CreateSongForm from './createsong'
import CreateAlbumForm from './createalbum'

import { getAllAlbumsThunkCreator } from '../../store/albums'

import './CreateSongForm.css'


function CreateForm() {
  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  
  useEffect(() => {
    dispatch(getAllAlbumsThunkCreator());
  }, [dispatch]);

  const back = () => setPage(1);

  let content;
  if(page === 1) {
    content = (
    <div className='choosePath'>
      <h1>What are you <br /> creating today?</h1>
      <div className='center'>
        <div 
        onClick={e => setPage(2)}
        className="path center">Song</div>
        <div 
        onClick={e => setPage(3)}
        className="path center">Album</div>
      </div>
    </div>
    )
  } else if (page === 2) {
    content = (
      <CreateSongForm user={user} back={back}/> 
    )
  } else if (page === 3) {
    content = (
      <CreateAlbumForm back={back} />
    )
  }


  
  return (
    <div className="bodycontainer center">
        {content}
    </div>
  );

}

export default CreateForm