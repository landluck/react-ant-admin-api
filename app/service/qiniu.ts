import { Context, Service } from "egg";
import qiniu = require("qiniu");
import { QiniuConfig } from "../../typings";

interface ResponseData {
  url: string;
}
interface QiniuResponse {
  statusCode: number;
  data: {
    hash: string;
    key: string;
  };
}

class QiniuService extends Service {
  instance: any;
  token: string;
  uploader: any;
  extra: any;
  option: QiniuConfig | undefined;

  constructor(ctx: Context) {
    super(ctx);

    const option = this.config.oss.qiniu;

    this.option = option;

    if (!option) {
      return;
    }

    this.instance = new qiniu.auth.digest.Mac(
      option.accessKey,
      option.secretKey
    );

    this.token = new qiniu.rs.PutPolicy({
      scope: option.scope
    }).uploadToken(this.instance);

    const config = new qiniu.conf.Config() as any;
    config.zone = qiniu.zone.Zone_z0;

    this.uploader = new qiniu.form_up.FormUploader(config);
    this.extra = new qiniu.form_up.PutExtra();
  }

  public async upload(fileName: string, path: string): Promise<ResponseData> {
    return new Promise((resolve, reject) => {
      if (!this.option) {
        reject(new Error("qiniu config not found"));
      }

      this.uploader.putFile(
        this.token,
        fileName,
        path,
        this.extra,
        (err: any, response: any, responseData: QiniuResponse) => {
          if (err) {
            reject(new Error("qiniu upload error"));
          }

          this.ctx.logger.info("qiniu uplaod repsponse", response);

          if (responseData.statusCode == 200) {
            resolve({
              url: this.option
                ? this.option.host + "/" + responseData.data.key
                : ""
            });
          } else {
            reject(new Error("qiniu upload error"));
          }
        }
      );
    });
  }
}

export default QiniuService;
