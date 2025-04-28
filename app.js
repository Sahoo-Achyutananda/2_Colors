import {convertRGBAtoHex} from './color.js';

let rightButton = document.getElementById('rightclick');
let rightSide = document.getElementsByClassName('right')[0];
let rightSlider = document.getElementById('rightalpha');

let leftSide = document.getElementsByClassName("left")[0];
let leftButton = document.getElementById('leftclick');
let leftSlider = document.getElementById('leftalpha');

let leftRedSlider = document.getElementById("leftred");
let leftGreenSlider = document.getElementById("leftgreen");
let leftBlueSlider = document.getElementById("leftblue");

let rightRedSlider = document.getElementById("rightred");
let rightGreenSlider = document.getElementById("rightgreen");
let rightBlueSlider = document.getElementById("rightblue");

let lowerContainer = document.querySelector('.lower-container');

let gradientAngle = document.getElementById('gradient-angle-slider');

function updateGradient(option) {
    // Learn more about getComputedStyle()
    let leftColor = window.getComputedStyle(document.querySelector(".left")).backgroundColor;
    let rightColor = window.getComputedStyle(document.querySelector(".right")).backgroundColor;

    if(option === "linear"){
        lowerContainer.style.background = `linear-gradient(to right, ${leftColor}, ${rightColor})`;
        gradientAngle.value = 90;
    }else if(option === "radial"){
        lowerContainer.style.background = `radial-gradient(${leftColor}, ${rightColor})`;
    }else if(option === "conic"){
        lowerContainer.style.background = `conic-gradient(${leftColor}, ${rightColor})`;
    }
}

function resetToLinear(){
    let gradientBox = document.querySelectorAll(".gradient-box");
    gradientBox.forEach((x)=>{
        x.classList.remove('selected');
    })

    document.getElementById("linear").classList.add('selected');
}

function randomRGBA(){
    // rgb color format - rgb (0-255,0-255,0-255)
    let red = Math.floor(Math.random() * 256); // NOTE : In Math.random() , 1 is excluded .. Therefore we set the limit to 256 instead of 255
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let alpha = parseInt("1");

    return {
        red : red,
        green : green,
        blue: blue,
        alpha: alpha,
    }
}
function randomHex(){
    // hex color format - #ffffff
    return "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6,0) + "ff";
}

rightButton.addEventListener("click", ()=>{
    let rgb = randomRGBA();
    let rgbString = `rgb(${rgb.red},${rgb.green},${rgb.blue},${rgb.alpha})`;
    let hexString = convertRGBAtoHex(rgbString);
    document.getElementsByClassName("right")[0].style.backgroundColor = rgbString;

    let rgb_right = document.querySelector(".rgb-right");
    let hex_right = document.querySelector(".hex-right");

    rgb_right.querySelector(".red").textContent = rgb.red;
    rgb_right.querySelector(".green").textContent = rgb.green;
    rgb_right.querySelector(".blue").textContent = rgb.blue;
    rgb_right.querySelector(".alpha").textContent = rgb.alpha;

    hex_right.querySelector(".red").textContent = hexString.slice(1,3);
    hex_right.querySelector(".green").textContent = hexString.slice(3,5);
    hex_right.querySelector(".blue").textContent = hexString.slice(5,7);
    hex_right.querySelector(".alpha").textContent = hexString.slice(7,9);

    rightSlider.value = 100;
    rightRedSlider.value = rgb.red;
    rightBlueSlider.value = rgb.blue;
    rightGreenSlider.value = rgb.green;

    gradientAngle.value = 90;

    updateGradient('linear');
    resetToLinear();
})

leftButton.addEventListener("click", ()=>{
    let rgb = randomRGBA();
    let rgbString = `rgb(${rgb.red},${rgb.green},${rgb.blue},${rgb.alpha})`;
    let hexString = convertRGBAtoHex(rgbString);
    document.getElementsByClassName("left")[0].style.backgroundColor = rgbString;

    let rgb_left = document.querySelector(".rgb-left");
    let hex_left = document.querySelector(".hex-left");

    rgb_left.querySelector(".red").textContent = rgb.red;
    rgb_left.querySelector(".green").textContent = rgb.green;
    rgb_left.querySelector(".blue").textContent = rgb.blue;
    rgb_left.querySelector(".alpha").textContent = rgb.alpha;

    hex_left.querySelector(".red").textContent = hexString.slice(1,3);
    hex_left.querySelector(".green").textContent = hexString.slice(3,5);
    hex_left.querySelector(".blue").textContent = hexString.slice(5,7);
    hex_left.querySelector(".alpha").textContent = hexString.slice(7,9);

    // resetting the slider value to 100
    leftSlider.value = 100;
    leftRedSlider.value = rgb.red;
    leftBlueSlider.value = rgb.blue;
    leftGreenSlider.value = rgb.green;

    gradientAngle.value = 90;

    updateGradient('linear');
    resetToLinear();
})


