import mongoose from 'mongoose';

const dbQuestionSchema = new mongoose.Schema({
  type: { type: String }, 
  tags: { type: String },  
  hint: {
    value: { type: String, default: "" }, 
    image: { type: String, default: null }, 
  },
  options: {
    a: { value: { type: String }, image: { type: String, default: null } },
    b: { value: { type: String }, image: { type: String, default: null } },
    c: { value: { type: String }, image: { type: String, default: null } },
    d: { value: { type: String }, image: { type: String, default: null } },
  },
  answer: { type: String }, 
  question: { type: String },  
  solution: { type: String },  
  questionType: { type: String }, 
  chapter: { type: String }, 
  subject: { type: String }, 
  difficulty: { type: String },  
  topic: { type: String },
});

export default mongoose.models.dbquestions || mongoose.model('dbquestions', dbQuestionSchema);
