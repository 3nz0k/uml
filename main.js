"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var filePath = 'file.txt';
var content = fs.readFileSync(filePath, 'utf-8');
var lines = content.split(/\r?\n/);
var output = "";
if (lines[0].match("@startuml")) {
    var space = "    ";
    console.log("PlantUML");
    output = "classDiagram\n";
    /*
     This code search the class name
     */
    var classNameArray = [];
    var classNameLineArray = [];
    var lastClassLine = 0;
    var i = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var tempSearch = line.search("class");
        if (tempSearch == 0) {
            classNameArray.push(line.substring(6, line.search("{") - 1));
            classNameLineArray.push(i);
        }
        i++;
    }
    console.log(classNameArray, classNameLineArray);
    /*
    This code get attributs & methods of each class
    */
    for (var i_1 = 0; i_1 < classNameArray.length; i_1++) {
        var classContent = [];
        var attributsArray = [];
        var methodsArray = [];
        var tempLines = lines.slice(classNameLineArray[i_1]);
        for (var _a = 0, tempLines_1 = tempLines; _a < tempLines_1.length; _a++) {
            var line = tempLines_1[_a];
            classContent.push(line);
            if (!line.includes("class")) {
                if (!line.includes("{")) {
                    if (!line.includes("(")) {
                        if (!line.includes("}")) {
                            attributsArray.push(line);
                        }
                    }
                }
            }
            if (line.includes("("))
                methodsArray.push(line);
            if (i_1 > classNameLineArray.length - 2) {
                console.log(classNameLineArray[i_1]);
            }
            if (line.search("}") == 0)
                break;
        }
        if (attributsArray.length == 0) {
            console.log("Class Content : " + classContent + "\nMethods : " + methodsArray + "\n");
        }
        else if (methodsArray.length == 0) {
            console.log("Class Content : " + classContent + "\nAttributs : " + attributsArray + "\n");
        }
        else {
            console.log("Class Content : " + classContent + "\nAttributs : " + attributsArray + "\nMethods : " + methodsArray + "\n");
        }
    }
    /*
    Relation
    */
    for (var i_2 = 0; i_2 < classNameArray.length; i_2++) {
        var tempLines = lines.slice(classNameLineArray[i_2]);
        //console.log(tempLines);
    }
    //console.log(output);
    //fs.writeFileSync("output.txt", output);
}
else if (lines[0].match("classDiagram")) {
    console.log("Mermaid");
}
