let file = "https://raw.githubusercontent.com/bgvioletsky/icon/main/main.js";
let file1 =
  "https://ghproxy.net/https://raw.githubusercontent.com/bgvioletsky/icon/main/main.js";
let relyfile = "";
if (fileExist("hiker://files/libs/" + md5(file) + ".js")) {
  relyfile = file;
} else if (fileExist("hiker://files/libs/" + md5(file1) + ".js")) {
  relyfile = file1;
}
if (relyfile == "") {
  let cjFile = request(file, { timeout: 3000 });
  if (cjFile.indexOf("nowVersion") > -1) {
    relyfile = file;
  } else {
    let cjFile = request(file1, { timeout: 3000 });
    if (cjFile.indexOf("nowVersion") > -1) {
      relyfile = file1;
    }
  }
}
