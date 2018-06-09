import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../../models/Person';
import { AuthServiceProvider } from '../auth-service/auth-service';

@Injectable()
export class InviteServiceProvider {

  constructor(public http: HttpClient, public authService: AuthServiceProvider) {}

  public createInvite(newInvite) {
    const userId = this.authService.getUserId();
    return this.http.post<Person[]>('neaUsers/' + userId + '/invites', newInvite);
  }

  public getInvites() {
    const userId = this.authService.getUserId();
    return this.http.get<Person[]>('neaUsers/' + userId + '/invites');
  }

  public editInvite(editedInvite) {
    const userId = this.authService.getUserId();
    const inviteId = editedInvite.id;
    return this.http.patch<Person[]>('neaUsers/' + userId + 'invites/' + inviteId, editedInvite);
  }

}