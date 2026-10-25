// ── Iconography ──────────────────────────────────────────────
const SUMI_ICONS={
study:'<path d="M6 25c5-1 9-5 13-10l5-8 2 2-8 12c-3 4-7 6-12 6Z"/><path d="M18 9l5 5M5 28c5 1 10-1 13-4" /><path class="seal" d="M24 3l5 2-2 5-5-2Z"/>',
list:'<path d="M12 7h14M12 16h14M12 25h14"/><path d="M5 7l1.5 1.5L9 5M5 16l1.5 1.5L9 14M5 25l1.5 1.5L9 23"/><circle class="seal" cx="26" cy="25" r="2"/>',
progress:'<path d="M5 27V5M5 27h23"/><path d="M9 22l5-7 5 3 7-10"/><path d="M21 8h5v5"/><circle class="seal" cx="14" cy="15" r="2"/>',
book:'<path d="M4 7c5-2 9-1 12 2v18c-3-3-7-4-12-2Z"/><path d="M28 7c-5-2-9-1-12 2v18c3-3 7-4 12-2Z"/><path d="M8 12l4 1M8 17l4 1M20 13l4-1M20 18l4-1"/><path class="seal" d="M14 4h4v4h-4Z"/>',
calendar:'<rect x="5" y="7" width="22" height="21" rx="2"/><path d="M10 4v6M22 4v6M5 13h22M10 18h4M18 18h4M10 23h4"/><circle class="seal" cx="23" cy="23" r="2"/>',
layers:'<path d="M16 4 29 11 16 18 3 11Z"/><path d="m4 17 12 7 12-7M4 23l12 7 12-7"/><circle class="seal" cx="25" cy="10" r="2"/>',
streak:'<path d="M17 3c2 7-5 8-3 13 1 2 3 2 4 0 5 4 6 8 2 12-5 4-13 0-13-7 0-4 3-7 5-10 0 5 1 6 3 6 3-4 2-9 2-14Z"/><path class="seal" d="M22 5l5 2-2 5-5-2Z"/>',
check:'<path d="M5 16l7 7L27 7"/><path d="M5 6h7M5 26h5"/><circle class="seal" cx="25" cy="24" r="2"/>',
target:'<circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="7"/><path d="m16 16 10-10M21 6h5v5"/><circle class="seal" cx="16" cy="16" r="2"/>',
lock:'<rect x="6" y="13" width="20" height="15" rx="2"/><path d="M10 13V9a6 6 0 0 1 12 0v4M16 19v4"/><circle class="seal" cx="24" cy="23" r="2"/>',
rank:'<path d="m16 3 4 8 9 1-6.5 6 2 9L16 22l-8.5 5 2-9L3 12l9-1Z"/><path d="m12 15 3 3 6-7"/><circle class="seal" cx="25" cy="6" r="2"/>',
session:'<circle cx="16" cy="16" r="12"/><path d="M16 8v8l6 4"/><path class="seal" d="M23 3l5 2-2 5-5-2Z"/>'
};
function sumiIcon(name){const body=SUMI_ICONS[name]||SUMI_ICONS.study;return '<svg class="ui-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+body+'</svg>'}
function decorateSumiIcons(){
document.querySelectorAll('[data-icon]').forEach(el=>{if(!el.querySelector('.ui-icon'))el.insertAdjacentHTML('afterbegin',sumiIcon(el.dataset.icon))});
document.querySelectorAll('.tabs [data-tab]').forEach(el=>{if(el.querySelector('.ui-icon'))return;const name=el.dataset.tab;el.insertAdjacentHTML('afterbegin',sumiIcon(name==='study'?'study':name==='browse'?'list':'progress'))});
const statIcons={dueStat:'calendar',learnedStat:'book',streakStat:'streak',pTotal:'layers',pSeen:'check',pMastered:'rank'};
Object.entries(statIcons).forEach(([id,name])=>{const el=document.getElementById(id);const label=el&&el.closest('.stat')?.querySelector('span');if(label&&!label.querySelector('.ui-icon'))label.insertAdjacentHTML('afterbegin',sumiIcon(name))});
}
// Hide kana readings when they merely repeat a kana-only vocabulary term.
function formatTranslationList(value){return (Array.isArray(value)?value:[value]).filter(Boolean).join(", ")}
function isRedundantVocabReading(word){
  const term=String(word?.jp||"").trim(),reading=String(word?.reading||word?.kana||"").trim();
  return !!term&&term===reading&&!/[\u3400-\u9FFF々]/u.test(term);
}
// ── Vocabulary dataset: できる日本語初中級 ────────────────────
const INITIAL_VOCABULARY_WORDS = [
{jp:"親",reading:"おや",en:["parent","parents"],es:["progenitor","progenitores","padre","madre"]},
{jp:"父親",reading:"ちちおや",en:["father"],es:["padre"]},
{jp:"母親",reading:"ははおや",en:["mother"],es:["madre"]},
{jp:"子ども",reading:"こども",en:["child","children","kid","kids"],es:["niño","niña","niños","niñas","hijo","hija","hijos","hijas","criatura"]},
{jp:"近所の子ども",reading:"きんじょのこども",en:["neighborhood children","children in the neighborhood","neighborhood kids","local children"],es:["niños del vecindario","niños del barrio","niños de la zona","niños vecinos"]},
{jp:"家事",reading:"かじ",en:["housework","household chores","chores"],es:["tareas domésticas","labores domésticas","quehaceres domésticos","tareas del hogar"]},
{jp:"コーチ",reading:"コーチ",en:["coach","trainer"],es:["entrenador","entrenadora","preparador","preparadora"]},
{jp:"塾",reading:"じゅく",en:["cram school","tutoring school","private tutoring school","juku"],es:["academia de apoyo","academia de refuerzo","academia extraescolar","academia privada"]},
{jp:"数学",reading:"すうがく",en:["mathematics","math","maths"],es:["matemáticas","matematica","matemática"]},
{jp:"ゲームセンター",reading:"ゲームセンター",en:["arcade","video game arcade","game center","game centre"],es:["salón recreativo","salón de videojuegos","centro de videojuegos","recreativos"]},
{jp:"頃",reading:"ころ",en:["about","around","approximately","time","when"],es:["alrededor de","sobre","aproximadamente","época","cuando"]},
{jp:"～キロ",reading:"～キロ",en:["kilogram","kilograms","kilometer","kilometers","kilometre","kilometres","kilo","kilos"],es:["kilo","kilos","kilogramo","kilogramos","kilómetro","kilómetros"]},
{jp:"～ずつ",reading:"～ずつ",en:["each","at a time","apiece","one each","in equal amounts"],es:["cada uno","cada una","de uno en uno","por persona","a partes iguales"]},
{jp:"騒ぐ",reading:"さわぐ",en:["make noise","be noisy","make a fuss","make a racket"],es:["hacer ruido","armar jaleo","alborotar","hacer escándalo"]},
{jp:"世話をする",reading:"せわをする",en:["take care of","look after","care for"],es:["cuidar","ocuparse de","atender"]},
{jp:"偉い",reading:"えらい",en:["great","admirable","important","high-ranking","remarkable"],es:["admirable","respetable","importante","de alto rango","destacado","excelente"]},
{jp:"この間",reading:"このあいだ",en:["the other day","recently","a while ago","the other time"],es:["el otro día","hace poco","recientemente","hace un tiempo"]},
{jp:"必ず",reading:"かならず",en:["without fail","certainly","definitely","surely"],es:["sin falta","seguramente","con seguridad","ciertamente","definitivamente","necesariamente"]},
{jp:"やっぱり",reading:"やっぱり",en:["as expected","after all","just as I thought"],es:["como era de esperar","después de todo","al final","tal como pensaba"]},
{jp:"夜遅く",reading:"よるおそく",en:["late at night","late in the evening"],es:["tarde por la noche","a altas horas de la noche","muy tarde por la noche"]},
{jp:"うち",reading:"うち",en:["home","house","inside","within"],es:["casa","hogar","dentro","entre"]},
{jp:"うちの親",reading:"うちのおや",en:["my parents","our parents","my parent"],es:["mis padres","nuestros padres","mi padre","mi madre"]},
{jp:"海外",reading:"かいがい",en:["overseas","abroad","foreign countries"],es:["el extranjero","países extranjeros","fuera del país"]},
{jp:"曲",reading:"きょく",en:["song","tune","piece of music","track"],es:["canción","melodía","pieza musical","tema musical"]},
{jp:"教育",reading:"きょういく",en:["education"],es:["educación"]},
{jp:"化粧品",reading:"けしょうひん",en:["cosmetics","makeup","make-up","cosmetic products"],es:["cosméticos","maquillaje","productos cosméticos"]},
{jp:"けんかをする",reading:"けんかをする",en:["fight","have a fight","quarrel","argue"],es:["pelearse","tener una pelea","discutir","reñir"]},
{jp:"泣く",reading:"なく",en:["cry","weep"],es:["llorar"]},
{jp:"残す",reading:"のこす",en:["leave","leave behind","save","keep","leave uneaten"],es:["dejar","dejar atrás","guardar","reservar","dejar sin comer"]},
{jp:"やる",reading:"やる",en:["do","carry out","perform","give"],es:["hacer","realizar","llevar a cabo","dar"]},
{jp:"宿題をやる",reading:"しゅくだいをやる",en:["do homework","do one's homework"],es:["hacer los deberes","hacer la tarea","hacer los deberes escolares"]},
{jp:"厳しい",reading:"きびしい",en:["strict","severe","harsh","tough"],es:["estricto","estricta","severo","severa","duro","dura","riguroso","rigurosa"]},
{jp:"うれしい",reading:"うれしい",en:["happy","glad","pleased","delighted"],es:["contento","contenta","feliz","alegre","encantado","encantada"]},
{jp:"熱心",reading:"ねっしん",en:["enthusiastic","eager","zealous","diligent","devoted"],es:["entusiasta","aplicado","aplicada","diligente","dedicado","dedicada"]},
{jp:"何でも",reading:"なんでも",en:["anything","whatever","everything"],es:["cualquier cosa","lo que sea","todo"]}
].map((w,i)=>({...w,bookId:"dekiru-shochukyu",topic:w.topic||(i<20?"13-1":"13-2")}));
// ── Vocabulary subtopics: できる日本語初中級 · Topic 1 ──
const DEKIRU_SHOCHUKYU_TOPIC_1_WORDS = [
{jp:"方",reading:"かた",en:["person","someone","way","direction"],es:["persona","forma","manera","dirección"]},
{jp:"者",reading:"もの",en:["person","someone"],es:["persona","individuo"]},
{jp:"チラシ",reading:"チラシ",en:["flyer","leaflet","advertising flyer"],es:["folleto","volante","panfleto publicitario"]},
{jp:"ホームページ",reading:"ホームページ",en:["website","web page","homepage"],es:["página web","sitio web","página de inicio"]},
{jp:"学生証",reading:"がくせいしょう",en:["student ID","student ID card"],es:["carné de estudiante","carnet de estudiante","tarjeta de estudiante"]},
{jp:"資格外活動許可書",reading:"しかくがいかつどうきょかしょ",en:["permission to engage in activities other than those permitted","work permission document","work permit"],es:["permiso para realizar actividades no autorizadas por el estatus de residencia","permiso de trabajo"]},
{jp:"面接",reading:"めんせつ",en:["interview","job interview"],es:["entrevista","entrevista de trabajo"]},
{jp:"履歴書",reading:"りれきしょ",en:["résumé","resume","CV","curriculum vitae"],es:["currículum","curriculum vitae"]},
{jp:"半年",reading:"はんとし",en:["half a year","six months"],es:["medio año","seis meses"]},
{jp:"（お）刺身",reading:"（お）さしみ",en:["sashimi","sliced raw fish"],es:["sashimi","pescado crudo en lonchas"]},
{jp:"日常会話",reading:"にちじょうかいわ",en:["everyday conversation","daily conversation"],es:["conversación cotidiana","conversación diaria"]},
{jp:"問い合わせ",reading:"といあわせ",en:["inquiry","enquiry","question"],es:["consulta","pregunta","solicitud de información"]},
{jp:"希望する",reading:"きぼうする",en:["to hope for","to wish for","to request","to desire"],es:["desear","esperar","solicitar"]},
{jp:"募集する",reading:"ぼしゅうする",en:["to recruit","to seek applicants","to advertise for applicants"],es:["reclutar","buscar candidatos","convocar"]},
{jp:"思い出す",reading:"おもいだす",en:["to remember","to recall","to recollect"],es:["recordar","acordarse de"]},
{jp:"入力する",reading:"にゅうりょくする",en:["to input","to enter data","to type in"],es:["introducir datos","ingresar datos","escribir"]},
{jp:"それでは",reading:"それでは",en:["well then","in that case","then"],es:["entonces","en ese caso","pues bien"]},
{jp:"では",reading:"では",en:["well then","then","in that case"],es:["entonces","pues","en ese caso"]},
{jp:"いらっしゃいます",reading:"いらっしゃいます",en:["to be (honorific)","to go (honorific)","to come (honorific)"],es:["estar (honorífico)","ir (honorífico)","venir (honorífico)"]},
{jp:"申します",reading:"もうします",en:["to be called (humble)","to say (humble)","to tell (humble)"],es:["llamarse (humilde)","decir (humilde)","comunicar (humilde)"]},
{jp:"参ります",reading:"まいります",en:["to go (humble)","to come (humble)"],es:["ir (humilde)","venir (humilde)"]},
{jp:"少々お待ちください",reading:"しょうしょうおまちください",en:["please wait a moment","please wait a little"],es:["espere un momento, por favor","un momento, por favor"]},
{jp:"お先に失礼します",reading:"おさきにしつれいします",en:["excuse me for leaving first","I'll be leaving before you"],es:["con permiso, me retiro antes","disculpad que me vaya antes"]},
{jp:"こちらへどうぞ",reading:"こちらへどうぞ",en:["this way, please","please come this way"],es:["por aquí, por favor","pase por aquí, por favor"]},
{jp:"失礼します",reading:"しつれいします",en:["excuse me","I'm sorry to interrupt","goodbye (polite)"],es:["con permiso","disculpe","perdone la interrupción"]},
{jp:"よろしくお願いいたします",reading:"よろしくおねがいいたします",en:["thank you in advance","I look forward to working with you","please treat me well"],es:["gracias de antemano","cuento con su colaboración","encantado de trabajar con usted"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"1-1",mainTopic:"1",topicTitle:"アルバイトを探す"}));

const DEKIRU_SHOCHUKYU_TOPIC_1_2_WORDS = [
{jp:"楽器",reading:"がっき",en:["musical instrument","instrument"],es:["instrumento musical","instrumento"]},
{jp:"建物",reading:"たてもの",en:["building","structure"],es:["edificio","construcción"]},
{jp:"歴史",reading:"れきし",en:["history"],es:["historia"]},
{jp:"意見",reading:"いけん",en:["opinion","view"],es:["opinión","punto de vista"]},
{jp:"お年寄り",reading:"おとしより",en:["elderly person","older person","senior citizen"],es:["persona mayor","anciano","anciana"]},
{jp:"言葉",reading:"ことば",en:["word","language","expression"],es:["palabra","idioma","expresión"]},
{jp:"自分",reading:"じぶん",en:["oneself","myself","yourself","self"],es:["uno mismo","yo mismo","sí mismo"]},
{jp:"話",reading:"はなし",en:["story","talk","conversation"],es:["historia","relato","conversación","charla"]},
{jp:"野外ライブ",reading:"やがいライブ",en:["outdoor concert","outdoor live performance","open-air concert"],es:["concierto al aire libre","actuación al aire libre"]},
{jp:"～個",reading:"～こ",en:["counter for small objects","counter for items"],es:["contador de objetos pequeños","contador de unidades"]},
{jp:"聞き取る",reading:"ききとる",en:["to catch (what is said)","to understand by listening","to make out"],es:["captar al escuchar","entender al escuchar","distinguir lo que se oye"]},
{jp:"覚える",reading:"おぼえる",en:["to memorize","to learn","to remember"],es:["memorizar","aprender","recordar"]},
{jp:"応援する",reading:"おうえんする",en:["to support","to cheer for","to root for"],es:["apoyar","animar","alentar"]},
{jp:"サイクリングする",reading:"サイクリングする",en:["to go cycling","to cycle","to ride a bicycle"],es:["ir en bicicleta","hacer ciclismo","salir en bicicleta"]},
{jp:"遅い",reading:"おそい",en:["slow","late"],es:["lento","lenta","tarde","retrasado","retrasada"]},
{jp:"速い",reading:"はやい",en:["fast","quick","rapid"],es:["rápido","rápida","veloz"]},
{jp:"つまらない",reading:"つまらない",en:["boring","dull","uninteresting"],es:["aburrido","aburrida","poco interesante"]},
{jp:"得意（な）",reading:"とくい（な）",en:["good at","skilled at","one's forte"],es:["bueno en","buena en","hábil en","especialidad"]},
{jp:"苦手（な）",reading:"にがて（な）",en:["bad at","not good at","weak at"],es:["malo en","mala en","tener dificultades con","no dársele bien"]},
{jp:"無理（な）",reading:"むり（な）",en:["impossible","unreasonable","too difficult","unrealistic"],es:["imposible","irrazonable","excesivo","demasiado difícil"]},
{jp:"朝早く",reading:"あさはやく",en:["early in the morning","early morning"],es:["temprano por la mañana","a primera hora de la mañana"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"1-2",mainTopic:"1",topicTitle:"新しい友達"}));

// ── Vocabulary subtopics: できる日本語初中級 · Topic 2 ──
const DEKIRU_SHOCHUKYU_TOPIC_2_1_WORDS = [
{jp:"画面",reading:"がめん",en:["screen","display"],es:["pantalla"]},
{jp:"腕時計",reading:"うでどけい",en:["wristwatch","watch"],es:["reloj de pulsera","reloj"]},
{jp:"セーター",reading:"セーター",en:["sweater","jumper"],es:["jersey","suéter"]},
{jp:"スーツケース",reading:"スーツケース",en:["suitcase"],es:["maleta"]},
{jp:"コート",reading:"コート",en:["coat","overcoat"],es:["abrigo"]},
{jp:"棚",reading:"たな",en:["shelf","shelving"],es:["estante","estantería"]},
{jp:"指輪",reading:"ゆびわ",en:["ring"],es:["anillo"]},
{jp:"サイズ",reading:"サイズ",en:["size"],es:["talla","tamaño"]},
{jp:"数字",reading:"すうじ",en:["number","numeral","digit"],es:["número","cifra","dígito"]},
{jp:"ヒール",reading:"ヒール",en:["heel","high heel"],es:["tacón"]},
{jp:"ボタン",reading:"ボタン",en:["button"],es:["botón"]},
{jp:"ジーンズ",reading:"ジーンズ",en:["jeans","denim jeans"],es:["vaqueros","pantalones vaqueros","jeans"]},
{jp:"売り場",reading:"うりば",en:["sales floor","department","counter"],es:["sección de ventas","sección","mostrador"]},
{jp:"動く",reading:"うごく",en:["to move","to work","to operate"],es:["moverse","funcionar","operar"]},
{jp:"説明する",reading:"せつめいする",en:["to explain","to give an explanation"],es:["explicar","dar una explicación"]},
{jp:"配達する",reading:"はいたつする",en:["to deliver","to make a delivery"],es:["entregar","repartir","hacer una entrega"]},
{jp:"重い",reading:"おもい",en:["heavy"],es:["pesado","pesada"]},
{jp:"軽い",reading:"かるい",en:["light","not heavy"],es:["ligero","ligera"]},
{jp:"ちょうどいい",reading:"ちょうどいい",en:["just right","perfect","a good fit"],es:["justo","justa","perfecto","perfecta","adecuado","adecuada"]},
{jp:"丈夫（な）",reading:"じょうぶ（な）",en:["durable","sturdy","strong","hard-wearing"],es:["resistente","duradero","duradera","robusto","robusta"]},
{jp:"もっと",reading:"もっと",en:["more","even more"],es:["más","aún más"]},
{jp:"ちょっと",reading:"ちょっと",en:["a little","a bit","just a moment"],es:["un poco","un momento"]},
{jp:"いかがですか",reading:"いかがですか",en:["how about it?","would you like it?","how is it?"],es:["¿qué le parece?","¿qué tal?","¿le gustaría?"]},
{jp:"かしこまりました",reading:"かしこまりました",en:["certainly","understood","right away"],es:["por supuesto","entendido","enseguida"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"2-1",mainTopic:"2",topicTitle:"上手に買い物"}));

const DEKIRU_SHOCHUKYU_TOPIC_2_2_WORDS = [
{jp:"壁",reading:"かべ",en:["wall"],es:["pared"]},
{jp:"カレンダー",reading:"カレンダー",en:["calendar"],es:["calendario"]},
{jp:"世界地図",reading:"せかいちず",en:["world map"],es:["mapamundi","mapa del mundo"]},
{jp:"最新",reading:"さいしん",en:["latest","newest","most recent"],es:["último","última","más reciente","novedad"]},
{jp:"飲み放題",reading:"のみほうだい",en:["all-you-can-drink","unlimited drinks"],es:["barra libre de bebidas","bebida ilimitada"]},
{jp:"期間限定",reading:"きかんげんてい",en:["limited-time","for a limited time"],es:["por tiempo limitado","limitado por tiempo"]},
{jp:"セット",reading:"セット",en:["set","combo","meal set"],es:["conjunto","menú","combo"]},
{jp:"フロアガイド",reading:"フロアガイド",en:["floor guide","store directory"],es:["guía de plantas","directorio de la tienda"]},
{jp:"意味",reading:"いみ",en:["meaning","sense"],es:["significado","sentido"]},
{jp:"営業中",reading:"えいぎょうちゅう",en:["open","now open","in business"],es:["abierto","abierta","abierto al público"]},
{jp:"大盛り",reading:"おおもり",en:["large serving","large portion","extra-large serving"],es:["ración grande","porción grande","ración extra grande"]},
{jp:"おかわり",reading:"おかわり",en:["another serving","second helping","refill"],es:["otra ración","repetición","más","relleno"]},
{jp:"送料",reading:"そうりょう",en:["shipping fee","delivery charge","postage"],es:["gastos de envío","coste de envío","porte"]},
{jp:"タイムサービス",reading:"タイムサービス",en:["special offer for a limited time","time-limited sale","happy-hour special"],es:["oferta por tiempo limitado","oferta especial por horario"]},
{jp:"定休日",reading:"ていきゅうび",en:["regular closing day","regular day off"],es:["día de cierre semanal","día habitual de cierre"]},
{jp:"本日",reading:"ほんじつ",en:["today","this day"],es:["hoy","en el día de hoy"]},
{jp:"半額",reading:"はんがく",en:["half price","50 percent off"],es:["mitad de precio","50 % de descuento"]},
{jp:"レディースデー",reading:"レディースデー",en:["ladies' day","women's day promotion"],es:["día de las mujeres","día de promoción para mujeres"]},
{jp:"量",reading:"りょう",en:["amount","quantity","portion"],es:["cantidad","porción"]},
{jp:"親子丼",reading:"おやこどん",en:["oyakodon","chicken and egg rice bowl"],es:["oyakodon","cuenco de arroz con pollo y huevo"]},
{jp:"牛丼",reading:"ぎゅうどん",en:["gyudon","beef rice bowl"],es:["gyudon","cuenco de arroz con ternera"]},
{jp:"サンドイッチ",reading:"サンドイッチ",en:["sandwich"],es:["sándwich","emparedado"]},
{jp:"ソース",reading:"ソース",en:["sauce","Worcestershire-style sauce"],es:["salsa"]},
{jp:"～券",reading:"～けん",en:["ticket","voucher","coupon"],es:["entrada","vale","cupón"]},
{jp:"かける",reading:"かける",en:["to hang","to put on","to pour over","to apply"],es:["colgar","poner","echar","verter","añadir"]},
{jp:"貼る",reading:"はる",en:["to stick","to paste","to put up"],es:["pegar","adherir","colocar"]},
{jp:"注文する",reading:"ちゅうもんする",en:["to order","to place an order"],es:["pedir","hacer un pedido"]},
{jp:"割引する",reading:"わりびきする",en:["to discount","to give a discount"],es:["hacer un descuento","descontar"]},
{jp:"両替する",reading:"りょうがえする",en:["to exchange money","to change currency"],es:["cambiar dinero","cambiar divisa"]},
{jp:"得（な）",reading:"とく（な）",en:["good value","a bargain","economical"],es:["ventajoso","ventajosa","económico","económica","una ganga"]},
{jp:"特別（な）",reading:"とくべつ（な）",en:["special","particular"],es:["especial","particular"]},
{jp:"どういう",reading:"どういう",en:["what kind of","what sort of","what ... means"],es:["qué tipo de","qué clase de","qué ... significa"]},
{jp:"もう",reading:"もう",en:["already","any more","another"],es:["ya","más","otro","otra"]},
{jp:"もう一杯",reading:"もういっぱい",en:["one more cup","another glass","one more drink"],es:["otra taza","otro vaso","una bebida más"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"2-2",mainTopic:"2",topicTitle:"一緒に食事"}));

const DEKIRU_SHOCHUKYU_TOPIC_4_1_WORDS = [
{jp:"美容院",reading:"びよういん",en:["beauty salon","hair salon"],es:["peluquería","salón de belleza"]},
{jp:"空港",reading:"くうこう",en:["airport"],es:["aeropuerto"]},
{jp:"歯科",reading:"しか",en:["dentistry","dental clinic"],es:["odontología","clínica dental"]},
{jp:"市民",reading:"しみん",en:["citizen","resident"],es:["ciudadano","residente"]},
{jp:"三味線",reading:"しゃみせん",en:["shamisen","Japanese three-stringed instrument"],es:["shamisen","instrumento japonés de tres cuerdas"]},
{jp:"種類",reading:"しゅるい",en:["type","kind","sort"],es:["tipo","clase"]},
{jp:"水道",reading:"すいどう",en:["water supply","tap water"],es:["suministro de agua","agua corriente"]},
{jp:"てんぷら",reading:"てんぷら",en:["tempura"],es:["tempura"]},
{jp:"不動産",reading:"ふどうさん",en:["real estate","property"],es:["bienes inmuebles","inmobiliaria"]},
{jp:"交流会",reading:"こうりゅうかい",en:["exchange gathering","social gathering"],es:["encuentro de intercambio","reunión social"]},
{jp:"小学校",reading:"しょうがっこう",en:["elementary school","primary school"],es:["escuela primaria","colegio de primaria"]},
{jp:"市役所",reading:"しやくしょ",en:["city hall","municipal office"],es:["ayuntamiento","oficina municipal"]},
{jp:"情報",reading:"じょうほう",en:["information"],es:["información"]},
{jp:"タオル",reading:"タオル",en:["towel"],es:["toalla"]},
{jp:"茶道",reading:"さどう",en:["Japanese tea ceremony","tea ceremony"],es:["ceremonia japonesa del té","ceremonia del té"]},
{jp:"センター",reading:"センター",en:["center","centre"],es:["centro"]},
{jp:"～場",reading:"～じょう",en:["place","site","grounds"],es:["lugar","recinto"]},
{jp:"～口",reading:"～ぐち",en:["entrance","exit","opening"],es:["entrada","salida","boca"]},
{jp:"かかる",reading:"かかる",en:["to take time","to cost"],es:["tardar","costar"]},
{jp:"質問する",reading:"しつもんする",en:["to ask a question","to inquire"],es:["hacer una pregunta","preguntar"]},
{jp:"カットする",reading:"カットする",en:["to cut","to have a haircut"],es:["cortar","cortarse el pelo"]},
{jp:"紹介する",reading:"しょうかいする",en:["to introduce","to recommend"],es:["presentar","recomendar"]},
{jp:"修理する",reading:"しゅうりする",en:["to repair","to fix"],es:["reparar","arreglar"]},
{jp:"知らせる",reading:"しらせる",en:["to inform","to let someone know"],es:["informar","avisar"]},
{jp:"止まる",reading:"とまる",en:["to stop"],es:["pararse","detenerse"]},
{jp:"出る",reading:"でる",en:["to leave","to depart","to come out"],es:["salir","partir"]},
{jp:"着く",reading:"つく",en:["to arrive","to reach"],es:["llegar"]},
{jp:"利用する",reading:"りようする",en:["to use","to make use of"],es:["utilizar","hacer uso de"]},
{jp:"必要（な）",reading:"ひつよう（な）",en:["necessary","needed"],es:["necesario","preciso"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"4-1",mainTopic:"4",topicTitle:"生活を楽しむ"}));

const DEKIRU_SHOCHUKYU_TOPIC_4_2_WORDS = [
{jp:"大使館",reading:"たいしかん",en:["embassy"],es:["embajada"]},
{jp:"メートル",reading:"メートル",en:["meter","metre"],es:["metro"]},
{jp:"次",reading:"つぎ",en:["next"],es:["siguiente","próximo"]},
{jp:"坂",reading:"さか",en:["slope","hill"],es:["cuesta","pendiente"]},
{jp:"～階建て",reading:"～かいだて",en:["...-story building","building with ... floors"],es:["edificio de ... plantas","edificio de ... pisos"]},
{jp:"～番線",reading:"～ばんせん",en:["platform number ...","track number ..."],es:["andén número ...","vía número ..."]},
{jp:"～行き",reading:"～ゆき",en:["bound for ...","going to ..."],es:["con destino a ...","hacia ..."]},
{jp:"上る",reading:"のぼる",en:["to go up","to climb"],es:["subir","ascender"]},
{jp:"下りる",reading:"おりる",en:["to go down","to get off"],es:["bajar","descender"]},
{jp:"駐車する",reading:"ちゅうしゃする",en:["to park"],es:["aparcar","estacionar"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"4-2",mainTopic:"4",topicTitle:"行き方を教える"}));

const DEKIRU_SHOCHUKYU_TOPIC_3_1_WORDS = [
{jp:"給料",reading:"きゅうりょう",en:["salary"],es:["salario"]},
{jp:"サークル",reading:"サークル",en:["club"],es:["club"]},
{jp:"説明会",reading:"せつめいかい",en:["information session"],es:["sesión informativa"]},
{jp:"専門学校",reading:"せんもんがっこう",en:["vocational school"],es:["escuela profesional"]},
{jp:"見学会",reading:"けんがくかい",en:["open day"],es:["visita guiada"]},
{jp:"学部",reading:"がくぶ",en:["faculty"],es:["facultad"]},
{jp:"経済",reading:"けいざい",en:["economics"],es:["economía"]},
{jp:"法律",reading:"ほうりつ",en:["law"],es:["ley"]},
{jp:"カナダ",reading:"カナダ",en:["Canada"],es:["Canadá"]},
{jp:"聴解",reading:"ちょうかい",en:["listening comprehension"],es:["comprensión auditiva"]},
{jp:"アクセサリー",reading:"アクセサリー",en:["accessories"],es:["accesorios"]},
{jp:"一生懸命",reading:"いっしょうけんめい",en:["hard; with all one's might"],es:["con empeño"]},
{jp:"答え",reading:"こたえ",en:["answer"],es:["respuesta"]},
{jp:"試験",reading:"しけん",en:["exam"],es:["examen"]},
{jp:"将来",reading:"しょうらい",en:["future"],es:["futuro"]},
{jp:"ビジネス",reading:"ビジネス",en:["business"],es:["negocios"]},
{jp:"日本語能力試験",reading:"にほんごのうりょくしけん",en:["JLPT"],es:["JLPT"]},
{jp:"間違い",reading:"まちがい",en:["mistake"],es:["error"]},
{jp:"寮",reading:"りょう",en:["dormitory"],es:["residencia"]},
{jp:"目標",reading:"もくひょう",en:["goal"],es:["objetivo"]},
{jp:"～料",reading:"～りょう",en:["fee"],es:["tarifa"]},
{jp:"翻訳する",reading:"ほんやくする",en:["to translate"],es:["traducir"]},
{jp:"調べる",reading:"しらべる",en:["to look up; investigate"],es:["consultar; investigar"]},
{jp:"見学する",reading:"けんがくする",en:["to visit; observe"],es:["visitar"]},
{jp:"相談する",reading:"そうだんする",en:["to consult; discuss"],es:["consultar"]},
{jp:"貯金する",reading:"ちょきんする",en:["to save money"],es:["ahorrar"]},
{jp:"留学する",reading:"りゅうがくする",en:["to study abroad"],es:["estudiar en el extranjero"]},
{jp:"開く",reading:"ひらく",en:["to open; hold an event"],es:["abrir; organizar"]},
{jp:"続ける",reading:"つづける",en:["to continue"],es:["continuar"]},
{jp:"やめる",reading:"やめる",en:["to quit; stop"],es:["dejar; parar"]},
{jp:"受ける",reading:"うける",en:["to take; receive"],es:["hacer; recibir"]},
{jp:"案内する",reading:"あんないする",en:["to guide"],es:["guiar"]},
{jp:"進学する",reading:"しんがくする",en:["to go on to higher education"],es:["continuar estudios"]},
{jp:"通学する",reading:"つうがくする",en:["to commute to school"],es:["ir a la escuela"]},
{jp:"選ぶ",reading:"えらぶ",en:["to choose"],es:["elegir"]},
{jp:"迷う",reading:"まよう",en:["to hesitate; be unsure"],es:["dudar"]},
{jp:"考える",reading:"かんがえる",en:["to think"],es:["pensar"]},
{jp:"決める",reading:"きめる",en:["to decide"],es:["decidir"]},
{jp:"合格する",reading:"ごうかくする",en:["to pass an exam"],es:["aprobar"]},
{jp:"専攻する",reading:"せんこうする",en:["to major in"],es:["especializarse"]},
{jp:"悩む",reading:"なやむ",en:["to worry"],es:["preocuparse"]},
{jp:"就職する",reading:"しゅうしょくする",en:["to get a job"],es:["conseguir trabajo"]},
{jp:"確認する",reading:"かくにんする",en:["to confirm; check"],es:["confirmar; comprobar"]},
{jp:"正しい",reading:"ただしい",en:["correct"],es:["correcto"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"3-1",mainTopic:"3",topicTitle:"これからの計画"}));

const DEKIRU_SHOCHUKYU_TOPIC_3_2_WORDS = [
{jp:"建築家",reading:"けんちくか",en:["architect"],es:["arquitecto"]},
{jp:"デザイナー",reading:"デザイナー",en:["designer"],es:["diseñador"]},
{jp:"夢",reading:"ゆめ",en:["dream"],es:["sueño"]},
{jp:"スーツ",reading:"スーツ",en:["suit"],es:["traje"]},
{jp:"願書",reading:"がんしょ",en:["application form"],es:["formulario de solicitud"]},
{jp:"事務室",reading:"じむしつ",en:["office"],es:["oficina"]},
{jp:"書類",reading:"しょるい",en:["documents"],es:["documentos"]},
{jp:"～中",reading:"～ちゅう",en:["during; by the end of"],es:["durante; antes de terminar"]},
{jp:"経営する",reading:"けいえいする",en:["to manage"],es:["gestionar"]},
{jp:"体験する",reading:"たいけんする",en:["to experience"],es:["experimentar"]},
{jp:"頑張る",reading:"がんばる",en:["to do one's best"],es:["esforzarse"]},
{jp:"スピーチする",reading:"スピーチする",en:["to give a speech"],es:["dar un discurso"]},
{jp:"受験する",reading:"じゅけんする",en:["to take an exam"],es:["presentarse a un examen"]},
{jp:"復習する",reading:"ふくしゅうする",en:["to review"],es:["repasar"]},
{jp:"予習する",reading:"よしゅうする",en:["to prepare in advance"],es:["preparar la lección"]},
{jp:"デッサンする",reading:"デッサンする",en:["to sketch"],es:["hacer un boceto"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"3-2",mainTopic:"3",topicTitle:"夢に向かって"}));


const DEKIRU_SHOCHUKYU_TOPIC_5_1_WORDS = [
{jp:"池",reading:"いけ",en:["pond"],es:["estanque"]},
{jp:"階段",reading:"かいだん",en:["stairs","staircase"],es:["escaleras"]},
{jp:"切符",reading:"きっぷ",en:["ticket"],es:["billete","boleto"]},
{jp:"線路",reading:"せんろ",en:["railway track","railroad track"],es:["vía férrea"]},
{jp:"定期券",reading:"ていきけん",en:["commuter pass","season ticket"],es:["abono de transporte"]},
{jp:"ケース",reading:"ケース",en:["case"],es:["estuche","funda"]},
{jp:"忘れ物",reading:"わすれもの",en:["lost item","something left behind"],es:["objeto perdido","objeto olvidado"]},
{jp:"鍵",reading:"かぎ",en:["key","lock"],es:["llave","cerradura"]},
{jp:"辺",reading:"へん",en:["area","vicinity"],es:["zona","alrededores"]},
{jp:"途中",reading:"とちゅう",en:["on the way"],es:["por el camino","a medio camino"]},
{jp:"カード",reading:"カード",en:["card"],es:["tarjeta"]},
{jp:"銀行のカード",reading:"ぎんこうのカード",en:["bank card"],es:["tarjeta bancaria"]},
{jp:"革",reading:"かわ",en:["leather"],es:["cuero","piel"]},
{jp:"教科書",reading:"きょうかしょ",en:["textbook"],es:["libro de texto"]},
{jp:"警官",reading:"けいかん",en:["police officer"],es:["agente de policía"]},
{jp:"ハート",reading:"ハート",en:["heart","heart shape"],es:["corazón"]},
{jp:"ピンク",reading:"ピンク",en:["pink"],es:["rosa"]},
{jp:"星",reading:"ほし",en:["star"],es:["estrella"]},
{jp:"緑",reading:"みどり",en:["green"],es:["verde"]},
{jp:"横長",reading:"よこなが",en:["landscape orientation","wider than tall"],es:["formato apaisado","más ancho que alto"]},
{jp:"色",reading:"いろ",en:["color"],es:["color"]},
{jp:"大きさ",reading:"おおきさ",en:["size"],es:["tamaño"]},
{jp:"形",reading:"かたち",en:["shape","form"],es:["forma"]},
{jp:"預かる",reading:"あずかる",en:["to keep","to look after","to take custody of"],es:["guardar","custodiar"]},
{jp:"落とす",reading:"おとす",en:["to drop","to lose"],es:["dejar caer","perder"]},
{jp:"なくなる",reading:"なくなる",en:["to be lost","to go missing","to disappear"],es:["perderse","desaparecer"]},
{jp:"乗り過ごす",reading:"のりすごす",en:["to ride past one's stop"],es:["pasarse de parada"]},
{jp:"間違える",reading:"まちがえる",en:["to make a mistake","to get wrong"],es:["equivocarse"]},
{jp:"迷う",reading:"まよう",en:["to get lost","to be unsure"],es:["perderse","estar indeciso"]},
{jp:"転ぶ",reading:"ころぶ",en:["to fall down","to trip"],es:["caerse","tropezar"]},
{jp:"心配する",reading:"しんぱいする",en:["to worry"],es:["preocuparse"]},
{jp:"気がつく",reading:"きがつく",en:["to notice","to realize"],es:["darse cuenta","notar"]},
{jp:"付く",reading:"つく",en:["to be attached","to have something attached"],es:["estar unido","tener algo incorporado"]},
{jp:"見つかる",reading:"みつかる",en:["to be found","to turn up"],es:["encontrarse","aparecer"]},
{jp:"出る",reading:"でる",en:["to leave","to exit"],es:["salir"]},
{jp:"乗り換える",reading:"のりかえる",en:["to transfer","to change trains"],es:["hacer transbordo","cambiar de tren"]},
{jp:"連絡する",reading:"れんらくする",en:["to contact","to get in touch"],es:["contactar","ponerse en contacto"]},
{jp:"困る",reading:"こまる",en:["to be in trouble","to be at a loss"],es:["estar en un apuro","no saber qué hacer"]},
{jp:"さっき",reading:"さっき",en:["a moment ago","just now"],es:["hace un momento","justo ahora"]},
{jp:"しばらく",reading:"しばらく",en:["for a while","for some time"],es:["un rato","durante un tiempo"]},
{jp:"全部で",reading:"ぜんぶで",en:["in total","altogether"],es:["en total"]},
{jp:"急に",reading:"きゅうに",en:["suddenly"],es:["de repente"]},
{jp:"確かに",reading:"たしかに",en:["certainly","indeed"],es:["ciertamente","desde luego"]},
{jp:"それが……",reading:"それが……",en:["well, the thing is..."],es:["es que...","lo que pasa es que..."]},
{jp:"どうしよう",reading:"どうしよう",en:["What should I do?","What am I going to do?"],es:["¿Qué hago?","¿Qué voy a hacer?"]},
{jp:"本当に",reading:"ほんとうに",en:["really","truly"],es:["de verdad","realmente"]},
{jp:"もう少し",reading:"もうすこし",en:["a little more","a bit longer"],es:["un poco más"]},
{jp:"ゆっくり",reading:"ゆっくり",en:["slowly","at a relaxed pace"],es:["despacio","con calma"]},
{jp:"ゆっくり話してください",reading:"ゆっくりはなしてください",en:["Please speak slowly."],es:["Por favor, hable despacio."]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"5-1",mainTopic:"5",topicTitle:"困ったな……"}));

