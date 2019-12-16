import { ExcludeAttributes } from "../../typings";
import { User } from "../model/user";

export function queryOptions(): ExcludeAttributes {
  return {
    attributes: {
      exclude: ["updatedAt", "createdAt", "deletedAt", "creator", "modifier"]
    }
  };
}

interface CreateOperation {
  creator: string;
  modifier: string;
}

export function createOptions<T>(options: T, user: User): T & CreateOperation {
  return {
    ...options,
    creator: user.account,
    modifier: user.account
  };
}

interface UpdateOperation {
  modifier: string;
}

export function updateOptions<T>(options: T, user: User): T & UpdateOperation {
  return {
    ...options,
    modifier: user.account
  };
}

const SqlUtils = {
  queryOptions,
  createOptions,
  updateOptions
};

export default SqlUtils;
