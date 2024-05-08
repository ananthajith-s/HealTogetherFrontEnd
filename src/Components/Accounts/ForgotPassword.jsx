import React,{useContext,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast,Toaster,} from "react-hot-toast";
import axios from 'axios';



const ForgetPassword = () => {
    const [email,setEmail] = useState("")
    

    const navigate = useNavigate("")

    const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/forgot_password/', {
      email: email,
    }).then((res) => {
        // Convert the response object to a string
        const dataString = JSON.stringify(res.data); 
        console.log(dataString)
       // Store the data in the local storage with a specific key
        localStorage.setItem('response', dataString);
        toast.success('Check Email for Reseting password');
      })
      .catch((error) => {
        toast.error('Email not existing');
        console.log(error);
      });
  }
    
    return (
        <div className="relative flex flex-row  min-h-screen bg-no-repeat bg-cover justify-end overflow-hidden bg-[url('images/login.jpg')] " >
        <Toaster position='top-center' reverseOrder='false'  ></Toaster>
         <h1 className='ps-6 pt-4 text-xl font-bold' >Heal Together</h1>
         <div className="w-1/2 p-6 m-auto rounded-md shadow-md lg:max-w-xl  border border-purple-300">
                <h1 className="text-3xl font-semibold text-center text-purple-700 ">
                   Forget Password
                </h1>
                
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email" name='username' onChange={e=>setEmail(e.target.value)}
                            className=" w-5/6 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <button className="w-5/6 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" type='submit'>
                            Submit
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                 Go to login?{" "}
                    <Link to="/login"><button className=" font-medium text-white-600 hover:underline" >Login</button></Link>
                </p>
            </div>
            <div className="w-1/2"></div>
        </div>
    );
}

export default ForgetPassword