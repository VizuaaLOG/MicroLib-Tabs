var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

var version = "1.0.2";

gulp.task("minify", function() {
    return gulp.src("./src/tabs.microlib.js")
        .pipe(uglify())
        .pipe(rename( {suffix: "-" + version + ".min"} ))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("build", ["minify"], function() {
	return gulp.src("./src/tabs.microlib.js")
		.pipe(rename("tabs.microlib-latest.js"))
		.pipe(gulp.dest("./dist/"));
});