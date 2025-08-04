

import { registerUser } from '@/redux/slices/authSlice'
import type { AppDispatch, RootState } from '@/redux/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import {z} from 'zod'
import { Card, CardContent, CardHeader,CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const registerSchema = z.object({
    name:z.string().min(2,'Name is too short'),
     email:z.email("Invalid email"),
    password:z.string().min(6,'Password must be at least 6 characters'),
    confirmPassword:z.string()
})
.refine((data)=> data.password === data.confirmPassword,{
    message:'Password do not match',
    path:['confirmPassword']
})

type RegisterForm = z.infer<typeof registerSchema>

const Register: React.FC = ()=>{
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {isRegistering} = useSelector((state:RootState)=>state.auth)
    const {
        register,
        handleSubmit,
        formState:{errors},
    }=useForm<RegisterForm>({
        resolver:zodResolver(registerSchema)
    })

    const onSubmit = async (data:RegisterForm)=>{
        try {
            const {confirmPassword,...registerationData}=data
            await dispatch(registerUser(registerationData)).unwrap()
        navigate('/auth/login')
        } catch (error) {
            
        }
    }
     
     const handleTechStore =()=>{navigate('/') }
    const handleLogin =()=>{navigate('/auth/login') }

    return(
        <div className=' z-0 flex flex-col items-center justify-center min-h-screen   '>
               <button onClick={handleTechStore} className='text-3xl font-bold mb-3 text-blue-600' >TechStore</button> 
            <Card className='w-full max-w-md shadow-lg '>
                <CardHeader>
                    <CardTitle className='text-left text-2xl'>
                       Register
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <div>
                          <Label className='mb-2' htmlFor='name'>Name</Label>
                          <Input type='name' id='name' {...register('name')}/>
                         {errors.name && (
                            <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
                         )}
                        </div>
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
                        <div>
                             <Label className='mb-2' htmlFor='confirmPassword'>ConfirmPassword</Label>
                          <Input type='confirmPassword' id='confirmPassword' {...register('confirmPassword')}/>
                         {errors.confirmPassword && (
                            <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>
                         )}
                        </div>

                        <Button type='submit' disabled={isRegistering} className='w-full '>{isRegistering?'Registering ...':'Register'}</Button>
                         <p className='text-center text-sm'>or</p>
                        <Button variant={'secondary'} className='w-full'  onClick={handleLogin}>Login</Button>
                    </form>
                </CardContent>

            </Card>

        </div>

    )
}

export default Register