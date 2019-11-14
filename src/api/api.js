import instance from "../axios"
export function getTableDataDynamic(url) {
    return instance.get(url)
}