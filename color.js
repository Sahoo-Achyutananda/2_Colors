export function convertRGBAtoHex(rgbaColor){
    let values = rgbaColor.match(/\d+(\.\d+)?/g);
    let r = Number(values[0]).toString(16).padStart(2,0);
    let g = Number(values[1]).toString(16).padStart(2,0);
    let b = Number(values[2]).toString(16).padStart(2,0);
    let a;
    if(values[3])
        a = (Math.floor(Number(values[3])*255)).toString(16).padStart(2,'0');
    else
        a = "ff"

    return `#${r}${g}${b}${a}`
}

export function convertHexToRGBA(hexColor){
    // do slicing properly - the 2nd argument is not inclusive, first argument is inclusive
    let r = parseInt(hexColor.slice(1,3), 16);
    let g = parseInt(hexColor.slice(3,5), 16);
    let b = parseInt(hexColor.slice(5,7), 16);
    let a = (parseInt(hexColor.slice(7,9), 16)/255).toFixed(2) || 1;

    return `rgba(${r}, ${g}, ${b}, ${a})`
}

