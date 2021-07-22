const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { encode, decode } = require('html-entities');
const clipboardy = require('clipboardy');
const request = require('request');

let document = (new JSDOM("")).window.document;

const dataString = `<sqlpp_request>
                        <clientid>dpriver-9094-8133-2031</clientid>
                        <dbvendor>mssql</dbvendor>
                        <outputfmt>html2</outputfmt>
                        <inputsql>${encode(process.argv[2].replace(/ /g, " "))}</inputsql>
                        <formatoptions>
                           <keywordcs>Uppercase</keywordcs>
                           <tablenamecs>Lowercase</tablenamecs>
                           <columnnamecs>Lowercase</columnnamecs>
                           <functioncs>InitCap</functioncs>
                           <datatypecs>Uppercase</datatypecs>
                           <variablecs>Unchanged</variablecs>
                           <aliascs>Unchanged</aliascs>
                           <quotedidentifiercs>Unchanged</quotedidentifiercs>
                           <identifiercs>Lowercase</identifiercs>
                           <lnbrwithcomma>after</lnbrwithcomma>
                           <liststyle>stack</liststyle>
                           <salign>sleft</salign>
                           <quotechar>"</quotechar>
                           <maxlenincm>80</maxlenincm>
                        </formatoptions>
                    </sqlpp_request>`;

const options = {
    url: 'https://www.dpriver.com/cgi-bin/ppserver',
    method: 'POST',
    body: dataString
};

function callback(error, response, body) {
    if (!error && response.statusCode === 200) {
        let htmlCode = decode(body.substr(body.indexOf("<formattedsql>")));

        //basic idea for this html to text code borrowed from
        //https://www.textfixer.com/html/html-to-text.php

        htmlCode = htmlCode.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
        htmlCode = htmlCode.replace(/<title>/gi, "<title>META TAG (title): ");
        htmlCode = htmlCode.replace(/<link/gi, "<llink");
        htmlCode = htmlCode.replace(/<\/li><li>/gi, "</li>\n<li>");
        htmlCode = htmlCode.replace(/<li/gi, "\n• <li");
        htmlCode = htmlCode.replace(/<llink/gi, "<link");
        htmlCode = htmlCode.replace(/<\/li>\n/gi, "</li>");

        let div = document.createElement('div');
        div.innerHTML = htmlCode;
        htmlCode = div.textContent;

        htmlCode = htmlCode.replace(/(\n\r|\n|\r)/gm, "\n");
        htmlCode = htmlCode.replace(/(\n \n)/gm, "\n\n");
        htmlCode = htmlCode.replace(/(\n	\n)/gm, "\n\n");
        htmlCode = htmlCode.replace(/(\n\n\n\n\n\n\n)/gm, "\n\n");
        htmlCode = htmlCode.replace(/(\n\n\n\n\n\n)/gm, "\n\n");
        htmlCode = htmlCode.replace(/(\n\n\n\n\n)/gm, "\n\n");
        htmlCode = htmlCode.replace(/(\n\n\n\n)/gm, "\n\n");
        htmlCode = htmlCode.replace(/(\n\n\n)/gm, "\n\n");
        htmlCode = htmlCode.trim();

        clipboardy.writeSync(htmlCode.replace(/ /g, " "));
    }
}

request(options, callback);