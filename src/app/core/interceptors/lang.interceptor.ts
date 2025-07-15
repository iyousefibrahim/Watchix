import { HttpInterceptorFn } from '@angular/common/http';

export const langInterceptor: HttpInterceptorFn = (req, next) => {
  const lang = localStorage.getItem('lang') || 'en-US';

  const updatedParams = req.params.set('language', lang);

  const clonedRequest = req.clone({
    params: updatedParams
  });

  return next(clonedRequest);
};