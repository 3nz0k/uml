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
    lines.shift();
    var classNameCount = lines.join().split("class").length - 1;
    console.log(classNameCount);
    for (var i = 0; i < classNameCount; i++) {
        var attributs = [];
        var methods = [];
        var className = lines[0].substring(0, lines[0].search("{") - 1);
        console.log(className);
        output += className + " {\n";
        lines.shift();
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            if (!line.endsWith("()")) {
                console.log(line);
                attributs.push(line);
                output += space + line + "\n";
            }
            else
                break;
        }
        for (var i_1 = 0; i_1 < attributs.length; i_1++) {
            lines.shift();
        }
        for (var _a = 0, lines_2 = lines; _a < lines_2.length; _a++) {
            var line = lines_2[_a];
            if (!line.endsWith("}")) {
                console.log(line);
                methods.push(line);
                output += space + line + "\n";
            }
            else
                break;
        }
        for (var i_2 = 0; i_2 < methods.length; i_2++) {
            lines.shift();
        }
        output += "}\n";
        lines.shift();
        lines.shift();
    }
    console.log(output);
    fs.writeFileSync("output.txt", output);
}
else if (lines[0].match("classDiagram")) {
    console.log("Mermaid");
}
