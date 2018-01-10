var gulp = require( 'gulp' ),
    pug = require( 'gulp-pug' ),
    stylus = require( 'gulp-stylus' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    vender = require( 'gulp-autoprefixer' ),
    plumber = require( 'gulp-plumber' ),
    concat = require( 'gulp-concat' ),
    uglify = require( 'gulp-uglify' ),
    path = {

    src : {
        pug : 'src/pug/*.pug',
        stylus : 'src/static/stylus/*.styl',
        scripts : 'src/static/scripts/*.js',
        fonts : 'src/static/fonts/**/*',
        image : 'src/static/image/**/*'
    },
    
    dest : {
        build : 'build/',
        fonts : 'build/fonts/',
        image : 'build/image/'
    },
    
    watch : {
        pug : 'src/pug/**/**/*.pug',
        stylus : 'src/static/stylus/**/**/**/*.styl',
        scripts : 'src/static/scripts/*.js',
        fonts : 'src/static/fonts/**/*',
        image : 'src/static/image/**/*'
    }

}

// pug    
gulp.task( 'pug', function () {
    return gulp.src( path.src.pug )
           .pipe( pug() )
           .pipe( gulp.dest( path.dest.build ) );
});

// stylus
gulp.task( 'stylus', function () {
    return gulp.src( path.src.stylus )
           .pipe( sourcemaps.init() )
           .pipe( stylus({ compress : true, 'include css' : true }) )
           .pipe( vender() )
           .pipe( plumber() )
           .pipe( sourcemaps.write() )
           .pipe( gulp.dest( path.dest.build ) );
});

//scripts
gulp.task( 'scripts', function () {
    return gulp.src( path.src.scripts )
           .pipe( concat( 'main.js' ) )
           .pipe( uglify() )
           .pipe( gulp.dest( path.dest.build ) );
});

// fonts
gulp.task( 'fonts', function () {
    return gulp.src( path.src.fonts )
           .pipe( gulp.dest( path.dest.fonts ) );
});

// image
gulp.task( 'image', function () {
    return gulp.src( path.src.image )
           .pipe( gulp.dest( path.dest.image ) );
});

// watch
gulp.task( 'watch', function () {
    gulp.watch( path.watch.pug, gulp.series( 'pug' ) )
    gulp.watch( path.watch.stylus, gulp.series( 'stylus' ) )
    gulp.watch( path.watch.scripts, gulp.series( 'scripts' ) )
    gulp.watch( path.watch.fonts, gulp.series( 'fonts' ) )
    gulp.watch( path.watch.image, gulp.series( 'image' ) )
});

gulp.task( 'default', gulp.series( gulp.parallel( 'pug', 'stylus', 'scripts', 'fonts', 'image' ), 
                                   gulp.parallel( 'watch' ) ) );