const DEKIRU_SHOCHUKYU_TOPIC_5_2_WORDS = [
{jp:"コインロッカー",reading:"コインロッカー",en:["coin locker","coin-operated locker"],es:["taquilla de monedas","consigna automática"]},
{jp:"特急",reading:"とっきゅう",en:["limited express train"],es:["tren exprés limitado"]},
{jp:"終点",reading:"しゅうてん",en:["terminal station","last stop"],es:["estación terminal","última parada"]},
{jp:"終電",reading:"しゅうでん",en:["last train of the day"],es:["último tren del día"]},
{jp:"タクシー",reading:"タクシー",en:["taxi"],es:["taxi"]},
{jp:"急行",reading:"きゅうこう",en:["express train"],es:["tren expreso"]},
{jp:"アナウンスする",reading:"アナウンスする",en:["to make an announcement"],es:["anunciar","hacer un anuncio"]},
{jp:"変える",reading:"かえる",en:["to change","to alter"],es:["cambiar","modificar"]},
{jp:"安心する",reading:"あんしんする",en:["to feel relieved","to feel at ease"],es:["tranquilizarse","sentirse aliviado"]},
{jp:"遅刻する",reading:"ちこくする",en:["to be late"],es:["llegar tarde"]},
{jp:"寝坊する",reading:"ねぼうする",en:["to oversleep"],es:["quedarse dormido"]},
{jp:"戻る",reading:"もどる",en:["to return","to go back"],es:["volver","regresar"]},
{jp:"すぐ",reading:"すぐ",en:["immediately","right away","soon"],es:["enseguida","inmediatamente"]},
{jp:"びっくり",reading:"びっくり",en:["surprise","astonishment"],es:["sorpresa","asombro"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"5-2",mainTopic:"5",topicTitle:"駅で"}));


const DEKIRU_SHOCHUKYU_TOPIC_6_1_WORDS = [
{jp:"着物",reading:"きもの",en:["kimono","traditional Japanese clothing"],es:["kimono","ropa tradicional japonesa"]},
{jp:"ショッピングセンター",reading:"ショッピングセンター",en:["shopping center","shopping mall"],es:["centro comercial"]},
{jp:"水族館",reading:"すいぞくかん",en:["aquarium"],es:["acuario"]},
{jp:"スノーボード",reading:"スノーボード",en:["snowboarding","snowboard"],es:["snowboard","tabla de snowboard"]},
{jp:"船",reading:"ふね",en:["ship","boat"],es:["barco"]},
{jp:"雰囲気",reading:"ふんいき",en:["atmosphere","ambience"],es:["ambiente","atmósfera"]},
{jp:"街",reading:"まち",en:["town","city"],es:["ciudad","pueblo"]},
{jp:"こっち",reading:"こっち",en:["this way","here","this one"],es:["por aquí","aquí","este"]},
{jp:"そっち",reading:"そっち",en:["that way","there","that one"],es:["por ahí","ahí","ese"]},
{jp:"市内",reading:"しない",en:["within the city","city area"],es:["dentro de la ciudad","zona urbana"]},
{jp:"最後",reading:"さいご",en:["last","final"],es:["último","final"]},
{jp:"旅館",reading:"りょかん",en:["traditional Japanese inn"],es:["posada tradicional japonesa","ryokan"]},
{jp:"朝食",reading:"ちょうしょく",en:["breakfast"],es:["desayuno"]},
{jp:"夕食",reading:"ゆうしょく",en:["dinner","evening meal"],es:["cena"]},
{jp:"観光地",reading:"かんこうち",en:["tourist attraction","tourist destination"],es:["lugar turístico","destino turístico"]},
{jp:"登山",reading:"とざん",en:["mountain climbing","mountaineering"],es:["alpinismo","excursionismo de montaña"]},
{jp:"虫",reading:"むし",en:["insect","bug"],es:["insecto","bicho"]},
{jp:"宿泊",reading:"しゅくはく",en:["lodging","overnight stay"],es:["alojamiento","pernoctación"]},
{jp:"代金",reading:"だいきん",en:["price","charge","payment"],es:["precio","importe"]},
{jp:"内容",reading:"ないよう",en:["contents","details"],es:["contenido","detalles"]},
{jp:"なし",reading:"なし",en:["without","none"],es:["sin","ninguno"]},
{jp:"値段",reading:"ねだん",en:["price"],es:["precio"]},
{jp:"大人",reading:"おとな",en:["adult"],es:["adulto"]},
{jp:"～付き（例：朝食付き）",reading:"～つき",en:["including ...","with ... included"],es:["con ... incluido"]},
{jp:"～泊～日（例：2泊3日）",reading:"～はく～にち",en:["... nights and ... days"],es:["... noches y ... días"]},
{jp:"～費（例：交通費）",reading:"～ひ",en:["... expenses","... costs"],es:["gastos de ..."]},
{jp:"待ち合わせる",reading:"まちあわせる",en:["to arrange to meet","to meet up"],es:["quedar","reunirse"]},
{jp:"ガイドする",reading:"ガイドする",en:["to guide"],es:["hacer de guía","guiar"]},
{jp:"観光する",reading:"かんこうする",en:["to go sightseeing"],es:["hacer turismo"]},
{jp:"出発する",reading:"しゅっぱつする",en:["to depart","to leave"],es:["partir","salir"]},
{jp:"キャンプする",reading:"キャンプする",en:["to camp","to go camping"],es:["acampar"]},
{jp:"珍しい",reading:"めずらしい",en:["rare","unusual"],es:["raro","poco común"]},
{jp:"伝統的（な）",reading:"でんとうてき（な）",en:["traditional"],es:["tradicional"]},
{jp:"それに",reading:"それに",en:["besides","in addition","moreover"],es:["además"]},
{jp:"どっち",reading:"どっち",en:["which one (of two)","which way"],es:["cuál (de dos)","por dónde"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"6-1",mainTopic:"6",topicTitle:"旅行の計画"}));

const DEKIRU_SHOCHUKYU_TOPIC_6_2_WORDS = [
{jp:"イルカ",reading:"イルカ",en:["dolphin"],es:["delfín"]},
{jp:"ショー",reading:"ショー",en:["show","performance"],es:["espectáculo","show"]},
{jp:"手袋",reading:"てぶくろ",en:["gloves"],es:["guantes"]},
{jp:"マフラー",reading:"マフラー",en:["scarf"],es:["bufanda"]},
{jp:"年末",reading:"ねんまつ",en:["year-end","end of the year"],es:["fin de año"]},
{jp:"ガイドブック",reading:"ガイドブック",en:["guidebook","travel guide"],es:["guía turística"]},
{jp:"パーク",reading:"パーク",en:["park"],es:["parque"]},
{jp:"早割",reading:"はやわり",en:["early-bird discount"],es:["descuento por compra anticipada"]},
{jp:"～中（例：旅行中）",reading:"～ちゅう",en:["during ...","in the middle of ..."],es:["durante ...","en medio de ..."]},
{jp:"取る（休みを取る）",reading:"とる",en:["to take (time off)"],es:["tomarse (días libres)"]},
{jp:"ぬれる",reading:"ぬれる",en:["to get wet"],es:["mojarse"]},
{jp:"用意する",reading:"よういする",en:["to prepare","to get ready"],es:["preparar","disponer"]},
{jp:"伝える",reading:"つたえる",en:["to tell","to convey","to communicate"],es:["transmitir","comunicar"]},
{jp:"コピーする",reading:"コピーする",en:["to copy","to make a copy"],es:["copiar","hacer una copia"]},
{jp:"お願いします",reading:"おねがいします",en:["please","I'd appreciate it"],es:["por favor","se lo agradezco"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"6-2",mainTopic:"6",topicTitle:"旅行の準備"}));

const DEKIRU_SHOCHUKYU_TOPIC_7_1_WORDS = [
{jp:"会議",reading:"かいぎ",en:["meeting","conference"],es:["reunión","conferencia"]},
{jp:"課長",reading:"かちょう",en:["section chief","section manager"],es:["jefe de sección","responsable de sección"]},
{jp:"社長",reading:"しゃちょう",en:["company president","CEO"],es:["presidente de la empresa","director general"]},
{jp:"ご存じ",reading:"ごぞんじ",en:["to know (honorific)","be aware of"],es:["saber (honorífico)","conocer"]},
{jp:"どなた",reading:"どなた",en:["who (polite)"],es:["quién (formal)"]},
{jp:"ミステリー",reading:"ミステリー",en:["mystery","mystery story"],es:["misterio","novela de misterio"]},
{jp:"出身",reading:"しゅっしん",en:["hometown","place of origin"],es:["lugar de origen","procedencia"]},
{jp:"ごろ",reading:"ごろ",en:["around (a time)","approximately"],es:["alrededor de (una hora)","aproximadamente"]},
{jp:"いらっしゃる",reading:"いらっしゃる",en:["to be","to come","to go (honorific)"],es:["estar","venir","ir (honorífico)"]},
{jp:"おっしゃる",reading:"おっしゃる",en:["to say (honorific)"],es:["decir (honorífico)"]},
{jp:"ご覧になる",reading:"ごらんになる",en:["to see","to look at (honorific)"],es:["ver","mirar (honorífico)"]},
{jp:"なさる",reading:"なさる",en:["to do (honorific)"],es:["hacer (honorífico)"]},
{jp:"召し上がる",reading:"めしあがる",en:["to eat","to drink (honorific)"],es:["comer","beber (honorífico)"]},
{jp:"出席・する",reading:"しゅっせきする",en:["to attend","to be present"],es:["asistir","estar presente"]},
{jp:"退院・する",reading:"たいいんする",en:["to leave hospital","to be discharged"],es:["recibir el alta","salir del hospital"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"7-1",mainTopic:"7",topicTitle:"初めての訪問"}));

const DEKIRU_SHOCHUKYU_TOPIC_7_2_WORDS = [
{jp:"パスタ",reading:"パスタ",en:["pasta"],es:["pasta"]},
{jp:"味",reading:"あじ",en:["taste","flavor"],es:["sabor"]},
{jp:"はちみつ",reading:"はちみつ",en:["honey"],es:["miel"]},
{jp:"みそ汁",reading:"みそしる",en:["miso soup"],es:["sopa de miso"]},
{jp:"火",reading:"ひ",en:["heat","flame","fire"],es:["fuego","llama"]},
{jp:"強火",reading:"つよび",en:["high heat"],es:["fuego fuerte"]},
{jp:"弱火",reading:"よわび",en:["low heat"],es:["fuego bajo"]},
{jp:"ルー",reading:"ルー",en:["curry roux","roux"],es:["roux","base para curry"]},
{jp:"グラム",reading:"グラム",en:["gram"],es:["gramo"]},
{jp:"できあがり",reading:"できあがり",en:["finished result","ready","completion"],es:["resultado final","listo","terminación"]},
{jp:"むく",reading:"むく",en:["to peel"],es:["pelar"]},
{jp:"焼く",reading:"やく",en:["to grill","to bake","to roast","to fry"],es:["asar","hornear","freír"]},
{jp:"沸かす",reading:"わかす",en:["to boil (water)"],es:["hervir (agua)"]},
{jp:"冷やす",reading:"ひやす",en:["to cool","to chill"],es:["enfriar"]},
{jp:"煮る",reading:"にる",en:["to simmer","to boil","to stew"],es:["cocer","hervir a fuego lento","guisar"]},
{jp:"ゆでる",reading:"ゆでる",en:["to boil","to cook in boiling water"],es:["hervir","cocer en agua"]},
{jp:"変わる",reading:"かわる",en:["to change","to vary"],es:["cambiar","variar"]},
{jp:"沸騰・する",reading:"ふっとうする",en:["to boil","to come to a boil"],es:["hervir","llegar a ebullición"]},
{jp:"炒める",reading:"いためる",en:["to stir-fry","to sauté"],es:["saltear"]},
{jp:"厚い",reading:"あつい",en:["thick"],es:["grueso","espeso"]},
{jp:"薄い",reading:"うすい",en:["thin","watery","weak (flavor)"],es:["fino","aguado","suave (de sabor)"]},
{jp:"濃い",reading:"こい",en:["strong","浓い","thick","rich (flavor)"],es:["intenso","concentrado","espeso"]},
{jp:"細かい",reading:"こまかい",en:["fine","small","detailed"],es:["fino","pequeño","detallado"]},
{jp:"細い",reading:"ほそい",en:["thin","narrow","slender"],es:["delgado","estrecho"]},
{jp:"弱い",reading:"よわい",en:["weak","low (heat)"],es:["débil","bajo (fuego)"]},
{jp:"まず",reading:"まず",en:["first","to begin with"],es:["primero","para empezar"]},
{jp:"次に",reading:"つぎに",en:["next","then"],es:["después","a continuación"]},
{jp:"最後に",reading:"さいごに",en:["finally","lastly"],es:["por último","finalmente"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"7-2",mainTopic:"7",topicTitle:"一緒に作りましょう"}));

