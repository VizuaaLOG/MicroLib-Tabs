var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

var version = "1.0.0";

gulp.task("minify", function() {
    return gulp.src("./src/tabs.microlib-"+version+".js")
        .pipe(uglify())
        .pipe(rename( {suffix: ".min"} ))
        .pipe(gulp.dest("./dist/"));
});