import { useState, useMemo } from 'react'
import actors from '../data/actors.js'

const PAGE_SIZE = 15
const COLUMNS = ['name', 'surname', 'gender', 'nationality']

function InfoTable() {
  const [sortCol, setSortCol] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(0)

  const sorted = useMemo(() => {
    return [...actors].sort((a, b) => {
      const av = a[sortCol]?.toLowerCase() ?? ''
      const bv = b[sortCol]?.toLowerCase() ?? ''
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    })
  }, [sortCol, sortDir])

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const pageData = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const handleSort = (col) => {
    if (col === sortCol) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortCol(col)
      setSortDir('asc')
    }
    setPage(0)
  }

  const arrow = (col) => {
    if (col !== sortCol) return ' ↕'
    return sortDir === 'asc' ? ' ↑' : ' ↓'
  }

  return (
    <div className="infotable" id="infotable">
      <div className="container">
        <div className="tableBcg">
          <p className="sortInfo">Click on the name of the column to sort infotable by it. Click it again for reverse order.</p>
          <div className="containsTable">
            <table className="table dataTable">
              <thead>
                <tr>
                  {COLUMNS.map(col => (
                    <th key={col} onClick={() => handleSort(col)} style={{ cursor: 'pointer' }}>
                      {col.charAt(0).toUpperCase() + col.slice(1)}{arrow(col)}
                    </th>
                  ))}
                  <th>IMDB</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map(actor => (
                  <tr key={actor.id}>
                    <td>{actor.name}</td>
                    <td>{actor.surname}</td>
                    <td>{actor.gender}</td>
                    <td>{actor.nationality}</td>
                    <td><a href={actor.imdb} target="_blank" rel="noreferrer">Visit at IMDB &gt;</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={page === i ? 'active' : ''}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { InfoTable }
