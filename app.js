(()=>{'use strict';const $=id=>document.getElementById(id),K='myTypingLMS_v1';const base={settings:{learn:15,game:15,voiceOn:true,user:'Borhan Uddin Mohim',pass:'Borhan Uddin Mohim'},progress:{en:{},bn:{}},best:{en:0,bn:0},theme:'dark',curriculum:null};function normalizeState(raw){raw=raw&&typeof raw==='object'?raw:{};const out={...base,...raw};out.settings={...base.settings,...(raw.settings&&typeof raw.settings==='object'?raw.settings:{})};out.settings.learn=Math.max(1,Math.min(60,Number(out.settings.learn)||15));out.settings.game=Math.max(1,Math.min(60,Number(out.settings.game)||15));out.settings.voiceOn=raw.settings?.voiceOn!==false;out.progress={en:raw.progress?.en&&typeof raw.progress.en==='object'?raw.progress.en:{},bn:raw.progress?.bn&&typeof raw.progress.bn==='object'?raw.progress.bn:{}};out.best={en:Number(raw.best?.en)||0,bn:Number(raw.best?.bn)||0};out.theme=raw.theme==='light'?'light':'dark';out.profile={name:String(raw.profile?.name||''),photo:typeof raw.profile?.photo==='string'?raw.profile.photo:''};if(raw.curriculum!==null&&raw.curriculum!==undefined){const c=raw.curriculum;out.curriculum=c&&Array.isArray(c.en)&&c.en.length===35&&Array.isArray(c.bn)&&c.bn.length===35&&['en','bn'].every(t=>c[t].every(d=>d&&typeof d.title==='string'&&typeof d.learn==='string'&&typeof d.game==='string'))?c:null;}return out}let S;try{S=normalizeState(JSON.parse(localStorage.getItem(K)||'{}'))}catch{S=normalizeState({})}let run=null,tick=null,last=0,game='race',score=0;
let voiceLastError=0,voiceLastPraise=0;
function speak(text){
 if(!S.settings.voiceOn||!('speechSynthesis'in window)||typeof SpeechSynthesisUtterance==='undefined')return;
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='bn-BD';u.rate=0.94;u.pitch=1.04;const voices=speechSynthesis.getVoices();u.voice=voices.find(v=>/^bn-BD$/i.test(v.lang))||voices.find(v=>/^bn(-|_)/i.test(v.lang))||null;speechSynthesis.speak(u);}catch(e){console.warn('বাংলা ভয়েস চালু করা যায়নি',e)}
}
function voiceStatus(){const b=$('voiceToggle');if(b)b.textContent=S.settings.voiceOn?'🔊 ভয়েস চালু':'🔇 ভয়েস বন্ধ';}
function guide(text){$('message').textContent=text;speak(text)}
function save(){localStorage.setItem(K,JSON.stringify(S));render()}function days(t){
const en=[
["Home row keys A S D F J K L ;","asdf jkl; asdf jkl;","a s d f j k l ;","asdf fdsa jkl; ;lkj","sad; lad; ask; all;"],
["Home row finger practice","fff jjj ddd kkk sss lll aaa ;;;","a s d f   j k l ;","fff ddd sss aaa jjj kkk lll ;;;","dad; sad; lad; fall;"],
["Home row combinations","asdf; jkl; fjdk; sl;a;","ask; dad; fall; lass;","flask; salad; glass;","a lad asks dad."],
["Home row short words","sad; dad; lad; all;","ask; add; alas; shall;","flask; salad; glad;","a sad lad asks dad."],
["Home row word families","ass; lass; fall; hall;","dash; flash; slash;","half; glad; flag;","a glass falls."],
["Home row common words","has; had; all; as;","ask; shall; salad;","fall; half; glad;","dad has a salad."],
["Home row longer words","flash; slash; flask;","jag; gala; dash;","salsa; shall;","a flag has a dash."],
["Home row sentence practice","a lad has a flag.","dad asks; all fall.","a glass salad;","a sad lad shall ask."],
["Home row accuracy drill","asdf jkl; sad flask","ask dad; all fall;","a lad adds a salad.","hold the home row."],
["Home row review test","asdf jkl; fjdk sl;a","sad dad; lass; flask;","all lads ask dad.","a fast hand has a plan."],
["Bottom row keys Z X C V B N M","z x c v b n m","zxcv bnm; mnbv cxz","z x c v b n m","mix; box; van; cab;"],
["Bottom row finger practice","zzz xxx ccc vvv bbb nnn mmm","z x c v b n m","zzz xxx ccc vvv bbb nnn mmm","zoom; cave; move;"],
["Bottom row combinations","zxc; cvb; bnm; mnv;","mix; box; vex; cab;","van; can; man;","a man can mix."],
["Bottom row short words","box; fox; mix; six;","van; cab; web; men;","can; ban; max;","a fox can run."],
["Bottom row common words","name; move; come;","moon; zoom; cave;","beam; oven;","we can move a box."],
["Bottom row word families","vex; zen; mix; max;","cabin; banana;","comic; cinema;","a nice man can come."],
["Bottom row longer words","maximum; minimum;","vacuum; combine;","machine; become;","mix and move the box."],
["Bottom row sentence practice","we can move a big box.","a man can mix and move.","come and have a nice meal.","the van came by."],
["Bottom row accuracy drill","zxcv bnm; mix box move","zebra; cabin; maximum;","use each bottom-row finger.","move; name; become;"],
["Bottom row review test","z x c v b n m","mix; move; box; van;","a man can move a box.","bottom row, steady hands."],
["Top row keys Q W E R T Y U I O P","q w e r t y u i o p","qwer tyui op","qwerty uiop","type; write; your; power;"],
["Top row finger practice","qqq www eee rrr ttt yyy uuu iii ooo ppp","q w e r t y u i o p","qqq www eee rrr ttt yyy uuu iii ooo ppp","quiet; tower;"],
["Top row combinations","qwe; ert; tyu; uio; op;","type; write; power;","query; poet; wire;","we type quite well."],
["Top row short words","top; row; put; out;","try; you; our; power;","write; quite; quiet;","you write it."],
["Top row common words","were; tree; true;","your; quite; quiet;","upper; tower;","we write your name."],
["Top row word families","type; typer; typed;","write; writer; wrote;","power; tower; query;","the writer is quiet."],
["Top row longer words","property; poetry;","priority; equipment;","prototype; require;","write your own query."],
["Top row sentence practice","we write a quiet poem.","the tower is quite high.","you type with your power.","try to write it well."],
["Top row accuracy drill","qwerty uiop type write","quiet power; query;","the top row needs practice.","keep your fingers ready."],
["Top row review test","q w e r t y u i o p","type; write; quiet; power;","we type quite well.","review every top-row key."],
["All keyboard rows review","qwerty asdf zxcv","uiop jkl; bnm","mix all letter rows together.","the quick brown fox."],
["All letters and words","the quick brown fox","jumps over the lazy dog.","pack my box with five dozen liquor jugs.","every letter matters."],
["All keys with capitals","My Name Is Alex.","Today We Practice Typing.","English Skills Grow With Practice.","Keep Your Hands On Home Row."],
["All keys numbers and symbols","12345 67890","2026 123 456 789","Room 204, Level 3.","Score = 95% + 5 points."],
["Full keyboard final practice","Email: learner@example.com","Price: $25.50 (tax included).","Digital skills grow with daily practice.","Accuracy first, speed follows."]
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
["চূড়ান্ত পুনরালোচনা","বাংলা ভাষা আমাদের পরিচয় ও গৌরব।","প্রতিদিন অনুশীলন করলে দক্ষতা বাড়ে।","নির্ভুলতা আগে, গতি পরে।"],
["পূর্ণ কিবোর্ড অনুশীলন","সব বর্ণ, কার, ফলা ও যুক্তবর্ণ একসাথে লিখি।","বাংলা শব্দ ও বাক্য বারবার টাইপ করি।","নির্ভুলতার দিকে মনোযোগ দিই।"],
["সংখ্যা ও চিহ্ন পর্যালোচনা","০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯","তারিখ: ২৫/১১/২০২৬। মূল্য: ২৫০ টাকা।","কমা, দাঁড়ি, প্রশ্নবোধক ও বিস্ময়চিহ্ন লিখি।"],
["দীর্ঘ অনুচ্ছেদ অনুশীলন","কম্পিউটার আমাদের শিক্ষা, যোগাযোগ ও দৈনন্দিন কাজকে সহজ করেছে।","নিয়মিত বাংলা টাইপিং অনুশীলন করলে দক্ষতা ও আত্মবিশ্বাস বাড়ে।","ধীরে, শুদ্ধভাবে এবং বিরতি না দিয়ে টাইপ করি।"],
["বাংলা টাইপিং গতি পরীক্ষা","সময় ধরে পরিচিত শব্দ ও বাক্য টাইপ করি।","ভুলগুলো শনাক্ত করে আবার অনুশীলন করি।","নির্ভুলতা বজায় রেখে গতি বাড়াই।"],
["চূড়ান্ত বাংলা কিবোর্ড পরীক্ষা","বাংলা ভাষা আমাদের পরিচয় ও গৌরব।","প্রতিদিন অনুশীলন করলে দক্ষতা বাড়ে।","নির্ভুলতা আগে, গতি পরে।"]
];
const ordered=t==='en'?[...en.slice(0,10),...en.slice(20,30),...en.slice(10,20),...en.slice(30,35)]:bn;return ordered.map((row,i)=>({title:'Day '+(i+1)+' · '+row[0],learn:row.slice(1).join(' '),game:row.slice(1).join(' ')}));
}function cur(){return S.curriculum||{en:days('en'),bn:days('bn')}}function count(t){return Object.values(S.progress[t]).filter(p=>p.learn&&p.game).length}function render(){renderGameLibrary();renderLevelGrids();let a=count('en'),b=count('bn'),n=a+b;$('days').textContent=n+' / 70';$('percent').textContent=Math.round(n/70*100)+'%';$('totalBar').style.width=n/70*100+'%';$('enBar').style.width=a/35*100+'%';$('bnBar').style.width=b/35*100+'%';$('enBest').textContent=S.best.en||0;$('bnBest').textContent=S.best.bn||0;$('bangla').disabled=false;$('bangla').textContent='শুরু করুন';$('final').classList.toggle('hide',!(a===35&&b===35));let h='';for(let t of ['en','bn'])for(let i=1;i<=35;i++){let p=S.progress[t][i],done=!!(p?.learn&&p?.game),locked=false;h+=done&&!locked?'<button type="button" class="chip done record-open" data-record-track="'+t+'" data-record-day="'+i+'" title="Day '+i+' আবার খুলুন">'+t.toUpperCase()+' '+i+' · ✓ সম্পন্ন · খুলুন</button>':'<div class="chip '+(done?'done':'')+'">'+t.toUpperCase()+' '+i+' · '+(done?'✓ সম্পন্ন':'বাকি')+'</div>'}$('records').innerHTML=h;document.body.classList.toggle('light',S.theme==='light');$('profileName').value=S.profile.name;$('profileAvatar').src=S.profile.photo;$('profileAvatar').hidden=!S.profile.photo;$('profileAvatarFallback').hidden=!!S.profile.photo;$('profileOpen').textContent=S.profile.name?'👤 '+S.profile.name.split(/\s+/)[0]:'👤 প্রোফাইল'}function renderLevelGrids(){
 for(const t of ['en','bn']){
  const host=$(t==='en'?'enLevelGrid':'bnLevelGrid');if(!host)continue;
  const current=first(t);
  host.innerHTML=Array.from({length:35},(_,i)=>{
   const d=i+1,p=S.progress[t][d]||{},done=!!(p.learn&&p.game),unlocked=d===1||!!(S.progress[t][d-1]?.learn&&S.progress[t][d-1]?.game);
   const status=done?'✓ সম্পন্ন':unlocked?'শুরু করুন':'🔒 লক';
   return '<button type="button" class="typing-level-button '+(done?'level-done':'')+'" data-level-track="'+t+'" data-level-day="'+d+'" '+(!unlocked?'disabled':'')+'><strong>Level '+d+'</strong><small>'+status+'</small></button>';
  }).join('');
 }
}
function renderGameLibrary(){
 const host=$('gameLibrary');if(!host)return;
 let out='';
 for(const t of ['en','bn']){
  const unlocked=Array.from({length:35},(_,i)=>i+1).filter(d=>S.progress[t][d]?.learn);
  out+='<div class="game-library-track"><h3>'+(t==='en'?'🇬🇧 English':'🇧🇩 বাংলা')+'</h3>';
  if(!unlocked.length)out+='<p class="muted">এখনো কোনো দিনের গেম আনলক হয়নি। আগে সেই দিনের শেখার ধাপ শেষ করুন।</p>';
  out+='<div class="game-day-grid">'+unlocked.map(d=>'<button type="button" class="game-day '+(S.progress[t][d]?.game?'game-day-done':'')+'" data-library-track="'+t+'" data-library-day="'+d+'">Day '+d+'<small>'+(S.progress[t][d]?.game?'✓ সম্পন্ন · আবার খেলুন':'▶ গেম খেলুন')+'</small></button>').join('')+'</div></div>';
 }
 host.innerHTML=out;
}
function first(t){const total=35;for(let i=1;i<=total;i++)if(!S.progress[t][i]?.learn||!S.progress[t][i]?.game)return i;return total}function open(t,d=first(t),phase){
 if(d>1&&!(S.progress[t][d-1]?.learn&&S.progress[t][d-1]?.game)&&!window.adminPreview)return alert('আগের লেভেলের শেখা ও গেম সম্পন্ন করলে এই লেভেল খুলবে।');
 const day=cur()[t][d-1],p=S.progress[t][d]||{},ph=phase||(!p.learn?'learn':'game');
 if(ph==='game'&&!p.learn&&!window.adminPreview)return alert('এই দিনের গেম এখনো লক আছে। আগে শেখার ধাপ সম্পন্ন করুন।');
 const source=day[ph]||day.learn;game=p.gameStage&&p.gameStage!=='complete'?p.gameStage:'race';
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
function pause(){if(run){run.started=false;run.manualPaused=true;guide('অনুশীলন সাময়িকভাবে থামানো হয়েছে। আবার শুরু করতে শুরু অথবা পুনরায় চালু বোতাম চাপুন।')}}let phaseAdvanceTimer=null;function finish(){if(!run||run.done)return;run.done=true;run.started=false;clearInterval(tick);clearTimeout(phaseAdvanceTimer);let m=metrics(),p=S.progress[run.t][run.d]||{};p[run.ph+'Stats']=m;S.best[run.t]=Math.max(S.best[run.t]||0,m.wpm);$('phaseBar').style.width='100%';if(run.ph==='game'&&game!=='balloon'){game=game==='race'?'monkey':'balloon';run.gameStage=game;run.done=false;run.started=false;run.round=0;run.score=0;run.completedWords=0;run.goalWords=15;run.gameStage=game;run.words=Array.from({length:15},(_,i)=>run.source.split(/\\s+/).filter(Boolean)[i%Math.max(1,run.source.split(/\\s+/).filter(Boolean).length)]||'type');run.totalTyped=run.totalCorrect=run.totalErrors=0;run.typed=run.correct=run.errors=0;run.activeMs=0;run.lastInputAt=0;run.manualPaused=false;p.gameStage=game;p.game=p.game===true;S.progress[run.t][run.d]=p;$('typing').disabled=false;$('typing').value='';$('phaseBar').style.width='0%';$('next').disabled=true;$('next').textContent='তিনটি গেম শেষ হলে পরের দিন';$('gameInfo').textContent=(game==='monkey'?'🐒 গাড়ির রেস শেষ! এবার বানরের গাছে ওঠার খেলা শুরু।':'🎈 বানরের খেলা শেষ! এবার বেলুন ফাটানোর খেলা শুরু।')+' আরও ১৫টি শব্দ টাইপ করুন।';choosePrompt();target();guide(game==='monkey'?'দারুণ! গাড়ির রেস শেষ। এবার বানরকে গাছের চূড়ায় তুলুন।':'চমৎকার! বানর গাছে উঠেছে। এবার আকাশ থেকে নামা বেলুনের শব্দ টাইপ করে বেলুন ফাটান।');save();$('typing').focus();return;}p[run.ph]=true;p[run.ph+'Stats']=m;if(run.ph==='game')p.gameStage='complete';S.progress[run.t][run.d]=p;guide(run.ph==='learn'?'অভিনন্দন! শেখার বিষয়টি শেষ হয়েছে। এখন গেমে যাওয়ার জন্য নিচের বোতাম চাপুন অথবা Enter চাপুন। কয়েক সেকেন্ডের মধ্যে গেম নিজে থেকেই শুরু হবে।':'অভিনন্দন! তিনটি গেমই সম্পন্ন হয়েছে। পরবর্তী দিনে যেতে নিচের বোতাম চাপুন অথবা Enter চাপুন।');$('next').disabled=false;$('next').textContent=run.ph==='learn'?'🎮 গেম শুরু করুন · Enter':'পরের দিন · Enter';save();if(run.ph==='learn')phaseAdvanceTimer=setTimeout(()=>{if(run&&run.done&&run.ph==='learn')next()},3500)}function next(){if(!run)return;let {t,d,ph}=run;speak(ph==='learn'?'খুব ভালো। এবার খেলার ধাপে এগিয়ে যাই।':'চমৎকার! এবার পরবর্তী পাঠ শুরু করা যাক।');if(ph==='learn')open(t,d,'game');else if(d<35)open(t,d+1);else{$('lesson').classList.add('hide');alert(t==='en'?'English-এর ৩৫টি লেভেল সম্পন্ন হয়েছে। বাংলা কোর্স আলাদাভাবে চালিয়ে যেতে পারবেন।':'বাংলা কোর্সের ৩৫টি লেভেল সম্পন্ন হয়েছে।');render()}}function play(){
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
 if(run.completedWords>=run.goalWords){finish();if(run.done)$('typing').disabled=true;return;}
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
});$('english').onclick=()=>open('en');$('bangla').onclick=()=>open('bn');document.querySelectorAll('.typing-level-grid').forEach(grid=>grid.addEventListener('click',e=>{const b=e.target.closest('[data-level-track]');if(!b||b.disabled)return;open(b.dataset.levelTrack,Number(b.dataset.levelDay),'learn')}));$('records').addEventListener('click',e=>{const b=e.target.closest('[data-record-track]');if(!b)return;open(b.dataset.recordTrack,Number(b.dataset.recordDay),'learn')});$('gameLibrary').addEventListener('click',e=>{const b=e.target.closest('[data-library-track]');if(!b)return;open(b.dataset.libraryTrack,Number(b.dataset.libraryDay),'game')});$('start').onclick=()=>{if(run){start();$('message').textContent='সময় শুধু অনুশীলনের সময় হিসেবে গণনা হবে; লক্ষ্য পূরণ না হওয়া পর্যন্ত পাঠ চলবে।'}};$('pause').onclick=pause;$('next').onclick=next;$('typing').addEventListener('keydown',e=>{if(e.key==='Enter'&&run?.done&&!$('next').disabled){e.preventDefault();clearTimeout(phaseAdvanceTimer);next()}});$('close').onclick=()=>{$('lesson').classList.add('hide');pause();clearInterval(tick)};document.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>{
 game=b.dataset.game;if(run&&run.ph==='game'){
  run.round=0;run.score=0;run.completedWords=0;run.goalWords=15;
  const sourceWords=run.source.split(/\\s+/).filter(Boolean);
  run.words=Array.from({length:15},(_,i)=>sourceWords[i%Math.max(1,sourceWords.length)]||'type');
  choosePrompt();$('typing').value='';run.typed=run.correct=run.errors=0;target();
  $('phaseBar').style.width='0%';
  $('gameInfo').textContent=(game==='race'?'🚗 কার রেস':game==='monkey'?'🐒 বানরের গাছে ওঠা':game==='rain'?'☄ শব্দবৃষ্টি':'🫧 বুদবুদ খেলা')+' শুরু! ১৫টি শব্দ সঠিকভাবে টাইপ করুন।';
  speak(game==='monkey'?'প্রতিটি শব্দ ঠিকভাবে টাইপ করলে বানর একটি করে ডালে উঠবে। পনেরোটি শব্দ শেষে সে গাছের চূড়ায় পৌঁছাবে।':game==='race'?'প্রতিটি অক্ষর ও শব্দ টাইপের সঙ্গে গাড়ির গতি বাড়বে। পনেরোটি শব্দ টাইপ করে রেস শেষ করুন।':'উপর থেকে নামা বেলুনে থাকা শব্দটি সঠিকভাবে টাইপ করলে বেলুনটি ফেটে যাবে। এভাবে পনেরোটি বেলুন ফাটান।');
 }
});$('theme').onclick=()=>{S.theme=S.theme==='dark'?'light':'dark';save()};function download(n,c){let a=document.createElement('a'),u=URL.createObjectURL(new Blob([c],{type:'application/json'}));a.href=u;a.download=n;a.click();URL.revokeObjectURL(u)}$('profileOpen').onclick=()=>{$('profileName').value=S.profile.name;$('profileDialog').showModal()};$('profileClose').onclick=()=>$('profileDialog').close();$('profileSave').onclick=()=>{S.profile.name=$('profileName').value.trim();save();$('profileDialog').close()};$('profilePhoto').onchange=e=>{const f=e.target.files&&e.target.files[0];if(!f)return;if(!f.type.startsWith('image/')){alert('একটি ছবি নির্বাচন করুন');return}const reader=new FileReader();reader.onload=()=>{const img=new Image();img.onload=()=>{const canvas=document.createElement('canvas');canvas.width=200;canvas.height=200;const ctx=canvas.getContext('2d'),scale=Math.max(200/img.width,200/img.height),w=img.width*scale,h=img.height*scale;ctx.drawImage(img,(200-w)/2,(200-h)/2,w,h);S.profile.photo=canvas.toDataURL('image/jpeg',.7);save()};img.src=reader.result};reader.readAsDataURL(f);e.target.value=''};$('adminOpen').onclick=()=>$('admin').showModal();$('loginBtn').onclick=()=>{const enteredUser=$('user').value.trim().toLocaleLowerCase();const savedUser=String(S.settings.user||'').trim().toLocaleLowerCase();const enteredPass=$('pass').value;if(enteredUser===savedUser&&enteredPass===String(S.settings.pass||'')){$('login').classList.add('hide');$('tools').classList.remove('hide')}else alert('Username/password ভুল। Username-এর আগে-পরে অতিরিক্ত space আছে কি না দেখুন; Password হুবহু লিখুন।')};$('preview').onclick=()=>{window.adminPreview=true;try{open($('admTrack').value,Math.max(1,Math.min(35,+$('admDay').value)),$('admPhase').value)}finally{window.adminPreview=false}};$('unlock').onclick=()=>{const t=$('admTrack').value,d=Math.max(1,Math.min(35,+$('admDay').value||1));S.progress[t][d]={...(S.progress[t][d]||{}),learn:true,game:true,adminUnlocked:true};save();alert('নির্বাচিত দিনটি Admin override দিয়ে সম্পন্ন হিসেবে চিহ্নিত হয়েছে।')};$('fast').onclick=()=>{if(run){run.completedWords=run.goalWords;finish()}};$('simulate').onclick=()=>{for(let t of ['en','bn'])for(let d=1;d<=35;d++)S.progress[t][d]={learn:true,game:true,simulated:true};save();alert('Progress simulation complete; Grand Final unlocked.')};$('reset').onclick=()=>{if(confirm('সব progress মুছবেন?')){S.progress={en:{},bn:{}};S.best={en:0,bn:0};save()}};$('settings').onclick=()=>{S.settings.learn=Math.max(1,Math.min(60,+$('learnMin').value||15));S.settings.game=Math.max(1,Math.min(60,+$('gameMin').value||15));S.settings.user=$('newUser').value||S.settings.user;S.settings.pass=$('newPass').value||S.settings.pass;save();alert('Settings saved')};$('exportCurr').onclick=()=>download('my-typing-curriculum.json',JSON.stringify(cur(),null,2));$('importCurr').onclick=()=>{try{let c=JSON.parse($('curriculumJSON').value);if(!Array.isArray(c.en)||c.en.length!==35||!Array.isArray(c.bn)||c.bn.length!==35||!['en','bn'].every(t=>c[t].every(d=>d&&typeof d.title==='string'&&typeof d.learn==='string'&&typeof d.game==='string'&&d.learn.trim()&&d.game.trim())))throw Error('English ও Bangla-তে title, learn, game-সহ ৩৫টি বৈধ দিন প্রয়োজন');S.curriculum=c;save();alert('Curriculum imported')}catch(e){alert(e.message)}};$('resetCurr').onclick=()=>{S.curriculum=null;save()};let examTimer=null;function beginExam(){
clearInterval(examTimer);
const t=prompt('পরীক্ষার ভাষা লিখুন: en অথবা bn','en');if(!['en','bn'].includes((t||'').toLowerCase()))return;const lang=t.toLowerCase(),passage=lang==='en'?'Typing is a valuable skill for education and work. A careful typist focuses on accuracy before speed. Practice every day, keep a steady rhythm, and use the correct fingers. Digital communication helps people share ideas across the world.': 'বাংলা আমাদের মাতৃভাষা। শুদ্ধভাবে বাংলা টাইপ করা শিক্ষা ও কর্মক্ষেত্রে একটি প্রয়োজনীয় দক্ষতা। নিয়মিত অনুশীলন করলে নির্ভুলতা ও গতি দুটোই বাড়ে। ধৈর্য ধরে সঠিকভাবে লিখতে হবে।';
let left=300,started=Date.now();$('finalInfo').innerHTML='<h3>'+(lang==='en'?'English':'বাংলা')+' · ৫ মিনিটের পরীক্ষা</h3><p id="examClock">5:00</p><div class="target" id="examTarget"></div><textarea id="examInput" rows="5" placeholder="এখানে পরীক্ষা দিন…" spellcheck="false"></textarea><p id="examMetrics">0 WPM · 100% accuracy</p><button id="examStop">পরীক্ষা শেষ করুন</button>';const inp=$('examInput'),tar=$('examTarget');tar.textContent=passage;bindBijoy(inp,()=>lang==='bn');inp.focus();let active=0,lastAt=Date.now();function update(){let typed=units(inp.value),goal=units(passage),good=0;typed.forEach((x,i)=>{if(x===goal[i])good++});let mins=Math.max((Date.now()-started)/60000,1/60),acc=typed.length?good/typed.length*100:100,speed=lang==='en'?good/5/mins:good/mins;let wpm=Math.round(speed);$('examMetrics').textContent=wpm+' '+(lang==='en'?'WPM':'CPM')+' · '+Math.round(acc)+'% accuracy · '+typed.length+' typed';return{wpm,acc:Math.round(acc),typed:typed.length,good};}
inp.addEventListener('input',update);speak(lang==='en'?'এবার ইংরেজি চূড়ান্ত পরীক্ষা। পাঁচ মিনিট সময় পাবেন। যতটা সম্ভব নির্ভুলভাবে টাইপ করুন।':'এবার বাংলা চূড়ান্ত পরীক্ষা। পাঁচ মিনিট সময় পাবেন। যতটা সম্ভব নির্ভুলভাবে টাইপ করুন।');function conclude(){clearInterval(examTimer);examTimer=null;inp.disabled=true;let r=update(),pass=lang==='en'?r.wpm>=30&&r.acc>=92:r.wpm>=20&&r.acc>=90;$('finalInfo').insertAdjacentHTML('beforeend','<h3>'+(pass?'লক্ষ্যমাত্রা অর্জিত':'লক্ষ্যমাত্রা অর্জিত হয়নি')+'</h3><p>ফলাফল: '+r.wpm+' '+(lang==='en'?'WPM':'CPM')+' · '+r.acc+'% accuracy</p>'+(pass?'<button id="certificate">Certificate / Print</button>':'<p>সার্টিফিকেট পেতে নির্ধারিত গতি ও নির্ভুলতা অর্জন করতে হবে। আবার পরীক্ষা দিন।</p>'));speak(pass?'অভিনন্দন! আপনি চূড়ান্ত পরীক্ষায় উত্তীর্ণ হয়েছেন। সার্টিফিকেট প্রিন্ট করতে বোতাম চাপুন।':'চেষ্টা চালিয়ে যান। এবার লক্ষ্য পূরণ হয়নি, তবে অনুশীলন করলে অবশ্যই উন্নতি হবে। আবার পরীক্ষা দিতে পারবেন।');if(pass)$('certificate').onclick=()=>{let w=window.open('','_blank');if(!w)return alert('Popup blocked. Allow popups to print.');const student=prompt('শিক্ষার্থীর নাম লিখুন','Student')||'Student';w.document.write('<!doctype html><html><meta charset="utf-8"><title>MS Office Management Course Certificate</title><style>body{font-family:Arial,sans-serif;text-align:center;padding:60px;border:12px double #276b61;margin:25px}h1{font-size:38px;color:#276b61}.score{font-size:22px;margin:30px}</style><h1>Certificate of Achievement</h1><p>This certifies that</p><h2>'+esc(student)+'</h2><p>completed the MS Office Management Course '+(lang==='en'?'English':'Bangla')+' final typing test.</p><div class="score">'+r.wpm+' '+(lang==='en'?'WPM':'CPM')+' · '+r.acc+'% accuracy</div><p>Date: '+new Date().toLocaleDateString()+'</p><p>MS Office Management Course</p><script>window.print()<\/script></html>');w.document.close()};}
$('examStop').onclick=conclude;examTimer=setInterval(()=>{left--;let el=$('examClock');if(el)el.textContent=fmt(left);if(left<=0)conclude()},1000);
}

