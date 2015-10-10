var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

gulp.task("minify", function() {
    return gulp.src("./src/tabs.microlib.js")
        .pipe(uglify())
        .pipe(rename( {suffix: ".min"} ))
        .pipe(gulp.dest("./dist/"));
});