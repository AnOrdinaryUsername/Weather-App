!function(){"use strict";(()=>{const t=document.querySelector("#geolocation"),e=t=>{const{coords:e}=t;(async t=>{let e="";if("object"==typeof t){const{latitude:o,longitude:a}={...t};e=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${o}&lon=${a}&appid=9d958a66e735735b56e66b55bba5ada5`)}else e=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${t}&appid=9d958a66e735735b56e66b55bba5ada5`);const o=await e.json();document.querySelector(".result").textContent=o.name})({latitude:e.latitude,longitude:e.longitude})},o=t=>{document.querySelector("#result").textContent=t?"Error: The Geolocation service failed":"Error: Your browser does not support eolocation."};t.addEventListener("click",(()=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(e,(()=>{o(!0)})):o(!1)}))})()}();