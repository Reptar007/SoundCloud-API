import { useDispatch, useSelector } from 'react-redux'
import { getAllSongs, getSongsByArtistThunkCreator } from '../../store/songs'
import { useEffect } from 'react'
import SongCard from '../Songs/songCard'

function UserPage ({ user }){
    const dispatch = useDispatch()
  
    useEffect(() => {
        dispatch(getSongsByArtistThunkCreator(user.id))
    }, [user.id, dispatch])

    const songs = useSelector(getAllSongs)


    return (
        <div>
            <ul>
                {songs.map (song => (
                    <SongCard key={song.id} song={song} user={user}formType={'profile'}/>
                ))}
            </ul>
        </div>
    )
}

export default UserPage