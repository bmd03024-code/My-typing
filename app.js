(()=>{'use strict';const $=id=>document.getElementById(id),K='myTypingLMS_v1';const base={settings:{learn:15,game:15,user:'Borhan Uddin Mohim',pass:'Borhan Uddin Mohim'},progress:{en:{},bn:{}},best:{en:0,bn:0},theme:'dark',curriculum:null};let S;try{S={...base,...JSON.parse(localStorage.getItem(K)||'{}')}}catch{S=structuredClone(base)}let run=null,tick=null,last=0,game='rain',score=0;function save(){localStorage.setItem(K,JSON.stringify(S));render()}function days(t){
const en=[
["Home row basics","asdf jkl; asdf jkl;","a s d f j k l ;","asdf jkl; fjdk sl;a","all fall ask dad;"],
["Home row words","sad dad; lass; flask;","ask a lad; a salad;","add; fall; glad;","had; shall; alas;"],
["Home row sentences","a sad lad asks dad.","all lads fall;","a flask has a lid.","dad adds a salad."],
["Top row reach","qwerty uiop qwerty","type your power","quiet tower; write it","we type quite well."],
["Top row words","try; power; write;","quiet; upper; query;","type; poet; wire;","write your query."],
["Bottom row reach","zxcvbnm zxcvbnm","mix; zoom; cave;","box; move; zinc;","vex; cabin; name;"],
["All letters review","the quick brown fox","jumps over the lazy dog.","pack my box with five dozen liquor jugs.","every letter matters."],
["Common short words","the and for you are","with this have from","they will your that","we can learn every day."],
["Capital letters","My Name Is Alex.","Today We Practice Typing.","English Skills Grow With Practice.","Keep Your Hands On Home Row."],
["Numbers row","12345 67890","2026 123 456 789","Room 204, Level 3.","Call 01712345678."],
["Punctuation","Hello, how are you?","I am fine; thank you!","Wait—then try again.","Practice: focus, rhythm, accuracy."],
["Short paragraphs","Good typing begins with steady hands.","Look at the screen, not the keys.","Accuracy comes before speed."],
["Common endings","walking; reading; helpful;","carefully; quickly; slowly;","finished; learning;","Typing improves with daily effort."],
["Mixed drills","the quick learner types well.","Bright stars shine at night.","Small steps make big progress."],
["Accuracy challenge","A careful typist makes fewer errors.","Slow down when a word feels difficult.","Correct mistakes and continue."],
["Numbers and symbols","Email: learner@example.com","Price: $25.50 (tax included).","Date: 21/11/2026.","Score = 95% + 5 points."],
["Long words","communication; responsibility;","international; development;","extraordinary; opportunity;","concentration; determination;"],
["Paragraph practice","Typing is a useful skill for study and work. Regular practice builds confidence. Keep a comfortable posture and use every finger."],
["Speed rhythm","the the and and you you","for for with with that that","Keep a smooth and even rhythm."],
["Review home row","asdf jkl; sad lad flask","ask dad; all fall;","A steady rhythm is more useful than rushing."],
["Review top row","qwerty uiop type write","quiet power; query;","The top row becomes easier with repetition."],
["Review bottom row","zxcvbnm mix box move","zebra; cabin; maximum;","Use the correct finger for each key."],
["Editing practice","Typing is easy when you practise.","Backspace can correct a mistake.","Read the sentence before you type."],
["Punctuation review","Are you ready? Yes, I am!","First, plan; next, type; finally, review.","Use commas and full stops correctly."],
["Paragraph accuracy","A good typist works calmly and carefully. Accuracy is the foundation of speed. Practice a little every day."],
["Speed building","Pack my box with five dozen liquor jugs.","Sphinx of black quartz, judge my vow.","The five boxing wizards jump quickly."],
["Mixed assessment","Learning takes time, effort, and patience.","Measure your progress every week.","Stay relaxed and keep improving."],
["Long-form practice","Digital communication connects people around the world. Clear writing and accurate typing help us share ideas, complete tasks, and learn new things."],
["Timed preparation","Focus on accuracy for the first minute.","Build a steady pace in the next minutes.","Finish strongly without losing control."],
["Final review","The quick brown fox jumps over the lazy dog.","Practice every day to become a confident typist.","Accuracy first, speed follows."]
];
const bn=[
["স্বরবর্ণ পরিচিতি","অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ","অ আ ই ঈ উ ঊ","এ ঐ ও ঔ ঋ","স্বরবর্ণ সুন্দরভাবে লিখি।"],
["ব্যঞ্জনবর্ণ ক-ঙ","ক খ গ ঘ ঙ","ক কা কি কী কু","খ গ ঘ ঙ","ক খ গ ঘ ঙ অনুশীলন করি।"],
["ব্যঞ্জনবর্ণ চ-ঞ","চ ছ জ ঝ ঞ","চ ছ জ ঝ ঞ","চা ছাতা জল ঝিনুক","চ ছ জ ঝ ঞ শিখি।"],
["ট-বর্গ","ট ঠ ড ঢ ণ","ট ঠ ড ঢ ণ","টাকা ঠেলা ডাল ঢাক","ট-বর্গ বারবার লিখি।"],
["ত-বর্গ","ত থ দ ধ ন","ত থ দ ধ ন","তালা থালা নদী ধান","ত থ দ ধ ন অনুশীলন।"],
["প-বর্গ","প ফ ব ভ ম","প ফ ব ভ ম","পাখি ফুল বই ভাষা","প-বর্গ শুদ্ধভাবে লিখি।"],
["অন্তঃস্থ ও উষ্ম","য র ল শ ষ স হ","য র ল শ ষ স হ","শিশু হাসে, মানুষ শেখে।"],
["বিশেষ বর্ণ","ড় ঢ় য় ং ঃ ঁ","ড় ঢোল, ঢ় আষাঢ়, য়","বাংলা ভাষা মধুর।"],
["আ-কার","কা খা গা ঘা চা","তালা, কালা, বাজার","আমার বাংলা ভাষা।"],
["ই-কার ও ঈ-কার","কি কী গি গী চি চী","কিরণ, নীতি, জীবিকা","শিশু নিয়মিত লিখে।"],
["উ-কার ও ঊ-কার","কু কূ গু গূ","কুকুর, দূর, মূল","সূর্য উঠেছে পূর্বে।"],
["এ-কার ও ঐ-কার","কে কৈ খে খৈ","দেশ, লেখা, বৈশাখ","দেশের মানুষ ঐক্যবদ্ধ।"],
["ও-কার ও ঔ-কার","কো কৌ খো খৌ","লোক, নৌকা, মৌসুম","নৌকা নদীতে চলে।"],
["রেফ ও র-ফলা","র্ক ক্র গ্র প্র ব্র","কর্ম, ক্রম, গ্রাম, প্রেম","প্রতিদিন কর্মে উন্নতি হয়।"],
["য-ফলা ও ল-ফলা","ক্য গ্য ত্য দ্য ক্ল প্ল","ব্যক্তি, বিদ্যালয়, মূল্য","বাংলা লিখতে যত্ন দরকার।"],
["শব্দ গঠন","বাংলা, শিক্ষা, মানুষ, প্রকৃতি","স্বাধীনতা, বাংলাদেশ, সংস্কৃতি","আমি বাংলা টাইপ শিখছি।"],
["যুক্তবর্ণ অনুশীলন","ক্ত ক্ষ জ্ঞ ত্র শ্র","শক্তি, শিক্ষা, জ্ঞান, ছাত্র","যুক্তবর্ণ ধীরে ধীরে লিখি।"],
["ফলা মিশ্র অনুশীলন","প্রিয়, গ্রন্থ, ক্লান্ত, ব্যক্তি","ব্যবস্থা, স্বাধীন, মূল্য","শুদ্ধ বানান অনুশীলন করি।"],
["বাক্য অনুশীলন","আমি প্রতিদিন বাংলা টাইপ করি।","নিয়মিত চর্চায় দক্ষতা বাড়ে।","ধৈর্য ধরে সঠিকভাবে লিখি।"],
["বিরামচিহ্ন","তুমি কেমন আছ? আমি ভালো আছি।","থামো, ভাবো; তারপর লেখো।","বাহ! কী সুন্দর লেখা!"],
["সংখ্যা ও তারিখ","২০২৬ সালের ২১ নভেম্বর","১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ০","সময়: রাত ৯টা ৮ মিনিট।"],
["প্রাত্যহিক শব্দ","পরিবার, বিদ্যালয়, বাজার, বন্ধু","কম্পিউটার, মোবাইল, ইন্টারনেট","প্রযুক্তি আমাদের কাজে লাগে।"],
["দীর্ঘ শব্দ","আন্তর্জাতিক, দায়িত্বশীলতা","যোগাযোগ, প্রতিযোগিতা, প্রয়োজনীয়","নিয়মিত অনুশীলন আত্মবিশ্বাস বাড়ায়।"],
["অনুচ্ছেদ","বাংলা আমাদের মাতৃভাষা। এই ভাষায় আমরা মনের ভাব প্রকাশ করি। শুদ্ধভাবে বাংলা লেখা ও টাইপ করা একটি প্রয়োজনীয় দক্ষতা।"],
["শুদ্ধ বানান","পৃথিবী, স্বাধীনতা, প্রতিষ্ঠান","অভিজ্ঞতা, গুরুত্বপূর্ণ, সহযোগিতা","শুদ্ধ বানান লেখার অভ্যাস গড়ি।"],
["যুক্তবর্ণ পর্যালোচনা","ঙ্ক ঙ্গ ঞ্চ ঞ্জ ণ্ড","ন্দ্ব ন্ত্র ষ্ট ষ্ঠ","বাংলা যুক্তবর্ণ মনোযোগ দিয়ে লিখি।"],
["গতি অনুশীলন","সময়মতো কাজ শেষ করতে দ্রুত ও নির্ভুল টাইপ প্রয়োজন।","ভুল কমিয়ে ধীরে ধীরে গতি বাড়াই।"],
["দীর্ঘ অনুচ্ছেদ","প্রযুক্তির উন্নতির ফলে শিক্ষা, যোগাযোগ ও কর্মক্ষেত্রে কম্পিউটারের ব্যবহার বেড়েছে। বাংলা টাইপিং জানলে নিজের ভাষায় সহজে তথ্য তৈরি ও আদান-প্রদান করা যায়।"],
["পরীক্ষার প্রস্তুতি","প্রথমে নির্ভুলতার দিকে মনোযোগ দাও।","এরপর স্বাভাবিক ছন্দে টাইপ করো।","শেষ পর্যন্ত মনোযোগ ধরে রাখো।"],
["চূড়ান্ত পুনরালোচনা","বাংলা ভাষা আমাদের পরিচয় ও গৌরব।","প্রতিদিন অনুশীলন করলে দক্ষতা বাড়ে।","নির্ভুলতা আগে, গতি পরে।"]
];
return (t==='en'?en:bn).map((row,i)=>({title:'Day '+(i+1)+' · '+row[0],learn:row.slice(1).join(' '),game:row.slice(1).join(' ')}));
}function cur(){return S.curriculum||{en:days('en'),bn:days('bn')}}function count(t){return Object.values(S.progress[t]).filter(p=>p.learn&&p.game).length}function render(){let a=count('en'),b=count('bn'),n=a+b;$('days').textContent=n+' / 60';$('percent').textContent=Math.round(n/60*100)+'%';$('totalBar').style.width=n/60*100+'%';$('enBar').style.width=a/30*100+'%';$('bnBar').style.width=b/30*100+'%';$('enBest').textContent=S.best.en||0;$('bnBest').textContent=S.best.bn||0;$('bangla').disabled=a<30;$('bangla').textContent=a<30?'লকড':'শুরু করুন';$('final').classList.toggle('hide',!(a===30&&b===30));let h='';for(let t of ['en','bn'])for(let i=1;i<=30;i++){let p=S.progress[t][i];h+='<div class="chip '+(p?.learn&&p?.game?'done':'')+'">'+t.toUpperCase()+' '+i+' · '+(p?.learn&&p?.game?'✓':'বাকি')+'</div>'}$('records').innerHTML=h;document.body.classList.toggle('light',S.theme==='light')}function first(t){for(let i=1;i<=30;i++)if(!S.progress[t][i]?.learn||!S.progress[t][i]?.game)return i;return 30}function open(t,d=first(t),phase){
 if(t==='bn'&&count('en')<30)return alert('প্রথমে English track-এর ৩০ দিন শেষ করুন।');
 const day=cur()[t][d-1],p=S.progress[t][d]||{},ph=phase||(!p.learn?'learn':'game');
 const source=day[ph]||day.learn;
 const pool=source.split(/(?<=[.!?।;])\s+/).filter(Boolean);
 const words=source.split(/\s+/).filter(Boolean);
 run={t,d,ph,source,pool:pool.length?pool:[source],words:words.length?words:[source],round:0,txt:source,remaining:(ph==='learn'?S.settings.learn:S.settings.game)*60,initial:(ph==='learn'?S.settings.learn:S.settings.game)*60,typed:0,correct:0,errors:0,active:0,activeMs:0,started:false,done:false,lastInputAt:0,lastTickAt:0,score:0,rounds:0,stamp:Date.now(),pendingG:false};
 choosePrompt();
 $('lesson').classList.remove('hide');
 $('trackName').textContent=t==='en'?'ENGLISH QWERTY':'বাংলা Bijoy-style Unicode';
 $('lessonTitle').textContent='Day '+d+' · '+day.title;
 $('phase').textContent=ph==='learn'?'Learn':'Game';
 $('typing').value='';$('typing').disabled=false;
 $('message').textContent='Start চাপুন, তারপর টাইপ করুন। ৪ সেকেন্ড টাইপ না করলে টাইমার থামবে; আবার টাইপ করলে চলবে।';
 $('games').classList.toggle('hide',ph!=='game');
 $('gameInfo').textContent=ph==='game'?'গেম বেছে নিয়ে শব্দ/বাক্য টাইপ করুন।':'';
 $('next').disabled=true;$('next').textContent='পরের ধাপ';
 target();renderKeyboard();
 $('clock').textContent=fmt(run.remaining);
 $('phaseBar').style.width='0%';
 $('lesson').scrollIntoView({behavior:'smooth'});
}
function choosePrompt(){
 if(!run)return;
 if(run.ph==='learn'){
  run.txt=run.pool[run.round%run.pool.length];
 }else if(game==='race'){
  const n=4,start=(run.round*n)%run.words.length;
  run.txt=Array.from({length:Math.min(n,run.words.length)},(_,i)=>run.words[(start+i)%run.words.length]).join(' ');
 }else{
  run.txt=run.words[run.round%run.words.length];
 }
}
function renderKeyboard(){
 const keys=run?.t==='bn'?['ঙ/ং','য/য়','ড/ঢ','প/ফ','ট/ঠ','চ/ছ','জ/ঝ','হ/ঞ','গ/ঘ','ড়/ঢ়','ৃ/র্','ু/ূ','ি/ী','া/অ','্/।','ব/ভ','ক/খ','ত/থ','দ/ধ','্র/্য','ও/ৗ','ে/ৈ','র/ল','ন/ণ','স/ষ','ম/শ']:['Q W E R T Y U I O P','A S D F G H J K L ;','Z X C V B N M'];
 $('keyboard').innerHTML=keys.map(x=>'<span class="key">'+esc(x)+'</span>').join('');
}
function units(value){return typeof Intl!=='undefined'&&Intl.Segmenter?[...new Intl.Segmenter('bn',{granularity:'grapheme'}).segment(value)].map(x=>x.segment):Array.from(value)}
function fmt(n){return Math.floor(n/60)+':'+String(n%60).padStart(2,'0')}function target(){
 if(!run)return;
 let v=units($('typing').value||''),txt=units(run.txt);
 $('target').innerHTML='<small>'+ (run.ph==='game'?(game==='rain'?'☄ WORD RAIN':game==='race'?'🚗 TURBO RACE':'🫧 BUBBLE POP'):'PRACTICE')+' · Round '+(run.round+1)+'</small><br>'+[...txt].map((c,i)=>'<span class="'+(i<v.length?(v[i]===c?'ok':'err'):(i===v.length?'nextchar':''))+'">'+esc(c)+'</span>').join('');
}function esc(c){return c.replace(/[&<>]/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[x]))}function metrics(){
 let m=Math.max(1/60,run.activeMs/60000),acc=run.typed?Math.round(run.correct/run.typed*100):100,speed=run.t==='en'?Math.round(run.correct/5/m):Math.round(run.correct/m),unit=run.t==='en'?'WPM':'CPM';
 $('metrics').textContent=speed+' '+unit+' · '+acc+'% accuracy · '+run.errors+' errors';
 return{wpm:speed,acc,unit};
}
function start(){
 if(!run||run.done)return;
 if(run.started)return;
 run.started=true;run.lastTickAt=Date.now();
 clearInterval(tick);
 tick=setInterval(()=>{
  if(!run?.started||run.done)return;
  const now=Date.now(),dt=Math.max(0,Math.min(1000,now-run.lastTickAt));
  run.lastTickAt=now;
  if(run.lastInputAt&&now-run.lastInputAt<=4000){
   run.activeMs+=dt;run.active=run.activeMs/1000;run.remaining=Math.max(0,run.remaining-dt/1000);
   $('clock').textContent=fmt(Math.ceil(run.remaining));
   $('phaseBar').style.width=(1-run.remaining/run.initial)*100+'%';
   if(run.remaining<=0)finish();
  }
 },250);
}
function pause(){if(run)run.started=false}function finish(){if(!run||run.done)return;run.done=true;pause();clearInterval(tick);let m=metrics(),p=S.progress[run.t][run.d]||{};p[run.ph]=true;p[run.ph+'Stats']=m;S.progress[run.t][run.d]=p;S.best[run.t]=Math.max(S.best[run.t]||0,run.t==='en'?m.wpm:Math.round(run.correct/Math.max(1,run.active/60)));$('message').textContent=run.ph==='learn'?'Learn সম্পন্ন। Game ধাপে যান।':'আজকের Game phase সম্পন্ন।';$('next').disabled=false;$('next').textContent=run.ph==='learn'?'Game শুরু':'পরের দিন';save()}function next(){if(!run)return;let {t,d,ph}=run;if(ph==='learn')open(t,d,'game');else if(d<30)open(t,d+1);else{$('lesson').classList.add('hide');alert(t==='en'?'English সম্পন্ন। বাংলা track unlock হয়েছে।':'দুই track সম্পন্ন। Grand Final প্রস্তুত।');render()}}function play(){
 if(!run)return;
 const bonus=Math.max(5,Math.round(metrics().wpm/2));
 run.score+=bonus;run.rounds++;
 const label=game==='rain'?'☄ শব্দ ধরুন':game==='race'?'🚗 গাড়ি এগিয়েছে':'🫧 বুদবুদ ফেটেছে';
 $('gameInfo').textContent=label+' · Round '+run.rounds+' · Score '+run.score;
}
function completePrompt(){
 run.round++;choosePrompt();$('typing').value='';run.typed=0;run.correct=0;run.errors=0;target();metrics();
}
const bijoy={
 KeyQ:['ং','ঙ'],KeyW:['য','য়'],KeyE:['ড','ঢ'],KeyR:['প','ফ'],KeyT:['ট','ঠ'],KeyY:['চ','ছ'],KeyU:['জ','ঝ'],KeyI:['হ','ঞ'],KeyO:['গ','ঘ'],KeyP:['ড়','ঢ়'],
 KeyA:['র্','ৃ'],KeyS:['ু','ূ'],KeyD:['ি','ী'],KeyF:['া','অ'],KeyG:['্','।'],KeyH:['ব','ভ'],KeyJ:['ক','খ'],KeyK:['ত','থ'],KeyL:['দ','ধ'],
 KeyZ:['্য','্র'],KeyX:['ও','ৗ'],KeyC:['ে','ৈ'],KeyV:['র','ল'],KeyB:['ন','ণ'],KeyN:['স','ষ'],KeyM:['ম','শ'],
 Backslash:['ৎ','ঃ'],Digit0:['০',')'],Digit1:['১','!'],Digit2:['২','@'],Digit3:['৩','#'],Digit4:['৪','৳'],Digit5:['৫','%'],Digit6:['৬','÷'],Digit7:['৭','ঁ'],Digit8:['৮','×'],Digit9:['৯','(']
};
const vowels={KeyA:'ঋ',KeyS:'উ',KeyD:'ই',KeyF:'আ',KeyC:'এ'};
$('typing').addEventListener('keydown',e=>{
 if(!run||run.t!=='bn'||e.ctrlKey||e.metaKey||e.altKey)return;
 if(e.code==='Backspace'){run.pendingG=false;return;}
 if(e.code==='Space'){if(run.pendingG){e.preventDefault();insertBangla('্ ');run.pendingG=false;}return;}
 if(e.code==='KeyG'&&!e.shiftKey){e.preventDefault();run.pendingG=true;return;}
 const pair=bijoy[e.code];
 if(!pair){if(run.pendingG){e.preventDefault();insertBangla('্'+e.key);run.pendingG=false;}return;}
 e.preventDefault();
 let out=pair[e.shiftKey?1:0];
 if(run.pendingG){
  const vowel=(!e.shiftKey&&vowels[e.code])||(e.shiftKey&&e.code==='KeyD'?'ঈ':e.shiftKey&&e.code==='KeyS'?'ঊ':e.shiftKey&&e.code==='KeyC'?'ঐ':e.shiftKey&&e.code==='KeyX'?'ঔ':null);
  out=vowel||('্'+out);run.pendingG=false;
 }
 insertBangla(out);
});
function insertBangla(value){
 const el=$('typing'),a=el.selectionStart,b=el.selectionEnd;
 el.setRangeText(value,a,b,'end');el.dispatchEvent(new Event('input',{bubbles:true}));
}
$('typing').addEventListener('input',()=>{
 if(!run||run.done)return;
 const now=Date.now();run.lastInputAt=now;if(!run.started)start();
 const v=$('typing').value,arr=units(v),tar=units(run.txt);
 run.typed=arr.length;run.correct=0;run.errors=0;
 arr.forEach((c,i)=>c===tar[i]?run.correct++:run.errors++);
 target();metrics();
 if(arr.length>=tar.length){
  if(arr.join('')===tar.join('')){
   if(run.ph==='game')play();
   completePrompt();
  }
 }
});$('english').onclick=()=>open('en');$('bangla').onclick=()=>open('bn');$('start').onclick=()=>{if(run){start();$('message').textContent='টাইপ করলে সময় গণনা শুরু হবে; ৪ সেকেন্ড বিরতিতে থামবে।'}};$('pause').onclick=pause;$('next').onclick=next;$('close').onclick=()=>{$('lesson').classList.add('hide');pause();clearInterval(tick)};document.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>{
 game=b.dataset.game;if(run&&run.ph==='game'){run.round=0;run.score=0;choosePrompt();$('typing').value='';run.typed=run.correct=run.errors=0;target();$('gameInfo').textContent=(game==='rain'?'☄ Word Rain':game==='race'?'🚗 Turbo Car Race':'🫧 Bubble Pop')+' চালু হয়েছে।';}
});$('theme').onclick=()=>{S.theme=S.theme==='dark'?'light':'dark';save()};$('backup').onclick=()=>download('my-typing-backup.json',JSON.stringify(S,null,2));$('restoreBackup').onclick=()=>$('backupFile').click();$('backupFile').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const data=JSON.parse(await file.text());if(!data||!data.settings||!data.progress||!data.progress.en||!data.progress.bn)throw Error('Backup file format ভুল');if(!confirm('বর্তমান progress ও settings backup দিয়ে প্রতিস্থাপন করবেন?'))return;S={...base,...data,settings:{...base.settings,...data.settings},progress:{en:data.progress.en,bn:data.progress.bn},best:{...base.best,...data.best}};save();alert('Backup restore হয়েছে।')}catch(err){alert('Restore হয়নি: '+err.message)}finally{e.target.value=''}};$('restoreBackup').onclick=()=>$('backupFile').click();$('backupFile').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const data=JSON.parse(await file.text());if(!data||!data.settings||!data.progress||!data.progress.en||!data.progress.bn)throw Error('Backup file format ভুল');if(!confirm('বর্তমান progress ও settings backup দিয়ে প্রতিস্থাপন করবেন?'))return;S={...base,...data,settings:{...base.settings,...data.settings},progress:{en:data.progress.en,bn:data.progress.bn},best:{...base.best,...data.best}};save();alert('Backup restore হয়েছে।')}catch(err){alert('Restore হয়নি: '+err.message)}finally{e.target.value=''}};function download(n,c){let a=document.createElement('a'),u=URL.createObjectURL(new Blob([c],{type:'application/json'}));a.href=u;a.download=n;a.click();URL.revokeObjectURL(u)}$('adminOpen').onclick=()=>$('admin').showModal();$('loginBtn').onclick=()=>{if($('user').value===S.settings.user&&$('pass').value===S.settings.pass){$('login').classList.add('hide');$('tools').classList.remove('hide')}else alert('Username/password ভুল')};$('preview').onclick=()=>open($('admTrack').value,Math.max(1,Math.min(30,+$('admDay').value)),$('admPhase').value);$('unlock').onclick=()=>{const t=$('admTrack').value,d=Math.max(1,Math.min(30,+$('admDay').value||1));S.progress[t][d]={...(S.progress[t][d]||{}),learn:true,game:true,adminUnlocked:true};save();alert('নির্বাচিত দিনটি Admin override দিয়ে সম্পন্ন হিসেবে চিহ্নিত হয়েছে।')};$('fast').onclick=()=>{if(run){run.remaining=0;finish()}};$('simulate').onclick=()=>{for(let t of ['en','bn'])for(let d=1;d<=30;d++)S.progress[t][d]={learn:true,game:true,simulated:true};save();alert('Progress simulation complete; Grand Final unlocked.')};$('reset').onclick=()=>{if(confirm('সব progress মুছবেন?')){S.progress={en:{},bn:{}};S.best={en:0,bn:0};save()}};$('settings').onclick=()=>{S.settings.learn=Math.max(1,+$('learnMin').value||15);S.settings.game=Math.max(1,+$('gameMin').value||15);S.settings.user=$('newUser').value||S.settings.user;S.settings.pass=$('newPass').value||S.settings.pass;save();alert('Settings saved')};$('exportCurr').onclick=()=>download('my-typing-curriculum.json',JSON.stringify(cur(),null,2));$('importCurr').onclick=()=>{try{let c=JSON.parse($('curriculumJSON').value);if(!Array.isArray(c.en)||c.en.length!==30||!Array.isArray(c.bn)||c.bn.length!==30||!['en','bn'].every(t=>c[t].every(d=>d&&typeof d.title==='string'&&typeof d.learn==='string'&&typeof d.game==='string')))throw Error('English ও Bangla-তে title, learn, game-সহ ৩০টি বৈধ দিন প্রয়োজন');S.curriculum=c;save();alert('Curriculum imported')}catch(e){alert(e.message)}};$('resetCurr').onclick=()=>{S.curriculum=null;save()};let examTimer=null;function beginExam(){
const t=prompt('পরীক্ষার ভাষা লিখুন: en অথবা bn','en');if(!['en','bn'].includes((t||'').toLowerCase()))return;const lang=t.toLowerCase(),passage=lang==='en'?'Typing is a valuable skill for education and work. A careful typist focuses on accuracy before speed. Practice every day, keep a steady rhythm, and use the correct fingers. Digital communication helps people share ideas across the world.': 'বাংলা আমাদের মাতৃভাষা। শুদ্ধভাবে বাংলা টাইপ করা শিক্ষা ও কর্মক্ষেত্রে একটি প্রয়োজনীয় দক্ষতা। নিয়মিত অনুশীলন করলে নির্ভুলতা ও গতি দুটোই বাড়ে। ধৈর্য ধরে সঠিকভাবে লিখতে হবে।';
let left=300,started=Date.now();$('finalInfo').innerHTML='<h3>'+(lang==='en'?'English':'বাংলা')+' · ৫ মিনিটের পরীক্ষা</h3><p id="examClock">5:00</p><div class="target" id="examTarget"></div><textarea id="examInput" rows="5" placeholder="এখানে পরীক্ষা দিন…" spellcheck="false"></textarea><p id="examMetrics">0 WPM · 100% accuracy</p><button id="examStop">পরীক্ষা শেষ করুন</button>';const inp=$('examInput'),tar=$('examTarget');tar.textContent=passage;inp.focus();let active=0,lastAt=Date.now();function update(){let typed=units(inp.value),goal=units(passage),good=0;typed.forEach((x,i)=>{if(x===goal[i])good++});let mins=Math.max((Date.now()-started)/60000,1/60),acc=typed.length?good/typed.length*100:100,speed=lang==='en'?good/5/mins:good/mins;let wpm=Math.round(speed);$('examMetrics').textContent=wpm+' '+(lang==='en'?'WPM':'CPM')+' · '+Math.round(acc)+'% accuracy · '+typed.length+' typed';return{wpm,acc:Math.round(acc),typed:typed.length,good};}
inp.addEventListener('input',update);function conclude(){clearInterval(examTimer);inp.disabled=true;let r=update(),pass=lang==='en'?r.wpm>=30&&r.acc>=92:r.wpm>=20&&r.acc>=90;$('finalInfo').insertAdjacentHTML('beforeend','<h3>'+(pass?'লক্ষ্যমাত্রা অর্জিত':'লক্ষ্যমাত্রা অর্জিত হয়নি')+'</h3><p>ফলাফল: '+r.wpm+' '+(lang==='en'?'WPM':'গ্রাফিম/মিনিট')+' · '+r.acc+'% accuracy</p><button id="certificate">Certificate / Print</button>');$('certificate').onclick=()=>{let w=window.open('','_blank');if(!w)return alert('Popup blocked. Allow popups to print.');w.document.write('<!doctype html><html><meta charset="utf-8"><title>My Typing Certificate</title><style>body{font-family:Arial,sans-serif;text-align:center;padding:60px;border:12px double #276b61;margin:25px}h1{font-size:38px;color:#276b61}.score{font-size:22px;margin:30px}</style><h1>Certificate of Achievement</h1><p>This certifies that</p><h2>'+esc(prompt('শিক্ষার্থীর নাম লিখুন','Student'))+'</h2><p>completed the My Typing '+(lang==='en'?'English':'Bangla')+' final typing test.</p><div class="score">'+r.wpm+' '+(lang==='en'?'WPM':'গ্রাফিম/মিনিট')+' · '+r.acc+'% accuracy</div><p>Date: '+new Date().toLocaleDateString()+'</p><p>My Typing LMS</p><script>window.print()<\/script></html>');w.document.close()};}
$('examStop').onclick=conclude;examTimer=setInterval(()=>{left--;let el=$('examClock');if(el)el.textContent=fmt(left);if(left<=0)conclude()},1000);
}
$('finalBtn').onclick=beginExam;render()})();