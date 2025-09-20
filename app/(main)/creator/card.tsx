"use client";

import { FileUpload } from "@/components/file-upload"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
    id: string
}



export const Card = ({ id }: Props) => {
    const formSchema = z.object({
        imgUrl: z.string().min(1, {
            message: "Card image is required",
        }),
        wordQuestion: z.string().min(1, {
            message: "Word question is required",
        }),
        wordCorrectTranslate: z.string().min(1, {
            message: "Word correct translate is required",
        })
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imgUrl: "",
            wordQuestion: "",
            wordCorrectTranslate: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            console.log(values);
            await axios.post("/api/challenges_create_user", values)
            
            form.reset();
        }catch(error){
            console.log(error);
        }
    }

    const isLoading = form.formState.isSubmitting;

    return (
        <div className="border-2 rounded-xl my-5 bg-slate-50">
            <div className="border-b-2 p-2">
                <div className="flex items-center justify-between w-full">
                    <p className="font-bold ml-2">
                        {id}
                    </p>
                    <Button variant="ghost" size="sm">
                        <Image src="/trash.svg" height={16} width={16} alt="Delete" />
                    </Button>
                </div>
            </div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-row items-center w-full p-4 space-x-4">
                
                    <div className="flex flex-col items-center w-1/2 gap-y-5">
                        <FormField
                            control={form.control}
                            name="wordQuestion"
                            render={({field}) => (
                                <FormItem className="w-full px-2">
                                    <FormControl>
                                        <Input {...field} disabled={isLoading} className="" placeholder="Enter word"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="wordCorrectTranslate"
                            render={({field}) => (
                                <FormItem className="w-full px-2">
                                    <FormControl>
                                        <Input {...field} disabled={isLoading} className="" placeholder="Enter translate"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                <div className="w-1/2 flex items-center justify-center">
                    
                        <FormField
                        control={form.control}
                        name="imgUrl"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <FileUpload endpoint="cardImage" value={field.value} onChange={field.onChange}/>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    
                </div>
                 
                
            </div>
            <div className="flex items-center justify-center w-full p-4">
                <Button disabled={isLoading} variant="primary" size="lg" className="w-1/2">
                    Save
                </Button>
            </div>  
            </form>
            </Form>
        </div>
    )
}