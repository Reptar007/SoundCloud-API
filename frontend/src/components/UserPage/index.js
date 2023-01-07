import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getAllSongs} from '../../store/songs'
import { getAllAlbumsThunkCreator, getAllAlbums } from '../../store/albums'

import SongCard from '../Songs/songCard'
import AlbumCard from './albumcard'

import './UserPage.css'

function UserPage ({ user }){

  const [page, setPage] = useState(1);
  const dispatch = useDispatch()
   
    const songs = useSelector(getAllSongs)
    const userSongs = songs.filter(song => {
        return song.userId === user.id
    })

    const albums = useSelector(getAllAlbums)
    const userAlbums = albums.filter(album => album.userId === user.id)

    useEffect(()=> {
      dispatch(getAllAlbumsThunkCreator())
    },[dispatch])

    let content;

    switch(page) {
      case 1:
          content = (
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
          );
        break
      case 2:
        content = (
          <div className='profilesongCard'>
            {userAlbums.map((album) => (
              <AlbumCard 
                key={album.id}
                album={album}
                user={user}
              />
            ))}
          </div>
        )
        break
      default:
        return null
    }
    
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
              <h4
              onClick={e => setPage(1)}
              >Songs</h4>
              <h4
              onClick={() => setPage(2)}
              >Albums</h4>
            </div>
            <div className="profileSongs">
              <h2>Recent Hatchings</h2>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
}

export default UserPage