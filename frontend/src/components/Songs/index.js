import { useDispatch, useSelector } from 'react-redux'
import { getAllSongsThunkCreator, getAllSongs } from '../../store/songs'
import { useEffect } from 'react'
import SongCard from './songCard'
import './landingPage.css'


function Songs() {
    const dispatch = useDispatch()
    
    useEffect(()=> {
        dispatch(getAllSongsThunkCreator())
    }, [dispatch])
    
    const songs = useSelector(getAllSongs)
    const songsArr = songs.slice(songs.length- 12, songs.length)
    
    return (
      <div className='bodycontainer'>
        <div className='banner'>
          <img src='https://i.pinimg.com/564x/91/f2/5f/91f25f4a0e2c968bdbdd61bbab9cea32.jpg' alt=''/>
        </div>
        <div className='welcome'>
          <h1>Ready to become a <span className='quacksterW'>Quackster?</span></h1>
        </div>
        <div className="landingPage">
          {songsArr.map((song) => (
            <SongCard key={song.id} song={song} formType={"normal"} />
          ))}
        </div>
      </div>
    );
}

export default Songs