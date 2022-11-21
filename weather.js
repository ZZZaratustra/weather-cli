#!/user/bin/env node
import { getArgs } from './helpers/args.js'
import { getIcon, getWeather } from './services/api.service.js'
import { printHelp, printError, printSuccess, printWeather } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js'

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

const saveCity = async (city) => {
    if (!city.length) {
        printError('Не передан город')
        return
    }
    try{
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('Город сохранён')
    } catch (e) {
        printError('Город не сохранён', e.message)
    }

}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
        const weather = await getWeather(city)
        printWeather(weather, getIcon(weather.weather[0].icon))
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('Неверно указан город')
        } else if (e?.response?.status == 401) {
            printError('Неверно указан ТОКЕН')
        } else if (e?.response?.status == 400) {
            printError('Неверно указан город или токен')
        } else {
            printError(e.message)
        }
    }
}


const initCLI = () => {
    const args = getArgs(process.argv)
    // console.log(process.env)
        if (args.h){
            return printHelp()      //вызвать помощь
        }
        if (args.s){
            return saveCity(args.s)      //сохранить город
        }
        if (args.t){
            return saveToken(args.t) //сохранить токен
        }
        //вывести погоду
        return getForcast()
}

initCLI()
