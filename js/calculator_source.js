/*
*  Calculator of painting of building constructions' costs (www.mkanin.com)
*
*  See LICENSE.txt for license information.
*
*  Copyright (c) 2017 Mikhail Kanin. All rights reserved.
*/

// Price
var price = 10.0;
var currency = "$";

// Default digital values
var defaultInputValue = "0.0";
var defaultResultValue = "0.00";

// Styles
var staticAdditionalDivColorClassesNames = ["static-additional-class"];
var staticAdditionalDivResizeClassesNames = ["product-resize"];
var staticAdditionalImgResizeClassesNames = ["image-resize"];
var titleClassesNames = ["input-title"];
var inputClassesNames = ["input-field-main"];
var resultTitleClassName = "output-result-title";
var resultMainClassesNames = ["output-result-main"];

// Directory of images
var imgDir = "images/";

// Some additional parameters
var numberOfResultDecimalPlaces = 2;
var measure = "m2";

// Description of static objects
var staticObjects = {
    "round-pipe": {
        "name": "round-pipe",
        "title": "Round pipe or armature",
        "img-id": "round-pipe-img",
        "images": {
            "image-default-source": "round-pipe.png",
            "image-active-source": "round-pipe-active.png"
        },
        "child-div-id": "round-pipe-child",
        "dyn-elements": ["length", "radius"],
        "calculation-function": roundPipeCalc
    },
    "profile-pipe": {
        "name": "profile-pipe",
        "title": "Profile pipe",
        "img-id": "profile-pipe-img",
        "images": {
            "image-default-source": "profile-pipe.png",
            "image-active-source": "profile-pipe-active.png"
        },
        "child-div-id": "profile-pipe-child",
        "dyn-elements": ["length", "width", "height"],
        "calculation-function": profilePipeCalc
    },
    "strip": {
        "name": "strip",
        "title": "Strip",
        "img-id": "strip-img",
        "images": {
            "image-default-source": "strip.png",
            "image-active-source": "strip-active.png"
        },
        "child-div-id": "strip-child",
        "dyn-elements": ["length", "width"],
        "calculation-function": stripCalc
    },
    "angle": {
        "name": "angle",
        "title": "Angle",
        "img-id": "angle-img",
        "images": {
            "image-default-source": "angle.png",
            "image-active-source": "angle-active.png"
        },
        "child-div-id": "angle-child",
        "dyn-elements": ["length", "width"],
        "calculation-function": angleCalc
    },
    "img-dir": imgDir,
    "additional-div-color-class-names": staticAdditionalDivColorClassesNames,
    "additional-div-resize-class-names": staticAdditionalDivResizeClassesNames,
    "additional-img-resize-class-names": staticAdditionalImgResizeClassesNames
}

// Description of creating objects
var dynamicObjects = {
    "input-object": {
        "length": {
            "name": "length",
            "title": "Length (m):",
            "default-value": defaultInputValue,
            "title-class-names": titleClassesNames,
            "input-class-names": inputClassesNames
            // "parent-element": null
        },
        "width": {
            "name": "width",
            "title": "Width (m):",
            "default-value": defaultInputValue,
            "title-class-names": titleClassesNames,
            "input-class-names": inputClassesNames
            // "parent-element": null
        },
        "height": {
            "name": "height",
            "title": "Height (m):",
            "default-value": defaultInputValue,
            "title-class-names": titleClassesNames,
            "input-class-names": inputClassesNames
            // "parent-element": null
        },
        "radius": {
            "name": "radius",
            "title": "Radius (m):",
            "default-value": defaultInputValue,
            "title-class-names": titleClassesNames,
            "input-class-names": inputClassesNames
            // "parent-element": null
        }
    },
    "result-object": {
        "square": {
            "name": "square",
            "title": "Surface area:",
            "default-value": defaultResultValue,
            "number-of-decimal-places": numberOfResultDecimalPlaces,
            "measure": measure,
            "title-class-name": resultTitleClassName,
            "main-class-names": resultMainClassesNames
            // "parent-element": null
        },
        "total-amount": {
            "name": "total-amount",
            "title": "Total amount:",
            "default-value": defaultResultValue,
            "number-of-decimal-places": numberOfResultDecimalPlaces,
            "measure": currency,
            "title-class-name": resultTitleClassName,
            "main-class-names": resultMainClassesNames
            // "parent-element": null
        }
    }
};

