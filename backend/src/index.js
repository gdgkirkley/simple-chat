import logger from 'loglevel'
import {startServer} from './server'

const isProd = process.env.NODE_ENV === 'production'
logger.setLevel(isProd ? 'warn' : 'info')

startServer()
