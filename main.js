const method = $.require("https://cdn.jsdelivr.net/gh/bgvioletsky/icon/method.js");
// const method = require("http://192.168.31.134:8081/method.js");


function F() {
    var d = [];
    let list=[];
    let x=[];
    x.push({
        title: "““””<font color='#FF69B4'>" + "设置" + "</font>",
        url: $("hiker://empty#noRecordHistory##noHistory#").rule(() => {
            require(config.依赖);
            setting();
        }),
        col_type: "scroll_button",
    });
    if (MY_PAGE == 1) {
        switch (getItem("warehouse","0")) {
            case "0":
                if (fileExist("hiker://files/bgHouse/icon/json/localStorage.json")) {
                   list = require("hiker://files/bgHouse/icon/json/localStorage.json");
                    for (let index in list) {
                        d.push({
                            title: getMyVar("mainindex","0")==index?"““””<font color='#58D3F7'>" + list[index].dirname + "</font>": "““””<font color='#22383e'>" + list[index].dirname + "</font>",
                            url: $("#noLoading#").lazyRule((a) => {
                                putMyVar("mainindex", a);
                                refreshPage(true);
                                return "hiker://empty";
                            },index),
                            col_type: "scroll_button",
                        });
                        
                    }
                    d=d.concat(x);
                    var imgpath = method.getImg(
                        "/storage/emulated/0/Android/data/com.example.hikerview/files/Documents/bgHouse/icon/src/" +
                          list[eval(getMyVar("mainindex","0"))].dirpath
                      );
                    let data=[];
                    for(let i in imgpath){
                      let pic_url=  "hiker://files/bgHouse/icon/src/"+list[eval(getMyVar("mainindex","0"))].dirpath+"/"+imgpath[i]
                        data.push({
                            title:imgpath[i],
                            url:$("#noLoading#").lazyRule((pic) => {
                                copy(pic);
                                return "hiker://empyt";
                            },pic_url),
                            extra: {
                                longClick: [
                                  {
                                    title: " 删除 ",
                                    js: $.toString((pic) => {
                                      deleteFile(pic);
                                      refreshPage(false);
                                      toast("图片已删除");
                                    }, pic_url),
                                  },
                                ],
                              },
                            pic_url:pic_url,
                            col_type:list[eval(getMyVar("mainindex","0"))].dirtype
                        })
                    }
                    if(data.length>0){
                        writeFile("hiker://files/bgHouse/icon/json/"+list[eval(getMyVar("mainindex","0"))].dirpath+".json",JSON.stringify(data));
                    }
                    d.push({
                        col_type: "icon_2",
                        title: "上传本地图片",
                        pic_url: "hiker://files/bgHouse/src/system/19.svg",
                        url:
                          "fileSelect://" +
                          $.toString((list) => {
                            const method = $.require("https://cdn.jsdelivr.net/gh/bgvioletsky/icon/method.js");
                            let dir = "hiker://files/bgHouse/icon/src/"+list[eval(getMyVar("mainindex","0"))].dirpath+"/";
                            let name = method.getName(input).replace("_fileSelect_", "");
                            let path = dir + name;
                            if (method.copyFile(input, getPath(path).slice(7), true)) {
                              refreshPage(true);
                              return "toast://添加成功";
                            } else {
                              refreshPage(true);
                              return "toast://添加失败";
                            }
                          },list),
                      },{
                        col_type: "icon_2",
                        title: "上传链接图片",
                        pic_url: "hiker://files/bgHouse/src/system/19.svg",
                        url: $("", "https|hiker|绝对地址").input((list)=> {
                          let name = input.split("/").at(-1);
                          const file = $.require("https://cdn.jsdelivr.net/gh/bgvioletsky/icon/method.js");
                          let dir = "hiker://files/bgHouse/icon/src/"+list[eval(getMyVar("mainindex","0"))].dirpath+"/"+ name;
                          if (input.match(/http/g)) {
                            downloadFile(input, dir);
                          } else if (input.match(/hiker/g)) {
                            input = input.replace(
                              "hiker://files/",
                              "/storage/emulated/0/Android/data/com.example.hikerview/files/Documents/"
                            );
                            file.copyFile(input, getPath(dir).slice(7), true);
                          } else if (input.match(/\/storage/g)) {
                            file.copyFile(input, getPath(dir).slice(7), true);
                          } else {
                            ("toast://请输入正确地址");
                          }
                  
                          if (fileExist(dir)) {
                            refreshPage(true);
                            return "toast://添加成功";
                          } else {
                            refreshPage(true);
                            return "toast://添加失败";
                          }
                        },list),
                      })
                    
                    d=d.concat(require("hiker://files/bgHouse/icon/json/"+list[eval(getMyVar("mainindex","0"))].dirpath+".json"))
                   
                }else{
                    d=d.concat(x)
                }
                break;
            case "1":
                 if (fileExist("hiker://files/bgHouse/icon/json/webStorage.json")) {
                    list = require("hiker://files/bgHouse/icon/json/webStorage.json");
                    for (let index in list) {
                        d.push({
                            title: getMyVar("mainindex","0")==index?"““””<font color='#58D3F7'>" + list[index].dirname + "</font>": "““””<font color='#22383e'>" + list[index].dirname + "</font>",
                            url: $("#noLoading#").lazyRule((a) => {
                                putMyVar("mainindex", a);
                                refreshPage(true);
                                return "hiker://empty";
                            },index),
                            col_type: "scroll_button",
                        });
                        
                    }
                    d=d.concat(x);
                    d.push({
                        col_type: "icon_2",
                        title: "上传本地图片",
                        pic_url: "hiker://files/bgHouse/src/system/19.svg",
                        url:
                          "fileSelect://" +
                          $.toString((list) => {
                            const method = $.require("https://cdn.jsdelivr.net/gh/bgvioletsky/icon/method.js");
                            let dir = "hiker://files/bgHouse/icon/src/"+list[eval(getMyVar("mainindex","0"))].dirpath+"/";
                            let name = method.getName(input).replace("_fileSelect_", "");
                            let path = dir + name;
                            method.copyFile(input, getPath(path).slice(7), true);
                            let message;
                            if(getItem("token")==""||getItem("repoOwner")==""||getItem("repoName")==""){
                                return "toast://添加失败请配置API";
                            }else{
                             message=   method.upload(getItem("token"),getItem("repoOwner"),getItem("repoName"),list[eval(getMyVar("mainindex","0"))].dirpath,name,path)
                            }
                            
                            if (message) {
                              refreshPage(true);
                              return "toast://添加成功";
                            } else {
                              refreshPage(true);
                              return "toast://添加失败";
                            }
                          },list),
                      },{
                        col_type: "icon_2",
                        title: "上传链接图片",
                        pic_url: "hiker://files/bgHouse/src/system/19.svg",
                        url: $("", "https|hiker|绝对地址").input((list)=> {
                          let name = input.split("/").at(-1);
                          const file = $.require("https://cdn.jsdelivr.net/gh/bgvioletsky/icon/method.js");
                          let dir = "hiker://files/bgHouse/icon/src/"+list[eval(getMyVar("mainindex","0"))].dirpath+"/"+ name;
                          if (input.match(/http/g)) {
                            downloadFile(input, dir);
                          } else if (input.match(/hiker/g)) {
                            input = input.replace(
                              "hiker://files/",
                              "/storage/emulated/0/Android/data/com.example.hikerview/files/Documents/"
                            );
                            file.copyFile(input, getPath(dir).slice(7), true);
                          } else if (input.match(/\/storage/g)) {
                            file.copyFile(input, getPath(dir).slice(7), true);
                          } else {
                            ("toast://请输入正确地址");
                          }
                          let message;
                            if(getItem("token")==""||getItem("repoOwner")==""||getItem("repoName")==""){
                                return "toast://添加失败请配置API";
                            }else{
                             message= file.upload(getItem("token"),getItem("repoOwner"),getItem("repoName"),list[eval(getMyVar("mainindex","0"))].dirpath,name,dir)
                            }
                          if (message) {
                            refreshPage(true);
                            return "toast://添加成功";
                          } else {
                            refreshPage(true);
                            return "toast://添加失败";
                          }
                        },list),
                      })
                }else{
                    d=d.concat(x)
                }
                break;
        }
       
        
    }
    setResult(d);
}
//设置页面
function setting() {
    var d = [];
    d.push( {
        title: "仓库设置",
        url: $("hiker://empty#noRecordHistory##noHistory#").rule(() => {
            require(config.依赖);
            warehouse();
        }),
        col_type: "icon_small_4",
    }, {
        title: "api设置",
        url: $("hiker://empty#noRecordHistory##noHistory#").rule(() => {
            require(config.依赖);
            githubapi();
        }),
        col_type: "icon_small_4",
    },{
        title: "文件夹设置",
        url: $("hiker://empty#noRecordHistory##noHistory#").rule(() => {
            require(config.依赖);
            whfiles();
        }),
        col_type: "icon_small_4",
    },{
        title: "文件夹设置",
        url: $("hiker://empty#noRecordHistory##noHistory#").rule(() => {
            require(config.依赖);
            whfiles();
        }),
        col_type: "icon_small_4",
    },{
        title: "同步仓库",
        url: $("#noLoading#").lazyRule(() => {
            if(getItem())
            getItem("tongbu", "0") == "0"?setItem("tongbu", "1"):setItem("tongbu", "0");
            refreshPage(true);
            return "hiker://empty";
        },api),
        pic_url:getItem("tongbu", "0") == "1" ?
        "hiker://files/bgHouse/src/messy/1.svg" :
        "hiker://files/bgHouse/src/messy/2.svg",
        col_type: "text_icon",
    });
    setResult(d);
}
//用于设置GitHubapi
function githubapi() {
    var d = [];
    let api;
    if(fileExist('hiker://files/bgHouse/icon/json/api.json')){
        api=JSON.parse(fetch("hiker://files/bgHouse/icon/json/api.json"));
        setItem("token", api.token);
        setItem("repoOwner", api.repoOwner);
        setItem("repoName", api.repoName);
        //用于读取之前保存的API文件
    }
   
    d.push({
        title: getItem("token", "") == "" ? "token:  " : getItem("token", ""),
        col_type: "icon_1_search",
        url: $(getItem("token", ""),"请输入token").input(() => {
            setItem("token", input);
            refreshPage(true);
        }),
    }, {
        title: getItem("repoOwner", "") == "" ?
            "repoOwner:  " :
            getItem("repoOwner", ""),
        col_type: "icon_1_search",
        url: $(getItem("repoOwner", ""),"请输入repoOwner").input(() => {
            setItem("repoOwner", input);
            refreshPage(true);
        }),
    }, {
        title: getItem("repoName", "") == "" ? "repoName:  " : getItem("repoName", ""),
        col_type: "icon_1_search",
        url: $(getItem("repoName", ""),"请输入repoName").input(() => {
            setItem("repoName", input);
            refreshPage(true);
        }),
    }, {
        title: "测试",
        col_type: "text_3",
        url: $("#noLoading#").lazyRule((method) => {
            if(!fileExist("hiker://files/bgHouse/test/README.md")){
                writeFile(`hiker://files/bgHouse/test/README.md`, "### 这是一个测试文件");
            }
            let message= method.query(getItem("repoOwner", ""),getItem("repoName", ""),"test/README.md");
            if(message.name="README.md"){
                method.delete_file(getItem("token"),getItem("repoOwner"),getItem("repoName"),message.path,message.sha);
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
    }, {
        title: "保存",
        url: $("#noLoading#").lazyRule(
            (a, b, c) => {
                let api={
                    token: a,
                    repoOwner: b,
                    repoName: c,
                };
                writeFile('hiker://files/bgHouse/icon/json/api.json',JSON.stringify(api));
                return "toast://保存成功";
            },
            getItem("token", ""),
            getItem("repoOwner", ""),
            getItem("repoName", "")
        ),
        col_type: "text_3",
    }, {
        title: "删除",
        url: $("确定删除api").confirm(() => {
            setItem("token", "");
            setItem("repoOwner", "");
            setItem("repoName", "");
            refreshPage(true);
            deleteFile('hiker://files/bgHouse/icon/json/api.json');
            return "toast://api已删除";
        }),
        col_type: "text_3",
    });
    setResult(d);
}

//用于设置仓库类型
function warehouse() {
    var d = [];
    d.push({
        title: "本地仓库",
        url: $("#noLoading#").lazyRule(() => {
            getItem("warehouse", "0") == "0"?setItem("warehouse", "1"):setItem("warehouse", "0");
            refreshPage(true);
            return "hiker://empty";
        }),
        pic_url: getItem("warehouse", "0") == "0" ?
            "hiker://files/bgHouse/src/messy/1.svg" :
            "hiker://files/bgHouse/src/messy/2.svg",
        col_type: "text_icon",
    }, {
        title: "网络仓库",
        url: $("#noLoading#").lazyRule(() => {
            getItem("warehouse", "1") == "1"?setItem("warehouse", "0"):setItem("warehouse", "1");
            refreshPage(true);
            return "hiker://empty";
        }),
        pic_url: getItem("warehouse", "0") == "1" ?
            "hiker://files/bgHouse/src/messy/1.svg" :
            "hiker://files/bgHouse/src/messy/2.svg",
        col_type: "text_icon",
    });
    setResult(d);
}

//文件操作
function whfiles() {
    function localStorage() {
        var d = [];
        d.push({
            title: "dirname",
            col_type: "input",
            desc: "文件夹名",
            extra: {
                titleVisible: false,
                onChange: 'putMyVar("dirname",input)',
                defaultValue: getMyVar("dirname", ""),
            },
        }, {
            title: "dirpath",
            col_type: "input",
            desc: "文件夹路径",
            extra: {
                titleVisible: false,
                onChange: 'putMyVar("dirpath",input)',
                defaultValue: getMyVar("dirpath", ""),
            },
        }, {
            title: "dirtype",
            col_type: "input",
            desc: "文件显示类型",
            extra: {
                titleVisible: false,
                onChange: 'putMyVar("dirtype",input)',
                defaultValue: getMyVar("dirtype", ""),
            },
        }, {
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
        }, {
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
                    if(data.length>0){
                        writeFile(
                            "hiker://files/bgHouse/icon/json/localStorage.json",
                            JSON.stringify(data)
                        );
                    }else{
                        deleteFile(  "hiker://files/bgHouse/icon/json/localStorage.json")
                    }
                    refreshPage(true);
                    return "toast://删除成功";
                } else {
                    return "toast://请保存后再操作";
                }
            }, method),
        }, {
            title: "清除",
            col_type: "text_3",
            url: $().lazyRule(() => {
                putMyVar("dirname", ""),
                    putMyVar("dirpath", ""),
                    putMyVar("dirtype", "");
                refreshPage(true);
                return "toast://已清除";
            }),
        }, {
            col_type: "line",
        });
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

    function webStorage() {
        var d = [];
        d.push({
            title: "dirname",
            col_type: "input",
            desc: "文件夹名",
            extra: {
                titleVisible: false,
                onChange: 'putMyVar("dirname",input)',
                defaultValue: getMyVar("dirname", ""),
            },
        }, {
            title: "dirpath",
            col_type: "input",
            desc: "文件夹路径",
            extra: {
                titleVisible: false,
                onChange: 'putMyVar("dirpath",input)',
                defaultValue: getMyVar("dirpath", ""),
            },
        }, {
            title: "dirtype",
            col_type: "input",
            desc: "文件显示类型",
            extra: {
                titleVisible: false,
                onChange: 'putMyVar("dirtype",input)',
                defaultValue: getMyVar("dirtype", ""),
            },
        }, {
            title: "保存",
            col_type: "text_3",
            url: $().lazyRule((method) => {
                let data = [];
                if (fileExist("hiker://files/bgHouse/icon/json/webStorage.json")) {
                    data = require("hiker://files/bgHouse/icon/json/webStorage.json");
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
                            "hiker://files/bgHouse/icon/json/webStorage.json",
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
                        "hiker://files/bgHouse/icon/json/webStorage.json",
                        JSON.stringify(data)
                    );
                    method.createDir(getMyVar("dirpath"));
                    refreshPage(true);
                    return "toast://保存成功";
                } else {
                    return "toast://请输入完整";
                }
            }, method),
        }, {
            title: "删除",
            col_type: "text_3",
            url: $().lazyRule((method) => {
                let data = [];
                if (fileExist("hiker://files/bgHouse/icon/json/webStorage.json")) {
                    if (getMyVar("dirpath") == "") {
                        return "toast://请输入dirpath";
                    }
                    data = require("hiker://files/bgHouse/icon/json/webStorage.json");
                    for (let item of data) {
                        if (item.dirpath === getMyVar("dirpath")) {
                            const index = data.indexOf(item);
                            data.splice(index, 1); // 在数组中删除该元素
                            
                        }
                    }
                    putMyVar("dirname", ""),
                        putMyVar("dirpath", ""),
                        putMyVar("dirtype", "");
                    if(data.length>0){
                        writeFile(
                            "hiker://files/bgHouse/icon/json/webStorage.json",
                            JSON.stringify(data)
                        );
                    }else{
                        deleteFile(  "hiker://files/bgHouse/icon/json/webStorage.json")
                    }
                    refreshPage(true);
                    return "toast://删除成功";
                } else {
                    return "toast://请保存后再操作";
                }
            }, method),
        }, {
            title: "清除",
            col_type: "text_3",
            url: $().lazyRule(() => {
                putMyVar("dirname", ""),
                    putMyVar("dirpath", ""),
                    putMyVar("dirtype", "");
                refreshPage(true);
                return "toast://已清除";
            }),
        }, {
            col_type: "line",
        });
        if (fileExist("hiker://files/bgHouse/icon/json/webStorage.json")) {
            let list = require("hiker://files/bgHouse/icon/json/webStorage.json");
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

    switch (getItem("warehouse", "0")) {
        case "0":
            localStorage();
        case "1":
            webStorage();
    }
}