const DEKIRU_SHOCHUKYU_TOPIC_8_1_WORDS = [
{jp:"（お）団子",reading:"（お）だんご",en:["dango","Japanese dumplings"],es:["dango","bolitas japonesas de arroz"]},
{jp:"肉じゃが",reading:"にくじゃが",en:["nikujaga","meat and potato stew"],es:["nikujaga","estofado japonés de carne y patatas"]},
{jp:"湖",reading:"みずうみ",en:["lake"],es:["lago"]},
{jp:"運転手",reading:"うんてんしゅ",en:["driver"],es:["conductor","chofer"]},
{jp:"駅員",reading:"えきいん",en:["station attendant","railway station staff"],es:["empleado de estación","personal ferroviario"]},
{jp:"お巡りさん",reading:"おまわりさん",en:["police officer","policeman"],es:["agente de policía","policía"]},
{jp:"～さん（例：駅員さん）",reading:"～さん",en:["Mr./Ms. ...","polite title for a person"],es:["señor/señora ...","tratamiento respetuoso para una persona"]},
{jp:"送る（車で送る）",reading:"おくる",en:["to take someone (by car)","to give someone a ride"],es:["llevar a alguien en coche","acercar en coche"]},
{jp:"直す",reading:"なおす",en:["to fix","to repair","to correct"],es:["arreglar","reparar","corregir"]},
{jp:"譲る",reading:"ゆずる",en:["to give up","to hand over","to yield"],es:["ceder","entregar","dar paso"]},
{jp:"連れて行く",reading:"つれていく",en:["to take someone along","to take someone somewhere"],es:["llevar a alguien","acompañar a alguien a un lugar"]},
{jp:"教える",reading:"おしえる",en:["to tell","to inform","to teach"],es:["decir","informar","enseñar"]},
{jp:"拾う",reading:"ひろう",en:["to pick up","to find"],es:["recoger","encontrar"]},
{jp:"届ける",reading:"とどける",en:["to deliver","to bring","to report"],es:["entregar","llevar","notificar"]},
{jp:"迎えに来る",reading:"むかえにくる",en:["to come to pick someone up"],es:["venir a recoger a alguien"]},
{jp:"捕る",reading:"とる",en:["to catch","to capture"],es:["capturar","atrapar"]},
{jp:"そんなに",reading:"そんなに",en:["that much","so much","that many"],es:["tanto","tantos"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"8-1",mainTopic:"8",topicTitle:"うれしい出来事"}));

const DEKIRU_SHOCHUKYU_TOPIC_8_2_WORDS = [
{jp:"花瓶",reading:"かびん",en:["vase","flower vase"],es:["jarrón","florero"]},
{jp:"茶碗",reading:"ちゃわん",en:["rice bowl","tea bowl"],es:["cuenco para arroz","cuenco de té"]},
{jp:"机",reading:"つくえ",en:["desk","table"],es:["escritorio","mesa"]},
{jp:"本棚",reading:"ほんだな",en:["bookshelf","bookcase"],es:["estantería","librería"]},
{jp:"近所",reading:"きんじょ",en:["neighborhood","nearby area"],es:["barrio","vecindario"]},
{jp:"～先（例：アルバイト先）",reading:"～さき",en:["place where one works or goes","destination"],es:["lugar de trabajo o actividad","destino"]},
{jp:"教授",reading:"きょうじゅ",en:["professor"],es:["profesor universitario"]},
{jp:"部長",reading:"ぶちょう",en:["department manager","department head"],es:["jefe de departamento","director de sección"]},
{jp:"資料",reading:"しりょう",en:["materials","documents","reference materials"],es:["materiales","documentación"]},
{jp:"いただく",reading:"いただく",en:["to receive (humble)","to eat/drink (humble)"],es:["recibir (humilde)","comer/beber (humilde)"]},
{jp:"くださる",reading:"くださる",en:["to give (honorific)"],es:["dar (honorífico)"]},
{jp:"どういたしまして",reading:"どういたしまして",en:["you're welcome","not at all"],es:["de nada","no hay de qué"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"8-2",mainTopic:"8",topicTitle:"お世話になりました"}));

const DEKIRU_SHOCHUKYU_TOPIC_9_1_WORDS = [
{jp:"裏",reading:"うら",en:["back","reverse","underside"],es:["parte trasera","reverso","parte de abajo"]},
{jp:"紙",reading:"かみ",en:["paper"],es:["papel"]},
{jp:"シフト",reading:"シフト",en:["work shift","shift schedule"],es:["turno","horario de turnos"]},
{jp:"スタッフ",reading:"スタッフ",en:["staff","team member"],es:["personal","miembro del equipo"]},
{jp:"タイムカード",reading:"タイムカード",en:["time card","clock-in card"],es:["tarjeta de fichar","tarjeta de control horario"]},
{jp:"表",reading:"おもて",en:["front","outside","surface"],es:["parte delantera","exterior","superficie"]},
{jp:"ホール",reading:"ホール",en:["dining area","restaurant floor"],es:["sala del restaurante","comedor"]},
{jp:"毎月",reading:"まいつき",en:["every month","monthly"],es:["cada mes","mensualmente"]},
{jp:"髪の毛",reading:"かみのけ",en:["hair","a strand of hair"],es:["pelo","cabello"]},
{jp:"スニーカー",reading:"スニーカー",en:["sneakers","trainers"],es:["zapatillas deportivas"]},
{jp:"隅",reading:"すみ",en:["corner"],es:["esquina","rincón"]},
{jp:"調理場",reading:"ちょうりば",en:["kitchen","food preparation area"],es:["cocina","zona de preparación"]},
{jp:"伝票",reading:"でんぴょう",en:["order slip","bill","receipt"],es:["comanda","nota","recibo"]},
{jp:"道具",reading:"どうぐ",en:["tool","equipment","utensil"],es:["herramienta","equipo","utensilio"]},
{jp:"床",reading:"ゆか",en:["floor"],es:["suelo","piso"]},
{jp:"予定",reading:"よてい",en:["plan","schedule"],es:["plan","horario","予定"]},
{jp:"温度",reading:"おんど",en:["temperature"],es:["temperatura"]},
{jp:"代わり",reading:"かわり",en:["instead","substitute","replacement"],es:["en lugar de","sustituto","reemplazo"]},
{jp:"洗剤",reading:"せんざい",en:["detergent","cleaning agent"],es:["detergente","producto de limpieza"]},
{jp:"都合",reading:"つごう",en:["convenience","availability","circumstances"],es:["conveniencia","disponibilidad","circunstancias"]},
{jp:"マニュアル",reading:"マニュアル",en:["manual","instructions"],es:["manual","instrucciones"]},
{jp:"オーブン",reading:"オーブン",en:["oven"],es:["horno"]},
{jp:"汚れ",reading:"よごれ",en:["dirt","stain","grime"],es:["suciedad","mancha"]},
{jp:"ルール",reading:"ルール",en:["rule","rules"],es:["regla","normas"]},
{jp:"～様（例：お客様）",reading:"～さま",en:["Mr./Ms. ... (honorific)","honorific title for customers"],es:["señor/señora ... (honorífico)","tratamiento honorífico para clientes"]},
{jp:"押す",reading:"おす",en:["to push","to press"],es:["empujar","pulsar"]},
{jp:"断る",reading:"ことわる",en:["to refuse","to turn down"],es:["rechazar","declinar"]},
{jp:"出す（ごみを出す）",reading:"だす",en:["to put out","to take out (the trash)"],es:["sacar","sacar la basura"]},
{jp:"渡す",reading:"わたす",en:["to hand over","to pass"],es:["entregar","pasar"]},
{jp:"着替える",reading:"きがえる",en:["to change clothes"],es:["cambiarse de ropa"]},
{jp:"つける（アクセサリーをつける）",reading:"つける",en:["to put on","to wear (accessories)"],es:["ponerse","llevar (accesorios)"]},
{jp:"おしゃべりする",reading:"おしゃべりする",en:["to chat","to talk"],es:["charlar","conversar"]},
{jp:"チェックする",reading:"チェックする",en:["to check","to inspect"],es:["comprobar","revisar"]},
{jp:"乾く",reading:"かわく",en:["to dry","to become dry"],es:["secarse","estar seco"]},
{jp:"しまう",reading:"しまう",en:["to put away","to store"],es:["guardar","recoger"]},
{jp:"滑る",reading:"すべる",en:["to slip","to slide"],es:["resbalar","deslizarse"]},
{jp:"運ぶ",reading:"はこぶ",en:["to carry","to transport"],es:["llevar","transportar"]},
{jp:"拭く",reading:"ふく",en:["to wipe","to clean by wiping"],es:["limpiar","pasar un paño"]},
{jp:"干す",reading:"ほす",en:["to hang out to dry","to dry"],es:["tender","poner a secar"]},
{jp:"片付ける",reading:"かたづける",en:["to tidy up","to put away"],es:["ordenar","recoger"]},
{jp:"燃える",reading:"もえる",en:["to burn","to be combustible"],es:["arder","ser combustible"]},
{jp:"あいさつする",reading:"あいさつする",en:["to greet","to say hello"],es:["saludar"]},
{jp:"空く",reading:"あく",en:["to become free","to become available","to be empty"],es:["quedar libre","estar disponible","vaciarse"]},
{jp:"上がる",reading:"あがる",en:["to go up","to rise","to finish work (in context)"],es:["subir","aumentar","terminar el turno (según contexto)"]},
{jp:"代わる",reading:"かわる",en:["to take someone's place","to substitute"],es:["sustituir","reemplazar a alguien"]},
{jp:"呼ぶ",reading:"よぶ",en:["to call","to summon"],es:["llamar"]},
{jp:"上げる",reading:"あげる",en:["to raise","to lift"],es:["subir","levantar"]},
{jp:"下げる",reading:"さげる",en:["to lower","to turn down"],es:["bajar","reducir"]},
{jp:"足りる",reading:"たりる",en:["to be enough","to suffice"],es:["bastar","ser suficiente"]},
{jp:"邪魔（な）",reading:"じゃま（な）",en:["in the way","obstructive","a nuisance"],es:["que estorba","molesto","estorbo"]},
{jp:"丁寧（な）",reading:"ていねい（な）",en:["polite","careful","thorough"],es:["educado","cuidadoso","minucioso"]},
{jp:"しっかり",reading:"しっかり",en:["properly","firmly","reliably"],es:["bien","firmemente","de manera fiable"]},
{jp:"絶対に",reading:"ぜったいに",en:["absolutely","definitely","never (with negative)"],es:["absolutamente","sin falta","de ninguna manera (con negación)"]},
{jp:"はっきり",reading:"はっきり",en:["clearly","distinctly"],es:["claramente","con claridad"]},
{jp:"大きな",reading:"おおきな",en:["big","large"],es:["grande"]},
{jp:"引き出し",reading:"ひきだし",en:["drawer"],es:["cajón"]},
{jp:"バター",reading:"バター",en:["butter"],es:["mantequilla"]},
{jp:"鍋",reading:"なべ",en:["pot","cooking pot"],es:["olla"]},
{jp:"瓶",reading:"びん",en:["bottle","jar"],es:["botella","frasco"]},
{jp:"ガス",reading:"ガス",en:["gas"],es:["gas"]},
{jp:"～袋（例：ごみ袋）",reading:"～ぶくろ",en:["bag","sack (counter/compound)"],es:["bolsa","saco (en compuestos)"]},
{jp:"かける（いすにかける）",reading:"かける",en:["to sit down","to sit on a chair"],es:["sentarse","sentarse en una silla"]},
{jp:"決まる",reading:"きまる",en:["to be decided","to be settled"],es:["decidirse","quedar establecido"]},
{jp:"確かめる",reading:"たしかめる",en:["to check","to make sure","to confirm"],es:["comprobar","asegurarse","confirmar"]},
{jp:"注意する",reading:"ちゅういする",en:["to be careful","to warn","to pay attention"],es:["tener cuidado","advertir","prestar atención"]},
{jp:"なくなる",reading:"なくなる",en:["to run out","to be gone","to disappear"],es:["agotarse","acabarse","desaparecer"]},
{jp:"切れる",reading:"きれる",en:["to run out","to be cut","to expire"],es:["agotarse","cortarse","caducar"]},
{jp:"焦げる",reading:"こげる",en:["to burn","to get scorched"],es:["quemarse","chamuscarse"]},
{jp:"壊れる",reading:"こわれる",en:["to break","to stop working"],es:["romperse","estropearse"]},
{jp:"そのままにする",reading:"そのままにする",en:["to leave as it is","to leave unchanged"],es:["dejar tal como está","no tocar"]},
{jp:"並べる",reading:"ならべる",en:["to line up","to arrange","to place in a row"],es:["alinear","colocar en fila","ordenar"]},
{jp:"休憩する",reading:"きゅうけいする",en:["to take a break","to rest"],es:["descansar","tomarse un descanso"]},
{jp:"届く",reading:"とどく",en:["to arrive","to reach","to be delivered"],es:["llegar","alcanzar","ser entregado"]},
{jp:"少々",reading:"しょうしょう",en:["a little","a moment (polite)"],es:["un poco","un momento (formal)"]},
{jp:"お先にどうぞ",reading:"おさきにどうぞ",en:["please go ahead","after you"],es:["adelante, por favor","pase usted primero"]},
{jp:"申し訳ないんですが",reading:"もうしわけないんですが",en:["I'm sorry, but...","I hate to ask, but..."],es:["lo siento, pero...","perdone que se lo pida, pero..."]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"9-1",mainTopic:"9",topicTitle:"アルバイト先のルール"}));

const DEKIRU_SHOCHUKYU_TOPIC_9_2_WORDS = [
{jp:"お手洗い",reading:"おてあらい",en:["restroom","toilet"],es:["baño","servicio"]},
{jp:"ガソリン",reading:"ガソリン",en:["gasoline","petrol"],es:["gasolina"]},
{jp:"ひも",reading:"ひも",en:["string","cord","lace"],es:["cordón","cuerda","cordel"]},
{jp:"袋",reading:"ふくろ",en:["bag","sack"],es:["bolsa","saco"]},
{jp:"モップ",reading:"モップ",en:["mop"],es:["fregona","mopa"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"9-2",mainTopic:"9",topicTitle:"楽しいアルバイト"}));


const DEKIRU_SHOCHUKYU_TOPIC_10_1_WORDS = [
{jp:"おばあさん",reading:"おばあさん",en:["grandmother","elderly woman"],es:["abuela","anciana"]},
{jp:"知らないおばあさん",reading:"しらないおばあさん",en:["a woman you don't know","an unfamiliar elderly woman"],es:["una anciana desconocida","una señora a la que no conoces"]},
{jp:"おじいさん",reading:"おじいさん",en:["grandfather","elderly man"],es:["abuelo","anciano"]},
{jp:"近所のおじいさん",reading:"きんじょのおじいさん",en:["an elderly man from the neighborhood"],es:["un anciano del vecindario","un señor mayor del barrio"]},
{jp:"赤ちゃん",reading:"あかちゃん",en:["baby"],es:["bebé"]},
{jp:"蚊",reading:"か",en:["mosquito"],es:["mosquito"]},
{jp:"係",reading:"かかり",en:["person in charge","staff member"],es:["encargado","persona responsable"]},
{jp:"口紅",reading:"くちべに",en:["lipstick"],es:["pintalabios","labial"]},
{jp:"誰か",reading:"だれか",en:["someone","somebody"],es:["alguien"]},
{jp:"泥棒",reading:"どろぼう",en:["thief","burglar"],es:["ladrón","intruso"]},
{jp:"～点（例：100点）",reading:"～てん",en:["points","score"],es:["puntos","puntuación"]},
{jp:"シングル",reading:"シングル",en:["single room","single"],es:["habitación individual","individual"]},
{jp:"ツイン",reading:"ツイン",en:["twin room"],es:["habitación doble con dos camas"]},
{jp:"フロント",reading:"フロント",en:["front desk","hotel reception"],es:["recepción","mostrador de recepción"]},
{jp:"ところ",reading:"ところ",en:["place","location"],es:["lugar","sitio"]},
{jp:"駅員さんのところ",reading:"えきいんさんのところ",en:["where the station attendant is","the station attendant's place"],es:["donde está el empleado de estación","el lugar del empleado de estación"]},
{jp:"アイスクリーム",reading:"アイスクリーム",en:["ice cream"],es:["helado"]},
{jp:"サンプル",reading:"サンプル",en:["sample"],es:["muestra"]},
{jp:"商品",reading:"しょうひん",en:["product","merchandise"],es:["producto","mercancía"]},
{jp:"まんじゅう",reading:"まんじゅう",en:["manju","Japanese filled bun"],es:["manju","bollo japonés relleno"]},
{jp:"ライブ",reading:"ライブ",en:["live performance","concert"],es:["actuación en directo","concierto"]},
{jp:"ロック",reading:"ロック",en:["rock music"],es:["música rock"]},
{jp:"かむ",reading:"かむ",en:["to bite","to chew"],es:["morder","masticar"]},
{jp:"壊す",reading:"こわす",en:["to break","to damage"],es:["romper","estropear"]},
{jp:"刺す",reading:"さす",en:["to sting","to stab","to prick"],es:["picar","apuñalar","pinchar"]},
{jp:"誘う",reading:"さそう",en:["to invite","to ask someone out"],es:["invitar","proponer salir"]},
{jp:"叱る",reading:"しかる",en:["to scold","to reprimand"],es:["regañar","reprender"]},
{jp:"頼む",reading:"たのむ",en:["to ask","to request","to order"],es:["pedir","solicitar","encargar"]},
{jp:"違う",reading:"ちがう",en:["to be different","to be wrong"],es:["ser diferente","estar equivocado"]},
{jp:"取る",reading:"とる",en:["to take","to get","to score"],es:["tomar","conseguir","obtener (puntos)"]},
{jp:"踏む",reading:"ふむ",en:["to step on","to tread on"],es:["pisar"]},
{jp:"褒める",reading:"ほめる",en:["to praise","to compliment"],es:["elogiar","felicitar"]},
{jp:"招待する",reading:"しょうたいする",en:["to invite"],es:["invitar"]},
{jp:"配る",reading:"くばる",en:["to distribute","to hand out"],es:["repartir","distribuir"]},
{jp:"ぶつかる",reading:"ぶつかる",en:["to bump into","to collide"],es:["chocar","tropezar con"]},
{jp:"撮影する",reading:"さつえいする",en:["to film","to photograph"],es:["filmar","fotografiar"]},
{jp:"発売する",reading:"はつばいする",en:["to release for sale","to put on the market"],es:["poner a la venta","lanzar al mercado"]},
{jp:"注意する",reading:"ちゅういする",en:["to warn","to caution","to pay attention"],es:["advertir","llamar la atención","prestar atención"]},
{jp:"うまい",reading:"うまい",en:["skillful","good at","delicious (casual)"],es:["hábil","bueno en algo","rico (coloquial)"]},
{jp:"いっぱい",reading:"いっぱい",en:["full","a lot","one glass/cup"],es:["lleno","mucho","un vaso/taza"]},
{jp:"あれ？",reading:"あれ",en:["Huh?","That's strange..."],es:["¿Eh?","Qué raro..."]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"10-1",mainTopic:"10",topicTitle:"ハプニング！"}));

const DEKIRU_SHOCHUKYU_TOPIC_10_2_WORDS = [
{jp:"会場",reading:"かいじょう",en:["venue","event site"],es:["recinto","lugar del evento"]},
{jp:"あっち",reading:"あっち",en:["over there (casual)"],es:["por allí","allá (coloquial)"]},
{jp:"お化け屋敷",reading:"おばけやしき",en:["haunted house"],es:["casa encantada","casa del terror"]},
{jp:"向こう",reading:"むこう",en:["over there","the other side","the opposite direction"],es:["allí","al otro lado","en dirección opuesta"]},
{jp:"トラ",reading:"トラ",en:["tiger"],es:["tigre"]},
{jp:"ミルク",reading:"ミルク",en:["milk"],es:["leche"]},
{jp:"屋根",reading:"やね",en:["roof"],es:["tejado","techo"]},
{jp:"鉛筆",reading:"えんぴつ",en:["pencil"],es:["lápiz"]},
{jp:"月",reading:"つき",en:["moon"],es:["luna"]},
{jp:"プロ",reading:"プロ",en:["professional","pro"],es:["profesional"]},
{jp:"モデル",reading:"モデル",en:["model"],es:["modelo"]},
{jp:"多く",reading:"おおく",en:["many","much","a large number"],es:["muchos","mucho","una gran cantidad"]},
{jp:"鏡",reading:"かがみ",en:["mirror"],es:["espejo"]},
{jp:"カタカナ",reading:"カタカナ",en:["katakana"],es:["katakana"]},
{jp:"国際",reading:"こくさい",en:["international"],es:["internacional"]},
{jp:"柔道",reading:"じゅうどう",en:["judo"],es:["judo"]},
{jp:"世界",reading:"せかい",en:["world"],es:["mundo"]},
{jp:"麦",reading:"むぎ",en:["wheat","barley","grain"],es:["trigo","cebada","cereal"]},
{jp:"工場",reading:"こうじょう",en:["factory","plant"],es:["fábrica","planta industrial"]},
{jp:"博物館",reading:"はくぶつかん",en:["museum"],es:["museo"]},
{jp:"ヨーロッパ",reading:"ヨーロッパ",en:["Europe"],es:["Europa"]},
{jp:"おやき",reading:"おやき",en:["oyaki","Japanese stuffed bun"],es:["oyaki","bollo japonés relleno"]},
{jp:"～中（例：世界中）",reading:"～じゅう",en:["throughout ...","all over ..."],es:["por todo ...","en todo ..."]},
{jp:"～時代（例：江戸時代）",reading:"～じだい",en:["... period","... era"],es:["época de ...","era de ..."]},
{jp:"向かう",reading:"むかう",en:["to head toward","to make one's way to"],es:["dirigirse a","ir hacia"]},
{jp:"逃げる",reading:"にげる",en:["to escape","to run away"],es:["escapar","huir"]},
{jp:"生きる",reading:"いきる",en:["to live"],es:["vivir"]},
{jp:"生まれる",reading:"うまれる",en:["to be born"],es:["nacer"]},
{jp:"行う",reading:"おこなう",en:["to carry out","to conduct","to perform"],es:["llevar a cabo","realizar"]},
{jp:"造る",reading:"つくる",en:["to build","to manufacture","to produce"],es:["construir","fabricar","producir"]},
{jp:"開く",reading:"ひらく",en:["to open","to hold (an event)"],es:["abrir","celebrar (un evento)"]},
{jp:"建てる",reading:"たてる",en:["to build","to erect"],es:["construir","levantar"]},
{jp:"発見する",reading:"はっけんする",en:["to discover","to find"],es:["descubrir","encontrar"]},
{jp:"発明する",reading:"はつめいする",en:["to invent"],es:["inventar"]},
{jp:"これから",reading:"これから",en:["from now on","from here"],es:["a partir de ahora","desde aquí"]},
{jp:"～によって",reading:"～によって",en:["by","depending on","due to"],es:["por","dependiendo de","debido a"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"10-2",mainTopic:"10",topicTitle:"ガイドブックを片手に"}));


const DEKIRU_SHOCHUKYU_TOPIC_11_1_WORDS = [
{jp:"彼",reading:"かれ",en:["he","him","boyfriend"],es:["él","novio"]},
{jp:"彼女",reading:"かのじょ",en:["she","her","girlfriend"],es:["ella","novia"]},
{jp:"こと（例：将来のこと）",reading:"こと",en:["thing","matter","about ..."],es:["asunto","cosa","sobre ..."]},
{jp:"興味",reading:"きょうみ",en:["interest"],es:["interés"]},
{jp:"ボランティア",reading:"ボランティア",en:["volunteer","volunteer work"],es:["voluntariado","voluntario"]},
{jp:"物価",reading:"ぶっか",en:["prices","cost of living"],es:["precios","coste de vida"]},
{jp:"敬語",reading:"けいご",en:["honorific language","polite language"],es:["lenguaje honorífico","lenguaje respetuoso"]},
{jp:"文化",reading:"ぶんか",en:["culture"],es:["cultura"]},
{jp:"違い",reading:"ちがい",en:["difference"],es:["diferencia"]},
{jp:"無理",reading:"むり",en:["impossible","unreasonable","too much"],es:["imposible","irrazonable","excesivo"]},
{jp:"無理をする",reading:"むりをする",en:["to overdo it","to push oneself too hard"],es:["forzarse demasiado","exigirse demasiado"]},
{jp:"～代（例：食事代）",reading:"～だい",en:["fee","cost","charge for ..."],es:["coste de ...","gasto de ..."]},
{jp:"持つ",reading:"もつ",en:["to have","to hold","to maintain"],es:["tener","sostener","mantener"]},
{jp:"興味を持つ",reading:"きょうみをもつ",en:["to be interested in"],es:["tener interés en"]},
{jp:"節約する",reading:"せつやくする",en:["to save","to economize"],es:["ahorrar","economizar"]},
{jp:"外食する",reading:"がいしょくする",en:["to eat out"],es:["comer fuera"]},
{jp:"ダイエットする",reading:"ダイエットする",en:["to go on a diet","to diet"],es:["hacer dieta"]},
{jp:"太る",reading:"ふとる",en:["to gain weight","to get fat"],es:["engordar","ganar peso"]},
{jp:"折れる",reading:"おれる",en:["to break","to snap","to be bent"],es:["romperse","partirse","doblarse"]},
{jp:"故障する",reading:"こしょうする",en:["to break down","to malfunction"],es:["averiarse","estropearse"]},
{jp:"学ぶ",reading:"まなぶ",en:["to learn","to study"],es:["aprender","estudiar"]},
{jp:"育てる",reading:"そだてる",en:["to raise","to bring up","to grow"],es:["criar","educar","cultivar"]},
{jp:"研究する",reading:"けんきゅうする",en:["to research","to conduct research"],es:["investigar","realizar una investigación"]},
{jp:"あんまり",reading:"あんまり",en:["not very","not much (usually with a negative)"],es:["no mucho","no demasiado (normalmente con negación)"]},
{jp:"だいたい",reading:"だいたい",en:["mostly","generally","approximately"],es:["por lo general","más o menos","aproximadamente"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"11-1",mainTopic:"11",topicTitle:"慣れてくると"}));

