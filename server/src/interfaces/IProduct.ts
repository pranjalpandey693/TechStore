export default interface IProduct extends Document {
  name: String;
  description: String;
  price: Number;
  stock: Number;
  image: Buffer;
}
