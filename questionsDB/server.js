const express = require('express');
const connectDB = require('./config/darabase');
const { default: axios } = require('axios');
 
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

const cleanLatex = (str) => {
  if (!str) return str;

  // Remove $$...$$ block
  str = str.replace(/\$\$(.*?)\$\$/g, '$1');
  
  // Remove $...$ for inline math
  str = str.replace(/\$(.*?)\$/g, '$1');
  
  // Remove LaTeX commands (e.g., \times, \frac, \text)
  str = str.replace(/\\[a-zA-Z]+\{.*?\}/g, '');  // Removes commands with arguments like \times{...}
  
  // Remove any backslashes (\), which are used in LaTeX commands like \times, \frac, etc.
  str = str.replace(/\\[a-zA-Z]+/g, '');  // Removes LaTeX commands (e.g., \times, \frac, etc.)
  
  // Remove slashes or other unwanted symbols
  str = str.replace(/[\\\/]/g, '');  // Removes backslashes and forward slashes
  
  // Optionally, remove any HTML tags (e.g., <br/>)
  str = str.replace(/<[^>]*>/g, '');  // Removes any HTML tags
  
  // Remove extra spaces or newlines, and trim leading/trailing spaces
  str = str.replace(/\s+/g, ' ').trim();

  return str;
};





app.get('/generateJson', async (req, res) => {
  try {
    const response = await dbQuestion.find({});

    const cleanedResponse = response.map(item => {
      if (item.hint && item.hint.value) {
        item.hint.value = cleanLatex(item.hint.value);
      }

      Object.keys(item.options).forEach(option => {
        if (item.options[option] && item.options[option].value) {
          item.options[option].value = cleanLatex(item.options[option].value);
        }
      });

      if (item.question) {
        item.question = cleanLatex(item.question);
      }
      if (item.solution) {
        item.solution = cleanLatex(item.solution);
      }

      return item;
    });

    const filePath = path.join(__dirname, 'questions.json');
    fs.writeFileSync(filePath, JSON.stringify(cleanedResponse, null, 2));

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
