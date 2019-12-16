import { Service } from "egg";
import { EggFile } from "egg-multipart";
import { formatTimeByFormater, now } from "../utils/date";
import path = require("path");
import fs = require("fs");
import { getImageInfo } from "../utils/image";

interface UploadImageProps {
  url: string;
  width: number;
  height: number;
}

class UploadService extends Service {
  public async uploadFilesToQiniu(files: EggFile[]) {
    const result: UploadImageProps[] = [];

    for (let file of files) {
      const name = this.relativeFilePath(file);
      const imageInfo = await getImageInfo(file);

      const data = await this.service.qiniu.upload(name, file.filepath);

      result.push({
        url: data.url,
        width: imageInfo.width,
        height: imageInfo.height
      });
    }

    return result;
  }

  public async uploadFilesToLocalServer(files: EggFile[]) {
    const {
      ctx,
      config: { oss }
    } = this;

    if (!oss.local) {
      throw new Error("oss local config not found");
    }

    // 先取配置，没有则获取请求域名和协议
    const origin =
      oss.local && oss.local.host
        ? oss.local.host
        : ctx.request.protocol + "://" + ctx.request.host;

    const result: UploadImageProps[] = [];

    // 当前系统的静态资源文件夹
    const staticDir = path.resolve(__dirname, "../../" + oss.local.dir);

    try {
      const stats = await this.readDir(staticDir);

      if (!stats.isDirectory()) {
        throw new Error("oss local dir is not dir");
      }
    } catch (error) {
      throw new Error("oss local dir is not found");
    }

    const now = formatTimeByFormater(new Date(), "YYYY-MM-DD");

    const dayDir = staticDir + "/" + now;

    // 按照每天的时间自动创建文件夹
    try {
      await this.readDir(dayDir);
    } catch (error) {
      await this.mkdir(dayDir);
    }

    for (let file of files) {
      const name = this.relativeFilePath(file);

      const filePath = staticDir + "/" + name;
      const imageInfo = await getImageInfo(file);
      await this.rename(file.filepath, filePath);

      result.push({
        url: origin + (oss.local.prefix ? oss.local.prefix : "") + "/" + name,
        width: imageInfo.width,
        height: imageInfo.height
      });
    }
    return result;
  }

  private getFileType(file: EggFile) {
    return file.mime.split("/").pop();
  }

  private relativeFilePath(file: EggFile) {
    return (
      formatTimeByFormater(new Date(), "YYYY-MM-DD") +
      "/" +
      this.ctx.user.id +
      now() +
      "." +
      this.getFileType(file)
    );
  }

  private readDir(path: string): Promise<fs.Stats> {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err) {
          reject(err);
        }
        resolve(stats);
      });
    });
  }

  private mkdir(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  private rename(oldPath: string, path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.rename(oldPath, path, err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}

export default UploadService;
