import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {urls} from '../../../constants/http.constants';
import {UserInfo} from '../../../dto/user-info/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<UserInfo> {
    return this.http.get(urls.userInfo);
  }
}
