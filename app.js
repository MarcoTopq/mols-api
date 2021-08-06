var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var dosenRouter = require('./routes/dosen');
var fileRouter = require('./routes/file');
var kelasRouter = require('./routes/kelas');
var mahasiswaRouter = require('./routes/mahasiswa');
var matkulRouter = require('./routes/matkul');
var postRouter = require('./routes/post');
var nilaiRouter = require('./routes/nilai');

var absent_session_timeRouter = require('./routes/absent_session_time');
var absentRouter = require('./routes/absent');
var angkatanRouter = require('./routes/angkatan');
var fakultasRouter = require('./routes/fakultas');
var groupRouter = require('./routes/group');
var jawaban_mahasiswaRouter = require('./routes/jawaban_mahasiswa');
var post_contentRouter = require('./routes/post_content');
var prodiRouter = require('./routes/prodi');
var soalRouter = require('./routes/soal');
var tahunRouter = require('./routes/tahun');

var cors = require('cors');
var app = express();
// var io = require('socket.io').listen(server);
var config = require('./config/index');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());
app.use('/', indexRouter);
app.use('/file', fileRouter);
app.use('/matkul', matkulRouter);
app.use('/nilai', nilaiRouter);
app.use('/kelas', kelasRouter);
app.use('/post', postRouter);
app.use('/dosen', dosenRouter);
app.use('/mahasiswa', mahasiswaRouter);
app.use('/admin', adminRouter);
app.use('/absentsessiontime', absent_session_timeRouter);
app.use('/absent', absentRouter);
app.use('/angkatan', angkatanRouter);
app.use('/fakultas', fakultasRouter);
app.use('/group', groupRouter);
app.use('/jawabanmahasiswa', jawaban_mahasiswaRouter);
app.use('/postcontent', post_contentRouter);
app.use('/prodi', prodiRouter);
app.use('/soal', soalRouter);
app.use('/tahun', tahunRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;