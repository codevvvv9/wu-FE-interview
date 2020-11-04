const fn = (req, res, next) => {
  res.render('demo', {pageTitle: req.app.locals.title}) //render的第一个参数就是views里面第一个文件的名字
  //req.app是获取app的一个好用的api
}

module.exports = fn

