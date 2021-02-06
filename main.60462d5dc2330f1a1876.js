!function(){"use strict";var e={9651:function(e,t,n){n(682),n(2526),n(1817),n(2443),n(2401),n(8722),n(2165),n(9007),n(6066),n(3510),n(1840),n(6982),n(2159),n(6649),n(9341),n(543),n(9170),n(2222),n(545),n(6541),n(3290),n(7327),n(9826),n(4553),n(4944),n(6535),n(9554),n(1038),n(6699),n(2772),n(9753),n(6992),n(9600),n(4986),n(1249),n(6572),n(5827),n(6644),n(5069),n(7042),n(5212),n(2707),n(8706),n(561),n(3792),n(9244),n(8264),n(6938),n(9575),n(6716),n(3843),n(8733),n(5735),n(6078),n(3710),n(4812),n(4855),n(8309),n(5837),n(8862),n(3706),n(1532),n(9752),n(2376),n(3181),n(3484),n(2388),n(8621),n(403),n(4755),n(5438),n(332),n(658),n(197),n(4914),n(2420),n(160),n(970),n(2703),n(3689),n(9653),n(3299),n(5192),n(3161),n(4048),n(8285),n(4363),n(5994),n(1874),n(9494),n(6977),n(5147),n(9601),n(8011),n(9595),n(3321),n(9070),n(5500),n(9720),n(3371),n(8559),n(5003),n(9337),n(6210),n(489),n(3304),n(1825),n(8410),n(2200),n(7941),n(4869),n(3952),n(7227),n(514),n(8304),n(1539),n(6833),n(4678),n(1058),n(8674),n(7922),n(4668),n(7727),n(224),n(2419),n(9596),n(2586),n(4819),n(5683),n(9361),n(1037),n(5898),n(7556),n(4361),n(3593),n(9532),n(1299),n(4603),n(4916),n(2087),n(8386),n(7601),n(9714),n(189),n(9841),n(7852),n(4953),n(2023),n(8783),n(4723),n(6373),n(6528),n(3112),n(8992),n(2481),n(5306),n(8757),n(4765),n(3123),n(6755),n(3210),n(8702),n(5674),n(5218),n(4475),n(7929),n(915),n(9253),n(2125),n(8830),n(8734),n(9254),n(7268),n(7397),n(86),n(623),n(4197),n(6495),n(7145),n(5109),n(5125),n(2472),n(9743),n(8255),n(9135),n(2990),n(8927),n(3105),n(5035),n(4345),n(7174),n(2846),n(8145),n(4731),n(7209),n(6319),n(8867),n(7789),n(3739),n(5206),n(9368),n(4483),n(2056),n(3462),n(678),n(7462),n(3824),n(5021),n(2974),n(5016),n(4129),n(8478),n(4747),n(3948),n(4633),n(5844),n(2564),n(285),n(3753),n(1637),n(5666);var r={isPresent:!1,toggleView:function(){var e=document.querySelector("div.alert");e.classList.toggle("hidden"),this.isPresent=!this.isPresent,this.isPresent?e.setAttribute("aria-hidden",!1):e.setAttribute("aria-hidden",!0)},message:function(e){document.querySelector(".message__text").textContent=e}},o=function(e){return document.querySelector(e)},a={editDisplay:function(e){var t=e.image,n=e.location,r=e.phrase,a=e.misc,i=o(".weather__image");i.src="https://openweathermap.org/img/wn/".concat(t.name,"@4x.png"),i.alt=t.alt,o(".weather__city").firstChild.textContent=n.city,o(".weather__country").textContent=n.country,o(".weather__temp").textContent=r.temp,o(".weather__phrase").textContent=r.desc;var c=document.getElementsByClassName("row__col--2"),u=Object.values(a);c.forEach((function(e,t){e.textContent=u[t]}))}},i=function(e){return e[0].toUpperCase()+e.slice(1)},c={grabNumberOfUnits:function(e,t,n){if("string"==typeof e){var r=[];switch(t){case"imperial":r=["°F"," in"," mph"];break;case"metric":r=["°C"," mm"," kph"];break;default:throw new Error("Measurement system not found.")}for(var o=r.indexOf(n),a=e.indexOf(r[o]),i="",c=0;c<a;++c)i+=e[c];return i}},metric:{convertToCelsius:function(e){if("string"==typeof e){var t=c.grabNumberOfUnits(e,"imperial","°F");return"".concat(Math.round(((Number(t)-32)*(5/9)).toFixed(2)),"°C")}return"".concat(Math.round(((Number(e)-32)*(5/9)).toFixed(2)),"°C")},convertToKPH:function(e){if("string"==typeof e){var t=c.grabNumberOfUnits(e,"imperial"," mph");return"".concat(Math.round((1.609*Number(t)).toFixed(2))," kph")}return"".concat(Math.round((1.609*Number(e)).toFixed(2))," kph")},convertToMillimeter:function(e){if("string"==typeof e){var t=c.grabNumberOfUnits(e,"imperial"," in");return"".concat(Number(25.4*t).toFixed(2)," mm")}return"".concat(Number(25.4*e).toFixed(2)," mm")},updateWeatherDisplay:function(){var e=this,t=document.querySelector(".weather__temp"),n=t.textContent;t.textContent=this.convertToCelsius(n),document.getElementsByClassName("row__col--2").forEach((function(t){if(t.textContent.includes("in")){var n=t.textContent;t.textContent=e.convertToMillimeter(n)}else if(t.textContent.includes("°F")){var r=t.textContent;t.textContent=e.convertToCelsius(r)}else if(t.textContent.includes("mph")){var o=t.textContent;t.textContent=e.convertToKPH(o)}}))}},imperial:{convertToFahrenheit:function(e){if("string"==typeof e){var t=c.grabNumberOfUnits(e,"metric","°C");return"".concat(Math.round((1.8*t+32).toFixed(2)),"°F")}return"".concat(Math.round((1.8*e+32).toFixed(2)),"°F")},convertToMPH:function(e){if("string"==typeof e){var t=c.grabNumberOfUnits(e,"metric"," kph");return"".concat(Math.round((Number(t)/1.609).toFixed(2))," mph")}return"".concat(Math.round((Number(e)/1.609).toFixed(2))," mph")},convertToInch:function(e){if("string"==typeof e){var t=c.grabNumberOfUnits(e,"metric"," mm");return"".concat(Number(t/25.4).toFixed(2)," in")}return"".concat(Number(e/25.4).toFixed(2)," in")},updateWeatherDisplay:function(){var e=this,t=document.querySelector(".weather__temp"),n=t.textContent;t.textContent=this.convertToFahrenheit(n),document.getElementsByClassName("row__col--2").forEach((function(t){if(t.textContent.includes("mm")){var n=t.textContent;t.textContent=e.convertToInch(n)}else if(t.textContent.includes("°C")){var r=t.textContent;t.textContent=e.convertToFahrenheit(r)}else if(t.textContent.includes("kph")){var o=t.textContent;t.textContent=e.convertToMPH(o)}}))}}};function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t,n,r,o,a,i){try{var c=e[a](i),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(r,o)}function m(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function i(e){h(a,r,o,i,c,"next",e)}function c(e){h(a,r,o,i,c,"throw",e)}i(void 0)}))}}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p=function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),d(this,"grabWeatherData",function(){var e=m(regeneratorRuntime.mark((function e(t){var n,o,a,i,c=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=c.length>1&&void 0!==c[1]?c[1]:"imperial",o=null,e.prev=2,r.isPresent&&r.toggleView(),"object"!==l(t)){e.next=11;break}return a=t.latitude,i=t.longitude,e.next=8,fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(a,"&lon=").concat(i,"&units=").concat(n,"&appid=9d958a66e735735b56e66b55bba5ada5"),{mode:"cors"});case 8:o=e.sent,e.next=14;break;case 11:return e.next=13,fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(t,"&units=").concat(n,"&appid=9d958a66e735735b56e66b55bba5ada5"),{mode:"cors"});case 13:o=e.sent;case 14:e.next=22;break;case 16:return e.prev=16,e.t0=e.catch(2),console.error(e.t0),r.message("The Geolocation service failed."),r.toggleView(),e.abrupt("return");case 22:return e.abrupt("return",o.json());case 23:case"end":return e.stop()}}),e,null,[[2,16]])})));return function(t){return e.apply(this,arguments)}}()),d(this,"showWeather",function(){var e=m(regeneratorRuntime.mark((function e(n){var o,u,l,h,m,d,p,f,v,g,b,y,w;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=null,u=document.querySelector("button.switch"),l="true"===u.getAttribute("aria-checked"),h={temp:null,speed:null,volume:null},e.prev=4,r.isPresent&&r.toggleView(),!l){e.next=15;break}return e.next=9,t.grabWeatherData(n);case 9:o=e.sent,h.temp="°F",h.speed="mph",h.volume="in",e.next=21;break;case 15:return e.next=17,t.grabWeatherData(n,"metric");case 17:o=e.sent,h.temp="°C",h.speed="kph",h.volume="mm";case 21:if(t.data=o,200===o.cod){e.next=27;break}throw m=o.message,d=i(m),d+=".",new Error(d);case 27:e.next=34;break;case 29:return e.prev=29,e.t0=e.catch(4),r.message(e.t0.message),r.toggleView(),e.abrupt("return");case 34:p={type:null,grabData:function(){var e=null,t=null,n=h.volume;switch(l?"mixed"===this.type?(e=c.imperial.convertToInch(o.rain["1h"]),t=c.imperial.convertToInch(o.snow["1h"])):"rain"===this.type?e=c.imperial.convertToInch(o.rain["1h"]):"snow"===this.type&&(t=c.imperial.convertToInch(o.snow["1h"])):"mixed"===this.type?(e="".concat(o.rain["1h"]).concat(n),t="".concat(o.snow["1h"]).concat(n)):"rain"===this.type?e="".concat(o.rain["1h"]).concat(n):"snow"===this.type&&(t="".concat(o.snow["1h"]).concat(n)),this.type){case"rain":return{rain:e,snow:"—"};case"snow":return{rain:"—",snow:t};case"mixed":return{rain:e,snow:t};default:return{rain:"—",snow:"—"}}}},(f=function(e){return{}.propertyIsEnumerable.call(o,e)})("rain")&&f("snow")?p.type="mixed":f("rain")?p.type="rain":f("snow")&&(p.type="snow"),v=o.weather[0].description,g=i(v),b=h.temp,y=h.speed,w={image:{name:o.weather[0].icon,alt:o.weather[0].description},location:{city:o.name,country:", ".concat(o.sys.country)},phrase:{temp:"".concat(Math.round(o.main.temp)).concat(b),desc:" / ".concat(g)},misc:s({feelsLike:"".concat(Math.round(o.main.feels_like)).concat(b),humidity:"".concat(o.main.humidity,"%"),cloudiness:"".concat(o.clouds.all,"%"),windSpeed:"".concat(Math.round(o.wind.speed)," ").concat(y)},p.grabData())},a.editDisplay(w);case 42:case"end":return e.stop()}}),e,null,[[4,29]])})));return function(t){return e.apply(this,arguments)}}()),this.data=null},f=function(){document.querySelector("button.theme").addEventListener("click",(function(e){var t=e.currentTarget,n=document.documentElement,r=document.querySelector(".fa-moon"),o=document.querySelector(".fa-sun");t.classList.contains("dark")?(localStorage.setItem("theme","light"),n.setAttribute("data-theme","light"),t.classList.toggle("dark"),r.classList.add("remove-svg"),o.classList.remove("remove-svg")):(localStorage.setItem("theme","dark"),n.setAttribute("data-theme","dark"),t.classList.toggle("dark"),o.classList.add("remove-svg"),r.classList.remove("remove-svg"))}))},v=function(){var e=document.querySelector("#geolocation"),t=function(e){var t=e.coords,n={latitude:t.latitude,longitude:t.longitude};(new p).showWeather(n)},n=function(e){var t=e?"The Geolocation service failed. Please enable it in your browser.":"Your browser does not support geolocation.";r.message(t),r.toggleView()};e.addEventListener("click",(function(){r.isPresent&&r.toggleView(),navigator.geolocation?navigator.geolocation.getCurrentPosition(t,(function(){n(!0)})):n(!1)}))},g=function(){var e=document.querySelector("#search-city"),t=document.querySelector(".search__button"),n=function(){var t=e.value;(new p).showWeather(t)};t.addEventListener("click",(function(e){e.preventDefault(),e.stopPropagation(),n()})),e.addEventListener("keydown",(function(e){"Enter"===e.key&&(e.preventDefault(),e.stopPropagation(),n())}))},b=function(){document.querySelector("button.switch").addEventListener("click",(function(e){var t=e.target;"true"===t.getAttribute("aria-checked")?(t.setAttribute("aria-checked","false"),c.metric.updateWeatherDisplay()):(t.setAttribute("aria-checked","true"),c.imperial.updateWeatherDisplay())}),!1)},y=function(){var e=function(){var e="dark",t=document.documentElement,n=localStorage.getItem("theme"),r=window.matchMedia("(prefers-color-scheme: light)");n?(t.setAttribute("data-theme","dark"),"light"===n&&(e="light")):r.matches&&(e="light"),"light"===e&&(!function(){var e=document.querySelector("button.theme"),t=document.querySelector(".fa-moon"),n=document.querySelector(".fa-sun");e.classList.toggle("dark"),t.classList.add("remove-svg"),n.classList.remove("remove-svg")}(),t.setAttribute("data-theme","light"))};window.addEventListener("DOMContentLoaded",(function(){e(),(new p).showWeather("Bat Cave")}))};(function(){y(),f(),v(),g(),b()})()}},t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.m=e,n.x=function(){},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={179:0},t=[[9651,927]],r=function(){},o=function(o,a){for(var i,c,u=a[0],s=a[1],l=a[2],h=a[3],m=0,d=[];m<u.length;m++)c=u[m],n.o(e,c)&&e[c]&&d.push(e[c][0]),e[c]=0;for(i in s)n.o(s,i)&&(n.m[i]=s[i]);for(l&&l(n),o&&o(a);d.length;)d.shift()();return h&&t.push.apply(t,h),r()},a=self.webpackChunkweather_app=self.webpackChunkweather_app||[];function i(){for(var r,o=0;o<t.length;o++){for(var a=t[o],i=!0,c=1;c<a.length;c++){var u=a[c];0!==e[u]&&(i=!1)}i&&(t.splice(o--,1),r=n(n.s=a[0]))}return 0===t.length&&(n.x(),n.x=function(){}),r}a.forEach(o.bind(null,0)),a.push=o.bind(null,a.push.bind(a));var c=n.x;n.x=function(){return n.x=c||function(){},(r=i)()}}(),n.x()}();