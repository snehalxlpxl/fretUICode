
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerServiceService } from 'app/spinner/spinner-service.service';
import { error } from 'console';
import { tap } from 'rxjs/internal/operators/tap';
// import { tap } from 'rxjs/operators';

@Injectable()
export class SpinnerIntercepter implements HttpInterceptor {
    constructor(private spinnerservice:SpinnerServiceService){}
    intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        this.spinnerservice.requestStarted();
        // return next.handle(request);
        return this.hadler(next,request);
    }

    hadler(next,request){
        return next.handle(request)
            .pipe(
                tap(
                    (event)=>{
                        if(event instanceof HttpResponse){
                            this.spinnerservice.requestEnded();
                        }
                    },
                    (error:HttpErrorResponse)=>{
                        this.spinnerservice.resetSpinner();

                        throw error;
                    }
                )
            )
    }
}

// function tap(arg0: (event: any) => void, arg1: (error: HttpErrorResponse) => never): any {
//     throw new Error('Function not implemented.');
// }
