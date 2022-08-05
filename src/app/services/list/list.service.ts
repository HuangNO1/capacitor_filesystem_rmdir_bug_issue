import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { App } from '@capacitor/app';

const IMAGE_DIR = 'stored-images';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private platform: Platform;

  constructor(
    platform: Platform,
  ) {
    this.platform = platform;
  }


  async removeAll() {
    // 刪除圖片保存資料夾
    try {
      await Filesystem.rmdir({
        directory: Directory.Documents,
        path: IMAGE_DIR,
        recursive: true,
      });
    } catch (err) {
      console.log('rmdir error: ', err);
    }

    // 初始化資料夾
    try {
      await Filesystem.mkdir({
        directory: Directory.Documents,
        path: IMAGE_DIR,
      });
    } catch(err) {
      console.log('mkdir err: ', err)
    }
  }

  async saveImage(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Documents,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
    });

    console.log('saved: ', savedFile);
    return {
      path: `${IMAGE_DIR}/${fileName}`,
      fileName: fileName,
      data: `${base64Data}`,
    };
  }

  async deleteImage(file) {
    try {
      await Filesystem.deleteFile({
        directory: Directory.Documents,
        path: file.path,
      });
    } catch (err) {
      console.log(err);
    }
  }

  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      console.log('is hybrid');
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path,
      });
      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}
