(function () {
    function compare() {
        /**
         * 比较两个版本号的大小
         * @param {string} version1 - 版本号1
         * @param {string} version2 - 版本号2
         * @returns {boolean} - 如果版本号1大于版本号2，则返回 true；否则返回 false
         */
        function Version(version1, version2) {
            // 将版本号字符串拆分为数组，并进行累加求和
            const version1Int = version1
                .split(".")
                .reduce((acc, curr) => acc + parseInt(curr), 0);
            const version2Int = version2
                .split(".")
                .reduce((acc, curr) => acc + parseInt(curr), 0);

            // 比较两个版本号的整数值，并返回比较结果
            return version1Int > version2Int;
        }
        /**
         * 去重
         * @param {list} 数组
         * @param {string} 字符
         * @returns {boolean} - 如果存在，则返回 true；否则返回 false
         */
        function list(list, file) {
            for (let i in list) {
                if (file == list[i]) {
                    return false;
                } else {
                    return true;
                }
            }
        }

        /**
         * 判断传入值是否为空可传入随意数量字符
         * @returns {boolean} - 如果存在，则返回 true；否则返回 false
         */
        function test_item() {
            let a = false;
            for (let i = 0; i < arguments.length; i++) {
                if (getItem(arguments[i]) === "") {
                    a = true;
                }
            }
            return a;
        }

        return {
            test_item: test_item,
            Version: Version,
            list: list,
        }
    }

    function formatDateTime() {
        var timestamp = Date.now();
        var date = new Date(timestamp);

        function getTime() {
            return Date.now();
        }
        /**
         * 比较两个版本号的大小
         * @returns - 返回年份的方法
         */
        function getYear() {
            return date.getFullYear();
        }

        // 返回月份的方法
        function getMonth() {
            return ("0" + (date.getMonth() + 1)).slice(-2); // 因为月份从0开始计数，所以需要加上1；使用字符串的 slice() 方法补零处理
        }

        // 返回日期的方法
        function getDay() {
            return ("0" + date.getDate()).slice(-2); // 使用字符串的 slice() 方法补零处理
        }

        // 返回小时的方法
        function getHours() {
            return ("0" + date.getHours()).slice(-2); // 使用字符串的 slice() 方法补零处理
        }

        // 返回分钟的方法
        function getMinutes() {
            return ("0" + date.getMinutes()).slice(-2); // 使用字符串的 slice() 方法补零处理
        }

        // 返回秒钟的方法
        function getSeconds() {
            return ("0" + date.getSeconds()).slice(-2); // 使用字符串的 slice() 方法补零处理
        }

        function addHours(hours) {
            return timestamp + hours * 60 * 60 * 1000;
        }

        function addMinutes(Minutes) {
            return timestamp + Minutes * 60 * 1000;
        }

        function getDate() {
            var year = date.getFullYear();
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var day = ("0" + date.getDate()).slice(-2);
            return year + "年" + month + "月" + day + "日";
        }
        // 返回格式化后的日期时间字符串的方法
        function getFormattedDateTime() {
            var year = getYear(); // 调用 getYear() 方法获取年份
            var month = getMonth(); // 调用 getMonth() 方法获取月份
            var day = getDay(); // 调用 getDay() 方法获取日期
            var hours = getHours(); // 调用 getHours() 方法获取小时
            var minutes = getMinutes(); // 调用 getMinutes() 方法获取分钟
            var seconds = getSeconds(); // 调用 getSeconds() 方法获取秒钟

            return (
                year +
                "-" +
                month +
                "-" +
                day +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds
            ); // 将格式化后的年月日时分秒进行拼接
        }

        // 返回一个对象，包含各个分别返回年份、月份、时间等的方法，供外部调用
        return {
            getYear: getYear,
            getMonth: getMonth,
            getDay: getDay,
            getHours: getHours,
            getMinutes: getMinutes,
            getSeconds: getSeconds,
            getFormattedDateTime: getFormattedDateTime,
            addHours: addHours,
            addMinutes: addMinutes,
            getTime: getTime,
            getDate: getDate,
        };
    }

    function githubapi() {
        let accessToken = getItem("accessToken", "");
        let repoOwner = getItem("repoOwner", "");
        let repoName = getItem("repoName", "");

        function uploadgh(path, dirPath, filename) {
            const uploadUrl =
                "https://api.github.com/repos/" +
                repoOwner +
                "/" +
                repoName +
                "/contents/" +
                dirPath +
                "/" +
                filename;
            const headers = {
                Authorization: "token " + accessToken,
                "Content-Type": "application/json",
            };
            const requestData = {
                message: "上传时间" + formatDateTime().getDate(),
                content: hexToBase64(
                    fetch(path, {
                        toHex: true,
                    })
                ), // 将文件内容转换为Base64编码
            };
            let s = fetch(uploadUrl, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(requestData),
            });
            return JSON.parse(s).content;
        }

        function qureygh(dir) {
            const apiUrl =
                "https://api.github.com/repos/" +
                repoOwner +
                "/" +
                repoName +
                "/contents/" +
                dir;
            let data = JSON.parse(fetch(apiUrl));
            let jsss = [];
            if (data[0]) {
                for (let i in data) {
                    jsss.push({
                        name: data[i].name,
                        sha: data[i].sha,
                        url: "https://cdn.jsdelivr.net/gh/" +
                            repoOwner +
                            "/" +
                            repoName +
                            "/" +
                            data[i].path,
                        file: data[0].url.split("?")[0],
                    });
                }
            } else {
                jsss.push({
                    name: data.name,
                    sha: data.sha,
                    url: "https://cdn.jsdelivr.net/gh/" +
                        repoOwner +
                        "/" +
                        repoName +
                        "/" +
                        data.path,
                    file: data.url.split("?")[0],
                });
            }
            return jsss;
        }

        function deletegh(path, sha) {
            const requestData = {
                message: "删除时间" + formatDateTime().getDate(),
                sha: sha,
            };
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `token ${accessToken}`,
                },
                body: JSON.stringify(requestData),
            };
            let url =
                "https://api.github.com/repos/" +
                repoOwner +
                "/" +
                repoName +
                "/contents/" +
                path;
            return fetch(url, requestOptions);
        }
        /**
         * 
         * @param {*} oldpath 旧地址
         * @param {*} newpath 新地址
         * 先修改原文件GitHub删除原文件再上传新文件用lazyRule进行加载有一定时间限制
         */
        function updategh(oldpath, newpath) {
            let url = qureygh(oldpath)[0].file;
            let sha = qureygh(oldpath)[0].sha;


        }
        return {
            qureygh: qureygh,
            uploadgh: uploadgh,
            deletegh: deletegh,
            updategh: updategh
        };
    }
    /**
     * 用于生产相应组件
     * @param {list} list -数据
     * @param {string} col_type - 组件类型
     * @param {string} url - 链接
     * @returns {list} - 返回数组
     */
    function display() {
        let d = [];
        for (let i in list) {
            d.push({
                title: "",
                col_type: "",
                url: "",
                pic_url: "",
                desc: "",
                extra: ""
            })
        }
    }

    function code() {
        function upload(path) {
            let dir = path.split("/").at(-2);
            let filename = path.split("/").at(-1);
            filename = math().generateRandomChars() + "\." + filename.split(".").at(-1);
            githubapi().uploadgh(path, dir, filename);
        }

        function importfile(path, name) {

        }
        return {
            upload: upload,
            importfile: importfile,
        }
    }

    function file() {
        const File = java.io.File;
        const {
            Files,
            Paths,
            StandardCopyOption,
            StandardOpenOption
        } =
        java.nio.file;
        const javaString = java.lang.String;
        let javaScope = new JavaImporter(
            java.io,
            java.lang,
            java.lang.reflect,
            java.util.Vector
        );

        function getFolder(path) {
            if(path.match(/hiker/g)){
                path=path.replace(
                    "hiker://files/",
                    "/storage/emulated/0/Android/data/com.example.hikerview/files/Documents/"
                  );
            }
            let file = new File(path);
            let array = file.listFiles() || [];
            let pathList = [];
            for (let i = 0; i < array.length; i++) {
                let f = array[i];
                pathList.push({
                    name: String(f.getName()),
                    path: String(f.getPath()),
                    size: f.isFile() ? Number(f.length()) : undefined,
                    isFile: f.isFile(),
                    isDirectory: f.isDirectory(),
                    lastModified: f.lastModified(),
                });
            }
            return pathList;
        }
        return {
            getFolder:getFolder,
        }

    }

    function math() {
        /**
         * 获取随机字符
         * @returns - 返回生成8位不同的随机字符
         */
        function generateRandomChars() {
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            while (result.length < 8) {
                let randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
                result += randomChar;
            }
            return result;
        }

        return {
            generateRandomChars: generateRandomChars,
        }
    }
    let bgcode = {
        compare: compare,
        formatDateTime: formatDateTime,
        githubapi: githubapi,
        display: display,
        math: math,
        code: code,
        file:file
    };
    if (typeof module !== "undefined") {
        $.exports = bgcode;
    }
    return bgcode;
})();