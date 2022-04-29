/* eslint-disable no-console */
const cookieParser = require('cookie-parser');
const express = require('express'); // 引入express 模块
const bodyParser = require('body-parser'); // 针对post的特殊处理

const app = express(); // 创建实例
const mysql = require('mysql'); // 引入mysql 模块

// 创建数据库连接 填入数据库信息
const conn = mysql.createConnection({
  user: 'root', // 用户名
  password: '666666', // 密码
  host: 'localhost', // 主机（默认都是 localhost）
  database: 'mt', // 数据库名
});

// 创建application/x-www-form-urlencoded编码解析
const urlencodeParser = bodyParser.urlencoded({ extended: false });

// 设置中间件，并对cookie进一步加密
app.use(urlencodeParser).use(cookieParser('c95865f56d7cf4a6a6b44b4deb624c03'));

// 测试连接
conn.connect((err) => {
  console.log(err, '如果为null 就是连接成功');
});

// 开启服务器
app.listen(3000, () => {
  console.log('服务器在3000端口开启。。。。。');
});

// 这是注册的地址
app.post('/logon', (req, res) => {
  // 将输入的以json格式输出
  const response = {
    account: req.body.account,
    pwd: req.body.pwd,
    username: req.body.username,
    status: req.body.status,
  };
  // sql查询语句
  const str1 = `select account from user where account = '${response.account}'`;
  conn.query(str1, (err1, msg1) => {
    // 判断账号是否存在
    if (msg1.length >= 1) {
      // 返回的信息
      res.send('账号已存在，请重新输入');
    } else {
      const str2 = `select username from user where username = '${response.username}'`;
      conn.query(str2, (err2, msg2) => {
        // 判断用户名是否存在
        if (msg2.length >= 1) {
          res.send('用户名已存在，请重新输入');
        } else {
          // 防止sql注入
          const sqlStr = 'insert into user set ?';
          // 执行 mysql 语句
          conn.query(sqlStr, response, () => {
            // 返回的信息
            res.send('注册成功');
          });
        }
      });
    }
  });
});

// 这是登录的地址
app.get('/login', (req, res) => {
  // 将输入的以json格式输出
  const response = {
    account: req.query.account,
    pwd: req.query.pwd,
  };
  // sql查询语句;
  const str = `select * from user where account = '${response.account}'`;
  conn.query(str, (err1, msg1) => {
    // 判断账号是否存在
    if (msg1.length >= 1) {
      const sql = `select * from user where account = '${response.account}' and pwd = '${response.pwd}'`;
      conn.query(sql, (err2, msg2) => {
        if (msg2.length >= 1) {
          res.cookie('username', msg2[0].username, {
            maxAge: 1000 * 60 * 60,
          });
          res.cookie('status', msg2[0].status, {
            maxAge: 1000 * 60 * 60,
          });
          // 服务端设置cookie，并签名加密
          res.cookie('pwd', `${response.pwd}`, {
            maxAge: 1000 * 60 * 60,
            signed: true,
          });
          res.cookie('account', `${response.account}`, {
            maxAge: 1000 * 60 * 60,
            signed: true,
          });
          res.send('登录成功');
        } else {
          res.send('账号或密码错误，请重新输入');
        }
      });
    } else {
      res.send('账号不存在，请重新输入');
    }
  });
});

// 修改密码的地址
app.patch('/change', (req, res) => {
  // 将输入的以json格式输出
  const response = {
    account: req.body.account,
    pwd: req.body.pwd,
  };
  // sql查询语句
  const str1 = `select account from user where account = '${response.account}'`;
  conn.query(str1, (err, msg) => {
    if (msg.length >= 1) {
      const str2 = `select pwd from user where pwd = '${response.pwd}' and account = '${response.account}'`;
      conn.query(str2, (err1, msg1) => {
        if (msg1.length >= 1) {
          res.send('密码与之前的一致，请重新输入');
        } else {
          const sql = `update user set pwd = '${response.pwd}' where account = '${response.account}'`;
          conn.query(sql, () => {
            res.send('修改成功');
          });
        }
      });
    } else {
      res.send('账号不存在, 请重新输入');
    }
  });
});

// 查看所有电影的信息
app.get('/movie', (req, res) => {
  const sql = 'select * from movie';
  conn.query(sql, (err, msg) => {
    res.send(msg);
  });
});

