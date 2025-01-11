const textLists=['Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];
let untyped='';
let typed='';
let score=0;
let typecounter=0;

const untypedfield=document.getElementById('untyped');
const typedfield=document.getElementById('typed');
const wrap=document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typecount=document.getElementById('typeCount');
const stop=document.getElementById('stop');

const createText=()=>{
    untyped = textLists[Math.floor(Math.random()*textLists.length)];
    untypedfield.textContent=untyped;
    typed='';
    typedfield.textContent=typed;
};

//アロー関数の()は因数が一つの時は省略することができる。
const keyPress =e=>{
    if(e.key!==untyped.substring(0,1)){
        wrap.classList.add('mistyped');
        setTimeout(() => {
        wrap.classList.remove('mistyped');
        }, 100);
        return;//関数を即時終了させている。
    }
    typecounter++;
    score++;
    typecount.textContent=typecounter;
    typed+=untyped.substring(0,1);
    untyped=untyped.substring(1);
    typedfield.textContent=typed;
    untypedfield.textContent=untyped;
    if(untyped===''){
    createText();
}
};

start.addEventListener('click',()=>{

    createText();

    timer();

    document.addEventListener('keypress',keyPress);

    start.style.display='none';
})
untypedfield.textContent='スタートボタンで開始';



document.addEventListener("keypress",keyPress)

const rankCheck=(score)=>{
    let text='';

    if(score<100){
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if(score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
      } else if(score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
      } else if(score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます!`;    
      }

     
      return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};


const gamerOver =(id)=>{
    untypedfield.textContent='';
    typedfield.textContent='';
    stop.textContent="タイムアップ！";
    setTimeout(()=>{
        clearInterval(id);
    const result = confirm(rankCheck(score));

    if(result==true){
        window.location.reload();
    }
    },10)
    
};

const timer=()=>{
     
    let time =count.textContent;

    //idにはsetIntervalの戻り値が代入されている。
    const id =setInterval(()=>{
        time--;
        count.textContent=time;
        if(time<=0){
           gamerOver(id);
           //gamerOver(id)でtimer関数範囲外の場所でもidを使えるようにしている？？
            //clearIntervalを実行するためにはsetIntervalの戻り値を引数に入れれば実行される
        }
    },1000);
};