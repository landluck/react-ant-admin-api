import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async uploadImage() {
    const { ctx } = this;

    const data = await ctx.service.upload.uploadFilesToQiniu (ctx.request.files)

    if (data) {
      return ctx.success(data)
    }

    ctx.fail()
  }
}
