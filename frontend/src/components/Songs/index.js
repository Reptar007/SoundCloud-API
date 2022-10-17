import { useDispatch, useSelector } from 'react-redux'
import { getAllSongsThunkCreator, getAllSongs } from '../../store/songs'
import { useEffect } from 'react'
import SongCard from './songCard'


function Songs() {
    const dispatch = useDispatch()
    
    useEffect(()=> {
        dispatch(getAllSongsThunkCreator())
    }, [dispatch])
    
    const songs = useSelector(getAllSongs)
    
    
    return (
        <div>
            <ul>
                {songs.map(song =>(
                    <SongCard  key={song.id} song={song} formType={'normal'} />
                ))}
            </ul>
        </div>
    )
}

export default Songs