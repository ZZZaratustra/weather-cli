#!/user/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js'
import { printHelp, printError, printSuccess } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен')
        return
    }
    try{
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранён')
    } catch (e) {
        printError('Токен не сохранён', e.message)
    }

}
const getForcast = async () => {
    try {
        const weather = await getWeather('Санкт-Петербург', '89fc46fa491b609d5b0ecaf99169c45f')
        console.log(weather)
    } catch (env) {
        if (e?.responce?.status == 404) {
            printError('Неверно указан город')
        } else if (e?.responce?.status == 401) {
            printError('Неверно указан ТОКЕН')
        } else {
            printError('e.message')
        }
    }
}


const initCLI = () => {
    const args = getArgs(process.argv)
    // console.log(process.env)
        if (args.h){
            printHelp()         //вызвать помощь
        }
        if (args.s){
                   //сохранить город
        }
        if (args.t){
            return saveToken(args.t) //сохранить токен
        }
        //вывести погоду
        getForcast()
}
// getWeather('Санкт-Петербург', '89fc46fa491b609d5b0ecaf99169c45f')
// getWeather('Уфа', '89fc46fa491b609d5b0ecaf99169c45f')
// getWeather('Пушкин', '89fc46fa491b609d5b0ecaf99169c45f')


initCLI()
