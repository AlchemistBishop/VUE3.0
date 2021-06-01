/*
验证邮箱
*/ 
export function validateEmail(value){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(value) ? true : false

}
/*
验证密码 密码需为6-20位字母数字或字符
*/ 
export function validatePassword(value){
    let reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{6,20}$/;
    return !reg.test(value) ? true : false
}
/*
验证验证码
*/
export function validateCode(value){
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(value) ? true : false
}