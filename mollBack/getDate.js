// 数据库操作
let db = require('./config/mysql.js');
let client = require('./config/redis.js');
let sql1 = `select i1.pid,i1.id,i2.name,i2.promoteprice from productimage 
as i1 join(select p.id, p.name, p.promoteprice from product as p order by Rand() limit 16) as i2 
where i1.pid = i2.id and i1.type = 'type_single' GROUP BY i1.pid;`; //随机查找 16个 产品 显示在主页上面


// 通过产品 得到类别id
exports.getCategoryId = function (id, callback) {
  let sql = `SELECT cid FROM product WHERE id=${id};`;
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      return callback(err, rows[0]);
    }
  });
}
// redis 智能化操作 一次访问 一次点击之后
exports.setZsetRedis = function (data, callback) {
  // console.log(data);
  client.zincrby(data.uid, 1, data.cid);
  return callback(null, "ok");
}

// redis 得到目前 已经访问的商品类别的数组
exports.getZsetHeightRedis = function (id, callback) {
  client.zcard(id, function (err, length) {
    if (err) {
      console.log(err);
      return callback(err);
    } else {
      client.zrangebyscore(id, 0, length, function (err, replay) {
        // 得到最高的分数值的类别
        return callback(null, replay);
      })
    }
  })
}
// 根据类别查出该类别所有的商品，其余随机
exports.getHomePageGoodsMessageNoRandom = function (cidArr, callback) {
  let sql = "SELECT pi.pid,pi.id,p.name,p.promoteprice FROM product p,productimage pi WHERE (p.cid=";
  for (let i = 0; i < cidArr.length; ++i) {
    if (i == 0) {
      sql += cidArr[i];
    } else {
      sql += " or p.cid=" + cidArr[i];
    }
  }
  sql += ") and pi.pid=p.id GROUP BY pi.pid limit 16;";
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      // console.log(rows);
      return callback(null, rows);
    }
  });
}

// 首页
exports.getHomePageGoodsMessage = function (callback) { //首页随机16个产品
  db.query(sql1, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      return callback(null, rows);
    }
  });
}

// 首页
exports.HomePageGoodsMessageByPremiseName = function (name, callback) { //查询结果页
  let arr = name.split("");
  name = arr.join("%");
  let sql = `SELECT pi.id,p.id pid,p.name,p.promoteprice FROM product p,productimage pi WHERE p.name LIKE '%${name}%' and p.id=pi.pid GROUP BY pi.pid;`;
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      return callback(null, rows);
    }
  });
}

// 首页
exports.HomePageGoodsMessageByPremiseId = function (name, callback) { //查询结果页
  let sql = `SELECT pi.id,pi.pid,p.name,p.promoteprice from product p,productimage pi WHERE p.cid=${name} and p.id=pi.pid GROUP BY pi.pid;`;
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      return callback(null, rows);
    }
  });
}

// 登录
exports.signIn = function (data, callback) {
  let name = data.userName;
  let pwd = data.userPwd;
  let sql1 = `SELECT id from user where name='${name}' and password='${pwd}';`;
  let sql2 = `select COUNT(id) from shoppingcart where uid=`;
  db.query(sql1, function (err, rows, fields) {
    if (err) {
      return callback(err, null);
    }
    if (rows == false) { // 未找到   rows=[]  这个人不在数据库中
      return callback(err, "signIn error");
    } else {
      sql2 += rows[0].id + ";";
      db.query(sql2, function (err, rows1, fields) {
        if (err) {
          return callback(err, null);
        } else {
          rows1[0]["id"] = rows[0].id;
          return callback(null, rows1[0]);
        }
      })
    }

  });
}

// 注册  加入数据库
exports.login = function (data, callback) {
  let name = data.userName;
  let pwd = data.userPwd;
  let sql = `insert into user (name, password) VALUES('${name}', '${pwd}');`
  db.query(sql, function (err, rows, fields) {
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, rows);
    }

  });
}

// 通过   某个人  得到他的购物车相关字段信息
exports.getShoppingCart = function (id, callback) {
  let sql = `SELECT s1.id,s1.pid,s1.num,s2.id,s3.name,s3.promotePrice from shoppingcart s1,productimage s2,product s3 WHERE s1.uid=${id} and s1.pid=s2.pid and s1.pid=s3.id GROUP BY s1.id;`
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      // console.log(rows);
      return callback(null, rows);
    }
  });
}

// 购物车某个商品的添加或者减少数量
exports.shoppingCartNumChange = function (data, callback) {
  let sql = `UPDATE shoppingcart set num=${data.num} WHERE uid=${data.uid} and pid=${data.pid};`
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      // console.log(rows);
      return callback(null, rows);
    }
  });
}

