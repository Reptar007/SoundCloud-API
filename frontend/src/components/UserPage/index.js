import { useSelector } from 'react-redux'
import { getAllSongs} from '../../store/songs'
import SongCard from '../Songs/songCard'
import './UserPage.css'

function UserPage ({ user }){
   
    const songs = useSelector(getAllSongs)
    const userSongs = songs.filter(song => {
        return song.userId === user.id
    })
    
    return (
      <div className="bodycontainer">
        <div className="minicontainer flexstart" >
          <div className="profileBanner">
            <div className="profileBkImg">
              <div className="profileImage"></div>
              <div className="profileDescription">
                <p className="one">
                  {user.firstName} {user.lastName}
                </p>
                <p className="two">{user.username}</p>
              </div>
            </div>
          </div>
          <div className="profileBody">
            <div className="profileNavBar">
              <h4>Songs</h4>
            </div>
            <div className="profileSongs">
              <h2>Recent Hatchings</h2>
              <div className="profilesongCard">
                {userSongs.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    user={user}
                    formType={"profile"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default UserPage