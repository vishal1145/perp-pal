import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IContactUs extends Document {
  name: string;
  emailOrPhone: string;
  query: string;
}

const contactUsSchema: Schema = new Schema({
  name: { type: String, required: true },
  emailOrPhone: { type: String, required: true },
  query: { type: String, required: true }
});

const ContactUs: Model<IContactUs> = mongoose.models.Contactus || mongoose.model<IContactUs>('Contactus', contactUsSchema);

export default ContactUs;
