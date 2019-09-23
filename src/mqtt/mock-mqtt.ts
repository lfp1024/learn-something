import mqtt from "mqtt"

const msgQueues: any = {}   // qos
const eventQueues: any = {}
// let cb: any
mqtt.connect = (() => {
    console.log("hacked in")
    return {
        on: (event: string, callback: (topic: string, message: string) => void) => {
            eventQueues[event] = callback
            // cb = callback
        },
        pub: (topic: string, msg: string) => {
            // queues[topic](msg)
            eventQueues["message"](topic, msg)
        }
    }
}) as any

const client = mqtt.connect()
client.on("message", (topic, message) => console.log(`received topic ${topic}, msg is ${message}`))

//pub
new Array(10).fill(null).forEach(
    // (_, index) => cb(index)
    // (_, index) => queues["test"](index)
    (_, index) => (client as any).pub("test/topic", index)
)

