angular.module('ipod')
    .controller('CreatePanelCtrl', function() {
        var cpc = this;

        cpc.interviewerNumber = 1;
        cpc.interviewerEmails = [];
        cpc.interviewerEmailsInput = [{'value': ''}];


        cpc.incrementInterviewerNumber = function(emailObj) {
            cpc.interviewerEmailsInput.push({})
            cpc.interviewerEmails.push({'value': emailObj.value});
            cpc.interviewerNumber += 1;
            console.log(cpc.interviewerEmails)
        }
    });