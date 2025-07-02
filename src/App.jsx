import React, { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Setting from './pages/Setting'
import Explore from './pages/explore'
import Login from './pages/Login'
import DashboardLayout from './layout/DashboardLayout'
import Profile from './pages/profile'
import Search from './pages/Search'
import Collection from './pages/collection'
import Archieve from './pages/Archieve'
import Messages from './pages/Messages'
import OnboardStep1 from './pages/OnBoard/OnboardStep1'
import OnboardStep2 from './pages/OnBoard/Step2'
import OnboardStep3 from './pages/OnBoard/Step3'
import PostPage from './pages/PostPage'
import ArchievePage from './pages/ArchievePage'
import NotFound from './pages/NotFound'
import ImageUploadForm from './pages/ImageUploadForm'
import StoryPage from './pages/StoryPage'

const App = () => {
  // Simulated authentication state
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // Protect dashboard routes
  // const ProtectedRoute = ({ children }) => {
    // return isLoggedIn ? children : <Navigate to="/login" />;
  // };

  const router = createBrowserRouter(
    createRoutesFromElements(
      // <>
      //   <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      //   <Route
      //     path="/dashboard"
      //     element={
      //       <ProtectedRoute>
      //         <DashboardLayout />
      //       </ProtectedRoute>
      //     }
      //   >
      //     <Route index element={<Home />} />
      //     <Route path="explore" element={<Explore />} />
      //     <Route path="setting" element={<Setting />} />
      //   </Route>
      // </>

      <>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="search" element={<Search />} />
          <Route path="setting" element={<Setting />} />
          <Route path="profile" element={<Profile />} />
          <Route path="image-upload" element={<ImageUploadForm />} />
          <Route path="collection" element={<Collection />} />
          <Route path="archieve" element={<Archieve />} />
          <Route path="messages" element={<Messages />} />
          <Route path="story" element={<StoryPage />} />

          <Route path="search/:id" element={<PostPage />} />
          <Route path="archieve/post/:id" element={<ArchievePage />} />
        </Route>

          {/* // Inside your routes: */}
          <Route path="/onboard">
            <Route path="step1" element={<OnboardStep1 />} />
            <Route path="step2" element={<OnboardStep2 />} />
            <Route path="step3" element={<OnboardStep3 />} />
          </Route>
        


          <Route path="*" element={<NotFound />} />

      </>
    )
  );

  return <RouterProvider router={router} />
}

export default App
