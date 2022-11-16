#!/user/bin/env node
import { getArgs } from './helpers/args.js'
import { printHelp, printError, printSuccess } from './services/log.service.js'
import { saveKeyValue } from './services/storage.service.js'

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен')
        return
    }
    try{
        await saveKeyValue('token', token)
        printSuccess('Токен сохранён')
    } catch (e) {
        printError('Токен не сохранён', e.message)
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)
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
}

initCLI()
