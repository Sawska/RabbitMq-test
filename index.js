const amqp = require("amqplib/callback_api")

amqp.connect("ampq://localhost",(err,connection) => {
    if(err) throw err
    
    connection.createChannel((err,chanel) => {
        if(err) throw err
        let queue = "hello"
        let msg = "Hello world"

        chanel.assertQueue(queue, {
            durable:false
        })

        chanel.sendToQueue(queue,Buffer.from(msg))
        console.log("[x] Sent %s",msg)
    })

    setTimeout(() => {
        connection.close()
        process.exit(0)
    },500)

})