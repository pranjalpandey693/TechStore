
import type { AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import { loginUser } from '@/redux/slices/authSlice'
import { Card, CardContent, CardHeader,CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'

const loginSchema = z.object({
    email:z.email("Invalid email"),
    password:z.string().min(4,'Password must be at least 4 characters')
})

type LoginForm = z.infer<typeof loginSchema>

const Login: React.FC = ()=>{
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || '/'
    const {isLoggingIn} = useSelector((state:RootState)=>state.auth)
     const {
        register,
        handleSubmit,
      formState:{errors},
     }= useForm<LoginForm>({
        resolver:zodResolver(loginSchema),
     })
     
     const onSubmit = async (data:LoginForm)=>{
        try {
       await dispatch(loginUser(data)).unwrap()
       navigate(from)
                    
        } catch (error) {
            
        }
     }
    const handleTechStore =()=>{navigate('/') }
    const handleRegister =()=>{navigate('/auth/register') }
     
     return( 

        <div className='  flex flex-col items-center justify-center min-h-screen   '>
               <button onClick={handleTechStore}className='text-3xl font-bold mb-3 text-blue-600' >TechStore</button> 
            <Card className='w-full max-w-md shadow-lg bg-gray-50 '>
                <CardHeader>
                    <CardTitle className='text-left text-2xl'>
                        Login 
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <div>
                          <Label className='mb-2' htmlFor='email'>Email</Label>
                          <Input type='email' id='email' {...register('email')}/>
                         {errors.email && (
                            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                         )}
                        </div>

                        <div>
                             <Label className='mb-2' htmlFor='password'>Password</Label>
                          <Input type='password' id='password' {...register('password')}/>
                         {errors.password && (
                            <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
                         )}
                        </div>

                        <Button type='submit' disabled={isLoggingIn} className='w-full '>{isLoggingIn?'Loggin in ...':'Login'}</Button>
                        <p className='text-center text-sm'>or</p>
                        <Button variant={'secondary'} className='w-full'  onClick={handleRegister}>Create Account</Button>
                    </form>
                </CardContent>

            </Card>

        </div>

     )
    }

    export default Login