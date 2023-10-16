// bgcode
const method = require((config.依赖).replace("main.js",'method.js'));

function F() {
  Version();
  var d = [];
  let list = [];
  let x = [];
  x.push({
    title: "““””<font color='#FF69B4'>" + "设置" + "</font>",
    url: $("hiker://empty#noRecordHistory##noHistory#").rule(() => {
      require(config.依赖);
      setting();
    }),
    col_type: "scroll_button",
  });
  if (fileExist("hiker://files/bgHouse/icon/json/localStorage.json")) {
    list = require("hiker://files/bgHouse/icon/json/localStorage.json");
    for (let index in list) {
      d.push({
        title:
          getMyVar("mainindex", "0") == index
            ? "““””<font color='#58D3F7'>" + list[index].dirname + "</font>"
            : "““””<font color='#22383e'>" + list[index].dirname + "</font>",
        url: $("#noLoading#").lazyRule((a) => {
          putMyVar("mainindex", a);
          refreshPage(true);
          return "hiker://empty";
        }, index),
        col_type: "scroll_button",
      });
    }
    var imgpath = method.getImg(
      "/storage/emulated/0/Android/data/com.example.hikerview/files/Documents/bgHouse/icon/src/" +
        list[eval(getMyVar("mainindex", "0"))].dirpath
    );
    d = d.concat(x);
    d.push(
      {
        col_type: "icon_2",
        title: "上传本地图片",
        pic_url: "hiker://files/bgHouse/src/system/19.svg",
        url:  $("","文件名").input((list,da)=>{
          return "fileSelect://" + $.toString((list,name,method) => {
            
            let dir =
              "hiker://files/bgHouse/icon/src/" +
              list[eval(getMyVar("mainindex", "0"))].dirpath +
              "/";
            
            let path = dir + name;
            method.copyFile(input, getPath(path).slice(7), true);   
            let message;
            if(getItem('warehouse',"0")=="1"){
                message = method.upload(
                getItem("token"),
                getItem("repoOwner"),
                getItem("repoName"),
                list[eval(getMyVar("mainindex", "0"))].dirpath,
                name,
                path
              );
            }
            if (message) {
              refreshPage(true);
              return "toast://本地添加成功";
            } else {
              refreshPage(true);
              return "toast://仓库添加成功";
            }
          }, list,input,da)
        },list,method)
      },
      {
        col_type: "icon_2",
        title: "上传链接图片",
        pic_url: "hiker://files/bgHouse/src/system/19.svg",
        url: $("","文件名").input((list)=>{
          return $("", "https|hiker|绝对地址").input((list,name) => {
          let method= require((config.依赖).replace("main.js",'method.js'));
          let dir =
            "hiker://files/bgHouse/icon/src/" +
            list[eval(getMyVar("mainindex", "0"))].dirpath +
            "/" +
            name;
          if (input.match(/http/g)) {
            downloadFile(input, dir);
          } else if (input.match(/hiker/g)) {
            input = input.replace(
              "hiker://files/",
              "/storage/emulated/0/Android/data/com.example.hikerview/files/Documents/"
            );
            method.copyFile(input, getPath(dir).slice(7), true);
          } else if (input.match(/\/storage/g)) {
            method.copyFile(input, getPath(dir).slice(7), true);
          } else {
            ("toast://请输入正确地址");
          }
          let message;
          if (getItem("warehouse", "0") == "1") {
            message = method.upload(
              getItem("token"),
              getItem("repoOwner"),
              getItem("repoName"),
              list[eval(getMyVar("mainindex", "0"))].dirpath,
              name,
              dir
            );
          }
          if (message) {
            refreshPage(true);
            return "toast://本地添加成功";
          } else {
            refreshPage(true);
            return "toast://仓库添加成功";
          }
        }, list,input)},list)
      }
    );
    for (let i in imgpath) {
      let pic_url= "hiker://files/bgHouse/icon/src/" + imgpath[i];
      let pic_url1;
      getItem("warehouse", "0") == "0"
        ? (pic_url1 = "hiker://files/bgHouse/icon/src/" + imgpath[i])
        : (pic_url1 =
            "https://cdn.jsdelivr.net/gh/" +
            getItem("repoOwner") +
            "/" +
            getItem("repoName") +
            "/" +
            imgpath[i]);
      d.push({
        title: imgpath[i].split("/")[1],
        url: $("#noLoading#").lazyRule((pic) => {
          copy(pic);
          return "hiker://empyt";
        }, pic_url1),
        extra: {
          longClick: [
            {
              title: " 删除 ",
              js: $.toString((aa,pic,a,b,c,d) => {
                deleteFile(pic);
                if(getItem("warehouse")=="1"){
                  let sha=aa.query(b,c,d).sha;
                  aa.delete_file(a,b,c,d,sha)
                }
                refreshPage(false);
                toast("图片已删除");
              }, method,pic_url,getItem("token"),getItem("repoOwner"),getItem("repoName"),imgpath[i]),
            },
          ],
        },
        pic_url: pic_url,
        col_type: list[eval(getMyVar("mainindex", "0"))].dirtype,
      });
    }
  } else {
    d = d.concat(x);
  }

  setResult(d);
}
//设置页面
function setting() {
  var d = [];
  d.push(
    {
      title: "仓库设置",
      url: $("hiker://empty#noRecordHistory##noHistory#").rule(() => {
        require(config.依赖);
        warehouse();
      }),
      col_type: "icon_small_4",
      pic_url: "https://cdn.jsdelivr.net/gh/bgvioletsky/test/system/18.svg",
    },
    {
      title: "api设置",
      url: $("hiker://empty#noRecordHistory##noHistory#").rule(() => {
        require(config.依赖);
        githubapi();
      }),
      col_type: "icon_small_4",
      pic_url: "https://cdn.jsdelivr.net/gh/bgvioletsky/test/system/21.svg",
    },
    {
      title: "文件夹设置",
      url: $("hiker://empty#noRecordHistory##noHistory#").rule(() => {
        require(config.依赖);
        whfiles();
      }),
      col_type: "icon_small_4",
      pic_url: "https://cdn.jsdelivr.net/gh/bgvioletsky/test/system/1.svg",
    },
    {
      title: "上传文件",
      url: $().lazyRule(() => {
        require(config.依赖);
        updatefile();
        return "toast://上传完成";
      }),
      col_type: "icon_small_4",
      pic_url: "https://cdn.jsdelivr.net/gh/bgvioletsky/test/system/12.svg",
    },
    {
      title: "版本号为: V"+getItem('Version'),
      url: $().lazyRule(() => {
        return "toast://版本号为: V"+getItem('Version','0.0.5');
      }),
      col_type: "text_icon",
      pic_url: "https://cdn.jsdelivr.net/gh/bgvioletsky/test/system/12.svg",
    }
  );
  setResult(d);
}
//用于设置GitHubapi
function githubapi() {
  var d = [];
  let api;

  d.push(
    {
      title: getItem("token", "") == "" ? "token:  " : getItem("token", ""),
      col_type: "icon_1_search",
      url: $(getItem("token", ""), "请输入token").input(() => {
        setItem("token", input);
        refreshPage(true);
      }),
    },
    {
      title:
        getItem("repoOwner", "") == ""
          ? "repoOwner:  "
          : getItem("repoOwner", ""),
      col_type: "icon_1_search",
      url: $(getItem("repoOwner", ""), "请输入repoOwner").input(() => {
        setItem("repoOwner", input);
        refreshPage(true);
      }),
    },
    {
      title:
        getItem("repoName", "") == "" ? "repoName:  " : getItem("repoName", ""),
      col_type: "icon_1_search",
      url: $(getItem("repoName", ""), "请输入repoName").input(() => {
        setItem("repoName", input);
        refreshPage(true);
      }),
    },
    {
      title: "测试",
      col_type: "text_3",
      url: $("#noLoading#").lazyRule((method) => {
        if (!fileExist("hiker://files/bgHouse/test/README.md")) {
          writeFile(
            `hiker://files/bgHouse/test/README.md`,
            "### 这是一个测试文件"
          );
        }
        let message = method.query(
          getItem("repoOwner", ""),
          getItem("repoName", ""),
          "test/README.md"
        );
        if ((message.name = "README.md")) {
          method.delete_file(
            getItem("token"),
            getItem("repoOwner"),
            getItem("repoName"),
            message.path,
            message.sha
          );
        }
        message = method.upload(
          getItem("token", ""),
          getItem("repoOwner", ""),
          getItem("repoName", ""),
          "test",
          "README.md",
          "hiker://files/bgHouse/test/README.md"
        );

        if (message.name == "README.md") {
          return "toast://测试成功";
        } else {
          return "toast://测试失败请重新修改相关内容";
        }
      }, method),
    },
    {
      title: "保存",
      url: $("#noLoading#").lazyRule(
        (a, b, c) => {
          let api = {
            token: a,
            repoOwner: b,
            repoName: c,
          };
          writeFile(
            "hiker://files/bgHouse/icon/json/api.json",
            JSON.stringify(api)
          );
          return "toast://保存成功";
        },
        getItem("token", ""),
        getItem("repoOwner", ""),
        getItem("repoName", "")
      ),
      col_type: "text_3",
    },
    {
      title: "删除",
      url: $("确定删除api").confirm(() => {
        setItem("token", "");
        setItem("repoOwner", "");
        setItem("repoName", "");
        refreshPage(true);
        deleteFile("hiker://files/bgHouse/icon/json/api.json");
        return "toast://api已删除";
      }),
      col_type: "text_3",
    }
  );
  setResult(d);
}

