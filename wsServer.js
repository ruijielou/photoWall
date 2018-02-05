const ws = require('nodejs-websocket');
//let strArr = ['你好', '你说啥？', '信号不好', '哦哦', '是的', '今天天气不错', '你还好吗', '嘿嘿', '嗯嗯', '是的']
let strArr = ['./img/1.png' ,'./img/2.png','./img/3.png','./img/4.png','./img/5.png','./img/6.png','./img/7.png','./img/8.png','./img/9.png','./img/1.png']
let count = 0;
let timer = null;
const server = ws.createServer((conn) => {
  console.log('new connection');
  let user = 'user'+ count++;
  //sendMessage('进来了');
  conn.on('text', (str) => {
    
    // console.log(order)
    
    timer = setInterval(function(){
        count ++
        if(count > 525) {
            clearInterval(timer);

                sendMessage('closed')
             
        }
        let order = Math.floor(Math.random()*10);
        sendMessage(strArr[order]);
    }, 50)
    //conn.sendText(strArr[order]);
  });
  conn.on('close', (code, reason) => {
    console.log('server is closed!');
    sendMessage('close')
  });
  conn.on('error', (err) => {
    console.log(err)
  })
}).listen(8090);

function sendMessage(str) {
   
   server.connections.forEach(function(ele){
    ele.sendText(str);
   })
}
