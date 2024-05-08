import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { getLocal } from '../Contexts/auth'
import logoImage from "../../images/logo.png"
import { RiStethoscopeFill } from 'react-icons/ri';
import { BsFillChatRightTextFill } from 'react-icons/bs';
import { BsPeopleFill } from 'react-icons/bs';


 
export default function NavbarComponent() {
  const [openNav, setOpenNav] = useState(false);


  const localResponse = getLocal('authToken');

  const history = useNavigate()

  const handleclick=()=>{
    localStorage.removeItem('authToken');
    history('/login')
  }

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);
 
  const navList = (
    <ul className="bg-nav mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6  text-black  text-bold " >
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
       <Link to='/doctorsListhome/'> <a href="#" className="flex items-center  hover:text-blue-500 ">
       <RiStethoscopeFill className="text-xl me-1 flex items-center font-extrabold"/> Doctors
        </a></Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to='/blogs'><a href="#" className="flex items-center  hover:text-blue-500">
         <BsFillChatRightTextFill className="text-lg me-1 flex items-center mt-1"/> Blogs
        </a></Link>
      </Typography>
      <Link to='/chat'><Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center  hover:text-blue-500">
          <BsPeopleFill className="text-lg me-1 flex items-center "/>Communities
        </a>
      </Typography></Link>
    </ul>
  );
 
  return (
    <>
    <Navbar className="sticky bg-nav  lg:px-8 lg:py-4  top-0 z-50 ">
      <Toaster position='top-center' reverseOrder='false' limit={1} ></Toaster>
        <div className="bg-nav  mx-auto  flex items-center justify-between text-blue-gray-900 text-black">
        <Link to="/">
        <div className="flex items-center">
          <img src={logoImage} alt="Logo" className="mr-2 h-6 w-6" /> 
          <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-medium">
            Heal Together
          </Typography>
        </div>
      </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex gap-3 justify-end">
        <Link to="/login"><Button variant="gradient" size="sm" className="hidden lg:inline-block  hover:bg-blue-500">
          {localResponse?(<span className=" text-black ">Dashboard</span>):
          (<span className=" text-black ">Login</span>)}
        </Button></Link>
        {localResponse &&
        <>
        <Button variant="gradient" size="sm" className=" text-black hover:bg-blue-500 "onClick={()=>handleclick()}>
          Logout
        </Button>
        <Link to="/userprofile"><Button variant="gradient" size="sm" className=" text-black hover:bg-blue-500 ">
        Profile
      </Button></Link></>
        }
         
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (-
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto ">
          {navList}
          
          <Link to="/login"><Button variant="gradient" size="sm" fullWidth className="mb-2  ">
            <span className=" text-black ">Login</span>
          </Button></Link>
        </div>
      </MobileNav>
    </Navbar>
    </>
  );
}