const githubapi = $.require("https://cdn.jsdelivr.net/gh/bgvioletsky/icon/githubapi.js");
// const githubapi = $.require("http://192.168.31.134:8081/githubapi.js");


function F() {
    var d = [];
    let list
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
                    var imgpath = githubapi.getImg(
                        "/storage/emulated/0/Android/data/com.example.hikerview/files/Documents/bgHouse/icon/src/" +
                          list[eval(getMyVar("mainindex","0"))].dirpath
                      );
                    let data=[];
                    for(let i in imgpath){
                        data.push({
                            title:imgpath[i],
                            url:"",
                            pic_url:"hiker://files/bgHouse/icon/src/"+list[eval(getMyVar("mainindex","0"))].dirpath+"/"+imgpath[i],
                            col_type:list[eval(getMyVar("mainindex","0"))].dirtype
                        })
                    }
                    if(data.length>0){
                        writeFile("hiker://files/bgHouse/icon/json/"+list[eval(getMyVar("mainindex","0"))].dirpath+".json",JSON.stringify(data));
                    }
                   
                }

                case "1":
                    if (fileExist("hiker://files/bgHouse/icon/json/webStorage.json")) {
                    list = require("hiker://files/bgHouse/icon/json/webStorage.json");
                    for (let index in list) {
                        d.push({
                            title: "““””<font color='#58D3F7'>" + list[index].dirname + "</font>",
                            url: "",
                            col_type: "scroll_button",
                        });
                    }
                }
        }
        d.push({
            title: "““””<font color='#FF69B4'>" + "设置" + "</font>",
            url: $("hiker://empty#noRecordHistory##noHistory#").rule(() => {
                require(config.依赖);
                setting();
            }),
            col_type: "scroll_button",
        });
    }
    try{
       let data=require("hiker://files/bgHouse/icon/json/"+list[eval(getMyVar("mainindex","0"))].dirpath+".json");
        d=d.concat(data)
            
    }catch(err){
        log(err)
    }
    setResult(d);
}

function setting() {
    var d = [];
    d.push({
        title: "api设置",
        url: $("hiker://empty#noRecordHistory##noHistory#").rule(() => {
            require(config.依赖);
            api();
        }),
        col_type: "text_icon",
    }, {
        title: "仓库设置",
        url: $("hiker://empty#noRecordHistory##noHistory#").rule(() => {
            require(config.依赖);
            warehouse();
        }),
        col_type: "text_icon",
    }, {
        title: "文件夹设置",
        url: $("hiker://empty#noRecordHistory##noHistory#").rule(() => {
            require(config.依赖);
            whfiles();
        }),
        col_type: "text_icon",
    });
    setResult(d);
}
//用于设置GitHubapi
function api() {
    var d = [];
    d.push({
        title: getItem("token", "") == "" ? "token:  " : getItem("token", ""),
        col_type: "icon_1_search",
        url: $(getItem("token", "")).input(() => {
            setItem("token", input);
            refreshPage(true);
        }),
    }, {
        title: getItem("repoOwner", "") == "" ?
            "repoOwner:  " :
            getItem("repoOwner", ""),
        col_type: "icon_1_search",
        url: $(getItem("repoOwner", "")).input(() => {
            setItem("repoOwner", input);
            refreshPage(true);
        }),
    }, {
        title: getItem("repoName", "") == "" ? "repoName:  " : getItem("repoName", ""),
        col_type: "icon_1_search",
        url: $(getItem("repoName", "")).input(() => {
            setItem("repoName", input);
            refreshPage(true);
        }),
    }, {
        title: "测试",
        col_type: "text_3",
        url: $("README.md").input((githubapi) => {
            writeFile(`hiker://files/bgHouse/README.md`, "### 谢谢");
            let message = githubapi.upload(
                getItem("token", ""),
                getItem("repoOwner", ""),
                getItem("repoName", ""),
                "test",
                input,
                "hiker://files/bgHouse/README.md"
            );
            deleteFile(`hiker://files/bgHouse/test/README.md`);
            if (message.name == input) {
                return "toast://测试成功";
            } else {
                return "toast://测试失败请重新修改相关内容";
            }
        }, githubapi),
    }, {
        title: "保存",
        url: $("#noLoading#").lazyRule(
            (a, b, c) => {
                let api = [];
                api.push({
                    token: a,
                    repoOwner: b,
                    repoName: c,
                });
                return "toast://保存成功";
            },
            getItem("token", ""),
            getItem("repoOwner", ""),
            getItem("repoName", "")
        ),
        col_type: "text_3",
    }, {
        title: "清除",
        url: $("#noLoading#").lazyRule(() => {
            setItem("token", "");
            setItem("repoOwner", "");
            setItem("repoName", "");
            refreshPage(true);
            return "toast://清除成功";
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
            setItem("warehouse", "0");
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
            setItem("warehouse", "1");
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
            url: $().lazyRule((githubapi) => {
                let data = [];
                if (fileExist("hiker://files/bgHouse/icon/json/localStorage.json")) {
                    data = require("hiker://files/bgHouse/icon/json/localStorage.json");
                }
                if (
                    getMyVar("dirname") != "" &&
                    getMyVar("dirpath") != "" &&
                    getMyVar("dirtype") != ""
                ) {
                    if (githubapi.test_repeat(data, getMyVar("dirpath"))) {
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
                        githubapi.createDir(getMyVar("dirpath"));
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
                    githubapi.createDir(getMyVar("dirpath"));
                    refreshPage(true);
                    return "toast://保存成功";
                } else {
                    return "toast://请输入完整";
                }
            }, githubapi),
        }, {
            title: "删除",
            col_type: "text_3",
            url: $().lazyRule((githubapi) => {
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
            }, githubapi),
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

    function webStorage() {}

    switch (getItem("warehouse", "0")) {
        case "0":
            localStorage();
        case "1":
            webStorage();
    }
}