"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("sass/main.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("css"))
    .pipe(csso())
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "./",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", gulp.series("css", "refresh"));
  gulp.watch("./*.html", gulp.series("refresh"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series("css"));
gulp.task("start", gulp.series("build", "server"));