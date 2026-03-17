import * as fs from "fs";

const filePath = 'file.txt';
const content:string = fs.readFileSync(filePath, 'utf-8');
let output = "";

interface oneClass {
    name: string;
    attributes: attribute[];
    methods: method[];
}

interface attribute {
    visibility: string;
    name: string;
    type: string;
}

interface method {
    visibility: string;
    name: string;
    parameters: parameter[];
    returnType: string | null;
}

interface parameter {
    type: string;
    name: string;
}

let classes:oneClass[] = [];

/*
This code search the class name
*/
function getClassName(content:string) 
{
    const classNameArray:string[] = [];
    const regex = /class (\w+)/g;
    const classNames = Array.from(content.matchAll(regex));

    for(const classname of classNames) {
        classes.push({
            name: classname[1],
            attributes : [],
            methods: []
        });
        classNameArray.push(classname[1]);
    }
    return classNameArray;
}

/*
This code search the content class
*/
function getClassContent(content:string, classNames:string[])
{
    const classNameContentArray:string[] = [];
    const regex = /{([\s\S]*?)}/;

    for(let i = 0; i < classNames.length; i++)
    {
        classNameContentArray.push(content.slice(content.search(classNames[i])).split(regex)[1]);
    }

    return classNameContentArray;
}

function getAttributs(content:string[])
{
    const regex = /([-#+])(\w*)(\s*:\s*)(\w*)/g;
    for(const line in content) {
        let attributs = Array.from(content[line].matchAll(regex));
        let attributsArray:attribute[] = [];
        for(const attribut of attributs) {
            attributsArray.push({
                visibility: attribut[1],
                name: attribut[2],
                type: attribut[4]
            });
        }

        classes[line].attributes = attributsArray;
    }
}

function getMethods(content: string[]) {
    const regex = /([-+])(\w+)\(([^)]*)\)\s*(?::\s*(\w+))?/g;

    for (let i = 0; i < content.length; i++) {
        const matches = Array.from(content[i].matchAll(regex));
        const methodsArray: method[] = [];

        for (const m of matches) {
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

function parseParameters(parameters:string) : parameter[]
{
    let params:string[];
    let parameter:parameter[] = [];

    if(parameters == "") return [];
    params = parameters.split(",");
    params.forEach(element => {
        element = element.trim();
        if(element != "")
        {
            params = element.split(" ");
            parameter.push({
                type: params[0],
                name: params[1] || ""
            });
        }
    })
    return parameter;
}

const classNameArray = getClassName(content);
const classContent = getClassContent(content, classNameArray);
getAttributs(classContent);
getMethods(classContent);
console.log();
fs.writeFileSync("output.json", JSON.stringify(classes, null, 2));
//console.log(classNameArray);
//console.log(attributs[0]);
//console.log(methods);