
var mainCtrl;
var testCtrl;

angular.module('JLRAssessment.controllers.Main', [])
        .controller('MainController', function ($scope) {
            mainCtrl = this;
            mainCtrl.back = function () {
                window.history.go(-1);
                mainCtrl.showPrevious = false;
                mainCtrl.showStart = false;
                mainCtrl.showNext = false;
                mainCtrl.showEnd = false;
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
            testCtrl.tests = [
                {
                    id: 1,
                    name: 'Assessment 1',
                    timed: true,
                    description: "blah blah blah",
                    questions: [
                        {
                            qid: 1,
                            question: "1. Find whether two sets are identical:\n\n 4824                        4842\n",
                            type: 'trueorfalse'
                        },
                        {
                            qid: 2,
                            question: "2. Find whether two sets are identical:\n\n 89472                     89472\n",
                            type: 'trueorfalse'
                        },
                        {
                            qid: 3,
                            question: "3. Find whether two sets are identical:\n\n 62958                     622\n",
                            type: 'trueorfalse'
                        },
                        {
                            qid: 4,
                            question: "4. Find whether two sets are identical:\n\n 101000                10100\n",
                            type: 'trueorfalse'
                        }
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
            testCtrl.questions = testCtrl.tests[testCtrl.testid - 1].questions;
            testCtrl.description = testCtrl.tests[testCtrl.testid - 1].description;
            
            
            
            mainCtrl.showPrevious = testCtrl.pageid > 1;
            mainCtrl.showStart = testCtrl.pageid == 0;
            mainCtrl.showNext = testCtrl.pageid > 0 && testCtrl.pageid < testCtrl.questions.length;
            mainCtrl.showEnd = testCtrl.pageid == testCtrl.questions.length;
            
            testCtrl.showStart = mainCtrl.showStart;
            
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

            
        });