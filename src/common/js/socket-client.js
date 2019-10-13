import io from 'socket.io-client'
import {baseSocketUrl} from './config'
export const socket = io(baseSocketUrl)