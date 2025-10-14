import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import type React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {z} from 'zod'
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";


const ContactSchema = z.object({
    FullName:z.string().min(3,'Name must be at least 3 characters'),
    PhoneNumber:z.string().min(10,'Invalid Phone Number'),
    Email:z.email("Invalid email"),
    Message:z.string().min(10,'Message is too short')
    
})

type ContactForm = z.infer<typeof ContactSchema>



const Contact: React.FC = () =>{
    const navigate = useNavigate()
         
     const { 
        register,
        handleSubmit,
        formState:{errors}
     }= useForm<ContactForm>({
        resolver:zodResolver(ContactSchema)
     })

    const onSubmit = ()=>{
        toast.success("Message Submitted Successfully!")
       setTimeout(() => {
           navigate('/')
       }, 1000);
    }

    return(
       <div className=" min-h-screen flex flex-col md:flex-row">
        <div className="w-full  md:w-1/2 flex flex-col justify-center items-start p-10 md:p-16 text-white bg-gray-700">
         <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
         <p className="text-lg md:text-xl text-blue-100 mb-4 leading-relaxed">
             We’d love to hear from you! Whether you have a question, feedback, or a business inquiry — feel free to reach out.
        </p>
        <p className="text-sm text-blue-200">We usually reply within 24 hours.</p>
        </div>
       <div className=" w-full md:w-1/2 flex justify-center items-center p-8 md:16">
       <Card className="w-full max-w-md shadow-md ">
        <CardContent className="p-6 space-y-4">
            <h2 >
             Get in Touch
            </h2>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="mb-2" htmlFor="FullName">Full Name</Label>
            <Input type="text" id="FullName" {...register('FullName')}/>
            {errors.FullName&& (
                <p className="text-red-500 text-sm mt-1">{errors.FullName.message}</p>
            )}
          </div>
          <div>
            <Label className="mb-2" htmlFor="PhoneNumber">Phone Number</Label>
            <Input type="tel" id="PhoneNumber" {...register('PhoneNumber')}/>
            {errors.PhoneNumber&& (
                <p className="text-red-500 text-sm mt-1">{errors.PhoneNumber.message}</p>
            )}
          </div>
          <div>
            <Label className="mb-2" htmlFor="Email">Email</Label>
            <Input type="Email" id="Email" {...register('Email')}/>
            {errors.Email&& (
                <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
            )}
          </div>
          <div className="mt-6">
            <Textarea   placeholder="Type your message here..." {...register('Message')}/>
            {errors.Message&& (
                <p className="text-red-500 text-sm mt-1">{errors.Message.message}</p>
            )}
          </div>
          <Button  type="submit">
            Submit
          </Button>

        </form>
        </CardContent>
       </Card>
       </div>
       </div>

    )
}


export default Contact