const botFaq=[
[['ctrl+c','copy','কপি'],'Copy: Ctrl + C। নির্বাচিত লেখা বা ফাইলের কপি ক্লিপবোর্ডে রাখে।'],
[['ctrl+v','paste','পেস্ট'],'Paste: Ctrl + V। কপি বা কাট করা লেখা/ফাইল বসায়।'],
[['ctrl+x','cut','কাট'],'Cut: Ctrl + X। নির্বাচিত লেখা বা ফাইল কাট করে ক্লিপবোর্ডে রাখে।'],
[['ctrl+z','undo'],'Undo: Ctrl + Z। সর্বশেষ কাজ ফিরিয়ে নেয়।'],
[['ctrl+y','redo'],'Redo: Ctrl + Y। Undo করা কাজ আবার ফিরিয়ে আনে।'],
[['ctrl+s','save','সেভ'],'Save: Ctrl + S। বর্তমান ফাইল সংরক্ষণ করে।'],
[['ctrl+a','select all'],'Select All: Ctrl + A। সক্রিয় ডকুমেন্টের সব কনটেন্ট নির্বাচন করে।'],
[['ctrl+p','print','প্রিন্ট'],'Print: Ctrl + P। প্রিন্ট প্রিভিউ ও সেটিংস খোলে।'],
[['ctrl+b','bold','বোল্ড'],'Bold: Ctrl + B। নির্বাচিত লেখাকে গাঢ় করে।'],
[['ctrl+i','italic'],'Italic: Ctrl + I। নির্বাচিত লেখাকে বাঁকা করে।'],
[['ctrl+u','underline'],'Underline: Ctrl + U। নির্বাচিত লেখার নিচে দাগ দেয়।'],
[['ctrl+f','find','খুঁজে'],'Find: Ctrl + F। লেখা বা ডকুমেন্টে শব্দ খুঁজে বের করে।'],
[['alt+f4'],'Alt + F4 সক্রিয় অ্যাপ বা উইন্ডো বন্ধ করে।'],
[['wpm'],'WPM মানে Words Per Minute—প্রতি মিনিটে টাইপ করা শব্দের গতি।'],
[['cpm'],'CPM মানে Characters Per Minute—প্রতি মিনিটে টাইপ করা অক্ষরের গতি।'],
[['accuracy','নির্ভুলতা'],'Accuracy হলো টাইপ করা লেখার কত শতাংশ সঠিক হয়েছে তার হিসাব।'],
[['home row','asdf'],'English Home Row হলো A S D F এবং J K L ;। বাম হাত ASDF এবং ডান হাত JKL; অবস্থানে রাখুন।'],
[['touch typing','টাচ টাইপিং'],'Touch Typing হলো কিবোর্ডের দিকে না তাকিয়ে নির্দিষ্ট আঙুলের অবস্থান ব্যবহার করে টাইপ করা।'],
[['bijoy','বাংলা টাইপ'],'বাংলা টাইপিংয়ে আপনার ব্যবহৃত Bijoy keyboard layout অনুসরণ করুন। লেআউটভেদে কী-র অবস্থান আলাদা হতে পারে।'],
[['কোর্স','excel','word','powerpoint','photoshop'],'কোর্স পরিকল্পনা: English ও বাংলা Typing, MS Word, MS Excel, MS PowerPoint, Photoshop এবং অন্যান্য প্রয়োজনীয় কম্পিউটার দক্ষতা। বর্তমানে Typing মডিউল চালু; বাকিগুলো পরে যোগ হবে।']
];
function answerBot(q){const t=q.toLowerCase();for(const row of botFaq){if(row[0].some(k=>t.includes(k)))return row[1]}if(/হ্যালো|hello|সালাম/.test(t))return 'স্বাগতম! কিবোর্ড শর্টকাট, টাইপিং বা কোর্সের বিষয় জিজ্ঞেস করুন।';return 'এই প্রশ্নের উত্তর এখনো আমার তথ্যভান্ডারে নেই। নির্দিষ্ট করে লিখুন—যেমন Ctrl+S, WPM, CPM, Home Row বা Bijoy typing।'}
function botMessage(t,who){const d=document.createElement('div');d.className='bot-message '+(who==='user'?'bot-question':'bot-answer');d.textContent=t;$('botMessages').appendChild(d);$('botMessages').scrollTop=$('botMessages').scrollHeight}
function speakBot(text){if(!('speechSynthesis'in window)||typeof SpeechSynthesisUtterance==='undefined'){$('botVoiceStatus').textContent='এই ব্রাউজারে উত্তর শোনানোর সুবিধা নেই।';return}try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='bn-BD';u.rate=.94;const vs=speechSynthesis.getVoices();u.voice=vs.find(v=>/^bn-BD$/i.test(v.lang))||vs.find(v=>/^bn(-|_)/i.test(v.lang))||null;u.onerror=()=>{$('botVoiceStatus').textContent='ভয়েস উত্তর চালানো যায়নি।'};speechSynthesis.speak(u);$('botVoiceStatus').textContent='🔊 উত্তর পড়ে শোনানো হচ্ছে…'}catch(err){$('botVoiceStatus').textContent='ভয়েস উত্তর চালানো যায়নি।'}}
function sendBotQuestion(q,fromVoice){q=(q||'').trim();if(!q)return;botMessage(q,'user');$('botInput').value='';const answer=answerBot(q);botMessage(answer,'bot');if(fromVoice)speakBot(answer);else $('botVoiceStatus').textContent='লিখিত উত্তর দেওয়া হয়েছে। ভয়েসে প্রশ্ন করতে 🎙️ চাপুন।'}
$('botToggle').onclick=()=>{$('botPanel').hidden=!$('botPanel').hidden;$('botToggle').setAttribute('aria-expanded',String(!$('botPanel').hidden));if(!$('botPanel').hidden)$('botInput').focus()};
$('botClose').onclick=()=>{$('botPanel').hidden=true;$('botToggle').setAttribute('aria-expanded','false');if('speechSynthesis'in window)speechSynthesis.cancel()};
$('botForm').onsubmit=e=>{e.preventDefault();sendBotQuestion($('botInput').value,false)};
const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;let botRecognition=null,botListening=false;
if(SpeechRecognition){botRecognition=new SpeechRecognition();botRecognition.lang='bn-BD';botRecognition.continuous=false;botRecognition.interimResults=true;botRecognition.onstart=()=>{botListening=true;$('botMic').textContent='⏹️';$('botVoiceStatus').textContent='🎙️ শুনছি… এখন আপনার প্রশ্ন বলুন।'};botRecognition.onresult=e=>{let finalText='';let interim='';for(let n=e.resultIndex;n<e.results.length;n++){if(e.results[n].isFinal)finalText+=e.results[n][0].transcript;else interim+=e.results[n][0].transcript}if(interim)$('botVoiceStatus').textContent='শুনছি: '+interim;if(finalText){$('botInput').value=finalText;sendBotQuestion(finalText,true)}};botRecognition.onerror=e=>{$('botVoiceStatus').textContent=e.error==='not-allowed'?'মাইক্রোফোন ব্যবহারের অনুমতি দিন।':e.error==='no-speech'?'কোনো কথা শোনা যায়নি। আবার চেষ্টা করুন।':'ভয়েস ইনপুটে সমস্যা হয়েছে। আবার চেষ্টা করুন।'};botRecognition.onend=()=>{botListening=false;$('botMic').textContent='🎙️';if($('botVoiceStatus').textContent==='🎙️ শুনছি… এখন আপনার প্রশ্ন বলুন।')$('botVoiceStatus').textContent='কথা শনাক্ত হয়নি। আবার 🎙️ চাপুন।'}}else{$('botMic').disabled=true;$('botVoiceStatus').textContent='এই ব্রাউজারে ভয়েস প্রশ্ন সমর্থিত নয়। Chrome-এ চেষ্টা করুন।'}
$('botMic').onclick=()=>{if(!botRecognition){$('botVoiceStatus').textContent='ভয়েস ইনপুট সমর্থিত নয়। Chrome ব্রাউজারে চেষ্টা করুন।';return}if(botListening){botRecognition.stop();return}try{if('speechSynthesis'in window)speechSynthesis.cancel();botRecognition.start()}catch(err){$('botVoiceStatus').textContent='মাইক্রোফোন চালু করা যাচ্ছে না। একটু পরে চেষ্টা করুন।'}};

