#!/usr/bin/env node

const fs = require( 'fs' );
const path = require( 'path' );
const mammoth = require( 'mammoth' );

const input = 'input';
const output = 'output';

const init = async function() {
    try {
        const files = await fs.promises.readdir( input );

        for( const file of files ) {
            const inputPath = path.join( input, file );
			const stat = await fs.promises.stat( inputPath );

            // We only process docx files.
            if ( stat.isFile() && '.docx' === path.extname( file ) ) {
				const fileName = path.basename( file, '.docx' );
				const outputPath = path.format( {
					dir: output,
					name: fileName,
					ext: '.html',
				} );

				mammoth.convertToHtml( { path: inputPath } )
					.then( function( result ) {
						const html = result.value;

						fs.writeFile( outputPath, html, err => {
							if ( err ) {
								return console.log( err );
							}
						} );
					} )
					.done();
			} else if ( '.gitkeep' !== file ) {
				console.log( `Ignored "${file}": Only docx files can be converted. Other files and folders will be skipped.` );
            }
        }
    }
    catch( e ) {
        console.error( 'Oops', e );
    }
}

init();
