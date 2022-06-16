const nodemailer = require("nodemailer")
const config_mail = require("../../../config/mail.js")
const user = config_mail.titan.user
const pass = config_mail.titan.pass
const smtpTransport = nodemailer.createTransport(
    {
        host: 'smtp.titan.email',
        auth: {
            user: user,
            pass: pass,
        }
    }
)


let _t = {
    async sendMail(targetMail, title, content) {
        return new Promise((resolve, reject) => {
            smtpTransport.sendMail({
                from: 'Administrator<' + user + '>'
                , to: `<${targetMail}>`
                , subject: title
                , html: content
            }, function (err, res) {
                if (err) {
                    console.log(err, res)
                    reject(false)
                    return
                }
                resolve(true)
            })
        })
    }
}

module.exports = _t






// 授權Gmail郵箱點這裏
// https://accounts.google.com/DisplayUnlockCaptcha
// const targetMail = 'vvv5050@163.com'
// smtpTransport.sendMail({
//     from: 'Administrator<' + user + '>'
//     , to: `<${targetMail}>`
//     , subject: 'Node.JS通过SMTP协议从QQ邮箱发送邮件'
//     , html: '这是一封测试邮件 <br> '
// }, function (err, res) {
//     console.log(err, res)
// })