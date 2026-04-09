(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const L={mosque:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2C12 2 8 6 8 9c0 1.5.7 2.8 2 3.5V22h4V12.5c1.3-.7 2-2 2-3.5 0-3-4-7-4-7z"/>
    <path d="M3 22V14c0-1 .5-2 1.5-2.5S7 11 7 10"/>
    <path d="M21 22V14c0-1-.5-2-1.5-2.5S17 11 17 10"/>
    <line x1="3" y1="22" x2="21" y2="22"/>
  </svg>`,community:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>`,book:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <line x1="8" y1="7" x2="16" y2="7"/>
    <line x1="8" y1="11" x2="13" y2="11"/>
  </svg>`,heart:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>`,compass:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
  </svg>`},ke="https://caferi-toplumu.onrender.com",_e="http://localhost:8000",ze=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?`${_e}/api`:`${ke}/api`;function Ee(e=!1){const a={"Content-Type":"application/json"};if(e){const n=localStorage.getItem("access_token");n&&(a.Authorization=`Bearer ${n}`)}return a}async function g(e,a={}){const n=`${ze}${e}`,t={method:a.method||"GET",headers:Ee(a.requireAuth),...a};a.body&&(t.body=JSON.stringify(a.body));try{const i=await fetch(n,t),r=await i.json();return i.status===401&&a.requireAuth?(X(),{_error:!0,message:"Oturum süresi doldu"}):i.ok?r:{_error:!0,...r,status:i.status}}catch(i){return console.error("API Error:",i),{_error:!0,message:"Bağlantı xətası!"}}}async function W(e,a){const n=await g("/auth/login/",{method:"POST",body:{email:e,password:a}});if(!n._error){localStorage.setItem("access_token",n.access),localStorage.setItem("refresh_token",n.refresh);try{const t=JSON.parse(atob(n.access.split(".")[1]));localStorage.setItem("user_email",t.email),localStorage.setItem("user_role",t.role)}catch{}return!0}return!1}async function we(e){const a=await g("/auth/login/google/",{method:"POST",body:{credential:e}});if(!a._error){localStorage.setItem("access_token",a.access),localStorage.setItem("refresh_token",a.refresh);try{const n=JSON.parse(atob(a.access.split(".")[1]));localStorage.setItem("user_email",n.email),localStorage.setItem("user_role",n.role)}catch{}return{success:!0,created:a.created}}return{success:!1}}async function Ie(e){return await g("/auth/register/",{method:"POST",body:e})}function X(){localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),localStorage.removeItem("user_email"),localStorage.removeItem("user_role"),window.dispatchEvent(new Event("authChange"))}function b(){return!!localStorage.getItem("access_token")}function y(e,a="info",n=3e3){let t=document.querySelector(".toast-container");t||(t=document.createElement("div"),t.className="toast-container",document.body.appendChild(t));const i=document.createElement("div");i.className=`toast toast--${a}`;const r={success:"✅",error:"❌",info:"ℹ️"};i.innerHTML=`
    <span class="toast__icon">${r[a]||"🔔"}</span>
    <span class="toast__message">${e}</span>
    <button class="toast__close">✕</button>
  `,t.appendChild(i);const o=()=>{i.style.opacity="0",i.style.transform="translateY(-20px)",setTimeout(()=>i.remove(),300)};i.querySelector(".toast__close").addEventListener("click",o),setTimeout(o,n)}function Be(){const e=localStorage.getItem("theme")||"dark";return document.documentElement.setAttribute("data-theme",e),e}Be();function pe(){const e=document.getElementById("app-header"),a=b()?"var(--color-primary)":"var(--text-muted)",t=(document.documentElement.getAttribute("data-theme")||"dark")==="light"?'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>':'<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';e.innerHTML=`
    <a href="#prayer" class="app-header__logo" style="text-decoration:none; color:inherit; cursor:pointer;">
      <div class="app-header__icon">🕌</div>
      <div>
        <div class="app-header__title" id="app-title">Ehli-Beyt Ankara</div>
        <div class="app-header__subtitle">Dijital Topluluk Ekosistemi</div>
      </div>
    </a>
    <div style="display:flex; align-items:center; gap: 4px;">
      <button id="theme-toggle" style="background:none; border:none; color:var(--text-muted); cursor:pointer; padding:8px; display:flex; align-items:center; transition: color 0.2s;">
        <svg id="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
          ${t}
        </svg>
      </button>
      <a href="#${b()?"profile":"auth"}" id="header-profile-action" style="color:${a}; text-decoration:none; display:flex; align-items:center; padding:8px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </a>
    </div>
  `,document.getElementById("theme-toggle").addEventListener("click",()=>{const i=document.documentElement,o=i.getAttribute("data-theme")==="light"?"dark":"light";i.setAttribute("data-theme",o),localStorage.setItem("theme",o),document.getElementById("theme-icon").innerHTML=o==="light"?'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>':'<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'})}const Ae=[{id:"prayer",label:"Namaz",icon:L.mosque},{id:"community",label:"Topluluk",icon:L.community},{id:"ilim",label:"İlim",icon:L.book},{id:"bagis",label:"Bağış",icon:L.heart},{id:"ziyaret",label:"Ziyaret",icon:L.compass}];function Se(e,a){const n=document.getElementById("bottom-nav");n.innerHTML=Ae.map(t=>`
    <button class="nav-item ${e===t.id?"active":""}" data-page="${t.id}" id="nav-${t.id}">
      ${t.icon}
      <span>${t.label}</span>
    </button>
  `).join(""),n.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.page;a(i)})})}const V=Math.PI/180,F=180/Math.PI,Q={Jafari:{name:"Shia Ithna-Ashari",fajrAngle:16,ishaAngle:14,maghribAngle:4,midnight:"Jafari"},ISNA:{name:"Islamic Society of North America",fajrAngle:15,ishaAngle:15,maghribAngle:0,midnight:"Standard"},MWL:{name:"Muslim World League",fajrAngle:18,ishaAngle:17,maghribAngle:0,midnight:"Standard"}};function $e(e,a,n){a<=2&&(e-=1,a+=12);const t=Math.floor(e/100),i=2-t+Math.floor(t/4);return Math.floor(365.25*(e+4716))+Math.floor(30.6001*(a+1))+n+i-1524.5}function K(e){const a=e-2451545,n=Z(357.529+.98560028*a),t=Z(280.459+.98564736*a),i=Z(t+1.915*w(n)+.02*w(2*n)),r=23.439-36e-8*a,o=De(N(r)*w(i),N(i))/15,c=t/15-Y(o);return{declination:Le(w(r)*w(i)),equation:c}}function ye(e,a){return Y(12-a)}function B(e,a,n,t){const i=K(D+a).declination,r=ye(a,K(D+a).equation),o=1/15*je((-w(e)-w(i)*w(n))/(N(i)*N(n)));return r+(t==="ccw"?-o:o)}function Me(e,a,n){const t=K(D+a).declination,i=-Ce(1/(e+Te(Math.abs(n-t))));return B(i,a,n,"cw")}function w(e){return Math.sin(e*V)}function N(e){return Math.cos(e*V)}function Te(e){return Math.tan(e*V)}function Le(e){return Math.asin(e)*F}function je(e){return Math.acos(e)*F}function Ce(e){return Math.atan(e)*F}function De(e,a){return Math.atan2(e,a)*F}function Z(e){return ve(e,360)}function Y(e){return ve(e,24)}function ve(e,a){return e=e-a*Math.floor(e/a),e<0?e+a:e}let D;function qe(e,a,n,t,i="Jafari"){const r=Q[i]||Q.Jafari,o=e.getFullYear(),c=e.getMonth()+1,s=e.getDate();D=$e(o,c,s)-n/360;let l={imsak:5,fajr:5,sunrise:6,dhuhr:12,asr:13,sunset:18,maghrib:18,isha:18};for(let d=0;d<3;d++)l=He(l,a,r);const m=t-n/15;for(const d in l)l[d]+=m;if(l.imsak=l.fajr-10/60,r.midnight==="Jafari"){const d=te(l.sunset,l.fajr);l.midnight=l.sunset+d/2}else{const d=te(l.sunset,l.sunrise);l.midnight=l.sunset+d/2}return l}function He(e,a,n){const t=i=>K(D+i);return{imsak:B(n.fajrAngle+.5,e.imsak,a,"ccw"),fajr:B(n.fajrAngle,e.fajr,a,"ccw"),sunrise:B(ee(),e.sunrise,a,"ccw"),dhuhr:ye(e.dhuhr,t(e.dhuhr).equation),asr:Me(1,e.asr,a),sunset:B(ee(),e.sunset,a,"cw"),maghrib:B(n.maghribAngle,e.maghrib,a,"cw"),isha:B(n.ishaAngle,e.isha,a,"cw")}}function ee(){return .833+.0347*Math.sqrt(0)}function te(e,a){return Y(a-e)}function _(e){if(isNaN(e))return"--:--";e=Y(e);const a=Math.floor(e),n=Math.floor((e-a)*60);return`${String(a).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function ae(e,a,n,t){const i=qe(e,a,n,t,"Jafari");return{Fajr:_(i.fajr),Sunrise:_(i.sunrise),Dhuhr:_(i.dhuhr),Asr:_(i.asr),Sunset:_(i.sunset),Maghrib:_(i.maghrib),Isha:_(i.isha),Imsak:_(i.imsak),Midnight:_(i.midnight)}}function Re(e){const a=e.getFullYear(),n=e.getMonth()+1,t=e.getDate();let i=a,r=n;r<=2&&(i--,r+=12);const o=Math.floor(i/100),c=2-o+Math.floor(o/4),s=Math.floor(365.25*(i+4716))+Math.floor(30.6001*(r+1))+t+c-1524.5,l=Math.floor(s)-1948440+10632,m=Math.floor((l-1)/10631),d=l-10631*m+354,p=Math.floor((10985-d)/5316)*Math.floor(50*d/17719)+Math.floor(d/5670)*Math.floor(43*d/15238),u=d-Math.floor((30-p)/15)*Math.floor(17719*p/50)-Math.floor(p/16)*Math.floor(15238*p/43)+29,v=Math.floor(24*u/709),k=u-Math.floor(709*v/24),I=30*m+p-30,z=["Muharrem","Safer","Rebiülevvel","Rebiülahir","Cemaziyelevvel","Cemaziyelahir","Recep","Şaban","Ramazan","Şevval","Zilkade","Zilhicce"],q=["مُحَرَّم","صَفَر","رَبيع الأوَّل","رَبيع الثاني","جُمادى الأولى","جُمادى الآخرة","رَجَب","شَعبان","رَمَضان","شَوَّال","ذو القِعدة","ذو الحِجَّة"];return{day:Math.max(1,Math.min(30,k)),month:v,year:I,monthName:z[v-1]||"",monthNameAr:q[v-1]||""}}const Pe={"2026-04-05":{Fajr:"04:53",Sunrise:"06:20",Dhuhr:"12:56",Asr:"16:32",Maghrib:"19:23",Isha:"20:44",hijri:"17 Şevval 1447"},"2026-04-06":{Fajr:"04:51",Sunrise:"06:18",Dhuhr:"12:56",Asr:"16:33",Maghrib:"19:24",Isha:"20:45",hijri:"18 Şevval 1447"},"2026-04-07":{Fajr:"04:50",Sunrise:"06:17",Dhuhr:"12:56",Asr:"16:33",Maghrib:"19:25",Isha:"20:46",hijri:"19 Şevval 1447"},"2026-04-08":{Fajr:"04:48",Sunrise:"06:15",Dhuhr:"12:56",Asr:"16:33",Maghrib:"19:26",Isha:"20:48",hijri:"20 Şevval 1447"},"2026-04-09":{Fajr:"04:46",Sunrise:"06:14",Dhuhr:"12:55",Asr:"16:34",Maghrib:"19:27",Isha:"20:49",hijri:"21 Şevval 1447"},"2026-04-10":{Fajr:"04:44",Sunrise:"06:12",Dhuhr:"12:55",Asr:"16:34",Maghrib:"19:28",Isha:"20:50",hijri:"22 Şevval 1447"},"2026-04-11":{Fajr:"04:42",Sunrise:"06:11",Dhuhr:"12:55",Asr:"16:34",Maghrib:"19:29",Isha:"20:52",hijri:"23 Şevval 1447"},"2026-04-12":{Fajr:"04:40",Sunrise:"06:09",Dhuhr:"12:55",Asr:"16:35",Maghrib:"19:30",Isha:"20:53",hijri:"24 Şevval 1447"},"2026-04-13":{Fajr:"04:38",Sunrise:"06:07",Dhuhr:"12:54",Asr:"16:35",Maghrib:"19:31",Isha:"20:54",hijri:"25 Şevval 1447"},"2026-04-14":{Fajr:"04:37",Sunrise:"06:06",Dhuhr:"12:54",Asr:"16:35",Maghrib:"19:32",Isha:"20:55",hijri:"26 Şevval 1447"},"2026-04-15":{Fajr:"04:35",Sunrise:"06:04",Dhuhr:"12:54",Asr:"16:36",Maghrib:"19:33",Isha:"20:57",hijri:"27 Şevval 1447"},"2026-04-16":{Fajr:"04:33",Sunrise:"06:03",Dhuhr:"12:54",Asr:"16:36",Maghrib:"19:34",Isha:"20:58",hijri:"28 Şevval 1447"},"2026-04-17":{Fajr:"04:31",Sunrise:"06:01",Dhuhr:"12:53",Asr:"16:36",Maghrib:"19:35",Isha:"20:59",hijri:"29 Şevval 1447"},"2026-04-18":{Fajr:"04:29",Sunrise:"06:00",Dhuhr:"12:53",Asr:"16:36",Maghrib:"19:36",Isha:"21:01",hijri:"1 Zilkade 1447"},"2026-04-19":{Fajr:"04:27",Sunrise:"05:59",Dhuhr:"12:53",Asr:"16:37",Maghrib:"19:37",Isha:"21:02",hijri:"2 Zilkade 1447"},"2026-04-20":{Fajr:"04:26",Sunrise:"05:57",Dhuhr:"12:53",Asr:"16:37",Maghrib:"19:38",Isha:"21:03",hijri:"3 Zilkade 1447"},"2026-04-21":{Fajr:"04:24",Sunrise:"05:56",Dhuhr:"12:52",Asr:"16:37",Maghrib:"19:39",Isha:"21:05",hijri:"4 Zilkade 1447"},"2026-04-22":{Fajr:"04:22",Sunrise:"05:54",Dhuhr:"12:52",Asr:"16:38",Maghrib:"19:40",Isha:"21:06",hijri:"5 Zilkade 1447"},"2026-04-23":{Fajr:"04:20",Sunrise:"05:53",Dhuhr:"12:52",Asr:"16:38",Maghrib:"19:41",Isha:"21:08",hijri:"6 Zilkade 1447"},"2026-04-24":{Fajr:"04:18",Sunrise:"05:51",Dhuhr:"12:52",Asr:"16:38",Maghrib:"19:42",Isha:"21:09",hijri:"7 Zilkade 1447"},"2026-04-25":{Fajr:"04:17",Sunrise:"05:50",Dhuhr:"12:52",Asr:"16:38",Maghrib:"19:43",Isha:"21:10",hijri:"8 Zilkade 1447"},"2026-04-26":{Fajr:"04:15",Sunrise:"05:49",Dhuhr:"12:51",Asr:"16:39",Maghrib:"19:44",Isha:"21:12",hijri:"9 Zilkade 1447"},"2026-04-27":{Fajr:"04:13",Sunrise:"05:47",Dhuhr:"12:51",Asr:"16:39",Maghrib:"19:45",Isha:"21:13",hijri:"10 Zilkade 1447"},"2026-04-28":{Fajr:"04:11",Sunrise:"05:46",Dhuhr:"12:51",Asr:"16:39",Maghrib:"19:46",Isha:"21:15",hijri:"11 Zilkade 1447"},"2026-04-29":{Fajr:"04:10",Sunrise:"05:45",Dhuhr:"12:51",Asr:"16:39",Maghrib:"19:47",Isha:"21:16",hijri:"12 Zilkade 1447"},"2026-04-30":{Fajr:"04:08",Sunrise:"05:43",Dhuhr:"12:51",Asr:"16:40",Maghrib:"19:48",Isha:"21:17",hijri:"13 Zilkade 1447"},"2026-05-01":{Fajr:"04:06",Sunrise:"05:42",Dhuhr:"12:51",Asr:"16:40",Maghrib:"19:49",Isha:"21:19",hijri:"14 Zilkade 1447"},"2026-05-02":{Fajr:"04:04",Sunrise:"05:41",Dhuhr:"12:51",Asr:"16:40",Maghrib:"19:50",Isha:"21:20",hijri:"15 Zilkade 1447"},"2026-05-03":{Fajr:"04:03",Sunrise:"05:40",Dhuhr:"12:51",Asr:"16:40",Maghrib:"19:51",Isha:"21:22",hijri:"16 Zilkade 1447"},"2026-05-04":{Fajr:"04:01",Sunrise:"05:39",Dhuhr:"12:50",Asr:"16:41",Maghrib:"19:52",Isha:"21:23",hijri:"17 Zilkade 1447"},"2026-05-05":{Fajr:"03:59",Sunrise:"05:37",Dhuhr:"12:50",Asr:"16:41",Maghrib:"19:53",Isha:"21:25",hijri:"18 Zilkade 1447"},"2026-05-06":{Fajr:"03:58",Sunrise:"05:36",Dhuhr:"12:50",Asr:"16:41",Maghrib:"19:54",Isha:"21:26",hijri:"19 Zilkade 1447"}},Ke=["Muharrem","Safer","Rebiülevvel","Rebiülahir","Cemaziyelevvel","Cemaziyelahir","Recep","Şaban","Ramazan","Şevval","Zilkade","Zilhicce"],Ne=["مُحَرَّم","صَفَر","رَبيع الأوَّل","رَبيع الثاني","جُمادى الأولى","جُمادى الآخرة","رَجَب","شَعبان","رَمَضان","شَوَّال","ذو القِعدة","ذو الحِجَّة"];function Ge(e){const a=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,n=Pe[a];if(!n)return null;const t=n.hijri.split(" "),i=parseInt(t[0]),r=t[1],o=parseInt(t[2]),c=Ke.indexOf(r);return{timings:{Fajr:n.Fajr,Sunrise:n.Sunrise,Dhuhr:n.Dhuhr,Asr:n.Asr,Maghrib:n.Maghrib,Isha:n.Isha},hijri:{day:i,month:c+1,year:o,monthName:r,monthNameAr:Ne[c]||""},isStatic:!0}}const ie=39.9334,ne=32.8597,re=3,G=[{key:"Fajr",name:"İmsak",icon:"🌙"},{key:"Sunrise",name:"Güneş",icon:"🌅"},{key:"Dhuhr",name:"Öğle",icon:"☀️"},{key:"Asr",name:"İkindi",icon:"🌤️"},{key:"Maghrib",name:"Akşam",icon:"🌆"},{key:"Isha",name:"Yatsı",icon:"🌃"}],C=[{id:"haci-ruslan",name:"Hacı Ruslan",desc:"Hacı Ruslan sesi ile ezan",file:"/assets/audio/Haci Ruslan.mp3"},{id:"rahim-muazzinzade",name:"Rahim Müəzzinzade",desc:"Rahim Müəzzinzade sesi ile ezan",file:"/assets/audio/Rahim Muazzinzade.mp3"}];let f=localStorage.getItem("selectedEzan")||"haci-ruslan",S=localStorage.getItem("abdestReminder")!=="false",E=localStorage.getItem("ezanAutoPlay")!=="false",M=null,h=null,x=!1,se={},oe={};function Fe(){const e=new Date,a=Ge(e);if(a){const i=ae(e,ie,ne,re);return a.timings.Sunset=i.Sunset,a.timings.Midnight=i.Midnight,{timings:a.timings,hijri:a.hijri,date:e,isStatic:!0}}const n=ae(e,ie,ne,re),t=Re(e);return{timings:n,hijri:t,date:e,isStatic:!1}}function ge(e){const a=new Date,n=a.getHours()*60+a.getMinutes();for(const t of G){const i=e[t.key];if(!i||i==="--:--")continue;const[r,o]=i.split(":").map(Number),c=r*60+o;if(c>n)return{...t,time:i,prayerMinutes:c}}return{...G[0],time:e.Fajr,prayerMinutes:1440}}function he(e){const a=new Date,[n,t]=e.split(":").map(Number);let i=n*60+t-(a.getHours()*60+a.getMinutes());i<0&&(i+=1440);const r=Math.floor(i/60),o=i%60,c=59-a.getSeconds();return`${String(r).padStart(2,"0")}:${String(o).padStart(2,"0")}:${String(c).padStart(2,"0")}`}function J(e){const a=new Date,[n,t]=e.split(":").map(Number);let i=n*60+t-(a.getHours()*60+a.getMinutes());return i<0&&(i+=1440),i}function be(e){const a=C.find(n=>n.id===e);if(a){if(h&&x){h.pause(),x=!1,R(),P(!1);return}h&&(h.pause(),h=null),h=new Audio(a.file),h.volume=1,x=!0,h.play().catch(n=>{console.warn("Ezan playing failed:",n),x=!1}),h.addEventListener("ended",()=>{x=!1,R(),P(!1)}),h.addEventListener("timeupdate",()=>{Ye(h)}),R(),P(!0)}}function fe(){h&&(h.pause(),h.currentTime=0,h=null,x=!1,R(),P(!1))}function R(){document.querySelectorAll(".ezan-play-btn").forEach(e=>{e.dataset.ezanId===f&&x?(e.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',e.classList.add("playing")):(e.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><polygon points="5,3 19,12 5,21"/></svg>',e.classList.remove("playing"))})}function P(e){const a=document.getElementById("ezan-waveform");a&&(e?a.classList.add("active"):a.classList.remove("active"))}function Ye(e){const a=document.getElementById("ezan-progress-fill"),n=document.getElementById("ezan-time");if(a&&e.duration){const t=e.currentTime/e.duration*100;a.style.width=`${t}%`}if(n&&e.duration){const t=le(e.currentTime),i=le(e.duration);n.textContent=`${t} / ${i}`}}function le(e){const a=Math.floor(e/60),n=Math.floor(e%60);return`${a}:${String(n).padStart(2,"0")}`}function Oe(e){const a=new Date,n=`${a.getHours()}:${String(a.getMinutes()).padStart(2,"0")}`;for(const t of G){const i=e[t.key];!i||i==="--:--"||(S&&J(i)===15&&!oe[t.key]&&(oe[t.key]=!0,Notification.permission==="granted"&&new Notification("🚿 Abdest Vaktidir",{body:`${t.icon} ${t.name} namazına 15 dakika kaldı — Abdest almayı unutmayın!`,icon:"/assets/favicon.svg",tag:`abdest-${t.key}`}),Ze(t)),E&&i===n&&!se[t.key]&&(se[t.key]=!0,Notification.permission==="granted"&&new Notification(`${t.icon} ${t.name} Vakti`,{body:`${t.name} vakti geldi — Ezan okunuyor`,icon:"/assets/favicon.svg",tag:`ezan-${t.key}`}),be(f)))}}function Ze(e){var t;const a=document.getElementById("abdest-toast");a&&a.remove();const n=document.createElement("div");n.id="abdest-toast",n.className="abdest-toast abdest-toast--show",n.innerHTML=`
    <div class="abdest-toast__icon">🚿</div>
    <div class="abdest-toast__text">
      <strong>Abdest Vaktidir!</strong>
      <span>${e.icon} ${e.name} namazına 15 dakika kaldı</span>
    </div>
    <button class="abdest-toast__close" id="abdest-toast-close">✕</button>
  `,document.body.appendChild(n),(t=document.getElementById("abdest-toast-close"))==null||t.addEventListener("click",()=>{n.classList.remove("abdest-toast--show"),setTimeout(()=>n.remove(),400)}),setTimeout(()=>{document.getElementById("abdest-toast")&&(n.classList.remove("abdest-toast--show"),setTimeout(()=>n.remove(),400))},1e4)}function Xe(e){M&&clearInterval(M);const a=()=>{const n=ge(e),t=document.getElementById("prayer-countdown"),i=document.getElementById("prayer-next-name");t&&(t.textContent=he(n.time)),i&&(i.textContent=`${n.icon} ${n.name}`);const r=J(n.time),o=document.getElementById("abdest-reminder-bar");o&&S&&(r<=15&&r>0?(o.style.display="flex",o.querySelector(".abdest-bar__text").textContent=`🚿 Abdest vaktidir — ${n.name} namazına ${r} dk kaldı`):o.style.display="none"),Oe(e)};a(),M=setInterval(a,1e3)}function Ve(e=24){return Array.from({length:e},(a,n)=>`<span class="waveform-bar" style="animation-delay:${(n*.08).toFixed(2)}s"></span>`).join("")}async function de(){var p;const e=document.getElementById("page-content");e.innerHTML=`
    <div class="page">
      <div class="prayer-hero">
        <div class="prayer-hero__mosque">🕌</div>
        <div class="prayer-hero__next-label">BİR SONRAKİ NAMAZ</div>
        <div class="skeleton" style="height:32px;width:150px;margin:8px auto"></div>
        <div class="skeleton" style="height:48px;width:200px;margin:8px auto"></div>
      </div>
    </div>
  `,"Notification"in window&&Notification.permission==="default"&&Notification.requestPermission();const a=Fe(),n=a.timings,t=a.isStatic,i=a.hijri,r=ge(n),o=`${i.day} ${i.monthNameAr} ${i.year} H.`,c=`${i.day} ${i.monthName} ${i.year}`,s=new Date().toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),l=J(r.time);e.innerHTML=`
    <div class="page">
      <!-- Abdest Reminder Bar -->
      <div class="abdest-reminder-bar" id="abdest-reminder-bar" style="display:${S&&l<=15&&l>0?"flex":"none"}">
        <div class="abdest-bar__icon">🚿</div>
        <div class="abdest-bar__text">🚿 Abdest vaktidir — ${r.name} namazına ${l} dk kaldı</div>
      </div>

      <!-- Hero: Next prayer countdown -->
      <div class="prayer-hero">
        <div class="prayer-hero__mosque">🕌</div>
        <div class="prayer-hero__next-label">BİR SONRAKİ NAMAZ</div>
        <div class="prayer-hero__next-name" id="prayer-next-name">${r.icon} ${r.name}</div>
        <div class="prayer-hero__countdown" id="prayer-countdown">${he(r.time)}</div>
        <div class="prayer-hero__date">
          ${s}<br/>
          <span class="text-arabic text-accent">${o}</span><br/>
          <span class="text-muted" style="font-size:12px">${c}</span>
        </div>
      </div>

      <!-- Method badge -->
      <div style="text-align:center;margin-bottom:16px">
        <span class="badge badge--primary" style="font-size:11px;padding:6px 14px">
          ${t?"✦ Caferi Ezan Vakitleri · ehlibeytalimleri.com":"✦ Caferi (Jafari) Hesaplaması · Offline"}
        </span>
      </div>

      <!-- Prayer times list -->
      <div class="section-header">
        <h2 class="section-title">Günlük Vakitler</h2>
        <span class="badge badge--accent">Ankara</span>
      </div>
      <div class="prayer-list">
        ${G.map(u=>`
            <div class="prayer-item ${r.key===u.key?"prayer-item--active":""}">
              <div class="prayer-item__left">
                <div class="prayer-item__icon">${u.icon}</div>
                <span class="prayer-item__name">${u.name}</span>
              </div>
              <span class="prayer-item__time">${n[u.key]||"--:--"}</span>
            </div>
          `).join("")}
      </div>

      <!-- Extra: Midnight -->
      <div class="card card--glass" style="margin-bottom:20px;text-align:center;padding:14px">
        <span class="text-muted" style="font-size:13px">🕐 Gece Yarısı (Nisf-ul Leyl): </span>
        <span class="text-accent" style="font-weight:600">${n.Midnight||"--:--"}</span>
        <span class="text-muted" style="font-size:11px;display:block;margin-top:4px">Caferi hesabı: Güneş batışından imsaka kadar olan sürenin ortası</span>
      </div>

      <!-- Ezan Selection & Player -->
      <div class="ezan-selector">
        <div class="section-header">
          <h2 class="section-title">Ezan Sesi</h2>
          <span class="badge badge--accent${E?"":" badge--muted"}" id="ezan-status">${x?"🔊 Çalıyor":E?"🔔 Aktif":"🔇 Sessiz"}</span>
        </div>

        <!-- Audio player card -->
        <div class="ezan-player-card" id="ezan-player-card">
          <div class="ezan-player__header">
            <div class="ezan-player__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </div>
            <div>
              <div class="ezan-player__title">Şu an seçili</div>
              <div class="ezan-player__muezzin" id="ezan-current-name">${((p=C.find(u=>u.id===f))==null?void 0:p.name)||"Hacı Ruslan"}</div>
            </div>
          </div>

          <!-- Waveform -->
          <div class="ezan-waveform" id="ezan-waveform">
            ${Ve(28)}
          </div>

          <!-- Progress bar -->
          <div class="ezan-progress">
            <div class="ezan-progress__bar">
              <div class="ezan-progress__fill" id="ezan-progress-fill"></div>
            </div>
            <div class="ezan-progress__time" id="ezan-time">0:00 / 0:00</div>
          </div>
        </div>

        <!-- Ezan options -->
        <div class="ezan-options">
          ${C.map(u=>`
            <div class="ezan-option ${f===u.id?"ezan-option--active":""}" data-ezan="${u.id}" id="ezan-${u.id}">
              <div class="ezan-option__radio"></div>
              <div class="ezan-option__info">
                <div class="ezan-option__label">${u.name}</div>
                <div class="ezan-option__desc">${u.desc}</div>
              </div>
              <button class="ezan-play-btn" data-ezan-id="${u.id}" id="ezan-play-${u.id}" title="Dinle">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><polygon points="5,3 19,12 5,21"/></svg>
              </button>
            </div>
          `).join("")}
        </div>

        <!-- Settings toggles -->
        <div class="ezan-settings-card">
          <div class="ezan-setting-row">
            <div class="ezan-setting__info">
              <span class="ezan-setting__icon">🔔</span>
              <div>
                <div class="ezan-setting__label">Otomatik Ezan Bildirimi</div>
                <div class="ezan-setting__desc">Namaz vakti geldiğinde ezan otomatik olarak okunacaktır</div>
              </div>
            </div>
            <label class="toggle" for="toggle-ezan">
              <input type="checkbox" id="toggle-ezan" ${E?"checked":""} />
              <span class="toggle__slider"></span>
            </label>
          </div>
          <div class="ezan-setting-row">
            <div class="ezan-setting__info">
              <span class="ezan-setting__icon">🚿</span>
              <div>
                <div class="ezan-setting__label">Abdest Hatırlatması</div>
                <div class="ezan-setting__desc">Namaz vaktine 15 dakika kala bildirim gönderir</div>
              </div>
            </div>
            <label class="toggle" for="toggle-abdest">
              <input type="checkbox" id="toggle-abdest" ${S?"checked":""} />
              <span class="toggle__slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Info card -->
      <div class="card" style="margin-top:20px;font-size:13px;color:var(--text-secondary);line-height:1.6">
        ${t?`
          <strong class="text-accent">✅ Veri Kaynağı:</strong><br/>
          Ehl-i Beyt Âlimleri Derneği (ehlibeytalimleri.com) — Caferi ezan vakitleri.<br/>
          <span class="text-muted">Statik veri · Güncel ve doğrulanmış vakitler kullanılmaktadır.</span>
        `:`
          <strong class="text-accent">ℹ️ Hesaplama Methodu:</strong><br/>
          Caferi (Shia Ithna-Ashari / Jafari) — astronomik formüller ile hesaplanmıştır.<br/>
          <span class="text-muted">İmsak: 16° · Yatsı: 14° · Meğrib: Güneş batışı + kızıllık (4°)</span><br/>
          <span class="text-muted">Bu tarih için statik veri bulunmadığı için hesaplama kullanılmaktadır.</span>
        `}
      </div>
    </div>
  `,e.querySelectorAll(".ezan-option").forEach(u=>{u.addEventListener("click",v=>{if(v.target.closest(".ezan-play-btn"))return;f=u.dataset.ezan,localStorage.setItem("selectedEzan",f),e.querySelectorAll(".ezan-option").forEach(z=>z.classList.remove("ezan-option--active")),u.classList.add("ezan-option--active");const k=document.getElementById("ezan-current-name"),I=C.find(z=>z.id===f);k&&I&&(k.textContent=I.name)})}),e.querySelectorAll(".ezan-play-btn").forEach(u=>{u.addEventListener("click",v=>{v.stopPropagation();const k=u.dataset.ezanId;if(k!==f){f=k,localStorage.setItem("selectedEzan",f),e.querySelectorAll(".ezan-option").forEach(O=>O.classList.remove("ezan-option--active"));const z=u.closest(".ezan-option");z&&z.classList.add("ezan-option--active");const q=document.getElementById("ezan-current-name"),U=C.find(O=>O.id===f);q&&U&&(q.textContent=U.name),fe()}be(k);const I=document.getElementById("ezan-status");I&&(I.textContent=x?"🔊 Çalıyor":"🔇 Sessiz")})});const m=document.getElementById("toggle-ezan");m&&(m.checked=E,m.addEventListener("change",()=>{E=m.checked,localStorage.setItem("ezanAutoPlay",E?"true":"false");const u=document.getElementById("ezan-status");u&&(E?(u.textContent=x?"🔊 Çalıyor":"🔔 Aktif",u.classList.remove("badge--muted")):(u.textContent="🔇 Sessiz",u.classList.add("badge--muted")))}));const d=document.getElementById("toggle-abdest");d&&d.addEventListener("change",()=>{S=d.checked,localStorage.setItem("abdestReminder",S?"true":"false")}),Xe(n)}function Je(){M&&(clearInterval(M),M=null),fe()}let H=null;async function Ue(){var a,n,t,i,r;const e=document.getElementById("page-content");e.innerHTML=`
    <div class="page" style="text-align:center;padding:40px;">
      <div class="skeleton" style="width:100%;height:150px;border-radius:12px;margin-bottom:20px;"></div>
      <div class="skeleton" style="width:100%;height:300px;border-radius:12px;"></div>
    </div>
  `;try{const[o,c]=await Promise.all([g("/community/announcements/"),g("/community/help-requests/")]);if(o._error)throw new Error("Duyurular yüklenemedi");e.innerHTML=`
      <div class="page">
        <!-- Community banner -->
        <div class="community-banner">
          <div class="community-banner__icon">🤲</div>
          <h1 class="community-banner__title">Topluluk Meydanı</h1>
          <p class="community-banner__subtitle">Cemaatimizin dijital buluşma noktası</p>
        </div>

        <!-- Live stream card -->
        <div class="live-section">
          <div class="section-header">
            <h2 class="section-title">
              <span class="badge badge--live" style="margin-right:6px">● CANLI</span>
              Canlı Yayın
            </h2>
          </div>
          <div class="live-player-card">
            <div class="live-player__video" id="live-player-container">
              <div class="live-player__placeholder" id="live-placeholder">
                <div class="live-player__play-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><polygon points="5,3 19,12 5,21"/></svg>
                </div>
                <div class="live-player__label">Canlı Yayını İzle</div>
                <div class="live-player__sublabel">Muharrem gecesi programı</div>
              </div>
            </div>
            <div class="live-player__info">
              <div class="live-player__title">📺 Muharrem Gecesi Programı</div>
              <div class="live-player__meta">
                <span class="badge badge--primary" style="font-size:10px">Ankara Caferi Camii</span>
                <span class="text-muted" style="font-size:11px">Her akşam 20:00</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Announcements -->
        <div class="section-header">
          <h2 class="section-title">Duyurular</h2>
          <a href="#" class="section-link">Tümü →</a>
        </div>
        <div class="announcement-list">
          ${o.length>0?o.map(s=>`
            <div class="announcement-card">
              <div class="announcement-card__header">
                <span class="announcement-card__category" style="color:${s.categoryColor}">${s.category}</span>
                <div style="display:flex;align-items:center;gap:8px">
                  ${s.badge?`<span class="badge badge--accent">${s.badge}</span>`:""}
                  <span class="announcement-card__date">${s.date}</span>
                </div>
              </div>
              <h3 class="announcement-card__title">${s.title}</h3>
              <p class="announcement-card__body">${s.body}</p>
            </div>
          `).join(""):'<p class="text-muted text-center" style="font-size:13px">Güncel duyuru bulunmamaktadır.</p>'}
        </div>

        <!-- Help network -->
        <div class="section-header">
          <h2 class="section-title">Yardımlaşma Şebekesi</h2>
        </div>
        <div class="help-grid">
          ${c.length>0?c.map((s,l)=>`
            <div class="help-card" data-help-idx="${l}" id="help-card-${l}">
              <div class="help-card__icon">${s.icon}</div>
              <div class="help-card__title">${s.title}</div>
              <div class="help-card__count">${s.count}</div>
            </div>
          `).join(""):'<p class="text-muted text-center">Yardım kategorisi bulunamadı.</p>'}
        </div>

        <!-- Help detail panel -->
        <div class="help-detail-panel" id="help-detail-panel" style="display:none">
          <div class="help-detail__header">
            <h3 class="help-detail__title" id="help-detail-title"></h3>
            <button class="help-detail__close" id="help-detail-close">✕</button>
          </div>
          <div class="help-detail__list" id="help-detail-list"></div>
        </div>

        <div style="margin-top:20px;">
          <button class="btn btn--outline btn--full" id="show-help-form-btn" style="border-color:var(--color-primary); color:var(--color-primary);">
            ${b()?"➕ Yeni Yardım Talebi Oluştur":"🔑 Yardım Talebi için Giriş Yapın"}
          </button>
          <div id="help-form-container" style="display:none; margin-top:16px;">
            <form id="help-request-form" class="card card--dark" style="padding:20px;">
              <div class="form-group">
                <label class="form-label">Kategori</label>
                <select id="help-category" class="form-select" required>
                  <option value="Kan Bağışı">🩸 Kan Bağışı</option>
                  <option value="İş İlanları">💼 İş İlanı</option>
                  <option value="Öğrenci Desteği">🎓 Öğrenci Desteği</option>
                  <option value="Genel Yardım">🤝 Genel Yardım</option>
                </select>
              </div>
              <div class="form-group" id="blood-group-field">
                <label class="form-label">İhtiyaç Duyulan Kan Grubu</label>
                <select id="help-blood-group" class="form-select">
                  <option value="A Rh+">A Rh+</option><option value="A Rh-">A Rh-</option>
                  <option value="B Rh+">B Rh+</option><option value="B Rh-">B Rh-</option>
                  <option value="0 Rh+">0 Rh+</option><option value="0 Rh-">0 Rh-</option>
                  <option value="AB Rh+">AB Rh+</option><option value="AB Rh-">AB Rh-</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Başlık / Ad Soyad</label>
                <input type="text" id="help-title" class="form-input" placeholder="Örn: Ahmet Yılmaz acil kan arıyor" required>
              </div>
              <div class="form-group">
                <label class="form-label">Açıklama</label>
                <textarea id="help-desc" class="form-textarea" rows="2" placeholder="Detaylı açıklama..." required></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">İletişim (Telefon)</label>
                <input type="text" id="help-contact" class="form-input" placeholder="+90 5XX XXX XX XX">
              </div>
              <button type="submit" class="btn btn--primary btn--full" id="help-submit-btn">Talebi Gönder</button>
            </form>
          </div>
        </div>

        <!-- Quick contact -->
        <div class="card card--accent" style="margin-top:var(--space-lg);text-align:center;padding:var(--space-xl)">
          <div style="font-size:32px;margin-bottom:8px">📞</div>
          <div style="font-weight:700;font-size:var(--font-size-lg);margin-bottom:4px">Acil Durumda Bize Ulaşın</div>
          <div class="text-muted" style="font-size:var(--font-size-sm);margin-bottom:12px">Camii telefon: +90 312 XXX XX XX</div>
          <button class="btn btn--primary" id="quick-call-btn">📱 Hemen Ara</button>
        </div>
      </div>
    `,e.querySelectorAll(".help-card").forEach(s=>{s.addEventListener("click",()=>{const l=parseInt(s.dataset.helpIdx),m=c[l],d=document.getElementById("help-detail-panel"),p=document.getElementById("help-detail-title"),u=document.getElementById("help-detail-list");if(H===l){d.style.display="none",H=null,e.querySelectorAll(".help-card").forEach(v=>v.classList.remove("help-card--active"));return}H=l,e.querySelectorAll(".help-card").forEach(v=>v.classList.remove("help-card--active")),s.classList.add("help-card--active"),p.textContent=`${m.icon} ${m.title}`,m.items&&m.items.length>0?u.innerHTML=m.items.map(v=>`
            <div class="help-detail__item">
              <div class="help-detail__item-info">
                <div class="help-detail__item-name">${v.name}</div>
                <div class="help-detail__item-desc">${v.desc}</div>
              </div>
              <div class="help-detail__item-date">${v.date}</div>
            </div>
          `).join(""):u.innerHTML='<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13px;">Bu kategoride aktif talep yok.</div>',d.style.display="block",d.scrollIntoView({behavior:"smooth",block:"nearest"})})}),(a=document.getElementById("help-detail-close"))==null||a.addEventListener("click",()=>{document.getElementById("help-detail-panel").style.display="none",H=null,e.querySelectorAll(".help-card").forEach(s=>s.classList.remove("help-card--active"))}),(n=document.getElementById("live-placeholder"))==null||n.addEventListener("click",()=>{document.getElementById("live-player-container").innerHTML=`
        <div class="live-player__embed">
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;color:var(--text-secondary)">
            <div style="font-size:48px">📺</div>
            <div style="font-size:14px;text-align:center">Canlı yayın şu anda aktif değildir.<br/>Program saatinde tekrar deneyin.</div>
            <div style="font-size:11px;color:var(--text-muted)">Her akşam 20:00 — Ankara Caferi Camii</div>
          </div>
        </div>
      `}),(t=document.getElementById("show-help-form-btn"))==null||t.addEventListener("click",()=>{if(!b()){window.location.hash="auth";return}const s=document.getElementById("help-form-container"),l=document.getElementById("show-help-form-btn");s.style.display==="none"?(s.style.display="block",l.textContent="✕ Formu Kapat"):(s.style.display="none",l.textContent="➕ Yeni Yardım Talebi Oluştur")}),(i=document.getElementById("help-category"))==null||i.addEventListener("change",s=>{const l=s.target.value;document.getElementById("blood-group-field").style.display=l==="Kan Bağışı"?"block":"none";const m=document.getElementById("help-title"),d=document.getElementById("help-desc"),p=m.previousElementSibling;l==="Kan Bağışı"?(p.textContent="Başlık / Ad Soyad",m.placeholder="Örn: Ahmet Yılmaz acil kan arıyor",d.placeholder="Hastanın yattığı hastane, aciliyet durumu vb. detaylar..."):l==="İş İlanları"?(p.textContent="İş Pozisyonu",m.placeholder="Örn: Tecrübeli Muhasebeci Aranıyor",d.placeholder="İşin tanımı, aranan nitelikler, çalışma koşulları..."):l==="Öğrenci Desteği"?(p.textContent="Destek Türü",m.placeholder="Örn: Üniversite öğrencisine burs veya laptop ihtiyacı",d.placeholder="Öğrencinin okuduğu bölüm, başarı durumu, ihtiyaç detayı..."):(p.textContent="Talebin Kısa Özeti",m.placeholder="Örn: Temel erzak ihtiyacı olan aile",d.placeholder="Yardım talebinizle ilgili detaylı açıklama...")}),(r=document.getElementById("help-request-form"))==null||r.addEventListener("submit",async s=>{s.preventDefault();const l=document.getElementById("help-submit-btn");l.disabled=!0,l.textContent="Gönderiliyor...";const m=document.getElementById("help-category").value;let d=document.getElementById("help-title").value,p=document.getElementById("help-desc").value;if(m==="Kan Bağışı"){const v=document.getElementById("help-blood-group").value;d=`[${v}] ${d}`,p=`Aranan kan grubu: ${v}. ${p}`}(await g("/community/help-requests/create/",{method:"POST",body:{category:m,name:d,desc:p,contact_info:document.getElementById("help-contact").value}}))._error?(y("Talep gönderilirken hata oluştu.","error"),l.disabled=!1,l.textContent="Talebi Gönder"):(y("Talebiniz başarıyla yayınlandı!","success"),s.target.reset(),setTimeout(()=>window.location.reload(),2e3))})}catch{y("Bağlantı hatası: Veriler yüklenemedi.","error"),e.innerHTML='<div class="page text-center"><p class="text-danger">Bilgiler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.</p></div>'}}const ce=[{icon:"📖",title:"Mefatihul-Cinan",author:"Şeyh Abbas Kummi",lang:"TR / AZ",desc:"En kapsamlı dua ve ziyaretname mecmuası. Muharrem'den Zilhicce'ye kadar tüm ay ve gün dualarını içerir."},{icon:"📕",title:"Nehcü'l Belağa",author:"Hz. Ali (a.s)",lang:"TR",desc:"Hz. Ali'nin hutbeleri, mektupları ve hikmetli sözlerinden oluşan eşsiz eser."},{icon:"📗",title:"Sahife-i Seccadiye",author:"İmam Zeyn'el-Abidin (a.s)",lang:"TR / AZ",desc:`4. İmam'ın 54 münacaatını içeren, "Âl-i Muhammed'in Zeburu" olarak bilinen dua kitabı.`},{icon:"📘",title:"Usul-u Kâfi",author:"Şeyh Kuleyni",lang:"TR",desc:"Şia hadis külliyatının en önemli dört kitabından biri. İman, akıl, ilim ve tevhid bölümleri."},{icon:"📙",title:"Risale-i Ameliye",author:"Büyük Merciler",lang:"TR / AZ",desc:"Günlük ibadet ve fıkhi meselelerde mükellefin amelî hükümleri."},{icon:"📓",title:"Bihar-ul Envar",author:"Allame Meclisi",lang:"TR",desc:"110 ciltlik Şia hadis ansiklopedisi. Ehli Beyt'in tüm rivayetlerini kapsar."}];let j=null;async function We(){var a,n;const e=document.getElementById("page-content");e.innerHTML=`
    <div class="page" style="text-align:center;padding:40px;">
      <div class="skeleton" style="width:100%;height:300px;border-radius:24px;margin-bottom:20px;"></div>
    </div>
  `;try{let[t,i]=await Promise.all([g("/ilim/hadith/today/"),g("/ilim/questions/")]);t._error&&(t={text:"İlim talep etmek her Müslüman'a farzdır.",source:"Hz. Muhammed (s.a.a)",reference:"Usul-u Kâfi, c.1, s.30"}),i._error&&(i=[]),e.innerHTML=`
      <div class="page">
        <!-- Hadith of the Day -->
        <div class="hadith-card">
          <div class="hadith-card__label">📿 Günün Hadisi</div>
          <div class="hadith-card__ornament-left">❁</div>
          <div class="hadith-card__ornament-right">❁</div>
          <p class="hadith-card__text">${t.text}</p>
          <div class="hadith-card__source">— ${t.source}</div>
          <p class="hadith-card__ref">${t.reference}</p>
          <button class="hadith-card__share" id="hadith-share-btn" title="Hadisi paylaş">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            Paylaş
          </button>
        </div>

        <!-- Ask the Imam -->
        <div class="ask-section">
          <div class="ask-header">
            <div class="ask-header__icon">🙋</div>
            <div>
              <h2 class="ask-header__title">Hocaya Soru (İstifta)</h2>
              <p class="ask-header__desc">Dini sorularınızı hocamıza iletin</p>
            </div>
          </div>
          
          ${b()?`
          <form id="ask-form" class="mb-lg">
            <div class="form-group">
              <label class="form-label">Sorunuz</label>
              <textarea class="form-textarea" id="question-input" placeholder="Dini sorunuzu buraya yazın..." rows="3" required></textarea>
            </div>
            <div class="form-group" style="display:flex;align-items:center;gap:12px">
              <label style="display:flex;align-items:center;gap:6px;font-size:14px;color:var(--text-secondary);cursor:pointer">
                <input type="checkbox" id="anonymous-check" style="accent-color:var(--color-primary)" />
                Anonim gönder
              </label>
            </div>
            <button type="submit" class="btn btn--primary btn--full" id="ask-submit-btn">
              Soruyu Gönder
            </button>
          </form>
          `:`
          <div class="card card--dark" style="padding:24px; text-align:center; margin-bottom:24px;">
            <p style="margin-bottom:16px; color:var(--text-secondary);">Hocaya soru sormak için giriş yapmanız gerekmektedir.</p>
            <button class="btn btn--outline btn--full" onclick="window.location.hash='auth'">🔑 Giriş Yaparak Soru Sorun</button>
          </div>
          `}

          <!-- Recent Q&A -->
          <div class="section-header">
            <h2 class="section-title">Son Cevaplanan Sorular</h2>
            <span class="badge badge--accent">${i.length||0} soru</span>
          </div>
          <div class="qa-list">
            ${i.length>0?i.map(r=>`
              <div class="qa-item">
                <div class="qa-item__question">
                  <span class="qa-item__q-icon">S</span>
                  ${r.question}
                </div>
                <div class="qa-item__answer">
                  <span class="qa-item__a-icon">C</span>
                  ${r.answer}
                </div>
                <div class="qa-item__date">${r.date}</div>
              </div>
            `).join(""):'<p class="text-muted" style="font-size:13px;text-align:center;">Henüz cevaplanmış soru bulunmuyor.</p>'}
          </div>
        </div>

        <!-- Digital Library -->
        <div class="section-header">
          <h2 class="section-title">📚 Dijital Kütüphane</h2>
          <span class="badge badge--primary">${ce.length} eser</span>
        </div>
        <div class="library-list">
          ${ce.map((r,o)=>`
            <div class="library-item" data-book-idx="${o}" id="book-${o}">
              <div class="library-item__icon">${r.icon}</div>
              <div class="library-item__info">
                <div class="library-item__title">${r.title}</div>
                <div class="library-item__author">${r.author} · ${r.lang}</div>
              </div>
              <span class="library-item__arrow">›</span>
            </div>
            <div class="library-detail" id="book-detail-${o}" style="display:none">
              <p class="library-detail__desc">${r.desc}</p>
              <div class="library-detail__actions">
                <button class="btn btn--outline btn--sm">📥 İndir (PDF)</button>
                <button class="btn btn--outline btn--sm">📖 Online Oku</button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `,(a=document.getElementById("ask-form"))==null||a.addEventListener("submit",async r=>{r.preventDefault();const o=document.getElementById("question-input"),c=document.getElementById("anonymous-check").checked;if(!o.value.trim())return;const s=document.getElementById("ask-submit-btn");s.disabled=!0,s.textContent="Gönderiliyor...",(await g("/ilim/questions/",{method:"POST",body:{text:o.value,is_anonymous:c},requireAuth:!c}))._error?(y("Soru gönderilirken bir hata oluştu.","error"),s.disabled=!1,s.textContent="Soruyu Gönder"):(y("Sorunuz başarıyla iletildi!","success"),o.value="",s.disabled=!1,s.textContent="Soruyu Gönder")}),e.querySelectorAll(".library-item").forEach(r=>{r.addEventListener("click",()=>{const o=parseInt(r.dataset.bookIdx),c=document.getElementById(`book-detail-${o}`);if(j!==null&&j!==o){const s=document.getElementById(`book-detail-${j}`);s&&(s.style.display="none")}c.style.display==="none"?(c.style.display="block",j=o):(c.style.display="none",j=null)})}),(n=document.getElementById("hadith-share-btn"))==null||n.addEventListener("click",async()=>{const r={title:"Günün Hadisi — Ehli-Beyt Ankara",text:`${t.text}
— ${t.source}
(${t.reference})`};if(navigator.share)try{await navigator.share(r)}catch{}else await navigator.clipboard.writeText(r.text),y("Hadis panoya kopyalandı!","success")})}catch{e.innerHTML='<div class="page text-center"><p class="text-danger">Bağlantı hatası: İçerikler yüklenemedi.</p></div>'}}async function Qe(){const e=document.getElementById("page-content");e.innerHTML=`
    <div class="page" style="text-align:center;padding:40px;">
      <div class="skeleton" style="width:100%;height:200px;border-radius:12px;margin-bottom:20px;"></div>
    </div>
  `;try{const a=await g("/bagis/campaigns/");if(a._error)throw new Error("Kampanyalar yüklenemedi");e.innerHTML=`
      <div class="page">
        <div class="bagis-hero">
          <div class="bagis-hero__icon">💎</div>
          <h1 class="bagis-hero__title">Bağış & Katkı</h1>
          <p class="bagis-hero__subtitle">"Allah yolunda harcayanların durumu, yedi başak veren bir tohuma benzer..."</p>
        </div>

        <div class="section-header">
          <h2 class="section-title">Aktif Kampanyalar</h2>
        </div>
        <div class="campaign-list">
          ${a.length>0?a.map(s=>{const l=Math.min(parseFloat(s.collected)/parseFloat(s.target)*100,100).toFixed(1);return`
              <div class="campaign-card">
                <div class="campaign-card__header">
                  <div class="campaign-card__icon">${s.icon}</div>
                  <div class="campaign-card__title">${s.title}</div>
                </div>
                <p class="campaign-card__desc">${s.description}</p>
                <div class="campaign-progress">
                  <div class="campaign-progress__bar">
                    <div class="campaign-progress__fill" style="width: ${l}%"></div>
                  </div>
                  <div class="campaign-progress__stats">
                    <span class="campaign-progress__collected">${parseFloat(s.collected).toLocaleString("tr-TR")} ₺ toplandı</span>
                    <span class="campaign-progress__target">Hedef: ${parseFloat(s.target).toLocaleString("tr-TR")} ₺</span>
                  </div>
                </div>
              </div>
            `}).join(""):'<p class="text-muted text-center" style="font-size:13px">Aktif kampanya bulunmuyor.</p>'}
        </div>

        <div class="divider"></div>

        <div class="donation-form-container">
          <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;">Güvenli Bağış Yap</h3>
          
          <!-- Donation Types -->
          <div class="donation-type-grid" id="donation-types">
            <div class="donation-type-card donation-type-card--active" data-type="Humus">
              <div style="font-size:24px;margin-bottom:4px">🌾</div>
              <div>Humus</div>
            </div>
            <div class="donation-type-card" data-type="Zekat">
              <div style="font-size:24px;margin-bottom:4px">🪙</div>
              <div>Zekat</div>
            </div>
            <div class="donation-type-card" data-type="Sadaka">
              <div style="font-size:24px;margin-bottom:4px">🤲</div>
              <div>Sadaka</div>
            </div>
            <div class="donation-type-card" data-type="Genel Bağış">
              <div style="font-size:24px;margin-bottom:4px">🕌</div>
              <div>Camiye Katkı</div>
            </div>
          </div>

          <!-- Amounts -->
          <div style="margin-bottom:20px">
            <label class="form-label">Miktar Seçin</label>
            <div class="amount-grid" id="amount-options">
              <div class="amount-btn amount-btn--active" data-amount="50">50 ₺</div>
              <div class="amount-btn" data-amount="100">100 ₺</div>
              <div class="amount-btn" data-amount="250">250 ₺</div>
              <div class="amount-btn" data-amount="500">500 ₺</div>
              <div class="amount-btn" data-amount="1000">1000 ₺</div>
              <div class="amount-btn" data-amount="custom" id="custom-amount-btn">Özel</div>
            </div>
            <div id="custom-amount-container" style="display:none;margin-top:10px">
              <input type="number" id="custom-amount-input" class="form-input" placeholder="Miktar girin (₺)" />
            </div>
          </div>

          <!-- Form -->
          <form id="donation-form">
            <div class="form-group">
              <label class="form-label">Kampanya (Opsiyonel)</label>
              <select id="campaign-select" class="form-select">
                <option value="">İlgili kampanyayı seçebilirsiniz</option>
                ${a.map(s=>`<option value="${s.id}">${s.title}</option>`).join("")}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Ad Soyad (Opsiyonel)</label>
              <input type="text" id="donor-name" class="form-input" placeholder="Adınız Soyadınız (Gizli tutmak isterseniz boş bırakın)" />
            </div>
            <button type="submit" class="btn btn--primary btn--full btn--lg" id="donate-submit-btn">
              💳 Bağış Yap
            </button>
            <div style="text-align:center;font-size:11px;color:var(--text-muted);margin-top:12px;display:flex;align-items:center;justify-content:center;gap:4px">
              🔒 256-bit SSL ile güvenli ödeme (Demo)
            </div>
          </form>
        </div>
      </div>
    `;let n="Humus",t=50;const i=e.querySelectorAll(".donation-type-card");i.forEach(s=>{s.addEventListener("click",()=>{i.forEach(l=>l.classList.remove("donation-type-card--active")),s.classList.add("donation-type-card--active"),n=s.dataset.type})});const r=e.querySelectorAll(".amount-btn"),o=document.getElementById("custom-amount-container"),c=document.getElementById("custom-amount-input");r.forEach(s=>{s.addEventListener("click",()=>{r.forEach(l=>l.classList.remove("amount-btn--active")),s.classList.add("amount-btn--active"),s.dataset.amount==="custom"?(o.style.display="block",c.focus(),t=0):(o.style.display="none",t=parseInt(s.dataset.amount))})}),document.getElementById("donation-form").addEventListener("submit",async s=>{s.preventDefault();let l=t;if(document.getElementById("custom-amount-btn").classList.contains("amount-btn--active")&&(l=parseInt(c.value),!l||l<=0)){y("Lütfen geçerli bir miktar girin.","error");return}const m=document.getElementById("campaign-select").value,d=document.getElementById("donor-name").value,p={amount:l,donation_type:n,donor_name:d||"Anonim"};m&&(p.campaign=parseInt(m));const u=document.getElementById("donate-submit-btn");u.disabled=!0,u.textContent="İşleniyor...",(await g("/bagis/donate/",{method:"POST",body:p,requireAuth:!0}))._error?(y("Bağış işlemi sırasında bir hata oluştu.","error"),u.disabled=!1,u.textContent="💳 Bağış Yap"):(y("Bağışınız başarıyla alındı. Allah kabul etsin!","success",5e3),setTimeout(()=>{window.location.reload()},2e3))})}catch{e.innerHTML='<div class="page text-center"><p class="text-danger">Bağlantı hatası: Kampanyalar yüklenemedi.</p></div>'}}const ue=[{icon:"🕋",title:"İmam Hüseyin (a.s) Ziyaretnamesi",desc:"Kerbela · Türkçe & Arapça",content:`<div class="ziyaret-content">
      <p class="ziyaret-content__arabic">اَلسَّلامُ عَلَيْكَ يا اَبا عَبْدِ اللهِ</p>
      <p class="ziyaret-content__tr">Selam olsun sana ey Eba Abdillah!</p>
      <p class="ziyaret-content__arabic">اَلسَّلامُ عَلَيْكَ يَا بْنَ رَسُولِ اللهِ</p>
      <p class="ziyaret-content__tr">Selam olsun sana ey Resulullah'ın oğlu!</p>
      <p class="ziyaret-content__note">— Mefatih-ul Cinan'dan alıntı —</p>
    </div>`},{icon:"🌟",title:"İmam Rıza (a.s) Ziyaretnamesi",desc:"Meşhed · Türkçe & Arapça",content:`<div class="ziyaret-content">
      <p class="ziyaret-content__arabic">اَلسَّلامُ عَلَيْكَ يا عَلِيَّ بْنَ مُوسَى الرِّضا</p>
      <p class="ziyaret-content__tr">Selam olsun sana ey Ali bin Musa er-Rıza!</p>
      <p class="ziyaret-content__note">— Mefatih-ul Cinan'dan alıntı —</p>
    </div>`},{icon:"🕌",title:"Hz. Zeynep (s.a) Türbesi",desc:"Şam · Ziyaret adabı ve dualar",content:`<div class="ziyaret-content">
      <p class="ziyaret-content__arabic">اَلسَّلامُ عَلَيْكِ يا زَيْنَبَ الْكُبْرى</p>
      <p class="ziyaret-content__tr">Selam olsun sana ey Zeyneb-i Kübra!</p>
      <p class="ziyaret-content__arabic">اَلسَّلامُ عَلَيْكِ يا بِنْتَ اَميرِ الْمُؤْمِنينَ</p>
      <p class="ziyaret-content__tr">Selam olsun sana ey Müminlerin Emiri'nin kızı!</p>
    </div>`},{icon:"📿",title:"Erbain Duaları",desc:"Yürüyüş esnasında okunacak dualar",content:`<div class="ziyaret-content">
      <p class="ziyaret-content__subtitle">Erbain Yürüyüşü Ziyaretnamesi</p>
      <p class="ziyaret-content__arabic">اَلسَّلامُ عَلى وَلِيِّ اللهِ وَ حَبيبِهِ</p>
      <p class="ziyaret-content__tr">Selam olsun Allah'ın velisine ve sevgilisine</p>
      <p class="ziyaret-content__note">— Ziyaret-i Erbain · Mefatih-ul Cinan —</p>
    </div>`},{icon:"🗺️",title:"Kutsal Mekanlar Haritası",desc:"Kerbela, Necef, Kazımiye, Samarra",content:`<div class="ziyaret-content">
      <div class="holy-places-grid">
        <div class="holy-place"><div class="holy-place__icon">🕋</div><div class="holy-place__name">Kerbela</div><div class="holy-place__info">İmam Hüseyin & Hz. Abbas</div></div>
        <div class="holy-place"><div class="holy-place__icon">🌟</div><div class="holy-place__name">Necef</div><div class="holy-place__info">İmam Ali Türbesi</div></div>
        <div class="holy-place"><div class="holy-place__icon">🕌</div><div class="holy-place__name">Kazımiye</div><div class="holy-place__info">İmam Kazım & Cevad</div></div>
        <div class="holy-place"><div class="holy-place__icon">✨</div><div class="holy-place__name">Samarra</div><div class="holy-place__info">İmam Hadi & Askeri</div></div>
        <div class="holy-place"><div class="holy-place__icon">🌙</div><div class="holy-place__name">Meşhed</div><div class="holy-place__info">İmam Rıza Türbesi</div></div>
        <div class="holy-place"><div class="holy-place__icon">💫</div><div class="holy-place__name">Şam</div><div class="holy-place__info">Hz. Zeynep & Rukiye</div></div>
      </div>
    </div>`}];let A=null,et=[];async function tt(){var a;const e=document.getElementById("page-content");e.innerHTML='<div class="page text-center" style="padding:40px;"><div class="skeleton" style="width:100%;height:300px;border-radius:12px"></div></div>';try{const n=await g("/ziyaret/tours/");if(n._error)throw new Error("Turlar yüklenemedi");et=n,e.innerHTML=`
      <div class="page">
        <!-- Hero -->
        <div class="ziyaret-hero">
          <div class="ziyaret-hero__icon">🕋</div>
          <h1 class="ziyaret-hero__title">Ziyaret & Koordinasyon</h1>
          <p class="ziyaret-hero__subtitle">Kutsal mekanlara yolculuk — Hizmet Merkezi</p>
        </div>

        <!-- Active Tours -->
        <div class="section-header">
          <h2 class="section-title">Aktif Turlar</h2>
          <span class="badge badge--primary">${n.length} tur</span>
        </div>
        <div class="tour-list">
          ${n.map(t=>`
            <div class="tour-card">
              <div class="tour-card__image" style="background:${t.image}">
                <div class="tour-card__badge">
                  <span class="badge ${t.statusColor}">${t.status}</span>
                </div>
              </div>
              <div class="tour-card__content">
                <h3 class="tour-card__title">${t.title}</h3>
                <div class="tour-card__details">
                  <span class="tour-card__detail">📅 ${t.date}</span>
                  <span class="tour-card__detail">⏱ ${t.duration}</span>
                </div>
                <div class="tour-card__footer">
                  <span class="tour-card__price">${t.price}</span>
                  <span class="tour-card__seats">${t.seats}</span>
                </div>
                <button class="btn btn--primary btn--full tour-btn-scroll" data-tour-id="${t.id}" style="margin-top:12px">
                  Kayıt Ol
                </button>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Pilgrimage Guide -->
        <div class="section-header">
          <h2 class="section-title">📖 Ziyaret Rehberi</h2>
          <span class="badge badge--accent">${ue.length} rehber</span>
        </div>
        <div class="guide-list">
          ${ue.map((t,i)=>`
            <div class="guide-item" data-guide-idx="${i}" id="guide-${i}">
              <div class="guide-item__icon">${t.icon}</div>
              <div>
                <div class="guide-item__title">${t.title}</div>
                <div class="guide-item__desc">${t.desc}</div>
              </div>
              <span class="guide-item__arrow" id="guide-arrow-${i}">›</span>
            </div>
            <div class="guide-detail" id="guide-detail-${i}" style="display:none">
              ${t.content}
            </div>
          `).join("")}
        </div>

        <!-- Registration Form -->
        <div class="divider"></div>
        <div class="registration-form" id="register-form-section">
          ${b()?`
          <h3 class="registration-form__title">📋 Online Kayıt Formu</h3>
          <form id="registration-form">
            <div class="form-group">
              <label class="form-label">Tur Seçimi</label>
              <select class="form-select" id="tour-select" required>
                <option value="">Tur seçiniz...</option>
                ${n.map(t=>`<option value="${t.id}">${t.title}</option>`).join("")}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Ad Soyad</label>
              <input type="text" id="reg-name" class="form-input" placeholder="Tam adınızı giriniz" required />
            </div>
            <div class="form-group">
              <label class="form-label">Telefon</label>
              <input type="tel" id="reg-phone" class="form-input" placeholder="+90 5XX XXX XX XX" required />
            </div>
            <div class="form-group">
              <label class="form-label">Pasaport Numarası</label>
              <input type="text" id="reg-passport" class="form-input" placeholder="Pasaport no" />
            </div>
            <div class="form-group">
              <label class="form-label">Not</label>
              <textarea id="reg-note" class="form-textarea" placeholder="Eklemek istediğiniz not..." rows="2"></textarea>
            </div>
            <div class="form-group" style="padding:12px; background:var(--bg-secondary); border-radius:8px; border:1px solid var(--border-color);">
              <label style="display:flex; align-items:flex-start; gap:10px; cursor:pointer;" for="kvkk-check">
                <input type="checkbox" id="kvkk-check" required style="margin-top:4px; accent-color:var(--color-primary);">
                <span style="font-size:12px; color:var(--text-secondary); line-height:1.4;">
                  <a href="#kvkk" style="color:var(--color-primary); text-decoration:underline;">KVKK Aydınlatma Metnini</a> ve vize/bilet işlemleri için kimlik bilgilerimin işlenmesini okudum, onaylıyorum.
                </span>
              </label>
            </div>
            <button type="submit" class="btn btn--accent btn--full btn--lg" id="register-submit-btn">
              🛫 Kayıt Gönder
            </button>
          </form>
          `:`
          <div class="card card--dark" style="padding:24px; text-align:center;">
             <div style="font-size:40px; margin-bottom:12px;">🛂</div>
             <p style="margin-bottom:16px; color:var(--text-secondary);">Turlara kayıt yaptırmak ve işlemlerinizi takip etmek için giriş yapmanız gerekmektedir.</p>
             <button class="btn btn--primary btn--full" onclick="window.location.hash='auth'">🔑 Giriş Yaparak Kayıt Olun</button>
          </div>
          `}
        </div>
      </div>
    `,e.querySelectorAll(".guide-item").forEach(t=>{t.addEventListener("click",()=>{const i=parseInt(t.dataset.guideIdx),r=document.getElementById(`guide-detail-${i}`),o=document.getElementById(`guide-arrow-${i}`);A!==null&&A!==i&&(document.getElementById(`guide-detail-${A}`).style.display="none",document.getElementById(`guide-arrow-${A}`).style.transform="rotate(0deg)"),r.style.display==="none"?(r.style.display="block",o.style.transform="rotate(90deg)",A=i):(r.style.display="none",o.style.transform="rotate(0deg)",A=null)})}),e.querySelectorAll(".tour-btn-scroll").forEach(t=>{t.addEventListener("click",()=>{if(!b()){window.location.hash="auth";return}document.getElementById("tour-select").value=t.dataset.tourId,document.getElementById("register-form-section").scrollIntoView({behavior:"smooth"})})}),(a=document.getElementById("registration-form"))==null||a.addEventListener("submit",async t=>{t.preventDefault();const i={tour:parseInt(document.getElementById("tour-select").value),full_name:document.getElementById("reg-name").value,phone:document.getElementById("reg-phone").value,passport_no:document.getElementById("reg-passport").value,note:document.getElementById("reg-note").value},r=document.getElementById("register-submit-btn");r.disabled=!0,r.textContent="İşleniyor...",(await g("/ziyaret/register/",{method:"POST",body:i,requireAuth:!0}))._error?(y("Kayıt işlemi sırasında bir hata oluştu.","error"),r.disabled=!1,r.textContent="🛫 Kayıt Gönder"):(y("Kaydınız başarıyla alındı! En kısa sürede iletişime geçeceğiz.","success",5e3),document.getElementById("registration-form").reset(),r.disabled=!1,r.textContent="🛫 Kayıt Gönder")})}catch{e.innerHTML='<div class="page text-center"><p class="text-danger">Bağlantı hatası: Turlar yüklenemedi.</p></div>'}}function at(){const e=document.getElementById("page-content");e.innerHTML=`
    <div class="page">
      <div class="section-header" style="justify-content:center; margin-top:20px;">
        <h1 class="section-title" style="font-size:24px; text-align:center;">KVKK ve Gizlilik Politikası</h1>
      </div>
      
      <div class="card card--accent" style="padding:24px; line-height:1.6; color:var(--text-secondary); margin-bottom:40px;">
        <h3 style="color:var(--text-primary); margin-bottom:12px; font-weight:600;">1. Veri Sorumlusunun Kimliği</h3>
        <p style="margin-bottom:16px;">
          Ehli-Beyt Ankara ("Camii Yönetimi"), uygulama aracılığıyla elde edilen kişisel verileriniz bakımından Veri Sorumlusu sıfatını taşımaktadır.
        </p>

        <h3 style="color:var(--text-primary); margin-bottom:12px; font-weight:600;">2. İşlenen Kişisel Verileriniz</h3>
        <ul style="margin-bottom:16px; padding-left:20px;">
          <li><strong>Kimlik Bilgileriniz:</strong> Ad soyad, Pasaport/TCKN (Yalnızca tur kayıtlarında).</li>
          <li><strong>İletişim Bilgileriniz:</strong> Telefon numarası, E-posta adresi.</li>
          <li><strong>Sağlık Verileriniz:</strong> Kan grubu (Yardımlaşma ve acil anons hizmetleri için açık rızanızla alınır).</li>
          <li><strong>Finansal Bilgileriniz:</strong> Yalnızca bağış takip raporları için "bağış türü (humus/zekat) ve miktarı". (Kredi kartı verileri tutulmaz, ödeme kurumu tarafından işlenir).</li>
        </ul>

        <h3 style="color:var(--text-primary); margin-bottom:12px; font-weight:600;">3. Kişisel Verilerin İşlenme Amacı</h3>
        <p style="margin-bottom:16px;">
          Toplanan onaylı verileriniz; tur bilet/vize organizasyonunun yapılması, dini istifta ve soru-cevap hizmetinin verilmesi, acil sağlık/kan duyurularının hedeflenmesi ve finansal şeffaflık amaçlarıyla işlenmektedir.
        </p>

        <h3 style="color:var(--text-primary); margin-bottom:12px; font-weight:600;">4. Verilerin Aktarımı</h3>
        <p style="margin-bottom:16px;">
          Verileriniz hukuki zorunluluklar hariç olmak kaydıyla kesinlikle 3. şahıs veya şirketlere pazarlama amacıyla satılamaz/paylaşılamaz. Ancak Ziyaret ve Tur operasyonlarında konsolosluk/vize aracı kurumlarına ve seyahat firmalarına zaruri aktarım yapılabilmektedir.
        </p>

        <h3 style="color:var(--text-primary); margin-bottom:12px; font-weight:600;">5. İlgili Kişi Hakları</h3>
        <p style="margin-bottom:16px;">
          KVK Kanunu’nun 11. maddesi uyarınca; verilerinizin silinmesini talep etme, güncelleme veya hangi amaçla kullanıldığını öğrenme hakkınız bulunmaktadır. Taleplerinizi uygulama üzerinden yöneticiye iletebilirsiniz.
        </p>
        
        <div style="margin-top:24px; padding:12px; background:rgba(255,255,255,0.05); border-radius:8px; text-align:center; font-size:13px;">
          Son Güncelleme: 10 Nisan 2026
        </div>
      </div>
    </div>
  `}const it="623184133319-q9vipsqbpf4cl15skb6v6g4b9rku9med.apps.googleusercontent.com";function nt(){const e=document.getElementById("page-content");e.innerHTML=`
    <div class="page" style="padding-top:20px;">
      <a href="#prayer" style="display:inline-flex; align-items:center; gap:6px; color:var(--color-primary); text-decoration:none; font-size:14px; padding:12px 0;">
        ← Ana Sayfa
      </a>
      <div class="auth-container" style="max-width:400px; margin:0 auto;">
        
        <div class="auth-tabs" style="display:flex; border-bottom:1px solid var(--border-color); margin-bottom:24px;">
          <button class="auth-tab active" id="tab-login" style="flex:1; padding:12px; background:none; border:none; color:var(--text-primary); font-weight:bold; border-bottom:2px solid var(--color-primary); cursor:pointer;">Giriş Yap</button>
          <button class="auth-tab" id="tab-register" style="flex:1; padding:12px; background:none; border:none; color:var(--text-muted); cursor:pointer;">Kayıt Ol</button>
        </div>

        <!-- Login Form -->
        <form id="login-form">
          <div class="form-group">
            <label class="form-label">E-posta</label>
            <input type="email" id="login-email" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Şifre</label>
            <input type="password" id="login-password" class="form-input" required>
          </div>
          <button type="submit" class="btn btn--primary btn--full" id="login-btn">Giriş Yap</button>
          <div id="login-error" style="color:var(--color-danger); margin-top:12px; font-size:13px; text-align:center;"></div>

          <!-- Google Divider -->
          <div style="display:flex; align-items:center; gap:12px; margin:20px 0 16px;">
            <div style="flex:1; height:1px; background:var(--border-color);"></div>
            <span style="font-size:12px; color:var(--text-muted); white-space:nowrap;">veya</span>
            <div style="flex:1; height:1px; background:var(--border-color);"></div>
          </div>

          <!-- Google Sign-In Button Container -->
          <div id="google-login-btn-container" style="display:flex; justify-content:center; width: 100%;"></div>
        </form>

        <!-- Register Form -->
        <form id="register-form" style="display:none;">
          <div class="form-group">
            <label class="form-label">Ad</label>
            <input type="text" id="reg-firstname" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Soyad</label>
            <input type="text" id="reg-lastname" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Telefon</label>
            <input type="tel" id="reg-phone" class="form-input" placeholder="+90 5XX XXX XX XX" required>
          </div>
          <div class="form-group">
            <label class="form-label">E-posta</label>
            <input type="email" id="reg-email" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Şifre</label>
            <input type="password" id="reg-password" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Kan Grubu <span style="font-size:11px; color:var(--text-muted);">(Acil durumlar için)</span></label>
            <select id="reg-blood" class="form-select" required>
              <option value="">Seçiniz</option>
              <option value="A Rh+">A Rh+</option><option value="A Rh-">A Rh-</option>
              <option value="B Rh+">B Rh+</option><option value="B Rh-">B Rh-</option>
              <option value="0 Rh+">0 Rh+</option><option value="0 Rh-">0 Rh-</option>
              <option value="AB Rh+">AB Rh+</option><option value="AB Rh-">AB Rh-</option>
            </select>
          </div>
          <div class="form-group" style="padding:12px; background:var(--bg-secondary); border-radius:8px;">
            <label style="display:flex; align-items:flex-start; gap:10px; cursor:pointer;" for="reg-kvkk">
              <input type="checkbox" id="reg-kvkk" required style="accent-color:var(--color-primary); margin-top:3px;">
              <span style="font-size:12px; color:var(--text-secondary);">
                <a href="#kvkk" style="color:var(--color-primary);">KVKK Metnini</a> okudum ve onaylıyorum.
              </span>
            </label>
          </div>
          <button type="submit" class="btn btn--accent btn--full" id="register-btn">Kayıt Ol</button>
          <div id="register-error" style="color:var(--color-danger); margin-top:12px; font-size:13px; text-align:center;"></div>

          <!-- Google Divider -->
          <div style="display:flex; align-items:center; gap:12px; margin:20px 0 16px;">
            <div style="flex:1; height:1px; background:var(--border-color);"></div>
            <span style="font-size:12px; color:var(--text-muted); white-space:nowrap;">veya</span>
            <div style="flex:1; height:1px; background:var(--border-color);"></div>
          </div>

          <!-- Google Sign-In Button Container -->
          <div id="google-register-btn-container" style="display:flex; justify-content:center; width: 100%;"></div>
        </form>

      </div>
    </div>
  `,document.getElementById("tab-login").addEventListener("click",t=>{t.target.classList.add("active"),t.target.style.color="var(--text-primary)",t.target.style.fontWeight="bold",t.target.style.borderBottom="2px solid var(--color-primary)";const i=document.getElementById("tab-register");i.classList.remove("active"),i.style.color="var(--text-muted)",i.style.fontWeight="normal",i.style.borderBottom="none",document.getElementById("login-form").style.display="block",document.getElementById("register-form").style.display="none"}),document.getElementById("tab-register").addEventListener("click",t=>{t.target.classList.add("active"),t.target.style.color="var(--text-primary)",t.target.style.fontWeight="bold",t.target.style.borderBottom="2px solid var(--color-primary)";const i=document.getElementById("tab-login");i.classList.remove("active"),i.style.color="var(--text-muted)",i.style.fontWeight="normal",i.style.borderBottom="none",document.getElementById("register-form").style.display="block",document.getElementById("login-form").style.display="none"}),document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const i=document.getElementById("login-btn");i.disabled=!0,i.textContent="Giriş yapılıyor...";const r=document.getElementById("login-email").value,o=document.getElementById("login-password").value;await W(r,o)?(y("Başarıyla giriş yapıldı. Merhaba!","success"),window.location.hash="#profile",window.dispatchEvent(new Event("authChange"))):(y("E-posta veya şifre hatalı!","error"),i.disabled=!1,i.textContent="Giriş Yap")}),document.getElementById("register-form").addEventListener("submit",async t=>{t.preventDefault();const i=document.getElementById("register-btn");i.disabled=!0,i.textContent="Kaydediliyor...";const r={username:document.getElementById("reg-email").value.split("@")[0],email:document.getElementById("reg-email").value,password:document.getElementById("reg-password").value,first_name:document.getElementById("reg-firstname").value,last_name:document.getElementById("reg-lastname").value,phone:document.getElementById("reg-phone").value,blood_group:document.getElementById("reg-blood").value},o=await Ie(r);if(!o._error)y("Kaydınız başarıyla oluşturuldu!","success"),await W(r.email,r.password),window.location.hash="#profile",window.dispatchEvent(new Event("authChange"));else{const c=o.email?"Bu e-posta zaten kayıtlı.":"Kayıt işlemi başarısız oldu.";y(c,"error"),i.disabled=!1,i.textContent="Kayıt Ol"}});async function a(t){const i=await we(t.credential);if(i.success){const r=i.created?"Google hesabınızla kayıt oldunuz. Hoş geldiniz!":"Google ile giriş yapıldı. Merhaba!";y(r,"success"),window.location.hash="#profile",window.dispatchEvent(new Event("authChange"))}else y("Google ile giriş başarısız oldu.","error")}window._handleGoogleCredential=a;function n(){if(typeof google>"u"||!google.accounts){setTimeout(n,500);return}google.accounts.id.initialize({client_id:it,callback:a,auto_select:!1,context:"signin"});const t=document.getElementById("google-login-btn-container"),i=document.getElementById("google-register-btn-container"),r={type:"standard",theme:"outline",size:"large",text:"signin_with",shape:"rectangular",logo_alignment:"left",width:t?t.offsetWidth:300};t&&google.accounts.id.renderButton(t,r),i&&google.accounts.id.renderButton(i,{...r,text:"signup_with"}),google.accounts.id.prompt()}n(),window.addEventListener("resize",()=>{})}async function rt(){const e=document.getElementById("page-content");e.innerHTML=`
    <div class="page text-center" style="padding:40px;">
      <div class="skeleton" style="width:100px; height:100px; border-radius:50%; margin: 0 auto 20px auto;"></div>
      <div class="skeleton" style="width:200px; height:20px; border-radius:8px; margin: 0 auto 20px auto;"></div>
      <div class="skeleton" style="width:100%; height:150px; border-radius:12px; margin-bottom:10px;"></div>
    </div>
  `;try{const a=await g("/auth/profile/",{requireAuth:!0});if(a._error){window.location.hash="#auth";return}e.innerHTML=`
      <div class="page" style="padding-bottom:100px;">
        <a href="#prayer" style="display:inline-flex; align-items:center; gap:6px; color:var(--color-primary); text-decoration:none; font-size:14px; padding:12px 0;">
          ← Ana Sayfa
        </a>
        <div style="text-align:center; padding:12px 0;">
          <div style="width:80px; height:80px; background:var(--color-primary); color:#000; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:bold; margin:0 auto 12px auto;">
            ${a.first_name[0]||""}${a.last_name[0]||""}
          </div>
          <h2 style="font-size:20px; margin-bottom:4px;">${a.first_name} ${a.last_name}</h2>
          <p style="color:var(--text-muted); font-size:14px; margin-bottom:8px;">${a.email}</p>
          <div style="display:flex; justify-content:center; gap:8px;">
            <span class="badge ${a.role==="admin"||a.role==="imam"?"badge--accent":"badge--primary"}">${a.role.toUpperCase()}</span>
            ${a.blood_group?`<span class="badge badge--danger">🩸 ${a.blood_group}</span>`:""}
          </div>
          
          ${a.role==="admin"||a.role==="imam"?`
            <button onclick="window.location.hash='#admin'" class="btn btn--accent btn--sm" style="margin-top:16px; padding:8px 16px;">
              ⚙️ Yönetim Paneli
            </button>
          `:`
            <button id="secret-admin-btn" class="btn btn--outline btn--sm" style="margin-top:16px; padding:8px 16px; opacity:0.5; border-style:dashed;">
              👑 Beni Yönetici Yap (Geçici)
            </button>
          `}
        </div>

        <!-- History Dashboard -->
        <div class="section-header mt-lg" style="margin-top:20px;">
          <h3 class="section-title">Geçmiş İşlemler</h3>
        </div>

        <div style="display:flex; flex-direction:column; gap:16px;">
          <!-- Donations History -->
          <div class="card card--dark" style="padding:16px;">
            <h4 style="font-size:16px; margin-bottom:12px; display:flex; align-items:center; gap:8px;">💳 Bağış Geçmişi</h4>
            ${a.donations&&a.donations.length>0?a.donations.map(t=>`
              <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);">
                <div>
                  <div style="font-weight:500;">${t.amount} ₺</div>
                  <div style="font-size:11px; color:var(--text-muted);">${t.type}</div>
                </div>
                <div style="font-size:12px; color:var(--text-secondary);">${t.date}</div>
              </div>
            `).join(""):'<p style="font-size:13px; color:var(--text-muted);">Henüz bağış kaydınız bulunmuyor.</p>'}
          </div>

          <!-- Tours History -->
          <div class="card card--dark" style="padding:16px;">
            <h4 style="font-size:16px; margin-bottom:12px; display:flex; align-items:center; gap:8px;">🕋 Tur Kayıtlarım</h4>
            ${a.tours&&a.tours.length>0?a.tours.map(t=>`
              <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);">
                <div style="max-width:70%;">
                  <div style="font-weight:500; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${t.tour_name}</div>
                  <div style="font-size:11px; color:var(--text-muted);">${t.date}</div>
                </div>
                <div><span class="badge badge--primary" style="font-size:10px">${t.status}</span></div>
              </div>
            `).join(""):'<p style="font-size:13px; color:var(--text-muted);">Henüz bir tura kayıt olmadınız.</p>'}
          </div>

          <!-- QA History -->
          <div class="card card--dark" style="padding:16px;">
            <h4 style="font-size:16px; margin-bottom:12px; display:flex; align-items:center; gap:8px;">🙋 Soru ve İstiftalarım</h4>
            ${a.questions&&a.questions.length>0?a.questions.map(t=>`
              <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);">
                <div style="max-width:75%;">
                  <div style="font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${t.question}</div>
                  <div style="font-size:11px; color:var(--text-muted);">${t.date}</div>
                </div>
                <div style="font-size:18px;">${t.is_answered?"✅":"⏳"}</div>
              </div>
            `).join(""):'<p style="font-size:13px; color:var(--text-muted);">Sorduğunuz soru bulunmuyor.</p>'}
          </div>

        </div>

        <button id="logout-btn" class="btn btn--outline btn--full" style="margin-top:32px; color:var(--color-danger); border-color:var(--color-danger);">
          Çıkış Yap
        </button>
      </div>
    `,document.getElementById("logout-btn").addEventListener("click",()=>{X(),y("Güle güle! Tekrar görüşmek üzere.","info"),window.location.hash="#auth"});const n=document.getElementById("secret-admin-btn");n&&n.addEventListener("click",async()=>{const t=await g("/auth/make-admin/",{method:"POST",body:{secret:"YaAli110"},requireAuth:!0});t._error?y("Bir hata oluştu.","error"):(y(t.status||"Yönetici yapıldınız. Lütfen tekrar giriş yapın.","success"),setTimeout(()=>{X(),window.location.hash="#auth"},2e3))})}catch{e.innerHTML=`<div class="page text-center"><p class="text-danger">Bağlantı hatası: Profil yüklenemedi.</p>
    <button class="btn btn--outline mt-md" onclick="window.location.hash='#auth'">Giriş Sayfasına Dön</button></div>`}}async function st(){const e=document.getElementById("page-content");if(!b()){window.location.hash="#auth";return}e.innerHTML=`
    <div class="page" style="padding-bottom:100px;">
      <a href="#profile" style="display:inline-flex; align-items:center; gap:6px; color:var(--color-primary); text-decoration:none; font-size:14px; padding:12px 0;">
        ← Profil
      </a>
      <div class="section-header" style="margin-top:8px;">
        <h2 class="section-title">⚙️ Yönetim Paneli</h2>
      </div>

      <!-- Stats -->
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:24px;">
        <div class="card card--accent" style="padding:14px; text-align:center;">
          <div style="font-size:22px; font-weight:bold;" id="stat-questions">…</div>
          <div style="font-size:11px; color:var(--text-secondary);">Bekleyen Soru</div>
        </div>
        <div class="card card--accent" style="padding:14px; text-align:center;">
          <div style="font-size:22px; font-weight:bold;" id="stat-tours">…</div>
          <div style="font-size:11px; color:var(--text-secondary);">Tur Kaydı</div>
        </div>
        <div class="card card--accent" style="padding:14px; text-align:center;">
          <div style="font-size:22px; font-weight:bold;" id="stat-announcements">…</div>
          <div style="font-size:11px; color:var(--text-secondary);">Duyuru</div>
        </div>
      </div>

      <!-- Tabs -->
      <div style="display:flex; border-bottom:1px solid var(--border-color); margin-bottom:20px; overflow-x:auto;">
        <button class="admin-tab admin-tab--active" data-tab="questions" style="flex:1; padding:10px; background:none; border:none; color:var(--text-primary); font-weight:bold; border-bottom:2px solid var(--color-primary); cursor:pointer; font-size:13px; white-space:nowrap;">🙋 Sorular</button>
        <button class="admin-tab" data-tab="announce" style="flex:1; padding:10px; background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:13px; white-space:nowrap;">📢 Duyuru Ekle</button>
        <button class="admin-tab" data-tab="tours" style="flex:1; padding:10px; background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:13px; white-space:nowrap;">👥 Tur Kayıt</button>
        <button class="admin-tab" data-tab="tourmanage" style="flex:1; padding:10px; background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:13px; white-space:nowrap;">🕋 Tur Yönetimi</button>
      </div>

      <!-- Tab Content -->
      <div id="tab-content-questions"></div>
      <div id="tab-content-announce" style="display:none;"></div>
      <div id="tab-content-tours" style="display:none;"></div>
      <div id="tab-content-tourmanage" style="display:none;"></div>
    </div>
  `,e.querySelectorAll(".admin-tab").forEach(o=>{o.addEventListener("click",()=>{e.querySelectorAll(".admin-tab").forEach(c=>{c.classList.remove("admin-tab--active"),c.style.color="var(--text-muted)",c.style.fontWeight="normal",c.style.borderBottom="none"}),o.classList.add("admin-tab--active"),o.style.color="var(--text-primary)",o.style.fontWeight="bold",o.style.borderBottom="2px solid var(--color-primary)",document.getElementById("tab-content-questions").style.display=o.dataset.tab==="questions"?"block":"none",document.getElementById("tab-content-announce").style.display=o.dataset.tab==="announce"?"block":"none",document.getElementById("tab-content-tours").style.display=o.dataset.tab==="tours"?"block":"none",document.getElementById("tab-content-tourmanage").style.display=o.dataset.tab==="tourmanage"?"block":"none"})}),await Promise.all([a(),n(),t(),i()]);async function a(){const o=await g("/ilim/questions/unanswered/",{requireAuth:!0}),c=document.getElementById("tab-content-questions");if(document.getElementById("stat-questions").textContent=o._error?"?":o.length,o._error||o.length===0){c.innerHTML='<div class="card card--dark" style="padding:24px; text-align:center; color:var(--text-muted); font-size:14px;">🎉 Tüm sorular cevaplanmış! Bekleyen soru yok.</div>';return}c.innerHTML=o.map(s=>`
      <div class="card card--dark" style="padding:16px; margin-bottom:12px;" id="q-card-${s.id}">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="font-size:11px; color:var(--text-muted);">${s.is_anonymous?"Anonim":s.asked_by||"Üye"} · ${s.date||""}</span>
          <span style="font-size:10px; background:var(--bg-secondary); padding:2px 8px; border-radius:8px; color:var(--text-secondary);">ID #${s.id}</span>
        </div>
        <div style="font-size:14px; margin-bottom:12px; line-height:1.5;">${s.text||s.question}</div>
        <textarea class="form-textarea" id="answer-${s.id}" placeholder="Cevabınızı buraya yazın..." rows="2" style="margin-bottom:8px;"></textarea>
        <button class="btn btn--primary btn--sm btn--full answer-btn" data-qid="${s.id}">Cevapla ve Yayınla</button>
      </div>
    `).join(""),c.querySelectorAll(".answer-btn").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.qid,m=document.getElementById(`answer-${l}`).value;if(!m.trim())return;if(s.disabled=!0,s.textContent="Gönderiliyor...",(await g(`/ilim/questions/${l}/answer/`,{method:"PATCH",body:{answer:m},requireAuth:!0}))._error)y("Cevap gönderilirken bir hata oluştu.","error"),s.disabled=!1,s.textContent="Cevapla ve Yayınla";else{y("Cevabınız başarıyla yayınlandı!","success");const p=document.getElementById(`q-card-${l}`);p.style.opacity="0.5",p.style.pointerEvents="none";const u=document.getElementById("stat-questions");u.textContent=Math.max(0,parseInt(u.textContent)-1)}})})}function n(){const o=document.getElementById("tab-content-announce");o.innerHTML=`
      <form id="announcement-form" class="card card--dark" style="padding:20px;">
        <div class="form-group">
          <label class="form-label">Kategori</label>
          <select id="ann-category" class="form-select" required>
            <option value="Genel Duyuru">📌 Genel Duyuru</option>
            <option value="Vefat">🕊️ Vefat</option>
            <option value="Etkinlik">🎪 Etkinlik</option>
            <option value="Acil">🚨 Acil</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Başlık</label>
          <input type="text" id="ann-title" class="form-input" placeholder="Duyuru başlığı..." required>
        </div>
        <div class="form-group">
          <label class="form-label">İçerik</label>
          <textarea id="ann-body" class="form-textarea" rows="4" placeholder="Duyuru metni..." required></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Rozet (opsiyonel)</label>
          <input type="text" id="ann-badge" class="form-input" placeholder="Örn: Acil, Yeni, Önemli">
        </div>
        <button type="submit" class="btn btn--primary btn--full" id="ann-submit-btn">📢 Duyuruyu Yayınla</button>
      </form>
    `,document.getElementById("announcement-form").addEventListener("submit",async c=>{c.preventDefault();const s=document.getElementById("ann-submit-btn");s.disabled=!0,s.textContent="Yayınlanıyor...";const l={category:document.getElementById("ann-category").value,title:document.getElementById("ann-title").value,body:document.getElementById("ann-body").value,badge:document.getElementById("ann-badge").value||""};if((await g("/community/announcements/create/",{method:"POST",body:l,requireAuth:!0}))._error)y("Duyuru yayınlanırken bir hata oluştu.","error"),s.disabled=!1,s.textContent="📢 Duyuruyu Yayınla";else{y("Duyuru başarıyla yayınlandı!","success"),c.target.reset();const d=document.getElementById("stat-announcements");d.textContent=parseInt(d.textContent||0)+1,s.disabled=!1,s.textContent="📢 Duyuruyu Yayınla"}})}async function t(){const o=await g("/ziyaret/registrations/",{requireAuth:!0}),c=document.getElementById("tab-content-tours");if(document.getElementById("stat-tours").textContent=o._error?"?":o.length,o._error||o.length===0){c.innerHTML='<div class="card card--dark" style="padding:24px; text-align:center; color:var(--text-muted); font-size:14px;">Henüz tur kaydı bulunmuyor.</div>';return}c.innerHTML=`
      <div style="display:flex; flex-direction:column; gap:10px;">
        ${o.map(s=>`
          <div class="card card--dark" style="padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:600; font-size:14px;">${s.full_name}</div>
                <div style="font-size:12px; color:var(--text-muted);">${s.phone} · ${s.passport_no||"Pasaport yok"}</div>
              </div>
              <span class="badge badge--primary" style="font-size:10px;">${s.status||"Beklemede"}</span>
            </div>
            ${s.note?`<div style="font-size:12px; color:var(--text-secondary); margin-top:6px; font-style:italic;">"${s.note}"</div>`:""}
          </div>
        `).join("")}
      </div>
    `}async function i(){const o=document.getElementById("tab-content-tourmanage"),c=`
      <form id="tour-manage-form" class="card card--dark" style="padding:20px; margin-bottom:20px;">
        <h3 id="tm-form-title" style="margin-top:0; margin-bottom:16px;">Yeni Tur Ekle</h3>
        <input type="hidden" id="tm-id" value="">
        <div class="form-group">
          <label class="form-label">Tur Adı</label>
          <input type="text" id="tm-title" class="form-input" required>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="form-group">
            <label class="form-label">Başlangıç Tarihi</label>
            <input type="date" id="tm-start" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Bitiş Tarihi</label>
            <input type="date" id="tm-end" class="form-input" required>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="form-group">
            <label class="form-label">Süre</label>
            <input type="text" id="tm-duration" class="form-input" placeholder="Örn: 7 gün" required>
          </div>
          <div class="form-group">
            <label class="form-label">Fiyat</label>
            <input type="text" id="tm-price" class="form-input" placeholder="Örn: 850 $" required>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
          <div class="form-group">
            <label class="form-label">Kontenjan</label>
            <input type="number" id="tm-seats" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Durum</label>
            <input type="text" id="tm-status" class="form-input" placeholder="Örn: Kayıt Açık" required>
          </div>
          <div class="form-group">
            <label class="form-label">Renk</label>
            <select id="tm-color" class="form-select">
              <option value="badge--primary">Yeşil</option>
              <option value="badge--accent">Altın</option>
              <option value="badge--danger">Kırmızı</option>
            </select>
          </div>
          </div>
        </div>
        <div style="display:flex; gap:10px;">
          <button type="submit" class="btn btn--primary btn--full" id="tm-submit-btn" style="flex:2;">Turu Ekle</button>
          <button type="button" class="btn btn--danger" id="tm-cancel-btn" style="display:none; flex:1;">İptal</button>
        </div>
      </form>
      <div id="tm-list"></div>
    `;o.innerHTML=c;const s=async()=>{const l=await g("/ziyaret/admin/tours/",{requireAuth:!0}),m=document.getElementById("tm-list");if(l._error||l.length===0){m.innerHTML='<div style="text-align:center; color:var(--text-muted); font-size:14px;">Mevcut tur bulunamadı.</div>';return}m.innerHTML=l.map(d=>`
        <div class="card card--dark" style="padding:14px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:bold; font-size:14px;">${d.title}</div>
            <div style="font-size:12px; color:var(--text-muted);">${d.date_start} - ${d.date_end} · ${d.price}</div>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn btn--primary btn--sm edit-tour-btn" data-tour='${JSON.stringify(d).replace(/'/g,"&apos;")}' style="padding:4px 8px; font-size:11px;">Düzenle</button>
            <button class="btn btn--danger btn--sm delete-tour-btn" data-id="${d.id}" style="padding:4px 8px; font-size:11px;">Sil</button>
          </div>
        </div>
      `).join(""),m.querySelectorAll(".delete-tour-btn").forEach(d=>{d.addEventListener("click",async()=>{if(!confirm("Bu turu silmek istediğinize emin misiniz?"))return;const p=d.dataset.id;d.textContent="...",d.disabled=!0,(await g("/ziyaret/admin/tours/"+p+"/",{method:"DELETE",requireAuth:!0}))._error?(y("Tur silinemedi","error"),d.textContent="Sil",d.disabled=!1):(y("Tur başarıyla silindi","success"),s())})}),m.querySelectorAll(".edit-tour-btn").forEach(d=>{d.addEventListener("click",()=>{const p=JSON.parse(d.dataset.tour);document.getElementById("tm-id").value=p.id,document.getElementById("tm-title").value=p.title,document.getElementById("tm-start").value=p.date_start,document.getElementById("tm-end").value=p.date_end,document.getElementById("tm-duration").value=p.duration,document.getElementById("tm-price").value=p.price,document.getElementById("tm-seats").value=p.total_seats,document.getElementById("tm-status").value=p.status,document.getElementById("tm-color").value=p.status_color,document.getElementById("tm-form-title").textContent="Turu Düzenle",document.getElementById("tm-submit-btn").textContent="Güncelle",document.getElementById("tm-cancel-btn").style.display="block",window.scrollTo({top:0,behavior:"smooth"})})})};document.getElementById("tm-cancel-btn").addEventListener("click",()=>{document.getElementById("tour-manage-form").reset(),document.getElementById("tm-id").value="",document.getElementById("tm-form-title").textContent="Yeni Tur Ekle",document.getElementById("tm-submit-btn").textContent="Turu Ekle",document.getElementById("tm-cancel-btn").style.display="none"}),document.getElementById("tour-manage-form").addEventListener("submit",async l=>{l.preventDefault();const m=document.getElementById("tm-submit-btn");m.disabled=!0;const d=document.getElementById("tm-id").value,p=d?"PATCH":"POST",u=d?"/ziyaret/admin/tours/"+d+"/":"/ziyaret/admin/tours/";m.textContent=d?"Güncelleniyor...":"Ekleniyor...";const v={title:document.getElementById("tm-title").value,date_start:document.getElementById("tm-start").value,date_end:document.getElementById("tm-end").value,duration:document.getElementById("tm-duration").value,price:document.getElementById("tm-price").value,total_seats:parseInt(document.getElementById("tm-seats").value),status:document.getElementById("tm-status").value,status_color:document.getElementById("tm-color").value,is_active:!0};(await g(u,{method:p,body:v,requireAuth:!0}))._error?y(d?"Tur güncellenirken hata oluştu":"Tur eklenirken hata oluştu","error"):(y(d?"Tur başarıyla güncellendi!":"Tur başarıyla eklendi!","success"),l.target.reset(),document.getElementById("tm-cancel-btn").click(),await s()),m.disabled=!1,m.textContent=d?"Güncelle":"Turu Ekle"}),await s()}const r=await g("/community/announcements/");document.getElementById("stat-announcements").textContent=r._error?"?":r.length}let T="prayer";function $(e){T==="prayer"&&Je(),T=e,window.location.hash=e,Se(T,$),window.scrollTo(0,0);const a=document.querySelector(".bottom-nav"),n=["kvkk","auth","profile","admin"];switch(a&&(a.style.display=n.includes(e)?"none":"flex"),e){case"prayer":de();break;case"community":Ue();break;case"ilim":We();break;case"bagis":Qe();break;case"ziyaret":tt();break;case"kvkk":at();break;case"auth":if(b()){$("profile");return}nt();break;case"profile":if(!b()){$("auth");return}rt();break;case"admin":if(!b()){$("auth");return}st();break;default:de()}}window.addEventListener("hashchange",()=>{const e=window.location.hash.replace("#","")||"prayer";e!==T&&$(e)});function ot(){pe();const e=window.location.hash.replace("#","");e&&["prayer","community","ilim","bagis","ziyaret","kvkk","auth","profile","admin"].includes(e)&&(T=e),$(T)}async function xe(){if("serviceWorker"in navigator&&"PushManager"in window&&b())try{const e=await navigator.serviceWorker.ready;if(await Notification.requestPermission()==="granted"){const n=lt("BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuB-3qOX7j30CG3EMGWpncwYkU"),t=await e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:n});await apiFetch("/auth/webpush/subscribe/",{method:"POST",body:{status_type:"subscribe",subscription:t,browser:navigator.userAgent.includes("Chrome")?"chrome":"other",user_agent:navigator.userAgent},requireAuth:!0})}}catch(e){console.error("Push registration failed:",e)}}function lt(e){const a="=".repeat((4-e.length%4)%4),n=(e+a).replace(/-/g,"+").replace(/_/g,"/"),t=window.atob(n),i=new Uint8Array(t.length);for(let r=0;r<t.length;++r)i[r]=t.charCodeAt(r);return i}window.addEventListener("authChange",()=>{pe(),xe()});function me(){ot(),setTimeout(xe,3e3)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",me):me();