const DEKIRU_SHOCHUKYU_TOPIC_11_2_WORDS = [
{jp:"駅前",reading:"えきまえ",en:["in front of the station","station area"],es:["delante de la estación","zona de la estación"]},
{jp:"具合",reading:"ぐあい",en:["condition","state","how one feels"],es:["estado","condición","cómo se encuentra alguien"]},
{jp:"区役所",reading:"くやくしょ",en:["ward office"],es:["oficina del distrito municipal"]},
{jp:"今夜",reading:"こんや",en:["tonight"],es:["esta noche"]},
{jp:"出張する",reading:"しゅっちょうする",en:["to go on a business trip"],es:["ir de viaje de negocios"]},
{jp:"打つ",reading:"うつ",en:["to hit","to strike","to bat"],es:["golpear","pegar","batear"]},
{jp:"回る",reading:"まわる",en:["to go around","to turn","to visit several places"],es:["dar vueltas","girar","recorrer varios lugares"]},
{jp:"投げる",reading:"なげる",en:["to throw","to toss"],es:["lanzar","tirar"]},
{jp:"あきらめる",reading:"あきらめる",en:["to give up","to abandon"],es:["rendirse","abandonar"]},
{jp:"出張",reading:"しゅっちょう",en:["business trip"],es:["viaje de negocios"]}
].map(w=>({...w,bookId:"dekiru-shochukyu",topic:"11-2",mainTopic:"11",topicTitle:"スポーツチームに入って"}));


