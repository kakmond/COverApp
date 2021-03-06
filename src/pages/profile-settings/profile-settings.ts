import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Profile } from "../../models/profile"
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database'

/**
 * Generated class for the ProfileSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-settings',
  templateUrl: 'profile-settings.html',
})
export class ProfileSettingsPage {

  profile = {} as Profile;

  loading;

  constructor(public loadingCtrl: LoadingController, private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, private toast: ToastController
    , public alertCtrl: AlertController,
    private afDatabase: AngularFireDatabase) {
  }

  presentLoadingText() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading Please Wait...'
    });
    this.loading.present();
  }

  doAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Invalid information',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }


  ionViewDidLoad() {
    this.profile.photo_url = "https://scontent.fbkk1-1.fna.fbcdn.net/v/t1.0-9/16684191_1431759500227788_4523539130141331084_n.jpg?_nc_fx=fbkk1-4&oh=e9445cc665a0345b51693fd953e39699&oe=5ABD0137";
    console.log('ionViewDidLoad ProfileSettingsPage');
  }

  editimage() {

  }

  async update() {
    if (!this.profile.user_name) {
      this.doAlert("Username must not be empty :)");
    }
    else if (!this.profile.first_name) {
      this.doAlert("First name must not be empty :)");
    }
    else if (!this.profile.last_name) {
      this.doAlert("Last name must not be empty :)");
    }
    else if (!this.profile.birth_date) {
      this.doAlert("Birth date must not be empty :)");
    }
    else if (!this.profile.mobile_number) {
      this.doAlert("Mobile number must not be empty :)");
    }
    else {
      if (this.profile) {
        let temp_username = this.profile.user_name;
        //this.afDatabase.object(`profile/`).valueChanges().subscribe(value =>{
        // console.log(value);
        //});
        let valid = 1;
        await this.afDatabase.database.ref(`profile/`).once('value').then(function (snapshot) {
          //   for (let user of snapshot) {
          //     var username = user.val();
          //     console.log(username.user_name+ " KUY");
          //     if (username && temp_username == username.user_name) {
          //       this.doAlert("this username has been already used.");
          //       valid = 0;
          //       break;
          //     }
          //   }
          snapshot.forEach(function (userSnapshot) {
            var username = userSnapshot.val();
            console.log(temp_username + "  " + username.user_name);
            if (username.user_name == undefined) {
              //skip
            }
            else if (username.user_name == temp_username) {
              valid = 0;
              return 1;
            }
          });
        })
        //console.log(valid);
        if (valid)
          this.afAuth.authState.subscribe(auth => {
            this.profile.uid = auth.uid;
            this.afDatabase.object(`profile/${auth.uid}`).set(this.profile).then(() => this.navCtrl.setRoot('MainPage'));
          });
        else
          this.doAlert("Username has already been taken.");
      }
    }
  }
}