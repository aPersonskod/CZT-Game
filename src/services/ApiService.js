import AppService from "./AppService.js";

export const appService = new AppService();
export default class ApiService {
    options = {
        method: 'POST',
        headers: appService.optionHeaders,
        body: JSON.stringify(
            {
                "vtdPages": [22027, 22029],
                "login": appService.login,
                "password": appService.password,
                "connectInfo": {
                    "address": appService.hostAddress,
                    "port": "4000",
                    "schema": "ekptd"
                }
            }
        )
    };
    async initializeVtd(){
        let res = await fetch(`${appService.hostName}${appService.apiDir}initialize-vtd`, this.options)
            .then(res => res.json());
        if(res.value === true && res.isSuccess === true){
            return res.value;
        }
    }
    
    async createGame(){
        let response = await fetch(`${appService.hostName}${appService.apiDir}create-game`, {
            method: 'POST',
            headers: appService.optionHeaders,
            body: JSON.stringify({
                'pageIds': [22027, 22029]
            })
        }).then(res => res.json());
        return response.id; // game id
    }
    
    async getAvailableGames() {
        return await fetch(`${appService.hostName}${appService.apiDir}available-games`, {
            method: 'GET',
            headers: appService.optionHeaders
        }).then(res => res.json());
    }
    
    async getGame() {
        let games = await this.getAvailableGames();
        if(games.length === 0) {
            let newGameId = await this.createGame();
            if(newGameId) {
                games = await this.getAvailableGames();
                return games[0];
            }
        }
        return games[0];
    }
    
    async startGame(){
        let game = await this.getGame();
        let gameMode = 'Championship';
        await fetch(`${appService.hostName}${appService.apiDir}start-game?gameId=${game.id}&mode=${gameMode}`, {
            method: 'POST',
            headers: appService.optionHeaders,
            body: JSON.stringify(
                game.systemSettings
            )
        }).then(res => console.log(res.ok));
    }
    
    async stopGame(){
        let game = await this.getGame();
        await fetch(`${appService.hostName}${appService.apiDir}stop-game?gameId=${game.id}`, {
            method: 'GET',
            headers: appService.optionHeaders
        }).then(res => console.log(res.ok));
    }

    async resetGame(){
        let game = await this.getGame();
        await fetch(`${appService.hostName}${appService.apiDir}reset-game?gameId=${game.id}`, {
            method: 'GET',
            headers: appService.optionHeaders
        }).then(res => console.log(res.ok));
    }

    async continueGame(){
        let game = await this.getGame();
        await fetch(`${appService.hostName}${appService.apiDir}continue-game?gameId=${game.id}`, {
            method: 'GET',
            headers: appService.optionHeaders
        }).then(res => console.log(res.ok));
    }
    
    async getCalculationResult(){
        let game = await this.getGame();
        let calculationResult = await fetch(`${appService.hostName}${appService.apiDir}get-calculation-result?gameId=${game.id}`, {
            method: 'GET',
            headers: appService.optionHeaders
        }).then(res => res.json());
        console.log(calculationResult);
        return calculationResult;
    }
    
    async getGameState(){
        let game = await this.getGame();
        let gameState = await fetch(`${appService.hostName}${appService.apiDir}get-status?gameId=${game.id}`, {
            method: 'GET',
            headers: appService.optionHeaders
        }).then(res => res.json());
        console.log(gameState);
        return gameState;
    }

    async getSummary(){
        let calculationResult = await this.getCalculationResult();
        let summary = [];
        for(let memberReport of calculationResult.memberReports){
            let memberName = memberReport.memberName;
            for(let stationReport of memberReport.stationReports){
                let arrival = stationReport.paramReport.parameters
                    .filter(param => param.parameterType === 'CountArriving')[0].value;
                let departures = stationReport.paramReport.parameters
                    .filter(param => param.parameterType === 'CountDeparture')[0].value;
                let sum = arrival + departures;
                summary.push({name: memberName, arrival: arrival, departures: departures, sum: sum});
            }
        }
        return summary;
    }
}
