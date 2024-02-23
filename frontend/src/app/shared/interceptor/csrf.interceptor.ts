import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

@Injectable()
export class CSRFInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfCookie = getCookie('csrftoken');
    console.log('Current method is ' + req.method + ' url: ' + req.url);
    if (csrfCookie){
      req = req.clone({
        setHeaders: {
          'X-CSRFToken': csrfCookie
        }
      });
    }
    return next.handle(req);
  }

}