window.onload = function() {
    // Getting parent element
    // 
    // Note:
    // You can also get parent element by calling next functions
    // var parentElem = document.getElementsByTagName("body")[0];
    // or
    // var parentElem = document.getElementsByClassName("class-name")[0];
    var parentElem = document.getElementById("calc");
    initial(parentElem);
};

function initial(parentElem) {
    setTitlesOfStaticElements();
    loadImages();
    setImages();
    setParentElementToDynamicObjects(parentElem);
    setHandlersToStaticElements();
}

function setTitlesOfStaticElements() {
    var statObjs = staticObjects;
    for (var index in statObjs) {
        var statObj = statObjs[index];
        if (statObj["child-div-id"] == null) {
            continue;
        }
        var childDivId = statObj["child-div-id"];
        var childElem = document.getElementById(childDivId);
        childElem.innerHTML = statObj["title"]; 
    }
}

function loadImages() {
    var statObjs = staticObjects;
    var imgDir = statObjs["img-dir"];
    for (var index in statObjs) {
        var statObj = statObjs[index];
        var images = statObj["images"];
        if (images == null) {
            continue;
        }
        var imgDefaultSrc = imgDir + images["image-default-source"];
        var imgActiveSrc = imgDir + images["image-active-source"]; 
        var imgDefaultObj = new Image();
        var imgActiveObj = new Image();
        imgDefaultObj.src = imgDefaultSrc;
        imgActiveObj.src = imgActiveSrc;
    } 
}

function setImages(elem = null) {
    var statObjs = staticObjects;
    var imgDir = statObjs["img-dir"];
    for (var index in statObjs) {
        var statObj = statObjs[index];
        var imgId = statObj["img-id"];
        if (imgId == null) {
            continue;
        }
        var imgIdElem = document.getElementById(imgId);
        if ((elem != null) && (statObj["name"] == elem.id)) {
            var imgActiveSource = statObj["images"]["image-active-source"];
            imgActiveSource = imgDir + imgActiveSource;
            imgIdElem.src = imgActiveSource;
            continue;
        }
        var imgDefaultSource = statObj["images"]["image-default-source"];
        imgDefaultSource = imgDir + imgDefaultSource;
        imgIdElem.src = imgDefaultSource;
    }
}

function setParentElementToDynamicObjects(parentElem) {
    var dynObjs = dynamicObjects;
    for (var indexOfDynObj in dynObjs) {
        for (var indexOfInnerObj in dynObjs[indexOfDynObj]) {
            dynObjs[indexOfDynObj][indexOfInnerObj]["parent-element"] = parentElem;
        }
    }
}

function setHandlersToStaticElements() {
    var statObjs = staticObjects;
    for (var index in statObjs) {
        var statObj = statObjs[index];
        if (statObj["calculation-function"] == null) {
            continue;
        }
        var elemId = document.getElementById(index);
        elemId.onmouseout = function() {
            resizeChildElements(this, true);
        };
        elemId.onmouseover = function() {
            resizeChildElements(this);
        };
        elemId.onclick = function() {
            calcHandler(this);
        };
    }
}

function resizeChildElements(elem, reset = false) {
    changeImageSize(elem, reset);
    changeDivSize(elem, reset);
}

function changeImageSize(elem, reset = false) {
    var statObjs = staticObjects;
    var imgObjId = "img-id";
    var additionalImgClassNames = statObjs["additional-img-resize-class-names"];
    var currentElemOnly = true;
    resetAndSetAdditionalStyles(elem, imgObjId, additionalImgClassNames, currentElemOnly, reset);    
}

function changeDivSize(elem, reset = false) {
    var statObjs = staticObjects;
    var divObjId = "child-div-id";
    var additionalDivClassNames = statObjs["additional-div-resize-class-names"];
    var currentElemOnly = true;
    resetAndSetAdditionalStyles(elem, divObjId, additionalDivClassNames, currentElemOnly, reset);
}
 
