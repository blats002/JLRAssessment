
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("backbutton", back, false);
}

function back() {
    mainCtrl.back();
}

function getTimeString(timeCount) {
    var diff = timeCount;

    // does the same job as parseInt truncates the float
    var minutes = (diff / 60) | 0;
    var seconds = (diff % 60) | 0;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}


var mainCtrl;
var testCtrl;

Array.prototype.shuffle = function () {
    var i = this.length, j, temp;
    if (i == 0)
        return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
};

angular.module('JLRAssessment.controllers.Main', [])
        .controller('MainController', function ($scope, $rootScope, ngDialog) {
            mainCtrl = this;
    
//            mainCtrl.test1PageLinks = [];
//            mainCtrl.test2PageLinks = [];
            
            mainCtrl.showTest1PageLinks = false;
            mainCtrl.showTest2PageLinks = false;
            
//            for (var x = 0; x < 61; x++) {
//                $scope.test1PageLinks.push(x+1);
//            };
//            for (var xx = 0; xx < 29; xx++) {
//                $scope.test2PageLinks.push(xx+1);
//            };
    
            mainCtrl.back = function () {
                window.history.go(-1);
                mainCtrl.showPrevious = false;
                mainCtrl.showStart = false;
                mainCtrl.showNext = false;
                mainCtrl.showEnd = false;
                mainCtrl.showButtonNav = false;
                mainCtrl.showTest1PageLinks = false;
                mainCtrl.showTest2PageLinks = false;
            };

            mainCtrl.exit = function () {
                navigator.app.exitApp();
            };
            
            mainCtrl.gotoPage = function (page) {
                testCtrl.pageid = page;
                mainCtrl.showPrevious = testCtrl.pageid > 1;
                mainCtrl.showStart = testCtrl.pageid == 0;
                mainCtrl.showNext = testCtrl.pageid > 0 && testCtrl.pageid < testCtrl.questions.length;
                mainCtrl.showEnd = testCtrl.pageid == testCtrl.questions.length;
                testCtrl.showStart = mainCtrl.showStart;
            };
            
            mainCtrl.showPrevious = false;
            mainCtrl.showStart = false;
            mainCtrl.showNext = false;
            mainCtrl.showEnd = false;

        })
        .controller('TestController', function ($scope, $rootScope, $routeParams, ngDialog, $timeout) {
            mainCtrl.showButtonNav = true;
            testCtrl = this;
            testCtrl.showModal1 = false;

            testCtrl.closeTimeUpModal = function () {
                testCtrl.timeUpModal = false;
            }

            testCtrl.testid = parseInt($routeParams.testid, 10);
            testCtrl.pageid = parseInt($routeParams.pageid, 10);
            testCtrl.timed = $routeParams.timed === "true";
            testCtrl.tests = [
                {
                    id: 1,
                    name: 'Assessment 1',
                    timed: true,                  
                    description: "The following assessment tool is designed to assess your ability to pay attention to detail.\n\
\n\
For each item in the assessment, you will be presented with two sets of characters. Your task will be to examin the two sets carefully, and decide wehter or not they are identical.\n\
\n\
If the two sets are identical, click on the answer labelled identical. If the two sets are not Identical, click on the answer labelled Not Identical.\n\
\n\
You must work quickly and accurately.",
                    questions: assessment1questions
                },
                {
                    id: 2,
                    name: 'Review Assessment 1',
                    timed: false,
                    description: "The following assessment tool is designed to assess your ability to pay attention to detail.\n\
\n\
For each item in the assessment, you will be presented with two sets of characters. Your task will be to examin the two sets carefully, and decide wehter or not they are identical.\n\
\n\
If the two sets are identical, click on the answer labelled identical. If the two sets are not Identical, click on the answer labelled Not Identical.\n\
\n\
This test is not timed.",
                    questions: assessment1questions
                },
                {
                    id: 3,
                    name: 'Assessment 2',
                    description: "The following assessment tool is designed to measure your ability to follow a given set of instructions.\n\
\n\
Durring the assessment, you will be given two types of instructions. The first type will refer to a set of numbers and letters that will appear on the screen. The second type will be independent questions, unrelated to the set of numbers.\n\
\n\
Your task will be to type in the appropriate answer for each questions in the spaces provided.\n\
\n\
You must work quickly and accurately.",
                    timed: true,
                    questions: assessment2questions
                },
                {
                    id: 4,
                    name: 'Review Assessment 2',
                    description: "The following assessment tool is designed to measure your ability to follow a given set of instructions.\n\
\n\
Durring the assessment, you will be given two types of instructions. The first type will refer to a set of numbers and letters that will appear on the screen. The second type will be independent questions, unrelated to the set of numbers.\n\
\n\
Your task will be to type in the appropriate answer for each questions in the spaces provided.\n\
\n\
This test is not timed.",
                    timed: false,
                    questions: assessment2questions
                }
            ];
            var id = testCtrl.tests[testCtrl.testid - 1].id;
            testCtrl.testname = testCtrl.tests[testCtrl.testid - 1].name;
            var tempArray = testCtrl.tests[testCtrl.testid - 1].questions;
            tempArray.shuffle();
            testCtrl.questions = new Array();
            var timer = 0;
            if (id === 1) {
                timer = 60 * 4;
            }

            if (id === 3) {
                timer = 60 * 9.5;
            }
            if (id < 3) {
                for (var x = 0; x < 61; x++) {
                    tempArray[x].selected = "none"
                    testCtrl.questions.push(tempArray[x]);
                }
                mainCtrl.showTest1PageLinks = true;
            } else {
                for (var x = 0; x < 29; x++) {
                    var catQuestion = tempArray[x].questions[Math.floor(Math.random() * tempArray[x].questions.length)];
//                    var catQuestion = tempArray[x].questions[0];
                    catQuestion.answer = "";
                    testCtrl.questions.push(catQuestion);
                }
                mainCtrl.showTest2PageLinks = true;
            }
            
            testCtrl.description = testCtrl.tests[testCtrl.testid - 1].description;
            testCtrl.showResult = false;
            mainCtrl.showPrevious = testCtrl.pageid > 1;
            mainCtrl.showStart = testCtrl.pageid == 0;
            mainCtrl.showNext = testCtrl.pageid > 0 && testCtrl.pageid < testCtrl.questions.length;
            mainCtrl.showEnd = testCtrl.pageid == testCtrl.questions.length;
            testCtrl.showStart = mainCtrl.showStart;
            testCtrl.showResult = false;
            testCtrl.results = {
                correctAnswers: 0,
                totalScore: 0,
                passed: false
            };
            testCtrl.getResult = function () {
                testCtrl.results.totalScore = testCtrl.questions.length;
                var correct = 0;
                var passed = false;
                if (id < 3) {
                    for (var x = 0; x < testCtrl.results.totalScore; x++) {
                        var ans = new String(testCtrl.questions[x].Ans);
                        var selected = new String(testCtrl.questions[x].selected);
                        if (ans.toLowerCase() === selected.toLowerCase()) {
                            correct = correct + 1;
                        }
                    }
                    if(correct >= 50){
                        passed = true;
                    }
                } else {
                    for (var x = 0; x < testCtrl.results.totalScore; x++) {
                        var CorrectAnswer = new String(testCtrl.questions[x].CorrectAnswer);
                        var answer = new String(testCtrl.questions[x].answer);
                        if (CorrectAnswer.toLowerCase() === answer.toLowerCase()) {
                            correct = correct + 1;
                        }
                    }
                    if(correct >= 18){
                        passed = true;
                    }
                }
                testCtrl.results.correctAnswers = correct;
                testCtrl.results.passed = passed;
            };
            testCtrl.testTime = timer;
            testCtrl.timerCount = 0;
            
            testCtrl.getTimeElapsed = function(){
                return getTimeString(testCtrl.timerCount)
            };
            
            testCtrl.getTimeRemaining = function(){
                return getTimeString(testCtrl.testTime - testCtrl.timerCount)
            };

            testCtrl.startTimer = function (timer) {
//                testCtrl.timerCount = timer;
                testCtrl.continueCount = true;

                var countDown = function () {
                    if(testCtrl.continueCount){
                        if (testCtrl.timerCount === testCtrl.testTime) {
                            //Any desired function upon countdown end.
                            testCtrl.timeUpModal = true;
                        } else {
                            testCtrl.timerCount++;
                            testCtrl.timedown = testCtrl.getTimeRemaining();
                            $timeout(countDown, 1000);
                        }
                    }
                };
                testCtrl.timedown = testCtrl.getTimeRemaining();
                countDown();
            };

            mainCtrl.previous = function () {
                mainCtrl.gotoPage(testCtrl.pageid - 1);
            };
            mainCtrl.start = function () {
                mainCtrl.gotoPage(testCtrl.pageid + 1);
                testCtrl.showTimer = false;
                if (testCtrl.testTime > 0) {
                    testCtrl.timerDisplay = "";
                    testCtrl.startTimer(testCtrl.testTime);
                    testCtrl.showTimer = true;
                }
            };
            mainCtrl.next = function () {
                mainCtrl.gotoPage(testCtrl.pageid + 1);
            };
            
            mainCtrl.submit = function () {
                testCtrl.showResult = true;
                mainCtrl.showPrevious = false;
                mainCtrl.showStart = false;
                mainCtrl.showNext = false;
                mainCtrl.showEnd = false;
                testCtrl.continueCount = false;
//                testCtrl.showTimer = true;
                testCtrl.getResult();
            };
            testCtrl.submit = function () {
                testCtrl.showTimer = false;
                testCtrl.closeTimeUpModal()
                mainCtrl.submit();
            }
        });