// Register vocabulary textbooks independently from their datasets. The intermediate book is ready for content, but intentionally starts empty.
const VOCABULARY_BOOKS = [
  {id:"dekiru-shochukyu",title:"できる日本語初中級",words:[...INITIAL_VOCABULARY_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_1_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_1_2_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_2_1_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_2_2_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_3_1_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_3_2_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_4_1_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_4_2_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_5_1_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_5_2_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_6_1_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_6_2_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_7_1_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_7_2_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_8_1_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_8_2_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_9_1_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_9_2_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_10_1_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_10_2_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_11_1_WORDS,...DEKIRU_SHOCHUKYU_TOPIC_11_2_WORDS]},
  {id:"dekiru-chukyu",title:"できる日本語中級",words:[]}
];
const VOCABULARY_BOOKS_BY_ID = Object.fromEntries(VOCABULARY_BOOKS.map(book=>[book.id,book]));
const WORDS = VOCABULARY_BOOKS.flatMap(book=>book.words);
// ── Kanji dataset and textbook chapters ──────────────────────
const KANJI_CHAPTERS = [{"id":1,"title":"病院へ行こう","chars":["医","薬","病","院","内","科","目","耳","体","色","黄","赤"]},{"id":2,"title":"特技を自慢しよう","chars":["語","英","話","歌","料","理","作","持","足","速","力","元"]},{"id":3,"title":"ルールを学ぼう","chars":["写","真","声","館","教","室","書","図","貸","借","返","冊"]},{"id":4,"title":"紹介しよう","chars":["男","女","子","親","主","夫","妻","若","黒","白","長","短"]},{"id":5,"title":"道を案内しよう","chars":["道","交","番","号","辺","銀","左","右","場","売","工","屋"]},{"id":6,"title":"トラブルを報告しよう","chars":["遅","早","計","合","止","動","質","問","字","漢","知","読"]},{"id":7,"title":"意見を伝えよう","chars":["思","高","安","心","便","利","不","店","同","数","住","働"]},{"id":8,"title":"天気予報を見よう","chars":["雨","雲","雪","晴","風","台","強","弱","低","夜","夕","当"]},{"id":9,"title":"町に出よう、漢字を読もう","chars":["使","中","開","閉","東","西","北","南","口","出","入","立"]},{"id":10,"title":"夏休みの計画を立てよう","chars":["園","客","家","族","鳥","鳴","羽","竹","池","魚","馬","草"]},{"id":11,"title":"ツアーに参加しよう","chars":["発","着","始","終","午","前","後","船","湖","寺","京","都"]},{"id":12,"title":"自然を楽しもう","chars":["然","虫","原","谷","春","夏","秋","冬","空","星","明","暗"]},{"id":13,"title":"料理をしよう","chars":["肉","牛","野","玉","油","味","待","切","飯","米","麦","皿"]},{"id":14,"title":"友達と勉強しよう","chars":["宿","題","正","答","習","練","勉","方","言","文","会"]},{"id":15,"title":"趣味の話をしよう","chars":["歴","史","様","王","音","楽","聞","集","運","通","走","育"]},{"id":16,"title":"買い物しよう","chars":["服","洋","品","衣","糸","毛","細","太","重","軽","丸","光"]},{"id":17,"title":"夢の話をしよう","chars":["化","部","試","験","研","究","門","考","私","自","社"]},{"id":18,"title":"住所を書こう","chars":["宅","荷","送","府","県","市","区","村"]}];
const KANJI_LEVELS = Object.fromEntries(Object.entries(kanji).map(([char,d])=>[char,{jlpt:d.jlpt_new||null,grade:d.grade||null,wk:d.wk_level||null,strokes:d.strokes||null,frequency:d.freq||null,meanings:d.meanings||[],readings_on:d.readings_on||[],readings_kun:d.readings_kun||[]}]))
const KANJI = [{"c":"医","chapter":1,"kun":["いやす","いする","くすし"],"on":["イ"],"en":["doctor","medicine"],"es":["médico","medicina"]},{"c":"薬","chapter":1,"kun":["くすり"],"on":["ヤク"],"en":["medicine","chemical","enamel","gunpowder","benefit"],"es":["medicina","medicamento"]},{"c":"病","chapter":1,"kun":["やむ","やみ","やまい"],"on":["ビョウ","ヘイ"],"en":["ill","sick"],"es":["enfermedad","enfermo"]},{"c":"院","chapter":1,"kun":[],"on":["イン"],"en":["Inst.","institution","temple","mansion","school"],"es":["institución","templo","escuela"]},{"c":"内","chapter":1,"kun":["うち"],"on":["ナイ","ダイ"],"en":["inside","within","between","among","house","home"],"es":["dentro","interior","entre"]},{"c":"科","chapter":1,"kun":[],"on":["カ"],"en":["department","course","section"],"es":["departamento","sección","asignatura"]},{"c":"目","chapter":1,"kun":["め","め","ま"],"on":["モク","ボク"],"en":["eye","class","look","insight","experience","care","favor"],"es":["ojo","clase","mirada"]},{"c":"耳","chapter":1,"kun":["みみ"],"on":["ジ"],"en":["ear"],"es":["oreja","oído"]},{"c":"体","chapter":1,"kun":["からだ","かたち"],"on":["タイ","テイ"],"en":["body","substance","object","reality","counter for images"],"es":["cuerpo","objeto","realidad"]},{"c":"色","chapter":1,"kun":["いろ"],"on":["ショク","シキ"],"en":["color"],"es":["color"]},{"c":"黄","chapter":1,"kun":["き","こ"],"on":["コウ","オウ"],"en":["yellow"],"es":["amarillo"]},{"c":"赤","chapter":1,"kun":["あか","あか","あかい","あからむ","あからめる"],"on":["セキ","シャク"],"en":["red"],"es":["rojo"]},{"c":"語","chapter":2,"kun":["かたる","かたらう"],"on":["ゴ"],"en":["word","speech","language"],"es":["palabra","idioma","lenguaje"]},{"c":"英","chapter":2,"kun":["はなぶさ"],"on":["エイ"],"en":["England","English","hero","outstanding","calyx"],"es":["inglés","Inglaterra","héroe"]},{"c":"話","chapter":2,"kun":["はなす","はなし"],"on":["ワ"],"en":["tale","talk"],"es":["hablar","conversación","relato"]},{"c":"歌","chapter":2,"kun":["うた","うたう"],"on":["カ"],"en":["song","sing"],"es":["canción","cantar"]},{"c":"料","chapter":2,"kun":[],"on":["リョウ"],"en":["fee","materials"],"es":["tarifa","materiales"]},{"c":"理","chapter":2,"kun":["ことわり"],"on":["リ"],"en":["logic","arrangement","reason","justice","truth"],"es":["razón","lógica","verdad"]},{"c":"作","chapter":2,"kun":["つくる","つくり","づくり"],"on":["サク","サ"],"en":["make","production","prepare","build"],"es":["hacer","crear","obra"]},{"c":"持","chapter":2,"kun":["もつ","もち","もてる"],"on":["ジ"],"en":["hold","have"],"es":["tener","sostener"]},{"c":"足","chapter":2,"kun":["あし","たりる","たる","たす"],"on":["ソク"],"en":["leg","foot","be sufficient","counter for pairs of footwear"],"es":["pie","pierna","ser suficiente"]},{"c":"速","chapter":2,"kun":["はやい","はや","はやめる","すみやか"],"on":["ソク"],"en":["quick","fast"],"es":["rápido","veloz"]},{"c":"力","chapter":2,"kun":["ちから"],"on":["リョク","リキ","リイ"],"en":["power","strength","strong","strain","bear up","exert"],"es":["fuerza","poder"]},{"c":"元","chapter":2,"kun":["もと"],"on":["ゲン","ガン"],"en":["beginning","former time","origin"],"es":["origen","principio"]},{"c":"写","chapter":3,"kun":["うつす","うつる","うつ","うつし"],"on":["シャ","ジャ"],"en":["copy","be photographed","describe"],"es":["copiar","fotografiar"]},{"c":"真","chapter":3,"kun":["ま","ま","まこと"],"on":["シン"],"en":["true","reality","Buddhist sect"],"es":["verdadero","realidad"]},{"c":"声","chapter":3,"kun":["こえ","こわ"],"on":["セイ","ショウ"],"en":["voice"],"es":["voz"]},{"c":"館","chapter":3,"kun":["やかた","たて"],"on":["カン"],"en":["building","mansion","large building","palace"],"es":["edificio","palacio"]},{"c":"教","chapter":3,"kun":["おしえる","おそわる"],"on":["キョウ"],"en":["teach","faith","doctrine"],"es":["enseñar","doctrina"]},{"c":"室","chapter":3,"kun":["むろ"],"on":["シツ"],"en":["room","apartment","chamber","greenhouse","cellar"],"es":["habitación","sala"]},{"c":"書","chapter":3,"kun":["かく","がき","がき"],"on":["ショ"],"en":["write"],"es":["escribir"]},{"c":"図","chapter":3,"kun":["え","はかる"],"on":["ズ","ト"],"en":["map","drawing","plan","extraordinary","audacious"],"es":["mapa","dibujo","plan"]},{"c":"貸","chapter":3,"kun":["かす","かし","かし"],"on":["タイ"],"en":["lend"],"es":["prestar"]},{"c":"借","chapter":3,"kun":["かりる"],"on":["シャク"],"en":["borrow","rent"],"es":["pedir prestado","alquilar"]},{"c":"返","chapter":3,"kun":["かえす","かえす","かえる","かえる"],"on":["ヘン"],"en":["return","answer","fade","repay"],"es":["devolver","responder"]},{"c":"冊","chapter":3,"kun":["ふみ"],"on":["サツ","サク"],"en":["tome","counter for books","volume"],"es":["volumen","contador de libros"]},{"c":"男","chapter":4,"kun":["おとこ","お"],"on":["ダン","ナン"],"en":["male"],"es":["hombre","masculino"]},{"c":"女","chapter":4,"kun":["おんな","め"],"on":["ジョ","ニョ","ニョウ"],"en":["woman","female"],"es":["mujer","femenino"]},{"c":"子","chapter":4,"kun":["こ","こ","ね"],"on":["シ","ス","ツ"],"en":["child","sign of the rat","11PM-1AM","first sign of Chinese zodiac"],"es":["niño","hijo"]},{"c":"親","chapter":4,"kun":["おや","おや","したしい","したしむ"],"on":["シン"],"en":["parent","intimacy","relative","familiarity","dealer (cards)"],"es":["padre","progenitor","pariente"]},{"c":"主","chapter":4,"kun":["ぬし","おも","あるじ"],"on":["シュ","ス","シュウ"],"en":["lord","chief","master","main thing","principal"],"es":["principal","amo","dueño"]},{"c":"夫","chapter":4,"kun":["おっと","それ"],"on":["フ","フウ","ブ"],"en":["husband","man"],"es":["marido","hombre"]},{"c":"妻","chapter":4,"kun":["つま"],"on":["サイ"],"en":["wife","spouse"],"es":["esposa"]},{"c":"若","chapter":4,"kun":["わかい","わか","もしくわ","もし","もしくは","ごとし"],"on":["ジャク","ニャク","ニャ"],"en":["young","if","perhaps","possibly","low number","immature"],"es":["joven"]},{"c":"黒","chapter":4,"kun":["くろ","くろずむ","くろい"],"on":["コク"],"en":["black"],"es":["negro"]},{"c":"白","chapter":4,"kun":["しろ","しら","しろい"],"on":["ハク","ビャク"],"en":["white"],"es":["blanco"]},{"c":"長","chapter":4,"kun":["ながい","おさ"],"on":["チョウ"],"en":["long","leader","superior","senior"],"es":["largo","líder","superior"]},{"c":"短","chapter":4,"kun":["みじかい"],"on":["タン"],"en":["short","brevity","fault","defect","weak point"],"es":["corto","breve"]},{"c":"道","chapter":5,"kun":["みち","いう"],"on":["ドウ","トウ"],"en":["road-way","street","district","journey","course","moral","teachings"],"es":["camino","calle","vía"]},{"c":"交","chapter":5,"kun":["まじわる","まじえる","まじる","まじる","まざる","まぜる","かう","かわす","かわす","こもごも"],"on":["コウ"],"en":["mingle","mixing","association","coming & going"],"es":["mezclar","relacionarse"]},{"c":"番","chapter":5,"kun":["つがい"],"on":["バン"],"en":["turn","number in a series"],"es":["número","turno"]},{"c":"号","chapter":5,"kun":["さけぶ","よびな"],"on":["ゴウ"],"en":["nickname","number","item","title","pseudonym","name","call"],"es":["número","nombre","título"]},{"c":"辺","chapter":5,"kun":["あたり","ほとり","べ"],"on":["ヘン"],"en":["environs","boundary","border","vicinity"],"es":["alrededores","frontera"]},{"c":"銀","chapter":5,"kun":["しろがね"],"on":["ギン"],"en":["silver"],"es":["plata"]},{"c":"左","chapter":5,"kun":["ひだり"],"on":["サ","シャ"],"en":["left"],"es":["izquierda"]},{"c":"右","chapter":5,"kun":["みぎ"],"on":["ウ","ユウ"],"en":["right"],"es":["derecha"]},{"c":"場","chapter":5,"kun":["ば"],"on":["ジョウ","チョウ"],"en":["location","place"],"es":["lugar","ubicación"]},{"c":"売","chapter":5,"kun":["うる","うれる"],"on":["バイ"],"en":["sell"],"es":["vender"]},{"c":"工","chapter":5,"kun":[],"on":["コウ","ク","グ"],"en":["craft","construction","katakana e radical (no. 48)"],"es":["construcción","artesanía"]},{"c":"屋","chapter":5,"kun":["や"],"on":["オク"],"en":["roof","house","shop","dealer","seller"],"es":["casa","tienda","techo"]},{"c":"遅","chapter":6,"kun":["おくれる","おくらす","おそい"],"on":["チ"],"en":["slow","late","back","later"],"es":["tarde","lento"]},{"c":"早","chapter":6,"kun":["はやい","はや","はや","はやまる","はやめる","さ"],"on":["ソウ","サッ"],"en":["early","fast"],"es":["temprano","rápido"]},{"c":"計","chapter":6,"kun":["はかる","はからう"],"on":["ケイ"],"en":["plot","plan","scheme","measure"],"es":["medir","plan"]},{"c":"合","chapter":6,"kun":["あう","あう","あい","あい","あい","あい","あわす","あわせる","あわせる"],"on":["ゴウ","ガッ","カッ"],"en":["fit","suit","join","0.1"],"es":["encajar","unir","coincidir"]},{"c":"止","chapter":6,"kun":["とまる","どまり","とめる","とめる","どめ","とどめる","とどめ","とどまる","やめる","やむ","やむ","よす","さす","さし"],"on":["シ"],"en":["stop","halt"],"es":["parar","detener"]},{"c":"動","chapter":6,"kun":["うごく","うごかす"],"on":["ドウ"],"en":["move","motion","change","confusion","shift","shake"],"es":["mover","movimiento"]},{"c":"質","chapter":6,"kun":["たち","ただす","もと","わりふ"],"on":["シツ","シチ","チ"],"en":["substance","quality","matter","temperament"],"es":["calidad","sustancia"]},{"c":"問","chapter":6,"kun":["とう","とい","とん"],"on":["モン"],"en":["question","ask","problem"],"es":["pregunta","preguntar","problema"]},{"c":"字","chapter":6,"kun":["あざ","あざな","な"],"on":["ジ"],"en":["character","letter","word","section of village"],"es":["carácter","letra"]},{"c":"漢","chapter":6,"kun":[],"on":["カン"],"en":["Sino-","China"],"es":["China","chino"]},{"c":"知","chapter":6,"kun":["しる","しらせる"],"on":["チ"],"en":["know","wisdom"],"es":["saber","conocimiento"]},{"c":"読","chapter":6,"kun":["よむ","よみ"],"on":["ドク","トク","トウ"],"en":["read"],"es":["leer"]},{"c":"思","chapter":7,"kun":["おもう","おもえらく","おぼす"],"on":["シ"],"en":["think"],"es":["pensar"]},{"c":"高","chapter":7,"kun":["たかい","たか","だか","たかまる","たかめる"],"on":["コウ"],"en":["tall","high","expensive"],"es":["alto","caro"]},{"c":"安","chapter":7,"kun":["やすい","やすまる","やす","やすらか"],"on":["アン"],"en":["relax","cheap","low","quiet","rested","contented","peaceful"],"es":["barato","tranquilo","seguro"]},{"c":"心","chapter":7,"kun":["こころ","ごころ"],"on":["シン"],"en":["heart","mind","spirit","heart radical (no. 61)"],"es":["corazón","mente"]},{"c":"便","chapter":7,"kun":["たより"],"on":["ベン","ビン"],"en":["convenience","facility","excrement","feces","letter","chance"],"es":["comodidad","correo","ocasión"]},{"c":"利","chapter":7,"kun":["きく"],"on":["リ"],"en":["profit","advantage","benefit"],"es":["beneficio","ventaja"]},{"c":"不","chapter":7,"kun":[],"on":["フ","ブ"],"en":["negative","non-","bad","ugly","clumsy"],"es":["no","negativo"]},{"c":"店","chapter":7,"kun":["みせ","たな"],"on":["テン"],"en":["store","shop"],"es":["tienda"]},{"c":"同","chapter":7,"kun":["おなじ"],"on":["ドウ"],"en":["same","agree","equal"],"es":["igual","mismo"]},{"c":"数","chapter":7,"kun":["かず","かぞえる","しばしば","せめる","わずらわしい"],"on":["スウ","ス","サク","ソク","シュ"],"en":["number","strength","fate","law","figures"],"es":["número","contar"]},{"c":"住","chapter":7,"kun":["すむ","すまう","ずまい"],"on":["ジュウ","ヂュウ","チュウ"],"en":["dwell","reside","live","inhabit"],"es":["vivir","residir"]},{"c":"働","chapter":7,"kun":["はたらく"],"on":["ドウ"],"en":["work","(kokuji)"],"es":["trabajar"]},{"c":"雨","chapter":8,"kun":["あめ","あま","さめ"],"on":["ウ"],"en":["rain"],"es":["lluvia"]},{"c":"雲","chapter":8,"kun":["くも","ぐも"],"on":["ウン"],"en":["cloud"],"es":["nube"]},{"c":"雪","chapter":8,"kun":["ゆき"],"on":["セツ"],"en":["snow"],"es":["nieve"]},{"c":"晴","chapter":8,"kun":["はれる","はれ","はれ","ばれ","はらす"],"on":["セイ"],"en":["clear up"],"es":["despejarse","soleado"]},{"c":"風","chapter":8,"kun":["かぜ","かざ"],"on":["フウ","フ"],"en":["wind","air","style","manner"],"es":["viento","estilo"]},{"c":"台","chapter":8,"kun":["うてな","われ","つかさ"],"on":["ダイ","タイ"],"en":["pedestal","a stand","counter for machines and vehicles"],"es":["soporte","plataforma"]},{"c":"強","chapter":8,"kun":["つよい","つよまる","つよめる","しいる","こわい"],"on":["キョウ","ゴウ"],"en":["strong"],"es":["fuerte"]},{"c":"弱","chapter":8,"kun":["よわい","よわる","よわまる","よわめる"],"on":["ジャク"],"en":["weak","frail"],"es":["débil"]},{"c":"低","chapter":8,"kun":["ひくい","ひくめる","ひくまる"],"on":["テイ"],"en":["lower","short","humble"],"es":["bajo"]},{"c":"夜","chapter":8,"kun":["よ","よる"],"on":["ヤ"],"en":["night","evening"],"es":["noche"]},{"c":"夕","chapter":8,"kun":["ゆう"],"on":["セキ"],"en":["evening"],"es":["atardecer"]},{"c":"当","chapter":8,"kun":["あたる","あたり","あてる","あて","まさに","まさにべし"],"on":["トウ"],"en":["hit","right","appropriate","himself"],"es":["acertar","correcto","apropiado"]},{"c":"使","chapter":9,"kun":["つかう","つかい","つかい","づかい"],"on":["シ"],"en":["use","send on a mission","order","messenger","envoy","ambassador","cause"],"es":["usar","utilizar"]},{"c":"中","chapter":9,"kun":["なか","うち","あたる"],"on":["チュウ"],"en":["in","inside","middle","mean","center"],"es":["dentro","medio","centro"]},{"c":"開","chapter":9,"kun":["ひらく","ひらき","びらき","ひらける","あく","あける"],"on":["カイ"],"en":["open","unfold","unseal"],"es":["abrir"]},{"c":"閉","chapter":9,"kun":["とじる","とざす","しめる","しまる","たてる"],"on":["ヘイ"],"en":["closed","shut"],"es":["cerrar"]},{"c":"東","chapter":9,"kun":["ひがし"],"on":["トウ"],"en":["east"],"es":["este"]},{"c":"西","chapter":9,"kun":["にし"],"on":["セイ","サイ","ス"],"en":["west","Spain"],"es":["oeste"]},{"c":"北","chapter":9,"kun":["きた"],"on":["ホク"],"en":["north"],"es":["norte"]},{"c":"南","chapter":9,"kun":["みなみ"],"on":["ナン","ナ"],"en":["south"],"es":["sur"]},{"c":"口","chapter":9,"kun":["くち"],"on":["コウ","ク"],"en":["mouth"],"es":["boca"]},{"c":"出","chapter":9,"kun":["でる","で","だす","だす","いでる","いだす"],"on":["シュツ","スイ"],"en":["exit","leave","go out","come out","put out","protrude"],"es":["salir","sacar"]},{"c":"入","chapter":9,"kun":["いる","いる","いり","いれる","いれ","はいる"],"on":["ニュウ","ジュ"],"en":["enter","insert"],"es":["entrar","insertar"]},{"c":"立","chapter":9,"kun":["たつ","たつ","たち","たてる","たてる","たて","たて","たて","だて","だてる"],"on":["リツ","リュウ","リットル"],"en":["stand up","rise","set up","erect"],"es":["ponerse de pie","levantar"]},{"c":"園","chapter":10,"kun":["その"],"on":["エン"],"en":["park","garden","yard","farm"],"es":["parque","jardín"]},{"c":"客","chapter":10,"kun":[],"on":["キャク","カク"],"en":["guest","visitor","customer","client"],"es":["invitado","cliente"]},{"c":"家","chapter":10,"kun":["いえ","や","うち"],"on":["カ","ケ"],"en":["house","home","family","professional","expert","performer"],"es":["casa","familia","experto"]},{"c":"族","chapter":10,"kun":[],"on":["ゾク"],"en":["tribe","family"],"es":["familia","tribu"]},{"c":"鳥","chapter":10,"kun":["とり"],"on":["チョウ"],"en":["bird","chicken"],"es":["pájaro","ave"]},{"c":"鳴","chapter":10,"kun":["なく","なる","ならす"],"on":["メイ"],"en":["chirp","cry","bark","sound","ring","echo","honk"],"es":["sonar","piar","llorar"]},{"c":"羽","chapter":10,"kun":["は","わ","はね"],"on":["ウ"],"en":["feathers","counter for birds, rabbits"],"es":["pluma","ala"]},{"c":"竹","chapter":10,"kun":["たけ"],"on":["チク"],"en":["bamboo"],"es":["bambú"]},{"c":"池","chapter":10,"kun":["いけ"],"on":["チ"],"en":["pond","cistern","pool","reservoir"],"es":["estanque"]},{"c":"魚","chapter":10,"kun":["うお","さかな","ざかな"],"on":["ギョ"],"en":["fish"],"es":["pez"]},{"c":"馬","chapter":10,"kun":["うま","ま"],"on":["バ","メ","マ","ボ","モ"],"en":["horse"],"es":["caballo"]},{"c":"草","chapter":10,"kun":["くさ","くさ","ぐさ"],"on":["ソウ"],"en":["grass","weeds","herbs","pasture","write","draft"],"es":["hierba","maleza"]},{"c":"発","chapter":11,"kun":["たつ","あばく","おこる","つかわす","はなつ"],"on":["ハツ","ホツ"],"en":["departure","discharge","publish","emit","start from","disclose","counter for gunshots"],"es":["salida","emitir","publicar","comenzar"]},{"c":"着","chapter":11,"kun":["きる","きせる","つく","つける"],"on":["チャク","ジャク"],"en":["don","arrive","wear","counter for suits of clothing"],"es":["llegar","vestir"]},{"c":"始","chapter":11,"kun":["はじめる","はじめる","はじまる"],"on":["シ"],"en":["commence","begin"],"es":["comenzar"]},{"c":"終","chapter":11,"kun":["おわる","おわる","おわる","おえる","つい","ついに"],"on":["シュウ"],"en":["end","finish"],"es":["terminar","final"]},{"c":"午","chapter":11,"kun":["うま"],"on":["ゴ"],"en":["noon","sign of the horse","11AM-1PM","seventh sign of Chinese zodiac"],"es":["mediodía"]},{"c":"前","chapter":11,"kun":["まえ","まえ"],"on":["ゼン"],"en":["in front","before"],"es":["delante","antes"]},{"c":"後","chapter":11,"kun":["のち","うしろ","うしろ","あと","おくれる"],"on":["ゴ","コウ"],"en":["behind","back","later"],"es":["detrás","después"]},{"c":"船","chapter":11,"kun":["ふね","ふな"],"on":["セン"],"en":["ship","boat"],"es":["barco"]},{"c":"湖","chapter":11,"kun":["みずうみ"],"on":["コ"],"en":["lake"],"es":["lago"]},{"c":"寺","chapter":11,"kun":["てら"],"on":["ジ"],"en":["Buddhist temple"],"es":["templo budista"]},{"c":"京","chapter":11,"kun":["みやこ"],"on":["キョウ","ケイ","キン"],"en":["capital","10**16"],"es":["capital"]},{"c":"都","chapter":11,"kun":["みやこ"],"on":["ト","ツ"],"en":["metropolis","capital","all","everything"],"es":["capital","metrópolis"]},{"c":"然","chapter":12,"kun":["しか","しかり","しかし","さ"],"on":["ゼン","ネン"],"en":["sort of thing","so","if so","in that case","well"],"es":["así","en ese caso"]},{"c":"虫","chapter":12,"kun":["むし"],"on":["チュウ","キ"],"en":["insect","bug","temper"],"es":["insecto","bicho"]},{"c":"原","chapter":12,"kun":["はら"],"on":["ゲン"],"en":["meadow","original","primitive","field","plain","prairie","tundra","wilderness"],"es":["campo","llanura","origen"]},{"c":"谷","chapter":12,"kun":["たに","きわまる"],"on":["コク"],"en":["valley"],"es":["valle"]},{"c":"春","chapter":12,"kun":["はる"],"on":["シュン"],"en":["springtime","spring (season)"],"es":["primavera"]},{"c":"夏","chapter":12,"kun":["なつ"],"on":["カ","ガ","ゲ"],"en":["summer"],"es":["verano"]},{"c":"秋","chapter":12,"kun":["あき","とき"],"on":["シュウ"],"en":["autumn"],"es":["otoño"]},{"c":"冬","chapter":12,"kun":["ふゆ"],"on":["トウ"],"en":["winter"],"es":["invierno"]},{"c":"空","chapter":12,"kun":["そら","あく","あき","あける","から","すく","すかす","むなしい"],"on":["クウ"],"en":["empty","sky","void","vacant","vacuum"],"es":["cielo","vacío"]},{"c":"星","chapter":12,"kun":["ほし","ぼし"],"on":["セイ","ショウ"],"en":["star","spot","dot","mark"],"es":["estrella"]},{"c":"明","chapter":12,"kun":["あかり","あかるい","あかるむ","あからむ","あきらか","あける","あけ","あく","あくる","あかす"],"on":["メイ","ミョウ","ミン"],"en":["bright","light"],"es":["brillante","luz"]},{"c":"暗","chapter":12,"kun":["くらい","くらむ","くれる"],"on":["アン"],"en":["darkness","disappear","shade","informal","grow dark","be blinded"],"es":["oscuro","oscuridad"]},{"c":"肉","chapter":13,"kun":["しし"],"on":["ニク"],"en":["meat"],"es":["carne"]},{"c":"牛","chapter":13,"kun":["うし"],"on":["ギュウ"],"en":["cow"],"es":["vaca","ternera"]},{"c":"野","chapter":13,"kun":["の","の"],"on":["ヤ","ショ"],"en":["plains","field","rustic","civilian life"],"es":["campo","llanura"]},{"c":"玉","chapter":13,"kun":["たま","たま","だま"],"on":["ギョク"],"en":["jewel","ball"],"es":["bola","joya"]},{"c":"油","chapter":13,"kun":["あぶら"],"on":["ユ","ユウ"],"en":["oil","fat"],"es":["aceite","grasa"]},{"c":"味","chapter":13,"kun":["あじ","あじわう"],"on":["ミ"],"en":["flavor","taste"],"es":["sabor"]},{"c":"待","chapter":13,"kun":["まつ","まち"],"on":["タイ"],"en":["wait","depend on"],"es":["esperar"]},{"c":"切","chapter":13,"kun":["きる","きる","きり","きり","ぎり","きれる","きれる","きれ","きれ","ぎれ"],"on":["セツ","サイ"],"en":["cut","cutoff","be sharp"],"es":["cortar"]},{"c":"飯","chapter":13,"kun":["めし"],"on":["ハン"],"en":["meal","boiled rice"],"es":["comida","arroz cocido"]},{"c":"米","chapter":13,"kun":["こめ","よね"],"on":["ベイ","マイ","メエトル"],"en":["rice","USA","metre"],"es":["arroz","Estados Unidos"]},{"c":"麦","chapter":13,"kun":["むぎ"],"on":["バク"],"en":["barley","wheat"],"es":["trigo","cebada"]},{"c":"皿","chapter":13,"kun":["さら"],"on":["ベイ"],"en":["dish","a helping","plate"],"es":["plato"]},{"c":"宿","chapter":14,"kun":["やど","やどる","やどす"],"on":["シュク"],"en":["inn","lodging","relay station","dwell","lodge","be pregnant","home","dwelling"],"es":["alojamiento","posada"]},{"c":"題","chapter":14,"kun":[],"on":["ダイ"],"en":["topic","subject"],"es":["tema","asunto"]},{"c":"正","chapter":14,"kun":["ただしい","ただす","まさ","まさに"],"on":["セイ","ショウ"],"en":["correct","justice","righteous","10**40"],"es":["correcto","justicia"]},{"c":"答","chapter":14,"kun":["こたえる","こたえ"],"on":["トウ"],"en":["solution","answer"],"es":["respuesta","responder"]},{"c":"習","chapter":14,"kun":["ならう","ならい"],"on":["シュウ","ジュ"],"en":["learn"],"es":["aprender","practicar"]},{"c":"練","chapter":14,"kun":["ねる","ねり"],"on":["レン"],"en":["practice","gloss","train","drill","polish","refine"],"es":["entrenar","practicar","perfeccionar"]},{"c":"勉","chapter":14,"kun":["つとめる"],"on":["ベン"],"en":["exertion","endeavour","encourage","strive","make effort","diligent"],"es":["esforzarse","esfuerzo"]},{"c":"方","chapter":14,"kun":["かた","かた","がた"],"on":["ホウ"],"en":["direction","person","alternative"],"es":["dirección","persona","manera"]},{"c":"言","chapter":14,"kun":["いう","こと"],"on":["ゲン","ゴン"],"en":["say","word"],"es":["decir","palabra"]},{"c":"文","chapter":14,"kun":["ふみ","あや"],"on":["ブン","モン"],"en":["sentence","literature","style","art","decoration","figures","plan","literary radical (no. 67)"],"es":["frase","literatura"]},{"c":"会","chapter":14,"kun":["あう","あわせる","あつまる"],"on":["カイ","エ"],"en":["meeting","meet","party","association","interview","join"],"es":["reunión","encontrarse"]},{"c":"歴","chapter":15,"kun":[],"on":["レキ","レッキ"],"en":["curriculum","continuation","passage of time"],"es":["historia","paso del tiempo"]},{"c":"史","chapter":15,"kun":[],"on":["シ"],"en":["history","chronicle"],"es":["historia","crónica"]},{"c":"様","chapter":15,"kun":["さま","さん"],"on":["ヨウ","ショウ"],"en":["Esq.","way","manner","situation","polite suffix"],"es":["manera","estado","sufijo cortés"]},{"c":"王","chapter":15,"kun":[],"on":["オウ","ノウ"],"en":["king","rule","magnate"],"es":["rey"]},{"c":"音","chapter":15,"kun":["おと","ね"],"on":["オン","イン","ノン"],"en":["sound","noise"],"es":["sonido"]},{"c":"楽","chapter":15,"kun":["たのしい","たのしむ","このむ"],"on":["ガク","ラク","ゴウ"],"en":["music","comfort","ease"],"es":["música","diversión","comodidad"]},{"c":"聞","chapter":15,"kun":["きく","きこえる"],"on":["ブン","モン"],"en":["hear","ask","listen"],"es":["oír","escuchar","preguntar"]},{"c":"集","chapter":15,"kun":["あつまる","あつめる","つどう"],"on":["シュウ"],"en":["gather","meet","congregate","swarm","flock"],"es":["reunir","reunirse"]},{"c":"運","chapter":15,"kun":["はこぶ"],"on":["ウン"],"en":["carry","luck","destiny","fate","lot","transport","progress","advance"],"es":["transportar","suerte"]},{"c":"通","chapter":15,"kun":["とおる","とおり","とおり","どおり","とおす","とおし","どおし","かよう"],"on":["ツウ","ツ"],"en":["traffic","pass through","avenue","commute","counter for letters, notes, documents, etc."],"es":["pasar","atravesar","tráfico"]},{"c":"走","chapter":15,"kun":["はしる"],"on":["ソウ"],"en":["run"],"es":["correr"]},{"c":"育","chapter":15,"kun":["そだつ","そだち","そだてる","はぐくむ"],"on":["イク"],"en":["bring up","grow up","raise","rear"],"es":["criar","crecer","educar"]},{"c":"服","chapter":16,"kun":[],"on":["フク"],"en":["clothing","admit","obey","discharge"],"es":["ropa","obedecer"]},{"c":"洋","chapter":16,"kun":[],"on":["ヨウ"],"en":["ocean","sea","foreign","Western style"],"es":["océano","occidental"]},{"c":"品","chapter":16,"kun":["しな"],"on":["ヒン","ホン"],"en":["goods","refinement","dignity","article","counter for meal courses"],"es":["producto","artículo","calidad"]},{"c":"衣","chapter":16,"kun":["ころも","きぬ","ぎ"],"on":["イ","エ"],"en":["garment","clothes","dressing"],"es":["ropa","vestimenta"]},{"c":"糸","chapter":16,"kun":["いと"],"on":["シ"],"en":["thread"],"es":["hilo"]},{"c":"毛","chapter":16,"kun":["け"],"on":["モウ"],"en":["fur","hair","feather","down"],"es":["pelo","pelaje"]},{"c":"細","chapter":16,"kun":["ほそい","ほそる","こまか","こまかい"],"on":["サイ"],"en":["dainty","get thin","taper","slender","narrow","detailed","precise"],"es":["delgado","estrecho","detallado"]},{"c":"太","chapter":16,"kun":["ふとい","ふとる"],"on":["タイ","タ"],"en":["plump","thick","big around"],"es":["grueso","gordo"]},{"c":"重","chapter":16,"kun":["え","おもい","おもり","おもなう","かさねる","かさなる","おも"],"on":["ジュウ","チョウ"],"en":["heavy","important","esteem","respect","heap up","pile up","nest of boxes","-fold"],"es":["pesado","importante"]},{"c":"軽","chapter":16,"kun":["かるい","かろやか","かろんじる"],"on":["ケイ","キョウ","キン"],"en":["lightly","trifling","unimportant"],"es":["ligero","liviano"]},{"c":"丸","chapter":16,"kun":["まる","まるめる","まるい"],"on":["ガン"],"en":["round","full (month)","perfection","-ship","pills","make round","roll up","curl up","seduce","explain away"],"es":["redondo","círculo"]},{"c":"光","chapter":16,"kun":["ひかる","ひかり"],"on":["コウ"],"en":["ray","light"],"es":["luz","resplandor"]},{"c":"化","chapter":17,"kun":["ばける","ばかす","ふける","けする"],"on":["カ","ケ"],"en":["change","take the form of","influence","enchant","delude","-ization"],"es":["cambiar","transformar"]},{"c":"部","chapter":17,"kun":["べ"],"on":["ブ"],"en":["section","bureau","dept","class","copy","part","portion","counter for copies of a newspaper or magazine"],"es":["parte","sección","departamento"]},{"c":"試","chapter":17,"kun":["こころみる","ためす"],"on":["シ"],"en":["test","try","attempt","experiment","ordeal"],"es":["probar","examen"]},{"c":"験","chapter":17,"kun":["あかし","しるし","ためす","ためし"],"on":["ケン","ゲン"],"en":["verification","effect","testing"],"es":["prueba","verificación"]},{"c":"研","chapter":17,"kun":["とぐ"],"on":["ケン"],"en":["polish","study of","sharpen"],"es":["pulir","estudiar"]},{"c":"究","chapter":17,"kun":["きわめる"],"on":["キュウ","ク"],"en":["research","study"],"es":["investigar"]},{"c":"門","chapter":17,"kun":["かど","と"],"on":["モン"],"en":["gate","counter for cannons"],"es":["puerta"]},{"c":"考","chapter":17,"kun":["かんがえる","かんがえ"],"on":["コウ"],"en":["consider","think over"],"es":["pensar","considerar"]},{"c":"私","chapter":17,"kun":["わたくし","わたし"],"on":["シ"],"en":["private","I","me"],"es":["yo","privado"]},{"c":"自","chapter":17,"kun":["みずから","おのずから","おのずと"],"on":["ジ","シ"],"en":["oneself"],"es":["uno mismo"]},{"c":"社","chapter":17,"kun":["やしろ"],"on":["シャ"],"en":["company","firm","office","association","shrine"],"es":["empresa","compañía","santuario"]},{"c":"宅","chapter":18,"kun":[],"on":["タク"],"en":["home","house","residence","our house","my husband"],"es":["casa","residencia"]},{"c":"荷","chapter":18,"kun":["に"],"on":["カ"],"en":["baggage","shoulder-pole load","bear (a burden)","shoulder (a gun)","load","cargo","freight"],"es":["equipaje","carga"]},{"c":"送","chapter":18,"kun":["おくる"],"on":["ソウ"],"en":["escort","send"],"es":["enviar","acompañar"]},{"c":"府","chapter":18,"kun":[],"on":["フ"],"en":["borough","urban prefecture","govt office","representative body","storehouse"],"es":["prefectura","oficina gubernamental"]},{"c":"県","chapter":18,"kun":["かける"],"on":["ケン"],"en":["prefecture"],"es":["prefectura"]},{"c":"市","chapter":18,"kun":["いち"],"on":["シ"],"en":["market","city","town"],"es":["ciudad","mercado"]},{"c":"区","chapter":18,"kun":[],"on":["ク","オウ","コウ"],"en":["ward","district"],"es":["distrito","barrio"]},{"c":"村","chapter":18,"kun":["むら"],"on":["ソン"],"en":["village","town"],"es":["pueblo","aldea"]}];
KANJI.forEach(k=>{const d=KANJI_LEVELS[k.c]||{};k.jlpt=d.jlpt||null;k.grade=d.grade||null;k.strokes=d.strokes||null;k.frequency=d.frequency||null;k.meanings=d.meanings||[];k.datasetOn=d.readings_on||[];k.datasetKun=d.readings_kun||[]});
function kanaUnitCards(deck){const source=deck==="hiragana"?hiragana:katanaka;return source.map(k=>({jp:k.kana,reading:k.roumaji,key:"kana:"+deck+":"+k.kana,answers:[k.roumaji],kanaType:k.type,deck,unitKey:"kana-"+deck,jlpt:null}))}
function kanaMastery(deck){return unitMastery(kanaUnitCards(deck))}
function katakanaUnlocked(){return kanaMastery("hiragana")>=.8}
function kanjiUnlocked(){return katakanaUnlocked()&&kanaMastery("katakana")>=.8}
// Normalize accents/case/punctuation and tolerate a single typo for most short answers.
function norm(s){return String(s).normalize("NFD").replace(/([\p{Script=Latin}])\p{M}+/gu,"$1").toLocaleLowerCase().replace(/ß/g,"ss").replace(/～/g,"").replace(/[^\p{L}\p{N}]+/gu," ").trim().replace(/\s+/g," ")}
function distance(a,b){const prev=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let diagonal=prev[0];prev[0]=i;for(let j=1;j<=b.length;j++){const old=prev[j];prev[j]=Math.min(prev[j]+1,prev[j-1]+1,diagonal+(a[i-1]===b[j-1]?0:1));diagonal=old}}return prev[b.length]}
function matches(input,answers){const v=norm(input);if(!v)return false;return answers.some(a=>{const target=norm(a);if(v===target)return true;if(Math.min(v.length,target.length)<5)return false;return distance(v,target)<= (Math.max(v.length,target.length)>=9?2:1)})}
function matchesExact(input,answers){const value=norm(input);return !!value&&(answers||[]).some(answer=>norm(answer)===value)}
function showTypoFeedback(input,expected){const el=document.getElementById("feedback");el.replaceChildren();el.className="feedback typo-feedback";el.style.whiteSpace="normal";const title=document.createElement("div");title.textContent="Accepted as correct, but there is a minor typo.";const comparison=document.createElement("div");comparison.className="typo-comparison";const makeDiff=(source,target,showExtra)=>{const a=Array.from(source),b=Array.from(target),m=a.length,n=b.length,dp=Array.from({length:m+1},()=>Array(n+1).fill(0));for(let i=0;i<=m;i++)dp[i][0]=i;for(let j=0;j<=n;j++)dp[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(norm(a[i-1])===norm(b[j-1])?0:1));const ops=[];let i=m,j=n;while(i||j){if(i&&j&&dp[i][j]===dp[i-1][j-1]+(norm(a[i-1])===norm(b[j-1])?0:1)){ops.unshift({type:norm(a[i-1])===norm(b[j-1])?"same":"change",a:a[i-1],b:b[j-1]});i--;j--}else if(i&&dp[i][j]===dp[i-1][j]+1){ops.unshift({type:"extra",a:a[i-1]});i--}else{ops.unshift({type:"missing",b:b[j-1]});j--}}const out=document.createElement("span");out.className="typo-typed";for(const op of ops){if(op.type==="same"){out.append(document.createTextNode(op.a))}else if(op.type==="extra"){const mark=document.createElement("span");mark.className="typo-extra";mark.textContent=op.a;out.append(mark)}else if(op.type==="missing"){const mark=document.createElement("span");mark.className="typo-missing";mark.textContent=op.b;out.append(mark)}else{const mark=document.createElement("span");mark.className="typo-extra";mark.textContent=op.a;out.append(mark);const expectedMark=document.createElement("span");expectedMark.className="typo-missing";expectedMark.textContent=op.b;out.append(expectedMark)}}return out};comparison.append(makeDiff(input,expected,true));el.append(title,comparison);}
// ── Persistence and card state ──────────────────────────────
const KEY="kaado-isi-campaign-v2",SYNONYMS_KEY="kaado-isi-local-synonyms-v1",ANSWER_HISTORY_KEY="kaado-isi-answer-history-v1";// Keep any legacy progress key untouched; this version uses its own storage key.
let store={};try{store=JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch{}let localSynonyms={};try{localSynonyms=JSON.parse(localStorage.getItem(SYNONYMS_KEY)||"{}")||{}}catch{}let answerHistory=[];try{answerHistory=JSON.parse(localStorage.getItem(ANSWER_HISTORY_KEY)||"[]");if(!Array.isArray(answerHistory))answerHistory=[]}catch{}
function state(w){const key=w.key||w.jp;if(key.startsWith("kanji:")&&!key.includes(":kun")&&!key.includes(":on")&&!key.includes(":translation")&&!store[key]){const char=key.slice("kanji:".length),entry=KANJI.find(k=>k.c===char);if(entry){const legacyKeys=[...(entry.kun.length?["kanji:"+char+":kun"]:[]),...(entry.on.length?["kanji:"+char+":on"]:[]),"kanji:"+char+":translation"];const all=legacyKeys.map(k=>KaadoSRS.normalizeState(store[k],k));if(all.some(v=>v.seen>0||v.stage>0)){const stage=Math.min(...all.map(v=>v.stage)),chosen=all.filter(v=>v.stage===stage);return KaadoSRS.normalizeState({stage,seen:Math.max(...all.map(v=>v.seen)),reps:Math.min(...all.map(v=>v.reps)),interval:Math.min(...chosen.map(v=>v.interval)),due:Math.min(...chosen.map(v=>v.due)),lastReview:Math.max(...all.map(v=>v.lastReview))},w)}}}return KaadoSRS.normalizeState(store[key],w)}
function save(){try{localStorage.setItem(KEY,JSON.stringify(store))}catch{const msg=document.getElementById("progressMessage");if(msg)msg.textContent="Could not save in this browser."}scheduleCloudSave();renderStats()}
function saveLocalSynonyms(){try{localStorage.setItem(SYNONYMS_KEY,JSON.stringify(localSynonyms))}catch{const msg=document.getElementById("progressMessage");if(msg)msg.textContent="Could not save the synonym in this browser."}scheduleCloudSave();renderLocalSynonymsList()}

let cloudSyncTimer=null,cloudUser=null,cloudSyncBusy=false,cloudSyncQueued=false,cloudReady=false,lastCloudSyncAt=null;
function cloudClient(){return window.KAADO_SUPABASE||null}
function setAppAccess(allowed){document.body.classList.toggle("app-locked",!allowed)}
function formatSyncTime(date){return date?date.toLocaleString(undefined,{dateStyle:"medium",timeStyle:"short"}):"Not synced yet"}
function accountMessage(message,isError=false){const el=document.getElementById("accountMessage");if(el){el.textContent=message;el.classList.toggle("error",isError);el.classList.toggle("success",!isError&&!!message)}}
function accountStatus(){const email=document.getElementById("accountEmail"),password=document.getElementById("accountPassword"),signed=document.getElementById("accountSignedIn"),form=document.getElementById("accountForm"),logout=document.getElementById("accountLogout"),sync=document.getElementById("accountSyncStatus");if(!email)return;const client=cloudClient();document.getElementById("accountSetupWarning").classList.toggle("hidden",!!client);form.classList.toggle("hidden",!client||!!cloudUser);signed.classList.toggle("hidden",!cloudUser);logout.classList.toggle("hidden",!cloudUser);if(cloudUser){document.getElementById("accountUserEmail").textContent=cloudUser.user_metadata?.username||cloudUser.user_metadata?.full_name||cloudUser.email||"Signed in";sync.textContent=cloudReady?"Last synced · "+formatSyncTime(lastCloudSyncAt):"Syncing cloud data…";email.value="";password.value=""}else if(client)sync.textContent="Not signed in";else sync.textContent="Cloud setup required"}
function cloudSnapshot(){return {version:1,progress:store,localSynonyms,answerHistory}}
function scheduleCloudSave(){if(!cloudUser||!cloudClient())return;cloudSyncQueued=true;clearTimeout(cloudSyncTimer);cloudSyncTimer=setTimeout(flushCloudSave,1200)}
async function flushCloudSave(){const client=cloudClient();if(!client||!cloudUser||cloudSyncBusy||!cloudSyncQueued)return;cloudSyncBusy=true;cloudSyncQueued=false;const snapshot=cloudSnapshot();const sync=document.getElementById("accountSyncStatus");if(sync)sync.textContent="Syncing…";try{const {error}=await client.from("user_data").upsert({user_id:cloudUser.id,data:snapshot,updated_at:new Date().toISOString()},{onConflict:"user_id"});if(error)throw error;lastCloudSyncAt=new Date();if(sync)sync.textContent="Last synced · "+formatSyncTime(lastCloudSyncAt)}catch(error){accountMessage("Cloud sync failed: "+(error.message||"Unknown error")+". Changes may not be available on other devices.",true);if(sync)sync.textContent="Sync error · "+formatSyncTime(lastCloudSyncAt)}finally{cloudSyncBusy=false;if(cloudSyncQueued)setTimeout(flushCloudSave,200)}}
async function loadCloudData(user){const client=cloudClient();if(!client||!user)return;accountMessage("Loading your account data…");try{const {data,error}=await client.from("user_data").select("data").eq("user_id",user.id).maybeSingle();if(error)throw error;if(data&&data.data&&typeof data.data==="object"){const snapshot=data.data;if(snapshot.version!==1)throw new Error("Unsupported saved-data version. Local data has not been changed.");store=snapshot.progress&&typeof snapshot.progress==="object"?snapshot.progress:{};localSynonyms=snapshot.localSynonyms&&typeof snapshot.localSynonyms==="object"?snapshot.localSynonyms:{};answerHistory=Array.isArray(snapshot.answerHistory)?snapshot.answerHistory:[];localStorage.setItem(KEY,JSON.stringify(store));localStorage.setItem(SYNONYMS_KEY,JSON.stringify(localSynonyms));localStorage.setItem(ANSWER_HISTORY_KEY,JSON.stringify(answerHistory));scheduleCloudSave();buildQueue();renderStats();renderList();renderLocalSynonymsList();updateCampaign();accountMessage("Your cloud progress has been loaded on this device.")}else{await flushInitialCloudSave();accountMessage("Account ready. This device’s existing progress was uploaded to your new account.")}cloudReady=true;lastCloudSyncAt=new Date();setAppAccess(true);accountStatus()}catch(error){cloudReady=false;setAppAccess(false);accountStatus();accountMessage("Could not synchronize your account data: "+(error.message||"Unknown error")+". The study content remains locked until synchronization succeeds.",true)}finally{}}
async function flushInitialCloudSave(){const client=cloudClient();if(!client||!cloudUser)return;const {error}=await client.from("user_data").upsert({user_id:cloudUser.id,data:cloudSnapshot(),updated_at:new Date().toISOString()},{onConflict:"user_id"});if(error)throw error}
async function initCloudAccount(){const client=cloudClient();const form=document.getElementById("accountForm");if(!form)return;setAppAccess(false);accountStatus();if(!client){accountMessage("Cloud authentication is not configured. Contact the site administrator.");return;}form.addEventListener("submit",async event=>{event.preventDefault();const email=document.getElementById("accountEmail").value.trim(),password=document.getElementById("accountPassword").value,mode=document.getElementById("accountMode").value;const submit=document.getElementById("accountSubmit");submit.disabled=true;accountMessage(mode==="signup"?"Creating account…":"Signing in…");try{if(mode==="signup"){const {data,error}=await client.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}});if(error)throw error;if(data.session){accountMessage("Account created. Signing in and preparing sync…")}else{accountMessage("Account created. Check your email to confirm it, then sign in.")}}else{const {error}=await client.auth.signInWithPassword({email,password});if(error)throw error;accountMessage("Signed in. Loading saved progress…")}}catch(error){accountMessage(error.message||"Authentication failed.",true)}finally{submit.disabled=false}});document.getElementById("accountMode").addEventListener("change",()=>{const signup=document.getElementById("accountMode").value==="signup";document.getElementById("accountSubmit").textContent=signup?"Create account":"Log in";document.getElementById("accountHeading").textContent=signup?"Register":"Log in";document.getElementById("accountPassword").autocomplete=signup?"new-password":"current-password"});document.getElementById("accountForgot").addEventListener("click",async()=>{const email=document.getElementById("accountEmail").value.trim();if(!email){accountMessage("Enter your email address first.",true);return}try{const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});if(error)throw error;accountMessage("If the address is registered, a password-reset email will be sent.")}catch(error){accountMessage(error.message||"Could not request password reset.",true)}});document.getElementById("accountLogout").addEventListener("click",async()=>{if(cloudUser&&cloudClient())await flushCloudSave();const {error}=await client.auth.signOut();if(error){accountMessage(error.message,true);return}cloudUser=null;cloudReady=false;lastCloudSyncAt=null;setAppAccess(false);accountStatus();accountMessage("Logged out. Sign in again to access study content.")});client.auth.onAuthStateChange((event,session)=>{if(event==="PASSWORD_RECOVERY"){setTimeout(async()=>{const nextPassword=prompt("Enter a new password (at least 8 characters):");if(!nextPassword)return;if(nextPassword.length<8){accountMessage("Password must be at least 8 characters.",true);return}const {error}=await client.auth.updateUser({password:nextPassword});if(error)accountMessage(error.message||"Could not update password.",true);else accountMessage("Password updated. You can continue using Kaado ISI.")},0)}const nextUser=session?.user||null;if(nextUser?.id===cloudUser?.id){accountStatus();return}cloudUser=nextUser;cloudReady=false;lastCloudSyncAt=null;setAppAccess(false);accountStatus();if(cloudUser){accountMessage("Syncing your account data…");setTimeout(()=>loadCloudData(cloudUser),0)}else if(event==="SIGNED_OUT"){accountMessage("Logged out. Sign in again to access study content.")}});const {data}=await client.auth.getSession();if(data.session?.user){cloudUser=data.session.user;cloudReady=false;setAppAccess(false);accountStatus();await loadCloudData(cloudUser)}}


