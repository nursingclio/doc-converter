# Nursing Clio Doc Converter

[![Download](https://img.shields.io/github/v/release/nursingclio/doc-converter.svg)](https://github.com/nursingclio/doc-converter/releases/latest) [![GPLv3 License](https://img.shields.io/github/license/nursingclio/doc-converter)](https://github.com/nursingclio/doc-converter/blob/stable/LICENSE.md)

A Node tool designed to convert Word (docx) files into simple HTML suitable for WordPress.

## Description

This tool will convert all `.docx` files in the `input` folder into WordPress-style HTML. WordPress-style HTML, in this case, means it doesn't bother with `<p>` tags or other entities that will be taken care of by the WordPress autop filter.

The following features are currently supported:

- Paragraphs
- Headings
- Lists
- Footnotes (will be converted to endnotes wrapped in the appropriate Notes section)
- Blockquotes

## Prerequisites 

The Nursing Clio Doc Converter requires NodeJS and npm. Node 15 is the recommended version of node to use. NC Doc Converter will probably work with other versions of node (at least as far back at 10), but no promises. 

You can confirm node and npm are installed by running the following commands in a terminal:

~~~bash
node -v
npm -v
~~~

### MacOS

NodeJS and npm can be installed from the [NodeJS website](https://nodejs.org/), using a package manager like [Homebrew](https://brew.sh/), or using a version manager like [nvm](https://github.com/creationix/nvm).

### Windows

NodeJS and npm can be installed from the [NodeJS website](https://nodejs.org/), or by using the WSL and following the instructions for Linux.

### Linux

NodeJS and npm can be installed using a package manager (follow the instructions on the [nvm](https://github.com/creationix/nvm)), or using a version manager like [nvm](https://github.com/creationix/nvm).

## Installation

Once the installation prerequisites are met, you are ready to install and use the NC Doc Converter. 

### Install from source

[Download the latest version from GitHub](https://github.com/nursingclio/doc-converter/releases/latest) and extract it into whatever directory you like.

### Install using Git

If you prefer to use Git to keep the NC Doc Converter up to date, you can instead clone it into your desired directory with `git clone https://github.com/nursingclio/doc-converter.git`.

## How to Use

1. Move the docx files you want to convert into the `input` folder in the NC Doc Converter folder (which will be called "doc-converter-x.x.x" or "doc-converter" by default).
2. The NC Doc Converter must be run from a terminal. Open a terminal in the Doc Converter directory.
3. Run the command `npm run NCconvert`
4. You should now find html files in the `output` directory corresponding to the docx files in the `input` directory.
5. You can run the `NCconvert` npm command multiple times with the same files. The output file will be overwritten.
6. To clean up you can either manually remove the input and output files, or you can run the command `npm run clean` to delete all of the files in both input and output directories.

## Updating

- If you installed manually using the source code file, you can update at any time by downloading a new version and replacing the old files with the new ones.
- If you installed using Git you can run `git pull origin stable` to update to the latest stable version.

### CLI Commands

Default usage: `npm run NCconvert`

Other commands:

- `npm run clean`: Delete all files in the `input` and `output` folders.
- `npm run clean:input`: Delete all files in the `input` folder only.
- `npm run clean:output`: Delete all files in the `output` folder only.
