
module.exports.generate = function () {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const stringLength = 16;
    let randomstring = '';
    for (let i=0; i<stringLength; i+=1) {
        const rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
        }
    return randomstring;
}