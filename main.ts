import * as fs from 'fs';

const filePath = 'file.txt';
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split(/\r?\n/);

let output = "";

if (lines[0].match("@startuml"))
{
    const space = "    ";
    
    console.log("PlantUML");
    output = "classDiagram\n"
    lines.shift();
    let classNameCount = lines.join().split("class").length -1;
    console.log(classNameCount);

    for(let i = 0; i < classNameCount; i++)
    {
        const attributs = [];
        const methods = [];

        let className = lines[0].substring(0, lines[0].search("{") -1);
        console.log(className);
        output += className + " {\n"
        lines.shift();

        for(const line of lines)
        {
            if (!line.endsWith("()"))
            {
                console.log(line);
                attributs.push(line);
                output += space + line + "\n";
            }
            else break;
        }

        for (let i = 0; i < attributs.length; i++)
        {   
            lines.shift();
        }

        for(const line of lines)
        {
            if (!line.endsWith("}"))
            {
                console.log(line);
                methods.push(line);
                output += space + line + "\n";
            }
            else break;
        }

        for (let i = 0; i < methods.length; i++)
        {   
            lines.shift();
        }

        output += "}\n";
        lines.shift();
        lines.shift();
    }
    console.log(output);
    fs.writeFileSync("output.txt", output);


}
else if (lines[0].match("classDiagram"))
{
    console.log("Mermaid");
}