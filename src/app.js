import $ from 'jquery'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './style.css'

const axios = require('axios')


window.$ = window.jQuery = $;

AOS.init();

let post_id = 2

axios.get(`http://localhost:8000/comment/${post_id}`)
    .then(function(res){
      console.log(res.data[0].content)
      let data = res.data[0]
      console.log(data)
      $("div li:last-child").append(`<li>[ ${data.nickname} ] ${data.content} - ${data.short_date} </li>`)
    })




