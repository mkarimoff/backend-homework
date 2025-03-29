
import {  Route, Routes } from 'react-router-dom'

import App from './App'
import Vegans from './components/vegans'
import Drinks from './components/drinks'
import Foods from './components/food'
import Fruits from './components/fruits'
import Navbar from './navbar'
import Register from './register'
import Login from './login'


const RouterComponent = () => {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/fruits' element={<Fruits/>}/>
        <Route path='/vegans' element={<Vegans/>}/>
        <Route path='/drinks' element={<Drinks/>}/>
        <Route path='/foods' element={<Foods/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}
export default RouterComponent