function cardSynonyms(card){return Array.isArray(localSynonyms[card.key||card.jp])?localSynonyms[card.key||card.jp]:[]}
function isTranslationCard(card){return card?.type==="vocab"||(card?.type==="kanji"&&card.mode==="translation")}
function renderLocalSynonymsList(){const el=document.getElementById("localSynonymsList");if(!el)return;el.innerHTML="";const labels=new Map(manualProgressCards().map(c=>[c.key,c.title]));const entries=Object.entries(localSynonyms).flatMap(([key,values])=>(Array.isArray(values)?values:[]).map((value,index)=>({key,value,index})));if(!entries.length){const empty=document.createElement("div");empty.className="manual-progress-empty";empty.textContent="No local synonyms have been saved yet.";el.append(empty);return}entries.forEach(entry=>{const row=document.createElement("div");row.className="local-synonym-row";const info=document.createElement("div"),value=document.createElement("strong"),card=document.createElement("div");value.textContent=entry.value;card.className="manual-progress-detail";card.textContent="For: "+(labels.get(entry.key)||entry.key);info.append(value,card);const remove=document.createElement("button");remove.type="button";remove.textContent="Remove";remove.addEventListener("click",()=>{const values=Array.isArray(localSynonyms[entry.key])?localSynonyms[entry.key]:[];values.splice(entry.index,1);if(values.length)localSynonyms[entry.key]=values;else delete localSynonyms[entry.key];saveLocalSynonyms();const msg=document.getElementById("progressMessage");if(msg)msg.textContent="Local synonym removed."});row.append(info,remove);el.append(row)})}
function addCurrentSynonym(){if(!current||!isTranslationCard(current))return;const input=document.getElementById("answerInput"),value=input.value.trim();if(!value)return;const key=current.key||current.jp;if(!confirm("Save “"+value+"” as a local synonym for "+current.jp+"? This will be accepted as a valid answer for this card in this browser."))return;const values=cardSynonyms(current);if(!values.some(v=>norm(v)===norm(value)))values.push(value);localSynonyms[key]=values;saveLocalSynonyms();checked=true;sessionSeen++;sessionCorrect++;sessionAttempts++;sessionHits++;reviewOutcomes.push(true);renderReviewProgress();document.getElementById("checkBtn").classList.add("hidden");document.getElementById("revealBtn").classList.add("hidden");document.getElementById("saveSynonymBtn").classList.add("hidden");document.getElementById("nextBtn").classList.remove("hidden");recordAnswer(true,0);feedback("Synonym saved in this browser. It is now accepted as a valid answer for this card.", "good")}

let queue=[],index=0,sessionSeen=0,sessionCorrect=0,sessionAttempts=0,sessionHits=0,reviewOutcomes=[],checked=false,revealed=false,wrongAttempts=0,current=null,currentEntry=null,currentDirection="jp-en",currentTranslationLanguage="en",sessionReviewPlan=new Map(),reviewSessionFinalized=true;
const MASTER_STAGE=3;

