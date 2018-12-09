import $ from 'jquery'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './style.css'

const axios = require('axios')


window.$ = window.jQuery = $;

AOS.init();
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "62ZrhZvwwJncOp6eqJmUgmAEUfFEqj6o4jh5nfPOBfvGWP2VKtDXIdKvtdzflETa";

axios.get('http://localhost:8000/comment/1')
    .then(function(res){
      console.log(res)
    })



