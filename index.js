const express = require('express')
const bp = require('body-parser')
const app = express()
const fs = require('fs')

app.engine('.html', require('ejs').__express)
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/new', (req,res) => {
  if (req.query.type == 'a'){
    try{
    fs.readFileSync(`./web/${req.query.name+'-a'}.json`)
    res.status(404).json({status: 404, result: 'Nama telah dipakai   Err : '+ err})
    } catch (err) {
      let datas = {
      name: req.query.name+'-a',
      nama: req.query.nama,
      img: req.query.img,
      title: req.query.title,
      text: req.query.text
    }
    let data = JSON.stringify(datas, null, 2)
    fs.writeFileSync(`./web/${req.query.name+'-a'}.json`, data)
    res.status(200).json({status: 200, result: 'Success'})
    }
  }
  else if (req.query.type == 'p'){
  try{
    fs.readFileSync(`./web/${req.query.name+'-p'}.json`)
    res.status(404).json({status: 404, result: 'Nama telah dipakai   Err : '+err})
    } catch (err) {
    let datas = {
      name: req.query.name+'-p',
      nama: req.query.nama,
      desk: req.query.desk,
      link1: req.query.link1,
      link2: req.query.link2,
      link3: req.query.link3
    }
    let data = JSON.stringify(datas, null, 2)
    fs.writeFileSync(`./web/${req.query.name+'-p'}.json`, data)
    res.status(200).json({status: 200, result: 'Success'})
  }
  } else {
    res.status(400).json({result: 'Not Found'})
  }
})

app.post('/delete', (req,res) => {
  if (req.body.type == 'artikel'){
    if(!fs.readFileSync(`./web/${req.body.name}.json`)) return res.status(404).json({status: 404, result: 'Website Tidak Ada'})
    fs.unlinkSync(`./web/${req.body.name}.json`)
    res.status(200).json({status: 200, result: 'Success'})
}})

app.get('/web/:web', (req,res) => {
  let key = req.params['web']
  try{
  let fileWeb = fs.readFileSync(`./web/${key}.json`)
  let web = JSON.parse(fileWeb)
  console.log(key.charAt(key.length-1))
  if (key.charAt(key.length-1) == 'a') return res.render('web', {web})
  if (key.charAt(key.length-1) == 'p') return res.render('profil', {web})
  res.send('Not Found')
  } catch (err) {
    res.send('No Website Found!')
  }
})

app.listen(3000, (err) => {
  console.log('Server On!')
})
