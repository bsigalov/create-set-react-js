import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
// import screens:
import HomeScreen from './screens/HomeScreen'
import MySetsScreen from './screens/MySetsScreen'
import ChooseShirtScreen from './screens/ChooseShirtScreen'
import ChoosePantsScreen from './screens/ChoosePantsScreen'
import ChooseShoesScreen from './screens/ChooseShoesScreen'

import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path={'/'} element={<HomeScreen />} />
          <Route path={'/mySets'} element={<MySetsScreen />} />
          <Route path={'/createSet/shirt'} element={<ChooseShirtScreen />} />
          <Route path={'/createSet/pants'} element={<ChoosePantsScreen />} />
          <Route path={'/createSet/shoes'} element={<ChooseShoesScreen />} />
        </Routes>
      </main>
    </>
  )
}

export default App