//用于设置仓库类型
function warehouse() {
  var d = [];
  d.push(
    {
      title: "本地链接",
      url: $("#noLoading#").lazyRule(
        (method, token, repoOwner, repoName) => {
          if (method.test_item(token, repoOwner, repoName)) {
            setItem("warehouse", "0");
            return "toast://网络链接设置失败未设置GitHubAPI";
          } else {
            if (getItem("warehouse", "0") == "0") {
              setItem("warehouse", "1");
              refreshPage(true);
              return "toast://网络链接设置成功";
            } else {
              setItem("warehouse", "0");
              refreshPage(true);
              return "toast://本地链接设置成功";
            }
          }
        },
        method,
        getItem("token",""),
        getItem("repoOwner",""),
        getItem("repoName","")
      ),
      pic_url:
        getItem("warehouse", "0") == "0"
          ? "https://cdn.jsdelivr.net/gh/bgvioletsky/test/system/kai.svg"
          : "https://cdn.jsdelivr.net/gh/bgvioletsky/test/system/guan.svg",
      col_type: "text_icon",
    },
    {
      title: "网络链接",
      url: $("#noLoading#").lazyRule(
        (method, token, repoOwner, repoName) => {
          if (method.test_item(token, repoOwner, repoName)) {
            setItem("warehouse", "0");
            return "toast://网络链接设置失败未设置GitHubAPI";
          } else {
            if (getItem("warehouse", "1") == "1") {
              setItem("warehouse", "0");
              refreshPage(true);
              return "toast://本地链接设置成功";
            } else {
              setItem("warehouse", "1");
              refreshPage(true);
              return "toast://网络链接设置成功";
            }
          }
        },
        method,
        getItem("token",""),
        getItem("repoOwner",""),
        getItem("repoName","")
      ),
      pic_url:
        getItem("warehouse", "0") == "1"
          ? "https://cdn.jsdelivr.net/gh/bgvioletsky/test/system/kai.svg"
          : "https://cdn.jsdelivr.net/gh/bgvioletsky/test/system/guan.svg",
      col_type: "text_icon",
    }
  );
  setResult(d);
}

