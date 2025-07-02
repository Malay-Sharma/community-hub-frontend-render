import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <div>
        <ul className='flex items-center justify-center h-32'>
            <Link to='/'><Button>Home</Button></Link>
            <Link to='/explore'><Button>Explore</Button></Link>
            <Link to='/setting'><Button>Setting</Button></Link>
            <Link to='/login'><Button>Login</Button></Link>
        </ul>
    </div>
  )
}

export default Navbar