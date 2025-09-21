import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  // 2. Обработка языка без префиксов в URL
  const cookieLang = req.cookies.get('i18n_lang')?.value || 'ru';
  const pathname = req.nextUrl.pathname;

  // Удаляем языковые префиксы, если они есть (редирект на чистый URL)
  if (['/ru', '/en'].includes(pathname) || pathname.startsWith('/ru/') || pathname.startsWith('/en/')) {
    const newPath = pathname.replace(/^\/(ru|en)/, '') || '/';
    const newUrl = new URL(newPath, req.url);
    
    const response = NextResponse.redirect(newUrl);
    // Обновляем cookie только если язык в URL отличается
    const urlLang = pathname.split('/')[1];
    if (urlLang !== cookieLang) {
      response.cookies.set('i18n_lang', urlLang, {
        path: '/',
        sameSite: 'lax',
        httpOnly: true
      });
    }
    return response;
  }

  // 3. Устанавливаем язык в cookie, если его нет
  if (!req.cookies.has('i18n_lang')) {
    const response = NextResponse.next();
    response.cookies.set('i18n_lang', cookieLang, {
      path: '/',
      sameSite: 'lax',
      httpOnly: true
    });
    return response;
  }

  return NextResponse.next();
});


export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)', // Исключаем файлы и _next
    '/',                            // Главная страница
    '/(api|trpc)(.*)',              // API маршруты
  ],
};
