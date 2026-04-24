import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="notFound">
      Page not found. Go back to <Link to="/">HOME page</Link>
    </div>
  )
}

export { NotFound }
