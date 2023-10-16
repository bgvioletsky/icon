let file = "https://ghproxy.net/https://raw.githubusercontent.com/bgvioletsky/icon/main/main.js";
let file1="https://cdn.jsdelivr.net/gh/bgvioletsky/icon@0.0.2/main.js"
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
