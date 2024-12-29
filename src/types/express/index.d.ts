import { User } from "../../modules/auth/auth.model";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
