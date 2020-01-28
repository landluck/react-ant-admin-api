import { PageParams, PageSql, PageInfo } from '../../typings';
import { toNumber } from './index';

class Page {
  page: number;
  size: number;
  dataTotal: number;
  pageTotal: number;

  constructor({ page, size }: PageParams) {
    this.page = toNumber(page, 1);
    this.size = toNumber(size, 10);
  }

  setTotal(count: number) {
    this.dataTotal = count;

    this.pageTotal = Math.ceil(count / this.size);
  }

  buildOptions(): PageSql {
    return {
      limit: this.size,
      offset: (this.page - 1) * this.size,
    };
  }

  getData(): PageInfo {
    return {
      page: this.page,
      size: this.size,
      dataTotal: this.dataTotal,
      pageTotal: this.pageTotal,
    };
  }
}

export default Page;
