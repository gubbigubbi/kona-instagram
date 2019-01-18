const gulp = require( 'gulp' );
const zip = require( 'gulp-zip' );

const zipOptions = {
	allowEmpty: true,
};

gulp.task( 'release', () =>
	gulp
		.src(
			[
				'dist/*',
				'src/*.php',
				'assets/*.jpg',
				'assets/*.svg',
				'readme.txt',
				'*.php',
			],
			{
				base: './',
			}
		)
		.pipe( zip( 'kona-instagram-for-gutenberg.zip', zipOptions ) )
		.pipe( gulp.dest( './' ) )
);
