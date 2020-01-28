import { EggFile } from 'egg-multipart';
import size = require('image-size');

interface ImageInfo {
  width: number;
  height: number;
  orientation?: number;
  type?: string;
}

export function getImageInfo(file: EggFile): Promise<ImageInfo> {
  return new Promise((resolve, reject) => {
    size.imageSize(file.filepath, (err, info) => {
      if (err) {
        reject(err);
      }
      resolve(info as ImageInfo);
    });
  });
}
