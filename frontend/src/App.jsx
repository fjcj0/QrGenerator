import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDashboardLayout from './layouts/UserDashboardLayout';
import HomeLayout from './layouts/HomeLayout';
const App = () => {
  return (
    <Routes>
      {/*Dashboard User Layout*/}
      <Route path='/dashboard' element={<UserDashboardLayout />}>

      </Route>
      {/**/}

      {/*HomeLayout*/}
      <Route path='/' element={<HomeLayout />}>

      </Route>
      {/**/}
    </Routes>
  );
}
export default App;