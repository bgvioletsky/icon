let file = "https://cdn.jsdelivr.net/gh/bgvioletsky/icon@/main.js";
let relyfile = "";
if (fileExist("hiker://files/libs/" + md5(file) + ".js")) {
  relyfile = file;
} 
if (relyfile == "") {
  let cjFile = request(file, { timeout: 3000 });
  if (cjFile.indexOf("nowVersion") > -1) {
    relyfile = file;
  } 
}