// Handlig the ALPHA Value ---- 
// initially i made it to listen "change" -> it affected the view only once
// later i changed it to "input" ->affected the BG as i rolled the slider 
leftSlider.addEventListener("input", ()=>{
    let alpha = (leftSlider.value)/100; // generating aplha values 
    // using a regex to extract the r,g and b values
    let currColor = leftSide.style.backgroundColor.match(/\d+(\.\d+)?/g) || [31, 143, 255, 1] ;
    let newColor = `rgb(${currColor[0]},${currColor[1]},${currColor[2]},${alpha})` ;

    document.querySelector('.hex-left').querySelector('.alpha').textContent = (Math.floor(alpha*255)).toString(16).padStart(2,'0');
    document.querySelector('.rgb-left').querySelector('.alpha').textContent = alpha;
    leftSide.style.backgroundColor = newColor;

    updateGradient('linear');
    resetToLinear();

})

leftRedSlider.addEventListener("input", ()=>{
    let red = leftRedSlider.value; // generating aplha values 
    // using a regex to extract the r,g and b values
    let currColor = leftSide.style.backgroundColor.match(/\d+(\.\d+)?/g) || [31, 143, 255, 1] ;

    // added || 1 - to avoid a bug 
    let newColor = `rgb(${red},${currColor[1]},${currColor[2]},${currColor[3] || 1})` ;
    // console.log(newColor);
    document.querySelector('.hex-left').querySelector('.red').textContent = (Math.floor(red)).toString(16).padStart(2,'0');
    document.querySelector('.rgb-left').querySelector('.red').textContent = red;
    leftSide.style.backgroundColor = newColor;

    updateGradient('linear');
    resetToLinear();

})


leftGreenSlider.addEventListener("input", ()=>{
    let green = leftGreenSlider.value; 
    // using a regex to extract the r,g and b values
    let currColor = leftSide.style.backgroundColor.match(/\d+(\.\d+)?/g) || [31, 143, 255, 1] ;
    let newColor = `rgb(${currColor[0]},${green},${currColor[2]},${currColor[3] || 1})` ;

    document.querySelector('.hex-left').querySelector('.green').textContent = (Math.floor(green)).toString(16).padStart(2,'0');
    document.querySelector('.rgb-left').querySelector('.green').textContent = green;
    leftSide.style.backgroundColor = newColor;

    updateGradient('linear');
    resetToLinear();

})

leftBlueSlider.addEventListener("input", ()=>{
    let blue = leftBlueSlider.value; // generating aplha values 
    // using a regex to extract the r,g and b values
    let currColor = leftSide.style.backgroundColor.match(/\d+(\.\d+)?/g) || [31, 143, 255, 1] ;
    let newColor = `rgb(${currColor[0]},${currColor[1]},${blue},${currColor[3] || 1})` ;

    document.querySelector('.hex-left').querySelector('.blue').textContent = (Math.floor(blue)).toString(16).padStart(2,'0');
    document.querySelector('.rgb-left').querySelector('.blue').textContent = blue;
    leftSide.style.backgroundColor = newColor;

    
    updateGradient('linear');
    resetToLinear();

})

rightSlider.addEventListener("input", ()=>{
    let alpha = (rightSlider.value)/100; // generating aplha values 
    // using a regex to extract the r,g and b values
    let currColor = rightSide.style.backgroundColor.match(/\d+(\.\d+)?/g) || [248, 235, 58, 1];
    let newColor = `rgb(${currColor[0]},${currColor[1]},${currColor[2]},${alpha})` ;
    
    document.querySelector('.hex-right').querySelector('.alpha').textContent = (Math.floor(alpha*255)).toString(16).padStart(2,'0');
    document.querySelector('.rgb-right').querySelector('.alpha').textContent = alpha;

    rightSide.style.backgroundColor = newColor;

    updateGradient('linear');
    resetToLinear();
})