//文件操作
function whfiles() {
  var d = [];
  d.push(
    {
      title: getMyVar("dirname", "")==""? "文件夹名":getMyVar("dirname"),
      col_type: "icon_1_search",
      desc: "文件夹名",
      url:$("","文件夹名称可随意填写").input(()=>{
        putMyVar("dirname",input);
        refreshPage(true);
        return "toast://你的路径是"+input; //在func函数中input表示选择的选项内容
      }),
    },
    {
      title: getMyVar("dirpath", "")==""? "文件夹路径":getMyVar("dirpath"),
      col_type: "icon_1_search",
      desc: "文件夹路径",
      url:$("","文件夹路径可随意填写").input(()=>{
        putMyVar("dirpath",input);
        refreshPage(true);
        return "toast://你的路径是"+input; //在func函数中input表示选择的选项内容
      }),
    },
    {
      title:getMyVar("dirtype", "")==""? "文件显示类型":getMyVar("dirtype"),
      col_type: "icon_1_search",
      url:$(["icon_4","icon_small_4","movie_2"],3,"请选择").select(()=>{
        putMyVar("dirtype",input)
        refreshPage(true);
        return "toast://你选择的是"+input; //在func函数中input表示选择的选项内容
      }),
      desc: "文件显示类型",
    },
    {
      title: "保存",
      col_type: "text_3",
      url: $().lazyRule((method) => {
        let data = [];
        if (fileExist("hiker://files/bgHouse/icon/json/localStorage.json")) {
          data = require("hiker://files/bgHouse/icon/json/localStorage.json");
        }
        if (
          getMyVar("dirname") != "" &&
          getMyVar("dirpath") != "" &&
          getMyVar("dirtype") != ""
        ) {
          if (method.test_repeat(data, getMyVar("dirpath"))) {
            for (let item of data) {
              if (item.dirpath === getMyVar("dirpath")) {
                const index = data.indexOf(item);
                data.splice(index, 1); // 在数组中删除该元素
              }
            }
            data.push({
              dirname: getMyVar("dirname"),
              dirpath: getMyVar("dirpath"),
              dirtype: getMyVar("dirtype"),
            });
            writeFile(
              "hiker://files/bgHouse/icon/json/localStorage.json",
              JSON.stringify(data)
            );
            method.createDir(getMyVar("dirpath"));
            refreshPage(true);
            return "toast://修改成功";
          }
          data.push({
            dirname: getMyVar("dirname"),
            dirpath: getMyVar("dirpath"),
            dirtype: getMyVar("dirtype"),
          });
          writeFile(
            "hiker://files/bgHouse/icon/json/localStorage.json",
            JSON.stringify(data)
          );
          method.createDir(getMyVar("dirpath"));
          refreshPage(true);
          return "toast://保存成功";
        } else {
          return "toast://请输入完整";
        }
      }, method),
    },
    {
      title: "删除",
      col_type: "text_3",
      url: $().lazyRule((method) => {
        let data = [];
        if (fileExist("hiker://files/bgHouse/icon/json/localStorage.json")) {
          if (getMyVar("dirpath") == "") {
            return "toast://请输入dirpath";
          }
          data = require("hiker://files/bgHouse/icon/json/localStorage.json");
          for (let item of data) {
            if (item.dirpath === getMyVar("dirpath")) {
              const index = data.indexOf(item);
              data.splice(index, 1); // 在数组中删除该元素
            }
          }
          putMyVar("dirname", ""),
            putMyVar("dirpath", ""),
            putMyVar("dirtype", "");
          if (data.length > 0) {
            writeFile(
              "hiker://files/bgHouse/icon/json/localStorage.json",
              JSON.stringify(data)
            );
          } else {
            deleteFile("hiker://files/bgHouse/icon/json/localStorage.json");
          }
          refreshPage(true);
          return "toast://删除成功";
        } else {
          return "toast://请保存后再操作";
        }
      }, method),
    },
    {
      title: "清除",
      col_type: "text_3",
      url: $().lazyRule(() => {
        putMyVar("dirname", ""),
          putMyVar("dirpath", ""),
          putMyVar("dirtype", "");
        refreshPage(true);
        return "toast://已清除";
      }),
    },
    {
      col_type: "line",
    }
  );
  if (fileExist("hiker://files/bgHouse/icon/json/localStorage.json")) {
    let list = require("hiker://files/bgHouse/icon/json/localStorage.json");
    if (list.length == 0) {
      d.push({
        title: "暂无文件夹📁",
        col_type: "text_1",
      });
    }
    for (let i in list) {
      d.push({
        title: "📁" + list[i].dirname,
        col_type: "text_1",
        url: $().lazyRule((file) => {
          putMyVar("dirname", file.dirname);
          putMyVar("dirpath", file.dirpath);
          putMyVar("dirtype", file.dirtype);
          refreshPage(true);
          return "toast://已选择：" + file.dirname;
        }, list[i]),
      });
    }
  } else {
    d.push({
      title: "暂无文件夹📁",
      col_type: "text_1",
    });
  }
  setResult(d);
}