// 删除某个购物车的商品
exports.shoppingCatrDeleteItem = function (data, callback) {
  let sql = `DELETE from shoppingcart where uid=${data.uid} and pid=${data.pid};`
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      // console.log(rows);
      return callback(null, rows);
    }
  });
}

// 通过 uid 得到某个人的 订单信息
exports.getOrders = function (uid, callback) {
  let sql = `SELECT o.id orderId,oi.pid,o.orderCode,o.status,oi.number,p.name,p.promotePrice,pi.id from order_ o,orderitem oi,product p,productimage pi WHERE o.uid=${uid} and oi.uid=o.uid and o.id=oi.oid and oi.pid=p.id and p.id=pi.pid GROUP BY oi.id;`
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      // console.log(rows);
      return callback(null, rows);
    }
  });
}

// 删除订单
exports.deleteOrder = function (id, callback) {
  let sql = `delete order_,orderitem from order_,orderitem where order_.id=${id} and order_.id=orderitem.oid;`
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      // console.log(rows);
      return callback(null, rows);
    }
  });
}

// 得到产品的详细信息  名字 详图等
exports.getProductDetails1 = function (id, callback) {
  let sql = `SELECT p.cid,p.name,p.originalPrice,p.promotePrice,pi.* from product p,productimage pi WHERE p.id=${id} and p.id=pi.pid;`
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      return callback(null, rows);
    }
  });
}

// 得到产品的详细产品参数
exports.getProductDetails2 = function (id, callback) {
  let sql = `SELECT pt.name,pv.value from propertyvalue pv,property pt,product p WHERE p.id=${id} AND p.cid=pt.cid and p.id=pv.pid and pt.id=pv.ptid;`
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      return callback(null, rows);
    }
  });
}

// 产品立即购买   订单表添加一行
exports.addOrder = function (data, callback) {
  let sql1 = `INSERT order_(orderCode,address,post,receiver,mobile,userMessage,createDate,payDate,deliveryDate,confirmDate,uid,status) VALUES('${data.orderCode}','${data.address}','${data.post}','${data.receiver}','${data.mobile}','${data.userMessage}','${data.createDate}',${data.payDate},${data.deliveryDate},${data.confirmDate},${data.uid},'${data.status}');`;
  let sql2 = `SELECT id FROM order_ where orderCode='${data.orderCode}';`;
  db.query(sql1, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      db.query(sql2, function (err, rows, fields) {
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          let oid = rows[0].id;
          let sql3 = `INSERT orderitem(pid,oid,uid,number) VALUES(${data.pid},${oid},${data.uid},${data.num});`;
          db.query(sql3, function (err, rows, fields) {
            if (err) {
              console.log(err);
              return callback(err, null);
            } else {
              return callback(null, rows);
            }
          });
        }
      });
    }
  });
}

// 产品加入购物车
exports.addShoppingCart = function (data, callback) {
  let sql = `INSERT shoppingcart(pid,uid,num) VALUES(${data.pid},${data.uid},${data.num});`
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      return callback(null, rows);
    }
  });
}

// 购物车结算
exports.addOrderShopping = function (data, callback) {
  let sql1 = `INSERT order_(orderCode,address,post,receiver,mobile,userMessage,createDate,payDate,deliveryDate,confirmDate,uid,status) VALUES('${data.orderCode}','${data.address}','${data.post}','${data.receiver}','${data.mobile}','${data.userMessage}','${data.createDate}',${data.payDate},${data.deliveryDate},${data.confirmDate},${data.uid},'${data.status}');`;
  db.query(sql1, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      let sql2 = `SELECT id FROM order_ where orderCode='${data.orderCode}';`;
      db.query(sql2, function (err, rows, fields) {
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          let sql3 = "INSERT orderitem(pid,oid,uid,number) VALUES";
          for (let i = 0; i < data.orderItemsPidNum.length; ++i) {
            let str = "";
            if (i != 0) {
              str += ",("
            } else {
              str += "(";
            }
            str += data.orderItemsPidNum[i].pid + ",";
            str += rows[0].id + ",";
            str += data.uid + ",";
            str += data.orderItemsPidNum[i].num + ")";
            sql3 += str;
          }
          console.log(sql3);
          db.query(sql3, function (err, rows, fields) {
            if (err) {
              console.log(err);
              return callback(err, null);
            } else {
              let sql4 = "DELETE shoppingcart from shoppingcart WHERE";
              for (let i = 0; i < data.orderItemsPidNum.length; ++i) {
                let str = "";
                if (i != 0) {
                  str += " or";
                }
                str += " (pid=" + data.orderItemsPidNum[i].pid;
                str += " and uid=" + data.uid;
                str += ")";
                sql4 += str;
              }
              db.query(sql4, function (err, rows, fields) {
                if (err) {
                  console.log(err);
                  return callback(err, null);
                } else {
                  return callback(null, rows);
                }
              });
            }
          });
        }
      });
    }
  });
}