rightRedSlider.addEventListener("input", ()=>{
    let red = rightRedSlider.value; // generating aplha values 
    // using a regex to extract the r,g and b values
    let currColor = rightSide.style.backgroundColor.match(/\d+(\.\d+)?/g) || [248, 235, 58, 1] ;

    // added || 1 - to avoid a bug 
    let newColor = `rgb(${red},${currColor[1]},${currColor[2]},${currColor[3] || 1})` ;
    // console.log(newColor);
    document.querySelector('.hex-right').querySelector('.red').textContent = (Math.floor(red)).toString(16).padStart(2,'0');
    document.querySelector('.rgb-right').querySelector('.red').textContent = red;
    rightSide.style.backgroundColor = newColor;

    updateGradient('linear');
    resetToLinear();
})


rightGreenSlider.addEventListener("input", ()=>{
    let green =rightGreenSlider.value; 
    // using a regex to extract the r,g and b values
    let currColor = rightSide.style.backgroundColor.match(/\d+(\.\d+)?/g) || [248, 235, 58, 1] ;
    let newColor = `rgb(${currColor[0]},${green},${currColor[2]},${currColor[3] || 1})` ;

    document.querySelector('.hex-right').querySelector('.green').textContent = (Math.floor(green)).toString(16).padStart(2,'0');
    document.querySelector('.rgb-right').querySelector('.green').textContent = green;
    rightSide.style.backgroundColor = newColor;

    updateGradient('linear');
    resetToLinear();

})

rightBlueSlider.addEventListener("input", ()=>{
    let blue = rightBlueSlider.value; // generating aplha values 
    // using a regex to extract the r,g and b values
    let currColor = rightSide.style.backgroundColor.match(/\d+(\.\d+)?/g) || [248, 235, 58, 1] ;
    let newColor = `rgb(${currColor[0]},${currColor[1]},${blue},${currColor[3] || 1})` ;

    document.querySelector('.hex-right').querySelector('.blue').textContent = (Math.floor(blue)).toString(16).padStart(2,'0');
    document.querySelector('.rgb-right').querySelector('.blue').textContent = blue;
    rightSide.style.backgroundColor = newColor;

    updateGradient('linear');
    resetToLinear();

})


// Copy Texts - 

let hexLeftCopy = document.querySelector('.hex-left-copy');
let rgbLeftCopy = document.getElementsByClassName('rgb-left-copy')[0];

let hexRightCopy = document.querySelector('.hex-right-copy');
let rgbRightCopy = document.getElementsByClassName('rgb-right-copy')[0];

rgbLeftCopy.addEventListener("click", ()=>{
    let col = window.getComputedStyle(leftSide).backgroundColor;
    navigator.clipboard.writeText(col);
})

hexLeftCopy.addEventListener("click", ()=>{
    let col = window.getComputedStyle(leftSide).backgroundColor;
    let col_hex = convertRGBAtoHex(col);
    navigator.clipboard.writeText(col_hex);
})

rgbRightCopy.addEventListener("click", ()=>{
    let col = window.getComputedStyle(rightSide).backgroundColor;
    navigator.clipboard.writeText(col);
})

hexRightCopy.addEventListener("click", ()=>{
    let col = window.getComputedStyle(rightSide).backgroundColor;
    let col_hex = convertRGBAtoHex(col);
    navigator.clipboard.writeText(col_hex);
})


// Gradient Angle - 


gradientAngle.addEventListener("input", ()=>{
    let angle = gradientAngle.value;
    let selectedGradient = document.querySelector('.selected').id;
    let updatedGradient = updateGradientAngle(selectedGradient,angle);

    console.log(selectedGradient, updateGradient);
    lowerContainer.style.background = updatedGradient;
})

function updateGradientAngle(option = 'linear',angle = 0){
    let leftColor = window.getComputedStyle(leftSide).backgroundColor;
    let rightColor = window.getComputedStyle(rightSide).backgroundColor;

    if(option ==='linear')
        return `linear-gradient(${angle}deg, ${leftColor}, ${rightColor})`;
    else if(option === 'conic')
        return `conic-gradient(from ${angle}deg, ${leftColor}, ${rightColor})`;
}

let gradientCopy = document.querySelector('.gradient-copy');

gradientCopy.addEventListener("click", ()=>{
    navigator.clipboard.writeText(getComputedStyle(lowerContainer).background);
})


// gradient type selection

let gradientBox = document.querySelectorAll('.gradient-box');

// for of loop is used in array ,  forEach is used in NodeLists
gradientBox.forEach((x)=>{
    x.addEventListener("click", ()=>{
        gradientBox.forEach((x)=>{
            x.classList.remove('selected');
        })
        x.classList.add('selected');

        // console.log("selected : ", gradientBox);
        updateGradient(x.id);
        
    })
});










