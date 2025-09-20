"use client";

import { useCreateChallengeModal } from "@/store/use-create-challenge-modal";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios"
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { FileUpload } from "../file-upload";

export const CreateChallengeModal = () => {
    const {isOpen, close} = useCreateChallengeModal();

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
            await axios.post("/api/challenges", values)
            
            form.reset();
        }catch(error){
            console.log(error);
        }
    }

    const isLoading = form.formState.isSubmitting;

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="bg-slate-100">
            <DialogHeader>
                <DialogTitle className="font-bold text-2xl">
                    New challenge
                </DialogTitle>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-row items-center w-full p-4 space-x-10">
                
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
            </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}