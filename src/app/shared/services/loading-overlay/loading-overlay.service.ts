import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  setLoading(value: boolean) {
    this.loadingSubject.next(value);
  }
}
