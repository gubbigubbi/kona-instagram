const gulp = require( 'gulp' );
const zip = require( 'gulp-zip' );

gulp.task( 'release', () =>
	gulp
		.src(
			[
				'dist/*',
				'src/*.php',
				'src/icons.js',
				'assets/*.jpg',
				'assets/*.svg',
				'readme.txt',
				'*.php',
			],
			{
				base: './',
			}
		)
		.pipe( zip( 'kona-instagram-for-gutenberg.zip' ) )
		.pipe( gulp.dest( './' ) )
);
