import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header'
import LogInModal from '../components/LogInModal'
import SignUpModal from '../components/SignUpModal'
import LogOutModal from '../components/LogOutModal'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
  const [isLogInOpen, setIsLogInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isLogOutOpen, setIsLogOutOpen] = useState(false)

  return (
    <>
      <Header
        setIsLogInOpen={setIsLogInOpen}
        setIsSignUpOpen={setIsSignUpOpen}
        setIsLogOutOpen={setIsLogOutOpen}
      />
      <Toaster />
      <Outlet />
      {isLogInOpen && <LogInModal setIsLogInOpen={setIsLogInOpen} />}
      {isSignUpOpen && <SignUpModal setIsSignUpOpen={setIsSignUpOpen} />}
      {isLogOutOpen && <LogOutModal setIsLogOutOpen={setIsLogOutOpen} />}
    </>
  )
}