function resetAndSetAdditionalStyles(elem, childObjId, additionalClassNames, currentElemOnly = false, reset = false) {
    var statObjs = staticObjects;
    var childIdForCurrentElement = "";
    if (elem != null) {
        childIdForCurrentElement = statObjs[elem.id][childObjId];
        if (currentElemOnly) {
            var childElemCurrent = document.getElementById(childIdForCurrentElement);
            if (reset) {
                childElemCurrent.classList.remove(additionalClassNames);
                return;
            }
            childElemCurrent.classList.add(additionalClassNames);
            return;
        }
    }
    for (var index in statObjs) {
        var childId = statObjs[index][childObjId];
        if (childId == null) {
            continue;
        }
        var childIdFlag = (childIdForCurrentElement == childId);
        var childElem = document.getElementById(childId);
        if (childIdFlag) {
            childElem.classList.add(additionalClassNames);
            continue;
        }
        childElem.classList.remove(additionalClassNames);
    }
}

function calcHandler(elem) {
    var statObjs = staticObjects;
    var dynObjs = dynamicObjects;
    removeAllDynamicElements(dynObjs);
    if (elem == null) {
        return;
    }
    setImages(elem);
    var childObjId = "child-div-id";
    var additionalClassNames = statObjs["additional-div-color-class-names"];
    resetAndSetAdditionalStyles(elem, childObjId, additionalClassNames);

    var dynInputObjects = dynObjs["input-object"];
    var dynResultObjects = dynObjs["result-object"];
    
    var arrayOfStringNames = statObjs[elem.id]["dyn-elements"];
    var arrayOfInputObjects = createArrayOfInputObjectsFromStringArray(arrayOfStringNames, dynInputObjects);
    var arrayOfInputElements = [];
    for (var index in arrayOfInputObjects) {
        var inputObject = arrayOfInputObjects[index];
        arrayOfInputElements[index] = createElementsDivWithInput(inputObject);
    }
    
    var s = dynResultObjects["square"];
    var tAmount = dynResultObjects["total-amount"];
    var squareDiv = createResultDiv(s);
    var totalAmountDiv = createResultDiv(tAmount);

    var squareLocalObj = {
        "res-elem": squareDiv,
        "res-obj": s
    };
    var totalAmountLocalObj = {
        "res-elem": totalAmountDiv,
        "res-obj": tAmount
    };
    var arrayOfLocalResultObjects = [squareLocalObj, totalAmountLocalObj];
    var func = statObjs[elem.id]["calculation-function"];
    for (var index in arrayOfInputElements) {
        var inputElement = arrayOfInputElements[index];
        inputElement.onkeyup = function() {
            calcInputHandler(func, arrayOfInputElements, arrayOfLocalResultObjects);
        };
    }
}

function calcInputHandler(func, arrayOfInputElements, arrayOfLocalResultObjects) {
    var arrayOfValues = [];
    for (var index in arrayOfInputElements) {
        arrayOfValues.push(arrayOfInputElements[index].value);
    }

    var square = func(arrayOfValues);
    var totalAmount = totalAmountCalc(square, price);

    arrayOfLocalResultObjects[0]["value"] = square;
    arrayOfLocalResultObjects[1]["value"] = totalAmount;
    
    for (var index in arrayOfLocalResultObjects) {
        var resElem = arrayOfLocalResultObjects[index]["res-elem"];
        var resObj = arrayOfLocalResultObjects[index]["res-obj"];
        var value = arrayOfLocalResultObjects[index]["value"];
        updateResultDiv(resElem, resObj, value);
    }
}

function createArrayOfInputObjectsFromStringArray(arrayOfStringNames, dynInputObjects) {
    var arrayOfInputObjects = [];
    for (var index in arrayOfStringNames) {
        objName = arrayOfStringNames[index];   
        arrayOfInputObjects[index] = dynInputObjects[objName]; 
    }
    return arrayOfInputObjects;
}

