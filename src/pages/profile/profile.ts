import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Person } from '../../models/Person';
import { UserServiceProvider } from '../../providers/user-service/user-service';

import moment from 'moment';
import { take } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public loadingData: boolean = true;
  public toUpdate: Person = {
    userId: '',
    name: '',
    surname: '',
    birthday: '',
    sex: '',
    city: '',
    favFood: '',
    interests: '',
    avatar: '',
  };
  public minDate: string = moment().format('YYYY-MM-DD');
  public maxDate: string = moment().add(90, 'days').format('YYYY-MM-DD');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserServiceProvider,
    private alertCtrl: AlertController,
  ) {}

  public ionViewDidLoad() {
    this.userService.getProfile()
      .pipe(take(1))
      .subscribe((data) => {
        this.toUpdate = data;
      },         () => {
      },         () => {
        this.loadingData = false;
      });
  }

  public editProfile() {
    this.userService.editProfile(this.toUpdate)
      .pipe(take(1))
      .subscribe(() => {
        const success = this.alertFactory(
          'Aggiornato',
          'Il tuo profilo è stato aggiornato con successo',
        );
        success.present();
      },         () => {
        const failure = this.alertFactory(
          'Errore',
          'Ci sono stati errori nell\'aggiornamento del tuo profilo',
        );
        failure.present();
      });
  }

  private alertFactory(title, message) {
    return this.alertCtrl.create({
      title,
      buttons: ['OK'],
      subTitle: message,
    });
  }
}
