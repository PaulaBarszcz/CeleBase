import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.backgroundImage = `url('${import.meta.env.BASE_URL}images/stagecurtains.jpg')`

    const closeOnOutsideClick = () => setMenuOpen(false)
    window.addEventListener('click', closeOnOutsideClick)
    return () => window.removeEventListener('click', closeOnOutsideClick)
  }, [])

  const toggleMenu = (e) => {
    e.stopPropagation()
    setMenuOpen(prev => !prev)
  }

  return (
    <div className={`divNav${menuOpen ? ' nav-show' : ''}`} onClick={e => e.stopPropagation()}>
      <button className="main-nav-toogle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
        <strong>Pokaż menu</strong>
      </button>
      <nav className="main-nav">
        <ul>
          <li><NavLink to="/" end className={({isActive}) => isActive ? 'active-tab' : ''} onClick={() => setMenuOpen(false)}>HOME</NavLink></li>
          <li><NavLink to="/slider" className={({isActive}) => isActive ? 'active-tab' : ''} onClick={() => setMenuOpen(false)}>SLIDER</NavLink></li>
          <li><NavLink to="/quiz" className={({isActive}) => isActive ? 'active-tab' : ''} onClick={() => setMenuOpen(false)}>QUIZ</NavLink></li>
          <li><NavLink to="/infotable" className={({isActive}) => isActive ? 'active-tab' : ''} onClick={() => setMenuOpen(false)}>INFOTABLE</NavLink></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export { Navigation }
