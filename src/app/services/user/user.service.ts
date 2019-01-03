import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleService } from '../article/article.service';
import { User } from '../../api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private articleService: ArticleService) {
  }

  getUserInfo(id: string): Observable<User> {
    console.log('Retrieving user with id: ', id);
    return this.httpClient.get(`/api/v1/users/${id}`) as Observable<User>;
  }
}
