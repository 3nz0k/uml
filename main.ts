import * as fs from "fs";

const filePath = 'file.txt';
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split(/\r?\n/);

let output = "";

if (lines[0].match("@startuml")) {
    const space = "    ";
    
    console.log("PlantUML");
    output = "classDiagram\n";
    
    /*
     This code search the class name
     */
    const classNameArray = [];
    const classNameLineArray: number[] = [];
    let lastClassLine = 0;
    let i = 0;
    for(const line of lines) {
        let tempSearch = line.search("class");
        
        if (tempSearch == 0) {
            classNameArray.push(line.substring(6, line.search("{")-1));
            classNameLineArray.push(i);
        }
        i++;
    }
    console.log(classNameArray, classNameLineArray);
 
    /*
    This code get attributs & methods of each class
    */
    for(let i = 0; i < classNameArray.length; i++) {
        const classContent = [];
        const attributsArray = [];
        const methodsArray = [];

        let tempLines = lines.slice(classNameLineArray[i]);
        for(const line of tempLines) {
            classContent.push(line)
            if(!line.includes("class")) {
                if(!line.includes("{")) {
                    if (!line.includes("(")) {
                        if (!line.includes("}")) {
                            attributsArray.push(line);
                        }
                    }
                }
            }
            if(line.includes("(")) methodsArray.push(line);
            if(i > classNameLineArray.length -2)
            {
                lastClassLine = classNameLineArray[i];
            }
            if(line.search("}") == 0) break;

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
    let tempLines:string[] = lines.slice(classNameLineArray[classNameArray.length-1]);
    let index = 0;
    const relationList = [];
    for(const line of tempLines)
    {
        if(line.search("}") == 0)
        {
            index += 1;
            break;
        }
        index += 1;
    }

    tempLines = tempLines.slice(index);

    if(tempLines[0] == "")
    {
        tempLines = tempLines.slice(1);
    }

    let relationArray: string[][] = [];
    for (const line of tempLines)
    {
        if (line == "@enduml") break;
        else if(line != "")
        {
            relationList.push(line);
            relationArray.push(line.split("\""));
        }
    }

    for(let i = 0; i < relationArray.length; i++ )
    {
        for(let j = 0; j < relationArray[i].length; j++)
        { 
            console.log(relationArray[i][j].trim());
        }
    }

    //console.log(relationList);
    //fs.writeFileSync("output.txt", output);

} else if (lines[0].match("classDiagram")) {
    console.log("Mermaid");
}