// 查看指定电影的信息
app.get('/movie/id', (req, res) => {
  const response = {
    movieId: req.query.movieId,
  };
  const sql = `select * from movie where id = ${response.movieId}`;
  conn.query(sql, (err, msg) => {
    res.send(msg);
  });
});

// 更改用户名
app.patch('/update/nick', (req, res) => {
  // 将输入的以json格式输出
  const response = {
    username: req.body.username,
    account: req.body.account,
  };
  // sql查询语句
  const str1 = `select username from user where username = '${response.username}'`;
  conn.query(str1, (err1, msg1) => {
    if (msg1.length >= 1) {
      res.send('昵称重复');
    } else {
      const str2 = `update user set username = '${response.username}' where account = '${response.account}'`;
      conn.query(str2, () => {
        const sql = `select account, username, status, pwd from user where account = '${response.account}'`;
        conn.query(sql, (err, msg) => {
          res.cookie('username', msg[0].username, {
            maxAge: 1000 * 60 * 60,
          });
          res.cookie('status', msg[0].status, {
            maxAge: 1000 * 60 * 60,
          });
          res.cookie('pwd', msg[0].pwd, {
            maxAge: 1000 * 60 * 60,
          });
          res.cookie('account', msg[0].account, {
            maxAge: 1000 * 60 * 60,
          });
          res.send('修改成功');
        });
      });
    }
  });
});

// 更改手机号
app.patch('/update/iphone', (req, res) => {
  // 将输入的以json格式输出
  const response = {
    account: req.body.account,
    username: req.body.username,
  };
  // sql查询语句
  const str1 = `select account from user where account = '${response.account}'`;
  conn.query(str1, (err1, msg1) => {
    if (msg1.length >= 1) {
      res.send('手机号重复');
    } else {
      const str2 = `update user set account = '${response.account}' where username = '${response.username}'`;
      conn.query(str2, () => {
        const sql = `select account, username, status, pwd from user where username = '${response.username}'`;
        conn.query(sql, (err, msg) => {
          res.cookie('username', msg[0].username, {
            maxAge: 1000 * 60 * 60,
          });
          res.cookie('status', msg[0].status, {
            maxAge: 1000 * 60 * 60,
          });
          res.cookie('pwd', msg[0].pwd, {
            maxAge: 1000 * 60 * 60,
          });
          res.cookie('account', msg[0].account, {
            maxAge: 1000 * 60 * 60,
          });
          res.send('修改成功');
        });
      });
    }
  });
});

// 更改密码
app.patch('/update/pwd', (req, res) => {
  // 将输入的以json格式输出
  const response = {
    pwd: req.body.pwd,
    username: req.body.username,
  };
  // sql查询语句
  const str = `update user set pwd = '${response.pwd}' where username = '${response.username}'`;
  conn.query(str, (err1, msg1) => {
    if (msg1.changedRows === 0) {
      res.send('修改的密码与之前的重复');
    } else {
      const sql = `select account, username, status, pwd from user where username = '${response.username}'`;
      conn.query(sql, (err, msg) => {
        res.cookie('username', msg[0].username, {
          maxAge: 1000 * 60 * 60,
        });
        res.cookie('status', msg[0].status, {
          maxAge: 1000 * 60 * 60,
        });
        res.cookie('pwd', msg[0].pwd, {
          maxAge: 1000 * 60 * 60,
        });
        res.cookie('account', msg[0].account, {
          maxAge: 1000 * 60 * 60,
        });
        res.send('修改成功');
      });
    }
  });
});

// 这是管理员查看账号信息地址
app.get('/manager/account', (req, res) => {
  // sql查询语句，将查询到的数据一并返回
  const response = {
    data: req.query.data,
    size: req.query.size,
  };
  const sql = 'select count(*) as total from user';
  conn.query(sql, (err1, msg1) => {
    const str = `select * from user limit ${response.data}, ${response.size}`;
    conn.query(str, (err2, msg2) => {
      res.send({ total: msg1[0].total, msg: msg2 });
    });
  });
});

// 这是管理员查看电影信息地址
app.get('/manager/movie', (req, res) => {
  const response = {
    data: req.query.data,
    size: req.query.size,
  };
  // sql查询语句，将查询到的数据一并返回
  const sql = 'select count(*) as total from movie';
  conn.query(sql, (err1, msg1) => {
    const str = `select * from movie limit ${response.data}, ${response.size}`;
    conn.query(str, (err2, msg2) => {
      res.send({ total: msg1[0].total, msg: msg2 });
    });
  });
});

