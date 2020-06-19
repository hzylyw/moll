var express = require('express');
var router = express.Router();

var data = require('../getDate')



// 智能化 存类别的请求
router.post('/setZsetRedis', function (req, res, next) {
  data.getCategoryId(req.body.pid, function (err, body) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      // console.log(body);
      req.body.cid = parseInt(body.cid);
      data.setZsetRedis(req.body, function (err, body) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send("ok");
        }
      })
    }
  })
})

router.get('/HomePageGoodsMessageByUid', function (req, res, next) {
  data.getZsetHeightRedis(req.query.id, function (err, body) {     // 得到现在用户的 访问记录 排序结果
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (body == false) {                         //没有记录  随机显示
        data.getHomePageGoodsMessage(function (err, body) {
          let arr = [];
          let arrTemp = [];
          for (let i = 0; i < body.length; ++i) {
            arrTemp.push(body[i]);
            if ((i + 1) % 4 == 0) {
              arr.push(arrTemp);
              arrTemp = [];
            }
          }
          res.send(arr);
        })
      } else {
        console.log(body);
        body = body.reverse();
        data.getHomePageGoodsMessageNoRandom(body, function (err, body) {     //根据记录  查找所有的商品
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            let arr = body;
            if (body.length < 16) {          // 查找出来的商品不满足 16 个商品，随机补足
              data.getHomePageGoodsMessage(function (err, body) {
                if (err) {
                  console.log(err);
                  res.send(err);
                } else {
                  let len = 16 - arr.length;
                  for (let i = 0; i < len; ++i) {
                    arr.push(body[i]);
                  }
                  let result = [];
                  let resultTemp = [];
                  for (let i = 0; i < 16; ++i) {
                    resultTemp.push(arr[i]);
                    if ((i + 1) % 4 == 0) {
                      result.push(resultTemp);
                      resultTemp = [];
                    }
                  }
                  res.send(result);
                }
              })
            } else {
              let result = [];
              let resultTemp = [];
              for (let i = 0; i < 16; ++i) {
                resultTemp.push(arr[i]);
                if ((i + 1) % 4 == 0) {
                  result.push(resultTemp);
                  resultTemp = [];
                }
              }
              res.send(result);
            }
          }
        })
      }
    }
  })
})

// 首页请求
router.get('/HomePageGoodsMessage', function (req, res, next) {
  data.getHomePageGoodsMessage(function (err, body) {
    let arr = [];
    let arrTemp = [];
    for (let i = 0; i < body.length; ++i) {
      arrTemp.push(body[i]);
      if ((i + 1) % 4 == 0) {
        arr.push(arrTemp);
        arrTemp = [];
      }
    }
    res.send(arr);
  })
});

// 搜索框某个搜索请求
router.get('/HomePageGoodsMessageByPremiseName', function (req, res, next) {
  data.HomePageGoodsMessageByPremiseName(req.query.name, function (err, body) {
    let arr = [];
    let arrTemp = [];
    for (let i = 0; i < body.length; ++i) {
      arrTemp.push(body[i]);
      if ((i + 1) % 4 == 0) {
        arr.push(arrTemp);
        arrTemp = [];
      }
    }
    arr.push(arrTemp);
    res.send(arr);
  })
});

// 分类  按类别查找
router.get('/HomePageGoodsMessageByPremiseId', function (req, res, next) {
  data.HomePageGoodsMessageByPremiseId(req.query.name, function (err, body) {
    let arr = [];
    let arrTemp = [];
    for (let i = 0; i < body.length; ++i) {
      arrTemp.push(body[i]);
      if ((i + 1) % 4 == 0) {
        arr.push(arrTemp);
        arrTemp = [];
      }
    }
    arr.push(arrTemp);
    res.send(arr);
  })
});

// 登录请求
router.post('/signIn', function (req, res, next) {
  data.signIn(req.body, function (err, body) {
    res.send(body);
  })
});

// 注册
router.post('/login', function (req, res, next) {
  data.login(req.body, function (err, body) {
    if (err) {
      res.send(err);
    } else {
      res.send("ok");
    }
  })
});

// 购物车
router.get('/getShoppingCart', function (req, res, next) {
  let id = req.query.uid;
  data.getShoppingCart(id, function (err, body) {
    if (err) {
      res.send(err);
    } else {
      res.send(body);
    }
  })
});

// 购物车商品增加减少
router.post('/shoppingCartNumChange', function (req, res, next) {
  data.shoppingCartNumChange(req.body, function (err, body) {
    if (err) {
      res.send(err);
    } else {
      res.send("ok");
    }
  })
})

// 购物车删除某个商品
router.get('/shoppingCatrDeleteItem', function (req, res, next) {
  data.shoppingCatrDeleteItem(req.query, function (err, body) {
    if (err) {
      res.send(err);
    } else {
      res.send("ok");
    }
  })
})

// 订单请求
router.get('/getOrders', function (req, res, next) {
  data.getOrders(req.query.uid, function (err, body) {
    if (err) {
      res.send(err);
    } else {
      res.send(body);
    }
  })
})
// 删除订单请求
router.get('/deleteOrder', function (req, res, next) {
  data.deleteOrder(req.query.id, function (err, body) {
    if (err) {
      res.send(err);
    } else {
      res.send("ok");
    }
  })
})

// 产品详情页
router.get('/productDetails', function (req, res, next) {
  data.getProductDetails1(req.query.id, function (err, body1) {
    let result = {};
    result.singleImages = [];
    result.detailImages = [];
    result.detailParams = [];
    if (err) {
      res.send(err);
    } else {
      for (const item of body1) {
        if (item.type == 'type_single') {
          result.singleImages.push(item.id);
        } else if (item.type == 'type_detail') {
          result.detailImages.push(item.id);
        }
      }
      result.name = body1[0].name;
      result.originalPrice = body1[0].originalPrice;
      result.promotePrice = body1[0].promotePrice;
      result.cid = body1[0].cid;
      data.getProductDetails2(req.query.id, function (err, body2) {
        if (err) {
          res.send(err);
        } else {
          for (const item of body2) {
            let obj = {};
            obj.name = item.name;
            obj.value = item.value;
            result.detailParams.push(obj);
          }
          res.send(result);
        }
      })
    }
  })
})

// 添加一条订单  和订单项
router.post('/addOrder', function (req, res, next) {
  // console.log(req);
  data.addOrder(req.body.form, function (err, body) {
    if (err) {
      res.send(err);
    } else {
      res.send("ok");
    }
  })
})

// 添加一栏到购物车
router.post('/addShoppingCart', function (req, res, next) {
  data.addShoppingCart(req.body, function (err, body) {
    if (err) {
      res.send(err);
    } else {
      res.send("ok");
    }
  })
})

// 购物车结算
router.post('/addOrderShopping', function (req, res, next) {
  data.addOrderShopping(req.body.form, function (err, body) {
    if (err) {
      res.send(err);
    } else {
      res.send("ok");
    }
  })
})

module.exports = router;