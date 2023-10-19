import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header'
import LogInModal from '../components/LogInModal'
import SignUpModal from '../components/SignUpModal'

export default function Layout() {
  const [isLogInOpen, setIsLogInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  return (
    <>
      <Header
        setIsLogInOpen={setIsLogInOpen}
        setIsSignUpOpen={setIsSignUpOpen}
      />
      <Outlet />
      {isLogInOpen && <LogInModal setIsLogInOpen={setIsLogInOpen} />}
      {isSignUpOpen && <SignUpModal setIsSignUpOpen={setIsSignUpOpen} />}
    </>
  )
}
