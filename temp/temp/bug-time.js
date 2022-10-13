// 修复走势图数据 日期丢失BUG
const fs = require('fs')

const start_time = '2022/09/07'
const file_name = 'xchusdt'
const text = fs.readFileSync(`./${file_name}.json`)
const json = JSON.parse(text.toString())

function random(min, max) {
    return min + Math.random() * (max - min)
}

let a = json.data
let start = new Date(start_time).getTime() / 1000
for (let i = a.length - 1; i >= 0; i--) {
    let item = a[i]
    item.id = start
    item.vol = random(10000, 60000)
    start += 60 * 60 * 24
}

fs.writeFileSync(`./${file_name}-copy.json`, JSON.stringify(json))