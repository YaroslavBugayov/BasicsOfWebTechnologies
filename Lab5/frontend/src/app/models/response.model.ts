import {UserModel} from "./user.model";
import {TokensModel} from "./tokens.model";

export interface ResponseModel {
  user: UserModel,
  tokens: TokensModel
}
