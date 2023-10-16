if (!config.依赖) {
    //远程依赖索引文件代理地址列表
    let requirelist = 'https://cdn.jsdelivr.net/gh/'
    let requirefile = "hiker://files/rules/bgHouse/require.json";
    if (fetch(requirefile)) {
        try {
            eval("requirelist=" + fetch(requirefile) + ";");
        } catch (e) { }
    }
    
        try { //远程依赖索引
            require(requirelist + 'bgvioletsky/icon/require.js', { timeout: 2000 });
        } catch (e) {
            log(e.message);
        }

    writeFile(requirefile, JSON.stringify(requirelist));
    initConfig({
        依赖: relyfile
    });
}