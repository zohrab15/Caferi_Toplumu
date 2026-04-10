(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=a(i);fetch(i.href,r)}})();const V={mosque:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
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
  </svg>`},Ye="https://caferi-toplumu.onrender.com",Ze="http://localhost:8000",Ue=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?`${Ze}/api`:`${Ye}/api`;function Ve(e=!1){const t={"Content-Type":"application/json"};if(e){const a=localStorage.getItem("access_token");a&&(t.Authorization=`Bearer ${a}`)}return t}async function w(e,t={}){const a=`${Ue}${e}`,n={method:t.method||"GET",headers:Ve(t.requireAuth),...t};t.body&&(n.body=JSON.stringify(t.body));try{const i=await fetch(a,n);if(i.status===204)return{success:!0};const r=await i.json();return i.status===401&&t.requireAuth?(De(),{_error:!0,message:"Oturum süresi doldu"}):i.ok?r:{_error:!0,...r,status:i.status}}catch(i){return console.error("API Error:",i),{_error:!0,message:"Bağlantı xətası!"}}}async function ve(e,t){const a=await w("/auth/login/",{method:"POST",body:{email:e,password:t}});if(!a._error){localStorage.setItem("access_token",a.access),localStorage.setItem("refresh_token",a.refresh);try{const n=JSON.parse(atob(a.access.split(".")[1]));localStorage.setItem("user_email",n.email),localStorage.setItem("user_role",n.role)}catch{}return!0}return!1}async function Xe(e){const t=await w("/auth/login/google/",{method:"POST",body:{credential:e}});if(!t._error){localStorage.setItem("access_token",t.access),localStorage.setItem("refresh_token",t.refresh);try{const a=JSON.parse(atob(t.access.split(".")[1]));localStorage.setItem("user_email",a.email),localStorage.setItem("user_role",a.role)}catch{}return{success:!0,created:t.created}}return{success:!1}}async function Je(e){return await w("/auth/register/",{method:"POST",body:e})}function De(){localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),localStorage.removeItem("user_email"),localStorage.removeItem("user_role"),window.dispatchEvent(new Event("authChange"))}function $(){return!!localStorage.getItem("access_token")}function k(e,t="info",a=3e3){let n=document.querySelector(".toast-container");n||(n=document.createElement("div"),n.className="toast-container",document.body.appendChild(n));const i=document.createElement("div");i.className=`toast toast--${t}`;const r={success:"✅",error:"❌",info:"ℹ️"};i.innerHTML=`
    <span class="toast__icon">${r[t]||"🔔"}</span>
    <span class="toast__message">${e}</span>
    <button class="toast__close">✕</button>
  `,n.appendChild(i);const s=()=>{i.style.opacity="0",i.style.transform="translateY(-20px)",setTimeout(()=>i.remove(),300)};i.querySelector(".toast__close").addEventListener("click",s),setTimeout(s,a)}function We(){const e=localStorage.getItem("theme")||"dark";return document.documentElement.setAttribute("data-theme",e),e}We();function Pe(){const e=document.getElementById("app-header"),t=$()?"var(--color-primary)":"var(--text-muted)",n=(document.documentElement.getAttribute("data-theme")||"dark")==="light"?'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>':'<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';e.innerHTML=`
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
          ${n}
        </svg>
      </button>
      <a href="#${$()?"profile":"auth"}" id="header-profile-action" style="color:${t}; text-decoration:none; display:flex; align-items:center; padding:8px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </a>
    </div>
  `,document.getElementById("theme-toggle").addEventListener("click",()=>{const i=document.documentElement,s=i.getAttribute("data-theme")==="light"?"dark":"light";i.setAttribute("data-theme",s),localStorage.setItem("theme",s),document.getElementById("theme-icon").innerHTML=s==="light"?'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>':'<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'})}const Qe=[{id:"prayer",label:"Namaz",icon:V.mosque},{id:"community",label:"Topluluk",icon:V.community},{id:"ilim",label:"İlim",icon:V.book},{id:"bagis",label:"Bağış",icon:V.heart},{id:"ziyaret",label:"Ziyaret",icon:V.compass}];function et(e,t){const a=document.getElementById("bottom-nav");a.innerHTML=Qe.map(n=>`
    <button class="nav-item ${e===n.id?"active":""}" data-page="${n.id}" id="nav-${n.id}">
      ${n.icon}
      <span>${n.label}</span>
    </button>
  `).join(""),a.querySelectorAll(".nav-item").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.page;t(i)})})}const me=Math.PI/180,oe=180/Math.PI,he={Jafari:{name:"Shia Ithna-Ashari",fajrAngle:16,ishaAngle:14,maghribAngle:4,midnight:"Jafari"},ISNA:{name:"Islamic Society of North America",fajrAngle:15,ishaAngle:15,maghribAngle:0,midnight:"Standard"},MWL:{name:"Muslim World League",fajrAngle:18,ishaAngle:17,maghribAngle:0,midnight:"Standard"}};function tt(e,t,a){t<=2&&(e-=1,t+=12);const n=Math.floor(e/100),i=2-n+Math.floor(n/4);return Math.floor(365.25*(e+4716))+Math.floor(30.6001*(t+1))+a+i-1524.5}function re(e){const t=e-2451545,a=ce(357.529+.98560028*t),n=ce(280.459+.98564736*t),i=ce(n+1.915*P(a)+.02*P(2*a)),r=23.439-36e-8*t,s=ot(se(r)*P(i),se(i))/15,u=n/15-le(s);return{declination:it(P(r)*P(i)),equation:u}}function He(e,t){return le(12-t)}function R(e,t,a,n){const i=re(Q+t).declination,r=He(t,re(Q+t).equation),s=1/15*rt((-P(e)-P(i)*P(a))/(se(i)*se(a)));return r+(n==="ccw"?-s:s)}function at(e,t,a){const n=re(Q+t).declination,i=-st(1/(e+nt(Math.abs(a-n))));return R(i,t,a,"cw")}function P(e){return Math.sin(e*me)}function se(e){return Math.cos(e*me)}function nt(e){return Math.tan(e*me)}function it(e){return Math.asin(e)*oe}function rt(e){return Math.acos(e)*oe}function st(e){return Math.atan(e)*oe}function ot(e,t){return Math.atan2(e,t)*oe}function ce(e){return Re(e,360)}function le(e){return Re(e,24)}function Re(e,t){return e=e-t*Math.floor(e/t),e<0?e+t:e}let Q;function lt(e,t,a,n,i="Jafari"){const r=he[i]||he.Jafari,s=e.getFullYear(),u=e.getMonth()+1,l=e.getDate();Q=tt(s,u,l)-a/360;let o={imsak:5,fajr:5,sunrise:6,dhuhr:12,asr:13,sunset:18,maghrib:18,isha:18};for(let m=0;m<3;m++)o=dt(o,t,r);const v=n-a/15;for(const m in o)o[m]+=v;if(o.imsak=o.fajr-10/60,r.midnight==="Jafari"){const m=be(o.sunset,o.fajr);o.midnight=o.sunset+m/2}else{const m=be(o.sunset,o.sunrise);o.midnight=o.sunset+m/2}return o}function dt(e,t,a){const n=i=>re(Q+i);return{imsak:R(a.fajrAngle+.5,e.imsak,t,"ccw"),fajr:R(a.fajrAngle,e.fajr,t,"ccw"),sunrise:R(fe(),e.sunrise,t,"ccw"),dhuhr:He(e.dhuhr,n(e.dhuhr).equation),asr:at(1,e.asr,t),sunset:R(fe(),e.sunset,t,"cw"),maghrib:R(a.maghribAngle,e.maghrib,t,"cw"),isha:R(a.ishaAngle,e.isha,t,"cw")}}function fe(){return .833+.0347*Math.sqrt(0)}function be(e,t){return le(t-e)}function j(e){if(isNaN(e))return"--:--";e=le(e);const t=Math.floor(e),a=Math.floor((e-t)*60);return`${String(t).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function xe(e,t,a,n){const i=lt(e,t,a,n,"Jafari");return{Fajr:j(i.fajr),Sunrise:j(i.sunrise),Dhuhr:j(i.dhuhr),Asr:j(i.asr),Sunset:j(i.sunset),Maghrib:j(i.maghrib),Isha:j(i.isha),Imsak:j(i.imsak),Midnight:j(i.midnight)}}function ct(e){const t=e.getFullYear(),a=e.getMonth()+1,n=e.getDate();let i=t,r=a;r<=2&&(i--,r+=12);const s=Math.floor(i/100),u=2-s+Math.floor(s/4),l=Math.floor(365.25*(i+4716))+Math.floor(30.6001*(r+1))+n+u-1524.5,o=Math.floor(l)-1948440+10632,v=Math.floor((o-1)/10631),m=o-10631*v+354,y=Math.floor((10985-m)/5316)*Math.floor(50*m/17719)+Math.floor(m/5670)*Math.floor(43*m/15238),d=m-Math.floor((30-y)/15)*Math.floor(17719*y/50)-Math.floor(y/16)*Math.floor(15238*y/43)+29,g=Math.floor(24*d/709),f=d-Math.floor(709*g/24),c=30*v+y-30,b=["Muharrem","Safer","Rebiülevvel","Rebiülahir","Cemaziyelevvel","Cemaziyelahir","Recep","Şaban","Ramazan","Şevval","Zilkade","Zilhicce"],p=["مُحَرَّم","صَفَر","رَبيع الأوَّل","رَبيع الثاني","جُمادى الأولى","جُمادى الآخرة","رَجَب","شَعبان","رَمَضان","شَوَّال","ذو القِعدة","ذو الحِجَّة"];return{day:Math.max(1,Math.min(30,f)),month:g,year:c,monthName:b[g-1]||"",monthNameAr:p[g-1]||""}}const Ke={"2026-04-05":{Fajr:"04:53",Sunrise:"06:20",Dhuhr:"12:56",Asr:"16:32",Maghrib:"19:23",Isha:"20:44",hijri:"17 Şevval 1447"},"2026-04-06":{Fajr:"04:51",Sunrise:"06:18",Dhuhr:"12:56",Asr:"16:33",Maghrib:"19:24",Isha:"20:45",hijri:"18 Şevval 1447"},"2026-04-07":{Fajr:"04:50",Sunrise:"06:17",Dhuhr:"12:56",Asr:"16:33",Maghrib:"19:25",Isha:"20:46",hijri:"19 Şevval 1447"},"2026-04-08":{Fajr:"04:48",Sunrise:"06:15",Dhuhr:"12:56",Asr:"16:33",Maghrib:"19:26",Isha:"20:48",hijri:"20 Şevval 1447"},"2026-04-09":{Fajr:"04:46",Sunrise:"06:14",Dhuhr:"12:55",Asr:"16:34",Maghrib:"19:27",Isha:"20:49",hijri:"21 Şevval 1447"},"2026-04-10":{Fajr:"04:44",Sunrise:"06:12",Dhuhr:"12:55",Asr:"16:34",Maghrib:"19:28",Isha:"20:50",hijri:"22 Şevval 1447"},"2026-04-11":{Fajr:"04:42",Sunrise:"06:11",Dhuhr:"12:55",Asr:"16:34",Maghrib:"19:29",Isha:"20:52",hijri:"23 Şevval 1447"},"2026-04-12":{Fajr:"04:40",Sunrise:"06:09",Dhuhr:"12:55",Asr:"16:35",Maghrib:"19:30",Isha:"20:53",hijri:"24 Şevval 1447"},"2026-04-13":{Fajr:"04:38",Sunrise:"06:07",Dhuhr:"12:54",Asr:"16:35",Maghrib:"19:31",Isha:"20:54",hijri:"25 Şevval 1447"},"2026-04-14":{Fajr:"04:37",Sunrise:"06:06",Dhuhr:"12:54",Asr:"16:35",Maghrib:"19:32",Isha:"20:55",hijri:"26 Şevval 1447"},"2026-04-15":{Fajr:"04:35",Sunrise:"06:04",Dhuhr:"12:54",Asr:"16:36",Maghrib:"19:33",Isha:"20:57",hijri:"27 Şevval 1447"},"2026-04-16":{Fajr:"04:33",Sunrise:"06:03",Dhuhr:"12:54",Asr:"16:36",Maghrib:"19:34",Isha:"20:58",hijri:"28 Şevval 1447"},"2026-04-17":{Fajr:"04:31",Sunrise:"06:01",Dhuhr:"12:53",Asr:"16:36",Maghrib:"19:35",Isha:"20:59",hijri:"29 Şevval 1447"},"2026-04-18":{Fajr:"04:29",Sunrise:"06:00",Dhuhr:"12:53",Asr:"16:36",Maghrib:"19:36",Isha:"21:01",hijri:"1 Zilkade 1447"},"2026-04-19":{Fajr:"04:27",Sunrise:"05:59",Dhuhr:"12:53",Asr:"16:37",Maghrib:"19:37",Isha:"21:02",hijri:"2 Zilkade 1447"},"2026-04-20":{Fajr:"04:26",Sunrise:"05:57",Dhuhr:"12:53",Asr:"16:37",Maghrib:"19:38",Isha:"21:03",hijri:"3 Zilkade 1447"},"2026-04-21":{Fajr:"04:24",Sunrise:"05:56",Dhuhr:"12:52",Asr:"16:37",Maghrib:"19:39",Isha:"21:05",hijri:"4 Zilkade 1447"},"2026-04-22":{Fajr:"04:22",Sunrise:"05:54",Dhuhr:"12:52",Asr:"16:38",Maghrib:"19:40",Isha:"21:06",hijri:"5 Zilkade 1447"},"2026-04-23":{Fajr:"04:20",Sunrise:"05:53",Dhuhr:"12:52",Asr:"16:38",Maghrib:"19:41",Isha:"21:08",hijri:"6 Zilkade 1447"},"2026-04-24":{Fajr:"04:18",Sunrise:"05:51",Dhuhr:"12:52",Asr:"16:38",Maghrib:"19:42",Isha:"21:09",hijri:"7 Zilkade 1447"},"2026-04-25":{Fajr:"04:17",Sunrise:"05:50",Dhuhr:"12:52",Asr:"16:38",Maghrib:"19:43",Isha:"21:10",hijri:"8 Zilkade 1447"},"2026-04-26":{Fajr:"04:15",Sunrise:"05:49",Dhuhr:"12:51",Asr:"16:39",Maghrib:"19:44",Isha:"21:12",hijri:"9 Zilkade 1447"},"2026-04-27":{Fajr:"04:13",Sunrise:"05:47",Dhuhr:"12:51",Asr:"16:39",Maghrib:"19:45",Isha:"21:13",hijri:"10 Zilkade 1447"},"2026-04-28":{Fajr:"04:11",Sunrise:"05:46",Dhuhr:"12:51",Asr:"16:39",Maghrib:"19:46",Isha:"21:15",hijri:"11 Zilkade 1447"},"2026-04-29":{Fajr:"04:10",Sunrise:"05:45",Dhuhr:"12:51",Asr:"16:39",Maghrib:"19:47",Isha:"21:16",hijri:"12 Zilkade 1447"},"2026-04-30":{Fajr:"04:08",Sunrise:"05:43",Dhuhr:"12:51",Asr:"16:40",Maghrib:"19:48",Isha:"21:17",hijri:"13 Zilkade 1447"},"2026-05-01":{Fajr:"04:06",Sunrise:"05:42",Dhuhr:"12:51",Asr:"16:40",Maghrib:"19:49",Isha:"21:19",hijri:"14 Zilkade 1447"},"2026-05-02":{Fajr:"04:04",Sunrise:"05:41",Dhuhr:"12:51",Asr:"16:40",Maghrib:"19:50",Isha:"21:20",hijri:"15 Zilkade 1447"},"2026-05-03":{Fajr:"04:03",Sunrise:"05:40",Dhuhr:"12:51",Asr:"16:40",Maghrib:"19:51",Isha:"21:22",hijri:"16 Zilkade 1447"},"2026-05-04":{Fajr:"04:01",Sunrise:"05:39",Dhuhr:"12:50",Asr:"16:41",Maghrib:"19:52",Isha:"21:23",hijri:"17 Zilkade 1447"},"2026-05-05":{Fajr:"03:59",Sunrise:"05:37",Dhuhr:"12:50",Asr:"16:41",Maghrib:"19:53",Isha:"21:25",hijri:"18 Zilkade 1447"},"2026-05-06":{Fajr:"03:58",Sunrise:"05:36",Dhuhr:"12:50",Asr:"16:41",Maghrib:"19:54",Isha:"21:26",hijri:"19 Zilkade 1447"}},ut=["Muharrem","Safer","Rebiülevvel","Rebiülahir","Cemaziyelevvel","Cemaziyelahir","Recep","Şaban","Ramazan","Şevval","Zilkade","Zilhicce"],mt=["مُحَرَّم","صَفَر","رَبيع الأوَّل","رَبيع الثاني","جُمادى الأولى","جُمادى الآخرة","رَجَب","شَعبان","رَمَضان","شَوَّال","ذو القِعدة","ذو الحِجَّة"];function pt(e){const t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,a=Ke[t];if(!a)return null;const n=a.hijri.split(" "),i=parseInt(n[0]),r=n[1],s=parseInt(n[2]),u=ut.indexOf(r);return{timings:{Fajr:a.Fajr,Sunrise:a.Sunrise,Dhuhr:a.Dhuhr,Asr:a.Asr,Maghrib:a.Maghrib,Isha:a.Isha},hijri:{day:i,month:u+1,year:s,monthName:r,monthNameAr:mt[u]||""},isStatic:!0}}const yt="modulepreload",gt=function(e){return"/"+e},ke={},vt=function(t,a,n){let i=Promise.resolve();if(a&&a.length>0){let s=function(o){return Promise.all(o.map(v=>Promise.resolve(v).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),l=(u==null?void 0:u.nonce)||(u==null?void 0:u.getAttribute("nonce"));i=s(a.map(o=>{if(o=gt(o),o in ke)return;ke[o]=!0;const v=o.endsWith(".css"),m=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${m}`))return;const y=document.createElement("link");if(y.rel=v?"stylesheet":yt,v||(y.as="script"),y.crossOrigin="",y.href=o,l&&y.setAttribute("nonce",l),document.head.appendChild(y),v)return new Promise((d,g)=>{y.addEventListener("load",d),y.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${o}`)))})}))}function r(s){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=s,window.dispatchEvent(u),!u.defaultPrevented)throw s}return i.then(s=>{for(const u of s||[])u.status==="rejected"&&r(u.reason);return t().catch(r)})};/*! Capacitor: https://capacitorjs.com/ - MIT License */var Y;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Y||(Y={}));class ue extends Error{constructor(t,a,n){super(t),this.message=t,this.code=a,this.data=n}}const ht=e=>{var t,a;return e!=null&&e.androidBridge?"android":!((a=(t=e==null?void 0:e.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},ft=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},n=a.Plugins=a.Plugins||{},i=()=>t!==null?t.name:ht(e),r=()=>i()!=="web",s=m=>{const y=o.get(m);return!!(y!=null&&y.platforms.has(i())||u(m))},u=m=>{var y;return(y=a.PluginHeaders)===null||y===void 0?void 0:y.find(d=>d.name===m)},l=m=>e.console.error(m),o=new Map,v=(m,y={})=>{const d=o.get(m);if(d)return console.warn(`Capacitor plugin "${m}" already registered. Cannot register plugins twice.`),d.proxy;const g=i(),f=u(m);let c;const b=async()=>(!c&&g in y?c=typeof y[g]=="function"?c=await y[g]():c=y[g]:t!==null&&!c&&"web"in y&&(c=typeof y.web=="function"?c=await y.web():c=y.web),c),p=(z,B)=>{var L,q;if(f){const D=f==null?void 0:f.methods.find(S=>B===S.name);if(D)return D.rtype==="promise"?S=>a.nativePromise(m,B.toString(),S):(S,ee)=>a.nativeCallback(m,B.toString(),S,ee);if(z)return(L=z[B])===null||L===void 0?void 0:L.bind(z)}else{if(z)return(q=z[B])===null||q===void 0?void 0:q.bind(z);throw new ue(`"${m}" plugin is not implemented on ${g}`,Y.Unimplemented)}},h=z=>{let B;const L=(...q)=>{const D=b().then(S=>{const ee=p(S,z);if(ee){const te=ee(...q);return B=te==null?void 0:te.remove,te}else throw new ue(`"${m}.${z}()" is not implemented on ${g}`,Y.Unimplemented)});return z==="addListener"&&(D.remove=async()=>B()),D};return L.toString=()=>`${z.toString()}() { [capacitor code] }`,Object.defineProperty(L,"name",{value:z,writable:!1,configurable:!1}),L},x=h("addListener"),E=h("removeListener"),_=(z,B)=>{const L=x({eventName:z},B),q=async()=>{const S=await L;E({eventName:z,callbackId:S},B)},D=new Promise(S=>L.then(()=>S({remove:q})));return D.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await q()},D},U=new Proxy({},{get(z,B){switch(B){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return f?_:x;case"removeListener":return E;default:return h(B)}}});return n[m]=U,o.set(m,{name:m,proxy:U,platforms:new Set([...Object.keys(y),...f?[g]:[]])}),U};return a.convertFileSrc||(a.convertFileSrc=m=>m),a.getPlatform=i,a.handleError=l,a.isNativePlatform=r,a.isPluginAvailable=s,a.registerPlugin=v,a.Exception=ue,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},bt=e=>e.Capacitor=ft(e),M=bt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),de=M.registerPlugin;class pe{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let n=!1;this.listeners[t]||(this.listeners[t]=[],n=!0),this.listeners[t].push(a);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(t);const s=async()=>this.removeListener(t,a);return Promise.resolve({remove:s})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,n){const i=this.listeners[t];if(!i){if(n){let r=this.retainedEventArguments[t];r||(r=[]),r.push(a),this.retainedEventArguments[t]=r}return}i.forEach(r=>r(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:n=>{this.notifyListeners(a,n)}}}unimplemented(t="not implemented"){return new M.Exception(t,Y.Unimplemented)}unavailable(t="not available"){return new M.Exception(t,Y.Unavailable)}async removeListener(t,a){const n=this.listeners[t];if(!n)return;const i=n.indexOf(a);this.listeners[t].splice(i,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(n=>{this.notifyListeners(t,n)}))}}const we=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ee=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class xt extends pe{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(n=>{if(n.length<=0)return;let[i,r]=n.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");i=Ee(i).trim(),r=Ee(r).trim(),a[i]=r}),a}async setCookie(t){try{const a=we(t.key),n=we(t.value),i=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",r=(t.path||"/").replace("path=",""),s=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${n||""}${i}; path=${r}; ${s};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}de("CapacitorCookies",{web:()=>new xt});const kt=async e=>new Promise((t,a)=>{const n=new FileReader;n.onload=()=>{const i=n.result;t(i.indexOf(",")>=0?i.split(",")[1]:i)},n.onerror=i=>a(i),n.readAsDataURL(e)}),wt=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(i=>i.toLocaleLowerCase()).reduce((i,r,s)=>(i[r]=e[t[s]],i),{})},Et=(e,t=!0)=>e?Object.entries(e).reduce((n,i)=>{const[r,s]=i;let u,l;return Array.isArray(s)?(l="",s.forEach(o=>{u=t?encodeURIComponent(o):o,l+=`${r}=${u}&`}),l.slice(0,-1)):(u=t?encodeURIComponent(s):s,l=`${r}=${u}`),`${n}&${l}`},"").substr(1):null,_t=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),i=wt(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(i.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[s,u]of Object.entries(e.data||{}))r.set(s,u);a.body=r.toString()}else if(i.includes("multipart/form-data")||e.data instanceof FormData){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((u,l)=>{r.append(l,u)});else for(const u of Object.keys(e.data))r.append(u,e.data[u]);a.body=r;const s=new Headers(a.headers);s.delete("content-type"),a.headers=s}else(i.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class zt extends pe{async request(t){const a=_t(t,t.webFetchExtra),n=Et(t.params,t.shouldEncodeUrlParams),i=n?`${t.url}?${n}`:t.url,r=await fetch(i,a),s=r.headers.get("content-type")||"";let{responseType:u="text"}=r.ok?t:{};s.includes("application/json")&&(u="json");let l,o;switch(u){case"arraybuffer":case"blob":o=await r.blob(),l=await kt(o);break;case"json":l=await r.json();break;case"document":case"text":default:l=await r.text()}const v={};return r.headers.forEach((m,y)=>{v[y]=m}),{data:l,headers:v,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}de("CapacitorHttp",{web:()=>new zt});var _e;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(_e||(_e={}));var ze;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(ze||(ze={}));class It extends pe{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}de("SystemBars",{web:()=>new It});var Ie;(function(e){e[e.Sunday=1]="Sunday",e[e.Monday=2]="Monday",e[e.Tuesday=3]="Tuesday",e[e.Wednesday=4]="Wednesday",e[e.Thursday=5]="Thursday",e[e.Friday=6]="Friday",e[e.Saturday=7]="Saturday"})(Ie||(Ie={}));const O=de("LocalNotifications",{web:()=>vt(()=>import("./web-CtXBkHu3.js"),[]).then(e=>new e.LocalNotificationsWeb)}),Be=39.9334,Ae=32.8597,$e=3,Z=[{key:"Fajr",name:"İmsak",icon:"🌙"},{key:"Sunrise",name:"Güneş",icon:"🌅"},{key:"Dhuhr",name:"Öğle",icon:"☀️"},{key:"Asr",name:"İkindi",icon:"🌤️"},{key:"Maghrib",name:"Akşam",icon:"🌆"},{key:"Isha",name:"Yatsı",icon:"🌃"}],W=[{id:"haci-ruslan",name:"Hacı Ruslan",desc:"Hacı Ruslan sesi ile ezan",file:"/assets/audio/Haci Ruslan.mp3"},{id:"rahim-muazzinzade",name:"Rahim Müəzzinzade",desc:"Rahim Müəzzinzade sesi ile ezan",file:"/assets/audio/Rahim Muazzinzade.mp3"}];let A=localStorage.getItem("selectedEzan")||"haci-ruslan",H=localStorage.getItem("abdestReminder")!=="false",T=localStorage.getItem("ezanAutoPlay")!=="false",G=null,I=null,C=!1,Se={},Le={};function Bt(){const e=new Date,t=pt(e);if(t){const i=xe(e,Be,Ae,$e);return t.timings.Sunset=i.Sunset,t.timings.Midnight=i.Midnight,{timings:t.timings,hijri:t.hijri,date:e,isStatic:!0}}const a=xe(e,Be,Ae,$e),n=ct(e);return{timings:a,hijri:n,date:e,isStatic:!1}}function Oe(e){const t=new Date,a=t.getHours()*60+t.getMinutes();for(const n of Z){const i=e[n.key];if(!i||i==="--:--")continue;const[r,s]=i.split(":").map(Number),u=r*60+s;if(u>a)return{...n,time:i,prayerMinutes:u}}return{...Z[0],time:e.Fajr,prayerMinutes:1440}}function Ne(e){const t=new Date,[a,n]=e.split(":").map(Number);let i=a*60+n-(t.getHours()*60+t.getMinutes());i<0&&(i+=1440);const r=Math.floor(i/60),s=i%60,u=59-t.getSeconds();return`${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(u).padStart(2,"0")}`}function ye(e){const t=new Date,[a,n]=e.split(":").map(Number);let i=a*60+n-(t.getHours()*60+t.getMinutes());return i<0&&(i+=1440),i}function Fe(e){const t=W.find(a=>a.id===e);if(t){if(I&&C){I.pause(),C=!1,ne(),ie(!1);return}I&&(I.pause(),I=null),I=new Audio(t.file),I.volume=1,C=!0,I.play().catch(a=>{console.warn("Ezan playing failed:",a),C=!1}),I.addEventListener("ended",()=>{C=!1,ne(),ie(!1)}),I.addEventListener("timeupdate",()=>{At(I)}),ne(),ie(!0)}}function Ge(){I&&(I.pause(),I.currentTime=0,I=null,C=!1,ne(),ie(!1))}function ne(){document.querySelectorAll(".ezan-play-btn").forEach(e=>{e.dataset.ezanId===A&&C?(e.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',e.classList.add("playing")):(e.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><polygon points="5,3 19,12 5,21"/></svg>',e.classList.remove("playing"))})}function ie(e){const t=document.getElementById("ezan-waveform");t&&(e?t.classList.add("active"):t.classList.remove("active"))}function At(e){const t=document.getElementById("ezan-progress-fill"),a=document.getElementById("ezan-time");if(t&&e.duration){const n=e.currentTime/e.duration*100;t.style.width=`${n}%`}if(a&&e.duration){const n=Te(e.currentTime),i=Te(e.duration);a.textContent=`${n} / ${i}`}}function Te(e){const t=Math.floor(e/60),a=Math.floor(e%60);return`${t}:${String(a).padStart(2,"0")}`}function $t(e){const t=new Date,a=`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`;for(const n of Z){const i=e[n.key];if(!i||i==="--:--")continue;H&&ye(i)===15&&!Le[n.key]&&(Le[n.key]=!0,Notification.permission==="granted"&&new Notification("🚿 Abdest Vaktidir",{body:`${n.icon} ${n.name} namazına 15 dakika kaldı — Abdest almayı unutmayın!`,icon:"/assets/favicon.svg",tag:`abdest-${n.key}`}),St(n));const r=["Fajr","Dhuhr","Maghrib"].includes(n.key);if(T&&r&&i===a&&!Se[n.key]){Se[n.key]=!0;try{"Notification"in window&&Notification.permission==="granted"&&new Notification(`${n.icon} ${n.name} Vakti`,{body:`${n.name} vakti geldi — Ezan okunuyor`,icon:"/assets/favicon.svg",tag:`ezan-${n.key}`})}catch(s){console.warn("Background notification failed",s)}Fe(A)}}}function St(e){var n;const t=document.getElementById("abdest-toast");t&&t.remove();const a=document.createElement("div");a.id="abdest-toast",a.className="abdest-toast abdest-toast--show",a.innerHTML=`
    <div class="abdest-toast__icon">🚿</div>
    <div class="abdest-toast__text">
      <strong>Abdest Vaktidir!</strong>
      <span>${e.icon} ${e.name} namazına 15 dakika kaldı</span>
    </div>
    <button class="abdest-toast__close" id="abdest-toast-close">✕</button>
  `,document.body.appendChild(a),(n=document.getElementById("abdest-toast-close"))==null||n.addEventListener("click",()=>{a.classList.remove("abdest-toast--show"),setTimeout(()=>a.remove(),400)}),setTimeout(()=>{document.getElementById("abdest-toast")&&(a.classList.remove("abdest-toast--show"),setTimeout(()=>a.remove(),400))},1e4)}function Lt(e){G&&clearInterval(G);const t=()=>{const a=Oe(e),n=document.getElementById("prayer-countdown"),i=document.getElementById("prayer-next-name");n&&(n.textContent=Ne(a.time)),i&&(i.textContent=`${a.icon} ${a.name}`);const r=ye(a.time),s=document.getElementById("abdest-reminder-bar");s&&H&&(r<=15&&r>0?(s.style.display="flex",s.querySelector(".abdest-bar__text").textContent=`🚿 Abdest vaktidir — ${a.name} namazına ${r} dk kaldı`):s.style.display="none"),$t(e)};t(),G=setInterval(t,1e3)}function Tt(e=24){return Array.from({length:e},(t,a)=>`<span class="waveform-bar" style="animation-delay:${(a*.08).toFixed(2)}s"></span>`).join("")}async function Me(){var y;const e=document.getElementById("page-content");e.innerHTML=`
    <div class="page">
      <div class="prayer-hero">
        <div class="prayer-hero__mosque">🕌</div>
        <div class="prayer-hero__next-label">BİR SONRAKİ NAMAZ</div>
        <div class="skeleton" style="height:32px;width:150px;margin:8px auto"></div>
        <div class="skeleton" style="height:48px;width:200px;margin:8px auto"></div>
      </div>
    </div>
  `,"Notification"in window&&Notification.permission==="default"&&Notification.requestPermission();const t=Bt(),a=t.timings,n=t.isStatic,i=t.hijri,r=Oe(a),s=`${i.day} ${i.monthNameAr} ${i.year} H.`,u=`${i.day} ${i.monthName} ${i.year}`,l=new Date().toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),o=ye(r.time);e.innerHTML=`
    <div class="page">
      <!-- Abdest Reminder Bar -->
      <div class="abdest-reminder-bar" id="abdest-reminder-bar" style="display:${H&&o<=15&&o>0?"flex":"none"}">
        <div class="abdest-bar__icon">🚿</div>
        <div class="abdest-bar__text">🚿 Abdest vaktidir — ${r.name} namazına ${o} dk kaldı</div>
      </div>

      <!-- Hero: Next prayer countdown -->
      <div class="prayer-hero">
        <div class="prayer-hero__mosque">🕌</div>
        <div class="prayer-hero__next-label">BİR SONRAKİ NAMAZ</div>
        <div class="prayer-hero__next-name" id="prayer-next-name">${r.icon} ${r.name}</div>
        <div class="prayer-hero__countdown" id="prayer-countdown">${Ne(r.time)}</div>
        <div class="prayer-hero__date">
          ${l}<br/>
          <span class="text-arabic text-accent">${s}</span><br/>
          <span class="text-muted" style="font-size:12px">${u}</span>
        </div>
      </div>

      <!-- Method badge -->
      <div style="text-align:center;margin-bottom:16px">
        <span class="badge badge--primary" style="font-size:11px;padding:6px 14px">
          ${n?"✦ Caferi Ezan Vakitleri · ehlibeytalimleri.com":"✦ Caferi (Jafari) Hesaplaması · Offline"}
        </span>
      </div>

      <!-- Prayer times list -->
      <div class="section-header">
        <h2 class="section-title">Günlük Vakitler</h2>
        <span class="badge badge--accent">Ankara</span>
      </div>
      <div class="prayer-list">
        ${Z.map(d=>`
            <div class="prayer-item ${r.key===d.key?"prayer-item--active":""}">
              <div class="prayer-item__left">
                <div class="prayer-item__icon">${d.icon}</div>
                <span class="prayer-item__name">${d.name}</span>
              </div>
              <span class="prayer-item__time">${a[d.key]||"--:--"}</span>
            </div>
          `).join("")}
      </div>

      <!-- Extra: Midnight -->
      <div class="card card--glass" style="margin-bottom:20px;text-align:center;padding:14px">
        <span class="text-muted" style="font-size:13px">🕐 Gece Yarısı (Nisf-ul Leyl): </span>
        <span class="text-accent" style="font-weight:600">${a.Midnight||"--:--"}</span>
        <span class="text-muted" style="font-size:11px;display:block;margin-top:4px">Caferi hesabı: Güneş batışından imsaka kadar olan sürenin ortası</span>
      </div>

      <!-- Ezan Selection & Player -->
      <div class="ezan-selector">
        <div class="section-header">
          <h2 class="section-title">Ezan Sesi</h2>
          <span class="badge badge--accent${T?"":" badge--muted"}" id="ezan-status">${C?"🔊 Çalıyor":T?"🔔 Aktif":"🔇 Sessiz"}</span>
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
              <div class="ezan-player__muezzin" id="ezan-current-name">${((y=W.find(d=>d.id===A))==null?void 0:y.name)||"Hacı Ruslan"}</div>
            </div>
          </div>

          <!-- Waveform -->
          <div class="ezan-waveform" id="ezan-waveform">
            ${Tt(28)}
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
          ${W.map(d=>`
            <div class="ezan-option ${A===d.id?"ezan-option--active":""}" data-ezan="${d.id}" id="ezan-${d.id}">
              <div class="ezan-option__radio"></div>
              <div class="ezan-option__info">
                <div class="ezan-option__label">${d.name}</div>
                <div class="ezan-option__desc">${d.desc}</div>
              </div>
              <button class="ezan-play-btn" data-ezan-id="${d.id}" id="ezan-play-${d.id}" title="Dinle">
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
              <input type="checkbox" id="toggle-ezan" ${T?"checked":""} />
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
              <input type="checkbox" id="toggle-abdest" ${H?"checked":""} />
              <span class="toggle__slider"></span>
            </label>
          </div>
        </div>
      </div>


    </div>
  `,e.querySelectorAll(".ezan-option").forEach(d=>{d.addEventListener("click",g=>{if(g.target.closest(".ezan-play-btn"))return;A=d.dataset.ezan,localStorage.setItem("selectedEzan",A),M.isNativePlatform()&&X(),e.querySelectorAll(".ezan-option").forEach(b=>b.classList.remove("ezan-option--active")),d.classList.add("ezan-option--active");const f=document.getElementById("ezan-current-name"),c=W.find(b=>b.id===A);f&&c&&(f.textContent=c.name)})}),e.querySelectorAll(".ezan-play-btn").forEach(d=>{d.addEventListener("click",g=>{g.stopPropagation();const f=d.dataset.ezanId;if(f!==A){A=f,localStorage.setItem("selectedEzan",A),M.isNativePlatform()&&X(),e.querySelectorAll(".ezan-option").forEach(x=>x.classList.remove("ezan-option--active"));const b=d.closest(".ezan-option");b&&b.classList.add("ezan-option--active");const p=document.getElementById("ezan-current-name"),h=W.find(x=>x.id===A);p&&h&&(p.textContent=h.name),Ge()}Fe(f);const c=document.getElementById("ezan-status");c&&(c.textContent=C?"🔊 Çalıyor":"🔇 Sessiz")})});const v=document.getElementById("toggle-ezan");v&&(v.checked=T,v.addEventListener("change",()=>{T=v.checked,localStorage.setItem("ezanAutoPlay",T?"true":"false"),M.isNativePlatform()&&X();const d=document.getElementById("ezan-status");d&&(T?(d.textContent=C?"🔊 Çalıyor":"🔔 Aktif",d.classList.remove("badge--muted")):(d.textContent="🔇 Sessiz",d.classList.add("badge--muted")))}));const m=document.getElementById("toggle-abdest");m&&m.addEventListener("change",()=>{H=m.checked,localStorage.setItem("abdestReminder",H?"true":"false"),M.isNativePlatform()&&X()}),Lt(a),M.isNativePlatform()&&X()}async function X(){if(M.isNativePlatform())try{if((await O.checkPermissions()).display!=="granted"&&(await O.requestPermissions()).display!=="granted")return;const t=await O.getPending();if(t.notifications.length>0&&await O.cancel({notifications:t.notifications}),!T&&!H)return;const a=[],n=new Date;let i=1;const r=A==="haci-ruslan"?"haci_ruslan.mp3":"rahim_muazzinzade.mp3";M.getPlatform()==="android"&&await O.createChannel({id:"ezan-channel",name:"Ezan Bildirimleri",description:"Vakit girdiğinde ezan okur",importance:5,visibility:1,sound:r,vibration:!0}),Object.entries(Ke).forEach(([s,u])=>{const[l,o,v]=s.split("-").map(Number);new Date(l,o-1,v).getTime()<n.getTime()-864e5||["Fajr","Dhuhr","Asr","Maghrib","Isha"].forEach(y=>{const d=u[y];if(!d||d==="--:--")return;const[g,f]=d.split(":").map(Number),c=new Date(l,o-1,v,g,f,0),b=["Fajr","Dhuhr","Maghrib"].includes(y);if(T&&b&&c.getTime()>n.getTime()){const p=Z.find(h=>h.key===y);a.push({title:`${p?p.icon+" "+p.name:y} Vakti`,body:"Otomatik ezan okunuyor",id:i++,schedule:{at:c,allowWhileIdle:!0},sound:r,channelId:"ezan-channel"})}if(H){const p=new Date(c.getTime());if(p.setMinutes(p.getMinutes()-15),p.getTime()>n.getTime()){const h=Z.find(x=>x.key===y);a.push({title:"🚿 Abdest Vaktidir",body:`${h?h.icon+" "+h.name:y} namazına 15 dakika kaldı`,id:i++,schedule:{at:p,allowWhileIdle:!0}})}}})}),a.length>0&&(await O.schedule({notifications:a.slice(0,400)}),console.log(`[Native] Scheduled ${Math.min(a.length,400)} background notifications.`))}catch(e){console.error("Failed to schedule native notifications:",e)}}function Mt(){G&&(clearInterval(G),G=null),Ge()}let ae=null;async function Ct(){var t,a,n,i,r;const e=document.getElementById("page-content");e.innerHTML=`
    <div class="page" style="text-align:center;padding:40px;">
      <div class="skeleton" style="width:100%;height:150px;border-radius:12px;margin-bottom:20px;"></div>
      <div class="skeleton" style="width:100%;height:300px;border-radius:12px;"></div>
      
      <!-- Quick contact -->
      <div class="card card--accent" style="margin-top:var(--space-lg);text-align:center;padding:var(--space-xl)">
        <div style="font-size:32px;margin-bottom:8px">📞</div>
        <div style="font-weight:700;font-size:var(--font-size-lg);margin-bottom:4px">Acil Durumda Bize Ulaşın</div>
        <div class="text-muted" style="font-size:var(--font-size-sm);margin-bottom:12px">Sercan İmam: +90 555 066 75 73</div>
        <a href="tel:+905550667573" class="btn btn--primary" style="display:inline-block; text-decoration:none;">📱 Hemen Ara</a>
      </div>
    </div>
  `;try{const[s,u]=await Promise.all([w("/community/announcements/"),w("/community/help-requests/")]);if(s._error)throw new Error("Duyurular yüklenemedi");e.innerHTML=`
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
          ${s.length>0?s.map(l=>`
            <div class="announcement-card">
              <div class="announcement-card__header">
                <span class="announcement-card__category" style="color:${l.categoryColor}">${l.category}</span>
                <div style="display:flex;align-items:center;gap:8px">
                  ${l.badge?`<span class="badge badge--accent">${l.badge}</span>`:""}
                  <span class="announcement-card__date">${l.date}</span>
                </div>
              </div>
              <h3 class="announcement-card__title">${l.title}</h3>
              <p class="announcement-card__body">${l.body}</p>
            </div>
          `).join(""):'<p class="text-muted text-center" style="font-size:13px">Güncel duyuru bulunmamaktadır.</p>'}
        </div>

        <!-- Help network -->
        <div class="section-header">
          <h2 class="section-title">Yardımlaşma Şebekesi</h2>
        </div>
        <div class="help-grid">
          ${u.length>0?u.map((l,o)=>`
            <div class="help-card" data-help-idx="${o}" id="help-card-${o}">
              <div class="help-card__icon">${l.icon}</div>
              <div class="help-card__title">${l.title}</div>
              <div class="help-card__count">${l.count}</div>
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
            ${$()?"➕ Yeni Yardım Talebi Oluştur":"🔑 Yardım Talebi için Giriş Yapın"}
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
          <div class="text-muted" style="font-size:var(--font-size-sm);margin-bottom:12px">Sercan İmam: +90 555 066 75 73</div>
          <a href="tel:+905550667573" class="btn btn--primary" style="display:inline-block; text-decoration:none;">📱 Hemen Ara</a>
        </div>
      </div>
    `,e.querySelectorAll(".help-card").forEach(l=>{l.addEventListener("click",()=>{const o=parseInt(l.dataset.helpIdx),v=u[o],m=document.getElementById("help-detail-panel"),y=document.getElementById("help-detail-title"),d=document.getElementById("help-detail-list");if(ae===o){m.style.display="none",ae=null,e.querySelectorAll(".help-card").forEach(g=>g.classList.remove("help-card--active"));return}ae=o,e.querySelectorAll(".help-card").forEach(g=>g.classList.remove("help-card--active")),l.classList.add("help-card--active"),y.textContent=`${v.icon} ${v.title}`,v.items&&v.items.length>0?d.innerHTML=v.items.map(g=>`
            <div class="help-detail__item">
              <div class="help-detail__item-info">
                <div class="help-detail__item-name">${g.name}</div>
                <div class="help-detail__item-desc">${g.desc}</div>
              </div>
              <div class="help-detail__item-date">${g.date}</div>
            </div>
          `).join(""):d.innerHTML='<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13px;">Bu kategoride aktif talep yok.</div>',m.style.display="block",m.scrollIntoView({behavior:"smooth",block:"nearest"})})}),(t=document.getElementById("help-detail-close"))==null||t.addEventListener("click",()=>{document.getElementById("help-detail-panel").style.display="none",ae=null,e.querySelectorAll(".help-card").forEach(l=>l.classList.remove("help-card--active"))}),(a=document.getElementById("live-placeholder"))==null||a.addEventListener("click",()=>{document.getElementById("live-player-container").innerHTML=`
        <div class="live-player__embed">
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;color:var(--text-secondary)">
            <div style="font-size:48px">📺</div>
            <div style="font-size:14px;text-align:center">Canlı yayın şu anda aktif değildir.<br/>Program saatinde tekrar deneyin.</div>
            <div style="font-size:11px;color:var(--text-muted)">Her akşam 20:00 — Ankara Caferi Camii</div>
          </div>
        </div>
      `}),(n=document.getElementById("show-help-form-btn"))==null||n.addEventListener("click",()=>{if(!$()){window.location.hash="auth";return}const l=document.getElementById("help-form-container"),o=document.getElementById("show-help-form-btn");l.style.display==="none"?(l.style.display="block",o.textContent="✕ Formu Kapat"):(l.style.display="none",o.textContent="➕ Yeni Yardım Talebi Oluştur")}),(i=document.getElementById("help-category"))==null||i.addEventListener("change",l=>{const o=l.target.value;document.getElementById("blood-group-field").style.display=o==="Kan Bağışı"?"block":"none";const v=document.getElementById("help-title"),m=document.getElementById("help-desc"),y=v.previousElementSibling;o==="Kan Bağışı"?(y.textContent="Başlık / Ad Soyad",v.placeholder="Örn: Ahmet Yılmaz acil kan arıyor",m.placeholder="Hastanın yattığı hastane, aciliyet durumu vb. detaylar..."):o==="İş İlanları"?(y.textContent="İş Pozisyonu",v.placeholder="Örn: Tecrübeli Muhasebeci Aranıyor",m.placeholder="İşin tanımı, aranan nitelikler, çalışma koşulları..."):o==="Öğrenci Desteği"?(y.textContent="Destek Türü",v.placeholder="Örn: Üniversite öğrencisine burs veya laptop ihtiyacı",m.placeholder="Öğrencinin okuduğu bölüm, başarı durumu, ihtiyaç detayı..."):(y.textContent="Talebin Kısa Özeti",v.placeholder="Örn: Temel erzak ihtiyacı olan aile",m.placeholder="Yardım talebinizle ilgili detaylı açıklama...")}),(r=document.getElementById("help-request-form"))==null||r.addEventListener("submit",async l=>{l.preventDefault();const o=document.getElementById("help-submit-btn");o.disabled=!0,o.textContent="Gönderiliyor...";const v=document.getElementById("help-category").value;let m=document.getElementById("help-title").value,y=document.getElementById("help-desc").value;if(v==="Kan Bağışı"){const g=document.getElementById("help-blood-group").value;m=`[${g}] ${m}`,y=`Aranan kan grubu: ${g}. ${y}`}(await w("/community/help-requests/create/",{method:"POST",body:{category:v,name:m,desc:y,contact_info:document.getElementById("help-contact").value}}))._error?(k("Talep gönderilirken hata oluştu.","error"),o.disabled=!1,o.textContent="Talebi Gönder"):(k("Talebiniz başarıyla yayınlandı!","success"),l.target.reset(),setTimeout(()=>window.location.reload(),2e3))})}catch{k("Bağlantı hatası: Veriler yüklenemedi.","error"),e.innerHTML=`
      <div class="page text-center">
        <p class="text-danger">Bilgiler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.</p>
        
        <!-- Quick contact -->
        <div class="card card--accent" style="margin-top:var(--space-lg);text-align:center;padding:var(--space-xl)">
          <div style="font-size:32px;margin-bottom:8px">📞</div>
          <div style="font-weight:700;font-size:var(--font-size-lg);margin-bottom:4px">Acil Durumda Bize Ulaşın</div>
          <div class="text-muted" style="font-size:var(--font-size-sm);margin-bottom:12px">Sercan İmam: +90 555 066 75 73</div>
          <a href="tel:+905550667573" class="btn btn--primary" style="display:inline-block; text-decoration:none;">📱 Hemen Ara</a>
        </div>
      </div>
    `}}const Ce=[{icon:"📖",title:"Mefatihul-Cinan",author:"Şeyh Abbas Kummi",lang:"TR / AZ",desc:"En kapsamlı dua ve ziyaretname mecmuası. Muharrem'den Zilhicce'ye kadar tüm ay ve gün dualarını içerir.",link:"https://www.caferilik.com/kutuphane/mefatihul-cinan/"},{icon:"📕",title:"Nehcü'l Belağa",author:"Hz. Ali (a.s)",lang:"TR",desc:"Hz. Ali'nin hutbeleri, mektupları ve hikmetli sözlerinden oluşan eşsiz eser.",link:"https://www.caferilik.com/pdf/Nehcul-Belaga-www.caferilik.com.pdf"},{icon:"📗",title:"Sahife-i Seccadiye",author:"İmam Zeyn'el-Abidin (a.s)",lang:"TR / AZ",desc:`4. İmam'ın 54 münacaatını içeren, "Âl-i Muhammed'in Zeburu" olarak bilinen dua kitabı.`,link:"https://www.caferilik.com/pdf/Sahife-i%20Seccadiye-www.caferilik.com.pdf"},{icon:"📘",title:"Usul-u Kâfi",author:"Şeyh Kuleyni",lang:"TR",desc:"Şia hadis külliyatının en önemli dört kitabından biri. İman, akıl, ilim ve tevhid bölümleri.",link:"https://www.caferilik.com/pdf/Usul_u_kafi_caferilik_com.pdf"},{icon:"📙",title:"Risale-i Ameliye",author:"Büyük Merciler",lang:"TR / AZ",desc:"Günlük ibadet ve fıkhi meselelerde mükellefin amelî hükümleri.",link:"https://www.sistani.org/turkish/"},{icon:"⚖️",title:"El-Müracaat",author:"S. A. Şerefuddin el-Musevi",lang:"TR",desc:"Doğruyu Arayanların Rehberi: Şia ve Sünni alimleri arasındaki ilmi ve tarihi mektuplaşmaları içeren başyapıt.",link:"https://www.caferilik.com/pdf/el%20Muracaat-www.caferilik.com.pdf"}];let J=null;async function jt(){var t,a,n;const e=document.getElementById("page-content");e.innerHTML=`
    <div class="page" style="text-align:center;padding:40px;">
      <div class="skeleton" style="width:100%;height:300px;border-radius:24px;margin-bottom:20px;"></div>
    </div>
  `;try{let[i,r]=await Promise.all([w("/ilim/hadith/today/"),w("/ilim/questions/")]);i._error&&(i={text:"İlim talep etmek her Müslüman'a farzdır.",source:"Hz. Muhammed (s.a.a)",reference:"Usul-u Kâfi, c.1, s.30"}),r._error&&(r=[]),e.innerHTML=`
      <div class="page">
        <!-- Kur'an-ı Kerim Banner -->
        <div class="card" style="background: linear-gradient(135deg, var(--color-primary), #0a3d21); color: white; padding: 24px; text-align: left; cursor: pointer; border: none; overflow: hidden; position: relative; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(13, 79, 43, 0.2);" onclick="window.location.hash='kuran'">
          <div style="position: absolute; top: -10px; right: -20px; font-size: 100px; opacity: 0.1; line-height: 1; pointer-events: none;">📖</div>
          <h2 style="margin:0 0 8px 0; font-size: 22px; display:flex; align-items:center; gap:8px;">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M21 4H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-1 14H8V8h12v10Z"></path><path d="M3 8v14h2V8H3Z"></path></svg>
            Kur'an-ı Kerim
          </h2>
          <p style="margin:0 0 16px 0; font-size: 14px; opacity: 0.9;">Arapça metin, meâl ve sesli tilavet (Mishary Alafasy)</p>
          <button class="btn btn--light" style="width: auto; padding: 8px 24px; pointer-events: none; color: var(--color-primary); background: white;">Oku ve Dinle</button>
        </div>

        <!-- Hadith of the Day -->
        <div class="hadith-card">
          <div class="hadith-card__label">📿 Günün Hadisi</div>
          <div class="hadith-card__ornament-left">❁</div>
          <div class="hadith-card__ornament-right">❁</div>
          <p class="hadith-card__text">${i.text}</p>
          <div class="hadith-card__source">— ${i.source}</div>
          <p class="hadith-card__ref">${i.reference}</p>
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
          
          ${$()?`
          <form id="ask-form" class="mb-lg">
            <div class="form-group">
              <label class="form-label">Sorunuz</label>
              <textarea class="form-textarea" id="question-input" placeholder="Dini sorunuzu buraya yazın..." rows="3" required></textarea>
            </div>
            <div class="form-group" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
              <label style="display:flex;align-items:center;gap:6px;font-size:14px;color:var(--text-secondary);cursor:pointer">
                <input type="checkbox" id="anonymous-check" style="accent-color:var(--color-primary)" />
                Anonim gönder
              </label>
              <label style="display:flex;align-items:center;gap:6px;font-size:14px;color:var(--text-secondary);cursor:pointer">
                <input type="checkbox" id="private-check" style="accent-color:var(--color-primary)" />
                Özel Soru (Sadece profilimde görünsün)
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
            <span class="badge badge--accent">${r.length||0} soru</span>
          </div>
          <div class="qa-list" id="qa-list">
            ${r.length>0?r.map((s,u)=>`
              <div class="qa-item qa-item--collapsed ${u>=3?"qa-item--hidden":""}" data-qa-idx="${u}" id="qa-item-${u}">
                <div class="qa-item__question qa-toggle" data-qa-target="${u}">
                  <span class="qa-item__q-icon">S</span>
                  <span style="flex:1">${s.question}</span>
                  <span class="qa-item__chevron">›</span>
                </div>
                <div class="qa-item__answer-wrap" id="qa-answer-${u}" style="display:none">
                  <div class="qa-item__answer">
                    <span class="qa-item__a-icon">C</span>
                    ${s.answer}
                  </div>
                  <div class="qa-item__meta">
                    <span class="qa-item__date">${s.date}</span>
                  </div>
                </div>
              </div>
            `).join(""):'<p class="text-muted" style="font-size:13px;text-align:center;">Henüz cevaplanmış soru bulunmuyor.</p>'}
          </div>
          ${r.length>3?`
          <button class="btn btn--outline btn--full" id="qa-show-more" style="margin-top:12px;border-color:var(--color-primary);color:var(--color-primary);font-size:13px;">
            ▼ Daha Fazla Göster (${r.length-3} soru daha)
          </button>`:""}
        </div>

        <!-- Digital Library -->
        <div class="section-header">
          <h2 class="section-title">📚 Dijital Kütüphane</h2>
          <span class="badge badge--primary">${Ce.length} eser</span>
        </div>
        <div class="library-list">
          ${Ce.map((s,u)=>`
            <div class="library-item" data-book-idx="${u}" id="book-${u}">
              <div class="library-item__icon">${s.icon}</div>
              <div class="library-item__info">
                <div class="library-item__title">${s.title}</div>
                <div class="library-item__author">${s.author} · ${s.lang}</div>
              </div>
              <span class="library-item__arrow">›</span>
            </div>
            <div class="library-detail" id="book-detail-${u}" style="display:none">
              <p class="library-detail__desc">${s.desc}</p>
              <div class="library-detail__actions">
                <a href="${s.link}" target="_blank" class="btn btn--outline btn--sm" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">
                  📖 İnternetten Oku / İndir
                </a>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `,(t=document.getElementById("ask-form"))==null||t.addEventListener("submit",async s=>{s.preventDefault();const u=document.getElementById("question-input"),l=document.getElementById("anonymous-check").checked,o=document.getElementById("private-check").checked;if(!u.value.trim())return;const v=document.getElementById("ask-submit-btn");v.disabled=!0,v.textContent="Gönderiliyor...",(await w("/ilim/questions/",{method:"POST",body:{text:u.value,is_anonymous:l,is_private:o},requireAuth:!0}))._error?(k("Soru gönderilirken bir hata oluştu.","error"),v.disabled=!1,v.textContent="Soruyu Gönder"):(k("Sorunuz başarıyla iletildi!","success"),u.value="",v.disabled=!1,v.textContent="Soruyu Gönder")}),e.querySelectorAll(".qa-toggle").forEach(s=>{s.addEventListener("click",()=>{const u=s.dataset.qaTarget,l=document.getElementById(`qa-answer-${u}`),o=document.getElementById(`qa-item-${u}`),v=s.querySelector(".qa-item__chevron");l.style.display==="none"?(l.style.display="block",o.classList.remove("qa-item--collapsed"),o.classList.add("qa-item--expanded"),v&&(v.textContent="⌄")):(l.style.display="none",o.classList.add("qa-item--collapsed"),o.classList.remove("qa-item--expanded"),v&&(v.textContent="›"))})}),(a=document.getElementById("qa-show-more"))==null||a.addEventListener("click",()=>{e.querySelectorAll(".qa-item--hidden").forEach(s=>{s.classList.remove("qa-item--hidden"),s.style.animation="fadeIn 0.3s ease"}),document.getElementById("qa-show-more").remove()}),e.querySelectorAll(".library-item").forEach(s=>{s.addEventListener("click",()=>{const u=parseInt(s.dataset.bookIdx),l=document.getElementById(`book-detail-${u}`);if(J!==null&&J!==u){const o=document.getElementById(`book-detail-${J}`);o&&(o.style.display="none")}l.style.display==="none"?(l.style.display="block",J=u):(l.style.display="none",J=null)})}),(n=document.getElementById("hadith-share-btn"))==null||n.addEventListener("click",async()=>{const s={title:"Günün Hadisi — Ehli-Beyt Ankara",text:`${i.text}
— ${i.source}
(${i.reference})`};if(navigator.share)try{await navigator.share(s)}catch{}else await navigator.clipboard.writeText(s.text),k("Hadis panoya kopyalandı!","success")})}catch{e.innerHTML='<div class="page text-center"><p class="text-danger">Bağlantı hatası: İçerikler yüklenemedi.</p></div>'}}async function qt(){const e=document.getElementById("page-content");e.innerHTML=`
    <div class="page" style="text-align:center;padding:40px;">
      <div class="skeleton" style="width:100%;height:200px;border-radius:12px;margin-bottom:20px;"></div>
    </div>
  `;try{const t=await w("/bagis/campaigns/");if(t._error)throw new Error("Kampanyalar yüklenemedi");e.innerHTML=`
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
          ${t.length>0?t.map(l=>{const o=Math.min(parseFloat(l.collected)/parseFloat(l.target)*100,100).toFixed(1);return`
              <div class="campaign-card">
                <div class="campaign-card__header">
                  <div class="campaign-card__icon">${l.icon}</div>
                  <div class="campaign-card__title">${l.title}</div>
                </div>
                <p class="campaign-card__desc">${l.description}</p>
                <div class="campaign-progress">
                  <div class="campaign-progress__bar">
                    <div class="campaign-progress__fill" style="width: ${o}%"></div>
                  </div>
                  <div class="campaign-progress__stats">
                    <span class="campaign-progress__collected">${parseFloat(l.collected).toLocaleString("tr-TR")} ₺ toplandı</span>
                    <span class="campaign-progress__target">Hedef: ${parseFloat(l.target).toLocaleString("tr-TR")} ₺</span>
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
                ${t.map(l=>`<option value="${l.id}">${l.title}</option>`).join("")}
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
    `;let a="Humus",n=50;const i=e.querySelectorAll(".donation-type-card");i.forEach(l=>{l.addEventListener("click",()=>{i.forEach(o=>o.classList.remove("donation-type-card--active")),l.classList.add("donation-type-card--active"),a=l.dataset.type})});const r=e.querySelectorAll(".amount-btn"),s=document.getElementById("custom-amount-container"),u=document.getElementById("custom-amount-input");r.forEach(l=>{l.addEventListener("click",()=>{r.forEach(o=>o.classList.remove("amount-btn--active")),l.classList.add("amount-btn--active"),l.dataset.amount==="custom"?(s.style.display="block",u.focus(),n=0):(s.style.display="none",n=parseInt(l.dataset.amount))})}),document.getElementById("donation-form").addEventListener("submit",async l=>{l.preventDefault();let o=n;if(document.getElementById("custom-amount-btn").classList.contains("amount-btn--active")&&(o=parseInt(u.value),!o||o<=0)){k("Lütfen geçerli bir miktar girin.","error");return}const v=document.getElementById("campaign-select").value,m=document.getElementById("donor-name").value,y={amount:o,donation_type:a,donor_name:m||"Anonim"};v&&(y.campaign=parseInt(v));const d=document.getElementById("donate-submit-btn");d.disabled=!0,d.textContent="İşleniyor...",(await w("/bagis/donate/",{method:"POST",body:y,requireAuth:!0}))._error?(k("Bağış işlemi sırasında bir hata oluştu.","error"),d.disabled=!1,d.textContent="💳 Bağış Yap"):(k("Bağışınız başarıyla alındı. Allah kabul etsin!","success",5e3),setTimeout(()=>{window.location.reload()},2e3))})}catch{e.innerHTML='<div class="page text-center"><p class="text-danger">Bağlantı hatası: Kampanyalar yüklenemedi.</p></div>'}}const je=[{icon:"🕋",title:"İmam Hüseyin (a.s) Ziyaretnamesi",desc:"Kerbela · Türkçe & Arapça",content:`<div class="ziyaret-content">
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
    </div>`}];let N=null,Dt=[];async function Pt(){var t;const e=document.getElementById("page-content");e.innerHTML='<div class="page text-center" style="padding:40px;"><div class="skeleton" style="width:100%;height:300px;border-radius:12px"></div></div>';try{const a=await w("/ziyaret/tours/");if(a._error)throw new Error("Turlar yüklenemedi");Dt=a,e.innerHTML=`
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
          <span class="badge badge--primary">${a.length} tur</span>
        </div>
        <div class="tour-list">
          ${a.map(n=>`
            <div class="tour-card">
              <div class="tour-card__image" style="background:${n.image}">
                <div class="tour-card__badge">
                  <span class="badge ${n.statusColor}">${n.status}</span>
                </div>
              </div>
              <div class="tour-card__content">
                <h3 class="tour-card__title">${n.title}</h3>
                <div class="tour-card__details">
                  <span class="tour-card__detail">📅 ${n.date}</span>
                  <span class="tour-card__detail">⏱ ${n.duration}</span>
                </div>
                <div class="tour-card__footer">
                  <span class="tour-card__price">${n.price}</span>
                  <span class="tour-card__seats">${n.seats}</span>
                </div>
                <button class="btn btn--primary btn--full tour-btn-scroll" data-tour-id="${n.id}" style="margin-top:12px">
                  Kayıt Ol
                </button>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Pilgrimage Guide -->
        <div class="section-header">
          <h2 class="section-title">📖 Ziyaret Rehberi</h2>
          <span class="badge badge--accent">${je.length} rehber</span>
        </div>
        <div class="guide-list">
          ${je.map((n,i)=>`
            <div class="guide-item" data-guide-idx="${i}" id="guide-${i}">
              <div class="guide-item__icon">${n.icon}</div>
              <div>
                <div class="guide-item__title">${n.title}</div>
                <div class="guide-item__desc">${n.desc}</div>
              </div>
              <span class="guide-item__arrow" id="guide-arrow-${i}">›</span>
            </div>
            <div class="guide-detail" id="guide-detail-${i}" style="display:none">
              ${n.content}
            </div>
          `).join("")}
        </div>

        <!-- Registration Form -->
        <div class="divider"></div>
        <div class="registration-form" id="register-form-section">
          ${$()?`
          <h3 class="registration-form__title">📋 Online Kayıt Formu</h3>
          <form id="registration-form">
            <div class="form-group">
              <label class="form-label">Tur Seçimi</label>
              <select class="form-select" id="tour-select" required>
                <option value="">Tur seçiniz...</option>
                ${a.map(n=>`<option value="${n.id}">${n.title}</option>`).join("")}
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
    `,e.querySelectorAll(".guide-item").forEach(n=>{n.addEventListener("click",()=>{const i=parseInt(n.dataset.guideIdx),r=document.getElementById(`guide-detail-${i}`),s=document.getElementById(`guide-arrow-${i}`);N!==null&&N!==i&&(document.getElementById(`guide-detail-${N}`).style.display="none",document.getElementById(`guide-arrow-${N}`).style.transform="rotate(0deg)"),r.style.display==="none"?(r.style.display="block",s.style.transform="rotate(90deg)",N=i):(r.style.display="none",s.style.transform="rotate(0deg)",N=null)})}),e.querySelectorAll(".tour-btn-scroll").forEach(n=>{n.addEventListener("click",()=>{if(!$()){window.location.hash="auth";return}document.getElementById("tour-select").value=n.dataset.tourId,document.getElementById("register-form-section").scrollIntoView({behavior:"smooth"})})}),(t=document.getElementById("registration-form"))==null||t.addEventListener("submit",async n=>{n.preventDefault();const i={tour:parseInt(document.getElementById("tour-select").value),full_name:document.getElementById("reg-name").value,phone:document.getElementById("reg-phone").value,passport_no:document.getElementById("reg-passport").value,note:document.getElementById("reg-note").value},r=document.getElementById("register-submit-btn");r.disabled=!0,r.textContent="İşleniyor...",(await w("/ziyaret/register/",{method:"POST",body:i,requireAuth:!0}))._error?(k("Kayıt işlemi sırasında bir hata oluştu.","error"),r.disabled=!1,r.textContent="🛫 Kayıt Gönder"):(k("Kaydınız başarıyla alındı! En kısa sürede iletişime geçeceğiz.","success",5e3),document.getElementById("registration-form").reset(),r.disabled=!1,r.textContent="🛫 Kayıt Gönder")})}catch{e.innerHTML='<div class="page text-center"><p class="text-danger">Bağlantı hatası: Turlar yüklenemedi.</p></div>'}}async function Ht(){const e=document.getElementById("page-content"),t=document.querySelector(".bottom-nav");t&&(t.style.display="none"),e.innerHTML=`
    <div class="page kuran-page">
      <div class="kuran-header">
        <button class="back-btn" id="kuran-back-btn">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <h1 class="kuran-title">Kur'an-ı Kerim</h1>
        <div style="width:40px"></div>
      </div>

      <div class="kuran-loading" id="kuran-initial-loader">
        <div class="kuran-loading-spinner"></div>
        <p>Sûreler yükleniyor...</p>
      </div>

      <div id="kuran-content" style="display: none;">
        <select class="surah-selector" id="surah-selector"></select>

        <div class="kuran-info-card" id="surah-info-card">
          <div class="kuran-info-name" id="surah-ar-name"></div>
          <div class="kuran-info-translation" id="surah-tr-name"></div>
          <div class="kuran-info-meta"><span id="surah-revelation"></span> • <span id="surah-ayah-count"></span> Ayet</div>
        </div>

        <div class="verses-list" id="verses-list"></div>
      </div>
    </div>

    <!-- Sticky Audio Player -->
    <div class="kuran-player" id="kuran-player">
      <div class="player-info">
        <span id="player-surah-name">Sûre</span>
        <span id="player-ayah-number">Ayet --</span>
      </div>
      <div class="player-controls">
        <button class="player-btn" id="btn-prev-ayah">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
        </button>
        <button class="player-btn play-pause" id="btn-play-pause">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </button>
        <button class="player-btn" id="btn-next-ayah">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
        </button>
      </div>
      <!-- Hidden native audio element -->
      <audio id="kuran-audio" preload="auto"></audio>
    </div>
  `,document.getElementById("kuran-back-btn").addEventListener("click",()=>{window.location.hash="ilim"});let a=[],n=[],i=-1,r=!1;const s=document.getElementById("kuran-audio"),u=document.getElementById("btn-play-pause");try{a=(await(await fetch("https://api.alquran.cloud/v1/surah")).json()).data;const f=document.getElementById("surah-selector");f.innerHTML=a.map(c=>`<option value="${c.number}">${c.number}. ${c.englishName} (${c.name})</option>`).join(""),document.getElementById("kuran-initial-loader").style.display="none",document.getElementById("kuran-content").style.display="block",f.addEventListener("change",c=>{l(parseInt(c.target.value))}),s.addEventListener("ended",()=>{i<n.length-1?o(i+1):v()}),s.addEventListener("play",()=>{r=!0,m(),y(i)}),s.addEventListener("pause",()=>{r=!1,m(),y(i)}),u.addEventListener("click",()=>{i===-1?n.length>0&&o(0):r?s.pause():s.play()}),document.getElementById("btn-prev-ayah").addEventListener("click",()=>{i>0&&o(i-1)}),document.getElementById("btn-next-ayah").addEventListener("click",()=>{i<n.length-1&&o(i+1)}),l(1)}catch(d){console.error("Kuran loading error",d),e.innerHTML=`<div class="page text-center"><p class="text-danger">Kur'an verileri yüklenemedi. Lütfen internet bağlantınızı kontrol edin.</p></div>`}async function l(d){v(),i=-1,document.getElementById("kuran-player").classList.remove("visible");const g=document.getElementById("verses-list");g.innerHTML='<div class="kuran-loading"><div class="kuran-loading-spinner"></div><p>Ayetler yükleniyor...</p></div>';try{const c=await(await fetch(`https://api.alquran.cloud/v1/surah/${d}/editions/quran-uthmani,tr.diyanet,ar.alafasy`)).json(),b=c.data[0],p=c.data[1],h=c.data[2],x=a[d-1];document.getElementById("surah-ar-name").textContent=x.name,document.getElementById("surah-tr-name").textContent=x.englishNameTranslation,document.getElementById("surah-revelation").textContent=x.revelationType==="Meccan"?"Mekki":"Medeni",document.getElementById("surah-ayah-count").textContent=x.numberOfAyahs,document.getElementById("player-surah-name").textContent=x.englishName,n=b.ayahs.map((E,_)=>({numberInSurah:E.numberInSurah,textAr:E.text,textTr:p.ayahs[_].text,audio:h.ayahs[_].audio})),g.innerHTML=n.map((E,_)=>`
        <div class="ayah-card" id="ayah-card-${_}">
          <div class="ayah-header">
            <div class="ayah-number">${E.numberInSurah}</div>
            <button class="ayah-play-btn" data-idx="${_}">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </button>
          </div>
          <div class="ayah-arabic">${E.textAr}</div>
          <div class="ayah-turkish">${E.textTr}</div>
        </div>
      `).join(""),document.querySelectorAll(".ayah-play-btn").forEach(E=>{E.addEventListener("click",_=>{const U=parseInt(_.currentTarget.dataset.idx);o(U)})})}catch{g.innerHTML='<p class="text-danger" style="text-align:center">Ayetler yüklenemedi.</p>'}}function o(d){if(!n[d])return;i=d;const g=n[d];s.src=g.audio,s.play(),document.getElementById("kuran-player").classList.add("visible"),document.getElementById("player-ayah-number").textContent=`Ayet ${g.numberInSurah}`;const f=document.getElementById(`ayah-card-${d}`);if(f){const b=f.getBoundingClientRect().top+window.scrollY+-80;window.scrollTo({top:b,behavior:"smooth"})}}function v(){s.pause()}function m(){r?u.innerHTML='<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>':u.innerHTML='<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'}function y(d){if(document.querySelectorAll(".ayah-card").forEach(g=>g.classList.remove("playing")),d!==-1){const g=document.getElementById(`ayah-card-${d}`);g&&r&&g.classList.add("playing")}}}function Rt(){const e=document.getElementById("kuran-audio");e&&(e.pause(),e.src="")}function Kt(){const e=document.getElementById("page-content");e.innerHTML=`
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
  `}const Ot="623184133319-q9vipsqbpf4cl15skb6v6g4b9rku9med.apps.googleusercontent.com";function Nt(){const e=document.getElementById("page-content");e.innerHTML=`
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
  `,document.getElementById("tab-login").addEventListener("click",n=>{n.target.classList.add("active"),n.target.style.color="var(--text-primary)",n.target.style.fontWeight="bold",n.target.style.borderBottom="2px solid var(--color-primary)";const i=document.getElementById("tab-register");i.classList.remove("active"),i.style.color="var(--text-muted)",i.style.fontWeight="normal",i.style.borderBottom="none",document.getElementById("login-form").style.display="block",document.getElementById("register-form").style.display="none"}),document.getElementById("tab-register").addEventListener("click",n=>{n.target.classList.add("active"),n.target.style.color="var(--text-primary)",n.target.style.fontWeight="bold",n.target.style.borderBottom="2px solid var(--color-primary)";const i=document.getElementById("tab-login");i.classList.remove("active"),i.style.color="var(--text-muted)",i.style.fontWeight="normal",i.style.borderBottom="none",document.getElementById("register-form").style.display="block",document.getElementById("login-form").style.display="none"}),document.getElementById("login-form").addEventListener("submit",async n=>{n.preventDefault();const i=document.getElementById("login-btn");i.disabled=!0,i.textContent="Giriş yapılıyor...";const r=document.getElementById("login-email").value,s=document.getElementById("login-password").value;await ve(r,s)?(k("Başarıyla giriş yapıldı. Merhaba!","success"),window.location.hash="#profile",window.dispatchEvent(new Event("authChange"))):(k("E-posta veya şifre hatalı!","error"),i.disabled=!1,i.textContent="Giriş Yap")}),document.getElementById("register-form").addEventListener("submit",async n=>{n.preventDefault();const i=document.getElementById("register-btn");i.disabled=!0,i.textContent="Kaydediliyor...";const r={username:document.getElementById("reg-email").value.split("@")[0],email:document.getElementById("reg-email").value,password:document.getElementById("reg-password").value,first_name:document.getElementById("reg-firstname").value,last_name:document.getElementById("reg-lastname").value,phone:document.getElementById("reg-phone").value,blood_group:document.getElementById("reg-blood").value},s=await Je(r);if(!s._error)k("Kaydınız başarıyla oluşturuldu!","success"),await ve(r.email,r.password),window.location.hash="#profile",window.dispatchEvent(new Event("authChange"));else{const u=s.email?"Bu e-posta zaten kayıtlı.":"Kayıt işlemi başarısız oldu.";k(u,"error"),i.disabled=!1,i.textContent="Kayıt Ol"}});async function t(n){const i=await Xe(n.credential);if(i.success){const r=i.created?"Google hesabınızla kayıt oldunuz. Hoş geldiniz!":"Google ile giriş yapıldı. Merhaba!";k(r,"success"),window.location.hash="#profile",window.dispatchEvent(new Event("authChange"))}else k("Google ile giriş başarısız oldu.","error")}window._handleGoogleCredential=t;function a(){if(typeof google>"u"||!google.accounts){setTimeout(a,500);return}google.accounts.id.initialize({client_id:Ot,callback:t,auto_select:!1,context:"signin"});const n=document.getElementById("google-login-btn-container"),i=document.getElementById("google-register-btn-container"),r={type:"standard",theme:"outline",size:"large",text:"signin_with",shape:"rectangular",logo_alignment:"left",width:n?n.offsetWidth:300};n&&google.accounts.id.renderButton(n,r),i&&google.accounts.id.renderButton(i,{...r,text:"signup_with"}),google.accounts.id.prompt()}a(),window.addEventListener("resize",()=>{})}async function Ft(){var t;const e=document.getElementById("page-content");e.innerHTML=`
    <div class="page text-center" style="padding:40px;">
      <div class="skeleton" style="width:100px; height:100px; border-radius:50%; margin: 0 auto 20px auto;"></div>
      <div class="skeleton" style="width:200px; height:20px; border-radius:8px; margin: 0 auto 20px auto;"></div>
      <div class="skeleton" style="width:100%; height:150px; border-radius:12px; margin-bottom:10px;"></div>
    </div>
  `;try{const a=await w("/auth/profile/",{requireAuth:!0});if(a._error){window.location.hash="#auth";return}if(e.innerHTML=`
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
            <span class="badge ${a.role==="admin"||a.role==="imam"?"badge--accent":"badge--primary"}">
              ${a.role==="admin"?"HADİM":a.role==="member"?"ÜYE":"İMAM"}
            </span>
            ${a.blood_group?`<span class="badge badge--danger">🩸 ${a.blood_group}</span>`:""}
          </div>
          
          ${a.role==="admin"||a.role==="imam"?`
            <button onclick="window.location.hash='#admin'" class="btn btn--accent btn--sm" style="margin-top:16px; padding:8px 16px;">
              ⚙️ Yönetim Paneli
            </button>
          `:""}

          <!-- Notification Permission Button -->
          <div id="push-perm-container" style="margin-top:16px; display:none;">
            <button id="btn-enable-push" class="btn btn--outline btn--sm" style="padding:6px 14px; font-size:12px; color:var(--color-primary); border-color:var(--color-primary);">
              🔔 Bildirimleri Aç
            </button>
            <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">Sorularınıza cevap geldiğinde anında haberiniz olsun</div>
          </div>
        </div>

        <!-- History Dashboard -->
        <div class="section-header mt-lg" style="margin-top:20px;">
          <h3 class="section-title">Geçmiş İşlemler</h3>
        </div>

        <div style="display:flex; flex-direction:column; gap:16px;">
          <!-- Donations History -->
          <div class="card card--dark" style="padding:16px;">
            <h4 style="font-size:16px; margin-bottom:12px; display:flex; align-items:center; gap:8px;">💳 Bağış Geçmişi</h4>
            ${a.donations&&a.donations.length>0?a.donations.map(n=>`
              <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);">
                <div>
                  <div style="font-weight:500;">${n.amount} ₺</div>
                  <div style="font-size:11px; color:var(--text-muted);">${n.type}</div>
                </div>
                <div style="font-size:12px; color:var(--text-secondary);">${n.date}</div>
              </div>
            `).join(""):'<p style="font-size:13px; color:var(--text-muted);">Henüz bağış kaydınız bulunmuyor.</p>'}
          </div>

          <!-- Tours History -->
          <div class="card card--dark" style="padding:16px;">
            <h4 style="font-size:16px; margin-bottom:12px; display:flex; align-items:center; gap:8px;">🕋 Tur Kayıtlarım</h4>
            ${a.tours&&a.tours.length>0?a.tours.map(n=>`
              <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);">
                <div style="max-width:70%;">
                  <div style="font-weight:500; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${n.tour_name}</div>
                  <div style="font-size:11px; color:var(--text-muted);">${n.date}</div>
                </div>
                <div><span class="badge badge--primary" style="font-size:10px">${n.status}</span></div>
              </div>
            `).join(""):'<p style="font-size:13px; color:var(--text-muted);">Henüz bir tura kayıt olmadınız.</p>'}
          </div>

          <!-- QA History -->
          <div class="card card--dark" style="padding:16px;">
            <h4 style="font-size:16px; margin-bottom:12px; display:flex; align-items:center; gap:8px;">🙋 Soru ve İstiftalarım</h4>
            ${a.questions&&a.questions.length>0?a.questions.map((n,i)=>`
              <div class="profile-qa-item" style="border-bottom:1px solid var(--border-color); padding:10px 0;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; cursor:pointer;" onclick="const d = document.getElementById('q-detail-${i}'); d.style.display = d.style.display === 'none' ? 'block' : 'none';">
                  <div style="flex:1; padding-right:10px;">
                    <div style="font-size:14px; margin-bottom:4px; ${n.answer?"font-weight:500;":""}">${(n.question||"").length>60?(n.question||"").substring(0,60)+"...":n.question||""}</div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="font-size:11px; color:var(--text-muted);">${n.date||""}</span>
                        ${n.is_private?'<span style="font-size:10px; background:rgba(255,193,7,0.1); color:#ffc107; padding:1px 6px; border-radius:4px;">🔒 Özel</span>':""}
                    </div>
                  </div>
                  <div style="font-size:14px;">${n.answer?"✅":"⏳"}</div>
                </div>
                <div id="q-detail-${i}" style="display:none; margin-top:12px; padding:12px; background:var(--bg-body); border-radius:8px; font-size:14px;">
                  <div style="margin-bottom:12px;"><strong>Soru:</strong><br/>${n.question||""}</div>
                  ${n.answer?`
                    <div style="color:var(--color-primary); border-top:1px solid var(--border-color); padding-top:12px;">
                      <strong>Hoca Cevabı:</strong><br/>
                      ${n.answer}
                    </div>
                  `:'<div style="color:var(--text-muted); font-style:italic;">Hocamız henüz cevaplamamış.</div>'}
                </div>
              </div>
            `).join(""):'<p style="font-size:13px; color:var(--text-muted);">Sorduğunuz soru bulunmuyor.</p>'}
          </div>

        </div>

        <button id="logout-btn" class="btn btn--outline btn--full" style="margin-top:32px; color:var(--color-danger); border-color:var(--color-danger);">
          Çıkış Yap
        </button>
      </div>
    `,document.getElementById("logout-btn").addEventListener("click",()=>{De(),k("Güle güle! Tekrar görüşmek üzere.","info"),window.location.hash="#auth"}),"Notification"in window&&Notification.permission!=="granted"&&Notification.permission!=="denied"){const n=document.getElementById("push-perm-container");n&&(n.style.display="block"),(t=document.getElementById("btn-enable-push"))==null||t.addEventListener("click",()=>{ge(!0)})}window.addEventListener("pushSubscribed",()=>{const n=document.getElementById("push-perm-container");n&&(n.style.display="none"),k("Bildirimler başarıyla açıldı!","success")})}catch{e.innerHTML=`<div class="page text-center"><p class="text-danger">Bağlantı hatası: Profil yüklenemedi.</p>
    <button class="btn btn--outline mt-md" onclick="window.location.hash='#auth'">Giriş Sayfasına Dön</button></div>`}}async function Gt(){const e=document.getElementById("page-content");if(!$()){window.location.hash="#auth";return}e.innerHTML=`
    <div class="page" style="padding-bottom:100px;">
      <div id="admin-header-nav" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <a href="#profile" style="display:inline-flex; align-items:center; gap:6px; color:var(--color-primary); text-decoration:none; font-size:14px; padding:12px 0;">
          ← Profil
        </a>
        <button id="btn-back-to-menu" class="btn btn--outline btn--sm" style="display:none; font-size:12px; padding:6px 12px;">
          🏠 Ana Menüye Dön
        </button>
      </div>

      <div class="section-header" style="margin-top:0; margin-bottom:20px;">
        <h2 class="section-title" id="admin-title">⚙️ Yönetim Paneli</h2>
      </div>

      <!-- DASHBOARD GRID -->
      <div id="admin-dashboard-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:24px;">
        <div class="card card--dark admin-module-card" data-module="questions" style="padding:20px; text-align:center; cursor:pointer; border:1px solid var(--border-color); transition:all 0.2s;">
          <div style="font-size:32px; margin-bottom:8px;">🙋</div>
          <div style="font-weight:bold; font-size:14px; margin-bottom:4px;">Sorular</div>
          <div style="font-size:11px; color:var(--text-muted);" id="stat-questions-label">Yükleniyor...</div>
        </div>
        
        <div class="card card--dark admin-module-card" data-module="announce" style="padding:20px; text-align:center; cursor:pointer; border:1px solid var(--border-color); transition:all 0.2s;">
          <div style="font-size:32px; margin-bottom:8px;">📢</div>
          <div style="font-weight:bold; font-size:14px; margin-bottom:4px;">Duyuru Ekle</div>
          <div style="font-size:11px; color:var(--text-muted);" id="stat-announce-label">Yükleniyor...</div>
        </div>

        <div class="card card--dark admin-module-card" data-module="tours" style="padding:20px; text-align:center; cursor:pointer; border:1px solid var(--border-color); transition:all 0.2s;">
          <div style="font-size:32px; margin-bottom:8px;">👥</div>
          <div style="font-weight:bold; font-size:14px; margin-bottom:4px;">Tur Kayıtları</div>
          <div style="font-size:11px; color:var(--text-muted);" id="stat-tours-label">Yükleniyor...</div>
        </div>

        <div class="card card--dark admin-module-card" data-module="tourmanage" style="padding:20px; text-align:center; cursor:pointer; border:1px solid var(--border-color); transition:all 0.2s;">
          <div style="font-size:32px; margin-bottom:8px;">🕋</div>
          <div style="font-weight:bold; font-size:14px; margin-bottom:4px;">Tur Yönetimi</div>
          <div style="font-size:11px; color:var(--text-muted);">Turları düzenle</div>
        </div>

        <div class="card card--dark admin-module-card" data-module="campaigns" style="padding:20px; text-align:center; cursor:pointer; border:1px solid var(--border-color); transition:all 0.2s; grid-column: span 2;">
          <div style="font-size:32px; margin-bottom:8px;">💎</div>
          <div style="font-weight:bold; font-size:14px; margin-bottom:4px;">Bağış Kampanyaları</div>
          <div style="font-size:11px; color:var(--text-muted);" id="stat-campaigns-label">Yükleniyor...</div>
        </div>
      </div>

      <!-- MODULE CONTENTS (Initially Hidden) -->
      <div id="admin-content-area" style="display:none;">
        <div id="tab-content-questions"></div>
        <div id="tab-content-announce" style="display:none;"></div>
        <div id="tab-content-tours" style="display:none;"></div>
        <div id="tab-content-tourmanage" style="display:none;"></div>
        <div id="tab-content-campaigns" style="display:none;"></div>
      </div>
    </div>
  `;const t=document.getElementById("admin-dashboard-grid"),a=document.getElementById("admin-content-area"),n=document.getElementById("btn-back-to-menu"),i=document.getElementById("admin-title"),r=d=>{if(d==="dashboard")t.style.display="grid",a.style.display="none",n.style.display="none",i.textContent="⚙️ Yönetim Paneli";else{t.style.display="none",a.style.display="block",n.style.display="block";const g={questions:"🙋 Gelen Sorular",announce:"📢 Duyuru Yayınla",tours:"👥 Tur Kayıtları",tourmanage:"🕋 Turları Yönet",campaigns:"💎 Kampayaları Yönet"};i.textContent=g[d]||"Yönetim",["questions","announce","tours","tourmanage","campaigns"].forEach(f=>{document.getElementById(`tab-content-${f}`).style.display=f===d?"block":"none"}),window.scrollTo({top:0,behavior:"smooth"})}};e.querySelectorAll(".admin-module-card").forEach(d=>{d.addEventListener("click",()=>r(d.dataset.module))}),n.addEventListener("click",()=>r("dashboard")),await Promise.all([s(),u(),l(),o(),v()]);async function s(){const d=await w("/ilim/questions/unanswered/",{requireAuth:!0}),g=document.getElementById("tab-content-questions"),f=document.getElementById("stat-questions-label");if(f&&(f.textContent=d._error?"Hata":`${d.length} bekleyen`),d._error||d.length===0){g.innerHTML='<div class="card card--dark" style="padding:24px; text-align:center; color:var(--text-muted); font-size:14px;">🎉 Tüm sorular cevaplanmış! Bekleyen soru yok.</div>';return}g.innerHTML=d.map(c=>`
      <div class="card card--dark" style="padding:16px; margin-bottom:12px;" id="q-card-${c.id}">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="font-size:11px; color:var(--text-muted);">${c.is_anonymous?"Anonim":c.asked_by||"Üye"} · ${c.date||""}</span>
          <span style="font-size:10px; background:var(--bg-secondary); padding:2px 8px; border-radius:8px; color:var(--text-secondary);">ID #${c.id}</span>
        </div>
        <div style="font-size:14px; margin-bottom:12px; line-height:1.5;">${c.text||c.question}</div>
        <textarea class="form-textarea" id="answer-${c.id}" placeholder="Cevabınızı buraya yazın..." rows="2" style="margin-bottom:8px;"></textarea>
        <button class="btn btn--primary btn--sm btn--full answer-btn" data-qid="${c.id}">Cevapla ve Yayınla</button>
      </div>
    `).join(""),g.querySelectorAll(".answer-btn").forEach(c=>{c.addEventListener("click",async()=>{const b=c.dataset.qid,p=document.getElementById(`answer-${b}`).value;if(!p.trim())return;if(c.disabled=!0,c.textContent="Gönderiliyor...",(await w(`/ilim/questions/${b}/answer/`,{method:"PATCH",body:{answer:p},requireAuth:!0}))._error)k("Cevap gönderilirken bir hata oluştu.","error"),c.disabled=!1,c.textContent="Cevapla ve Yayınla";else{k("Cevabınız başarıyla yayınlandı!","success"),c.textContent="Cevaplandı ✅",c.classList.add("btn--success");const x=document.getElementById(`q-card-${b}`);x.style.transition="all 0.5s ease",x.style.opacity="0",x.style.transform="translateY(-10px)",setTimeout(()=>{x.remove();const _=document.getElementById("tab-content-questions");_.querySelectorAll(".card").length===0&&(_.innerHTML='<div class="card card--dark" style="padding:24px; text-align:center; color:var(--text-muted); font-size:14px;">🎉 Tüm sorular cevaplanmış! Bekleyen soru yok.</div>')},500);const E=document.getElementById("stat-questions-label");if(E){const _=parseInt(E.textContent)||0;E.textContent=`${Math.max(0,_-1)} bekleyen`}}})})}async function u(){const d=document.getElementById("tab-content-announce");d.innerHTML=`
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

      <div class="section-header" style="margin-top:24px;">
        <h3 class="section-title">Mevcut Duyurular</h3>
      </div>
      <div id="ann-list" style="margin-top:8px;">
        <div class="card card--dark" style="padding:20px;text-align:center;color:var(--text-muted);">Yükleniyor...</div>
      </div>
    `;async function g(){const f=await w("/community/announcements/"),c=document.getElementById("ann-list"),b=document.getElementById("stat-announce-label");b&&(b.textContent=f._error?"Hata":`${f.length} duyuru`),c.innerHTML=f.map(p=>`
        <div class="card card--dark" style="padding:14px; margin-bottom:10px;" id="ann-card-${p.id}">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div style="flex:1; min-width:0;">
              <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                <span style="font-size:10px; background:var(--bg-secondary); padding:2px 8px; border-radius:8px; color:${p.categoryColor};">${p.category}</span>
                ${p.badge?`<span class="badge badge--accent" style="font-size:9px;">${p.badge}</span>`:""}
                <span style="font-size:10px; color:var(--text-muted);">${p.date}</span>
              </div>
              <div style="font-weight:600; font-size:14px; margin-bottom:4px;">${p.title}</div>
              <div style="font-size:12px; color:var(--text-secondary); line-height:1.4; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${p.body}</div>
            </div>
            <button class="btn btn--danger btn--sm delete-ann-btn" data-id="${p.id}" style="padding:4px 10px; font-size:11px; margin-left:10px; flex-shrink:0;">🗑️ Sil</button>
          </div>
        </div>
      `).join(""),c.querySelectorAll(".delete-ann-btn").forEach(p=>{p.addEventListener("click",async()=>{if(!confirm("Bu duyuruyu kaldırmak istediğinize emin misiniz?"))return;const h=p.dataset.id;if(p.textContent="...",p.disabled=!0,(await w("/community/announcements/"+h+"/delete/",{method:"DELETE",requireAuth:!0}))._error)k("Duyuru silinemedi","error"),p.textContent="🗑️ Sil",p.disabled=!1;else{k("Duyuru başarıyla kaldırıldı","success");const E=document.getElementById("ann-card-"+h);E&&(E.style.transition="opacity 0.3s, transform 0.3s",E.style.opacity="0",E.style.transform="translateX(20px)",setTimeout(()=>{E.remove();const _=c.querySelectorAll(".card").length;document.getElementById("stat-announcements").textContent=_,_===0&&(c.innerHTML='<div class="card card--dark" style="padding:20px;text-align:center;color:var(--text-muted);font-size:14px;">Aktif duyuru yok.</div>')},300))}})})}document.getElementById("announcement-form").addEventListener("submit",async f=>{f.preventDefault();const c=document.getElementById("ann-submit-btn");c.disabled=!0,c.textContent="Yayınlanıyor...";const b={category:document.getElementById("ann-category").value,title:document.getElementById("ann-title").value,body:document.getElementById("ann-body").value,badge:document.getElementById("ann-badge").value||""};(await w("/community/announcements/create/",{method:"POST",body:b,requireAuth:!0}))._error?(k("Duyuru yayınlanırken bir hata oluştu.","error"),c.disabled=!1,c.textContent="📢 Duyuruyu Yayınla"):(k("Duyuru başarıyla yayınlandı!","success"),f.target.reset(),c.disabled=!1,c.textContent="📢 Duyuruyu Yayınla",await g())}),await g()}async function l(){const d=await w("/ziyaret/registrations/",{requireAuth:!0}),g=document.getElementById("tab-content-tours"),f=document.getElementById("stat-tours-label");if(f&&(f.textContent=d._error?"Hata":`${d.length} yeni kayıt`),d._error||d.length===0){g.innerHTML='<div class="card card--dark" style="padding:24px; text-align:center; color:var(--text-muted); font-size:14px;">Henüz tur kaydı bulunmuyor.</div>';return}g.innerHTML=`
      <div style="display:flex; flex-direction:column; gap:10px;">
        ${d.map(c=>`
          <div class="card card--dark" style="padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:600; font-size:14px;">${c.full_name}</div>
                <div style="font-size:12px; color:var(--text-muted);">${c.phone} · ${c.passport_no||"Pasaport yok"}</div>
              </div>
              <span class="badge badge--primary" style="font-size:10px;">${c.status||"Beklemede"}</span>
            </div>
            ${c.note?`<div style="font-size:12px; color:var(--text-secondary); margin-top:6px; font-style:italic;">"${c.note}"</div>`:""}
          </div>
        `).join("")}
      </div>
    `}async function o(){const d=document.getElementById("tab-content-tourmanage"),g=`
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
    `;d.innerHTML=g;const f=async()=>{const c=await w("/ziyaret/admin/tours/",{requireAuth:!0}),b=document.getElementById("tm-list");if(c._error||c.length===0){b.innerHTML='<div style="text-align:center; color:var(--text-muted); font-size:14px;">Mevcut tur bulunamadı.</div>';return}b.innerHTML=c.map(p=>`
        <div class="card card--dark" style="padding:14px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:bold; font-size:14px;">${p.title}</div>
            <div style="font-size:12px; color:var(--text-muted);">${p.date_start} - ${p.date_end} · ${p.price}</div>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn btn--primary btn--sm edit-tour-btn" data-tour='${JSON.stringify(p).replace(/'/g,"&apos;")}' style="padding:4px 8px; font-size:11px;">Düzenle</button>
            <button class="btn btn--danger btn--sm delete-tour-btn" data-id="${p.id}" style="padding:4px 8px; font-size:11px;">Sil</button>
          </div>
        </div>
      `).join(""),b.querySelectorAll(".delete-tour-btn").forEach(p=>{p.addEventListener("click",async()=>{if(!confirm("Bu turu silmek istediğinize emin misiniz?"))return;const h=p.dataset.id;p.textContent="...",p.disabled=!0,(await w("/ziyaret/admin/tours/"+h+"/",{method:"DELETE",requireAuth:!0}))._error?(k("Tur silinemedi","error"),p.textContent="Sil",p.disabled=!1):(k("Tur başarıyla silindi","success"),f())})}),b.querySelectorAll(".edit-tour-btn").forEach(p=>{p.addEventListener("click",()=>{const h=JSON.parse(p.dataset.tour);document.getElementById("tm-id").value=h.id,document.getElementById("tm-title").value=h.title,document.getElementById("tm-start").value=h.date_start,document.getElementById("tm-end").value=h.date_end,document.getElementById("tm-duration").value=h.duration,document.getElementById("tm-price").value=h.price,document.getElementById("tm-seats").value=h.total_seats,document.getElementById("tm-status").value=h.status,document.getElementById("tm-color").value=h.status_color,document.getElementById("tm-form-title").textContent="Turu Düzenle",document.getElementById("tm-submit-btn").textContent="Güncelle",document.getElementById("tm-cancel-btn").style.display="block",window.scrollTo({top:0,behavior:"smooth"})})})};document.getElementById("tm-cancel-btn").addEventListener("click",()=>{document.getElementById("tour-manage-form").reset(),document.getElementById("tm-id").value="",document.getElementById("tm-form-title").textContent="Yeni Tur Ekle",document.getElementById("tm-submit-btn").textContent="Turu Ekle",document.getElementById("tm-cancel-btn").style.display="none"}),document.getElementById("tour-manage-form").addEventListener("submit",async c=>{c.preventDefault();const b=document.getElementById("tm-submit-btn");b.disabled=!0;const p=document.getElementById("tm-id").value,h=p?"PATCH":"POST",x=p?"/ziyaret/admin/tours/"+p+"/":"/ziyaret/admin/tours/";b.textContent=p?"Güncelleniyor...":"Ekleniyor...";const E={title:document.getElementById("tm-title").value,date_start:document.getElementById("tm-start").value,date_end:document.getElementById("tm-end").value,duration:document.getElementById("tm-duration").value,price:document.getElementById("tm-price").value,total_seats:parseInt(document.getElementById("tm-seats").value),status:document.getElementById("tm-status").value,status_color:document.getElementById("tm-color").value,is_active:!0};(await w(x,{method:h,body:E,requireAuth:!0}))._error?k(p?"Tur güncellenirken hata oluştu":"Tur eklenirken hata oluştu","error"):(k(p?"Tur başarıyla güncellendi!":"Tur başarıyla eklendi!","success"),c.target.reset(),document.getElementById("tm-cancel-btn").click(),await f()),b.disabled=!1,b.textContent=p?"Güncelle":"Turu Ekle"}),await f()}async function v(){const d=document.getElementById("tab-content-campaigns");d.innerHTML=`
      <form id="campaign-manage-form" class="card card--dark" style="padding:20px; margin-bottom:20px;">
        <h3 id="cm-form-title" style="margin-top:0; margin-bottom:16px;">Yeni Kampanya Ekle</h3>
        <input type="hidden" id="cm-id" value="">
        <div class="form-group">
          <label class="form-label">Kampanya Başlığı</label>
          <input type="text" id="cm-title" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label">Açıklama</label>
          <textarea id="cm-desc" class="form-textarea" rows="3" required></textarea>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="form-group">
            <label class="form-label">Hedef Miktar (₺)</label>
            <input type="number" id="cm-target" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Toplanan Miktar (₺)</label>
            <input type="number" id="cm-collected" class="form-input" value="0" required>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="form-group">
            <label class="form-label">İkon (Emoji)</label>
            <input type="text" id="cm-icon" class="form-input" placeholder="Örn: 🕌" required>
          </div>
          <div class="form-group">
            <label class="form-label">Durum</label>
            <select id="cm-active" class="form-select">
              <option value="true">Aktif</option>
              <option value="false">Taslak / Kapalı</option>
            </select>
          </div>
        </div>
        <div style="display:flex; gap:10px;">
          <button type="submit" class="btn btn--primary btn--full" id="cm-submit-btn" style="flex:2;">Kampanyayı Ekle</button>
          <button type="button" class="btn btn--danger" id="cm-cancel-btn" style="display:none; flex:1;">İptal</button>
        </div>
      </form>
      <div id="cm-list"></div>
    `;const g=async()=>{const f=await w("/bagis/admin/campaigns/",{requireAuth:!0}),c=document.getElementById("cm-list"),b=document.getElementById("stat-campaigns-label");if(f._error){c.innerHTML='<div style="text-align:center; color:var(--text-danger); font-size:14px;">Kampanyalar yüklenirken hata oluştu.</div>',b&&(b.textContent="Hata");return}const p=f.filter(h=>h.is_active).length;if(b&&(b.textContent=`${p} aktif kampanya`),f.length===0){c.innerHTML='<div style="text-align:center; color:var(--text-muted); font-size:14px;">Henüz kampanya bulunmuyor.</div>';return}c.innerHTML=f.map(h=>`
        <div class="card card--dark" style="padding:14px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
          <div style="flex:1;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:18px;">${h.icon}</span>
              <div style="font-weight:bold; font-size:14px;">${h.title}</div>
            </div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">
              ${parseFloat(h.collected_amount).toLocaleString("tr-TR")} / ${parseFloat(h.target_amount).toLocaleString("tr-TR")} ₺
              <span style="margin-left:8px; color:${h.is_active?"var(--color-primary)":"var(--text-danger)"}; font-size:10px;">
                ● ${h.is_active?"Aktif":"Kapalı"}
              </span>
            </div>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn btn--primary btn--sm edit-campaign-btn" data-campaign='${JSON.stringify(h).replace(/'/g,"&apos;")}' style="padding:4px 8px; font-size:11px;">Düzenle</button>
            <button class="btn btn--danger btn--sm delete-campaign-btn" data-id="${h.id}" style="padding:4px 8px; font-size:11px;">Sil</button>
          </div>
        </div>
      `).join(""),c.querySelectorAll(".delete-campaign-btn").forEach(h=>{h.addEventListener("click",async()=>{if(!confirm("Bu kampanyayı silmek istediğinize emin misiniz?"))return;const x=h.dataset.id;h.textContent="...",h.disabled=!0,(await w("/bagis/admin/campaigns/"+x+"/",{method:"DELETE",requireAuth:!0}))._error?(k("Kampanya silinemedi","error"),h.textContent="Sil",h.disabled=!1):(k("Kampanya silindi","success"),g())})}),c.querySelectorAll(".edit-campaign-btn").forEach(h=>{h.addEventListener("click",()=>{const x=JSON.parse(h.dataset.campaign);document.getElementById("cm-id").value=x.id,document.getElementById("cm-title").value=x.title,document.getElementById("cm-desc").value=x.description,document.getElementById("cm-target").value=parseInt(x.target_amount),document.getElementById("cm-collected").value=parseInt(x.collected_amount),document.getElementById("cm-icon").value=x.icon,document.getElementById("cm-active").value=x.is_active.toString(),document.getElementById("cm-form-title").textContent="Kampanyayı Düzenle",document.getElementById("cm-submit-btn").textContent="Güncelle",document.getElementById("cm-cancel-btn").style.display="block",window.scrollTo({top:0,behavior:"smooth"})})})};document.getElementById("cm-cancel-btn").addEventListener("click",()=>{document.getElementById("campaign-manage-form").reset(),document.getElementById("cm-id").value="",document.getElementById("cm-form-title").textContent="Yeni Kampanya Ekle",document.getElementById("cm-submit-btn").textContent="Kampanyayı Ekle",document.getElementById("cm-cancel-btn").style.display="none"}),document.getElementById("campaign-manage-form").addEventListener("submit",async f=>{f.preventDefault();const c=document.getElementById("cm-submit-btn");c.disabled=!0;const b=document.getElementById("cm-id").value,p=b?"PATCH":"POST",h=b?"/bagis/admin/campaigns/"+b+"/":"/bagis/admin/campaigns/";c.textContent=b?"Güncelleniyor...":"Ekleniyor...";const x={title:document.getElementById("cm-title").value,description:document.getElementById("cm-desc").value,target_amount:parseFloat(document.getElementById("cm-target").value),collected_amount:parseFloat(document.getElementById("cm-collected").value),icon:document.getElementById("cm-icon").value,is_active:document.getElementById("cm-active").value==="true"};(await w(h,{method:p,body:x,requireAuth:!0}))._error?k(b?"Kampanya güncellenirken hata":"Kampanya eklenirken hata","error"):(k(b?"Kampanya güncellendi!":"Kampanya eklendi!","success"),f.target.reset(),document.getElementById("cm-cancel-btn").click(),await g()),c.disabled=!1,c.textContent=b?"Güncelle":"Kampanyayı Ekle"}),await g()}const m=await w("/community/announcements/"),y=document.getElementById("stat-announce-label");y&&(y.textContent=m._error?"Hata":`${m.length} duyuru`)}let K="prayer";function F(e){K==="prayer"?Mt():K==="kuran"&&Rt(),K=e,window.location.hash=e,et(K,F),window.scrollTo(0,0);const t=document.querySelector(".bottom-nav"),a=["kvkk","auth","profile","admin","kuran"];switch(t&&(t.style.display=a.includes(e)?"none":"flex"),e){case"prayer":Me();break;case"community":Ct();break;case"ilim":jt();break;case"bagis":qt();break;case"ziyaret":Pt();break;case"kuran":Ht();break;case"kvkk":Kt();break;case"auth":if($()){F("profile");return}Nt();break;case"profile":if(!$()){F("auth");return}Ft();break;case"admin":if(!$()){F("auth");return}Gt();break;default:Me()}}window.addEventListener("hashchange",()=>{const e=window.location.hash.replace("#","")||"prayer";e!==K&&F(e)});function Yt(){Pe();const e=window.location.hash.replace("#","");e&&["prayer","community","ilim","bagis","ziyaret","kuran","kvkk","auth","profile","admin"].includes(e)&&(K=e),F(K)}async function ge(e=!1){if("serviceWorker"in navigator&&"PushManager"in window&&$())try{let t=Notification.permission;if(t==="default"&&e&&(t=await Notification.requestPermission()),t==="granted"){const a=await navigator.serviceWorker.ready,n=Zt("BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuB-3qOX7j30CG3EMGWpncwYkU"),i=await a.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:n}),r=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?"http://localhost:8000/api":"https://caferi-toplumu.onrender.com/api";if(await fetch(`${r}/auth/webpush/subscribe/`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("access_token")}`},body:JSON.stringify({status_type:"subscribe",subscription:i,browser:navigator.userAgent.includes("Chrome")?"chrome":"other",user_agent:navigator.userAgent})}),e){const s=new CustomEvent("pushSubscribed");window.dispatchEvent(s)}}}catch(t){console.error("Push registration failed:",t)}}function Zt(e){const t="=".repeat((4-e.length%4)%4),a=(e+t).replace(/-/g,"+").replace(/_/g,"/"),n=window.atob(a),i=new Uint8Array(n.length);for(let r=0;r<n.length;++r)i[r]=n.charCodeAt(r);return i}window.addEventListener("authChange",()=>{Pe(),ge()});function qe(){Yt(),setTimeout(ge,3e3)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",qe):qe();export{pe as W};