var assessment2questions = [
    {
        category: 1,
        questions: [
            {
                patternquestion: "C B V H G K Y O P N A H G K L M Z X C W Q U G N B \n\
1 2 5 8 7 4 1 2 0 3 0 9 8 5 6 3 2 1 0 2 5 4 1 5 9",
                question:"Find the second digit (from the right). Look at the letter above that digit. Find the same letter along the row and enter the digit that appears below it.",
                type: "pattern",
                CorrectAnswer: '3',
                answer: ""
            }
            ,
            {
                patternquestion: "A C V G F Y T Q A Z X D S L M K J N V B D G T S D\n\
1 2 0 9 7 5 6 3 5 4 8 1 0 2 9 7 5 6 1 2 5 4 7 8 9",
                question: "Find the second digit (from the right). Look at the letter above that digit. Find the same letter along the row and enter the digit that appears below it.",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                patternquestion: "Z X B C H G T R E W Q P L M N H B V G T F D S X P\n\
1 0 9 8 7 6 4 8 5 7 2 7 4 0 9 1 2 8 3 7 4 8 4 2 3",
                question: "Find the second digit (from the right). Look at the letter above that digit. Find the same letter along the row and enter the digit that appears below it.",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                patternquestion: "P O K G H B V C Z R D T S D H G K M N L P W E R Y\n\
9 8 7 5 2 1 0 2 3 2 0 1 5 4 7 8 9 6 3 0 2 1 5 8 7",
                question: "Find the second digit (from the right). Look at the letter above that digit. Find the same letter along the row and enter the digit that appears below it.",
                type: "pattern",
                CorrectAnswer: '2',
                answer: ""
            }
            ,
            {
                patternquestion: "P L M N K O I J Z V H U Y G C F T R E W Q A S Z X\n\
5 9 8 7 4 6 3 0 1 2 9 8 7 4 5 2 1 4 8 9 6 3 2 0 1",
                question: "Find the second digit (from the right). Look at the letter above that digit. Find the same letter along the row and enter the digit that appears below it.",
                type: "pattern",
                CorrectAnswer: '1',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 2,
        questions: [
            {
                patternquestion: "Q P W L D N B J G Y A F U D H W Y B M D L X Z Q R\n\
6 5 9 8 7 4 5 6 2 3 0 1 4 8 9 6 3 0 2 1 5 8 7 9 5",
                question: "Find the ninth letter (from the left), enter the digit that appears below it.",
                type: "pattern",
                CorrectAnswer: '2',
                answer: ""

            }
            ,
            {
                patternquestion: "Q P G J N C V Z H F M Q O G H S C Z F Q J B L M D\n\
5 9 8 7 9 5 2 1 0 1 2 3 6 5 2 0 1 4 8 9 7 5 2 0 3",
                question: "Find the ninth letter (from the left), enter the digit that appears below it.",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                patternquestion: "H D C Z X Q P L M J N V H B Y T R F K B X C M L S\n\
6 0 1 7 1 2 4 5 2 3 8 4 3 6 6 8 8 2 2 4 8 2 6 6 8",
                question: "Find the ninth letter (from the left), enter the digit that appears below it.",
                type: "pattern",
                CorrectAnswer: '2',
                answer: ""
            }
            ,
            {
                patternquestion: "N N G Z Q M L S L A D E G K E C B Q U Q S O B H T\n\
2 7 9 4 5 9 0 2 8 2 1 4 8 7 9 2 2 8 0 2 8 9 5 7 2",
                question: "Find the ninth letter (from the left), enter the digit that appears below it.",
                type: "pattern",
                CorrectAnswer: '8',
                answer: ""
            }
            ,
            {
                patternquestion: "M G S I L E G C Q Z U M N V L R I U K X A O I L V\n\
4 2 9 6 9 4 2 4 4 9 0 7 0 8 5 9 3 5 1 8 1 3 6 8 7",
                question: "Find the ninth letter (from the left), enter the digit that appears below it.",
                type: "pattern",
                CorrectAnswer: '4',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 3,
        questions: [
            {
                patternquestion: "Q P W L D N B J G Y A F U D H W Y B M D L X Z Q R\n\
6 5 9 8 7 4 5 6 2 3 0 1 4 8 9 6 3 0 2 1 5 8 7 9 5",
                question: "If the first and the last digits are the same, enter \"500\"; if they are different, enter \"10\".",
                type: "pattern",
                CorrectAnswer: '10',
                answer: ""

            }
            ,
            {
                patternquestion: "Q P G J N C V Z H F M Q O G H S C Z F Q J B L M D\n\
5 9 8 7 9 5 2 1 0 1 2 3 6 5 2 0 1 4 8 9 7 5 2 0 5",
                question: "If the first and the last digits are the same, enter \"500\"; if they are different, enter \"10\".",
                type: "pattern",
                CorrectAnswer: '500',
                answer: ""
            }
            ,
            {
                patternquestion: "H D C Z X Q P L M J N V H B Y T R F K B X C M L S\n\
6 0 1 7 1 2 4 5 2 3 8 4 3 6 6 8 8 2 2 4 8 2 6 6 8",
                question: "If the first and the last digits are the same, enter \"500\"; if they are different, enter \"10\".",
                type: "pattern",
                CorrectAnswer: '10',
                answer: ""
            }
            ,
            {
                patternquestion: "N N G Z Q M L S L A D E G K E C B Q U Q S O B H T\n\
2 7 9 4 5 9 0 2 8 2 1 4 8 7 9 2 2 8 0 2 8 9 5 7 2",
                question: "If the first and the last digits are the same, enter \"500\"; if they are different, enter \"10\".",
                type: "pattern",
                CorrectAnswer: '500',
                answer: ""
            }
            ,
            {
                patternquestion: "M G S I L E G C Q Z U M N V L R I U K X A O I L V\n\
4 2 9 6 9 4 2 4 4 9 0 7 0 8 5 9 3 5 1 8 1 3 6 8 7",
                question: "If the first and the last digits are the same, enter \"500\"; if they are different, enter \"10\".",
                type: "pattern",
                CorrectAnswer: '10',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 4,
        questions: [
            {
                patternquestion: "Q P W L D N B J G Y A F U D H W Y W M D L X Z Q R\n\
6 5 9 8 7 4 5 6 2 3 0 1 4 8 9 6 3 0 2 1 5 8 7 9 5",
                question: "Enter the number that is under the letter, which appears between two Ws.",
                type: "pattern",
                CorrectAnswer: '3',
                answer: ""

            }
            ,
            {
                patternquestion: "Q P G J N C V Z H F M Q O G H S C Z C Q J B L M D\n\
5 9 8 7 9 5 2 1 0 1 2 3 6 5 2 0 1 4 8 9 7 5 2 0 5",
                question: "Enter the number that is under the letter, which appears between two Cs.",
                type: "pattern",
                CorrectAnswer: '4',
                answer: ""
            }
            ,
            {
                patternquestion: "H D C Z X Q P L M J N V H B Y T R T K B X C M L S\n\
6 0 1 7 1 2 4 5 2 3 8 4 3 6 6 8 8 2 2 4 8 2 6 6 8",
                question: "Enter the number that is under the letter, which appears between two Ts.",
                type: "pattern",
                CorrectAnswer: '8',
                answer: ""
            }
            ,
            {
                patternquestion: "N N G Z Q M L S L A D E G K E C B Q B Q S O B H T\n\
2 7 9 4 5 9 0 2 8 2 1 4 8 7 9 2 2 8 0 2 8 9 5 7 2",
                question: "Enter the number that is under the letter, which appears between two Bs.",
                type: "pattern",
                CorrectAnswer: '8',
                answer: ""
            }
            ,
            {
                patternquestion: "M G S I L E G C Q Z U M N V L R I R K X A O I L V\n\
4 2 9 6 9 4 2 4 4 9 0 7 0 8 5 9 3 5 1 8 1 3 6 8 7",
                question: "Enter the number that is under the letter, which appears between two Rs.",
                type: "pattern",
                CorrectAnswer: '3',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 5,
        questions: [
            {
                patternquestion: "Q P W L D N B J G Y A F U D H W Y W M D L X Z Q R\n\
6 5 9 8 7 4 5 6 2 3 0 1 4 8 9 6 3 0 2 1 5 8 7 9 5",
                question: "Enter the digit that appears below L and immediately to the right of digit 7.",
                type: "pattern",
                CorrectAnswer: '84',
                answer: ""

            }
            ,
            {
                patternquestion: "Q P G J N C V Z H F M Q O G H S C Z C Q J B L M D\n\
5 9 8 7 9 5 2 1 0 1 2 3 6 5 2 0 1 4 8 9 7 5 2 0 5",
                question: "Enter the digit that appears below Z and immediately to the right of digit 0.",
                type: "pattern",
                CorrectAnswer: '11',
                answer: ""
            }
            ,
            {
                patternquestion: "H D C Z X Q P L M J N V H B Y T R T K B X C M L S\n\
6 0 1 7 1 2 4 5 2 3 8 4 3 6 6 8 8 2 2 4 8 2 6 6 8",
                question: "Enter the digit that appears below P and immediately to the right of digit 5.",
                type: "pattern",
                CorrectAnswer: '42',
                answer: ""
            }
            ,
            {
                patternquestion: "N N G Z Q M L S L A D E G K E C B Q B Q S O B H T\n\
2 7 9 4 5 9 0 2 8 2 1 4 8 7 9 2 2 8 0 2 8 9 5 7 2",
                question: "Enter the digit that appears below Q and immediately to the right of digit 9.",
                type: "pattern",
                CorrectAnswer: '50',
                answer: ""
            }
            ,
            {
                patternquestion: "M G S I L E G C Q Z U M N V L R I R K X A O I L V\n\
4 2 9 6 9 4 2 4 4 9 0 7 0 8 5 9 3 5 1 8 1 3 6 8 7",
                question: "Enter the digit that appears below G and immediately to the right of digit 4.",
                type: "pattern",
                CorrectAnswer: '20',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 6,
        questions: [
            {
                patternquestion: "Q P W L D N B J G Y A F U D H W Y W M D L X Z Q R\n\
6 5 9 8 7 4 5 6 2 3 0 1 4 8 9 6 3 0 2 1 5 8 7 9 5",
                question: "Find the digits under \"WMD\". If there is a digit among them larger than 5, enter that digit. If there is no digit larger than 5, enter 8.",
                type: "pattern",
                CorrectAnswer: '8',
                answer: ""

            }
            ,
            {
                patternquestion: "Q P G J N C V Z H F M Q O G H S C Z C Q J B L M D\n\
5 9 8 7 9 5 2 1 0 1 2 3 6 5 2 0 1 4 8 9 7 5 2 0 5",
                question: "Find the digits under \"MQO\". If there is a digit among them larger than 5, enter that digit. If there is no digit larger than 5, enter 9.",
                type: "pattern",
                CorrectAnswer: '6',
                answer: ""
            }
            ,
            {
                patternquestion: "H D C Z X Q P L M J N V H B Y T R T K B X C M L S\n\
6 0 1 7 1 2 4 5 2 3 8 4 3 6 6 8 8 2 2 4 8 2 6 6 8",
                question: "Find the digits under \"TRT\". If there is a digit among them larger than 5, enter that digit. If there is no digit larger than 5, enter 4.",
                type: "pattern",
                CorrectAnswer: '8',
                answer: ""
            }
            ,
            {
                patternquestion: "N N G Z Q M L S L A D E G K E C B Q B Q S O B H T\n\
2 7 9 4 5 9 0 2 8 2 1 4 8 7 9 2 2 4 0 2 8 9 5 7 2",
                question: "Find the digits under \"CBQ\". If there is a digit among them larger than 5, enter that digit. If there is no digit larger than 5, enter 9.",
                type: "pattern",
                CorrectAnswer: '9',
                answer: ""
            }
            ,
            {
                patternquestion: "M G S I L E G C Q Z U M N V L R I R K X A O I L V\n\
4 2 9 6 9 4 2 4 4 9 0 7 0 8 5 9 3 5 1 8 1 3 6 8 7",
                question: "Find the digits under \"GCQ\". If there is a digit among them larger than 5, enter that digit. If there is no digit larger than 5, enter 6.",
                type: "pattern",
                CorrectAnswer: '6',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 7,
        questions: [
            {
                patternquestion: "Q P W L D N B J G Y A F U D H W Y B M D L X Z Q R\n\
6 5 9 8 7 4 5 6 2 3 0 1 4 8 9 6 3 0 2 1 5 8 7 9 5",
                question: "Find the 4th digit (from the left side), look at the letter that is above that digit. Find the second letter to the left of it. Enter the digit that appears under it.",
                type: "pattern",
                CorrectAnswer: '5',
                answer: ""

            }
            ,
            {
                patternquestion: "Q P G J N C V Z H F M Q O G H S C Z F Q J B L M D\n\
5 9 8 7 9 5 2 1 0 1 2 3 6 5 2 0 1 4 8 9 7 5 2 0 3",
                question: "Find the 4th digit (from the left side), look at the letter that is above that digit. Find the second letter to the left of it. Enter the digit that appears under it.",
                type: "pattern",
                CorrectAnswer: '9',
                answer: ""
            }
            ,
            {
                patternquestion: "H D C Z X Q P L M J N V H B Y T R F K B X C M L S\n\
6 0 1 7 1 2 4 5 2 3 8 4 3 6 6 8 8 2 2 4 8 2 6 6 8",
                question: "Find the 4th digit (from the left side), look at the letter that is above that digit. Find the second letter to the left of it. Enter the digit that appears under it.",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                patternquestion: "N N G Z Q M L S L A D E G K E C B Q U Q S O B H T\n\
2 7 9 4 5 9 0 2 8 2 1 4 8 7 9 2 2 8 0 2 8 9 5 7 2",
                question: "Find the 4th digit (from the left side), look at the letter that is above that digit. Find the second letter to the left of it. Enter the digit that appears under it.",
                type: "pattern",
                CorrectAnswer: '7',
                answer: ""
            }
            ,
            {
                patternquestion: "M G S I L E G C Q Z U M N V L R I U K X A O I L V\n\
4 2 9 6 9 4 2 4 4 9 0 7 0 8 5 9 3 5 1 8 1 3 6 8 7",
                question: "Find the 4th digit (from the left side), look at the letter that is above that digit. Find the second letter to the left of it. Enter the digit that appears under it.",
                type: "pattern",
                CorrectAnswer: '2',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 8,
        questions: [
            {
                patternquestion: "Q P W L D N B J G Y A F U D H W Y B M D L X Z Q R\n\
6 5 9 8 7 4 5 6 2 3 0 1 4 8 9 6 3 0 2 1 5 8 7 8 5",
                question: "Find the digit that appears between the 8s. Find the fifth letter to the left of the letter above that digit, and enter the digit that appears under it.",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                patternquestion: "Q P G J N C V Z H F M Q O G H S C Z F Q J B L M D\n\
5 9 8 7 9 5 2 1 0 1 2 3 6 5 2 0 1 4 8 9 7 5 2 0 2",
                question: "Find the digit that appears between the 2s. Find the fifth letter to the left of the letter above that digit, and enter the digit that appears under it.",
                type: "pattern",
                CorrectAnswer: '8',
                answer: ""
            }
            ,
            {
                patternquestion: "H D C Z X Q P L M J N V H B Y T R F K B X C M L S\n\
6 0 1 7 1 2 4 5 2 3 8 4 3 6 1 8 8 2 2 4 8 2 6 5 6",
                question: "Find the digit that appears between the 6s. Find the fifth letter to the left of the letter above that digit, and enter the digit that appears under it.",
                type: "pattern",
                CorrectAnswer: '2',
                answer: ""
            }
            ,
            {
                patternquestion: "N N G Z Q M L S L A D E G K E C B Q U Q S O B H T\n\
2 7 9 4 5 9 0 2 8 2 1 4 8 7 9 2 2 8 0 2 8 9 5 7 5",
                question: "Find the digit that appears between the 5s. Find the fifth letter to the left of the letter above that digit, and enter the digit that appears under it.",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                patternquestion: "M G S I L E G C Q Z U M N V L R I U K X A O I L V\n\
4 2 9 6 9 4 2 4 4 9 0 7 0 8 5 9 3 5 1 8 1 3 7 8 7",
                question: "Find the digit that appears between the 7s. Find the fifth letter to the left of the letter above that digit, and enter the digit that appears under it.",
                type: "pattern",
                CorrectAnswer: '1',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 9,
        questions: [
            {
                patternquestion: "Q P W L D N B J G Y A F U D H W Y B M D L X Z Q R\n\
6 5 9 8 7 4 5 6 2 3 0 1 4 8 9 6 3 0 2 1 5 8 7 8 5",
                question: "Find the word \"FUD\", add the digits that appear under this word, and enter the outcome.",
                type: "pattern",
                CorrectAnswer: '13',
                answer: ""

            }
            ,
            {
                patternquestion: "Q P G J N C V Z H F M Q O G O S C Z F Q J B L M D\n\
5 9 8 7 9 5 2 1 0 1 2 3 6 5 2 0 1 4 8 9 7 5 2 0 2",
                question: "Find the word \"GOS\", add the digits that appear under this word, and enter the outcome.",
                type: "pattern",
                CorrectAnswer: '7',
                answer: ""
            }
            ,
            {
                patternquestion: "H D C Z X Q P L M J N V H B Y E R F K B X C M L S\n\
6 0 1 7 1 2 4 5 2 3 8 4 3 6 1 8 8 2 2 4 8 2 6 5 6",
                question: "Find the word \"BYE\", add the digits that appear under this word, and enter the outcome.",
                type: "pattern",
                CorrectAnswer: '15',
                answer: ""
            }
            ,
            {
                patternquestion: "N N G Z Q M L S L A D E G K E C B Q U Q S O B H T\n\
2 7 9 4 5 9 0 2 8 2 1 4 8 7 9 2 2 8 0 2 8 9 5 7 5",
                question: "Find the word \"LAD\", add the digits that appear under this word, and enter the outcome.",
                type: "pattern",
                CorrectAnswer: '11',
                answer: ""
            }
            ,
            {
                patternquestion: "M G S I L E G C Q Z U M N V L R I U K X A O I L V\n\
4 2 9 6 9 4 2 4 4 9 0 7 0 8 5 9 3 5 1 8 1 3 7 8 7",
                question: "Find the word \"OIL\", add the digits that appear under this word, and enter the outcome.",
                type: "pattern",
                CorrectAnswer: '18',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 10,
        questions: [
            {
                patternquestion: "Q P W L P N B J G P A F U D P W Y B M D P X Z Q R\n\
6 5 9 8 7 4 5 6 2 3 0 1 4 8 9 6 3 0 2 1 5 8 7 8 5",
                question: "Count how many times P appears just after L. Multiply the outcome by 9 and enter the result.",
                type: "pattern",
                CorrectAnswer: '36',
                answer: ""

            }
            ,
            {
                patternquestion: "J P G J N C V Z H F M Q J G O S C Z F Q J B L M D\n\
5 9 8 7 9 5 2 1 0 1 2 3 6 5 2 0 1 4 8 9 7 5 2 0 2",
                question: "Count how many times J appears just after G. Multiply the outcome by 6 and enter the result.",
                type: "pattern",
                CorrectAnswer: '18',
                answer: ""
            }
            ,
            {
                patternquestion: "H D C Z X H P L M J N V H B Y E R H K B X C H L S\n\
6 0 1 7 1 2 4 5 2 3 8 4 3 6 1 8 8 2 2 4 8 2 6 5 6",
                question: "Count how many times H appears just after Z. Multiply the outcome by 8 and enter the result.",
                type: "pattern",
                CorrectAnswer: '32',
                answer: ""
            }
            ,
            {
                patternquestion: "N N G Z Q M L N L A D E G K E C N Q U Q S O B H N\n\
2 7 9 4 5 9 0 2 8 2 1 4 8 7 9 2 2 8 0 2 8 9 5 7 5",
                question: "Count how many times N appears just after Q. Multiply the outcome by 4 and enter the result.",
                type: "pattern",
                CorrectAnswer: '12',
                answer: ""
            }
            ,
            {
                patternquestion: "L G S I L E G C Q L U M N V L R I U K X A O I L V\n\
4 2 9 6 9 4 2 4 4 9 0 7 0 8 5 9 3 5 1 8 1 3 7 8 7",
                question: "Count how many times L appears just after S. Multiply the outcome by 7 and enter the result.",
                type: "pattern",
                CorrectAnswer: '28',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 11,
        questions: [
            {
                patternquestion: "",
                question: "category 11 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 11 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 11 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 11 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 11 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 12,
        questions: [
            {
                question: "category 12 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 12 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 12 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 12 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 12 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 13,
        questions: [
            {
                question: "category 13 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 13 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 13 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 13 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 13 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 14,
        questions: [
            {
                question: "category 14 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 14 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 14 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 14 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 14 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 15,
        questions: [
            {
                question: "category 15 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 15 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 15 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 15 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 15 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 16,
        questions: [
            {
                question: "category 16 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 16 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 16 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 16 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 16 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 17,
        questions: [
            {
                question: "category 17 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 17 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 17 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 17 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 17 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 18,
        questions: [
            {
                question: "category 18 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 18 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 18 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 18 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 18 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 19,
        questions: [
            {
                question: "category 19 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 19 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 19 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 19 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 19 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 20,
        questions: [
            {
                question: "category 20 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 20 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 20 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 20 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 20 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 21,
        questions: [
            {
                question: "category 21 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 21 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 21 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 21 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 21 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 22,
        questions: [
            {
                question: "category 22 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 22 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 22 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 22 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 22 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 23,
        questions: [
            {
                question: "category 23 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 23 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 23 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 23 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 23 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 24,
        questions: [
            {
                question: "category 24 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 24 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 24 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 24 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 24 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 25,
        questions: [
            {
                question: "category 25 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 25 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 25 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 25 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 25 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 26,
        questions: [
            {
                question: "category 26 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 26 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 26 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 26 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 26 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 27,
        questions: [
            {
                question: "category 27 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 27 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 27 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 27 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 27 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 28,
        questions: [
            {
                question: "category 28 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 28 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 28 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 28 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 28 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 29,
        questions: [
            {
                question: "category 29 1of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                question: "category 29 2of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 29 3of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 29 4of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "category 29 5of5",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""
            }
        ]
    }
];

var assessment1questions = [
    {question: "Find whether two sets are identical:\n\n 4824                                          4842\n",
        type: "trueorfalse", Ans: 'Not Identical'}
    ,
    {question: "Find whether two sets are identical:\n\n 89472                                        89472\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 62958                                          622\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 101000                                       10100\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 671242                                      671249\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 12%89                                        12%88\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n ntb/3701                                  ntb/3701\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 459(9+2)                                  459(9+2)\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 5643|72                                    5643/72\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 912?45                                      912345\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n *32890*                                    *32899*\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 86+ABC÷009                              86+ABC÷009\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 746#586&9                                746#586&9\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n (5838+78)_258                         (5838+78_258\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n ‘9/6*9/9’                                  ‘9/6*9/9’\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n (q1-s2)+(q1-82)                    (q1-s2)+(q1-92)\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n (-3+5)i–(2-7)j                      (-3+5)i–(2-7)j\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n A x b x b                                A x b x d\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n sina+sinD                                sina+sinB\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n L.(di/dt) + Ri                        L.(di/dt) +R\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n Ylogydx + (x-logy)              Ylogydx + (x-logy)\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n (xsec2y – x2cosy)dy            (xsec2y – x2cosx)dy\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n (a.b) X (b.c) X (c.b)        (a.b) X (b.c) X (c.d)\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 4.687-2.689=0.290                4.867-2.689=0.290\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n [{6*p}- 4g&192d]                   [{6*p}-4g&192a]\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n θβα£≤÷×ϳ©                               θβα£≤÷×ϳ©\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n (20.46a@bb)-53                      (20.46a@bb-53\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n #a0b9#c31                               #a0b9#c3!\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n (α+β)2 = α20 + β83             (α+β)2 = α20 + β83\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n (a.bcosθ)  x (c.dcosθ)     (a.bcosφ)  x (c.dcosθ)\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n //piyr///*(2+}a{feuw)       //piyr///*(2+}a{feuw)\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n seca.cosecg/=tanb\*cotd   seca.cosecg/=tanb\*cotd\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 192.168:184.160                   192.168.184.160\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n {9/3 + 4a +4.a                      {9/3 + 4a +4a\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 9-6+abc @d5++                       9-6+abc @d5++\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 5689Xiuyt+X                           5689Xiuyt+X\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 6756-(6789 x 9878]              6756-(6789 x 9878\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n ab<cdefg>2+ef/5896              ab<cdefg2+ef/5896\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 98262489745698                     98262499745698\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 6+9.7:2069589                       6+9.7;2069589\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n FFHH6644                                 FFHH6644\n",
        type: "trueorfalse", Ans: "Identical"}
    , //42
    {question: "Find whether two sets are identical:\n\n *cotangent<<09455685*        *cotangent<<09455685\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 2÷3+7.80235/90/                   2÷3+7.80.235/90\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n &adgjl||5735&                       &adgjl||5735&\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n %8975g_opi+489%                   %8975g_opi+489%\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n d5f4g8h9j                               d5f4g8hu4\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n D8F7G6H5J4                             D8F7G6H5J4\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 74859595                                 74859595\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 77FF66G                                77FF8G9H0J\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 1F2G3H4N5J                             1F2G3H4N5J\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n ÷ë©®®।॥                                    ÷ë©®©।॥\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 896*30-[08]                           896*30-[08]\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n (9/8)-5!86++                          (9/8)-5!86+\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n {530}28#24                             }530{28#24\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n $$555/$$555                           $$555/$$555\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 65265974:                               65265974:\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n (8146/26-10)                         (8146/26-10)\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n -(afg-i56)+(291)                  (afg-i56)+(291)\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n k|k|//?{-                               k|k|//?{-\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n !*491:-~(y                             !*591:-~(y\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n Bng52!!h8                               Bng52||h8\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n @68^xc_00                               @68^xc_00\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 47852013                                 47695325\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n *.*@gtj*.*                             *.*@gtj*.*\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n @qdh2110@                               @qdh2110@\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n H49p52/>7.s*                         H49p52/>7*s*\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n w-w=(e-#290)                         w-w=(e-#290)\n",
        type: "trueorfalse", Ans: "Identical"}
    , //68
    {question: "Find whether two sets are identical:\n\n /538/~fd6                               /538/~fd8\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 604÷560=24                             604÷560=24\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 5682#df>l.l                           5682=df>l.l\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n -7hy0%+517@$                         +7hy0%+517@$\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n +[5247-9824]?                       +[5274-9824]?\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 5868]*[5868                           5868[*]5868\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n $$555/$$555                           $$555/$$555\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 741/83=901                             741-83=901\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n $$d1.$$$                                 $$d1.$$8\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n :5170:2380:                           :5170:2380:\n",
        type: "trueorfalse", Ans: "Identical"}
    , //78
    {question: "Find whether two sets are identical:\n\n 826 x 526 = 2356                 826 * 526 = 2356\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n Z+.*926*/3$                          Z+.*926*/3$\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n ?{47}.{tyg}\\\\                  ?{47}.{tgy}\\\\\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n abc>dvh+91                            obc>dvh+91\n",
        type: "trueorfalse", Ans: "Not Identical"}
    , //82
    {question: "Find whether two sets are identical:\n\n (&).(*).(3).(@)                  (&).(*).(8).(@)\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n (@)3794(@)                            (@)3794(@}\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n <1839>~vrpm~                        <1830>~vrpm~\n",
        type: "trueorfalse", Ans: "Not Identical"}
    , //86
    {question: "Find whether two sets are identical:\n\n +{070<<_>uko                        +{070<<_>uko\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 6^3x4&10%                             6^3x4&10%9\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 6xz*6pm&40&                            681034796\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 37147@45+z                            37147@45+z\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 99877655                                998II655\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n *$”<g>?/                                 *$”<g>?/\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n vejk>09))                              vejk>09))\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n AH60MZ91                                AH60MZ91\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n {690&6#$8}                            {690&6#$8}\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 2-9%3/1+0*5                          2-9%3/1+0*5\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 9.256*6.23=?                        9.256*6.23=8\n",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n a@b#c$d%e                              a@b#c$d%e\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n k9/6c-sz+v8                          k9/6c-sz+v8\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n 0{+81%)032(                          0{+81%)032(\n",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {question: "Find whether two sets are identical:\n\n B+.*956*|3$                          B+.*956*|3$\n",
        type: "trueorfalse", Ans: "Identical"}
];