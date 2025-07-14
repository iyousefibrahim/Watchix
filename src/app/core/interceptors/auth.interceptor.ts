import { HttpInterceptorFn } from '@angular/common/http';
import { apiKey } from '../../environment/apiKey';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${apiKey}`
    }
  });

  return next(clonedRequest);
};
