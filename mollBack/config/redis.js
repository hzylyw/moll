var redis = require('redis')
var client = redis.createClient()

client.on('error', function (err) {
  console.log('Error ' + err)
})

// client.zadd('zset', 1, 74);
// client.zadd('zset', 0, 73);
// client.zadd('zset', 1, 82);
// client.zadd('zset', 1, 83);
// client.zadd('zset', 2, 74);
// client.zincrby("zset", 3, 74);
// client.zcard('1', function (err, length) {
//   if (err) {
//     console.log(err);
//   } else {
//     client.zrangebyscore(1, length - 1, length, function (err, replay) {
//       console.log(replay);
//     })
//   }
// })

// client.zrangebyscore("1", 0, 1)
// client.zrangebyscore(1, -1, 0, function (err, replay) {
//   console.log(replay);
// })
// console.log()

module.exports = client;

// client.hkeys('hash key', function (err, replies) {
//   console.log(replies.length + ' replies:')

//   replies.forEach(function (reply, i) {
//     console.log('    ' + i + ': ' + reply)
//   })

//   client.quit()
// })