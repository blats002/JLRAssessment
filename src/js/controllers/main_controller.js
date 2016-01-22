
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
var interviewCtrl;

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
            testCtrl.questions = new Array();
            var timer = 0;
            if (id === 1) {
                timer = 60 * 4;
            }

            if (id === 3) {
                timer = 60 * 9.5;
            }
            if (id < 3) {
                tempArray.shuffle();
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
        })
        .controller('InterviewController', function ($scope, $rootScope, $routeParams, ngDialog, $timeout) {
            interviewCtrl = this;
            interviewCtrl.questions=interviewquestions;
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
                patternquestion: "D T R B N I Z P A I H L A Q I H D T V L W Y E B U\n\
2 0 5 1 8 3 6 2 4 3 7 9 2 7 2 0 1 3 5 8 4 8 4 9 3",
                question: "Add up the digits that appear under “ I“ and then add up the digits that appear under “ L“. If the first sum is larger that the second, enter the sum of the second. If the second is larger that the first, enter the sum of the first, if they are equal, enter 33.",
                type: "pattern",
                CorrectAnswer: '8',
                answer: ""

            }
            ,
            {
                patternquestion:"A F R E H N Y E C U E K X L X A G K P S Q V J T M\n\
1 5 6 7 0 5 3 2 8 4 5 9 2 3 4 5 0 2 1 7 5 3 6 8 4",
                question: "Add up the digits that appear under “ A“ and then add up the digits that appear under “ X“. If the first sum is larger that the second, enter the sum of the second. If the second is larger that the first, enter the sum of the first, if they are equal, enter 11.",
                type: "pattern",
                CorrectAnswer: '11',
                answer: ""
            }
            ,
            {
                patternquestion:"T G N E C B S J C M W I S L Z R K V S P A C Y Q U \n\
1 5 3 2 8 5 7 3 9 0 2 3 6 8 3 7 3 2 4 6 9 7 1 2 5",
                question: "Add up the digits that appear under “S “ and then add up the digits that appear under “ C“. If the first sum is larger that the second, enter the sum of the second. If the second is larger that the first, enter the sum of the first, if they are equal, enter 76.",
                type: "pattern",
                CorrectAnswer: '17',
                answer: ""
            }
            ,
            {
                patternquestion:"X J W R C U C O P T Q Y V X A N K N L X N H Q B Z\n\
3 5 7 1 7 4 3 4 5 9 0 6 4 1 5 3 8 6 5 4 1 2 7 8 0",
                question: "Add up the digits that appear under “N“ and then add up the digits that appear under “ Q“. If the first sum is larger that the second, enter the sum of the second. If the second is larger that the first, enter the sum of the first, if they are equal, enter 27.",
                type: "pattern",
                CorrectAnswer: '7',
                answer: ""
            }
            ,
            {
                patternquestion:"W I C B A G W R F B J L D F E U P Q K H D N V M X\n\\n\
4 8 9 4 2 0 6 3 5 7 9 6 3 2 1 3 0 8 9 5 7 1 5 9 2",
                question: "Add up the digits that appear under “C“ and then add up the digits that appear under “Q“. If the first sum is larger that the second, enter the sum of the second. If the second is larger that the first, enter the sum of the first, if they are equal, enter 53.",
                type: "pattern",
                CorrectAnswer: '8',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 12,
        questions: [
            {
                patternquestion:"P Q W E T V X N O I A F G D F T Y C W E P V Z L O\n\
0 1 4 6 5 3 9 3 7 8 2 1 5 3 7 4 8 5 0 7 2 8 4 7 3",
                question: "Look at the eight right most digits. Find the digit among these that stands to the left of the digit that is below the letter W. Enter that digit.",
                type: "pattern",
                CorrectAnswer: '0',
                answer: ""

            }
            ,
            {
                patternquestion:"E C A B Y V Z P Q U V E H K F S V S B W U M Q L R\n\
8 9 5 4 2 3 1 0 1 7 5 8 6 4 9 5 2 3 7 9 5 8 1 3 4",
                question: "Look at the eleven right most digits. Find the digit among these that stands to the left of the digit that is below the letter S. Enter that digit.",
                type: "pattern",
                CorrectAnswer: '5',
                answer: ""
            }
            ,
            {
                patternquestion:"T S V T M W X M G D J W H X L P U B C A F A G R H\n\
3 8 9 1 4 2 0 4 7 8 6 0 3 1 5 8 3 2 4 6 3 8 7 0 1",
                question: "Look at the seven right most digits. Find the digit among these that stands to the left of the digit that is below the letter A. Enter that digit.",
                type: "pattern",
                CorrectAnswer: '6',
                answer: ""
            }
            ,
            {
                patternquestion:"A R B T D N A J H D X F G D P Q Y B G D G X Z Q G\n\
6 5 9 8 7 4 5 6 2 3 0 1 4 8 9 6 3 0 2 1 5 8 7 8 5",
                question: "Look at the nine right most digits.Find the digits among these that stands to the left of the digit that is below the D. Enter that digit.",
                type: "pattern",
                CorrectAnswer: '1',
                answer: ""
            }
            ,
            {
                patternquestion:"X V N T D X E J H P X F R T X Q Y B T L G L T M Y\n\
9 3 5 7 9 3 2 6 9 4 0 1 2 8 4 3 7 8 2 7 5 8 4 1 2",
                question: "Look at the ten left most digits.Find the digits among these that stands to the left of the digit that is below the T. Enter that digit.",
                type: "pattern",
                CorrectAnswer: '7',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 13,
        questions: [
            {
                question: "Enter the first digit of the largest number and the middle digit of the smallest number of the following list of numbers: (enter from left to right without space)",
                patternquestion:"1203041200 200103 102301150340 200864 00125 0403120",
                type: "pattern2",
                CorrectAnswer: '11',
                answer: ""
            }
            ,
            {
                question: "Enter the first digit of the largest number and the middle digit of the smallest number of the following list of numbers: (enter from left to right without space)",
                patternquestion:"200210325004 0015632 201450002 00213 00122301 001233",
                type: "pattern2",
                CorrectAnswer: '22',
                answer: ""
            }
            ,
            {
                question: "Enter the first digit of the largest number and the middle digit of the smallest number of the following list of numbers: (enter from left to right without space)",
                patternquestion:"500310 12003201 102510032  10023 2004130120 200134002300",
                type: "pattern2",
                CorrectAnswer: '20',
                answer: ""
            }
            ,
            {
                question: "Enter the first digit of the largest number and the middle digit of the smallest number of the following list of numbers: (enter from left to right without space)",
                patternquestion:"200310 02310 0053301204 02260403100 102103204200 00123014",
                type: "pattern2",
                CorrectAnswer: '13',
                answer: ""
            }
            ,
            {
                question: "Enter the first digit of the largest number and the middle digit of the smallest number of the following list of numbers: (enter from left to right without space)",
                patternquestion:"100320123005 25165161 121021",
                type: "pattern2",
                CorrectAnswer: '11',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 14,
        questions: [
            {
                question: "If the following list of numbers, if the sum of the even numbers is larger than the sum of the odd numbers, enter 250. If the sum of the odd numbers is larger, enter 150, and if they are equal, enter 50.",
                patternquestion:"5, 9, 4, 2, 1, 8, 3, 5",
                type: "pattern2",
                CorrectAnswer: '150',
                answer: ""
            }
            ,
            {
                question: "If the following list of numbers, if the sum of the even numbers is larger than the sum of the odd numbers, enter 250. If the sum of the odd numbers is larger, enter 150, and if they are equal, enter 50.",
                patternquestion:"8, 9, 2, 7, 6, 1, 5, 6",
                type: "pattern2",
                CorrectAnswer: '50',
                answer: ""
            }
            ,
            {
                question: "If the following list of numbers, if the sum of the even numbers is larger than the sum of the odd numbers, enter 250. If the sum of the odd numbers is larger, enter 150, and if they are equal, enter 50.",
                patternquestion:"9, 4, 1, 2, 1, 8, 7, 2",
                type: "pattern2",
                CorrectAnswer: '150',
                answer: ""
            }
            ,
            {
                question: "If the following list of numbers, if the sum of the even numbers is larger than the sum of the odd numbers, enter 250. If the sum of the odd numbers is larger, enter 150, and if they are equal, enter 50.",
                patternquestion:"8, 9, 6, 7, 6, 1, 4, 3",
                type: "pattern2",
                CorrectAnswer: '250',
                answer: ""
            }
            ,
            {
                question: "If the following list of numbers, if the sum of the even numbers is larger than the sum of the odd numbers, enter 250. If the sum of the odd numbers is larger, enter 150, and if they are equal, enter 50.",
                patternquestion:"3, 5, 2, 4, 6, 0, 1, 3",
                type: "pattern2",
                CorrectAnswer: '50',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 15,
        questions: [
            {
                question: "If it is shorter than 5 cm, enter 5. If it is longer that 12 cm, enter 2, and if it is between 5 cm and 12, enter 512.",
                patternquestion:"|--------------------------------------------------|",
                type: "pattern",
                CorrectAnswer: '512',
                answer: ""
            }
            ,
            {
                question: "If it is shorter than 7 cm, enter 7. If it is longer that 13 cm, enter 3, and if it is between 7 cm and 13, enter 713.",
                patternquestion:"|--------------------------------------------------------------|",
                type: "pattern",
                CorrectAnswer: '7',
                answer: ""
            }
            ,
            {
                question: "If it is shorter than 8 cm, enter 8. If it is longer that 15 cm, enter 5, and if it is between 8 cm and 15, enter 815.",
                patternquestion:"|--------------------------------------------------------------------|",
                type: "pattern",
                CorrectAnswer: '8',
                answer: ""
            }
            ,
            {
                question: "If it is shorter than 9 cm, enter 9. If it is longer that 12 cm, enter 2, and if it is between 9 cm and 12, enter 912.",
                patternquestion:"|---------------------------------------------------------------------------------------------------------------|",
                type: "pattern",
                CorrectAnswer: '2',
                answer: ""
            }
            ,
            {
                question: "If it is shorter than 8 cm, enter 8. If it is longer that 14 cm, enter 4, and if it is between 8 cm and 14, enter 814.",
                patternquestion:"|---------------------------------------------------------------------------------|",
                type: "pattern2",
                CorrectAnswer: '814',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 16,
        questions: [
            {
                question: "Enter the number that appears to the left of the list of letters that is the same as: 1X11V1VX1X",
                patternquestion:"1)  1X11VXV11X\t2)  1X11VVX11X\t3)  1X1VXV11X1\n\
\t4)  1X1V1XV11X\t5)  1X11V1VX1X",
                type: "pattern2",
                CorrectAnswer: '5',
                answer: ""

            }
            ,
            {
                question: "Enter the number that appears to the left of the list of letters that is the same as: 1XV1X1VX1X",
                patternquestion:"1)  1VX1X1VX1X\t2)  1XV1X1VX1X\t3)  1XV1X1V1X1\n\
\t4)  1XV1X1XX1X\t5)  1XV1V1VX1X",
                type: "pattern2",
                CorrectAnswer: '2',
                answer: ""
            }
            ,
            {
                question: "Enter the number that appears to the left of the list of letters that is the same as: V1X1X1VX1X",
                patternquestion:"1)  V1X1X1XV1X\t2)  VX1X1XVX1X\t3)  V1X1X1VV1X\n\
\t4)  V1X1X1VX1X\t5)  V1X1XV1X1X",
                type: "pattern2",
                CorrectAnswer: '4',
                answer: ""
            }
            ,
            {
                question: "Enter the number that appears to the left of the list of letters that is the same as: X1XV1VX11X",
                patternquestion:"1)  X1XV1VX11V\t2)  X1XV1VX11X\t3)  X1XVX1X11X\n\
\t4)  X1XV1XV11X\t5)  X1VV1VX11X",
                type: "pattern2",
                CorrectAnswer: '2',
                answer: ""
            }
            ,
            {
                question: "Enter the number that appears to the left of the list of letters that is the same as: X1VXV1VX1V",
                patternquestion:"1)  X1VXV1VX1V\t2)  X1VXV1XV1V\t3)  X1XVX1X11X\n\
\t4)  X1VX1VVX1V\t5)  X1VV1VX11X",
                type: "pattern2",
                CorrectAnswer: '1',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 17,
        questions: [
            {
                question: "If the following two numbers are the same, enter 23. If the right number is two times the left enter 8. If the right number is smaller than the left, enter 2.",
                patternquestion1:"52341164",
                patternquestion2:"52341162",
                type: "pattern3",
                CorrectAnswer: '2',
                answer: ""

            }
            ,
            {
                question: "If the following two numbers are the same, enter 88. If the right number is three times the left enter 6. If the right number is smaller than the left, enter 0.",
                patternquestion1:"23541231",
                patternquestion2:"70623693",
                type: "pattern3",
                CorrectAnswer: '6',
                answer: ""
            }
            ,
            {
                question: "If the following two numbers are the same, enter 14. If the right number is ten times the left enter 0. If the right number is smaller than the left, enter 5.",
                patternquestion1:"11000000",
                patternquestion2:"110000000",
                type: "pattern3",
                CorrectAnswer: '0',
                answer: ""
            }
            ,
            {
                question: "If the following two numbers are the same, enter 86. If the right number is four times the left enter 4. If the right number is smaller than the left, enter 7.",
                patternquestion1:"78221684",
                patternquestion2:"78221684",
                type: "pattern3",
                CorrectAnswer: '86',
                answer: ""
            }
            ,
            {
                question: "If the following two numbers are the same, enter 30. If the right number is six times the left enter 1. If the right number is smaller than the left, enter 3.",
                patternquestion1:"21364557",
                patternquestion2:"21364575",
                type: "pattern3",
                CorrectAnswer: '3',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 18,
        questions: [
            {
                question: "Enter the number of the group of letters that differs from the others:",
                patternquestion:"1)  KKLM    2)  QQRS    3)  NNOP    4)  HHIK",
                type: "pattern2",
                CorrectAnswer: '4',
                answer: ""

            }
            ,
            {
                question: "Enter the number of the group of letters that differs from the others:",
                patternquestion:"1)  WWXZ   2)  RRST   3)  CCDE   4)  MMNO",
                type: "pattern2",
                CorrectAnswer: '1',
                answer: ""
            }
            ,
            {
                question: "Enter the number of the group of letters that differs from the others:",
                patternquestion:"1)  LMMN   2)  ABBC   3)  PQQR   4)  IKKL",
                type: "pattern2",
                CorrectAnswer: '4',
                answer: ""
            }
            ,
            {
                question: "Enter the number of the group of letters that differs from the others:",
                patternquestion:"1)  HIJJ   2)  MNOO   3)  DEGG   4)  STUU",
                type: "pattern2",
                CorrectAnswer: '3',
                answer: ""
            }
            ,
            {
                question: "Enter the number of the group of letters that differs from the others:",
                patternquestion:"1)  KKLM   2)  FFGJ   3)  VVWX   4)  OOPQ",
                type: "pattern2",
                CorrectAnswer: '2',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 19,
        questions: [
            {
                question: "Enter how many times the digit 4 appears just after an odd number (go from left to right):",
                patternquestion:"2 4 1 5 4 5 9 7 1 5 7 4 0 8 9 4 4",
                type: "pattern2",
                CorrectAnswer: '4',
                answer: ""

            }
            ,
            {
                question: "Enter how many times the digit 0 appears just after an odd number (go from left to right):",
                patternquestion:"2 4 0 6 0 7 0 9 0 0 2 3 0 4 8 0 4",
                type: "pattern2",
                CorrectAnswer: '5',
                answer: ""
            }
            ,
            {
                question: "Enter how many times the digit 7 appears just after an odd number (go from left to right):",
                patternquestion:"2 7 3 1 7 0 2 7 0 9 7 8 3 5 6 1 4",
                type: "pattern2",
                CorrectAnswer: '3',
                answer: ""
            }
            ,
            {
                question: "Enter how many times the digit 5 appears just after an odd number (go from left to right):",
                patternquestion:"0 1 2 6 4 5 9 7 0 5 0 6 0 4 0 3 6",
                type: "pattern2",
                CorrectAnswer: '2',
                answer: ""
            }
            ,
            {
                question: "Enter how many times the digit 3 appears just after an odd number (go from left to right):",
                patternquestion:"7 3 1 3 6 4 0 3 8 7 2 4 9 0 3 6 3",
                type: "pattern2",
                CorrectAnswer: '5',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 20,
        questions: [
            {
                question: "Enter the second digit (from right) of the number that appears under the word that is different from the other words in the function it serves:",
                patternquestion:"SNAKE   BEAR   LIZARD   CROCODIL   TURTLE\n\
3456    5648   3360     5679       4563",
                type: "pattern2",
                CorrectAnswer: '4',
                answer: ""

            }
            ,
            {
                question: "Enter the third digit (from right) of the number that appears under the word that is different from the other words in the function it serves:",
                patternquestion:"BOOK   FLOWER   DESK   CHAIR   LAMP\n\
1345   3125     4213   3123    1234",
                type: "pattern2",
                CorrectAnswer: '1',
                answer: ""
            }
            ,
            {
                question: "Enter the third digit (from left) of the number that appears under the word that is different from the other words in the function it serves:",
                patternquestion:"JUICE   WATER   WINE   MILK   ICE\n\
6547    7548    6887   7404   6197",
                type: "pattern2",
                CorrectAnswer: '9',
                answer: ""
            }
            ,
            {
                question: "Enter the second digit (from left) of the number that appears under the word that is different from the other words in the function it serves:",
                patternquestion:"BRICK   ROCK   OXYGEN   STEEL   GOLD\n\
2764    4466   1793     2476    1837",
                type: "pattern2",
                CorrectAnswer: '7',
                answer: ""
            }
            ,
            {
                question: "Enter the first digit (from right) of the number that appears under the word that is different from the other words in the function it serves:",
                patternquestion:"ORANGE   APPLE   TOMATO   BANANA   MANGO\n\
2921     4563    4312     2201     4176",
                type: "pattern2",
                CorrectAnswer: '2',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 21,
        questions: [
            {
                question: "Look at the following two numbers. If the right number has larger number of digits and it is also larger value, enter 444. If the left number has a larger number of digits and is smaller in value enter 111, and if the left number has a fewer number of digits and its value is larger, enter 333.",
                patternquestion1:"51214.825",
                patternquestion2:"71648.27",
                type: "pattern3",
                CorrectAnswer: '111',
                answer: ""

            }
            ,
            {
                question: "Look at the following two numbers. If the right number has larger number of digits and it is also larger value, enter 555. If the left number has a larger number of digits and is smaller in value enter 999, and if the left number has a fewer number of digits and its value is larger, enter 222.",
                patternquestion1:"5124.32",
                patternquestion2:"1715.345",
                type: "pattern3",
                CorrectAnswer: '222',
                answer: ""
            }
            ,
            {
                question: "Look at the following two numbers. If the right number has larger number of digits and it is also larger value, enter 777. If the left number has a larger number of digits and is smaller in value enter 555, and if the left number has a fewer number of digits and its value is larger, enter 111.",
                patternquestion1:"74256.21",
                patternquestion2:"845124.48",
                type: "pattern3",
                CorrectAnswer: '555',
                answer: ""
            }
            ,
            {
                question: "Look at the following two numbers. If the right number has larger number of digits and it is also larger value, enter 888. If the left number has a larger number of digits and is smaller in value enter 333, and if the left number has a fewer number of digits and its value is larger, enter 999.",
                patternquestion1:"544587.94",
                patternquestion2:"54487.9437",
                type: "pattern3",
                CorrectAnswer: '999',
                answer: ""
            }
            ,
            {
                question: "Look at the following two numbers. If the right number has larger number of digits and it is also larger value, enter 222. If the left number has a larger number of digits and is smaller in value enter 555, and if the left number has a fewer number of digits and its value is larger, enter 333.",
                patternquestion1:"894317.23",
                patternquestion2:"998251.223",
                type: "pattern3",
                CorrectAnswer: '222',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 22,
        questions: [
            {
                question: "Subtract from the number of months in a year the number of days in a week and enter the result.",
                type: "nopattern",
                CorrectAnswer: '5',
                answer: ""
            }
            ,
            {
                question: "Add the number of hours in a day to  the number of days in a week and enter the result.",
                type: "nopattern",
                CorrectAnswer: '31',
                answer: ""
            }
            ,
            {
                question: "Add the number of hours in two days to  the number of minutes in an hour and enter the result.",
                type: "nopattern",
                CorrectAnswer: '108',
                answer: ""
            }
//            ,
//            {
//                question: "category 22 4of5",
//                type: "nopattern",
//                CorrectAnswer: '0',
//                answer: ""
//            }
//            ,
//            {
//                question: "category 22 5of5",
//                type: "nopattern",
//                CorrectAnswer: '0',
//                answer: ""
//            }
        ]
    }
    ,
    {
        category: 23,
        questions: [
            {
                question: "Enter the largest number of these numbers backwards:",
                patternquestion:"22    43    73    54    97    16    94    58",
                type: "pattern2",
                CorrectAnswer: '79',
                answer: ""

            }
            ,
            {
                question: "Enter the largest number of these numbers backwards:",
                patternquestion:"64    47    11    34    55    67    72    38",
                type: "pattern2",
                CorrectAnswer: '27',
                answer: ""
            }
            ,
            {
                question: "Enter the largest number of these numbers backwards:",
                patternquestion:"73    19    91    54    34    29    95    43",
                type: "pattern2",
                CorrectAnswer: '59',
                answer: ""
            }
            ,
            {
                question: "Enter the largest number of these numbers backwards:",
                patternquestion:"67    53    41    81    73    45    62    33",
                type: "pattern2",
                CorrectAnswer: '18',
                answer: ""
            }
            ,
            {
                question: "Enter the largest number of these numbers backwards:",
                patternquestion:"32    13    27    39    19    11    33    25",
                type: "pattern2",
                CorrectAnswer: '93',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 24,
        questions: [
            {
                question: "Enter the second digit of the largest of these numbers:",
                patternquestion:"7564     7834     8654     8963     7954",
                type: "pattern2",
                CorrectAnswer: '9',
                answer: ""

            }
            ,
            {
                question: "Enter the third digit of the largest of these numbers:",
                patternquestion:"1756     2754     1035     1999     2023",
                type: "pattern2",
                CorrectAnswer: '5',
                answer: ""
            }
            ,
            {
                question: "Enter the second digit of the largest of these numbers:",
                patternquestion:"3712     5100     5033     3911     5101",
                type: "pattern2",
                CorrectAnswer: '1',
                answer: ""
            }
            ,
            {
                question: "Enter the fourth digit of the largest of these numbers:",
                patternquestion:"8245     8241     5421     8263     2456",
                type: "pattern2",
                CorrectAnswer: '3',
                answer: ""
            }
            ,
            {
                question: "Enter the second digit of the smallest of these numbers:",
                patternquestion:"7659     1211     6477     7652     7021",
                type: "pattern2",
                CorrectAnswer: '2',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 25,
        questions: [
            {
                question: "Enter the digit that appears to the left of the shortest word :",
                patternquestion:"1)Happy  2)Wood  3)Hospital  4)Number  5)Light",
                type: "pattern2",
                CorrectAnswer: '2',
                answer: ""

            }
            ,
            {
                question: "Enter the digit that appears to the left of the shortest word :",
                patternquestion:"1)Pineapple  2)Strawberry  3)Country  4)Cucumber  5)Reference",
                type: "pattern2",
                CorrectAnswer: '3',
                answer: ""
            }
            ,
            {
                question: "Enter the digit that appears to the left of the shortest word :",
                patternquestion:"1)Gold  2)Horse  3)Screen  4)Oil  5)Division",
                type: "pattern2",
                CorrectAnswer: '4',
                answer: ""
            }
            ,
            {
                question: "Enter the digit that appears to the left of the shortest word :",
                patternquestion:"1)Water  2)Glasses  3)Illness  4)Styles  5)Tomato",
                type: "pattern2",
                CorrectAnswer: '1',
                answer: ""
            }
            ,
            {
                question: "Enter the digit that appears to the left of the shortest word :",
                patternquestion:"1)Telephone  2)Keyboard  3)Beautiful  4)Control  5)Router",
                type: "pattern2",
                CorrectAnswer: '5',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 26,
        questions: [
            {
                question: "Enter the total number of letters that exists in the second, third , and sixth words in this sentence:",
                type: "nopattern",
                CorrectAnswer: '15',
                answer: ""

            }
            ,
            {
                question: "Enter the total number of letters that exists in the first, fourth , and seventh words in this sentence:",
                type: "nopattern",
                CorrectAnswer: '15',
                answer: ""
            }
            ,
            {
                question: "Enter the total number of letters that exists in the first, second, fifth, and sixth words in this sentence:",
                type: "nopattern",
                CorrectAnswer: '17',
                answer: ""
            }
            ,
            {
                question: "Enter the total number of letters that exists in the first, third, and ninth words in this sentence:",
                type: "nopattern",
                CorrectAnswer: '12',
                answer: ""
            }
            ,
            {
                question: "Enter the total number of letters that exists in the second, third, fifth, and sixth words in this sentence:",
                type: "nopattern",
                CorrectAnswer: '17',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 27,
        questions: [
            {
                question: "How many times does the word \"simple\" appear after the word \"season\" in the list below? Enter the answer:",
                patternquestion:"PEOPLE  SIMPLE  SEASON  SIMPLE  AUTUMN  SIMPLE  WINTER  PEOPLE  PEOPLE  SEASON",
                type: "pattern2",
                CorrectAnswer: '2',
                answer: ""

            }
            ,
            {
                question: "How many times does the word \"wood\" appear after the word \"mood\" in the list below? Enter the answer:",
                patternquestion:"MOOD  ROUTE  LESS  MOOD  WOOD  COOL  MOOD  WOOD  WOOD  LESS",
                type: "pattern2",
                CorrectAnswer: '3',
                answer: ""
            }
            ,
            {
                question: "How many times does the word \"two\" appear after the word \"ten\" in the list below? Enter the answer:",
                patternquestion:"TEN  WIN  EXIT  TEN  TWO  TEN  TEN  TWO  ONE  TONE  TWO  END  TEN  TWO  MINE",
                type: "pattern2",
                CorrectAnswer: '4',
                answer: ""
            }
            ,
            {
                question: "How many times does the word \"past\" appear after the word \"meal\" in the list below? Enter the answer:",
                patternquestion:"GREEN  MEAL  PAST  MINT  PAST  MEAL  GRILL  RED  PAST  PINK  PAST  MEAL  PAST",
                type: "pattern2",
                CorrectAnswer: '5',
                answer: ""
            }
            ,
            {
                question: "How many times does the word \"oil\" appear after the word \"owl\" in the list below? Enter the answer:",
                patternquestion:"OWN  OIL  OWL  OWN  ONE  OIL  OWN  UNDER  OWNER  OIL  OWN  ONE  OIL  OWNER  OWL",
                type: "pattern2",
                CorrectAnswer: '3',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 28,
        questions: [
            {
                question: "If the sum of the two numbers 41 and 54 is greater than the difference between the two numbers 512 and 329, enter the difference between the sum and the difference.If it is greater than the sum, enter the difference between the difference and the sum.",
                type: "nopattern",
                CorrectAnswer: '88',
                answer: ""

            }
            ,
            {
                question: "If the sum of the two numbers 69 and 32 is greater than the difference between the two numbers 441 and 390, enter the difference between the sum and the difference.If it is greater than the sum, enter the difference between the difference and the sum.",
                type: "nopattern",
                CorrectAnswer: '50',
                answer: ""
            }
            ,
            {
                question: "If the sum of the two numbers 19 and 54 is greater than the difference between the two numbers 137 and 67, enter the difference between the sum and the difference.If it is greater than the sum, enter the difference between the difference and the sum.",
                type: "nopattern",
                CorrectAnswer: '3',
                answer: ""
            }
            ,
            {
                question: "If the sum of the two numbers 49 and 57 is greater than the difference between the two numbers 429 and 380, enter the difference between the sum and the difference.If it is greater than the sum, enter the difference between the difference and the sum.",
                type: "nopattern",
                CorrectAnswer: '57',
                answer: ""
            }
            ,
            {
                question: "If the sum of the two numbers 24 and 63 is greater than the difference between the two numbers 245 and 163, enter the difference between the sum and the difference.If it is greater than the sum, enter the difference between the difference and the sum.",
                type: "nopattern",
                CorrectAnswer: '5',
                answer: ""
            }
        ]
    }
    ,
    {
        category: 29,
        questions: [
            {
                question: "Find the third digit of the next-to-smallest number in this series,add 3 to it, and enter the outcome :",
                patternquestion:"89423    56743    48630    12479    10226",
                type: "pattern2",
                CorrectAnswer: '7',
                answer: ""

            }
            ,
            {
                question: "Find the third digit of the next-to-smallest number in this series,add 7 to it, and enter the outcome :",
                patternquestion:"98123    82347    98137    81123    71235",
                type: "pattern2",
                CorrectAnswer: '8',
                answer: ""
            }
            ,
            {
                question: "Find the third digit of the next-to-smallest number in this series,add 5 to it, and enter the outcome :",
                patternquestion:"11340    12004    20015    18664    12076",
                type: "pattern2",
                CorrectAnswer: '5',
                answer: ""
            }
            ,
            {
                question: "Find the third digit of the next-to-smallest number in this series,add 7 to it, and enter the outcome :",
                patternquestion:"81123    64752    62213    51137    70879",
                type: "pattern2",
                CorrectAnswer: '9',
                answer: ""
            }
            ,
            {
                question: "Find the third digit of the next-to-smallest number in this series,add 1 to it, and enter the outcome :",
                patternquestion:"52235    56641    42250    52709    56624",
                type: "pattern2",
                CorrectAnswer: '3',
                answer: ""
            }
        ]
    }
];

var assessment1questions = [
    {
        question: "Find whether two sets are identical:",
        patternquestion: "4824",
        patternquestion1: "4842",
        type: "trueorfalse", 
        Ans: 'Not Identical'}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "89472",
        patternquestion1: "89472",
        type: "trueorfalse", 
        Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "62958",
        patternquestion1: "622",
        type: "trueorfalse", 
        Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "101000",
        patternquestion1: "10100",
        type: "trueorfalse", 
        Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "671242",
        patternquestion1: "671249",
        type: "trueorfalse", 
        Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "12%89",
        patternquestion1: "12%88",
        type: "trueorfalse", 
        Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "ntb/3701",
        patternquestion1: "ntb/3701",
        type: "trueorfalse", 
        Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "459(9+2)",
        patternquestion1: "459(9+2)",
        type: "trueorfalse", 
        Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "5643|72",
        patternquestion1: "5643/72",
        type: "trueorfalse", 
        Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "912?45",
        patternquestion1: "912345",
        type: "trueorfalse", 
        Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "*32890*",
        patternquestion1: "*32899*",
        type: "trueorfalse", 
        Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "86+ABC÷009",
        patternquestion1: "86+ABC÷009",
        type: "trueorfalse", 
        Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "746#586&9",
        patternquestion1: "746#586&9",
        type: "trueorfalse", 
        Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "(5838+78)_258",
        patternquestion1: "(5838+78_258",
        type: "trueorfalse", 
        Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "‘9/6*9/9’",
        patternquestion1: "‘9/6*9/9’",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "(q1-s2)+(q1-82)",
        patternquestion1: "(q1-s2)+(q1-92)",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "(-3+5)i–(2-7)j",
        patternquestion1: "(-3+5)i–(2-7)j",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "A x b x b",
        patternquestion1: "A x b x d",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "sina+sinD",
        patternquestion1: "sina+sinB",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "L.(di/dt) + Ri",
        patternquestion1: "L.(di/dt) +R",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "Ylogydx + (x-logy)",
        patternquestion1: "Ylogydx + (x-logy)",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "(xsec2y – x2cosy)dy",
        patternquestion1: "(xsec2y – x2cosx)dy",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "(a.b) X (b.c) X (c.b)",
        patternquestion1: "(a.b) X (b.c) X (c.d)",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "4.687-2.689=0.290",
        patternquestion1: "4.867-2.689=0.290",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "[{6*p}- 4g&192d]",
        patternquestion1: "[{6*p}-4g&192a]",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "θβα£≤÷×ϳ©",
        patternquestion1: "θβα£≤÷×ϳ©",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "(20.46a@bb)-53",
        patternquestion1: "(20.46a@bb-53",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "#a0b9#c31",
        patternquestion1: "#a0b9#c3!",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "(α+β)2 = α20 + β83",
        patternquestion1: "(α+β)2 = α20 + β83",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "(a.bcosθ)  x (c.dcosθ)",
        patternquestion1: "(a.bcosφ)  x (c.dcosθ)",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "//piyr///*(2+}a{feuw)",
        patternquestion1: "//piyr///*(2+}a{feuw)",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "seca.cosecg/=tanb\*cotd",
        patternquestion1: "seca.cosecg/=tanb\*cotd",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "192.168:184.160",
        patternquestion1: "192.168.184.160",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "{9/3 + 4a +4.a",
        patternquestion1: "{9/3 + 4a +4a",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "9-6+abc @d5++",
        patternquestion1: "9-6+abc @d5++",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "5689Xiuyt+X",
        patternquestion1: "5689Xiuyt+X",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "6756-(6789 x 9878]",
        patternquestion1: "6756-(6789 x 9878",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "ab<cdefg>2+ef/5896",
        patternquestion1: "ab<cdefg2+ef/5896",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "98262489745698",
        patternquestion1: "98262499745698",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "6+9.7:2069589",
        patternquestion1: "6+9.7;2069589",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion : "FFHH6644",
        patternquestion1: "FFHH6644",
        type: "trueorfalse", Ans: "Identical"}
    , //42
    {
        question: "Find whether two sets are identical:",
        patternquestion : "*cotangent<<09455685*",
        patternquestion1: "*cotangent<<09455685",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "2÷3+7.80235/90/",
        patternquestion1: "2÷3+7.80.235/90",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "&adgjl||5735&",
        patternquestion1: "&adgjl||5735&",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "%8975g_opi+489%",
        patternquestion1: "%8975g_opi+489%",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "d5f4g8h9j",
        patternquestion1: "d5f4g8hu4",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "D8F7G6H5J4",
        patternquestion1: "D8F7G6H5J4",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "74859595",
        patternquestion1: "74859595",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "77FF66G",
        patternquestion1: "77FF8G9H0J",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "1F2G3H4N5J",
        patternquestion1: "1F2G3H4N5J",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "÷ë©®®।॥",
        patternquestion1: "÷ë©®©।॥",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "896*30-[08]",
        patternquestion1: "896*30-[08]",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "(9/8)-5!86++",
        patternquestion1: "(9/8)-5!86+",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "{530}28#24",
        patternquestion1: "}530{28#24",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "$$555/$$555",
        patternquestion1: "$$555/$$555",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "65265974:",
        patternquestion1: "65265974:",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "(8146/26-10)",
        patternquestion1: "(8146/26-10)",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "-(afg-i56)+(291)",
        patternquestion1: "(afg-i56)+(291)",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "k|k|//?{-",
        patternquestion1: "k|k|//?{-",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "!*491:-~(y",
        patternquestion1: "!*591:-~(y",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "Bng52!!h8",
        patternquestion1: "Bng52||h8",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "@68^xc_00",
        patternquestion1: "@68^xc_00",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "47852013",
        patternquestion1: "47695325",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "*.*@gtj*.*",
        patternquestion1: "*.*@gtj*.*",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "@qdh2110@",
        patternquestion1: "@qdh2110@",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "H49p52/>7.s*",
        patternquestion1: "H49p52/>7*s*",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "w-w=(e-#290)",
        patternquestion1: "w-w=(e-#290)",
        type: "trueorfalse", Ans: "Identical"}
    , //68
    {
        question: "Find whether two sets are identical:",
        patternquestion: "/538/~fd6",
        patternquestion1: "/538/~fd8",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "604÷560=24",
        patternquestion1: "604÷560=24",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "5682#df>l.l",
        patternquestion1: "5682=df>l.l",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "-7hy0%+517@$",
        patternquestion1: "+7hy0%+517@$",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "+[5247-9824]?",
        patternquestion1: "+[5274-9824]?",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "5868]*[5868",
        patternquestion1: "5868[*]5868",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "$$555/$$555",
        patternquestion1: "$$555/$$555",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "741/83=901",
        patternquestion1: "741-83=901",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "$$d1.$$$",
        patternquestion1: "$$d1.$$8",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: ":5170:2380:",
        patternquestion1: ":5170:2380:",
        type: "trueorfalse", Ans: "Identical"}
    , //78
    {
        question: "Find whether two sets are identical:",
        patternquestion: "826 x 526 = 2356",
        patternquestion1: "826 * 526 = 2356",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "Z+.*926*/3$",
        patternquestion1: "Z+.*926*/3$",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "?{47}.{tyg}\\\\",
        patternquestion1: "?{47}.{tgy}\\\\",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "abc>dvh+91",
        patternquestion1: "obc>dvh+91",
        type: "trueorfalse", Ans: "Not Identical"}
    , //82
    {
        question: "Find whether two sets are identical:",
        patternquestion: "(&).(*).(3).(@)",
        patternquestion1: "(&).(*).(8).(@)",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "(@)3794(@)",
        patternquestion1: "(@)3794(@}",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "<1839>~vrpm~",
        patternquestion1: "<1830>~vrpm~",
        type: "trueorfalse", Ans: "Not Identical"}
    , //86
    {
        question: "Find whether two sets are identical:",
        patternquestion: "+{070<<_>uko",
        patternquestion1: "+{070<<_>uko",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "6^3x4&10%",
        patternquestion1: "6^3x4&10%9",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "6xz*6pm&40&",
        patternquestion1: "681034796",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "37147@45+z",
        patternquestion1: "37147@45+z",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "99877655",
        patternquestion1: "998II655",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "*$”<g>?/",
        patternquestion1: "*$”<g>?/",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "vejk>09))",
        patternquestion1: "vejk>09))",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "AH60MZ91",
        patternquestion1: "AH60MZ91",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "{690&6#$8}",
        patternquestion1: "{690&6#$8}",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "2-9%3/1+0*5",
        patternquestion1: "2-9%3/1+0*5",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "9.256*6.23=?",
        patternquestion1: "9.256*6.23=8",
        type: "trueorfalse", Ans: "Not Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "a@b#c$d%e",
        patternquestion1: "a@b#c$d%e",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "k9/6c-sz+v8",
        patternquestion1: "k9/6c-sz+v8",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "0{+81%)032(",
        patternquestion1: "0{+81%)032(",
        type: "trueorfalse", Ans: "Identical"}
    ,
    {
        question: "Find whether two sets are identical:",
        patternquestion: "B+.*956*|3$",
        patternquestion1: "B+.*956*|3$",
        type: "trueorfalse", Ans: "Identical"}
];

var interviewquestions = [
    {
        index:1,
        questions:"Tell me of an opportunity where you have had to improve a situation? How you did, what you did, any problems and outcome?"
    },
    {
        index:2,
        questions:"Tell me when you have had to teach and train someone else at work? How you did, what you did, any problems and outcome?",
    },
    {
        index:3,
        questions:"Tell me when you have had to deal with a complex project, situation or problem and how you solved it?",
    },
    {
        index:4,
        questions:"Tell me you have built a relationship with someone from a different background? How you did, what you did, any problems and outcome?",
    },
    {
        index:5,
        questions:"Tell me when you have identified a problem with the level of service quality? How you did, what you did, any problems and outcome?",
    },
    {
        index:6,
        questions:"Tell me when you have had to do a repetitive task? How did you ensure quality was kept, how did you keep focused and motivated?",
    },
    {
        index:7,
        questions:"Tell me of a time when you have had to  motivate a colleague? How you did, what you did, any problems and outcome?",
    },
    {
        index:8,
        questions:"Tell me of a time when you were introduced a change at work? How you did, what you did, any problems and outcome?",
    },
    {
        index:9,
        questions:"Tell me of a time when you have sort to develop yourself?",
    },
    {
        index:10,
        questions:"Tell me of a time you have helped a colleague to resolve a work problem?",
    },
    {
        index:11,
        questions:"Do you/can you work/have you worked? shift work, overtime, repetitive work environment?",
    },
    {
        index:12,
        questions:"Why do you want to work for JLR?",
    },
    {
        index:13,
        questions:"How will you travel to JLR?",
    },
    {
        index:14,
        questions:"Tell me of skills you bring & transferrable from previous employment?",
    },
    {
        index:15,
        questions:"Tell me of a time when you made a mistake? How did you correct it?"
    }
];