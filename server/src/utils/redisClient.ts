import Redis from "ioredis";

const redisHost: string = process.env.REDIS_URL || "127.0.0.1"

const redisClient = new Redis({
    host: redisHost,
    port:6379,
})

redisClient.on("connect",()=>console.log("redis connected"))
redisClient.on("error",(err)=>console.error("redis error:",err))

export default redisClient
