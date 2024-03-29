import {
  Component,
 } from '@angular/core';

import {
  ToastController,
  IonicPage,
  NavController,
  NavParams,
} from 'ionic-angular';

import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { Invite } from '../../models/Invite';
import { Person } from '../../models/Person';
import { InviteServiceProvider } from '../../providers/invite-service/invite-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-invite-friends',
  templateUrl: 'invite-friends.html',
})
export class InviteFriendsPage {

  public minDate: string = moment().format('YYYY-MM-DD');
  public maxDate: string = moment().add(90, 'days').format('YYYY-MM-DD');
  public minTime: string = moment().add(1, 'hour').format('HH:mm');

  // TODO: fissare orario minimo tot minuti più avanti e controllare che non sia passato

  public person: Person = this.navParams.data;
  public toSend: any = {
    sourceUser: this.authService.getUserId(),
    targetUser: this.person.username,
    date: null,
    time: '',
    description: '',
    location: '',
    status: 'pending',
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private inviteService: InviteServiceProvider,
    private authService: AuthServiceProvider,
    private toastCtrl: ToastController,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('en');
  }

  public sendInvitation() {
    console.log(this.toSend);
    if (this.toSend.targetUser) {
      this.inviteService.sendInvite(this.toSend)
        .pipe(take(1))
        .subscribe(() => {
          const success = this.toastFactory(
            'L\'invito è stato inviato.',
          );
          success.present();
          this.navCtrl.setRoot('PeopleListPage');
        }, (err) => {
          const failure = this.toastFactory(
            'Ci sono stati errori nell\'invio del invito.',
          );
          failure.present();
        });
    }
  }

  private toastFactory(message) {
    return this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
  }

}
