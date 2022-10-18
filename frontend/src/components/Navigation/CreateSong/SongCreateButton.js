import {NavLink} from 'react-router-dom'
import './CreateSongButton.css'


function SongCreateButton({user}) {
    return (
      <div className='CreateSong'>
          <NavLink className='navlink' to='/songs/new' exact>Create A Song</NavLink>
      </div>
    );
}

export default SongCreateButton
