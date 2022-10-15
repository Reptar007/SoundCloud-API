import {NavLink} from 'react-router-dom'

function SongCreateButton({user}) {
    return (
      <button>
        <NavLink to='/songs/new' exact>Create A Song</NavLink>
      </button>
    );
}

export default SongCreateButton