//上传文件
function updatefile() {
  let d = [];
  let list = require("hiker://files/bgHouse/icon/json/localStorage.json");
  let imgpath = [];
  for (let a in list) {
    imgpath = imgpath.concat(
      method.getImg(
        "/storage/emulated/0/Android/data/com.example.hikerview/files/Documents/bgHouse/icon/src/" +
          list[a].dirpath
      )
    );
  }
  for (let a in imgpath) {
    try {
      method.updateall("hiker://files/bgHouse/icon/src/" + imgpath[a]);
    } catch (error) {
      log(error);
    }
  }
}

//更新
function Version(){
  var nowVersion = getItem('Version', "0.0.5");//现在版本 
  var nowtime = Date.now();
  var oldtime = parseInt(getItem('VersionChecktime','bgvioletsky0').replace('bgvioletsky',''));
  if (getMyVar('bgvioletsky-VersionCheck', '0') == '0' && nowtime > (oldtime+12*60*60*1000)) {
    try {
        require((config.依赖).replace("main.js",'iconVersion.js'));
        if (parseFloat((newVersion.icon).replace(/(\.\d+)\./, '$1')) > parseFloat((nowVersion).replace(/(\.\d+)\./, '$1'))) {
            confirm({
                title:'发现新版本，是否更新？', 
                content:nowVersion+'=>'+newVersion.icon+'\n'+newVersion.icondesc[newVersion.icon], 
                confirm: $.toString((nowtime,newVersion) => {
                    setItem('Version', newVersion);
                    setItem('VersionChecktime', 'bgvioletsky'+nowtime);
                    deleteCache();
                    delete config.依赖;
                    refreshPage();
                },nowtime, newVersion.icon),
                cancel:''
            })
            log('检测到新版本！\n   《V'+newVersion.icon+'版本》'+newVersion.icondesc[newVersion.icon]);
        }
        putMyVar('icon-Version', '-V'+newVersion.icon);
    } catch (e) { }
    putMyVar('bgvioletsky-VersionCheck', '1');
}else{
    putMyVar('icon-Version', '-V'+nowVersion);
}
}