const utils99 = require('node-utils99')
const address = 'TVRxox5bWzMA5kZAMDfKCZ8KgmQsGeTbyk'
// const address = 'TUbWM1G6QnjCBfif6hVmJJvKSooBKph5Dn'
// const url = `https://usdt.tokenview.com/cn/address/${address}`


async function test(wallet_address) {
    let url = `https://apilist.tronscan.org/api/token_trc20/transfers?limit=20&start=0&sort=-timestamp&count=true&relatedAddress=${wallet_address}`
    console.log('请求URL刷新交易数据：', url)
    let res = await utils99.request.axios.get({ url })
    if (!res || res.statusText.toLowerCase() != 'ok') {
        return null
    }

    // 过滤交易记录 转给自己的写入数据库
    let a = res.data.token_transfers
    for (let i = 0; i < a.length; i++) {
        let item = a[i]
        if (item.tokenInfo.tokenAbbr.toLowerCase() != 'usdt') {
            continue
        }
        let o = {
            hash: item.transaction_id,
            block: item.block,
            timestamp: item.block_ts,
            // todo 入帐时，已除以保留小数位
            amount: Number(item.quant) / 1000000,
            ownerAddress: item.from_address,
            toAddress: item.to_address,
        }

        if (o.toAddress == wallet_address) {
            // 转入记录日志
            // hash, block, timestamp, amount, ownerAddress, toAddress, coinType, operator_id, user_id, action, notes
            console.log("入帐数据：", o)
        }
    }
}
async function init() {
    await test(address)
}


init()