import React,{ useState, type ChangeEvent } from "react";
import {useDispatch, useSelector} from 'react-redux'
import type { AppDispatch, RootState } from "@/store/store";
import { loginUser,getCurrentUser } from "@/services/authService";
import { setCredentials, startAuth,authFailed } from "@/store/slices/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {toast} from "sonner"

const Login:React.FC = ()=>{
    const [email,setemail]= useState<string>("")
    const [password,setpassword]= useState<string>("")
    const dispatch = useDispatch<AppDispatch>()
    const {loading} = useSelector((state:RootState)=>state.auth)  

    const handleLogin = async ()=>{
        try {
            if ( !email || !password) {
                toast.error("All fields are required");
                return;
              }
              dispatch(startAuth())
            await loginUser({email,password})
                const res = await getCurrentUser()
                dispatch(setCredentials({user:res.data}))
            
            
        } catch (error ) {
            dispatch(authFailed("login failed"))
                       toast.error("Something went wrong during login")
                       console.log("login failed",error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-400">
           <Card className="w-full max-w-screen shadow-md">
               <CardHeader>
                <CardTitle className="text-center text-xl font-semibold">Login</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
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
                     <Button className="w-full" onClick={handleLogin} disabled={loading}>
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

export default Login