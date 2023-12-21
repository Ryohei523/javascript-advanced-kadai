// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素を取得
const untypedfield = document.getElementById('untyped');
const typedfield   = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const scoreNow = document.getElementById('score-now');

// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
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

// ランダムなテキストを表示
const createText = () => {
  typed = ''; //正タイプした文字をクリア
  typedfield.textContent = typed;
  let random = Math.floor(Math.random()*textLists.length); // 配列のインデックス数からランダムな数値を生成する
  untyped = textLists[random]; // 配列からランダムにテキストを取得
  untypedfield.textContent = untyped;  // 画面に表示する
};

// キー入力を判定
const keyPress = e => {
  if(e.key!==untyped.substring(0,1)) { // 誤タイプの場合
    wrap.classList.add('mistyped');    // 背景色を変更
    setTimeout(()=>{
      wrap.classList.remove('mistyped'); // 100ms後に背景色を元に戻す
    }, 100);
    return;
  }
  score++;                           // 正タイプの場合
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  scoreNow.textContent = score;     // 現在のスコアの表示

  if(untyped===''){ // テキストがなくなったら
    createText();   // 新しいテキストを表示
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
  let text = ''; // テキストを格納する変数を作る
  if(score<100) {
    text = `あなたのランクはCです。\nBランクまであと${100-score}文字です。`;
  }
  else if(score<200) {
    text = `あなたのランクはBです。\nAランクまであと${200-score}文字です。`;
  }
  else if(score<300) {
    text = `あなたのランクはAです。\nSランクまであと${300-score}文字です。`;
  }
  else {
    text = `あなたのランクはSです。\nおめでとうございます`;
  }
  return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`
};

// ゲームを終了
const gameover = id => {
  clearInterval(id);
  console.log('ゲーム終了！');
  const result = confirm(rankCheck(score));
  if(result==true){           // OKボタンがクリックされたら
    window.location.reload(); // リロードする
  }
};

// カウントダウンタイマー
const timer = () => {
  let time = count.textContent; // タイマーの要素を取得
  const id = setInterval(()=>{
    time--;                     // カウントダウン
    count.textContent = time;
    if(time<=0){                // カウントが0になったら
      gameover(id);             // ゲームオーバー
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', ()=>{
  timer();                                         // カウントダウンタイマーを開始する
  createText();                                    //ランダムなテキストを表示する
  start.style.display = 'none';                    // スタートボタンを非表示にする
  scoreNow.textContent = 0;                        // 現在のスコアの初期値を表示
  scoreNow.style.display = 'block';                // 現在のスコアの表示
  document.addEventListener('keypress', keyPress); //キーボードのイベント処理
});

untypedfield.textContent = 'スタートボタンで開始'