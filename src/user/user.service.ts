import {UserModel} from "./models/user.model";

export class UserService {
  public getAllUser(): Array<UserModel> {
    return [
      {
        name: 'amin',
        age: 19
      }
    ]
  }
}