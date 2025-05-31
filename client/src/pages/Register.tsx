import React,{ useState, type ChangeEvent } from "react";
import {useDispatch, useSelector} from 'react-redux'
import type { AppDispatch, RootState } from "@/store/store";
import { registerUser,getCurrentUser } from "@/services/authService";
import { authFailed, setCredentials, startAuth } from "@/store/slices/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {toast} from 'sonner'

const Register:React.FC = ()=>{
    
    const [name,setname]= useState<string>("")
    const [email,setemail]= useState<string>("")
    const [password,setpassword]= useState<string>("")
    const dispatch = useDispatch<AppDispatch>()
    const {loading} = useSelector((state:RootState)=> state.auth)

    const handleRegister = async ()=>{
        try {
            if (!name || !email || !password) {
                toast.error("All fields are required");
                return;
              }
              dispatch(startAuth())
            await registerUser({name,email,password})
                const res = await getCurrentUser()
                dispatch(setCredentials({user:res.data}))
                toast.success("Registration successfull!")
            
            
        } catch (error) {
            dispatch(authFailed("Registration failed"))
            toast.error("Something went wrong during registration")
            console.log("Register failed",error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-400">
           <Card className="w-full max-w-screen shadow-md">
               <CardHeader>
                <CardTitle className="text-center text-xl font-semibold">Register</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                    <Input
                    type="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>setname(e.target.value)}
                    />
                    <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>setemail(e.target.value)}
                    />
                    <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>setpassword(e.target.value)}
                    />
                    <Button className="w-full" onClick={handleRegister} disabled={loading}>
                     {loading?(
                       <span className="flex items-center justify-center gap-2">
                        <span className="loader w-4 h-4 border-white border-t-transparent rounded-full animate-spin"/>
                        Registering...
                       </span>
                     ):(
                        "Register"
                        )}
                    </Button>
               </CardContent>
           </Card>
        </div>
    )
};

export default Register