function vocabCardKey(w){return w.bookId==="dekiru-shochukyu"?w.jp:"vocab:"+w.bookId+":"+w.jp}
function vocabTopicLabel(book,topic){const word=book.words.find(w=>String(w.topic)===String(topic)&&w.topicTitle);return word?String(topic)+" · "+word.topicTitle:String(topic).replace("-"," · Part ")}
function vocabTopics(){return [...new Set(WORDS.map(w=>w.topic))].sort((a,b)=>String(a).localeCompare(String(b),undefined,{numeric:true}))}
function vocabUnitCards(topic){return WORDS.filter(w=>w.topic===topic).map(w=>({...w,key:vocabCardKey(w),unitKey:"vocab-"+w.bookId+"-"+topic}))}
function unitMastery(cards,minStage=MASTER_STAGE){return cards.length?cards.filter(w=>state(w).stage>=minStage).length/cards.length:0}
function isVocabUnlocked(topic){const topics=vocabTopics(),i=topics.indexOf(topic);if(i<=0)return true;return unitMastery(vocabUnitCards(topics[i-1]))>=.8}
function isKanjiChapterUnlocked(chapter){if(!kanjiUnlocked())return false;if(chapter<=1)return true;const previous=KANJI_CHAPTERS.find(c=>c.id===chapter-1);if(!previous)return false;const cards=previous.chars.map(ch=>({key:"kanji:"+ch})).filter(card=>KANJI.some(k=>k.c===card.key.slice(6)));return unitMastery(cards)>=.8}
function unlockedVocabTopics(){return vocabTopics().filter(isVocabUnlocked)}
function unlockedKanjiChapters(){return KANJI_CHAPTERS.filter(ch=>isKanjiChapterUnlocked(ch.id)).map(ch=>ch.id)}
function allContentCards(){const vocab=WORDS.map(w=>({key:vocabCardKey(w)}));const kana=[...kanaUnitCards("hiragana"),...kanaUnitCards("katakana")].filter(w=>state(w).stage!==9).map(w=>({key:w.key}));const kanji=KANJI.map(k=>({key:"kanji:"+k.c,type:"kanji",jp:k.c}));return [...vocab,...kana,...kanji]}
function studyItems(){const allVocab=WORDS.map(w=>({...w,key:vocabCardKey(w),unitKey:"vocab-"+w.bookId+"-"+w.topic,type:"vocab"}));const unlockedVocab=unlockedVocabTopics().flatMap(topic=>vocabUnitCards(topic).map(w=>({...w,type:"vocab"})));const allKana=[...kanaUnitCards("hiragana").map(w=>({...w,type:"kana",kanaDeck:"hiragana"})),...kanaUnitCards("katakana").map(w=>({...w,type:"kana",kanaDeck:"katakana"}))].filter(w=>state(w).stage!==9);const unlockedKana=[...kanaUnitCards("hiragana").map(w=>({...w,type:"kana",kanaDeck:"hiragana"})),...(katakanaUnlocked()?kanaUnitCards("katakana").map(w=>({...w,type:"kana",kanaDeck:"katakana"})):[])].filter(w=>state(w).stage!==9);function kanjiCards(chapters){return chapters.flatMap(chapter=>KANJI.filter(k=>k.chapter===chapter).map(k=>({jp:k.c,reading:"",chapter:k.chapter,kun:k.kun,on:k.on,en:k.en,es:k.es,jlpt:k.jlpt,grade:k.grade,strokes:k.strokes,meanings:k.meanings,datasetOn:k.datasetOn,datasetKun:k.datasetKun,unitKey:"kanji-"+k.chapter,type:"kanji",key:"kanji:"+k.c})))}const allKanji=kanjiCards(KANJI_CHAPTERS.map(ch=>ch.id));const unlockedKanji=kanjiCards(unlockedKanjiChapters());const allVocabSide=[...allKana,...allVocab],newVocabSide=[...unlockedKana,...unlockedVocab];const activeVocab=allVocabSide.filter(w=>state(w).seen>0&&state(w).stage<MASTER_STAGE).length,activeKanji=allKanji.filter(w=>state(w).seen>0&&state(w).stage<MASTER_STAGE).length;let remaining=Math.max(0,12-activeVocab-activeKanji);let vocabSlots=Math.min(remaining,Math.max(0,6-activeVocab)),kanjiSlots=Math.min(remaining-vocabSlots,Math.max(0,6-activeKanji));function freshCount(cards){return cards.filter(w=>state(w).seen===0&&state(w).stage===0).length}const availableVocab=freshCount(newVocabSide),availableKanji=freshCount(unlockedKanji);let extra=Math.max(0,remaining-vocabSlots-kanjiSlots);if(availableVocab<vocabSlots){const shortage=vocabSlots-availableVocab;vocabSlots=availableVocab;extra+=shortage}if(availableKanji<kanjiSlots){const shortage=kanjiSlots-availableKanji;kanjiSlots=availableKanji;extra+=shortage}if(extra>0){const vocabExtra=Math.min(extra,Math.max(0,availableVocab-vocabSlots));vocabSlots+=vocabExtra;extra-=vocabExtra;kanjiSlots+=Math.min(extra,Math.max(0,availableKanji-kanjiSlots))}function activePool(pool,newCards,slots){const seen=pool.filter(w=>state(w).seen>0);const fresh=newCards.filter(w=>state(w).seen===0&&state(w).stage===0).slice(0,slots);return [...seen,...fresh]}return [...activePool(allVocabSide,newVocabSide,vocabSlots),...activePool(allKanji,unlockedKanji,kanjiSlots)]}
function shuffleReviewQueue(items){for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]]}return items}function buildQueue(){const now=Date.now(),dueCards=studyItems().filter(w=>state(w).due<=now);sessionReviewPlan=new Map();const entries=dueCards.flatMap(card=>buildReviewSteps(card).map(step=>({card,step,stepId:(card.key||card.jp)+"|"+step.kind+"|"+step.mode,retry:false})));for(const entry of entries){const key=entry.card.key||entry.card.jp;if(!sessionReviewPlan.has(key))sessionReviewPlan.set(key,{card:entry.card,expectedSteps:new Set(),completedSteps:new Set(),failures:0,revealed:false});sessionReviewPlan.get(key).expectedSteps.add(entry.stepId)}queue=shuffleReviewQueue(entries);index=0;sessionSeen=0;sessionCorrect=0;sessionAttempts=0;sessionHits=0;reviewOutcomes=[];current=null;currentEntry=null;retryEntry=null;reviewSessionFinalized=false;revealedKanjiThisSession=new Set();renderReviewProgress();renderCard();updateCampaign();renderStats()}
function manualProgressCards(){const cards=WORDS.map(w=>({key:vocabCardKey(w),title:w.jp,detail:(w.reading||"")+(w.reading?" · ":"")+(w.es||[]).slice(0,3).join(", ")+" · "+(w.en||[]).slice(0,3).join(", "),type:"Vocabulary"}));kanaUnitCards("hiragana").forEach(k=>cards.push({key:k.key,title:k.jp+" · "+k.reading,detail:"Hiragana · Basic kana · no official JLPT level",type:"Hiragana"}));kanaUnitCards("katakana").forEach(k=>cards.push({key:k.key,title:k.jp+" · "+k.reading,detail:"Katakana · Basic kana · no official JLPT level",type:"Katakana"}));KANJI.forEach(k=>cards.push({key:"kanji:"+k.c,title:k.c,detail:"訓読み "+(k.kun.join("、")||"—")+" · 音読み "+(k.on.join("、")||"—")+" · "+(k.en||[]).join(", ")+" · Chapter "+k.chapter,type:"Kanji"}));return cards}
function setManualStage(key,stage){const old=state({key}),next=KaadoSRS.manualStageTransition({previousState:old,key,stage,now:Date.now()});store[key]=next;save();const msg=document.getElementById("progressMessage");if(msg)msg.textContent=next.stage===0?"Card reset to stage 0.":next.stage===9?"Kana marked as mastered. It is excluded from reviews and active statistics.":"Card set to stage "+next.stage+(String(key).startsWith("kana:")?"/9":"/8")+". The next review has been scheduled according to that stage’s interval."}function renderManualProgressList(){const el=document.getElementById("manualProgressList");if(!el)return;const q=norm(document.getElementById("manualProgressSearch")?.value||"");const cards=manualProgressCards().filter(c=>!q||norm([c.title,c.detail,c.type,c.key].join(" ")).includes(q));el.innerHTML="";if(!cards.length){const empty=document.createElement("div");empty.className="manual-progress-empty";empty.textContent="No cards found.";el.append(empty);return}const limit=q?cards.length:30;cards.slice(0,limit).forEach(c=>{const st=state({key:c.key}),row=document.createElement("div");row.className="manual-progress-row";const info=document.createElement("div"),title=document.createElement("div"),detail=document.createElement("div");title.className="manual-progress-title";title.textContent=c.title;detail.className="manual-progress-detail";detail.textContent=c.type+" · Current stage "+st.stage+"/"+(String(c.key).startsWith("kana:")?9:8)+" · "+c.detail;info.append(title,detail);const actions=document.createElement("div");actions.className="manual-progress-actions";if(st.stage<4){const known=document.createElement("button");known.type="button";known.textContent="Set to 4/8";known.addEventListener("click",()=>setManualStage(c.key,4));actions.append(known)}else{const known=document.createElement("button");known.type="button";known.textContent=st.stage===4?"Already at 4/8":"Set back to 4/8";known.disabled=st.stage===4;known.addEventListener("click",()=>setManualStage(c.key,4));actions.append(known)}if(st.stage>0){const reset=document.createElement("button");reset.type="button";reset.textContent="Stage 0";reset.addEventListener("click",()=>setManualStage(c.key,0));actions.append(reset)}row.append(info,actions);el.append(row)});if(!q&&cards.length>limit){const more=document.createElement("div");more.className="manual-progress-empty";more.textContent="Showing the first "+limit+" cards. Use search to find others.";el.append(more)}}
function renderKanjiProgressList(){const el=document.getElementById("kanjiProgressList");if(!el)return;const search=norm(document.getElementById("kanjiProgressSearch")?.value||"");el.innerHTML="";const header=document.createElement("div");header.className="kanji-progress-row header";["Kanji","JLPT","Jōyō grade","WaniKani","Overall progress"].forEach(label=>{const cell=document.createElement("div");cell.textContent=label;header.append(cell)});el.append(header);const grades={1:"小1",2:"小2",3:"小3",4:"小4",5:"小5",6:"小6",8:"中学"};const filtered=KANJI.filter(k=>{const d=KANJI_LEVELS[k.c]||{},st=state({key:"kanji:"+k.c});const text=[k.c,d.jlpt?"N"+d.jlpt:"No JLPT level",d.grade?grades[d.grade]||"—":"—",d.wk?"WaniKani "+d.wk:"No WaniKani level","Stage "+st.stage+"/8"].join(" ");return !search||norm(text).includes(search)});if(!filtered.length){const empty=document.createElement("div");empty.className="kanji-progress-empty";empty.textContent="No kanji found.";el.append(empty);return}filtered.forEach(k=>{const d=KANJI_LEVELS[k.c]||{},row=document.createElement("div");row.className="kanji-progress-row";const char=document.createElement("div");char.className="kanji-progress-char";char.textContent=k.c;const jlpt=document.createElement("div");jlpt.className="kanji-progress-levels";jlpt.textContent=d.jlpt?"N"+d.jlpt:"—";const grade=document.createElement("div");grade.className="kanji-progress-levels";grade.textContent=d.grade?(grades[d.grade]||"—"):"—";const wk=document.createElement("div");wk.className="kanji-progress-levels";wk.textContent=d.wk?"Lv. "+d.wk:"—";const stage=document.createElement("div");stage.className="kanji-progress-stage";stage.textContent="Stage "+state({key:"kanji:"+k.c}).stage+"/8";row.append(char,jlpt,grade,wk,stage);el.append(row)})}
function renderKanjiForecast(now=Date.now()){const el=document.getElementById("kanjiForecastList");if(!el)return;const kanji=allContentCards().filter(w=>String(w.key).startsWith("kanji:")).map(w=>({key:w.key,...state(w)})).filter(w=>w.seen>0&&w.due>now);const days=[];const start=new Date(now);start.setHours(0,0,0,0);for(let i=0;i<7;i++){const from=new Date(start);from.setDate(from.getDate()+i);const to=new Date(from);to.setDate(to.getDate()+1);const count=kanji.filter(w=>w.due>=Math.max(now,from.getTime())&&w.due<to.getTime()).length;days.push({date:from,count})}const max=Math.max(1,...days.map(d=>d.count));el.innerHTML="";days.forEach(({date,count})=>{const row=document.createElement("div");row.className="kanji-forecast-row";const label=document.createElement("div");label.className="kanji-forecast-day";label.textContent=date.toLocaleDateString("en",{weekday:"short"})+" "+date.getDate();const track=document.createElement("div");track.className="kanji-forecast-track";track.setAttribute("role","progressbar");track.setAttribute("aria-label",label.textContent+" scheduled kanji reviews");track.setAttribute("aria-valuemin","0");track.setAttribute("aria-valuemax",String(max));track.setAttribute("aria-valuenow",String(count));const fill=document.createElement("div");fill.className="kanji-forecast-fill";fill.style.width=(count?Math.max(3,count/max*100):0)+"%";track.append(fill);const total=document.createElement("div");total.className="kanji-forecast-count";total.textContent=String(count);row.append(label,track,total);el.append(row)})}
// ── Statistics and progress dashboards ──────────────────────
function optionalStatsEl(id){return document.getElementById(id)||{textContent:"",className:"",classList:{add(){},remove(){}},style:{}}}
function renderProgressCharts(states,now,history){const activity=document.getElementById("activityChart"),stageChart=document.getElementById("stageChart"),legend=document.getElementById("stageChartLegend");if(!activity||!stageChart||!legend)return;const dayMs=86400000,today=new Date(now);today.setHours(0,0,0,0);const days=Array.from({length:7},(_,i)=>{const d=new Date(today.getTime()-(6-i)*dayMs),key=d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate(),entries=history.filter(e=>{const x=new Date(Number(e.at));return x.getFullYear()+"-"+x.getMonth()+"-"+x.getDate()===key});return{date:d,label:d.toLocaleDateString("en",{weekday:"short"}),correct:entries.filter(e=>e.correct===true).length,wrong:entries.filter(e=>e.correct!==true).length,total:entries.length}});const max=Math.max(1,...days.map(d=>d.total)),barW=28,gap=14,chartW=7*(barW+gap)-gap,chartH=116;let bars='<svg viewBox="0 0 '+chartW+' 148" class="activity-svg" role="presentation" aria-hidden="true">';for(let i=0;i<days.length;i++){const d=days[i],x=i*(barW+gap),good=d.correct/max*chartH,bad=d.wrong/max*chartH;bars+='<line x1="'+x+'" y1="'+chartH+'" x2="'+(x+barW)+'" y2="'+chartH+'" class="chart-baseline"/>';if(good>0)bars+='<rect x="'+x+'" y="'+(chartH-good)+'" width="'+barW+'" height="'+Math.max(2,good)+'" rx="3" class="chart-correct"><title>'+d.label+': '+d.correct+' correct first try</title></rect>';if(bad>0)bars+='<rect x="'+x+'" y="'+(chartH-good-bad)+'" width="'+barW+'" height="'+Math.max(2,bad)+'" rx="3" class="chart-wrong"><title>'+d.label+': '+d.wrong+' needed retries</title></rect>';bars+='<text x="'+(x+barW/2)+'" y="137" text-anchor="middle" class="chart-axis-label">'+d.label+'</text>'}bars+='</svg><div class="chart-total"><strong>'+days.reduce((n,d)=>n+d.total,0)+'</strong><span>answers this week</span></div>';activity.innerHTML=bars;const groups=[{label:"New",count:states.filter(w=>w.stage===0).length,color:"var(--chart-stage-0, #64748b)"},{label:"Early · 1–2",count:states.filter(w=>w.stage>=1&&w.stage<=2).length,color:"var(--chart-stage-1, #38bdf8)"},{label:"Building · 3–4",count:states.filter(w=>w.stage>=3&&w.stage<=4).length,color:"var(--chart-stage-2, #a78bfa)"},{label:"Strong · 5–7",count:states.filter(w=>w.stage>=5&&w.stage<=7).length,color:"var(--chart-stage-3, #34d399)"},{label:"Mastered · 8",count:states.filter(w=>w.stage>=8).length,color:"var(--chart-stage-4, #fbbf24)"}];const total=groups.reduce((n,g)=>n+g.count,0),r=43,circ=2*Math.PI*r;let offset=0,svg='<svg viewBox="0 0 120 120" class="stage-donut" role="presentation" aria-hidden="true"><circle cx="60" cy="60" r="'+r+'" class="donut-track"/>';for(const g of groups){const len=total?g.count/total*circ:0;svg+='<circle cx="60" cy="60" r="'+r+'" fill="none" stroke="'+g.color+'" stroke-width="14" stroke-dasharray="'+len+' '+(circ-len)+'" stroke-dashoffset="'+(-offset)+'" transform="rotate(-90 60 60)"><title>'+g.label+': '+g.count+'</title></circle>';offset+=len}svg+='<text x="60" y="57" class="donut-number" text-anchor="middle">'+total+'</text><text x="60" y="72" class="donut-caption" text-anchor="middle">cards</text></svg>';stageChart.innerHTML=svg;legend.innerHTML=groups.map(g=>'<div class="stage-legend-row"><span><i class="legend-dot" style="background:'+g.color+'"></i>'+g.label+'</span><strong>'+g.count+'</strong></div>').join("")}
function renderPoolChart(total,reviewed){
const chart=document.getElementById("poolChart"),legend=document.getElementById("poolChartLegend");
if(!chart||!legend)return;
const done=Math.max(0,Math.min(total,reviewed)),pending=Math.max(0,total-done),r=43,circ=2*Math.PI*r,doneLen=total?done/total*circ:0,pendingLen=total?pending/total*circ:0;
const svg='<svg viewBox="0 0 120 120" class="pool-donut" role="presentation" aria-hidden="true"><circle cx="60" cy="60" r="'+r+'" class="donut-track"/><circle cx="60" cy="60" r="'+r+'" fill="none" stroke="#22c55e" stroke-width="14" stroke-dasharray="'+doneLen+' '+(circ-doneLen)+'" stroke-dashoffset="0" transform="rotate(-90 60 60)"><title>Completed: '+done+'</title></circle><circle cx="60" cy="60" r="'+r+'" fill="none" stroke="#f59e0b" stroke-width="14" stroke-dasharray="'+pendingLen+' '+(circ-pendingLen)+'" stroke-dashoffset="'+(-doneLen)+'" transform="rotate(-90 60 60)"><title>Pending: '+pending+'</title></circle><text x="60" y="57" class="donut-number" text-anchor="middle">'+(total?Math.round(done/total*100):0)+'%</text><text x="60" y="72" class="donut-caption" text-anchor="middle">reviewed</text></svg>';
chart.innerHTML=svg;
legend.innerHTML='<div class="pool-legend-row"><span><i class="legend-dot" style="background:#f59e0b"></i>Pending</span><strong>'+pending+'</strong></div><div class="pool-legend-row"><span><i class="legend-dot" style="background:#22c55e"></i>Completed</span><strong>'+done+'</strong></div><div class="pool-total">'+total+' cards in active study pool</div>';
}
function updateReviewAvailability(){const now=Date.now(),items=studyItems(),dueCards=items.filter(w=>state(w).due<=now),due=dueCards.flatMap(card=>buildReviewSteps(card).map(step=>({card,step}))),future=items.map(w=>state(w).due).filter(dueAt=>dueAt>now).sort((a,b)=>a-b),button=document.getElementById("startReviewBtn");if(!button)return;button.disabled=due.length===0;button.setAttribute("aria-disabled",String(button.disabled));button.textContent=due.length?"Review ("+due.length+")":"No reviews due";let message=document.getElementById("reviewAvailabilityMessage");if(!message){message=document.createElement("p");message.id="reviewAvailabilityMessage";message.className="review-availability-message";button.insertAdjacentElement("afterend",message)}if(due.length){message.textContent="";message.classList.add("hidden")}else{message.classList.remove("hidden");if(future.length){const hours=Math.max(1,Math.ceil((future[0]-now)/3600000));message.textContent="You’re all caught up! Come back in "+hours+" hour"+(hours===1?"":"s")+" to review new content."}else message.textContent="You’re all caught up! Keep studying new content and check back later for reviews."}const restart=document.getElementById("restartBtn");if(restart){restart.disabled=due.length===0;restart.setAttribute("aria-disabled",String(restart.disabled));restart.textContent=due.length?"Review again ("+due.length+")":"No reviews due"}}
function renderStats(){updateReviewAvailability();const now=Date.now(),items=studyItems(),all=allContentCards(),weekStart=now-7*86400000,week=answerHistory.filter(e=>Number(e.at)>=weekStart&&Number(e.at)<=now),weekCorrect=week.filter(e=>e.correct===true).length,weekPercent=week.length?Math.round(weekCorrect/week.length*1000)/10:null,states=all.map(w=>({card:w,...state(w)})),dueCards=items.filter(w=>state(w).due<=now),due=dueCards.flatMap(card=>buildReviewSteps(card).map(step=>({card,step})));optionalStatsEl("gWeeklyAccuracy").textContent=weekPercent===null?"—":weekPercent+"%";const accuracyStatus=optionalStatsEl("gWeeklyAccuracyStatus");accuracyStatus.className="accuracy-status";const studyDays=new Set(week.map(e=>new Date(Number(e.at)).toDateString()));if(week.length<20||studyDays.size<2){accuracyStatus.textContent="Not enough data";accuracyStatus.classList.add("insufficient");const reasons=[];if(week.length<20)reasons.push("at least 20 answers (you have "+week.length+")");if(studyDays.size<2)reasons.push("to have studied on 2 different days (you have "+studyDays.size+")");optionalStatsEl("gWeeklyAccuracyDetail").textContent="To calculate your rating, you need "+reasons.join(" and ")+ " in the last 7 days."}else if(weekCorrect===week.length){accuracyStatus.textContent="Nirvana";accuracyStatus.classList.add("nirvana");optionalStatsEl("gWeeklyAccuracyDetail").textContent="Perfect accuracy over the last 7 days. Keep going."}else if(weekCorrect/week.length>=0.85){accuracyStatus.textContent="禅 · Zen";accuracyStatus.classList.add("progress");optionalStatsEl("gWeeklyAccuracyDetail").textContent="You are in the progress zone. Maintain at least 85% first-try accuracy."}else{accuracyStatus.textContent="修行中 · Shugyō-chū";accuracyStatus.classList.add("outside");optionalStatsEl("gWeeklyAccuracyDetail").textContent="You are still in training. Practice consistently: this measures recent performance, not your ability to learn."}optionalStatsEl("gWeeklyAccuracyCount").textContent=weekCorrect+" of "+week.length;(optionalStatsEl("dueStat")||{}).textContent=due.length;const homeDueEl=optionalStatsEl("homeDue");if(homeDueEl)homeDueEl.textContent=due.length;optionalStatsEl("reviewRemaining").textContent=Math.max(0,queue.length-index);optionalStatsEl("reviewCorrect").textContent=sessionCorrect;const accuracyEl=optionalStatsEl("reviewAccuracy");if(accuracyEl){const accuracy=sessionAttempts?Math.round(sessionHits/sessionAttempts*100):null;accuracyEl.textContent=accuracy===null?"—":accuracy+"%";accuracyEl.classList.remove("accuracy-low","accuracy-mid","accuracy-high","accuracy-perfect","accuracy-neutral");accuracyEl.style.color=accuracy===null?"var(--muted, #94a3b8)":`hsl(${accuracy*1.2} 75% 55%)`;}(optionalStatsEl("learnedStat")||{}).textContent=items.filter(w=>state(w).seen>0).length;(optionalStatsEl("streakStat")||{}).textContent=items.reduce((n,w)=>n+state(w).seen,0);(optionalStatsEl("sideDue")||{}).textContent=due.length;const sessionCountEl=optionalStatsEl("sessionCount");if(sessionCountEl)sessionCountEl.textContent=sessionSeen;const sessionCorrectEl=optionalStatsEl("sessionCorrect");if(sessionCorrectEl)sessionCorrectEl.textContent=sessionCorrect;const wordCountEl=optionalStatsEl("wordCount");if(wordCountEl)wordCountEl.textContent="("+items.length+")";optionalStatsEl("pTotal").textContent=items.length;optionalStatsEl("pSeen").textContent=items.filter(w=>state(w).seen>0).length;optionalStatsEl("pMastered").textContent=items.filter(w=>state(w).stage>=5).length;renderPoolChart(items.length,items.filter(w=>state(w).seen>0).length);const vocab=states.filter(w=>!String(w.card.key).startsWith("kanji:")&&!String(w.card.key).startsWith("kana:")),kanji=states.filter(w=>String(w.card.key).startsWith("kanji:")),kana=[...kanaUnitCards("hiragana"),...kanaUnitCards("katakana")].map(card=>({card,...state(card)}));const fill=(prefix,group,maxStage=8)=>{const count=group.length,points=group.reduce((n,w)=>n+Math.min(w.stage,maxStage),0),pct=count?Math.round(points/(count*maxStage)*100):0;optionalStatsEl(prefix+"Pct").textContent=pct+"%";optionalStatsEl(prefix+"Count").textContent=group.filter(w=>w.seen>0).length+" of "+count+" cards seen";optionalStatsEl(prefix+"Bar").style.width=pct+"%"};fill("gVocab",vocab);fill("gKanji",kanji);fill("gKana",kana,9);renderProgressCharts(states,now,answerHistory);renderReviewProgress();renderKanjiForecast(now);updateCampaign();renderKanjiProgressList();renderManualProgressList();renderLocalSynonymsList()}
// ── Review session and answer handling ──────────────────────
let reviewSteps=[],reviewStepIndex=0,reviewHadMistake=false,reviewGroupCompleted=false,retryEntry=null,revealedKanjiThisSession=new Set();
function buildReviewSteps(card){if(card.type==="kanji"){const steps=[],kunAnswers=card.kun?.length?card.kun:(KANJI_LEVELS[card.jp]?.readings_kun||[]),onAnswers=card.on?.length?card.on:(KANJI_LEVELS[card.jp]?.readings_on||[]);if(kunAnswers.length)steps.push({kind:"kanji-reading",mode:"kun",answers:kunAnswers});if(onAnswers.length)steps.push({kind:"kanji-reading",mode:"on",answers:onAnswers});steps.push({kind:"kanji-translation",mode:"translation"});return steps}if(card.type==="vocab"){return [{kind:"vocab-translation",mode:Math.random()<.5?"jp-en":"en-jp"},{kind:"vocab-reading",mode:"vocab-hiragana"}]}return [{kind:"single",mode:card.type}]}
function renderCurrentSubquestion(){const step=reviewSteps[reviewStepIndex];if(!current||!step)return;setStudyResult(null);checked=false;revealed=false;wrongAttempts=0;const oldFeedback=document.getElementById("feedback");oldFeedback.className="feedback hidden";oldFeedback.replaceChildren();document.getElementById("saveSynonymBtn").classList.add("hidden");const input=document.getElementById("answerInput"),word=document.getElementById("jpWord"),reading=document.getElementById("jpReading"),partIndicator=document.getElementById("reviewPartIndicator");input.value="";document.getElementById("checkBtn").classList.remove("hidden");document.getElementById("revealBtn").classList.remove("hidden");document.getElementById("nextBtn").classList.add("hidden");document.getElementById("questionArea").classList.remove("hidden");currentDirection=step.mode;const promptLanguage=document.getElementById("vocabPromptLanguage").value;currentTranslationLanguage=promptLanguage==="alternate"?"multilingual":promptLanguage;
if(step.kind==="kanji-reading"){word.textContent=current.jp;reading.textContent="";input.placeholder=step.mode==="kun"?"Kunyomi · 訓読み (hiragana)":"Onyomi · 音読み (katakana)"}
else if(step.kind==="kanji-translation"){word.textContent=current.jp;reading.textContent="";input.placeholder="Meaning · English / Spanish"}
else if(step.kind==="vocab-reading"){word.textContent=current.jp;reading.textContent="";input.placeholder="Reading · hiragana"}
else if(step.kind==="vocab-translation"&&step.mode==="en-jp"){const chosenLanguage=currentTranslationLanguage;const clues=chosenLanguage==="es"?(current.es||[]):chosenLanguage==="multilingual"?[...(current.en||[]),...(current.es||[])].filter(Boolean):(current.en||[]);word.textContent=clues[Math.floor(Math.random()*Math.max(1,clues.length))]||(current.en||[])[0]||(current.es||[])[0]||"";reading.textContent="";input.placeholder="Japanese translation · 漢字・ひらがな・カタカナ"}
else if(step.kind==="vocab-translation"){word.textContent=current.jp;reading.textContent="";input.placeholder="Translation · English / Spanish"}
else{word.textContent=current.jp;reading.textContent=current.reading||"";input.placeholder=current.type==="kana"?"Kana reading · hiragana / katakana":"Answer"}
if(partIndicator)partIndicator.textContent=reviewSteps.length>1?"Part "+(reviewStepIndex+1)+" of "+reviewSteps.length:"";
if(current.type==="kana"||step.kind==="kanji-reading"||(current.type==="vocab"&&(step.kind==="vocab-reading"||(step.kind==="vocab-translation"&&step.mode==="en-jp")))){loadWanakana().then(()=>{if(current&&reviewSteps[reviewStepIndex]===step&&!document.getElementById("reviewView").classList.contains("hidden")){const IMEMode=(current.type==="kana"&&current.kanaDeck==="katakana")||(step.kind==="kanji-reading"&&step.mode==="on")?"toKatakana":"toHiragana";window.wanakana.bind(input,{IMEMode});window.__kaadoWanakanaBound=true;input.focus()}}).catch(()=>{if(step.kind==="vocab-reading")input.placeholder="Hiragana (romaji conversion unavailable)";else if(step.kind==="kanji-reading")input.placeholder=step.mode==="on"?"Onyomi · katakana (romaji conversion unavailable)":"Kunyomi · hiragana (romaji conversion unavailable)";else if(current.type==="kana")input.placeholder="Kana (romaji conversion unavailable)";input.focus()})}else input.focus()}
function renderCard(){setStudyResult(null);checked=false;revealed=false;wrongAttempts=0;document.getElementById("feedback").className="feedback hidden";document.getElementById("feedback").replaceChildren();document.getElementById("saveSynonymBtn").classList.add("hidden");document.getElementById("answerInput").value="";document.getElementById("checkBtn").classList.remove("hidden");document.getElementById("revealBtn").classList.remove("hidden");document.getElementById("nextBtn").classList.add("hidden");document.getElementById("questionArea").classList.remove("hidden");document.getElementById("finished").classList.add("hidden");
if(index>=queue.length){finalizeReviewSession();document.getElementById("questionArea").classList.add("hidden");document.getElementById("finished").classList.remove("hidden");document.getElementById("jpWord").textContent="";document.getElementById("jpReading").textContent="";renderStats();return}
if(window.wanakana&&window.__kaadoWanakanaBound){window.wanakana.unbind(document.getElementById("answerInput"));window.__kaadoWanakanaBound=false}
const entry=queue[index];currentEntry=entry;current=entry.card;const showStagePanel=current.type==="kanji"||current.type==="vocab",jpWordEl=document.getElementById("jpWord");jpWordEl.classList.remove("stage-word",...Array.from({length:10},(_,i)=>"stage-"+i));if(showStagePanel){const reviewStage=state(current).stage;jpWordEl.classList.add("stage-word","stage-"+reviewStage)}
reviewSteps=[entry.step];reviewStepIndex=0;reviewHadMistake=false;reviewGroupCompleted=false;renderCurrentSubquestion();renderStats()}
function renderReviewProgress(){const bar=document.getElementById("progressBar"),summary=document.getElementById("reviewOutcomeSummary"),count=document.getElementById("reviewSessionCount");if(!bar||!summary)return;const total=reviewOutcomes.length,wrong=reviewOutcomes.filter(ok=>!ok).length,correct=total-wrong,wrongPct=total?Math.round(wrong/total*100):0,correctPct=total?100-wrongPct:0;summary.textContent=total?`${correctPct}%`:"0%";if(count)count.textContent=`${Math.min(index,queue.length)} / ${Math.max(0,queue.length-index)}`;bar.replaceChildren();bar.setAttribute("aria-label",total?`${wrongPct}% incorrect · ${correctPct}% correct`:"No answers yet");if(correct){const segment=document.createElement("div");segment.className="progress-segment progress-success";segment.style.width=correctPct+"%";segment.title=`Correct: ${correct} (${correctPct}%)`;bar.append(segment)}if(wrong){const segment=document.createElement("div");segment.className="progress-segment progress-fail";segment.style.width=wrongPct+"%";segment.title=`Incorrect: ${wrong} (${wrongPct}%)`;bar.append(segment)}}
function setStudyResult(kind){const panel=document.querySelector(".study");if(panel)panel.classList.remove("study-result-correct","study-result-incorrect");if(panel&&kind)panel.classList.add(kind==="good"?"study-result-correct":"study-result-incorrect")}function feedback(){const el=document.getElementById("feedback");el.replaceChildren();el.className="feedback hidden"}
function completeReviewItem(){if(reviewGroupCompleted)return;reviewGroupCompleted=true;const clean=!reviewHadMistake,isRetry=!!currentEntry?.retry;const plan=sessionReviewPlan.get(current.key||current.jp);if(!isRetry)recordAnswer(clean,clean?0:1,clean);if(plan){if(!isRetry&&currentEntry?.stepId)plan.completedSteps.add(currentEntry.stepId);if(!clean)plan.failures++}if(!isRetry){sessionSeen++;if(clean)sessionCorrect++;reviewOutcomes.push(clean)}renderReviewProgress();renderStats();setStudyResult(clean?"good":"bad");feedback();document.getElementById("saveSynonymBtn").classList.add("hidden");document.getElementById("checkBtn").classList.add("hidden");document.getElementById("revealBtn").classList.add("hidden");document.getElementById("nextBtn").classList.remove("hidden")}
function check(){if(checked||!current)return;const answer=document.getElementById("answerInput").value;if(!answer.trim()){feedback();return}const step=reviewSteps[reviewStepIndex];let ok=false;if(step.kind==="single"&&current.type==="kana")ok=matches(answer,current.answers||[]);else if(step.kind==="kanji-reading"){const readings=step.answers||[];if(step.mode==="on"){const toKatakanaKana=value=>String(value).replace(/[ぁ-ゖ]/g,ch=>String.fromCharCode(ch.charCodeAt(0)+0x60));ok=matches(answer,readings)||matches(toKatakanaKana(answer),readings.map(toKatakanaKana))}else ok=matches(answer,readings);if(!ok){const otherMode=step.mode==="kun"?"on":"kun",otherReadings=otherMode==="kun"?(current.kun||KANJI_LEVELS[current.jp]?.readings_kun||[]):(current.on||KANJI_LEVELS[current.jp]?.readings_on||[]),toHiraganaKana=value=>String(value).replace(/[ァ-ヶ]/g,ch=>String.fromCharCode(ch.charCodeAt(0)-0x60)),toKatakanaKana=value=>String(value).replace(/[ぁ-ゖ]/g,ch=>String.fromCharCode(ch.charCodeAt(0)+0x60)),variants=[answer,toHiraganaKana(answer),toKatakanaKana(answer)];if(otherReadings.some(reading=>variants.some(variant=>matches(variant,[reading,toHiraganaKana(reading),toKatakanaKana(reading)])))){const feedbackEl=document.getElementById("feedback");feedbackEl.replaceChildren();feedbackEl.className="feedback";feedbackEl.textContent=otherMode==="kun"?"That’s the kunyomi (訓読み) reading. This question asks for onyomi (音読み).":"That’s the onyomi (音読み) reading. This question asks for kunyomi (訓読み).";return}}}else if(step.kind==="kanji-translation")ok=matchesExact(answer,currentTranslationLanguage==="multilingual"?[...(current.en||[]),...(current.es||[])].filter(Boolean):currentTranslationLanguage==="es"?(current.es||[]):(current.en||[]));else if(step.kind==="vocab-reading"){const reading=current.reading||current.kana||current.jp;const expected=window.wanakana?window.wanakana.toHiragana(reading):reading;ok=matches(answer,[expected])}else if(step.kind==="vocab-translation"&&step.mode==="en-jp")ok=matches(answer,[current.jp,current.reading,current.kana]);else if(step.kind==="vocab-translation")ok=matchesExact(answer,currentTranslationLanguage==="multilingual"?[...(current.en||[]),...(current.es||[])].filter(Boolean):currentTranslationLanguage==="es"?(current.es||[]):(current.en||[]));else ok=current.answers?matches(answer,current.answers):(matches(answer,current.en)||matches(answer,current.es)||matches(answer,cardSynonyms(current)));
let typo=null;sessionAttempts++;if(!ok){reviewHadMistake=true;wrongAttempts++;retryEntry={...currentEntry,retry:true};checked=true;setStudyResult("bad");feedback();completeReviewItem();document.getElementById("revealBtn").classList.remove("hidden");return}if(wrongAttempts===0)sessionHits++;checked=true;setStudyResult("good");completeReviewItem();if(typo)showTypoFeedback(answer,typo.target)}
function renderRevealDetails(card){const el=document.getElementById("feedback");el.replaceChildren();el.className="feedback bad reveal-feedback";el.style.whiteSpace="normal";const stage=state(card).stage,row=document.createElement("div"),info=document.createElement("div"),ch=document.createElement("div"),details=document.createElement("div"),read=document.createElement("div"),meaning=document.createElement("div"),meta=document.createElement("div");const isVocab=card.type==="vocab",isKanji=card.type==="kanji";row.className="kanji-catalog-row"+(isVocab?" vocab-catalog-row":(!isKanji?" kana-catalog-row":""))+" stage-row-"+stage;ch.className="kanji-catalog-char";ch.textContent=card.jp||"—";read.className="kanji-catalog-readings";meaning.className=isVocab?"kanji-catalog-meanings":"kanji-catalog-readings";meta.className="kanji-catalog-meta";if(isVocab){read.textContent=card.reading||card.kana||"";if(isRedundantVocabReading(card))read.classList.add("hidden");meaning.textContent="EN: "+formatTranslationList(card.en)+"\nES: "+formatTranslationList(card.es);meaning.style.whiteSpace="pre-line";meta.textContent="できる日本語初中級 · Topic "+(card.topic||"—")+" · Stage "+stage;details.append(read,meaning,meta);info.append(ch,details);row.append(info)}else if(isKanji){const d=KANJI_LEVELS[card.jp]||{},kun=card.kun?.length?card.kun:(d.readings_kun||[]),on=card.on?.length?card.on:(d.readings_on||[]),topic=KANJI_CHAPTERS.find(x=>x.chars.includes(card.jp));read.textContent="Kun: "+(kun.join("、")||"—")+" · On: "+(on.join("、")||"—");meaning.textContent="Meanings: "+[...(card.meanings||[]),...(card.en||[])].filter(Boolean).join(", ")+"\nES: "+((card.es||[]).join(", ")||"—");meaning.style.whiteSpace="pre-line";const tags=["Kanji"];if(d.jlpt_new)tags.push("JLPT N"+d.jlpt_new);if(d.grade)tags.push(d.grade===8?"Jōyō · Junior high":"Jōyō · Grade "+d.grade);if(d.wk_level)tags.push("WaniKani "+d.wk_level);if(topic)tags.push("漢字HSJ初級II · "+topic.id);tags.push("Stage "+stage+"/8");meta.textContent=tags.join(" · ");info.append(read,meaning,meta);row.append(ch,info)}else{read.textContent="Reading: "+(card.reading||"—");meaning.textContent=(card.answers||[]).join(" / ");meta.textContent=(card.kanaDeck||"Kana")+" · Stage "+stage+"/9";info.append(read,meaning,meta);row.append(ch,info)}el.append(row)}
function reveal(){if(!current)return;const pendingPlan=sessionReviewPlan.get(current.key||current.jp);if(pendingPlan)pendingPlan.revealed=true;if(checked){if(wrongAttempts>0&&!revealed){revealed=true;renderRevealDetails(current);document.getElementById("revealBtn").classList.add("hidden")}return}const step=reviewSteps[reviewStepIndex],cardKey=current.key||current.jp,isKanji=current.type==="kanji",alreadyPenalized=isKanji&&revealedKanjiThisSession.has(cardKey);revealed=true;checked=true;if(isKanji)revealedKanjiThisSession.add(cardKey);if(alreadyPenalized){reviewHadMistake=true;completeReviewItem();renderRevealDetails(current);return}reviewHadMistake=true;retryEntry={...currentEntry,retry:true};sessionAttempts++;setStudyResult("bad");let answer="";if(step.kind==="kanji-reading")answer=(step.answers||[]).join(" / ");else if(step.kind==="kanji-translation")answer=(currentTranslationLanguage==="multilingual"?[...(current.en||[]),...(current.es||[])].filter(Boolean):currentTranslationLanguage==="es"?(current.es||[]):(current.en||[])).join(" / ")||"—";else if(step.kind==="vocab-reading")answer=current.reading||current.kana||current.jp;else if(step.kind==="vocab-translation"&&step.mode==="en-jp")answer=(current.jp||"—")+" · "+(current.reading||current.kana||"—");else if(step.kind==="vocab-translation")answer=(currentTranslationLanguage==="multilingual"?[...(current.en||[]),...(current.es||[])].filter(Boolean):currentTranslationLanguage==="es"?(current.es||[]):(current.en||[])).join(" / ")||"—";else answer=(current.answers||[]).join(" / ")||"—";completeReviewItem();renderRevealDetails(current)}
function failureInterval(stage){return KaadoSRS.failureInterval(stage)}// ── Spaced-repetition scheduling ────────────────────────────
function recordAnswer(correct,penalty=0,firstTryOverride){if(!current)return;const now=Date.now(),firstTryCorrect=firstTryOverride===undefined?(correct&&penalty===0&&wrongAttempts===0&&!revealed):firstTryOverride;answerHistory.push({at:now,correct:firstTryCorrect,key:current.key||current.jp});answerHistory=answerHistory.filter(e=>Number(e.at)>=now-30*86400000).slice(-5000);try{localStorage.setItem(ANSWER_HISTORY_KEY,JSON.stringify(answerHistory))}catch{}renderStats()}function finalizeReviewSession(){if(reviewSessionFinalized)return;reviewSessionFinalized=true;let changed=false;const now=Date.now();for(const [key,plan] of sessionReviewPlan){if(!plan.expectedSteps.size||plan.completedSteps.size<plan.expectedSteps.size)continue;const penalty=plan.revealed||plan.failures>=2?2:plan.failures===1?1:0;store[key]=KaadoSRS.reviewTransition({previousState:state(plan.card),card:plan.card,correct:plan.failures===0,penalty,now});changed=true}if(changed)save();else renderStats()}function next(){if(!checked)return;index++;if(retryEntry){const maxInsert=Math.min(queue.length,index+9),insertAt=index+Math.floor(Math.random()*(maxInsert-index+1));queue.splice(insertAt,0,retryEntry);retryEntry=null}if(window.wanakana&&window.__kaadoWanakanaBound){window.wanakana.unbind(document.getElementById("answerInput"));window.__kaadoWanakanaBound=false}renderReviewProgress();renderCard()}
function updateCampaign(){updateSelectors();renderUnlockList()}
function updateSelectors(){}
function renderUnlockList(){const el=document.getElementById("unlockList");if(!el)return;el.innerHTML="";[{name:"Hiragana · ひらがな",unlocked:true,ratio:kanaMastery("hiragana"),detail:"First kana deck; required before katakana."},{name:"Katakana · カタカナ",unlocked:katakanaUnlocked(),ratio:kanaMastery("katakana"),detail:katakanaUnlocked()?"Katakana progress.":"Unlocks after mastering at least 80% of hiragana."},{name:"Kanji",unlocked:kanjiUnlocked(),ratio:kanaMastery("katakana"),detail:kanjiUnlocked()?"Kana requirement completed.":"Unlocks after mastering at least 80% of hiragana and then 80% of katakana."}].forEach(x=>{const row=document.createElement("div");row.className="unlock-item";row.innerHTML="<strong></strong><span></span>";row.querySelector("strong").textContent=(x.unlocked?"Unlocked · ":"Locked · ")+x.name;row.querySelector("span").textContent=x.detail;el.append(row)});const topics=vocabTopics();topics.forEach((topic,i)=>{const cards=vocabUnitCards(topic),unlocked=isVocabUnlocked(topic),ratio=i===0?1:unitMastery(vocabUnitCards(topics[i-1]));const row=document.createElement("div");row.className="unlock-item";const topicWord=WORDS.find(w=>String(w.topic)===String(topic)&&w.topicTitle);const name=topicWord?"Vocabulary · Topic "+topicWord.mainTopic+" · "+topicWord.topicTitle:topic==="13-1"?"Vocabulary · Topic 13, parte 1":topic==="13-2"?"Vocabulary · Topic 13, parte 2":"Vocabulary · "+topic;row.innerHTML="<strong></strong><span></span>";row.querySelector("strong").textContent=(unlocked?"Unlocked · ":"Locked · ")+name;row.querySelector("span").textContent=i===0?"Starting deck":Math.round(ratio*100)+"% mastered in the previous deck, required to unlock this topic";el.append(row)});KANJI_CHAPTERS.forEach((ch,i)=>{const unlocked=isKanjiChapterUnlocked(ch.id),previous=i===0?null:KANJI_CHAPTERS[i-1],prevCards=previous?previous.chars.filter(char=>KANJI.some(k=>k.c===char)).map(char=>({key:"kanji:"+char})):[];const ratio=previous?unitMastery(prevCards):1;const row=document.createElement("div");row.className="unlock-item";row.innerHTML="<strong></strong><span></span>";row.querySelector("strong").textContent=(unlocked?"Unlocked · ":"Locked · ")+"Kanji · Chapter "+ch.id+" · "+ch.title;row.querySelector("span").textContent=i===0?"Starting deck":Math.round(ratio*100)+"% mastered in the previous chapter, required to unlock this one";el.append(row)})}
function showScreen(screen){if(screen==="home"&&!reviewSessionFinalized)finalizeReviewSession();document.getElementById("homeView").classList.toggle("hidden",screen!=="home");document.getElementById("reviewView").classList.toggle("hidden",screen!=="review");if(screen==="home")renderStats();else{renderCard();renderStats()}}
// ── Catalogs and manual level controls ──────────────────────
function thematicUnits(){
 const units=[];
 for(const deck of ["hiragana","katakana"]){
  const cards=kanaUnitCards(deck);
  if(cards.length)units.push({id:"kana:"+deck,title:deck==="hiragana"?"All hiragana":"All katakana",subtitle:"Kana · "+cards.length+" characters",kind:"kana",cards:cards.map(card=>({key:card.key,card,kind:deck}))});
 }
 KANJI_CHAPTERS.forEach(ch=>{
  const cards=KANJI.filter(k=>k.chapter===ch.id).map(k=>({key:"kanji:"+k.c,card:{key:"kanji:"+k.c},kind:"kanji"}));
  if(cards.length)units.push({id:"kanji:"+ch.id,title:"漢字HSJ初級II · "+ch.id+" · "+ch.title,subtitle:"Kanji · "+cards.length+" characters",kind:"kanji",cards});
 });
 VOCABULARY_BOOKS.forEach(book=>{
  const topics=[...new Set(book.words.map(w=>String(w.topic)))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
  topics.forEach(topic=>{
   const words=book.words.filter(w=>String(w.topic)===topic);
   units.push({id:"vocab:"+book.id+":"+topic,title:book.title+" · "+vocabTopicLabel(book,topic),subtitle:"Vocabulary · "+words.length+" words",kind:"vocab",cards:words.map(w=>({key:vocabCardKey(w),card:{...w,key:vocabCardKey(w)},kind:"vocab"}))});
  });
 });
 return units;
}
function initThematicContentControls(){
 const list=document.getElementById("thematicUnitList"),granular=document.getElementById("granularContentMode"),thematic=document.getElementById("thematicContentMode"),granularPanel=document.getElementById("studyListPanel"),thematicPanel=document.getElementById("thematicContentPanel"),stageSelect=document.getElementById("thematicTargetStage"),message=document.getElementById("thematicActionMessage"),preview=document.getElementById("thematicUnitPreview"),previewTitle=document.getElementById("thematicPreviewTitle"),previewCount=document.getElementById("thematicPreviewCount"),previewItems=document.getElementById("thematicPreviewItems"),previewPrev=document.getElementById("thematicPreviewPrev"),previewNext=document.getElementById("thematicPreviewNext"),previewPage=document.getElementById("thematicPreviewPage");
 if(!list||!granular)return;
 let units=[],selectionOrder=[];
 function updateSelectionOrder(check){
  selectionOrder=selectionOrder.filter(id=>id!==check.value);
  if(check.checked)selectionOrder.push(check.value);
 }
 function render(){
  units=thematicUnits();selectionOrder=[];list.innerHTML="";
  units.forEach(unit=>{
   const row=document.createElement("div");row.className="thematic-unit";row.setAttribute("role","button");row.tabIndex=0;
   const main=document.createElement("div");main.className="thematic-unit-main";
   const check=document.createElement("input");check.type="checkbox";check.value=unit.id;check.dataset.unitId=unit.id;
   const copy=document.createElement("span");copy.className="thematic-unit-copy";
   const title=document.createElement("strong");title.textContent=unit.title;
   const states=unit.cards.map(x=>({entry:x,state:state(x.card)}));
   const total=states.length;
   const mastered=states.filter(({entry,state:st})=>entry.kind==="hiragana"||entry.kind==="katakana"?st.stage===9:st.stage>=8).length;
   const started=states.filter(({state:st,entry})=>st.stage>0&&!(entry.kind==="hiragana"||entry.kind==="katakana"?st.stage===9:st.stage>=8)).length;
   const unstarted=Math.max(0,total-mastered-started);
   const percent=total?Math.round(mastered/total*100):0;
   const detail=document.createElement("small");detail.textContent=unit.subtitle+" · "+mastered+" / "+total+" mastered ("+percent+"%)";
   copy.append(title,detail);main.append(check,copy);row.append(main);
   const bar=document.createElement("div");bar.className="thematic-unit-progress";bar.setAttribute("role","img");bar.setAttribute("aria-label",mastered+" mastered, "+started+" started, "+unstarted+" not started out of "+total);
   [[mastered,"mastered"],[started,"started"],[unstarted,"unstarted"]].forEach(([count,kind])=>{if(!count)return;const segment=document.createElement("span");segment.className="thematic-unit-progress-segment "+kind;segment.style.width=(count/Math.max(1,total)*100)+"%";bar.append(segment)});
   row.append(bar);
   check.addEventListener("change",()=>{updateSelectionOrder(check);renderPreview()});
   const toggleFromRow=e=>{if(e.target===check)return;check.checked=!check.checked;updateSelectionOrder(check);renderPreview()};
   row.addEventListener("click",toggleFromRow);row.addEventListener("keydown",e=>{if(e.target!==row||(e.key!=="Enter"&&e.key!==" "))return;e.preventDefault();check.checked=!check.checked;updateSelectionOrder(check);renderPreview()});list.append(row);
  });
  document.getElementById("thematicUnitCount").textContent=units.length+" available units";
  renderPreview();
 }
 function selectedUnits(){
  const ids=new Set([...list.querySelectorAll("input:checked")].map(x=>x.value));
  return selectionOrder.slice().reverse().filter(id=>ids.has(id)).map(id=>units.find(unit=>unit.id===id)).filter(Boolean);
 }

 let previewPageIndex=0;
 function renderPreview(resetPage=true){
  const chosen=selectedUnits();
  if(!chosen.length){preview.classList.add("hidden");previewPageIndex=0;return}
  if(resetPage)previewPageIndex=0;
  preview.classList.remove("hidden");
  previewTitle.textContent=chosen.length===1?chosen[0].title:"Selected unit contents";
  const cards=chosen.flatMap(unit=>unit.cards.map(entry=>({unit,entry})));
  const pageSize=12,pages=Math.max(1,Math.ceil(cards.length/pageSize));
  previewPageIndex=Math.max(0,Math.min(previewPageIndex,pages-1));
  previewCount.textContent=cards.length+" items";
  previewPage.textContent=(previewPageIndex+1)+" / "+pages;
  previewPrev.disabled=pages<=1;
  previewNext.disabled=pages<=1;
  previewItems.innerHTML="";
  cards.slice(previewPageIndex*pageSize,(previewPageIndex+1)*pageSize).forEach(({entry})=>{
   const chip=document.createElement("span");chip.className="thematic-preview-chip";
   const card=entry.card||{},key=entry.key;
   if(entry.kind==="kanji"){
    const data=KANJI.find(k=>("kanji:"+k.c)===key);
    chip.classList.add("kanji");
    chip.textContent=data?.c||key.replace("kanji:","");
   }else if(entry.kind==="hiragana"||entry.kind==="katakana"){
    chip.classList.add("kana");
    chip.textContent=card.jp||"";
   }else{
    chip.classList.add("vocab");
    chip.textContent=card.jp||"";
   }
   chip.title=chip.textContent;
   previewItems.append(chip);
  });
 }

 function showMode(mode){
  const isThematic=mode==="thematic";
  granularPanel.classList.toggle("hidden",isThematic);thematicPanel.classList.toggle("hidden",!isThematic);
  granular.classList.toggle("primary",!isThematic);granular.classList.toggle("ghost",isThematic);granular.setAttribute("aria-pressed",String(!isThematic));
  thematic.classList.toggle("primary",isThematic);thematic.classList.toggle("ghost",!isThematic);thematic.setAttribute("aria-pressed",String(isThematic));
  if(isThematic){render();renderPreview()}else preview.classList.add("hidden");
 }
 previewPrev.addEventListener("click",()=>{const chosen=selectedUnits();const total=chosen.reduce((n,u)=>n+u.cards.length,0),pages=Math.max(1,Math.ceil(total/12));previewPageIndex=(previewPageIndex-1+pages)%pages;renderPreview(false)});previewNext.addEventListener("click",()=>{const chosen=selectedUnits();const total=chosen.reduce((n,u)=>n+u.cards.length,0),pages=Math.max(1,Math.ceil(total/12));previewPageIndex=(previewPageIndex+1)%pages;renderPreview(false)});
 granular.addEventListener("click",()=>showMode("granular"));thematic.addEventListener("click",()=>showMode("thematic"));
 document.getElementById("markThematicKnown").addEventListener("click",()=>{
  const chosen=selectedUnits();if(!chosen.length){message.textContent="Select at least one unit.";return}
  const stage=Number(stageSelect.value),cards=chosen.flatMap(u=>u.cards);
  if(stage===9&&cards.some(x=>x.kind!=="hiragana"&&x.kind!=="katakana")){message.textContent="Stage 9 is only available when every selected unit is hiragana or katakana.";return}
  if(!confirm("Set "+cards.length+" cards across "+chosen.length+" unit(s) to Stage "+stage+"? Existing progress will be replaced."))return;
  const now=Date.now();
  cards.forEach(({key,card})=>{store[key]=KaadoSRS.manualStageTransition({previousState:state({key}),card,key,stage,now})});
  save();render();renderList();
  message.textContent=cards.length+" cards set to Stage "+stage+".";
 });
 document.getElementById("forceThematicReview").addEventListener("click",()=>{
  const chosen=selectedUnits();if(!chosen.length){message.textContent="Select at least one unit.";return}
  const cards=chosen.flatMap(u=>u.cards),now=Date.now();
  if(!confirm("Add "+cards.length+" cards across "+chosen.length+" unit(s) to review now? Existing stages are preserved; new cards start at Stage 1."))return;
  cards.forEach(({key,card})=>{
   const old=state({key}),targetStage=old.stage===0?1:old.stage;
   const next=KaadoSRS.manualStageTransition({previousState:old,card,key,stage:targetStage,now});
   store[key]={...next,seen:Math.max(1,Number(next.seen)||0),due:now};
  });
  save();render();renderList();buildQueue();
  message.textContent=cards.length+" cards from "+chosen.length+" unit(s) are available for review now. Their stage will continue normally after review.";
 });
 render();
}

function showHomeTab(tab){document.querySelectorAll("[data-home-tab]").forEach(b=>{const active=b.dataset.homeTab===tab;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active));b.tabIndex=active?0:-1});document.getElementById("statsView").classList.toggle("hidden",tab!=="stats");document.getElementById("contentView").classList.toggle("hidden",tab!=="content");if(tab==="content"){renderList();renderManualProgressList()}else renderStats()}
document.querySelectorAll("[data-home-tab]").forEach(b=>b.addEventListener("keydown",e=>{if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;e.preventDefault();const tab=e.key==="ArrowRight"?(b.dataset.homeTab==="stats"?"content":"stats"):(b.dataset.homeTab==="content"?"stats":"content");const target=document.querySelector(`[data-home-tab="${tab}"]`);showHomeTab(tab);target.focus()}));
let studyListPage=0;
function studyListItems(){const out=[];KANJI_CHAPTERS.forEach(ch=>ch.chars.forEach(c=>{const k=KANJI.find(x=>x.c===c);if(!k)return;const d=kanji[c]||{};out.push({key:"kanji:"+c,jp:c,reading:"",kun:d.readings_kun||k.kun||[],on:d.readings_on||k.on||[],en:d.meanings||k.en||[],es:k.es||[],chapter:k.chapter,type:"kanji",kind:"kanji",id:c,jlpt:Number(d.jlpt_new||k.jlpt)||0,grade:Number(d.grade||k.grade)||0,wk:Number(d.wk_level)||0,topic:{id:String(ch.id)},dataset:d,card:{key:"kanji:"+c}})}));WORDS.forEach(w=>out.push({...w,key:vocabCardKey(w),type:"vocab",kind:"vocab",card:{...w,key:vocabCardKey(w)},jlpt:Number(w.jlpt)||0,grade:Number(w.grade)||0,wk:Number(w.wk)||0}));["hiragana","katakana"].forEach(deck=>kanaUnitCards(deck).forEach(k=>out.push({...k,key:k.key,type:"kana",kind:deck,deck,card:k,jlpt:0,grade:0,wk:0})));return out}
function studyListTopic(x){if(x.kind==="kanji")return x.topic?{id:x.topic.id,label:"漢字HSJ初級II · "+x.topic.id}:null;if(x.kind==="vocab"&&x.topic){const book=VOCABULARY_BOOKS_BY_ID[x.bookId]||VOCABULARY_BOOKS_BY_ID["dekiru-shochukyu"];return{id:String(x.bookId||"dekiru-shochukyu")+":"+String(x.topic),label:book.title+" · "+vocabTopicLabel(book,String(x.topic))}}return null}
const individualSelection=new Set();
function renderStudyList(){const q=norm(document.getElementById("studyListSearch").value||""),ct=document.getElementById("studyListContentType").value,ft=document.getElementById("studyListFilterType").value,fv=document.getElementById("studyListFilterValue").value,all=studyListItems();const filtered=all.filter(x=>{if(ct!=="all"&&x.kind!==ct)return false;const t=studyListTopic(x),j=Number(x.jlpt)||0,g=Number(x.grade)||0,w=Number(x.wk)||0;if(ft==="jlpt"&&fv!=="all"&&(fv==="none"?j!==0:String(j)!==fv))return false;if(ft==="joyo"&&fv!=="all"&&(fv==="none"?g!==0:String(g)!==fv))return false;if(ft==="wk"&&fv!=="all"&&(fv==="none"?w!==0:String(w)!==fv))return false;if(ft==="topic"&&fv!=="all"&&(fv==="other"?!!t:String(t?.id||"")!==fv))return false;return !q||norm([x.jp,x.reading,...(x.kun||[]),...(x.on||[]),...(x.en||[]),...(x.es||[]),...(x.answers||[]),...((x.dataset||{}).meanings||[]),t?.label||"",x.kind].join(" ")).includes(q)});const size=20,pages=Math.max(1,Math.ceil(filtered.length/size));studyListPage=Math.min(studyListPage,pages-1);const start=studyListPage*size,items=filtered.slice(start,start+size),list=document.getElementById("studyListResults");list.innerHTML="";if(!items.length)list.innerHTML='<div class="empty">No content matches these filters.</div>';items.forEach(x=>{const key=x.key||x.jp,st=state({key}),row=document.createElement("div");row.className="kanji-catalog-row individual-content-row"+(x.kind==="vocab"?" vocab-catalog-row":(x.kind==="hiragana"||x.kind==="katakana"?" kana-catalog-row":""))+" stage-row-"+st.stage;const checkWrap=document.createElement("label");checkWrap.className="individual-card-check";const check=document.createElement("input");check.type="checkbox";check.checked=individualSelection.has(key);check.setAttribute("aria-label","Select "+x.jp);check.addEventListener("change",()=>{if(check.checked)individualSelection.add(key);else individualSelection.delete(key);updateIndividualSelectionUI(items)});row.addEventListener("click",event=>{if(event.target.closest(".individual-card-check"))return;check.checked=!check.checked;check.dispatchEvent(new Event("change",{bubbles:true}))});row.append(checkWrap);const ch=document.createElement("div"),info=document.createElement("div"),read=document.createElement("div"),meaning=document.createElement("div"),meta=document.createElement("div");ch.className="kanji-catalog-char";ch.textContent=x.jp;read.className="kanji-catalog-readings";meaning.className="kanji-catalog-meanings";meta.className="kanji-catalog-meta";read.textContent=x.kind==="kanji"?"Kun: "+((x.kun||[]).join("、")||"—")+" · On: "+((x.on||[]).join("、")||"—"):(x.reading||"");if(x.kind==="vocab"&&isRedundantVocabReading(x))read.classList.add("hidden");meaning.textContent=x.kind==="kanji"?((x.dataset?.meanings||x.en||[]).slice(0,5).join(", ")||"No meaning listed"):x.kind==="vocab"?"EN: "+formatTranslationList(x.en||x.answers)+"\nES: "+formatTranslationList(x.es):(x.kind==="hiragana"?"Hiragana · Kana":"Katakana · Kana");if(x.kind==="vocab")meaning.style.whiteSpace="pre-line";const tags=[];if(x.kind==="kanji"){if(x.jlpt)tags.push("JLPT N"+x.jlpt);if(x.grade)tags.push(x.grade===8?"Jōyō · Junior high":"Jōyō · Grade "+x.grade);if(x.wk)tags.push("WaniKani "+x.wk);const t=studyListTopic(x);if(t)tags.push(t.label);tags.push("Stage "+st.stage+"/8")}else if(x.kind==="vocab"){const t=studyListTopic(x);tags.push(t?t.label:"できる日本語初中級","Stage "+st.stage+"/8")}else tags.push((x.kind==="hiragana"?"Hiragana":"Katakana")+" · "+(st.stage===9?"Stage 9 · Mastered":"Stage "+st.stage+"/9"));meta.textContent=tags.join(" · ");if(x.kind==="vocab"){const details=document.createElement("div");details.append(read,meaning,meta);info.append(ch,details)}else{info.append(read,meaning,meta);row.append(ch)}row.append(checkWrap,info);list.append(row)});document.getElementById("studyListCount").textContent=filtered.length.toLocaleString()+" items · showing "+(filtered.length?start+1:0)+"–"+Math.min(start+size,filtered.length);["studyListPageLabel","studyListPageLabelTop"].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent="Page "+(studyListPage+1)+" of "+pages});["studyListPrevPage","studyListPrevPageTop"].forEach(id=>{const el=document.getElementById(id);if(el)el.disabled=studyListPage===0});["studyListNextPage","studyListNextPageTop"].forEach(id=>{const el=document.getElementById(id);if(el)el.disabled=studyListPage>=pages-1});updateIndividualSelectionUI(items)}
function updateIndividualSelectionUI(visible=[]){const count=document.getElementById("studyListSelectionCount");if(count)count.textContent=individualSelection.size+" selected";const select=document.getElementById("studyListSelectPage");if(select){const keys=visible.map(x=>x.key||x.jp);select.checked=keys.length>0&&keys.every(k=>individualSelection.has(k));select.indeterminate=keys.some(k=>individualSelection.has(k))&&!select.checked}["studyListApplyStage","studyListReviewNow","studyListClearSelection"].forEach(id=>{const el=document.getElementById(id);if(el)el.disabled=individualSelection.size===0})}
function resetStudyListPage(){studyListPage=0;renderStudyList()}
function initStudyListCatalog(){function filtered(){const q=norm(document.getElementById("studyListSearch").value||""),ct=document.getElementById("studyListContentType").value,ft=document.getElementById("studyListFilterType").value,fv=document.getElementById("studyListFilterValue").value;return studyListItems().filter(x=>{if(ct!=="all"&&x.kind!==ct)return false;const t=studyListTopic(x),j=Number(x.jlpt)||0,g=Number(x.grade)||0,w=Number(x.wk)||0;if(ft==="jlpt"&&fv!=="all"&&(fv==="none"?j!==0:String(j)!==fv))return false;if(ft==="joyo"&&fv!=="all"&&(fv==="none"?g!==0:String(g)!==fv))return false;if(ft==="wk"&&fv!=="all"&&(fv==="none"?w!==0:String(w)!==fv))return false;if(ft==="topic"&&fv!=="all"&&(fv==="other"?!!t:String(t?.id||"")!==fv))return false;return !q||norm([x.jp,x.reading,...(x.kun||[]),...(x.on||[]),...(x.en||[]),...(x.es||[]),...((x.dataset||{}).meanings||[]),t?.label||"",x.kind].join(" ")).includes(q)})}function fillValues(){const type=document.getElementById("studyListFilterType").value,sel=document.getElementById("studyListFilterValue");sel.innerHTML="";let opts=[{value:"all",label:type==="all"?"All content":"All levels"}],items=studyListItems();if(type==="jlpt"){const v=[...new Set(items.map(x=>Number(x.jlpt)||0).filter(Boolean))].sort((a,b)=>b-a);opts.push(...v.map(n=>({value:String(n),label:"JLPT N"+n})));if(items.some(x=>!x.jlpt))opts.push({value:"none",label:"No JLPT level"})}else if(type==="joyo"){const v=[...new Set(items.map(x=>Number(x.grade)||0).filter(Boolean))].sort((a,b)=>a-b);opts.push(...v.map(n=>({value:String(n),label:n===8?"Junior high school":"Grade "+n})));if(items.some(x=>!x.grade))opts.push({value:"none",label:"Not in Jōyō grades"})}else if(type==="wk"){const v=[...new Set(items.map(x=>Number(x.wk)||0).filter(Boolean))].sort((a,b)=>a-b);opts.push(...v.map(n=>({value:String(n),label:"WaniKani "+n})));if(items.some(x=>!x.wk))opts.push({value:"none",label:"No WaniKani level"})}else if(type==="topic"){const m=new Map();items.forEach(x=>{const t=studyListTopic(x);if(t)m.set(t.id,t.label)});opts.push(...[...m].sort((a,b)=>a[0].localeCompare(b[0],undefined,{numeric:true})).map(([value,label])=>({value,label})));if(items.some(x=>!studyListTopic(x)))opts.push({value:"other",label:"Other / no textbook unit"})}opts.forEach(x=>{const o=document.createElement("option");o.value=x.value;o.textContent=x.label;sel.append(o)});resetStudyListPage()}document.getElementById("studyListFilterType").addEventListener("change",fillValues);["studyListContentType","studyListSearch","studyListFilterValue"].forEach(id=>document.getElementById(id).addEventListener(id==="studyListSearch"?"input":"change",resetStudyListPage));["studyListPrevPage","studyListPrevPageTop"].forEach(id=>document.getElementById(id).addEventListener("click",()=>{studyListPage=Math.max(0,studyListPage-1);renderStudyList()}));["studyListNextPage","studyListNextPageTop"].forEach(id=>document.getElementById(id).addEventListener("click",()=>{studyListPage++;renderStudyList()}));document.getElementById("studyListSelectPage").addEventListener("change",e=>{filtered().slice(studyListPage*20,studyListPage*20+20).forEach(x=>{const k=x.key||x.jp;if(e.target.checked)individualSelection.add(k);else individualSelection.delete(k)});renderStudyList()});document.getElementById("studyListClearSelection").addEventListener("click",()=>{individualSelection.clear();renderStudyList()});document.getElementById("studyListApplyStage").addEventListener("click",()=>{const cards=studyListItems().filter(x=>individualSelection.has(x.key||x.jp)),stage=Number(document.getElementById("studyListTargetStage").value),msg=document.getElementById("studyListActionMessage");if(!cards.length){msg.textContent="Select at least one card.";return}if(stage===9&&cards.some(x=>!["hiragana","katakana"].includes(x.kind))){msg.textContent="Stage 9 is only available when every selected item is hiragana or katakana.";return}if(!confirm("Set "+cards.length+" selected cards to Stage "+stage+"? Existing progress will be replaced."))return;const now=Date.now();cards.forEach(x=>{const key=x.key||x.jp;store[key]=KaadoSRS.manualStageTransition({previousState:state({key}),card:x.card||x,key,stage,now})});save();renderList();renderStats();msg.textContent=cards.length+" selected cards set to Stage "+stage+"."});document.getElementById("studyListReviewNow").addEventListener("click",()=>{const cards=studyListItems().filter(x=>individualSelection.has(x.key||x.jp)),msg=document.getElementById("studyListActionMessage");if(!cards.length){msg.textContent="Select at least one card.";return}const now=Date.now();if(!confirm("Add "+cards.length+" selected cards to review now? Existing stages are preserved; new cards start at Stage 1."))return;cards.forEach(x=>{const key=x.key||x.jp,old=state({key}),target=old.stage===0?1:old.stage,next=KaadoSRS.manualStageTransition({previousState:old,card:x.card||x,key,stage:target,now});store[key]={...next,seen:Math.max(1,Number(next.seen)||0),due:now}});save();buildQueue();renderList();msg.textContent=cards.length+" selected cards are available for review now."});fillValues()}
function renderList(){renderStudyList()}
document.querySelectorAll("[data-home-tab]").forEach(b=>b.addEventListener("click",()=>showHomeTab(b.dataset.homeTab)));document.getElementById("startReviewBtn").addEventListener("click",()=>{if(!studyItems().some(w=>state(w).due<=Date.now())){updateReviewAvailability();return}buildQueue();if(queue.length)showScreen("review");else updateReviewAvailability()});document.getElementById("backHomeBtn").addEventListener("click",()=>showScreen("home"));document.getElementById("finishHomeBtn").addEventListener("click",()=>showScreen("home"));document.getElementById("checkBtn").addEventListener("click",check);document.getElementById("revealBtn").addEventListener("click",reveal);document.getElementById("nextBtn").addEventListener("click",next);

