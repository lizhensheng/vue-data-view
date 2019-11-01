let chartLine = require('./chartline')
let chartBar = require('./chartbar')
let chartPie = require('./chartpie')
let chartRing = require('./chartring')
let chartScatter = require('./chartscatter')
let chartK = require('./chartk')
let chartRadar = require('./chartradar')
let chartTree = require('./charttree')
let chartMap = require('./chartmap')
let chartMapLine = require('./chartmapline')
let chartRelation = require('./chartrelation')
let chartDashboard = require('./chartdashboard')
let dbFactory = {
    createOperate : (operate)=>{
        let handle = null
        switch (operate) {
            case LINE:
                handle = new chartLine.default()
                break
            case BAR:
                handle = new chartBar.default()
                break
            case PIE:
                handle = new chartPie.default()
                break
            case RING:
                handle = new chartRing.default()
                break
            case SCATTER:
                handle = new chartScatter.default()
                break
            case K:
                handle = new chartK()
                break
            case RADAR:
                handle = new chartRadar()
                break
            case TREE:
                handle = new chartTree()
                break
            case MAP:
                handle = new chartMap()
                break
            case MAP_LINE:
                handle = new chartMapLine()
                break
            case RELATION:
                handle = new chartRelation()
                break
            case DASHBOARD:
                handle = new chartDashboard()
                break
        }
        return handle
    }
}

const LINE='line'
const BAR='bar'
const PIE='pie'
const RING='ring'
const SCATTER='scatter'
const K='k'
const RADAR='radar'
const TREE='tree'
const MAP='map'
const MAP_LINE='map_line'
const RELATION='relation'
const DASHBOARD='dashboard'
export default dbFactory