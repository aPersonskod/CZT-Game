export default class AppService {
    hostAddress = "";
    hostName = "";
    authToken = "adminToken";
    login = "gev";
    password = "123qweASD";
    apiDir = "api/model/";
    pages = [
        {path:'/CZT-Game/summary', header:'Сводная'},
        {path:'/CZT-Game/indicators', header:'Показатели'},
        {path:'/CZT-Game/new-indicators', header:'Новые показатели'},
        {path:'/CZT-Game/details', header:'Детализация'},
    ];
    
    optionHeaders = {
        'Content-Type': 'application/json',
        "Authorization": this.authToken
    };
    constructor() {
        let isRemote = true;
        let localHostAddress = "http://192.168.1.5";
        let remoteHostAddress = "http://109.188.133.3";
        let localHostName = "http://localhost:5173/";
        let remoteHostName = "https://i-game.8bridge.org/";
        this.hostAddress = isRemote ? remoteHostAddress : localHostAddress;
        this.hostName = isRemote ? remoteHostName : localHostName;
    }
}
