'use client';

import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/translations/client/LanguageContext";


export default function Home() {

  const { translations } = useLanguage();
    
  //if (isLoading) return <div><Loader className="w-5 h-5 text-muted-foreground animate-spin" /></div>;

  return(
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
        <div className="flex flex-col items-center">
          <Image src="/welcome_page.svg" alt="Welcome" height={765} width={510} />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-500 lg:max-w-[700px] max-w-[480px] text-center mb-8">
          {translations.Marketing.welcome}
          </h1>
          <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
              <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton mode="modal" signInForceRedirectUrl="/learn" signInFallbackRedirectUrl="/learn">
                <Button size="lg" variant="secondary" className="w-full">
                  {translations.Marketing.start}
                </Button>
              </SignUpButton>
              <SignInButton mode="modal" signUpForceRedirectUrl="/learn" signUpFallbackRedirectUrl="/learn">
                <Button size="lg" variant="primaryOutline" className="w-full">                  
                  {translations.Marketing.already}
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/learn">
                  {translations.Marketing.continue}
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
        </div>
    </div>

  )
}
 