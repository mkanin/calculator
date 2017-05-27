/*
*  Copyright (c) 2017, Mikhail Kanin
*  All rights reserved.
*
*  See LICENSE.txt for licensing information.
*
*  Calculator of painting of building constructions' costs (www.mkanin.com)
*
*  Pay attention!
*  This version of calculator includes obfuscated part of code.
*  If you like to get full non-obfuscated version of it, please contact with copyright owner.
*/

var numberOfResultDecimalPlaces=2,dimension="m2",staticObjects={"round-pipe":{name:"round-pipe",title:"Round pipe or armature","img-id":"round-pipe-img",images:{"image-default-source":"round-pipe.png","image-active-source":"round-pipe-active.png"},"child-div-id":"round-pipe-child","dyn-elements":["length","radius"],"calculation-function":roundPipeCalc},"profile-pipe":{name:"profile-pipe",title:"Profile pipe","img-id":"profile-pipe-img",images:{"image-default-source":"profile-pipe.png","image-active-source":"profile-pipe-active.png"},
"child-div-id":"profile-pipe-child","dyn-elements":["length","width","height"],"calculation-function":profilePipeCalc},strip:{name:"strip",title:"Strip","img-id":"strip-img",images:{"image-default-source":"strip.png","image-active-source":"strip-active.png"},"child-div-id":"strip-child","dyn-elements":["length","width"],"calculation-function":stripCalc},angle:{name:"angle",title:"Angle","img-id":"angle-img",images:{"image-default-source":"angle.png","image-active-source":"angle-active.png"},"child-div-id":"angle-child",
"dyn-elements":["length","width"],"calculation-function":angleCalc},"img-dir":imgDir,"additional-div-color-class-names":staticAdditionalDivColorClassesNames,"additional-div-resize-class-names":staticAdditionalDivResizeClassesNames,"additional-img-resize-class-names":staticAdditionalImgResizeClassesNames},dynamicObjects={"input-object":{length:{name:"length",title:"Length (m):","default-value":defaultInputValue,"title-class-names":titleClassesNames,"input-class-names":inputClassesNames},width:{name:"width",
title:"Width (m):","default-value":defaultInputValue,"title-class-names":titleClassesNames,"input-class-names":inputClassesNames},height:{name:"height",title:"Height (m):","default-value":defaultInputValue,"title-class-names":titleClassesNames,"input-class-names":inputClassesNames},radius:{name:"radius",title:"Radius (m):","default-value":defaultInputValue,"title-class-names":titleClassesNames,"input-class-names":inputClassesNames}},"result-object":{square:{name:"square",title:"Surface area:","default-value":defaultResultValue,
"number-of-decimal-places":numberOfResultDecimalPlaces,measure:dimension,"title-class-name":resultTitleClassName,"main-class-names":resultMainClassesNames},"total-amount":{name:"total-amount",title:"Total amount:","default-value":defaultResultValue,"number-of-decimal-places":numberOfResultDecimalPlaces,measure:currency,"title-class-name":resultTitleClassName,"main-class-names":resultMainClassesNames}}};window.onload=function(){var a=document.getElementById("calc");initial(a)};
function initial(a){setTitlesOfStaticElements();loadImages();setImages();setParentElementToDynamicObjects(a);setHandlersToStaticElements()}function setTitlesOfStaticElements(){var a=staticObjects,b;for(b in a){var c=a[b];null!=c["child-div-id"]&&(document.getElementById(c["child-div-id"]).innerHTML=c.title)}}
function loadImages(){var a=staticObjects,b=a["img-dir"],c;for(c in a){var e=a[c].images;if(null!=e){var d=b+e["image-default-source"],e=b+e["image-active-source"],f=new Image,g=new Image;f.src=d;g.src=e}}}function setImages(a){a=void 0===a?null:a;var b=staticObjects,c=b["img-dir"],e;for(e in b){var d=b[e],f=d["img-id"];null!=f&&(f=document.getElementById(f),d=null!=a&&d.name==a.id?d.images["image-active-source"]:d.images["image-default-source"],d=c+d,f.src=d)}}
function setParentElementToDynamicObjects(a){var b=dynamicObjects,c;for(c in b)for(var e in b[c])b[c][e]["parent-element"]=a}function setHandlersToStaticElements(){var a=staticObjects,b;for(b in a)if(null!=a[b]["calculation-function"]){var c=document.getElementById(b);c.onmouseout=function(){resizeChildElements(this,!0)};c.onmouseover=function(){resizeChildElements(this)};c.onclick=function(){calcHandler(this)}}}
function resizeChildElements(a,b){b=void 0===b?!1:b;changeImageSize(a,b);changeDivSize(a,b)}function changeImageSize(a,b){resetAndSetAdditionalStyles(a,"img-id",staticObjects["additional-img-resize-class-names"],!0,void 0===b?!1:b)}function changeDivSize(a,b){resetAndSetAdditionalStyles(a,"child-div-id",staticObjects["additional-div-resize-class-names"],!0,void 0===b?!1:b)}
function resetAndSetAdditionalStyles(a,b,c,e,d){e=void 0===e?!1:e;d=void 0===d?!1:d;var f=staticObjects,g="";if(null!=a&&(g=f[a.id][b],e)){b=document.getElementById(g);if(d){b.classList.remove(c);return}b.classList.add(c);return}for(var h in f)a=f[h][b],null!=a&&(d=g==a,a=document.getElementById(a),d?a.classList.add(c):a.classList.remove(c))}
function calcHandler(a){var b=staticObjects,c=dynamicObjects;removeAllDynamicElements(c);if(null!=a){setImages(a);resetAndSetAdditionalStyles(a,"child-div-id",b["additional-div-color-class-names"]);var e=c["result-object"],c=createArrayOfInputObjectsFromStringArray(b[a.id]["dyn-elements"],c["input-object"]),d=[],f;for(f in c)d[f]=createElementsDivWithInput(c[f]);var c=e.square,e=e["total-amount"],g=createResultDiv(c),h=createResultDiv(e),k=[{"res-elem":g,"res-obj":c},{"res-elem":h,"res-obj":e}],l=
b[a.id]["calculation-function"];for(f in d)d[f].onkeyup=function(){calcInputHandler(l,d,k)}}}function calcInputHandler(a,b,c){var e=[],d;for(d in b)e.push(b[d].value);a=a(e);b=totalAmountCalc(a,price);c[0].value=a;c[1].value=b;for(d in c)updateResultDiv(c[d]["res-elem"],c[d]["res-obj"],c[d].value)}function createArrayOfInputObjectsFromStringArray(a,b){var c=[],e;for(e in a)objName=a[e],c[e]=b[objName];return c}
function createElementsDivWithInput(a){var b=a.name,c=b+"-top",e=a["parent-element"],d=document.getElementById(c);null==d&&(d=document.createElement("div"),d.id=c,e.appendChild(d));elemInput=document.createElement("input");elemInput.id=b;e.appendChild(elemInput);b=a["title-class-names"];d.classList.add(b);d.innerHTML=a.title;b=a["input-class-names"];elemInput.classList.add(b);elemInput.value=a["default-value"];return elemInput}
function removeElementsWithInput(a){a=a.name;elemTopId=document.getElementById(a+"-top");elemInputId=document.getElementById(a);null!=elemTopId&&null!=elemTopId.parentNode&&elemTopId.parentNode.removeChild(elemTopId);null!=elemInputId&&null!=elemInputId.parentNode&&elemInputId.parentNode.removeChild(elemInputId)}function removeAllDynamicElements(a){var b=a["input-object"];a=a["result-object"];for(var c in b)removeElementsWithInput(b[c]);for(c in a)removeResultDiv(a[c])}
function createResultDiv(a){var b=a.name,c=document.createElement("div");c.id=b;a["parent-element"].appendChild(c);c.classList.add(a["main-class-names"]);formatOutputString(c,a,a["default-value"]);return c}function formatOutputString(a,b,c){var e=b["number-of-decimal-places"];c=parseFloat(c);c=c.toFixed(e);resStr='<span class="'+b["title-class-name"]+'">'+b.title+"</span> "+c+" "+b.measure;a.innerHTML=resStr}function updateResultDiv(a,b,c){formatOutputString(a,b,c)}
function removeResultDiv(a){a=document.getElementById(a.name);null!=a&&null!=a.parentNode&&a.parentNode.removeChild(a)}function roundPipeCalc(a){length=parseFloat(a[0]);radius=parseFloat(a[1]);return"NaN"==length.toString()||"NaN"==radius.toString()||0>=length||0>=radius?0:a=2*Math.PI*radius*length}
function profilePipeCalc(a){length=parseFloat(a[0]);width=parseFloat(a[1]);height=parseFloat(a[2]);return"NaN"==length.toString()||"NaN"==width.toString()||"NaN"==height.toString()||0>=length||0>=width||0>=height?0:a=2*length*width*height}function stripCalc(a){length=parseFloat(a[0]);width=parseFloat(a[1]);a=0;return"NaN"==length.toString()||"NaN"==width.toString()?a.toFixed():0>=length||0>=width?a.toFixed(2):a=2*length*width}function angleCalc(a){return res=2*stripCalc(a)}
function totalAmountCalc(a,b){return a*b};
