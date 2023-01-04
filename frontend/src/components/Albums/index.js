import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { NavLink } from "react-router-dom"

import { getAllAlbumsThunkCreator,getAlbumByIdThunkCreator } from "../../store/albums"

import './LandingPageAlbums.css'

function AllAlbums() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllAlbumsThunkCreator())
    }, [dispatch])

    const albums = useSelector(state => Object.values(state.albums.allAlbums))

    return (
      <div className="bodycontainer">
        <div className="minicontainer paddingLeft paddingTop">
          <h1 className="loginTitle">Hatching Albums for your enjoyment: </h1>
          {albums.map(({ title, id, imageUrl }) => (
            <div key={id} className="songs">
              <div className="songsImage">
                <NavLink 
                className="song" 
                onClick={() => dispatch(getAlbumByIdThunkCreator(id))}
                to={`/albums/${id}`}>
                  <img src={imageUrl} alt="" />
                </NavLink>
              </div>
              <div
                className="sound"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="songInfo">
                  <p className="one loginText italic">{title}</p>
                  <p></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default AllAlbums