"use client";

import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export const ButtonToTop = () => {
    const isBrowser = () => typeof window !== 'undefined';

    const scrollToTop = () => {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <Button 
            variant="primaryOutline" 
            size="sm"
            className="fixed right-1/3 bottom-0 w-12 h-12 p-2 mb-10 border-2 border-neutral-300 hidden"
            onClick={scrollToTop}
        >
            <ArrowUp/>
        </Button>
    )
}