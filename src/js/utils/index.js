export function device(){
    if (!navigator.userAgent.match(/mobile/i)) {
        return false
    }else{
        return true;
    }
}
export function getEle(id){
    return document.getElementById(id);
}
// import _resizeCanvas from './resizeCanvas'
// export function resizeCanvas(id){
//     return _resizeCanvas(id)
// }
