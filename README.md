# FolderEncryption CLI

FolderEncryption is a Command Line Interface (CLI) tool designed to encrypt and decrypt directories and files. It provides an easy and efficient way to manage encrypted data with various functionalities.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Encrypt Directory](#encrypt-directory)
  - [Decrypt Directory](#decrypt-directory)
  - [Clean Directory](#clean-directory)
  - [Encrypt File](#encrypt-file)
  - [Create New Key](#create-new-key)
- [Options](#options)
- [Contributing](#contributing)
- [License](#license)

## Installation

Ensure you have a `key.json` file in the root directory with the following structure:
```json
    {
      "secretKey": "your-secret-key",
      "secretIv": "your-secret-iv"
    }
```

## Usage

To use the FolderEncryption CLI, navigate to the project directory and run the desired command.

### Encrypt Directory

Encrypts all files in the specified source directory and outputs them to the target directory.

```sh
node dist/index.js encrypt <source> <target> [options]
```

### Decrypt Directory

Decrypts all files in the specified source directory and outputs them to the target directory.

```sh
node dist/index.js decrypt <source> <target> [options]
```

### Clean Directory

Cleans the specified target directory by removing all files.

```sh
node dist/index.js clean <target>
```

### Encrypt File

Encrypts a single file and outputs the encrypted file.

```sh
node dist/index.js encrypt-file <input> <output> [options]
```

### Create New Key

Generates a new encryption key and optionally saves it to a file.

```sh
node dist/index.js create-key [options]
```

## Options

- `-d, --debug` : Display debug information during the execution of the command.
- `-s, --save`  : Save the generated key to a file (used with `create-key` command).
- `-key`        : Load secret key and IV from file (used with `decrypt` command).