(()=>{'use strict';const $=id=>document.getElementById(id),K='myTypingLMS_v1';const base={settings:{learn:15,game:15,voiceOn:true,user:'Borhan Uddin Mohim',pass:'Borhan Uddin Mohim'},progress:{en:{},bn:{}},best:{en:0,bn:0},theme:'dark',curriculum:null};function normalizeState(raw){raw=raw&&typeof raw==='object'?raw:{};const out={...base,...raw};out.settings={...base.settings,...(raw.settings&&typeof raw.settings==='object'?raw.settings:{})};out.settings.learn=Math.max(1,Math.min(60,Number(out.settings.learn)||15));out.settings.game=Math.max(1,Math.min(60,Number(out.settings.game)||15));out.settings.voiceOn=raw.settings?.voiceOn!==false;out.progress={en:raw.progress?.en&&typeof raw.progress.en==='object'?raw.progress.en:{},bn:raw.progress?.bn&&typeof raw.progress.bn==='object'?raw.progress.bn:{}};out.best={en:Number(raw.best?.en)||0,bn:Number(raw.best?.bn)||0};out.theme=raw.theme==='light'?'light':'dark';out.profile={name:String(raw.profile?.name||''),photo:typeof raw.profile?.photo==='string'?raw.profile.photo:''};if(raw.curriculum!==null&&raw.curriculum!==undefined){const c=raw.curriculum;out.curriculum=c&&Array.isArray(c.en)&&c.en.length===30&&Array.isArray(c.bn)&&c.bn.length===30&&['en','bn'].every(t=>c[t].every(d=>d&&typeof d.title==='string'&&typeof d.learn==='string'&&typeof d.game==='string'))?c:null;}return out}let S;try{S=normalizeState(JSON.parse(localStorage.getItem(K)||'{}'))}catch{S=normalizeState({})}let run=null,tick=null,last=0,game='race',score=0;
let voiceLastError=0,voiceLastPraise=0;
function speak(text){
 if(!S.settings.voiceOn||!('speechSynthesis'in window)||typeof SpeechSynthesisUtterance==='undefined')return;
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='bn-BD';u.rate=0.94;u.pitch=1.04;const voices=speechSynthesis.getVoices();u.voice=voices.find(v=>/^bn-BD$/i.test(v.lang))||voices.find(v=>/^bn(-|_)/i.test(v.lang))||null;speechSynthesis.speak(u);}catch(e){console.warn('বাংলা ভয়েস চালু করা যায়নি',e)}
}
function voiceStatus(){const b=$('voiceToggle');if(b)b.textContent=S.settings.voiceOn?'🔊 ভয়েস চালু':'🔇 ভয়েস বন্ধ';}
function guide(text){$('message').textContent=text;speak(text)}
function save(){localStorage.setItem(K,JSON.stringify(S));render()}function days(t){
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
}function cur(){return S.curriculum||{en:days('en'),bn:days('bn')}}function count(t){return Object.values(S.progress[t]).filter(p=>p.learn&&p.game).length}function render(){let a=count('en'),b=count('bn'),n=a+b;$('days').textContent=n+' / 60';$('percent').textContent=Math.round(n/60*100)+'%';$('totalBar').style.width=n/60*100+'%';$('enBar').style.width=a/30*100+'%';$('bnBar').style.width=b/30*100+'%';$('enBest').textContent=S.best.en||0;$('bnBest').textContent=S.best.bn||0;$('bangla').disabled=a<30;$('bangla').textContent=a<30?'লকড':'শুরু করুন';$('final').classList.toggle('hide',!(a===30&&b===30));let h='';for(let t of ['en','bn'])for(let i=1;i<=30;i++){let p=S.progress[t][i];h+='<div class="chip '+(p?.learn&&p?.game?'done':'')+'">'+t.toUpperCase()+' '+i+' · '+(p?.learn&&p?.game?'✓':'বাকি')+'</div>'}$('records').innerHTML=h;document.body.classList.toggle('light',S.theme==='light');$('profileName').value=S.profile.name;$('profileAvatar').src=S.profile.photo;$('profileAvatar').hidden=!S.profile.photo;$('profileAvatarFallback').hidden=!!S.profile.photo;$('profileOpen').textContent=S.profile.name?'👤 '+S.profile.name.split(/\s+/)[0]:'👤 প্রোফাইল'}function first(t){for(let i=1;i<=30;i++)if(!S.progress[t][i]?.learn||!S.progress[t][i]?.game)return i;return 30}function open(t,d=first(t),phase){
 if(t==='bn'&&count('en')<30&&!window.adminPreview)return alert('প্রথমে English track-এর ৩০ দিন শেষ করুন।');
 const day=cur()[t][d-1],p=S.progress[t][d]||{},ph=phase||(!p.learn?'learn':'game');
 const source=day[ph]||day.learn;game=p.gameStage||'race';
 const pool=source.split(/(?<=[.!?।;])\s+/).filter(Boolean);
 const words=source.split(/\s+/).filter(Boolean);
 run={t,d,ph,source,pendingVowel:'',pool:pool.length?pool:[source],words:words.length?words:[source],goalWords:Math.max(1,words.length),completedWords:0,promptWords:0,round:0,txt:source,remaining:(ph==='learn'?S.settings.learn:S.settings.game)*60,initial:(ph==='learn'?S.settings.learn:S.settings.game)*60,typed:0,correct:0,errors:0,totalTyped:0,totalCorrect:0,totalErrors:0,active:0,activeMs:0,started:false,manualPaused:false,done:false,lastInputAt:0,lastTickAt:0,lastNudgeAt:0,score:0,rounds:0,stamp:Date.now(),pendingG:false,gameStage:p.gameStage||'race'};
 choosePrompt();
 $('lesson').classList.remove('hide');
 $('trackName').textContent=t==='en'?'ENGLISH QWERTY':'বাংলা UniBijoy Unicode';
 $('lessonTitle').textContent='Day '+d+' · '+day.title;
 $('phase').textContent=ph==='learn'?'শেখার ধাপ':'খেলার ধাপ';
 $('typing').value='';$('typing')._resetBijoy?.();$('typing').disabled=false;
 guide('আপনার '+(t==='en'?'ইংরেজি':'বাংলা')+' পাঠ শুরু হচ্ছে। প্রথমে পর্দায় দেখানো অক্ষর বা শব্দটি মনোযোগ দিয়ে পড়ুন। প্রস্তুত হলে শুরু বোতাম চাপুন। তারপর নিচের ঘরে টাইপ করুন।');
 $('games').classList.add('hide');$('keyboard').classList.toggle('hide',ph!=='learn');
 $('gameInfo').textContent=ph==='game'?'প্রথমে গাড়ির রেস, তারপর বানরের গাছে ওঠা, সবশেষে বেলুন ফাটানো—তিনটি গেমই সম্পন্ন করতে হবে।':'';if(ph==='game')speak('গেমের ধাপ শুরু। প্রথমে গাড়ির রেস খেলুন। এরপর বানর এবং শেষে বেলুনের খেলা স্বয়ংক্রিয়ভাবে আসবে।');
 $('next').disabled=true;$('next').textContent='পরের ধাপ';
 target();renderKeyboard();
 $('clock').textContent='0:00';const kc=$('keyboard').querySelector('.keyboard-clock');if(kc)kc.textContent='সময় 0:00';
 $('phaseBar').style.width='0%';
 $('lesson').scrollIntoView({behavior:'smooth'});
}
function choosePrompt(){
 if(!run)return;
 if(run.ph==='learn'){
  run.txt=run.pool[run.round%run.pool.length];
 }else{
  run.txt=run.words[run.round%run.words.length];
 }
}
function renderKeyboard(){
 const enRows=[['1','2','3','4','5','6','7','8','9','0'],['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L',';'],['Z','X','C','V','B','N','M',',','.','/']];
 const bnMap={Q:['ঙ','ং'],W:['য','য়'],E:['ড','ঢ'],R:['প','ফ'],T:['ট','ঠ'],Y:['চ','ছ'],U:['জ','ঝ'],I:['হ','ঞ'],O:['গ','ঘ'],P:['ড়','ঢ়'],A:['ৃ','র্'],S:['ু','ূ'],D:['ি','ী'],F:['া','অ'],G:['্','।'],H:['ব','ভ'],J:['ক','খ'],K:['ত','থ'],L:['দ','ধ'],Z:['্র','্য'],X:['ও','ৗ'],C:['ে','ৈ'],V:['র','ল'],B:['ন','ণ'],N:['স','ষ'],M:['ম','শ']};
 $('keyboard').innerHTML='<div class="keyboard-guide"><span>👆 আঙুলের অবস্থান অনুসরণ করুন</span><strong class="keyboard-clock">সময় 0:00</strong></div>'+enRows.map((row,ri)=>'<div class="key-row">'+row.map(k=>'<span class="key" data-key="'+k+'" data-output="'+(bnMap[k]||[]).join('')+'"><b>'+k+'</b>'+(run.t==='bn'?'<small>'+(bnMap[k]||['','']).join(' / ')+'</small>':'')+'</span>').join('')+'</div>').join('')+'<div class="key-row"><span class="key wide-key" data-key="SPACE" data-output=" ">SPACE / স্পেস</span></div><div class="hands-stage" aria-label="দুই হাতের আঙুলের নির্দেশনা"><div class="hand-unit left-hand"><div class="hand-label">বাম হাত</div><div class="palm"><i class="finger f-pinky" data-finger="LP"></i><i class="finger f-ring" data-finger="LR"></i><i class="finger f-middle" data-finger="LM"></i><i class="finger f-index" data-finger="LI"></i><i class="finger f-thumb" data-finger="LT"></i></div></div><div class="hand-unit right-hand"><div class="hand-label">ডান হাত</div><div class="palm"><i class="finger f-index" data-finger="RI"></i><i class="finger f-middle" data-finger="RM"></i><i class="finger f-ring" data-finger="RR"></i><i class="finger f-pinky" data-finger="RP"></i><i class="finger f-thumb" data-finger="RT"></i></div></div><div class="finger-label" class="finger-label">পরবর্তী অক্ষরের জন্য সঠিক আঙুল দেখানো হবে</div></div>';
 highlightKey();
}
function fingerForKey(key){
 const map={Q:'LP',A:'LP',Z:'LP',1:'LP',W:'LR',S:'LR',X:'LR',2:'LR',E:'LM',D:'LM',C:'LM',3:'LM',R:'LI',F:'LI',V:'LI',T:'LI',G:'LI',B:'LI',4:'LI',5:'LI',Y:'RI',H:'RI',N:'RI',U:'RI',J:'RI',M:'RI',6:'RI',7:'RI',I:'RM',K:'RM',',':'RM',8:'RM',O:'RR',L:'RR','.':'RR',9:'RR',P:'RP',';':'RP','/':'RP',0:'RP',SPACE:'LT'};
 return map[key]||'RI';
}
function highlightKey(){
 const keys=[...($('keyboard').querySelectorAll?.('.key')||[])];keys.forEach(k=>k.classList.remove('key-active'));
 const fingers=[...($('keyboard').querySelectorAll?.('[data-finger]')||[])];fingers.forEach(f=>f.classList.remove('finger-active'));
 if(!run||run.ph!=='learn')return;
 const expected=units(run.txt)[units($('typing').value||'').length];if(!expected)return;
 let hit;
 if(run.t==='en')hit=keys.find(k=>k.dataset.key===expected.toUpperCase()||k.dataset.key===expected);
 else hit=keys.find(k=>(k.dataset.output||'').includes(expected));
 if(hit){
  hit.classList.add('key-active');
  const finger=fingerForKey(hit.dataset.key),active=$('keyboard').querySelector('[data-finger="'+finger+'"]');
  if(active)active.classList.add('finger-active');
  const label=$('keyboard').querySelector('.finger-label');
  if(label)label.textContent=({LP:'বাম হাতের কনিষ্ঠা',LR:'বাম হাতের অনামিকা',LM:'বাম হাতের মধ্যমা',LI:'বাম হাতের তর্জনী',LT:'বাম হাতের বুড়ো আঙুল',RI:'ডান হাতের তর্জনী',RM:'ডান হাতের মধ্যমা',RR:'ডান হাতের অনামিকা',RP:'ডান হাতের কনিষ্ঠা',RT:'ডান হাতের বুড়ো আঙুল'})[finger]+' দিয়ে '+expected+' চাপুন';
 }
}
function units(value){if(typeof Intl!=='undefined'&&Intl.Segmenter)return [...new Intl.Segmenter('bn',{granularity:'grapheme'}).segment(value)].map(x=>x.segment);const out=[];for(const ch of Array.from(value)){if(!out.length){out.push(ch);continue;}const last=out.length-1;if(/\p{M}/u.test(ch)||ch==='\u200c'||ch==='\u200d'||/্[‌‍]?$/.test(out[last]))out[last]+=ch;else out.push(ch);}return out}
function fmt(n){return Math.floor(n/60)+':'+String(n%60).padStart(2,'0')}function target(){
 if(!run)return;
 let v=units($('typing').value||''),txt=units(run.txt),kind=run.ph==='game'?game:'practice';
 const name=kind==='race'?'TURBO CAR RACE':kind==='monkey'?'MONKEY TREE CLIMB':kind==='balloon'?'BALLOON POP':'PRACTICE';
 run.promptWords=run.txt.trim().split(/\s+/).filter(Boolean).length;
 const climb=Math.min(15,run.completedWords);
 const tree=kind==='monkey'?'<div class="monkey-tree" aria-label="বানরের গাছে ওঠার অগ্রগতি"><div class="tree-trunk"></div>'+Array.from({length:15},(_,i)=>'<div class="tree-branch branch-'+i+' '+(i<climb?'branch-done':'')+'"></div>').join('')+'<span class="tree-monkey" style="bottom:'+(12+climb*4.2)+'%;">🐒</span><span class="tree-top">🏁</span></div><small class="climb-count">ডাল: '+climb+' / ১৫</small>':'';
 const progress=Math.min(1,(run.completedWords+(v.length/Math.max(1,txt.length)))/run.goalWords);
 const race=kind==='race'?'<div class="race-track"><span class="race-opponent opponent-one">🚙</span><span class="race-opponent opponent-two">🏎️</span><span class="race-opponent opponent-three">🚕</span><span class="race-car" style="left:calc(4% + '+(progress*82)+'%);--car-speed:'+Math.max(.18,1.15-progress*.9)+'s;">🚗</span><span class="race-finish">🏁</span></div><small class="climb-count">আপনার গাড়ির গতি: '+Math.round(100+progress*180)+'% · রেস অগ্রগতি: '+Math.round(progress*100)+'%</small>':'';
 const balloon=kind==='balloon'?'<div class="balloon-field"><span class="balloon" aria-label="শব্দ টাইপ করলে বেলুন ফাটবে">🎈</span><span class="balloon-word">'+run.txt.split(/\s+/).map(esc).join(' ')+'</span></div><small class="climb-count">শব্দটি সম্পূর্ণ সঠিকভাবে টাইপ করলে বেলুন ফেটে যাবে</small>':'';
 const glyph=kind==='monkey'?'🐒':'';
 $('target').innerHTML='<small>লক্ষ্য: '+run.completedWords+' / '+run.goalWords+' শব্দ · '+name+' · Round '+(run.round+1)+'</small>'+(tree?tree:'')+(race?race:'')+(balloon?balloon:'')+'<div class="game-stage '+kind+'">'+(glyph?'<span class="game-glyph">'+glyph+'</span>':'')+'<div class="game-word">'+txt.map((ch,i)=>'<span class="'+(i<v.length?(v[i]===ch?'ok':'err'):(i===v.length?'nextchar':''))+'">'+esc(ch)+'</span>').join('')+'</div></div>';highlightKey();
}function esc(c){return c.replace(/[&<>]/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[x]))}function metrics(){
 let m=Math.max(1/60,run.activeMs/60000),typed=run.totalTyped+run.typed,correct=run.totalCorrect+run.correct,errors=run.totalErrors+run.errors,acc=typed?Math.round(correct/typed*100):100,speed=run.t==='en'?Math.round(correct/5/m):Math.round(correct/m),unit=run.t==='en'?'WPM':'CPM';
 $('metrics').textContent=speed+' '+unit+' · '+acc+'% accuracy · '+errors+' errors';
 return{wpm:speed,acc,unit,typed,correct,errors};
}
function start(){
 if(!run||run.done)return;
 if(run.started)return;
 run.manualPaused=false;run.started=true;run.lastTickAt=Date.now();
 clearInterval(tick);
 tick=setInterval(()=>{
  if(!run?.started||run.done)return;
  const now=Date.now(),dt=Math.max(0,Math.min(1000,now-run.lastTickAt));
  run.lastTickAt=now;
  if(run.lastInputAt&&now-run.lastInputAt>=30000&&(!run.lastNudgeAt||now-run.lastNudgeAt>=90000)){
   run.lastNudgeAt=now;
   speak('অনুশীলন চালিয়ে যেতে প্রস্তুত হলে আবার টাইপ শুরু করুন। তাড়াহুড়ো করবেন না, ধীরে ও নির্ভুলভাবে টাইপ করুন।');
  }
  if(run.lastInputAt&&now-run.lastInputAt<=4000){
   run.activeMs+=dt;run.active=run.activeMs/1000;
   $('clock').textContent=fmt(Math.floor(run.activeMs/1000));const kc=$('keyboard').querySelector('.keyboard-clock');if(kc)kc.textContent='সময় '+fmt(Math.floor(run.activeMs/1000));
  }
 },250);
}
function pause(){if(run){run.started=false;run.manualPaused=true;guide('অনুশীলন সাময়িকভাবে থামানো হয়েছে। আবার শুরু করতে শুরু অথবা পুনরায় চালু বোতাম চাপুন।')}}let phaseAdvanceTimer=null;function finish(){if(!run||run.done)return;run.done=true;run.started=false;clearInterval(tick);clearTimeout(phaseAdvanceTimer);let m=metrics(),p=S.progress[run.t][run.d]||{};p[run.ph+'Stats']=m;S.best[run.t]=Math.max(S.best[run.t]||0,m.wpm);$('phaseBar').style.width='100%';if(run.ph==='game'&&game!=='balloon'){game=game==='race'?'monkey':'balloon';run.gameStage=game;run.done=false;run.started=false;run.round=0;run.score=0;run.completedWords=0;run.goalWords=15;run.gameStage=game;run.words=Array.from({length:15},(_,i)=>run.source.split(/\\s+/).filter(Boolean)[i%Math.max(1,run.source.split(/\\s+/).filter(Boolean).length)]||'type');run.totalTyped=run.totalCorrect=run.totalErrors=0;run.typed=run.correct=run.errors=0;run.activeMs=0;run.lastInputAt=0;run.manualPaused=false;p.gameStage=game;p.game=false;S.progress[run.t][run.d]=p;$('typing').disabled=false;$('typing').value='';$('phaseBar').style.width='0%';$('next').disabled=true;$('next').textContent='তিনটি গেম শেষ হলে পরের দিন';$('gameInfo').textContent=(game==='monkey'?'🐒 গাড়ির রেস শেষ! এবার বানরের গাছে ওঠার খেলা শুরু।':'🎈 বানরের খেলা শেষ! এবার বেলুন ফাটানোর খেলা শুরু।')+' আরও ১৫টি শব্দ টাইপ করুন।';choosePrompt();target();guide(game==='monkey'?'দারুণ! গাড়ির রেস শেষ। এবার বানরকে গাছের চূড়ায় তুলুন।':'চমৎকার! বানর গাছে উঠেছে। এবার আকাশ থেকে নামা বেলুনের শব্দ টাইপ করে বেলুন ফাটান।');save();$('typing').focus();return;}p[run.ph]=true;p[run.ph+'Stats']=m;if(run.ph==='game')p.gameStage='complete';S.progress[run.t][run.d]=p;guide(run.ph==='learn'?'অভিনন্দন! শেখার বিষয়টি শেষ হয়েছে। এখন গেমে যাওয়ার জন্য নিচের বোতাম চাপুন অথবা Enter চাপুন। কয়েক সেকেন্ডের মধ্যে গেম নিজে থেকেই শুরু হবে।':'অভিনন্দন! তিনটি গেমই সম্পন্ন হয়েছে। পরবর্তী দিনে যেতে নিচের বোতাম চাপুন অথবা Enter চাপুন।');$('next').disabled=false;$('next').textContent=run.ph==='learn'?'🎮 গেম শুরু করুন · Enter':'পরের দিন · Enter';save();if(run.ph==='learn')phaseAdvanceTimer=setTimeout(()=>{if(run&&run.done&&run.ph==='learn')next()},3500)}function next(){if(!run)return;let {t,d,ph}=run;speak(ph==='learn'?'খুব ভালো। এবার খেলার ধাপে এগিয়ে যাই।':'চমৎকার! এবার পরবর্তী পাঠ শুরু করা যাক।');if(ph==='learn')open(t,d,'game');else if(d<30)open(t,d+1);else{$('lesson').classList.add('hide');alert(t==='en'?'English সম্পন্ন। বাংলা track unlock হয়েছে।':'দুই track সম্পন্ন। Grand Final প্রস্তুত।');render()}}function play(){
 if(!run)return;
 const bonus=Math.max(5,Math.round(metrics().wpm/2));
 run.score+=bonus;run.rounds++;
 const label=game==='race'?'🚗 গাড়ির গতি বেড়েছে':game==='monkey'?'🐒 বানর একটি ডালে উঠেছে':'🎈 বেলুন ফেটে গেছে';
 if(game==='balloon')$('target').querySelector('.balloon')?.classList.add('popped');
 $('gameInfo').textContent=label+' · '+Math.min(15,run.completedWords+run.promptWords)+' / ১৫ শব্দ · Score '+run.score;
}
function completePrompt(){
 if(run.ph==='game')speak(game==='balloon'?'দারুণ! সঠিক শব্দ টাইপ করে বেলুনটি ফাটিয়েছেন।':'চমৎকার! আপনি এই রাউন্ডটি সম্পন্ন করেছেন।');else speak('খুব ভালো! এই অনুশীলনটি সঠিকভাবে সম্পন্ন করেছেন।');
 run.totalTyped+=run.typed;run.totalCorrect+=run.correct;run.totalErrors+=run.errors;
 run.completedWords=Math.min(run.goalWords,run.completedWords+run.promptWords);
 $('phaseBar').style.width=(run.completedWords/run.goalWords*100)+'%';
 $('target').querySelector('small').textContent='লক্ষ্য: '+run.completedWords+' / '+run.goalWords+' শব্দ';
 if(run.completedWords>=run.goalWords){finish();$('typing').disabled=true;return;}
 run.round++;choosePrompt();$('typing').value='';run.typed=0;run.correct=0;run.errors=0;target();metrics();
}
const bijoy={
 KeyQ:['ঙ','ং'],KeyW:['য','য়'],KeyE:['ড','ঢ'],KeyR:['প','ফ'],KeyT:['ট','ঠ'],KeyY:['চ','ছ'],KeyU:['জ','ঝ'],KeyI:['হ','ঞ'],KeyO:['গ','ঘ'],KeyP:['ড়','ঢ়'],
 KeyA:['ৃ','র্'],KeyS:['ু','ূ'],KeyD:['ি','ী'],KeyF:['া','অ'],KeyG:['্','।'],KeyH:['ব','ভ'],KeyJ:['ক','খ'],KeyK:['ত','থ'],KeyL:['দ','ধ'],
 KeyZ:['্র','্য'],KeyX:['ও','ৗ'],KeyC:['ে','ৈ'],KeyV:['র','ল'],KeyB:['ন','ণ'],KeyN:['স','ষ'],KeyM:['ম','শ'],
 Backslash:['ৎ','ঃ'],Digit0:['০',')'],Digit1:['১','!'],Digit2:['২','ঁ'],Digit3:['৩','#'],Digit4:['৪','৳'],Digit5:['৫','%'],Digit6:['৬','ঃ'],Digit7:['৭','ৎ'],Digit8:['৮','*'],Digit9:['৯','(']
};
const independent={KeyA:'ঋ',KeyS:'উ',KeyD:'ই',KeyF:'আ',KeyC:'এ'};
const prebaseSigns={KeyD:['ি','ী'],KeyC:['ে','ৈ']};
function bindBijoy(el,enabled){
 let pendingG=false,pendingVowel='';
 el.addEventListener('keydown',e=>{
  if(!enabled()||e.ctrlKey||e.metaKey||e.altKey)return;
  if(e.code==='Backspace'){if(pendingG||pendingVowel){e.preventDefault();pendingG=false;pendingVowel='';}return;}
  if(e.code==='KeyG'&&!e.shiftKey){e.preventDefault();pendingG=true;return;}
  if(e.code==='Space'){if(pendingG)pendingG=false;if(pendingVowel){insertBangla(el,pendingVowel);pendingVowel='';}return;}
  const pair=bijoy[e.code];
  if(!pair){if(pendingG){e.preventDefault();pendingG=false;insertBangla(el,'্'+e.key);}return;}
  e.preventDefault();let out=pair[e.shiftKey?1:0];
  if(pendingG){
   const independentVowel=(!e.shiftKey&&independent[e.code])||(e.shiftKey&&e.code==='KeyA'?'র্':e.shiftKey&&e.code==='KeyD'?'ঈ':e.shiftKey&&e.code==='KeyS'?'ঊ':e.shiftKey&&e.code==='KeyF'?'অ':e.shiftKey&&e.code==='KeyC'?'ঐ':e.shiftKey&&e.code==='KeyX'?'ঔ':null);
   out=independentVowel||('্'+out);pendingG=false;
  }else if(prebaseSigns[e.code]){pendingVowel=prebaseSigns[e.code][e.shiftKey?1:0];return;}
  else if(pendingVowel){out+=pendingVowel;pendingVowel='';}
  insertBangla(el,out);
 });
 el._resetBijoy=()=>{pendingG=false;pendingVowel='';};
}
function insertBangla(el,value){
 const a=el.selectionStart,b=el.selectionEnd;
 el.setRangeText(value,a,b,'end');el.dispatchEvent(new Event('input',{bubbles:true}));
}
bindBijoy($('typing'),()=>run?.t==='bn');
$('typing').addEventListener('input',()=>{
 if(!run||run.done)return;
 const now=Date.now();run.lastInputAt=now;if(!run.started&&!run.manualPaused)start();
 const v=$('typing').value,arr=units(v),tar=units(run.txt);
 const oldErrors=run.errors;run.typed=arr.length;run.correct=0;run.errors=0;
 arr.forEach((c,i)=>c===tar[i]?run.correct++:run.errors++);if(run.errors>oldErrors&&now-voiceLastError>5000){voiceLastError=now;speak('শেষ অক্ষরটি মেলেনি। সমস্যা নেই—পর্দায় দেখানো পরের অক্ষরটি দেখে ধীরে আবার চেষ্টা করুন।')}if(run.correct>0&&run.correct%12===0&&run.correct!==voiceLastPraise&&now-voiceLastError>2500){voiceLastPraise=run.correct;speak('খুব ভালো! এভাবেই মনোযোগ ধরে রাখুন।')}
 target();metrics();
 if(arr.length>=tar.length){
  if(arr.join('')===tar.join('')){
   if(run.ph==='game')play();
   completePrompt();
  }
 }
});$('english').onclick=()=>open('en');$('bangla').onclick=()=>open('bn');$('start').onclick=()=>{if(run){start();$('message').textContent='সময় শুধু অনুশীলনের সময় হিসেবে গণনা হবে; লক্ষ্য পূরণ না হওয়া পর্যন্ত পাঠ চলবে।'}};$('pause').onclick=pause;$('next').onclick=next;$('typing').addEventListener('keydown',e=>{if(e.key==='Enter'&&run?.done&&!$('next').disabled){e.preventDefault();clearTimeout(phaseAdvanceTimer);next()}});$('close').onclick=()=>{$('lesson').classList.add('hide');pause();clearInterval(tick)};document.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>{
 game=b.dataset.game;if(run&&run.ph==='game'){
  run.round=0;run.score=0;run.completedWords=0;run.goalWords=15;
  const sourceWords=run.source.split(/\\s+/).filter(Boolean);
  run.words=Array.from({length:15},(_,i)=>sourceWords[i%Math.max(1,sourceWords.length)]||'type');
  choosePrompt();$('typing').value='';run.typed=run.correct=run.errors=0;target();
  $('phaseBar').style.width='0%';
  $('gameInfo').textContent=(game==='race'?'🚗 কার রেস':game==='monkey'?'🐒 বানরের গাছে ওঠা':game==='rain'?'☄ শব্দবৃষ্টি':'🫧 বুদবুদ খেলা')+' শুরু! ১৫টি শব্দ সঠিকভাবে টাইপ করুন।';
  speak(game==='monkey'?'প্রতিটি শব্দ ঠিকভাবে টাইপ করলে বানর একটি করে ডালে উঠবে। পনেরোটি শব্দ শেষে সে গাছের চূড়ায় পৌঁছাবে।':game==='race'?'প্রতিটি অক্ষর ও শব্দ টাইপের সঙ্গে গাড়ির গতি বাড়বে। পনেরোটি শব্দ টাইপ করে রেস শেষ করুন।':'উপর থেকে নামা বেলুনে থাকা শব্দটি সঠিকভাবে টাইপ করলে বেলুনটি ফেটে যাবে। এভাবে পনেরোটি বেলুন ফাটান।');
 }
});$('theme').onclick=()=>{S.theme=S.theme==='dark'?'light':'dark';save()};$('backup').onclick=()=>download('my-typing-backup.json',JSON.stringify(S,null,2));$('restoreBackup').onclick=()=>$('backupFile').click();$('backupFile').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const data=JSON.parse(await file.text());if(!data||!data.settings||!data.progress||!data.progress.en||!data.progress.bn)throw Error('Backup file format ভুল');if(!confirm('বর্তমান progress ও settings backup দিয়ে প্রতিস্থাপন করবেন?'))return;S=normalizeState(data);save();alert('Backup restore হয়েছে।')}catch(err){alert('Restore হয়নি: '+err.message)}finally{e.target.value=''}};function download(n,c){let a=document.createElement('a'),u=URL.createObjectURL(new Blob([c],{type:'application/json'}));a.href=u;a.download=n;a.click();URL.revokeObjectURL(u)}$('profileOpen').onclick=()=>{$('profileName').value=S.profile.name;$('profileDialog').showModal()};$('profileClose').onclick=()=>$('profileDialog').close();$('profileSave').onclick=()=>{S.profile.name=$('profileName').value.trim();save();$('profileDialog').close()};$('profilePhoto').onchange=e=>{const f=e.target.files&&e.target.files[0];if(!f)return;if(!f.type.startsWith('image/')){alert('একটি ছবি নির্বাচন করুন');return}const reader=new FileReader();reader.onload=()=>{const img=new Image();img.onload=()=>{const canvas=document.createElement('canvas');canvas.width=200;canvas.height=200;const ctx=canvas.getContext('2d'),scale=Math.max(200/img.width,200/img.height),w=img.width*scale,h=img.height*scale;ctx.drawImage(img,(200-w)/2,(200-h)/2,w,h);S.profile.photo=canvas.toDataURL('image/jpeg',.7);save()};img.src=reader.result};reader.readAsDataURL(f);e.target.value=''};$('adminOpen').onclick=()=>$('admin').showModal();$('loginBtn').onclick=()=>{const enteredUser=$('user').value.trim().toLocaleLowerCase();const savedUser=String(S.settings.user||'').trim().toLocaleLowerCase();const enteredPass=$('pass').value;if(enteredUser===savedUser&&enteredPass===String(S.settings.pass||'')){$('login').classList.add('hide');$('tools').classList.remove('hide')}else alert('Username/password ভুল। Username-এর আগে-পরে অতিরিক্ত space আছে কি না দেখুন; Password হুবহু লিখুন।')};$('preview').onclick=()=>{window.adminPreview=true;try{open($('admTrack').value,Math.max(1,Math.min(30,+$('admDay').value)),$('admPhase').value)}finally{window.adminPreview=false}};$('unlock').onclick=()=>{const t=$('admTrack').value,d=Math.max(1,Math.min(30,+$('admDay').value||1));S.progress[t][d]={...(S.progress[t][d]||{}),learn:true,game:true,adminUnlocked:true};save();alert('নির্বাচিত দিনটি Admin override দিয়ে সম্পন্ন হিসেবে চিহ্নিত হয়েছে।')};$('fast').onclick=()=>{if(run){run.completedWords=run.goalWords;finish()}};$('simulate').onclick=()=>{for(let t of ['en','bn'])for(let d=1;d<=30;d++)S.progress[t][d]={learn:true,game:true,simulated:true};save();alert('Progress simulation complete; Grand Final unlocked.')};$('reset').onclick=()=>{if(confirm('সব progress মুছবেন?')){S.progress={en:{},bn:{}};S.best={en:0,bn:0};save()}};$('settings').onclick=()=>{S.settings.learn=Math.max(1,Math.min(60,+$('learnMin').value||15));S.settings.game=Math.max(1,Math.min(60,+$('gameMin').value||15));S.settings.user=$('newUser').value||S.settings.user;S.settings.pass=$('newPass').value||S.settings.pass;save();alert('Settings saved')};$('exportCurr').onclick=()=>download('my-typing-curriculum.json',JSON.stringify(cur(),null,2));$('importCurr').onclick=()=>{try{let c=JSON.parse($('curriculumJSON').value);if(!Array.isArray(c.en)||c.en.length!==30||!Array.isArray(c.bn)||c.bn.length!==30||!['en','bn'].every(t=>c[t].every(d=>d&&typeof d.title==='string'&&typeof d.learn==='string'&&typeof d.game==='string'&&d.learn.trim()&&d.game.trim())))throw Error('English ও Bangla-তে title, learn, game-সহ ৩০টি বৈধ দিন প্রয়োজন');S.curriculum=c;save();alert('Curriculum imported')}catch(e){alert(e.message)}};$('resetCurr').onclick=()=>{S.curriculum=null;save()};let examTimer=null;function beginExam(){
clearInterval(examTimer);
const t=prompt('পরীক্ষার ভাষা লিখুন: en অথবা bn','en');if(!['en','bn'].includes((t||'').toLowerCase()))return;const lang=t.toLowerCase(),passage=lang==='en'?'Typing is a valuable skill for education and work. A careful typist focuses on accuracy before speed. Practice every day, keep a steady rhythm, and use the correct fingers. Digital communication helps people share ideas across the world.': 'বাংলা আমাদের মাতৃভাষা। শুদ্ধভাবে বাংলা টাইপ করা শিক্ষা ও কর্মক্ষেত্রে একটি প্রয়োজনীয় দক্ষতা। নিয়মিত অনুশীলন করলে নির্ভুলতা ও গতি দুটোই বাড়ে। ধৈর্য ধরে সঠিকভাবে লিখতে হবে।';
let left=300,started=Date.now();$('finalInfo').innerHTML='<h3>'+(lang==='en'?'English':'বাংলা')+' · ৫ মিনিটের পরীক্ষা</h3><p id="examClock">5:00</p><div class="target" id="examTarget"></div><textarea id="examInput" rows="5" placeholder="এখানে পরীক্ষা দিন…" spellcheck="false"></textarea><p id="examMetrics">0 WPM · 100% accuracy</p><button id="examStop">পরীক্ষা শেষ করুন</button>';const inp=$('examInput'),tar=$('examTarget');tar.textContent=passage;bindBijoy(inp,()=>lang==='bn');inp.focus();let active=0,lastAt=Date.now();function update(){let typed=units(inp.value),goal=units(passage),good=0;typed.forEach((x,i)=>{if(x===goal[i])good++});let mins=Math.max((Date.now()-started)/60000,1/60),acc=typed.length?good/typed.length*100:100,speed=lang==='en'?good/5/mins:good/mins;let wpm=Math.round(speed);$('examMetrics').textContent=wpm+' '+(lang==='en'?'WPM':'CPM')+' · '+Math.round(acc)+'% accuracy · '+typed.length+' typed';return{wpm,acc:Math.round(acc),typed:typed.length,good};}
inp.addEventListener('input',update);speak(lang==='en'?'এবার ইংরেজি চূড়ান্ত পরীক্ষা। পাঁচ মিনিট সময় পাবেন। যতটা সম্ভব নির্ভুলভাবে টাইপ করুন।':'এবার বাংলা চূড়ান্ত পরীক্ষা। পাঁচ মিনিট সময় পাবেন। যতটা সম্ভব নির্ভুলভাবে টাইপ করুন।');function conclude(){clearInterval(examTimer);examTimer=null;inp.disabled=true;let r=update(),pass=lang==='en'?r.wpm>=30&&r.acc>=92:r.wpm>=20&&r.acc>=90;$('finalInfo').insertAdjacentHTML('beforeend','<h3>'+(pass?'লক্ষ্যমাত্রা অর্জিত':'লক্ষ্যমাত্রা অর্জিত হয়নি')+'</h3><p>ফলাফল: '+r.wpm+' '+(lang==='en'?'WPM':'CPM')+' · '+r.acc+'% accuracy</p>'+(pass?'<button id="certificate">Certificate / Print</button>':'<p>সার্টিফিকেট পেতে নির্ধারিত গতি ও নির্ভুলতা অর্জন করতে হবে। আবার পরীক্ষা দিন।</p>'));speak(pass?'অভিনন্দন! আপনি চূড়ান্ত পরীক্ষায় উত্তীর্ণ হয়েছেন। সার্টিফিকেট প্রিন্ট করতে বোতাম চাপুন।':'চেষ্টা চালিয়ে যান। এবার লক্ষ্য পূরণ হয়নি, তবে অনুশীলন করলে অবশ্যই উন্নতি হবে। আবার পরীক্ষা দিতে পারবেন।');if(pass)$('certificate').onclick=()=>{let w=window.open('','_blank');if(!w)return alert('Popup blocked. Allow popups to print.');const student=prompt('শিক্ষার্থীর নাম লিখুন','Student')||'Student';w.document.write('<!doctype html><html><meta charset="utf-8"><title>My Typing Certificate</title><style>body{font-family:Arial,sans-serif;text-align:center;padding:60px;border:12px double #276b61;margin:25px}h1{font-size:38px;color:#276b61}.score{font-size:22px;margin:30px}</style><h1>Certificate of Achievement</h1><p>This certifies that</p><h2>'+esc(student)+'</h2><p>completed the My Typing '+(lang==='en'?'English':'Bangla')+' final typing test.</p><div class="score">'+r.wpm+' '+(lang==='en'?'WPM':'CPM')+' · '+r.acc+'% accuracy</div><p>Date: '+new Date().toLocaleDateString()+'</p><p>My Typing LMS</p><script>window.print()<\/script></html>');w.document.close()};}
$('examStop').onclick=conclude;examTimer=setInterval(()=>{left--;let el=$('examClock');if(el)el.textContent=fmt(left);if(left<=0)conclude()},1000);
}
$('finalBtn').onclick=beginExam;$('voiceToggle').onclick=()=>{S.settings.voiceOn=!S.settings.voiceOn;save();voiceStatus();if(S.settings.voiceOn)speak('বাংলা নির্দেশনা চালু হয়েছে। এখন থেকে আমি আপনাকে ধাপে ধাপে গাইড করব।');else if('speechSynthesis'in window)speechSynthesis.cancel()};render();voiceStatus()})();