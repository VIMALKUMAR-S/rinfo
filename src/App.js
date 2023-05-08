import React from 'react'
import Login from './Login'
import { Routes, Route } from 'react-router-dom';
import Admin from './Admin';
import { RecoilRoot } from 'recoil';
import AdminPanel from './AdminPannel';


const App = () => {
  return (
    <>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Routes>
      </RecoilRoot>
    </>
  )
}

export default App
