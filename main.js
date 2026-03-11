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
        var tempLines_4 = lines.slice(classNameLineArray[i_1]);
        for (var _a = 0, tempLines_1 = tempLines_4; _a < tempLines_1.length; _a++) {
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
                lastClassLine = classNameLineArray[i_1];
            }
            if (line.search("}") == 0)
                break;
        }
        /*if(attributsArray.length == 0) {
            console.log("Class Content : " + classContent + "\nMethods : " + methodsArray + "\n");
        }
        else if (methodsArray.length == 0) {
            console.log("Class Content : " + classContent + "\nAttributs : " + attributsArray + "\n");
        }
        else {
            console.log("Class Content : " + classContent + "\nAttributs : " + attributsArray + "\nMethods : " + methodsArray + "\n");
        }*/
    }
    /*
    Relation
    */
    var tempLines = lines.slice(classNameLineArray[classNameArray.length - 1]);
    var index = 0;
    var relationList = [];
    for (var _b = 0, tempLines_2 = tempLines; _b < tempLines_2.length; _b++) {
        var line = tempLines_2[_b];
        if (line.search("}") == 0) {
            index += 1;
            break;
        }
        index += 1;
    }
    tempLines = tempLines.slice(index);
    if (tempLines[0] == "") {
        tempLines = tempLines.slice(1);
    }
    var a = [];
    for (var _c = 0, tempLines_3 = tempLines; _c < tempLines_3.length; _c++) {
        var line = tempLines_3[_c];
        if (line == "@enduml")
            break;
        else if (line != "") {
            relationList.push(line);
            a.push(line.split("\""));
        }
    }
    for (var i_2 = 0; i_2 < a.length; i_2++) {
        for (var j = 0; j < a[i_2].length; j++) {
            console.log(a[i_2][j].trim());
        }
    }
    //console.log(relationList);
    //fs.writeFileSync("output.txt", output);
}
else if (lines[0].match("classDiagram")) {
    console.log("Mermaid");
}