document.getElementById("saveSynonymBtn").addEventListener("click",addCurrentSynonym);
document.getElementById("manualProgressSearch")?.addEventListener("input",renderManualProgressList);




initCloudAccount();
document.getElementById("restartBtn").addEventListener("click",()=>{if(!studyItems().some(w=>state(w).due<=Date.now())){updateReviewAvailability();return}buildQueue()});document.getElementById("studyListSearch")?.addEventListener("input",resetStudyListPage);document.getElementById("manualProgressSearch")?.addEventListener("input",renderManualProgressList);const vocabPromptLanguageSelect=document.getElementById("vocabPromptLanguage");try{const savedPromptLanguage=localStorage.getItem("kaado-isi-vocab-prompt-language");if(["en","es","alternate","multilingual"].includes(savedPromptLanguage))vocabPromptLanguageSelect.value=savedPromptLanguage==="alternate"?"multilingual":savedPromptLanguage}catch{}vocabPromptLanguageSelect.addEventListener("change",e=>{try{localStorage.setItem("kaado-isi-vocab-prompt-language",e.target.value)}catch{};if(current&&!document.getElementById("reviewView").classList.contains("hidden"))renderCard()});
document.getElementById("answerInput").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();checked?next():check()}});
let wanakanaLoadPromise=null;function loadWanakana(){if(window.wanakana)return Promise.resolve(window.wanakana);if(!wanakanaLoadPromise)wanakanaLoadPromise=new Promise((resolve,reject)=>{const script=document.createElement("script");script.src="https://cdn.jsdelivr.net/npm/wanakana@5.3.1/wanakana.min.js";script.async=true;script.onload=()=>window.wanakana?resolve(window.wanakana):reject(new Error("WanaKana did not initialize"));script.onerror=()=>reject(new Error("Could not load WanaKana"));document.head.append(script)});return wanakanaLoadPromise;}
const resetModal=document.getElementById("resetConfirmModal"),cancelResetBtn=document.getElementById("cancelResetBtn"),confirmResetBtn=document.getElementById("confirmResetBtn"),resetConfirmInput=document.getElementById("resetConfirmInput");function updateResetConfirmation(){confirmResetBtn.disabled=resetConfirmInput.value!=="reset"}// ── Reset flow and application startup ──────────────────────
function closeResetModal(){resetModal.classList.add("hidden");resetConfirmInput.value="";updateResetConfirmation();document.getElementById("resetBtn").focus()}document.getElementById("resetBtn").addEventListener("click",()=>{resetModal.classList.remove("hidden");resetConfirmInput.focus()});resetConfirmInput.addEventListener("input",updateResetConfirmation);cancelResetBtn.addEventListener("click",closeResetModal);resetModal.addEventListener("click",e=>{if(e.target===resetModal)closeResetModal()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!resetModal.classList.contains("hidden"))closeResetModal()});confirmResetBtn.addEventListener("click",()=>{if(resetConfirmInput.value!=="reset")return;store={};answerHistory=[];try{localStorage.setItem(ANSWER_HISTORY_KEY,"[]")}catch{}save();buildQueue();document.getElementById("progressMessage").textContent="Progress reset.";closeResetModal()});


initStudyListCatalog();initThematicContentControls();
decorateSumiIcons();
buildQueue();

// Keep every progress chart and review-availability indicator in sync with due times
// and progress changes made in another tab, without rebuilding the active review queue.
function refreshProgressFromStorage(){
  try{
    const saved=localStorage.getItem(KEY);
    if(saved!==null)store=JSON.parse(saved)||{};
    const history=localStorage.getItem(ANSWER_HISTORY_KEY);
    if(history!==null){const parsed=JSON.parse(history);answerHistory=Array.isArray(parsed)?parsed:[]}
  }catch{}
  renderStats();
}
window.addEventListener("focus",refreshProgressFromStorage);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")refreshProgressFromStorage()});
window.addEventListener("storage",e=>{
  if(e.key===KEY||e.key===ANSWER_HISTORY_KEY){
    if(e.key===KEY){try{store=JSON.parse(e.newValue||"{}")||{}}catch{store={}}}
    if(e.key===ANSWER_HISTORY_KEY){try{const parsed=JSON.parse(e.newValue||"[]");answerHistory=Array.isArray(parsed)?parsed:[]}catch{answerHistory=[]}}
    renderStats();
  }
});
window.setInterval(()=>{if(document.visibilityState==="visible")renderStats()},60000);