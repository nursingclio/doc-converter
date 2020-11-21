#!/usr/bin/env node

/**
 * External dependencies
 */
const fs = require( 'fs' );
const path = require( 'path' );
const mammoth = require( 'mammoth' );
// const { resolve } = require('path');

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
	// @TODO determine if Word uses the same style name for block quotations.
	const options = {
		styleMap: [
			"p[style-name='Quotations'] => gblockquote"
		]
	};

	return new Promise( ( resolve ) => {
		mammoth.convertToHtml( { path: filePath }, options )
		.then( function( result ) {
			const html = result.value;
			resolve( html );
		} )
		.done();
	} );
};

/**
 * Clean and formats the raw HTML for Nursing Clio WP.
 *
 * @param {string} rawHtml
 */
const cleanHtml = ( rawHtml ) => {
	return new Promise( ( resolve ) => {
		const html = rawHtml.replace( /<\/ol>$/, '</ol>\n</section>' )
							.replace( /<ol><li id="footnote/, '<section id="sources">\n<h4>Notes</h4><ol class="footnotes"><li id="footnote' )
							.replace( /<li id="footnote-(\d+)">.*?<p>/g, '<li id="footnote-$1">' )
							.replace( /<\/a><\/p><\/li>/g, '</a></li>' )
							.replace( /<p>/g, '' )
							.replace( /<\/p>/g, '\n\n' )
							.replace( /<sup><sup>/g, '<sup>' )
							.replace( /<\/sup><\/sup>/g, '</sup>' )
							.replace( /id="footnote-ref/g, 'class="footnote-ref" id="footnote-ref' )
							.replace( /">↑/g, '" class="return-link">Return to text.' )
							.replace( /<gblockquote>/g, '[gblockquote]' )
							.replace( /<\/gblockquote>/g, '[/gblockquote]\n\n')
							.replace( /\t/g, ' ' )
							.replace( / \n/g, '' )
							.replace( /\n+/g, '\n\n' )
							.replace( /<\/li>/g, '</li>\n' )
							.replace( /<\/h(\d)>/g, '</h$1>\n\n' );
		resolve( html );
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
				const html = await cleanHtml( rawHtml );

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