function createElementsDivWithInput(dynamicObj) {
    var elemIdName = dynamicObj["name"];
    var elemTopIdName = elemIdName + "-top";
    var parentElem = dynamicObj["parent-element"];     
    var elemTop = document.getElementById(elemTopIdName);
    if (elemTop == null) {
        elemTop = document.createElement("div");
        elemTop.id = elemTopIdName;
        parentElem.appendChild(elemTop);
    }

    elemInput = document.createElement("input");
    elemInput.id = elemIdName;
    parentElem.appendChild(elemInput);

    var arrayOfClasses = dynamicObj["title-class-names"];
    elemTop.classList.add(arrayOfClasses);
    elemTop.innerHTML = dynamicObj["title"];     

    arrayOfClasses = dynamicObj["input-class-names"];
    elemInput.classList.add(arrayOfClasses);
    elemInput.value = dynamicObj["default-value"];

    return elemInput;
}

function removeElementsWithInput(obj) {
    var elemInputIdName = obj["name"];
    var elemTopIdName = elemInputIdName + "-top";   
    elemTopId = document.getElementById(elemTopIdName);
    elemInputId = document.getElementById(elemInputIdName);
    if ((elemTopId != null) && (elemTopId.parentNode != null)) {
        elemTopId.parentNode.removeChild(elemTopId);
    }
    if ((elemInputId != null) && (elemInputId.parentNode != null)) {
        elemInputId.parentNode.removeChild(elemInputId);
    }
}

function removeAllDynamicElements(dynamicObjects) {
    var dynInputObjects = dynamicObjects["input-object"];
    var dynResultObjects = dynamicObjects["result-object"];
    for (var objId in dynInputObjects) {
        removeElementsWithInput(dynInputObjects[objId]);
    }
    for (var objId in dynResultObjects) {
        removeResultDiv(dynResultObjects[objId]);
    }
}

function createResultDiv(resultObj) {
    var resultIdName = resultObj["name"];
    var res = document.createElement("div");
    res.id = resultIdName;
    resultObj["parent-element"].appendChild(res);

    var arrayOfClasses = resultObj["main-class-names"];
    res.classList.add(arrayOfClasses);
    var resValue = resultObj["default-value"];
    formatOutputString(res, resultObj, resValue);

    return res;
}

function formatOutputString(resElem, resObj, resValue) {
    var numberOfDecimalPlaces = resObj["number-of-decimal-places"];
    resValue = parseFloat(resValue);
    resValue = resValue.toFixed(numberOfDecimalPlaces);
    resStr = "<span class=\"" + resObj["title-class-name"] + "\">" + resObj["title"] + "</span>" + " " + resValue + " " + resObj["measure"];
    resElem.innerHTML = resStr;  
}

function updateResultDiv(resElem, resObj, resValue) {
    formatOutputString(resElem, resObj, resValue);
}

function removeResultDiv(resultObj) {
    var resultIdName = resultObj["name"];
    var res = document.getElementById(resultIdName);
    if ((res != null) && (res.parentNode != null)) {
        res.parentNode.removeChild(res);
    }
}

function roundPipeCalc(arrayOfValues) {
    length = parseFloat(arrayOfValues[0]);
    radius = parseFloat(arrayOfValues[1]);
    var res = 0.0;
    if ((length.toString() == "NaN") || (radius.toString() == "NaN")) {
        return res;
    }
    if ((length <= 0) || (radius <= 0)) {
        return res;
    }
    res = 2 * Math.PI * radius * length;
    return res;
}

function profilePipeCalc(arrayOfValues) {
    length = parseFloat(arrayOfValues[0]);
    width = parseFloat(arrayOfValues[1]);
    height = parseFloat(arrayOfValues[2]);
    var res = 0.0;
    if ((length.toString() == "NaN") || (width.toString() == "NaN") || (height.toString() == "NaN")) {
        return res;
    }
    if ((length <= 0) || (width <= 0) || (height <= 0)) {
        return res;
    }
    res = 2 * length * width * height;
    return res;
}

function stripCalc(arrayOfValues) {
    length = parseFloat(arrayOfValues[0]);
    width = parseFloat(arrayOfValues[1]);
    var res = 0.0;
    if ((length.toString() == "NaN") || (width.toString() == "NaN")) {
        return res.toFixed();
    }
    if ((length <= 0) || (width <= 0)) {
        return res.toFixed(2);
    }
    res = 2 * length * width;
    return res;
}

function angleCalc(arrayOfValues) {
    res = 2 * stripCalc(arrayOfValues);
    return res;
}

function totalAmountCalc(square, price) {
    var totalAmount = square * price;
    return totalAmount;
}       
