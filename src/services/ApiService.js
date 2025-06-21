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
        return await fetch(`${appService.hostName}${appService.apiDir}initialize-vtd`, this.options)
            .then(res => res.json());
        //return {value: true, isSuccess: true};
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

    async deleteGame(gameId) {
        await fetch(`${appService.hostName}${appService.apiDir}delete-game?gameId=${gameId}`, {
            method: 'POST',
            headers: appService.optionHeaders,
        }).then(res => console.log(`game ${gameId} removing status = ${res.ok}`));
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
            }
        }
        return games[games.length - 1];
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
/////////////////////////////////    PAGE API    ///////////////////////////////////////////////////////
    async getCommands(){
        let calculationResult = await this.getCalculationResult();
        let commands = [];
        for(let memberReport of calculationResult.memberReports){
            let memberName = memberReport.memberName;
            commands.push(memberName);
        }
        return [...new Set(commands)]; // unique
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
    
    async getIndicators(member){
        let calculationResult = await this.getCalculationResult();
        let indicationDetails = [];
        for(let memberReport of calculationResult.memberReports.filter(x => x.memberName === member)){
            for(let stationReport of memberReport.stationReports){

                let paramsReport = stationReport.paramReport.parameters;
                let num = 0;
                for(let paramReport of paramsReport.filter(x => x.parameterGroup === 'Old')){
                    num = num + 1;
                    indicationDetails.push({num: num, name: paramReport.title, measurement: paramReport.measure, value: paramReport.value})
                }
            }
        }
        return indicationDetails;
    }
    async getNewIndicators(member){
        let calculationResult = await this.getCalculationResult();
        let indicationDetails = [];
        for(let memberReport of calculationResult.memberReports.filter(x => x.memberName === member)){
            for(let stationReport of memberReport.stationReports){

                let paramsReport = stationReport.paramReport.parameters;
                let num = 0;
                for(let paramReport of paramsReport.filter(x => x.parameterGroup === 'New')){
                    num = num + 1;
                    indicationDetails.push({num: num, name: paramReport.title, measurement: paramReport.measure, value: paramReport.value})
                }
            }
        }
        return indicationDetails;
    }
    
    async getTrainDetails(member){
        let calculationResult = await this.getCalculationResult();
        let trainDetails = [];
        for(let memberReport of calculationResult.memberReports.filter(x => x.memberName === member)){
            for(let stationReport of memberReport.stationReports){
                
                let mistakeReport = stationReport.mistakeReport;
                let num = 0;
                for(let trainReport of mistakeReport.allTrains.filter(x => x.isCorrect === false)){
                    num = num + 1;
                    let status = trainReport.mistakes.count > 0 ? 'Не допущен до расчетов' : 'Допущен до расчетов';
                    
                    let ids = [];
                    for(let mistake of trainReport.mistakes){
                        ids.push(...mistake.ids);
                    }
                    
                    let trainsIds = [...new Set(ids)];
                    let trainField = `${trainReport.name} ${trainsIds.join(', ')}`;
                    trainDetails.push({num: num, train: trainField, status: status, errors: [...trainReport.mistakes.map(x => x.description)]})
                }
            }
        }
        return trainDetails;
    }

    async getOperationDetails(member){
        let calculationResult = await this.getCalculationResult();
        let operationDetails = [];
        for(let memberReport of calculationResult.memberReports.filter(x => x.memberName === member)){
            for(let stationReport of memberReport.stationReports){

                let mistakeReport = stationReport.mistakeReport;
                let num = 0;
                for(let trainReport of mistakeReport.operationsWithMistake){
                    num = num + 1;
                    operationDetails.push({num: num, train: trainReport.mistakes[0].subject, errors: [...trainReport.mistakes.map(x => x.description)]});
                }
            }
        }
        return operationDetails;
    }
    
    async getAnotherDetails(member){
        let calculationResult = await this.getCalculationResult();
        let anotherDetails = [];
        for(let memberReport of calculationResult.memberReports.filter(x => x.memberName === member)){
            for(let stationReport of memberReport.stationReports){

                let mistakeReport = stationReport.mistakeReport;
                let num = 0;
                for(let trainReport of mistakeReport.otherMistakes){
                    num = num + 1;
                    anotherDetails.push({num: num, subject: trainReport.subject, description: trainReport.description});
                }
            }
        }
        return anotherDetails;
    }
    
    async saveSettings(systemSettings){
        let game = await this.getGame();
        let gameMode = 'Championship';
        await fetch(`${appService.hostName}${appService.apiDir}save-system-settings?gameId=${game.id}`, {
            method: 'POST',
            headers: appService.optionHeaders,
            body: JSON.stringify(
                systemSettings
            )
        }).then(res => {if(res.ok){alert('Настройки изменены')}});
    }
}
