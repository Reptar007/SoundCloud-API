
const SongCard = ({song}) => {
    return (
      <li>
        <h3>{song.title}</h3>
        <button>Update</button>
        <button>Delete</button>
      </li>
    );
}

export default SongCard