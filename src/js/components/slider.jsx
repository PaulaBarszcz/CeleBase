import { useState } from 'react'
import actors from '../data/actors.js'

function Slider() {
  const [currentId, setCurrentId] = useState(() => Math.floor(Math.random() * actors.length))
  const [imgLoaded, setImgLoaded] = useState(false)

  const actor = actors[currentId]

  const prev = () => {
    setImgLoaded(false)
    setCurrentId(id => (id === 0 ? actors.length - 1 : id - 1))
  }

  const next = () => {
    setImgLoaded(false)
    setCurrentId(id => (id === actors.length - 1 ? 0 : id + 1))
  }

  return (
    <div className="container">
      <div className="main-slider" id="mainSlider">
        <button className="main-slider-prev" onClick={prev}>
          <span>Poprzedni slajd</span>
          <i className="fa fa-angle-left" aria-hidden="true"></i>
        </button>
        <button className="main-slider-next" onClick={next}>
          <span>Następny slajd</span>
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </button>
        <div className="main-slider-slides-cnt">
          <div className="main-slide active">
            {!imgLoaded && <img src="images/spinner.gif" alt="loading" />}
            <img
              className="main-slide-image"
              src={actor.photo}
              alt={`${actor.name} ${actor.surname}`}
              style={imgLoaded ? {} : { display: 'none' }}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
            />
            <div className="main-slide-text">
              {actor.name} {actor.surname}, {actor.nationality}<br />
              <a href={actor.imdb} target="_blank" rel="noreferrer">IMDB</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Slider }
