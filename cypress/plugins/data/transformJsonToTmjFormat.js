/* transformJsonToTmjFormat.js permet de transformer un JSON au format mochawesome vers un JSON au format accepté par TM4J */

var transform = require('qewd-transform-json').transform; // Initialisation du module qewd-transform-json qui permet de mapper un json selon un template
var fs = require('fs'); // Initialisation du module File System
var inputObj = require('../../results/results.json'); // Récupération du JSON généré par Cypress via mochawesome

/* Définition de la fonction setResult qui renvoie un statut au format TM4J */

var setResult = function(passField, failField) { 

    if (passField == true & failField == false) {
        return "Passed";
      } 
    else if (passField == false  & failField == true) {
        return "Failed";
      }
    else {
        return "Failed";
    }
};

/* Définition d'un template JSON accepté par TM4J */

var templateObj = 
{
    version: 1,
    executions: [ 
                '{{results}}',
                                {
                                source: 'cypress', 
                                result: '=> setResult(suites[0].tests[0].pass,suites[0].tests[0].fail)',
                                testCase:
                                    {
                                        name : '{{suites[0].tests[0].title}}'
                                    }     
                                }     
                ]
}

/* Construction du JSON via la fonction transform qui mappe un JSON d'entrée (inputObj) selon un template (templateObj) */

const result = transform(templateObj, inputObj, {setResult});

/* Export du nouveau JSON formatté vers tm4j_result.json */ 

let data = JSON.stringify(result);  
fs.writeFileSync('cypress/results/tm4j_result.json', data);  

// console.log(result);