var dict = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

function randomID() {
    var num1 = Math.floor(Math.random() * 62);
    var num2 = Math.floor(Math.random() * 62);
    var num3 = Math.floor(Math.random() * 62);
    var num4 = Math.floor(Math.random() * 62);
    return dict[num1] + dict[num2] + dict[num3] + dict[num4];
}