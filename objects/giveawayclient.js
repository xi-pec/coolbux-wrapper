const events = require('events')
const WebSocket = require('isomorphic-ws')
const CoolBuxUser = require('coolbux-wrapper/objects/coolbuxuser.js')

module.exports = class {
    constructor () {
        const self = new events.EventEmitter()

        self.state = 'disconnected'
        self.socket = null

        self.user = null
        self.time = null
        self.joined = null
        self.prize = null
        self.playercount = null
        self.winners = null
        self.chance = null

        self.init = () => {
            const ws = new WebSocket('wss://www.coolbux.live:8443')

            ws.on('open', () =>  {
                self.state = 'connected'
                self.socket = ws
                self.emit('ready')
            })

            ws.on('message', data => {
                var string = data.toString()
                var parsed = JSON.parse(string)

                switch(parsed['name']) {
                    case 'time':
                        self.time = [...Object.values(parsed)].splice(1)
                        self.emit('time', self.time)
                    break

                    case 'joined':
                        self.joined = true
                        self.prize = parsed['prize']

                        self.emit('joined', self.joined)
                        self.emit('prize', self.prize)
                    break

                    case 'percentage':
                        self.chance = parsed['value']
                        self.emit('chance', self.chance)
                    break

                    case 'reset':
                        self.emit('reset')
                    case 'recentWins':
                        var merged = parsed['winners'].map((name, i) => ({
                            name,
                            amount: parsed['amounts'][i],
                            chance: parsed['percents'][i]
                        }))

                        self.winners = merged
                        self.emit('winners', self.winners)
                    case 'stats':
                        self.playercount = parsed['playerCount']
                        self.prize = parsed['prize']

                        self.emit('playercount', self.playercount)
                        self.emit('prize', self.prize)
                    break
                }
            })
        }

        self.login = user => {
            return new Promise((y, n) => {
                if (!(user instanceof CoolBuxUser)) return n("Invalid User")
                if (self.state !== 'connected') return n("Not connected")
    
                self.socket.send(JSON.stringify({
                    'name': 'check',
                    'user': user.name
                }))
    
                self.user = user.name

                y('OK')
            })
        }

        self.join = (user) => {
            return new Promise((y, n) => {
                if (self.state !== 'connected') return n("Not connected")
                if (!user && !self.user) return n("Not logged in")
                if (user && !(user instanceof CoolBuxUser)) return n("Invalid User")
    
                self.socket.send(JSON.stringify({
                    'name': 'join',
                    'user': user.name || self.user
                }))

                y('OK')
            })
        }

        return self
    }
}