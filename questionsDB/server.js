const express = require('express');
const connectDB = require('./config/darabase');
const { default: axios } = require('axios');
 
const questions = require('./model/questions');
const fs = require('fs');
const path = require('path');
const dbQuestion = require('./model/dbQuestion');
const app = express();

app.use(express.json());
connectDB();
 
app.get('/getcsvdata', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3500/membership/getcsvdata');
    
    if (response.data && response.data.qsns) {
      const data = response.data.qsns;
   
      for (const q of data) {
        const question = new dbQuestion({
          tags: q.tags,
          hint: q.hint,
          options: q.options,
          answer: q.answer,
          question: q.question,
          solution: q.solution,
          questionType: q.questionType,
          difficulty: q.difficulty,
          topic: q.topic,
        });
        
        await question.save();
      }

    }
    return res.status(200).json({message:"created"})
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
});


app.get('/generateJson', async (req, res) => {
  try {
    const response = await dbQuestion.find({});

    const filePath = path.join(__dirname, 'questions.json');

    fs.writeFileSync(filePath, JSON.stringify(response, null, 2));

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=questions.json');

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error sending the file');
      } else {
        fs.unlinkSync(filePath);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating or sending the JSON file');
  }
});

 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
