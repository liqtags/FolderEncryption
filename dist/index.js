"use strict";var S=Object.create;var g=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var x=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty;var k=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of E(e))!I.call(t,o)&&o!==r&&g(t,o,{get:()=>e[o],enumerable:!(n=$(e,o))||n.enumerable});return t};var a=(t,e,r)=>(r=t!=null?S(x(t)):{},k(e||!t||!t.__esModule?g(r,"default",{value:t,enumerable:!0}):r,t));var h=a(require("commander"));var s=a(require("fs")),f=require("crypto"),p=a(require("crypto")),m="aes256",y=class{secretKey;secretIv;constructor(e,r){this.secretKey=e,this.secretIv=r}cleanDirectory(e){if(!this.isFolder(e)){console.log("Target is not a directory!");return}this.deleteFolder(e)}performEncryption(e,r=!1){let n=Buffer.from(this.secretKey,"hex"),o=Buffer.from(this.secretIv,"hex"),i=(0,f.createCipheriv)(m,n,o),c=i.update(e,"utf8","hex")+i.final("hex");return r&&console.dir({encrypted:c,iv:o.toString("hex"),key:n.toString("hex")}),c}encryptFile(e,r,n=!1){if(this.checkIfFile(e)){let o=this.retrieveFileContent(e),i=this.performEncryption(o,n);this.saveDataToFile(r,i)}else throw new Error(`File not found: ${e}`)}performDirectoryEncryption(e,r,n=!1){if(this.isFolder(e)){let o=this.retrieveFolderItems(e);this.createDirectory(r);for(let i of o)if(this.isFolder(`${e}/${i}`))this.performDirectoryEncryption(`${e}/${i}`,`${r}/${this.performEncryption(i,!0)}`,n);else{let c=this.performEncryption(i,!0);this.encryptFile(`${e}/${i}`,`${r}/${c}`,n)}}else throw new Error(`Directory not found: ${e}`)}performDecryption(e,r=!1){let n=Buffer.from(this.secretKey,"hex"),o=Buffer.from(this.secretIv,"hex"),i=(0,f.createDecipheriv)(m,n,o),c=i.update(e,"hex","utf8")+i.final("utf8");return r&&console.dir({decrypted:c,iv:o.toString("hex"),key:n.toString("hex")}),c}decryptAndSaveFile(e,r,n=!1){if(this.checkIfFile(e)){let o=this.retrieveFileContent(e),i=this.performDecryption(o,n);this.saveDataToFile(r,i)}else throw new Error(`File not found: ${e}`)}performDirectoryDecryption(e,r,n=!1){if(this.isFolder(e)){let o=this.retrieveFolderItems(e);this.createDirectory(r);for(let i of o)if(this.isFolder(`${e}/${i}`))this.performDirectoryDecryption(`${e}/${i}`,`${r}/${this.performDecryption(i)}`,n);else{let c=this.performDecryption(i);this.decryptAndSaveFile(`${e}/${i}`,`${r}/${c}`,n)}}else throw new Error(`Directory not found: ${e}`)}purgeEncryptedDirectory(e){if(!this.isFolder(e)){console.log("Target is not a directory!");return}this.deleteFolder(e)}purgeSources(e){for(let r of e)this.doesFileExist(r)?this.deleteFolder(r):console.log(`Source (${r}) does not exist!`)}generateRandomString(e){return(0,f.randomBytes)(e).toString("hex")}isFolder(e){return s.lstatSync(e).isDirectory()}deleteFolder(e){if(this.isFolder(e))s.rmdirSync(e,{recursive:!0});else throw new Error(`Path (${e}) is not a directory!`)}checkIfFile(e){return s.lstatSync(e).isFile()}retrieveFileContent(e){return s.readFileSync(e,"utf8")}createDirectory(e){s.mkdirSync(e,{recursive:!0})}saveDataToFile(e,r){return s.writeFileSync(e,r)}retrieveFolderItems(e){return s.readdirSync(e)}doesFileExist(e){return s.existsSync(e)}generateRandomStringOfXLengh(e){return p.randomBytes(e).toString("hex")}createNewKey(){let e=this.generateRandomStringOfXLengh(32),r=this.generateRandomStringOfXLengh(16);return{secretKey:e,secretIv:r}}saveKeyToFile(e,r){this.saveDataToFile(r,JSON.stringify(e,null,2))}loadKeyFromFile(e){return JSON.parse(this.retrieveFileContent(e))}};var v=a(require("fs")),u="",F="",l=h.program;function D(){let t=v.readFileSync("./key.json","utf8"),e=JSON.parse(t);u=e.secretKey,F=e.secretIv}D();var d=new y(u,F);l.name("FolderEncryption").description("CLI tool to encrypt and decrypt directories and files").version("0.0.1");l.command("encrypt").description("Encrypt directory").argument("<source>","Source folder").argument("<target>","Target folder").option("-d, --debug","display debug information").action((t,e,r)=>{d.performDirectoryEncryption(t,e,r.debug)});l.command("decrypt").description("Decrypt directory").argument("<source>","Source folder").argument("<target>","Target folder").option("-key","load secret key and iv from file",D).option("-d, --debug","display debug information").action((t,e,r)=>{d.performDirectoryDecryption(t,e,r.debug)});l.command("clean").description("Clean directory").argument("<target>","Target folder").action(t=>{d.cleanDirectory(t)});l.command("encrypt-file").description("Encrypt file").argument("<input>","Input file").argument("<output>","Output file").option("-d, --debug","display debug information").action((t,e,r)=>{d.encryptFile(t,e,r.debug)});l.command("create-key").description("Create new key").option("-s, --save","save key to file").action(t=>{let e=d.createNewKey();t.save&&d.saveKeyToFile(e,"./keyz.json")});l.parse();
