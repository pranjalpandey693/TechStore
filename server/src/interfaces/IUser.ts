export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isadmin: string;
}
