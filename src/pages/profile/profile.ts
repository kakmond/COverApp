import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Profile } from "../../models/profile"
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database'
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile = {} as Profile;
  loading;

  constructor(public loadingCtrl: LoadingController, private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, private toast: ToastController
    , public userservice: UserProvider,
    private afDatabase: AngularFireDatabase) {
  }
  presentLoadingText() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading Please Wait...'
    });
    this.loading.present();
  }



  ionViewDidLoad() {
    this.update();
    console.log('ionViewDidLoad ProfilePage');
  }
  update() {
    this.profile = this.userservice.my_profile;
  }

  profilesettings() {
    this.navCtrl.push('ChangeprofilePage');
  }
}
