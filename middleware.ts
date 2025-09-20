import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const request = req; // Переименовываем для consistency
  
  // 1. Пропускаем статические файлы и API routes для Clerk
  if (req.nextUrl.pathname.includes('.') || 
      req.nextUrl.pathname.startsWith('/api/') ||
      req.nextUrl.pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }

  // 2. Получаем язык из cookie или устанавливаем по умолчанию
  const cookieLang = req.cookies.get('i18n_lang')?.value || 'ru';
  const pathname = req.nextUrl.pathname;

  // 3. Обработка языковых префиксов - только если это не редирект от Clerk
  if (['/ru', '/en'].includes(pathname) || 
      pathname.startsWith('/ru/') || 
      pathname.startsWith('/en/')) {
    
    const urlLang = pathname.split('/')[1];
    const newPath = pathname.replace(/^\/(ru|en)/, '') || '/';
    
    // Создаем response
    const response = NextResponse.redirect(new URL(newPath, req.url));
    
    // Обновляем cookie только если язык изменился
    if (urlLang !== cookieLang) {
      response.cookies.set('i18n_lang', urlLang, {
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 // 1 год
      });
    }
    return response;
  }

  // 4. Устанавливаем язык в cookie если его нет
  if (!req.cookies.has('i18n_lang')) {
    const response = NextResponse.next();
    response.cookies.set('i18n_lang', cookieLang, {
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60
    });
    return response;
  }

  return NextResponse.next();
});


export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
