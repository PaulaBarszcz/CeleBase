import { Routes, Route } from 'react-router-dom'
import { Navigation } from './navigation.jsx'
import { Home } from './home.jsx'
import { Slider } from './slider.jsx'
import { Quiz } from './quiz.jsx'
import { InfoTable } from './infotable.jsx'
import { NotFound } from './notFound.jsx'

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="slider" element={<Slider />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="infotable" element={<InfoTable />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export { Routing }
