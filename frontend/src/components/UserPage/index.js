import { useSelector } from 'react-redux'
import { getAllSongs} from '../../store/songs'
import SongCard from '../Songs/songCard'

function UserPage ({ user }){
   
    const songs = useSelector(getAllSongs)
    const userSongs = songs.filter(song => {
        return song.userId === user.id
    })
    
    return (
        <div>
            <ul>
                {userSongs.map (song => (
                    <SongCard key={song.id} song={song} user={user} formType={'profile'}/>
                ))}
            </ul>
        </div>
    )
}

export default UserPage