
var mainCtrl;
var testCtrl;

Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
};

angular.module('JLRAssessment.controllers.Main', [])
        .controller('MainController', function ($scope) {
            mainCtrl = this;
            mainCtrl.back = function () {
                window.history.go(-1);
                mainCtrl.showPrevious = false;
                mainCtrl.showStart = false;
                mainCtrl.showNext = false;
                mainCtrl.showEnd = false;
                mainCtrl.showButtonNav = false;
            };

            mainCtrl.exit = function () {
                navigator.app.exitApp();
            };
            mainCtrl.showPrevious = false;
            mainCtrl.showStart = false;
            mainCtrl.showNext = false;
            mainCtrl.showEnd = false;
        })
        .controller('TestController', function ($scope, $routeParams) {
            testCtrl = this;
            testCtrl.testid = parseInt($routeParams.testid, 10);
            testCtrl.pageid = parseInt($routeParams.pageid, 10);
            testCtrl.timed = $routeParams.timed;
            testCtrl.tests = [
                {
                    id: 1,
                    name: 'Assessment 1',
                    timed: true,
                    description: "blah blah blah",
                    questions: [
                        {question: "Find whether two sets are identical:\n\n 4824                                          4842\n",
                         type: "trueorfalse",Ans:'Not Identical'}
                        ,
                        {question: "Find whether two sets are identical:\n\n 89472                                        89472\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 62958                                          622\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 101000                                       10100\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 671242                                      671249\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 12%89                                        12%88\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n ntb/3701                                  ntb/3701\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 459(9+2)                                  459(9+2)\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 5643|72                                    5643/72\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 912?45                                      912345\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n *32890*                                    *32899*\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 86+ABC÷009                              86+ABC÷009\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 746#586&9                                746#586&9\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n (5838+78)_258                         (5838+78_258\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n ‘9/6*9/9’                                  ‘9/6*9/9’\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n (q1-s2)+(q1-82)                    (q1-s2)+(q1-92)\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n (-3+5)i–(2-7)j                      (-3+5)i–(2-7)j\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n A x b x b                                A x b x d\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n sina+sinD                                sina+sinB\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n L.(di/dt) + Ri                        L.(di/dt) +R\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n Ylogydx + (x-logy)              Ylogydx + (x-logy)\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n (xsec2y – x2cosy)dy            (xsec2y – x2cosx)dy\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n (a.b) X (b.c) X (c.b)        (a.b) X (b.c) X (c.d)\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 4.687-2.689=0.290                4.867-2.689=0.290\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n [{6*p}- 4g&192d]                   [{6*p}-4g&192a]\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n θβα£≤÷×ϳ©                               θβα£≤÷×ϳ©\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n (20.46a@bb)-53                      (20.46a@bb-53\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n #a0b9#c31                               #a0b9#c3!\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n (α+β)2 = α20 + β83             (α+β)2 = α20 + β83\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n (a.bcosθ)  x (c.dcosθ)     (a.bcosφ)  x (c.dcosθ)\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n //piyr///*(2+}a{feuw)       //piyr///*(2+}a{feuw)\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n seca.cosecg/=tanb\*cotd   seca.cosecg/=tanb\*cotd\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 192.168:184.160                   192.168.184.160\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n {9/3 + 4a +4.a                      {9/3 + 4a +4a\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 9-6+abc @d5++                       9-6+abc @d5++\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 5689Xiuyt+X                           5689Xiuyt+X\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 6756-(6789 x 9878]              6756-(6789 x 9878\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n ab<cdefg>2+ef/5896              ab<cdefg2+ef/5896\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 98262489745698                     98262499745698\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 6+9.7:2069589                       6+9.7;2069589\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n FFHH6644                                 FFHH6644\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,//42
                        {question: "Find whether two sets are identical:\n\n *cotangent<<09455685*        *cotangent<<09455685\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 2÷3+7.80235/90/                   2÷3+7.80.235/90\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n &adgjl||5735&                       &adgjl||5735&\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n %8975g_opi+489%                   %8975g_opi+489%\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n d5f4g8h9j                               d5f4g8hu4\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n D8F7G6H5J4                             D8F7G6H5J4\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 74859595                                 74859595\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 77FF66G                                77FF8G9H0J\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 1F2G3H4N5J                             1F2G3H4N5J\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n ÷ë©®®।॥                                    ÷ë©®©।॥\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 896*30-[08]                           896*30-[08]\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n (9/8)-5!86++                          (9/8)-5!86+\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n {530}28#24                             }530{28#24\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n $$555/$$555                           $$555/$$555\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n :5170:2380:                           :5170:2380:\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n (8146/26-10)                         (8146/26-10)\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n -(afg-i56)+(291)                  (afg-i56)+(291)\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n k|k|//?{-                               k|k|//?{-\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n !*491:-~(y                             !*591:-~(y\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n Bng52!!h8                               Bng52||h8\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n @68^xc_00                               @68^xc_00\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 47852013                                 47695325\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n *.*@gtj*.*                             *.*@gtj*.*\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n @qdh2110@                               @qdh2110@\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n H49p52/>7.s*                         H49p52/>7*s*\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n w-w=(e-#290)                         w-w=(e-#290)\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,//68
                        {question: "Find whether two sets are identical:\n\n /538/~fd6                               /538/~fd8\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 604÷560=24                             604÷560=24\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 5682#df>l.l                           5682=df>l.l\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n -7hy0%+517@$                         +7hy0%+517@$\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n +[5247-9824]?                       +[5274-9824]?\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 5868]*[5868                           5868[*]5868\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n $$555/$$555                           $$555/$$555\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 741/83=901                             741-83=901\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n $$d1.$$$                                 $$d1.$$8\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n :5170:2380:                           :5170:2380:\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,//78
                        {question: "Find whether two sets are identical:\n\n 826 x 526 = 2356                 826 * 526 = 2356\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n Z+.*926*/3$                          Z+.*926*/3$\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n ?{47}.{tyg}\\\\                  ?{47}.{tgy}\\\\\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n abc>dvh+91                            obc>dvh+91\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,//82
                        {question: "Find whether two sets are identical:\n\n (&).(*).(3).(@)                  (&).(*).(8).(@)\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n (@)3794(@)                            (@)3794(@}\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n <1839>~vrpm~                        <1830>~vrpm~\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,//86
                        {question: "Find whether two sets are identical:\n\n +{070<<_>uko                        +{070<<_>uko\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 6^3x4&10%                             6^3x4&10%9\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 6xz*6pm&40&                            681034796\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 37147@45+z                            37147@45+z\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 99877655                                998II655\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n *$”<g>?/                                 *$”<g>?/\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n vejk>09))                              vejk>09))\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n AH60MZ91                                AH60MZ91\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n {690&6#$8}                            {690&6#$8}\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 2-9%3/1+0*5                          2-9%3/1+0*5\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 9.256*6.23=?                        9.256*6.23=8\n",
                         type: "trueorfalse",Ans:"Not Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n a@b#c$d%e                              a@b#c$d%e\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n k9/6c-sz+v8                          k9/6c-sz+v8\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n 0{+81%)032(                          0{+81%)032(\n",
                         type: "trueorfalse",Ans:"Identical"}
                        ,
                        {question: "Find whether two sets are identical:\n\n B+.*956*|3$                          B+.*956*|3$\n",
                         type: "trueorfalse",Ans:"Identical"}
                    ]
                },
                {
                    id: 2,
                    name: 'Review Assessment 2',
                    timed: false
                },
                {
                    id: 3,
                    name: 'Assessment 2',
                    timed: true
                },
                {
                    id: 4,
                    name: 'Review Assessment 2',
                    timed: false
                }
            ];
            testCtrl.testname = testCtrl.tests[testCtrl.testid - 1].name;
            var tempArray = testCtrl.tests[testCtrl.testid - 1].questions;
            
            tempArray.shuffle();
            
            testCtrl.questions = new Array();
            
            for(var x = 0 ; x < 60; x++){
                testCtrl.questions.push(tempArray[x]); 
            }
            
            testCtrl.description = testCtrl.tests[testCtrl.testid - 1].description;
            
            testCtrl.showResult = false;
            
            mainCtrl.showPrevious = testCtrl.pageid > 1;
            mainCtrl.showStart = testCtrl.pageid == 0;
            mainCtrl.showNext = testCtrl.pageid > 0 && testCtrl.pageid < testCtrl.questions.length;
            mainCtrl.showEnd = testCtrl.pageid == testCtrl.questions.length;
            
            testCtrl.showStart = mainCtrl.showStart;
            testCtrl.showResult = false;
            
            mainCtrl.previous = function () {
                testCtrl.pageid = testCtrl.pageid - 1;
                mainCtrl.showPrevious = testCtrl.pageid > 1;
                mainCtrl.showStart = testCtrl.pageid == 0;
                mainCtrl.showNext = testCtrl.pageid > 0 && testCtrl.pageid < testCtrl.questions.length;
                mainCtrl.showEnd = testCtrl.pageid == testCtrl.questions.length;
                testCtrl.showStart = mainCtrl.showStart;
            };
            mainCtrl.start = function () {
                testCtrl.pageid = testCtrl.pageid + 1;
                mainCtrl.showPrevious = testCtrl.pageid > 1;
                mainCtrl.showStart = testCtrl.pageid == 0;
                mainCtrl.showNext = testCtrl.pageid > 0 && testCtrl.pageid < testCtrl.questions.length;
                mainCtrl.showEnd = testCtrl.pageid == testCtrl.questions.length;
                testCtrl.showStart = mainCtrl.showStart;
            };
            mainCtrl.next = function () {
                testCtrl.pageid = testCtrl.pageid + 1;
                mainCtrl.showPrevious = testCtrl.pageid > 1;
                mainCtrl.showStart = testCtrl.pageid == 0;
                mainCtrl.showNext = testCtrl.pageid > 0 && testCtrl.pageid < testCtrl.questions.length;
                mainCtrl.showEnd = testCtrl.pageid == testCtrl.questions.length;
                testCtrl.showStart = mainCtrl.showStart;
            };
            
            mainCtrl.submit = function () {
                testCtrl.showResult = true;
                mainCtrl.showPrevious = false;
                mainCtrl.showStart = false;
                mainCtrl.showNext = false;
                mainCtrl.showEnd = false;
            };
        });