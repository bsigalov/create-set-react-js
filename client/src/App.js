import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
// import screens:
import HomeScreen from './screens/HomeScreen'
import YourSetsScreen from './screens/YourSetsScreen'
import CreateSetScreen from './screens/CreateSetScreen'

import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path={'/'} element={<HomeScreen />} />
          <Route path={'/yourSets'} element={<YourSetsScreen />} />
          <Route path={'/createSet'} element={<CreateSetScreen />} />
        </Routes>
      </main>
    </>
  )
}

export default App