// 这是管理员查看商家信息的地址
app.get('/manager/business', (req, res) => {
  const response = {
    data: req.query.data,
    size: req.query.size,
  };
  // sql查询语句，将查询到的数据一并返回
  const sql = 'select count(*) as total from business';
  conn.query(sql, (err1, msg1) => {
    const str = `select * from business limit ${response.data}, ${response.size}`;
    conn.query(str, (err2, msg2) => {
      res.send({ total: msg1[0].total, msg: msg2 });
    });
  });
});

// 获取商家的所在地区及所属行业
app.get('/business/submit', (req, res) => {
  const sql1 = 'select * from state';
  conn.query(sql1, (err1, msg1) => {
    const sql2 = 'select * from industry';
    conn.query(sql2, (err2, msg2) => {
      res.send({ state: msg1, industry: msg2 });
    });
  });
});

// 商家提交店铺的信息
app.post('/business/logon', (req, res) => {
  const response = {
    businessName: req.body.businessName,
    year: req.body.year,
    state: req.body.state,
    industry: req.body.industry,
    official: req.body.official,
    iphone: req.body.iphone,
    iphoneMd: req.body.iphoneMd,
    username: req.body.username,
  };
  const str = `select count(*) as total from business where username = '${response.username}'`;
  conn.query(str, (er, ms) => {
    if (ms[0].total >= 10) {
      res.send('一个账户最多注册十个店铺');
    } else {
      const str1 = `select count(*) as total from business where iphone = '${response.iphone}' and official = '${response.official}'`;
      conn.query(str1, (error, mss) => {
        if (mss[0].total >= 5) {
          res.send('一个手机号最多注册五个店铺');
        } else {
          const sql1 = `select * from user where username = '${response.username}'`;
          conn.query(sql1, (err1, msg1) => {
            if (msg1[0].account === response.iphoneMd) {
              // 输入的手机号与之前注册账号时的手机号一致
              const sql2 = `select * from business where iphone = '${response.iphone}'`;
              conn.query(sql2, (err2, msg2) => {
                if (msg2.length >= 1) {
                  if (msg2[0].official !== response.official) {
                    res.send('手机号重复，请重新输入');
                  } else {
                    const sql3 = `select * from business where businessName = '${response.businessName}'`;
                    conn.query(sql3, (err4, msg3) => {
                      if (msg3.length >= 1) {
                        res.send('店铺名重复，请重新输入');
                      } else {
                        const sql4 = 'insert into business set ?';
                        conn.query(sql4, response, () => {
                          res.send('提交成功');
                        });
                      }
                    });
                  }
                } else {
                  const sql3 = `select * from business where businessName = '${response.businessName}'`;
                  conn.query(sql3, (err4, msg3) => {
                    if (msg3.length >= 1) {
                      res.send('店铺名重复，请重新输入');
                    } else {
                      const sql4 = 'insert into business set ?';
                      conn.query(sql4, response, () => {
                        res.send('提交成功');
                      });
                    }
                  });
                }
              });
            } else {
              // 输入的手机号与之前注册账号时的手机号不一致
              const sql2 = `select * from user where account = '${response.iphoneMd}'`;
              conn.query(sql2, (err2, msg2) => {
                if (msg2.length >= 1) {
                  res.send('手机号重复，请重新输入');
                } else {
                  const sql3 = `select * from business where iphone = '${response.iphone}'`;
                  conn.query(sql3, (err3, msg3) => {
                    if (msg3.length >= 1) {
                      if (msg3[0].official !== response.official) {
                        res.send('手机号重复，请重新输入');
                      } else {
                        const sql4 = `select * from business where businessName = '${response.businessName}'`;
                        conn.query(sql4, (err4, msg4) => {
                          if (msg4.length >= 1) {
                            res.send('店铺名重复，请重新输入');
                          } else {
                            const sql5 = 'insert into business set ?';
                            conn.query(sql5, response, () => {
                              res.send('提交成功');
                            });
                          }
                        });
                      }
                    } else {
                      const sql4 = `select * from business where businessName = '${response.businessName}'`;
                      conn.query(sql4, (err4, msg4) => {
                        if (msg4.length >= 1) {
                          res.send('店铺名重复，请重新输入');
                        } else {
                          const sql5 = 'insert into business set ?';
                          conn.query(sql5, response, () => {
                            res.send('提交成功');
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

// 校验商家是否已经提交过信息
app.get('/business/check', (req, res) => {
  const response = {
    username: req.query.username,
  };
  const sql = `select * from business where username = '${response.username}'`;
  conn.query(sql, (err, msg) => {
    if (msg.length >= 1) {
      res.send({ msg: '欢迎进入商家设置界面', data: msg });
    } else {
      res.send({ msg: '请前往商家信息提交页' });
    }
  });
});

// 商家修改用户名
app.patch('/business/change/nick', (req, res) => {
  const response = {
    username: req.body.username,
    iphoneMd: req.body.iphoneMd,
    iphone1: req.body.iphone1,
    iphone2: req.body.iphone2,
  };
  const sql = `select * from user where username = '${response.username}'`;
  conn.query(sql, (err, msg) => {
    if (msg.length >= 1) {
      res.send('用户名重复，请重新输入');
    } else {
      const str = `update user set username = '${response.username}' where account = '${
        response.iphoneMd.split('s:')[1].split('.')[0]
      }'`;
      conn.query(str, () => {
        const str1 = `update business set username = '${response.username}' where iphone = '${response.iphone1}' or iphone = '${response.iphone2}'`;
        conn.query(str1, () => {
          const str2 = `select * from user where account = '${
            response.iphoneMd.split('s:')[1].split('.')[0]
          }'`;
          conn.query(str2, (error, mes) => {
            res.cookie('username', mes[0].username, {
              maxAge: 1000 * 60 * 60,
            });
            res.cookie('status', mes[0].status, {
              maxAge: 1000 * 60 * 60,
            });
            // 服务端设置cookie，并签名加密
            res.cookie('pwd', `${mes[0].pwd}`, {
              maxAge: 1000 * 60 * 60,
              signed: true,
            });
            res.cookie('account', `${mes[0].account}`, {
              maxAge: 1000 * 60 * 60,
              signed: true,
            });
            res.send('修改成功');
          });
        });
      });
    }
  });
});

// 商家修改手机号
app.patch('/business/change/iphone', (req, res) => {
  const response = {
    official: req.body.official,
    iphone: req.body.iphone,
    username: req.body.username,
  };
  const str = `select * from business where iphone = '${response.iphone}'`;
  conn.query(str, (er, ms) => {
    if (ms.length >= 1) {
      res.send({ msg: '输入的手机号与之前的重复，请重新输入' });
    } else {
      const sql = `update business set iphone = '${response.iphone}' where official = '${response.official}'`;
      conn.query(sql, () => {
        const st = `select iphone from business where official = '${response.official}'`;
        conn.query(st, (err, mes) => {
          const s = `select * from user where username = '${response.username}'`;
          conn.query(s, (e, m) => {
            res.cookie('username', m[0].username, {
              maxAge: 1000 * 60 * 60,
            });
            res.cookie('status', m[0].status, {
              maxAge: 1000 * 60 * 60,
            });
            // 服务端设置cookie，并签名加密
            res.cookie('pwd', `${m[0].pwd}`, {
              maxAge: 1000 * 60 * 60,
              signed: true,
            });
            res.cookie('account', `${m[0].account}`, {
              maxAge: 1000 * 60 * 60,
              signed: true,
            });
            res.send({ msg: '修改成功', data: mes });
          });
        });
      });
    }
  });
});

// 商家修改负责人
app.patch('/business/change/official', (req, res) => {
  const response = {
    iphone: req.body.iphone,
    official: req.body.official,
    username: req.body.username,
  };
  const sql = `select * from business where iphone = '${response.iphone}'`;
  conn.query(sql, (err, msg) => {
    if (msg[0].official === response.official) {
      res.send({ msg: '请输入新的负责人的名字' });
    } else {
      const str = `update business set official = '${response.official}' where iphone = '${response.iphone}'`;
      conn.query(str, () => {
        const st = `select official from business where iphone = '${response.iphone}'`;
        conn.query(st, (er, mes) => {
          const s = `select * from user where username = '${response.username}'`;
          conn.query(s, (e, m) => {
            res.cookie('username', m[0].username, {
              maxAge: 1000 * 60 * 60,
            });
            res.cookie('status', m[0].status, {
              maxAge: 1000 * 60 * 60,
            });
            // 服务端设置cookie，并签名加密
            res.cookie('pwd', `${m[0].pwd}`, {
              maxAge: 1000 * 60 * 60,
              signed: true,
            });
            res.cookie('account', `${m[0].account}`, {
              maxAge: 1000 * 60 * 60,
              signed: true,
            });
            res.send({ msg: '修改成功', data: mes });
          });
        });
      });
    }
  });
});

// 商家修改店铺名
app.patch('/business/change/name', (req, res) => {
  const response = {
    id: req.body.id,
    businessName: req.body.businessName,
    username: req.body.username,
  };
  const st = `select * from business where businessName = '${response.businessName}'`;
  conn.query(st, (er, ms) => {
    if (ms.length >= 1) {
      res.send('店铺名重复，请重新输入');
    } else {
      const sql = `update business set businessName = '${response.businessName}' where id = '${response.id}'`;
      conn.query(sql, () => {
        const str = `select * from user where username = '${response.username}'`;
        conn.query(str, (err, msg) => {
          res.cookie('username', msg[0].username, {
            maxAge: 1000 * 60 * 60,
          });
          res.cookie('status', msg[0].status, {
            maxAge: 1000 * 60 * 60,
          });
          // 服务端设置cookie，并签名加密
          res.cookie('pwd', `${msg[0].pwd}`, {
            maxAge: 1000 * 60 * 60,
            signed: true,
          });
          res.cookie('account', `${msg[0].account}`, {
            maxAge: 1000 * 60 * 60,
            signed: true,
          });
          res.send('修改成功');
        });
      });
    }
  });
});

// 商家修改注册年份
app.patch('/business/change/year', (req, res) => {
  const response = {
    id: req.body.id,
    year: req.body.year,
    username: req.body.username,
  };
  const st = `select * from business where id = '${response.id}'`;
  conn.query(st, (er, ms) => {
    if (ms[0].year === response.year) {
      res.send('输入的年份与之前的一致，请重新输入');
    } else {
      const sql = `update business set year = '${response.year}' where id = '${response.id}'`;
      conn.query(sql, () => {
        const str = `select * from user where username = '${response.username}'`;
        conn.query(str, (err, msg) => {
          res.cookie('username', msg[0].username, {
            maxAge: 1000 * 60 * 60,
          });
          res.cookie('status', msg[0].status, {
            maxAge: 1000 * 60 * 60,
          });
          // 服务端设置cookie，并签名加密
          res.cookie('pwd', `${msg[0].pwd}`, {
            maxAge: 1000 * 60 * 60,
            signed: true,
          });
          res.cookie('account', `${msg[0].account}`, {
            maxAge: 1000 * 60 * 60,
            signed: true,
          });
          res.send('修改成功');
        });
      });
    }
  });
});

// 商家修改所在地区
app.patch('/business/change/state', (req, res) => {
  const response = {
    id: req.body.id,
    state: req.body.state,
    username: req.body.username,
  };
  const st = `select * from business where id = '${response.id}'`;
  conn.query(st, (er, ms) => {
    if (ms[0].state === response.state) {
      res.send('输入的地区与之前的一致，请重新输入');
    } else {
      const sql = `update business set state = '${response.state}' where id = '${response.id}'`;
      conn.query(sql, () => {
        const str = `select * from user where username = '${response.username}'`;
        conn.query(str, (err, msg) => {
          res.cookie('username', msg[0].username, {
            maxAge: 1000 * 60 * 60,
          });
          res.cookie('status', msg[0].status, {
            maxAge: 1000 * 60 * 60,
          });
          // 服务端设置cookie，并签名加密
          res.cookie('pwd', `${msg[0].pwd}`, {
            maxAge: 1000 * 60 * 60,
            signed: true,
          });
          res.cookie('account', `${msg[0].account}`, {
            maxAge: 1000 * 60 * 60,
            signed: true,
          });
          res.send('修改成功');
        });
      });
    }
  });
});

// 商家修改所属行业
app.patch('/business/change/industry', (req, res) => {
  const response = {
    id: req.body.id,
    industry: req.body.industry,
    username: req.body.username,
  };
  const st = `select * from business where id = '${response.id}'`;
  conn.query(st, (er, ms) => {
    if (ms[0].industry === response.industry) {
      res.send('输入的行业与之前的一致，请重新输入');
    } else {
      const sql = `update business set industry = '${response.industry}' where id = '${response.id}'`;
      conn.query(sql, () => {
        const str = `select * from user where username = '${response.username}'`;
        conn.query(str, (err, msg) => {
          res.cookie('username', msg[0].username, {
            maxAge: 1000 * 60 * 60,
          });
          res.cookie('status', msg[0].status, {
            maxAge: 1000 * 60 * 60,
          });
          // 服务端设置cookie，并签名加密
          res.cookie('pwd', `${msg[0].pwd}`, {
            maxAge: 1000 * 60 * 60,
            signed: true,
          });
          res.cookie('account', `${msg[0].account}`, {
            maxAge: 1000 * 60 * 60,
            signed: true,
          });
          res.send('修改成功');
        });
      });
    }
  });
});

// 获取用户名的负责人
app.get('/business/change/official/show', (req, res) => {
  const response = {
    username: req.query.username,
  };
  const sql = `select official from business where username = '${response.username}'`;
  conn.query(sql, (err, msg) => {
    res.send(msg);
  });
});

// 获取指定的用户名的信息
app.get('/business/data', (req, res) => {
  const response = {
    username: req.query.username,
  };
  // sql查询语句，将查询到的数据一并返回
  const sql = `select count(*) as total from business where username = '${response.username}'`;
  conn.query(sql, (err1, msg1) => {
    const str = `select * from business where username = '${response.username}'`;
    conn.query(str, (err2, msg2) => {
      res.send({ total: msg1[0].total, msg: msg2 });
    });
  });
});

// 获取指定的电影的信息
app.get('/movie/data', (req, res) => {
  const response = {
    username: req.query.username,
    data: req.query.data,
    size: req.query.size,
  };
  // sql查询语句，将查询到的数据一并返回
  const sql = `select count(*) as total from movie where username = '${response.username}'`;
  conn.query(sql, (err1, msg1) => {
    const str = `select * from movie where username = '${response.username}' limit ${response.data}, ${response.size}`;
    conn.query(str, (err2, msg2) => {
      res.send({ total: msg1[0].total, msg: msg2 });
    });
  });
});

// 商家删除指定的数据
app.delete('/business/del', (req, res) => {
  const response = {
    id: req.query.id,
  };
  const sql = `delete from business where id = '${response.id}'`;
  conn.query(sql, () => {
    res.send('删除成功');
  });
});

// 获取影片的上映地区和类型
app.get('/movie/get', (req, res) => {
  const sql = 'select * from area';
  conn.query(sql, (err, msg) => {
    const str = 'select * from type';
    conn.query(str, (er, mes) => {
      res.send({ area: msg, type: mes });
    });
  });
});

// 提交影片的相关信息
app.post('/movie/submit', (req, res) => {
  const response = {
    movieName: req.body.movieName,
    year: req.body.year,
    duration: req.body.duration,
    state: req.body.state,
    director: req.body.director,
    role: req.body.role,
    type: req.body.type,
    username: req.body.username,
  };
  const str = `select * from movie where movieName = '${response.movieName}'`;
  conn.query(str, (err, msg) => {
    if (msg.length >= 1) {
      res.send('电影名称重复，请重新输入');
    } else {
      const sql = 'insert into movie set ?';
      conn.query(sql, response, () => {
        res.send('提交成功');
      });
    }
  });
});

// 删除指定的电影数据
app.delete('/movie/del', (req, res) => {
  const response = {
    id: req.query.id,
  };
  const sql = `delete from movie where id = '${response.id}'`;
  conn.query(sql, () => {
    res.send('删除成功');
  });
});

// 修改指定的电影年份
app.patch('/movie/year', (req, res) => {
  const response = {
    id: req.body.id,
    year: req.body.year,
    username: req.body.username,
  };
  const st = `select * from movie where id = '${response.id}'`;
  conn.query(st, (er, ms) => {
    if (ms[0].year === response.year) {
      res.send('选择的年份与之前的一致，请重新输入');
    } else {
      const sql = `update movie set year = '${response.year}' where id = '${response.id}'`;
      conn.query(sql, () => {
        const str = `select * from user where username = '${response.username}'`;
        conn.query(str, (err, msg) => {
          res.cookie('username', msg[0].username, {
            maxAge: 1000 * 60 * 60,
          });
          res.cookie('status', msg[0].status, {
            maxAge: 1000 * 60 * 60,
          });
          // 服务端设置cookie，并签名加密
          res.cookie('pwd', `${msg[0].pwd}`, {
            maxAge: 1000 * 60 * 60,
            signed: true,
          });
          res.cookie('account', `${msg[0].account}`, {
            maxAge: 1000 * 60 * 60,
            signed: true,
          });
          res.send('修改成功');
        });
      });
    }
  });
});
