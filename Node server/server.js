const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT;



const allowedOrigins = ['https://preppal.club', 'https://admin-be.preppal.club', 'https://admin-be.preppal.club/api/', 'https://admin.preppal.club', 'http://localhost:3001', 'http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoURI = process.env.MONGODB_URI;
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));


const SignUp = require('./routes/admin/signUp')
const SignIn = require('./routes/admin/signIn')
const Protected = require('./routes/admin/protected')
const boardCreateRoutes = require('./routes/Board/createBoard');
const boardGetRoutes = require('./routes/Board/getBoard');
const boardeditRoutes = require('./routes/Board/editBoard');
const boardDeleteRoutes = require('./routes/Board/deleteBoard');
const createClass = require('./routes/class/createClass');
const getClass = require('./routes/class/getClass');
const editClass = require('./routes/class/editClass');
const deleteClass = require('./routes/class/deleteClass');
const createSubject = require('./routes/subject/createSubject');
const getAllSubject = require('./routes/subject/getAllSubject');
const getSubject = require('./routes/subject/getSubject');
const editSubject = require('./routes/subject/editSubject');
const deleteSubject = require('./routes/subject/deleteSubject');
const getChapter = require('./routes/chapter/getChapter');
const createChapter = require('./routes/chapter/createChapter')
const editChapter = require('./routes/chapter/editChapter')
const deleteChapter = require('./routes/chapter/deleteChapter')
const getChapterTopic = require('./routes/chapterTopic/getChapterTopic')
const createChapterTopic = require('./routes/chapterTopic/createChapterTopic')
const editChapterTopic = require('./routes/chapterTopic/editChapterTopic')
const deleteChapterTopic = require('./routes/chapterTopic/deleteChapterTopic')
const getTopicNotes = require('./routes/topicNotes/getTopicNotes')
const createTopicNotes = require('./routes/topicNotes/createTopicNotes')
const editTopicNotes = require('./routes/topicNotes/editTopicNotes')
const deleteTopicNotes = require('./routes/topicNotes/deleteTopicNotes')
const createPdf = require('./routes/pdf/createPdf')
const getPdf = require('./routes/pdf/getPdf')
const editPdf = require('./routes/pdf/editPdf')
const deletePdf = require('./routes/pdf/deletePdf')


app.use('/api/signUp', SignUp)
app.use('/api/signIn', SignIn)
app.use('/api/protected', Protected)
app.use('/api/board/createBoard', boardCreateRoutes);
app.use('/api/board/getBoard', boardGetRoutes);
app.use('/api/board/editBoard', boardeditRoutes);
app.use('/api/board/deleteBoard', boardDeleteRoutes);
app.use('/api/class/createClass', createClass);
app.use('/api/class/getClass', getClass);
app.use('/api/class/editClass', editClass);
app.use('/api/class/deleteClass', deleteClass);
app.use('/api/subject/createSubject', createSubject);
app.use('/api/subject/getAllSubject', getAllSubject);
app.use('/api/subject/getSubject', getSubject);
app.use('/api/subject/editSubject', editSubject);
app.use('/api/subject/deleteSubject', deleteSubject);
app.use('/api/chapter/getChapter', getChapter);
app.use('/api/chapter/createChapter', createChapter)
app.use('/api/chapter/editChapter', editChapter)
app.use('/api/chapter/deleteChapter', deleteChapter)
app.use('/api/chapterTopic/getChapterTopic', getChapterTopic)
app.use('/api/chapterTopic/createChapterTopic', createChapterTopic)
app.use('/api/chapterTopic/editChapterTopic', editChapterTopic)
app.use('/api/chapterTopic/deleteChapterTopic', deleteChapterTopic)
app.use('/api/topicNotes/getTopicNotes', getTopicNotes)
app.use('/api/topicNotes/createTopicNotes', createTopicNotes)
app.use('/api/topicNotes/editTopicNotes', editTopicNotes)
app.use('/api/topicNotes/deleteTopicNotes', deleteTopicNotes)
app.use('/api/pdf/createPdf', createPdf)
app.use('/api/pdf/getPdf', getPdf)
app.use('/api/pdf/editPdf', editPdf)
app.use('/api/pdf/deletePdf', deletePdf)


app.get('/', (req, res) => {
    res.send('Welcome to the Tutor API!');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
