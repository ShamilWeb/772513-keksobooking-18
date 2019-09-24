var
	gulp = require("gulp"),
	browserSync = require("browser-sync");

gulp.task("refresh", function (done) {
  browserSync.reload();
  done();
});

gulp.task('start', function(){
  browserSync({
    server: {
      baseDir: './'
    }
  });
	gulp.watch('js/*.js', gulp.series("refresh"));
  gulp.watch("*.html", gulp.series("refresh"));
});
