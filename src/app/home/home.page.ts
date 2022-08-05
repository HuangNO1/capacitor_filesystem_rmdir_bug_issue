import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ListService } from '../services/list/list.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Photo: any[] = [];

  constructor(private listService: ListService) {}

  async selectImage() {
    const img = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    console.log(img);
    if (img) {
      const saved = await this.listService.saveImage(img);
      console.log('saved: ', saved);

      this.Photo.push(saved);
    }
  }

  async deleteImage(index) {
    this.listService.deleteImage(this.Photo[index]);
    this.Photo.splice(index, 1);
  }

  async clear() {
    await this.listService.removeAll();
    this.Photo = [];
  }
}
