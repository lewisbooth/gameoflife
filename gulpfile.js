var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// Watch scss AND html files, doing different things with each.
gulp.task('default', ['sass'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("./app/js/*.js").on("change", reload);
    gulp.watch("./app/*.html").on("change", reload);
});

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});