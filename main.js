"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var filePath = 'file.txt';
var content = fs.readFileSync(filePath, 'utf-8');
var output = "";
var classes = [];
/*
This code search the class name
*/
function getClassName(content) {
    var classNameArray = [];
    var regex = /class (\w+)/g;
    var classNames = Array.from(content.matchAll(regex));
    for (var _i = 0, classNames_1 = classNames; _i < classNames_1.length; _i++) {
        var classname = classNames_1[_i];
        classes.push({
            name: classname[1],
            attributes: [],
            methods: []
        });
        classNameArray.push(classname[1]);
    }
    return classNameArray;
}
/*
This code search the content class
*/
function getClassContent(content, classNames) {
    var classNameContentArray = [];
    var regex = /{([\s\S]*?)}/;
    for (var i = 0; i < classNames.length; i++) {
        classNameContentArray.push(content.slice(content.search(classNames[i])).split(regex)[1]);
    }
    return classNameContentArray;
}
function getAttributs(content) {
    var regex = /([-#+])(\w*)(\s*:\s*)(\w*)/g;
    for (var line in content) {
        var attributs = Array.from(content[line].matchAll(regex));
        var attributsArray = [];
        for (var _i = 0, attributs_1 = attributs; _i < attributs_1.length; _i++) {
            var attribut = attributs_1[_i];
            attributsArray.push({
                visibility: attribut[1],
                name: attribut[2],
                type: attribut[4]
            });
        }
        classes[line].attributes = attributsArray;
    }
}
function getMethods(content) {
    var regex = /([-+])(\w+)\(([^)]*)\)\s*(?::\s*(\w+))?/g;
    for (var i = 0; i < content.length; i++) {
        var matches = Array.from(content[i].matchAll(regex));
        var methodsArray = [];
        for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
            var m = matches_1[_i];
            methodsArray.push({
                visibility: m[1],
                name: m[2],
                parameters: parseParameters(m[3]),
                returnType: m[4] || null
            });
            parseParameters(m[3]);
        }
        classes[i].methods = methodsArray;
    }
}
function parseParameters(parameters) {
    var params;
    var parameter = [];
    if (parameters == "")
        return [];
    params = parameters.split(",");
    params.forEach(function (element) {
        element = element.trim();
        if (element != "") {
            params = element.split(" ");
            parameter.push({
                type: params[0],
                name: params[1] || ""
            });
        }
    });
    return parameter;
}
var classNameArray = getClassName(content);
var classContent = getClassContent(content, classNameArray);
getAttributs(classContent);
getMethods(classContent);
console.log();
fs.writeFileSync("output.json", JSON.stringify(classes, null, 2));
//console.log(classNameArray);
//console.log(attributs[0]);
//console.log(methods);
