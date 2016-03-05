if (Meteor.isClient) {
  console.log('client loaded')
  Template.createQuote.events({
    'click #btnNextStep': function(e) {
      var stepClass = document.getElementById('hidSteps').value;
      stepClass++;
      StepController(stepClass);

      $('.progress-steps-container ul.progress-steps li.step' + stepClass).addClass('active');
      $('.progress-steps-container ul.progress-steps li.step' + (stepClass-1)).addClass('complete');
    },
    'click #btnBackStep': function(e) {
      var stepClass = document.getElementById('hidSteps').value;
      stepClass--;
      StepController(stepClass);

      $('.progress-steps-container ul.progress-steps li.step' + (stepClass+1)).removeClass('active').removeClass('complete');
      $('.progress-steps-container ul.progress-steps li.step' + stepClass).removeClass('complete').addClass('active');
    },
    'click .carrier-selection-list > ul > li': function(e) {
      var stepClass = document.getElementById('hidSteps').value;
      stepClass++;
      StepController(stepClass);

      $('.progress-steps-container ul.progress-steps li.step' + (stepClass+1)).removeClass('active').removeClass('complete');
      $('.progress-steps-container ul.progress-steps li.step' + stepClass).removeClass('complete').addClass('active');
    },
    'click #btnPayment': function(e) {
      var stepClass = document.getElementById('hidSteps').value;
      stepClass++;
      StepController(stepClass);

      $('.progress-steps-container ul.progress-steps li.step' + (stepClass+1)).removeClass('active').removeClass('complete');
      $('.progress-steps-container ul.progress-steps li.step' + stepClass).removeClass('complete').addClass('active');
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}


function StepController(stepClass) {
      // 1 -> .services-container
      // 2 -> .companyStructure-container
      // 3 -> .companyLocation-container
      // 4 -> .companyOperations-container
      // 5 -> .finalizeService-container
      // 6 -> .carrier-selection-container
      // 7 -> .payment-container
      // 8 -> .completion-container
  switch (stepClass) {
    case 1:
      $('.companyStructure-container').removeClass('active');
      $('.services-container').addClass('active');
      $('#btnBackStep').addClass('hide');
      break;
    case 2:
      $('.services-container').removeClass('active');
      $('.companyLocation-container').removeClass('active');
      $('.companyStructure-container').addClass('active');
      $('#btnBackStep').removeClass('hide');
      break;
    case 3:
      $('.companyStructure-container').removeClass('active');
      $('.companyOperations-container').removeClass('active');
      $('.companyLocation-container').addClass('active');
      break;
    case 4:
      $('.companyLocation-container').removeClass('active');
      $('.finalizeService-container').removeClass('active');
      $('.companyOperations-container').addClass('active');
      break;
    case 5:
      $('.companyOperations-container').removeClass('active');
      $('.finalizeService-container').addClass('active');
      break;
    case 6:
      $('.finalizeService-container').removeClass('active');
      $('.left-panel.service-selection-container').fadeOut();
      $('.right-panel').fadeOut();
      $('.carrier-selection-container').fadeIn();
      break;
    case 7:
      $('.carrier-selection-container').fadeOut();
      $('.payment-container').fadeIn();
      break;
    case 8:
      $('.payment-container').fadeOut();
      $('.completion-container').fadeIn();
      break;
    default:
    break;
  }
  if (stepClass == 5) { $('#btnNextStep').text("Final Step"); }
  else { $('#btnNextStep').text("Next Step"); }
  document.getElementById('hidSteps').value = stepClass;

}
