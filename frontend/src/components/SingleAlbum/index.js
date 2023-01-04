import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"


import SongCard from "../Songs/songCard"

import { getAlbumByIdThunkCreator } from "../../store/albums"

import "./singleAlbum.css"

function SingleAlbum() {
    const dispatch = useDispatch()
    const { Id } = useParams()


    useEffect(() => {
        dispatch(getAlbumByIdThunkCreator(Id))
    },[])

    const user = useSelector(state => state.session.user)
    const album = useSelector(state => state?.albums?.current)
    const songs = album?.Songs
    const audios = songs?.map(song => new Audio(song?.url))

    let current = 0
    audios?.forEach(audio => {
        audio.oneded = onended
    })

    function onended(e) {
        current = (current + 1) % audios.length
        audios[current].play()
    }

    return (
      <div className="bodycontainer">
        <div className="minicontainer flexstart">
          <div className="singlePage">
            <div className="borderBkimage">
              <div
                className="singleBkImage"
                style={{
                  backgroundImage: `url(${album.imageUrl})`,
                }}
              >
                <div className="singleImage">
                  <img src={album?.imageUrl} alt="" />
                </div>
                <div className="singlePlayDescription">
                    {/* <button 
                    onClick={() => audios[0].play.bind(audios[0])}
                    >
                        Play
                    </button> */}
                  <div className="singleDescriptionSong">
                    <p className="one bold">{album?.title}</p>
                    <p className="two italic">{album?.User?.username}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="allSongs">
              <h1 className="loginTitle">
                All Songs in {album?.title?.toUpperCase()}:
              </h1>
              {songs?.map((song) => (
                <SongCard key={song.id} user={user} song={song} formType="loginpage" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}

export default SingleAlbum