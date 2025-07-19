import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environment/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${environment.TMDB_API_KEY}`
    }
  });

  return next(clonedRequest);
};
