if (!config.依赖) {
    //远程依赖索引文件代理地址列表
    let requirelist = ['https://raw.githubusercontent.com/bgvioletsky/icon/main/']
    let requirefile = "hiker://files/rules/bgHouse/require.json";
    if (fetch(requirefile)) {
        try {
            eval("requirelist=" + fetch(requirefile) + ";");
            
        } catch (e) { }
    }
    for(let i in requirelist){
        try { //远程依赖索引
            require(requirelist[i] + 'require.js', { timeout: 2000 });
            if (relyfile) {
                break;
            }
        } catch (e) {
            log(e.message);
        }
       
    }
    writeFile(requirefile, JSON.stringify(requirelist));
    initConfig({
        依赖: relyfile
    });
   
}