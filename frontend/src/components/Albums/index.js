import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { NavLink } from "react-router-dom"

import { getAllAlbumsThunkCreator } from "../../store/albums"

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
                <div key={id} className='albums'>
                    <div className="albumImg">
                        <NavLink to={`albums/${id}`}>
                            <img src={imageUrl} alt="" />
                        </NavLink>
                    </div>
                    <div
                    className="albumBanner"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                    >
                        <div className="albumInfo">
                            <p>{title}</p>
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