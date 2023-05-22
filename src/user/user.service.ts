import {UserModel} from "./models/user.model";

export class UserService {
  public findAll(): Array<UserModel> {
    return [
      {
        name: 'amin',
        age: 19
      }
    ]
  }
}