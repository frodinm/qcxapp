export const jsonHelper = (input) =>{
    let temp = "";
    let final = "";
    let x = JSON.stringify(input);
    x = x.split(":")
    x.forEach((e)=>{temp = temp+": "+e})
    temp = temp.split(",")
    temp.forEach((e)=>{final = final+", "+e})
    final = final.substring(4,100)

    return final;
}