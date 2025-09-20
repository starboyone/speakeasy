'use client';

import { Button } from "@/components/ui/button"
import Image from "next/image"

export const Footer = () => {

    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-sm">Alex Triputin, DonSTU, 2025. All rights reserved</p>
            </div>
        </footer>
    )
}