#!/usr/bin/env node

/**
 * External dependencies
 */
const fs = require( 'fs' );
const path = require( 'path' );
const mammoth = require( 'mammoth' );

/**
 * Constants
 */
const INPUT_DIR = 'input';
const OUTPUT_DIR = 'output';

/**
 * Converts docx files to html.
 *
 * @param {string} filePath
 */
const convert = ( filePath ) => {
	return new Promise( ( resolve, reject ) => {
		mammoth.convertToHtml( { path: filePath } )
		.then( function( result ) {
			const html = result.value;
			resolve( html );
		} )
		.done();
	} );
};

/**
 * Writes the HTML content to the output directory.
 *
 * @param {string} content
 * @param {string} file
 */
const writeFile = ( content, file ) => {
	const fileName = path.basename( file, '.docx' );
	const outputPath = path.format( {
		dir: OUTPUT_DIR,
		name: fileName,
		ext: '.html',
	} );

	fs.writeFile( outputPath, content, err => {
		if ( err ) {
			return console.log( err );
		}
	} );
};

const init = async function() {
    try {
        const files = await fs.promises.readdir( INPUT_DIR );

        for( const file of files ) {
			const filePath = path.join( INPUT_DIR, file );
			const stat = await fs.promises.stat( filePath );

            // Only process docx files.
            if ( stat.isFile() && '.docx' === path.extname( file ) ) {
				// Convert the docx to html using Mammoth.
				const rawHtml = await convert( filePath );

				// Run text replacements.

				// Write content to output.
				writeFile( html, file );

			} else if ( '.gitkeep' !== file ) {
				console.log( `Ignored "${file}": Only docx files can be converted. Other files and folders will be skipped.` );
            }
        }
    }
    catch( e ) {
        console.error( 'Oops', e );
    }
};

init();
