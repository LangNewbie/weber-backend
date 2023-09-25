const express = require('express')
const bp = require('body-parser')
const app = express()
const fs = require('fs')

app.engine('.html', require('ejs').__express)
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.post('/new', (req,res) => {
  if (req.body.type == 'a'){
    let datas = {
      name: req.body.name+'-a',
      nama: req.body.nama,
      img: req.body.img,
      title: req.body.title,
      text: req.body.text
    }
    let data = JSON.stringify(datas, null, 2)
    if(fs.readFileSync(`./web/${req.body.name}.json`)) return res.status(404).json({status: 404, result: 'Nama telah dipakai'})
    fs.writeFileSync(`./web/${req.body.name}.json`, data)
    res.status(200).json({status: 200, result: 'Success'})
  }
  else if (req.body.type == 'p'){
    let datas = {
      name: req.body.name+'-p',
      nama: req.body.nama,
      desk: req.body.desk,
      link1: req.body.link1,
      link2: req.body.link2,
      link3: req.body.link3
    }
    let data = JSON.stringify(datas, null, 2)
    if(fs.readFileSync(`./web/${req.body.name}.json`)) return res.status(404).json({status: 404, result: 'Nama telah dipakai'})
    fs.writeFileSync(`./web/${req.body.name}.json`, data)
    res.status(200).json({status: 200, result: 'Success'})
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

app.get('/:web', (req,res) => {
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