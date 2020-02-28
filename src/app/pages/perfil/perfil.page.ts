import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ActionSheetController } from '@ionic/angular';

import { BASE_URL } from '../../../environments/environment.mobile';

import { Camera, PictureSourceType, CameraOptions } from '@ionic-native/camera/ngx';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  readonly BASE_URL = BASE_URL;

  public isExpandedName: boolean = false;
  public isExpandedSenha: boolean = false;
  public arrowImgName: string = 'ios-arrow-forward';
  public arrowImgSenha: string = 'ios-arrow-forward';

  constructor(
    private camera: Camera,
    private navCtrl: NavController,
    public userService: UserService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
  ) {

  }

  ngOnInit() {

  }

  public logout() {
    this.navCtrl.navigateBack('login');
    this.userService.user = null;
  }

  public extendColName() {
    this.isExpandedName = !this.isExpandedName;
    this.isExpandedName? this.arrowImgName = 'ios-arrow-down' : this.arrowImgName = 'ios-arrow-forward';
  }

  public extendColSenha() {
    this.isExpandedSenha = !this.isExpandedSenha;
    this.isExpandedSenha? this.arrowImgSenha = 'ios-arrow-down' : this.arrowImgSenha = 'ios-arrow-forward';
  }

  public selectPerfilImg() {
    this.actionSheetCtrl.create({
      header: 'Selecione a fonte da imagem',
      mode: 'ios',
      buttons: [
        {
          text: 'Carregar da galeria',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar a camêra',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    }).then((action) => action.present());
  }

  private takePicture(sourceType: PictureSourceType) {
    const CAMERA_OPTIONS: CameraOptions = {
      sourceType,
      quality: 100,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
    }

    this.camera.getPicture(CAMERA_OPTIONS).then(async (imagePath) => {
      await this.showLoading();
      this.userService.uploadImg(imagePath, 'imgPerfil', this.userService.user.idcliente).subscribe((res) => {
        const tempResponse = JSON.parse(res.response);
        this.userService.user.imgperfil = tempResponse.filename;
        this.cloaseLoading();
      }, (error) => {
        this.cloaseLoading();
        console.error(error);
      });
    });
  }

  private async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Enviando...',
      mode: 'md',
    });
    await loading.present();
  }

  private async cloaseLoading() {
    await this.loadingCtrl.dismiss();
  }

}
