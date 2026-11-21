import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

class FakeClassList {
  add() {}
  remove() {}
  toggle() {}
}
class FakeElement {
  constructor(id='') {
    this.id=id; this.value=''; this.textContent=''; this.innerHTML='';
    this.disabled=false; this.style={}; this.dataset={}; this.classList=new FakeClassList();
    this.listeners={}; this.selectionStart=0; this.selectionEnd=0; this.onclick=null;
  }
  addEventListener(type,fn) {(this.listeners[type] ||= []).push(fn);}
  dispatchEvent(event) { for (const fn of this.listeners[event.type] || []) fn(event); return true; }
  click() { if (this.onclick) this.onclick(); }
  setRangeText(value,start,end,mode) {
    this.value=this.value.slice(0,start)+value+this.value.slice(end);
    this.selectionStart=this.selectionEnd=mode==='end'?start+value.length:start;
  }
  focus() {}
  scrollIntoView() {}
  showModal() {}
}
class FakeEvent {
  constructor(type,options={}) {this.type=type;Object.assign(this,options);}
}
const elements=new Map();
const get=id=>{if(!elements.has(id))elements.set(id,new FakeElement(id));return elements.get(id);};
const gameButtons=['rain','race','bubble'].map(game=>{const e=new FakeElement();e.dataset.game=game;return e;});
const document={
  getElementById:get,
  querySelectorAll:selector=>selector==='[data-game]'?gameButtons:[],
  body:new FakeElement('body'),
  createElement:()=>new FakeElement()
};
const store=new Map();
const localStorage={getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,String(v))};
let intervalId=0;
const context={
  document,window:{},localStorage,Event:FakeEvent,
  setInterval:()=>++intervalId,clearInterval:()=>{},
  alert:()=>{},confirm:()=>true,prompt:()=> 'bn',
  Blob:class {},URL:{createObjectURL:()=>'',revokeObjectURL:()=>{}},
  console
};
vm.runInNewContext(fs.readFileSync('app.js','utf8'),context,{timeout:3000});

// A new learner can open English and manual Pause must remain paused while typing.
get('english').click();
assert.ok(!get('lesson').classList.hidden);
get('start').click();
get('pause').click();
get('typing').value='a';
get('typing').dispatchEvent(new FakeEvent('input'));
assert.equal(get('clock').textContent,'0:00','elapsed practice clock must start at zero and remain paused after manual Pause');

// Admin tools can simulate progress and preview the locked Bangla track.
get('adminOpen').click();
get('user').value='Borhan Uddin Mohim';
get('pass').value='Borhan Uddin Mohim';
get('loginBtn').click();
get('simulate').click();
get('admTrack').value='bn';
get('admDay').value='1';
get('admPhase').value='learn';
get('preview').click();

// Normal Q key must produce ঙ; D then J must compose কি in Unicode order.
const typing=get('typing');
typing.value='';typing.selectionStart=typing.selectionEnd=0;
typing.dispatchEvent({type:'keydown',code:'KeyQ',shiftKey:false,preventDefault(){}});
assert.equal(typing.value,'ঙ');
typing.value='';typing.selectionStart=typing.selectionEnd=0;
typing.dispatchEvent({type:'keydown',code:'KeyD',shiftKey:false,preventDefault(){}});
typing.dispatchEvent({type:'keydown',code:'KeyJ',shiftKey:false,preventDefault(){}});
assert.equal(typing.value,'কি','pre-base ই-কার must be stored after the consonant in Unicode');

// Bangla final exam must bind the same Bijoy mapper to its own input field.
get('finalBtn').click();
const exam=get('examInput');
exam.dispatchEvent({type:'keydown',code:'KeyQ',shiftKey:false,preventDefault(){}});
assert.equal(exam.value,'ঙ','Bangla final exam must accept Bijoy-mapped input');

console.log('My Typing runtime smoke tests passed.');
console.log('These are simulated DOM tests, not a substitute for testing on a real browser and physical keyboard.');