/* MS Word practical learning workspace */
const wordEditor=$('wordEditor');
if(wordEditor){
 const lessonData=[
  ['Word পরিচিতি','Word-এ Ribbon-এর Home, Insert ও Layout ট্যাব থেকে কাজের টুল পাওয়া যায়। মাঝখানের সাদা অংশটি আপনার ডকুমেন্ট।','ডকুমেন্টের অংশগুলো চিনে নিন','Ribbon-এর Home, Insert ও Layout ট্যাব দেখুন।'],
  ['লেখা ও সম্পাদনা','সাদা পাতায় ক্লিক করে লিখুন। লেখা নির্বাচন করে Ctrl+C দিয়ে কপি, Ctrl+V দিয়ে পেস্ট এবং Ctrl+Z দিয়ে আগের কাজ ফিরিয়ে আনতে পারেন।','লেখা টাইপ ও নির্বাচন','ডকুমেন্টে ক্লিক করে নিজের নাম ও ঠিকানা লিখুন।'],
  ['Font ও Paragraph','লেখা নির্বাচন করে B, I, U, Font Size এবং রঙ ব্যবহার করুন। Paragraph অংশ থেকে বাম, মাঝখান বা ডানদিকে লেখা সাজান।','লেখার ধরন বদলান','একটি শিরোনাম লিখে Bold ও Center করুন।'],
  ['Insert Table','Insert ট্যাবে গিয়ে Row ও Column-এর সংখ্যা লিখুন, তারপর Insert Table চাপুন। ডকুমেন্টে সম্পাদনাযোগ্য টেবিল তৈরি হবে।','টেবিল তৈরি হচ্ছে','৩টি Row ও ৩টি Column দিয়ে একটি টেবিল তৈরি করুন।'],
  ['Row / Column পরিচালনা','টেবিলের যে ঘরে কাজ করবেন সেখানে ক্লিক করুন। এরপর Row Above/Below বা Column Left/Right চাপুন। নির্বাচিত ঘরের অবস্থান অনুযায়ী নতুন সারি বা কলাম যোগ হবে।','সারি ও কলাম যোগ','টেবিলের একটি ঘরে ক্লিক করে একটি Row এবং একটি Column যোগ করুন।'],
  ['Page Layout','Layout ট্যাব থেকে Portrait বা Landscape বেছে নিন। A4 বা Letter কাগজ নির্বাচন করে Apply Layout চাপুন।','পাতার দিক পরিবর্তন','একবার Landscape করে আবার Portrait করুন।'],
  ['Save ও Print প্রস্তুতি','এই অনুশীলন ব্রাউজারে স্বয়ংক্রিয়ভাবে সংরক্ষিত হয়। Download চাপলে HTML ডকুমেন্ট পাওয়া যাবে, যা ব্রাউজারে খুলে প্রিন্ট করা যায়।','ডকুমেন্ট সংরক্ষণ','Download চাপুন এবং ফাইলটি খুলে দেখুন।'],
  ['বাস্তব কাজ','এবার একটি ক্লাস রুটিন তৈরি করুন: শিরোনাম লিখুন, ৫টি কলাম ও কয়েকটি সারি যোগ করুন, তারপর বিষয় ও সময় লিখুন।','ক্লাস রুটিন তৈরি','একটি ছোট ক্লাস রুটিন তৈরি করে ডাউনলোড করুন।']
 ];
 let currentLesson=0,selectedCell=null;
 const getCell=()=>{const sel=window.getSelection();let node=sel&&sel.anchorNode;let el=node&&(node.nodeType===1?node:node.parentElement);return el&&el.closest?el.closest('#wordEditor td, #wordEditor th'):null};
 const focusEditor=()=>{wordEditor.focus();if(selectedCell)selectedCell.focus()};
 const saveWord=()=>{try{localStorage.setItem('msWordPracticeDoc',wordEditor.innerHTML);$('wordSaveStatus').textContent='✓ এই ডিভাইসে সংরক্ষিত';}catch(e){$('wordSaveStatus').textContent='সংরক্ষণ করা যায়নি';}const txt=wordEditor.innerText.trim();$('wordWordCount').textContent='শব্দ: '+(txt?txt.split(/\s+/).length:0)};
 try{const saved=localStorage.getItem('msWordPracticeDoc');if(saved)wordEditor.innerHTML=saved}catch(e){}
 wordEditor.addEventListener('input',saveWord);wordEditor.addEventListener('click',()=>{selectedCell=getCell()});
 const setTab=name=>{document.querySelectorAll('[data-word-tab]').forEach(b=>b.classList.toggle('active',b.dataset.wordTab===name));document.querySelectorAll('[data-word-panel]').forEach(p=>p.hidden=p.dataset.wordPanel!==name)};
 document.querySelectorAll('[data-word-tab]').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.wordTab)));
 document.querySelectorAll('[data-cmd]').forEach(b=>b.addEventListener('click',()=>{focusEditor();document.execCommand(b.dataset.cmd,false,null);saveWord()}));
 $('wordFont').onchange=e=>{focusEditor();document.execCommand('fontName',false,e.target.value);saveWord()};
 $('wordSize').onchange=e=>{focusEditor();const map={'11':'2','12':'2','14':'3','16':'4','18':'4','20':'5','24':'5','28':'6','36':'7'};document.execCommand('fontSize',false,map[e.target.value]||'3');saveWord()};
 $('wordColor').oninput=e=>{focusEditor();document.execCommand('foreColor',false,e.target.value);saveWord()};
 const makeTable=(rows,cols)=>{let out='<table class="practice-table"><tbody>';for(let r=0;r<rows;r++){out+='<tr>';for(let c=0;c<cols;c++)out+='<td contenteditable="true">এখানে লিখুন</td>';out+='</tr>'}return out+'</tbody></table><p><br></p>'};
 const insertHTML=markup=>{focusEditor();document.execCommand('insertHTML',false,markup);selectedCell=getCell();saveWord()};
 $('wordInsertTable').onclick=()=>{const r=Math.max(1,Math.min(20,Number($('wordRows').value)||3)),c=Math.max(1,Math.min(12,Number($('wordCols').value)||3));insertHTML(makeTable(r,c));$('wordSaveStatus').textContent=r+' Row × '+c+' Column টেবিল যোগ হয়েছে।'};
 const cellInfo=()=>{const cell=getCell()||selectedCell;if(!cell||!wordEditor.contains(cell)){alert('প্রথমে টেবিলের যে ঘরে কাজ করবেন সেখানে ক্লিক করুন।');return null}selectedCell=cell;return {cell,row:cell.parentElement,table:cell.closest('table')}};
 const addRow=where=>{const x=cellInfo();if(!x)return;const row=x.row.cloneNode(true);row.querySelectorAll('td,th').forEach(td=>td.textContent='এখানে লিখুন');if(where==='above')x.row.parentElement.insertBefore(row,x.row);else x.row.parentElement.insertBefore(row,x.row.nextSibling);selectedCell=row.cells[Math.min(x.cell.cellIndex,row.cells.length-1)];saveWord()};
 const addCol=where=>{const x=cellInfo();if(!x)return;const index=x.cell.cellIndex+(where==='right'?1:0);Array.from(x.table.rows).forEach(row=>{const td=document.createElement(row.cells[0]?.tagName==='TH'?'th':'td');td.textContent='এখানে লিখুন';row.insertBefore(td,row.cells[index]||null)});selectedCell=x.table.rows[x.cell.parentElement.rowIndex].cells[index];saveWord()};
 $('wordRowAbove').onclick=()=>addRow('above');$('wordRowBelow').onclick=()=>addRow('below');$('wordColLeft').onclick=()=>addCol('left');$('wordColRight').onclick=()=>addCol('right');
 $('wordDeleteRow').onclick=()=>{const x=cellInfo();if(!x)return;x.row.remove();selectedCell=null;saveWord()};
 $('wordDeleteCol').onclick=()=>{const x=cellInfo();if(!x)return;const index=x.cell.cellIndex;Array.from(x.table.rows).forEach(row=>row.cells[index]?.remove());selectedCell=null;if(!x.table.rows.length||!x.table.rows[0].cells.length)x.table.remove();saveWord()};
 $('wordDeleteTable').onclick=()=>{const x=cellInfo();if(!x)return;x.table.remove();selectedCell=null;saveWord()};
 $('wordInsertDate').onclick=()=>insertHTML(new Date().toLocaleDateString('bn-BD'));
 $('wordPageBreak').onclick=()=>insertHTML('<div class="practice-page-break">— নতুন পৃষ্ঠা —</div><p><br></p>');
 $('wordOrientation').onchange=()=>{};
 $('wordApplyLayout').onclick=()=>{const page=$('wordEditor');page.classList.toggle('landscape-page',$('wordOrientation').value==='landscape');page.dataset.paper=$('wordPaper').value;$('wordSaveStatus').textContent=$('wordPaper').value+' · '+$('wordOrientation').value+' প্রয়োগ হয়েছে';};
 $('wordNew').onclick=()=>{if(!confirm('বর্তমান অনুশীলন মুছে নতুন ডকুমেন্ট শুরু করবেন?'))return;wordEditor.innerHTML='<h2>নতুন ডকুমেন্ট</h2><p>এখানে লেখা শুরু করুন…</p>';selectedCell=null;saveWord()};
 $('wordDownload').onclick=()=>{const doc='<!doctype html><html lang="bn"><meta charset="utf-8"><title>My Word Practice</title><style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;line-height:1.6}table{border-collapse:collapse;width:100%}td,th{border:1px solid #555;padding:8px}.landscape-page{max-width:1100px}</style><body>'+wordEditor.innerHTML+'</body></html>';const blob=new Blob([doc],{type:'text/html;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='my-word-practice.html';a.click();URL.revokeObjectURL(url);$('wordSaveStatus').textContent='ডকুমেন্ট ডাউনলোড হয়েছে'};
 const showLesson=n=>{currentLesson=Math.max(0,Math.min(lessonData.length-1,n));const d=lessonData[currentLesson];$('wordLessonNumber').textContent='পাঠ '+(currentLesson+1)+' / '+lessonData.length;$('wordLessonTitle').textContent='পাঠ '+(currentLesson+1)+': '+d[0];$('wordLessonText').textContent=d[1];$('wordDemoCaption').textContent=d[2];$('wordTaskText').textContent=d[3];document.querySelectorAll('[data-lesson]').forEach(b=>b.classList.toggle('active',Number(b.dataset.lesson)===currentLesson));$('wordDemoMotion').classList.remove('demo-playing');void $('wordDemoMotion').offsetWidth;$('wordDemoMotion').classList.add('demo-playing')};
 document.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>showLesson(Number(b.dataset.lesson)));
 $('wordPrevLesson').onclick=()=>showLesson(currentLesson-1);$('wordNextLesson').onclick=()=>showLesson(currentLesson+1);$('wordStartLesson').onclick=()=>{showLesson(0);$('word-module').scrollIntoView({behavior:'smooth'})};
 $('wordTaskInsert').onclick=()=>{setTab('insert');$('wordRows').value=4;$('wordCols').value=3;$('wordInsertTable').click();wordEditor.scrollIntoView({behavior:'smooth',block:'center'})};
 wordEditor.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();saveWord();$('wordSaveStatus').textContent='✓ ডকুমেন্ট সংরক্ষিত';}});
 saveWord();showLesson(0);
}

$('finalBtn').onclick=beginExam;$('voiceToggle').onclick=()=>{S.settings.voiceOn=!S.settings.voiceOn;save();voiceStatus();if(S.settings.voiceOn)speak('বাংলা নির্দেশনা চালু হয়েছে। এখন থেকে আমি আপনাকে ধাপে ধাপে গাইড করব।');else if('speechSynthesis'in window)speechSynthesis.cancel()};render();voiceStatus()})();