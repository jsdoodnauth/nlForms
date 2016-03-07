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
    },
    'click .btnAdd': function(e) {
      var btn = $(e.target);
      if (btn.hasClass('active')) {
        var text = btn.val();
        var preText = $('.services-added').html();
        preText= preText.replace(text + "<br>", "");
        $('.services-added').html(preText);
        if (preText.length < 1) {
          $('.services-added-sub').addClass("hide");
          $('.product-comparison-list').removeClass('active');
        }
        btn.html('Add +').removeClass('active');
      }
      else {
        var text = btn.val();
        var preText = $('.services-added').html();
        $('.services-added').html(preText + "" + text + "<br />");
        $('.services-added-sub').removeClass("hide");
        $('.product-comparison-list').addClass('active');
        btn.addClass('active').html("<img src='img/checkmark.png' alt='' />");
      }
    },
    'change .empField': function(e) {
      var total = 0;
      console.log($('.empField2').length);
      if ($('.empField1').val().length > 0) { total += parseInt($('.empField1').val()); }
      if ($('.empField2').val().length > 0) { total += parseInt($('.empField2').val()); }
      if ($('.empField3').val().length > 0) { total += parseInt($('.empField3').val()); }
      if ($('.empField4').val().length > 0) { total += parseInt($('.empField4').val()); }
      $('.empTotal').val(total);

    },
    'click input.rdServiceSelection': function(e) {
      var val = $(e.target).val();
      $('.rdServiceSelection-table').removeClass('active');
      $('.rdServiceSelection-' + val).addClass('active');
    },
    'click input.rdErrorSelection': function(e) {
      var val = $(e.target).val();
      $('.rdErrorSelection-table').removeClass('active');
      $('.rdErrorSelection-' + val).addClass('active');
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
  var DELAY = 1000;
  switch (stepClass) {
    case 1:
      $('.companyStructure-container').removeClass('active').fadeOut('fast', function() {
        $('.services-container').delay(DELAY).addClass('active').fadeIn();
        console.log('animation done');
      });

      $('#btnBackStep').addClass('hide');
      break;
    case 2:
      $('.companyLocation-container').removeClass('active').fadeOut();
      $('.services-container').removeClass('active').fadeOut('fast', function() {
        $('.companyStructure-container').delay(DELAY).addClass('active').fadeIn();
      });
      $('#btnBackStep').removeClass('hide');
      break;
    case 3:
      $('.companyOperations-container').removeClass('active').fadeOut();
      $('.companyStructure-container').removeClass('active').fadeOut('fast', function() {
          $('.companyLocation-container').delay(DELAY).addClass('active').fadeIn();
      });
      break;
    case 4:
      $('.finalizeService-container').removeClass('active').fadeOut();
      $('.companyLocation-container').removeClass('active').fadeOut('fast', function() {
          $('.companyOperations-container').delay(DELAY).addClass('active').fadeIn();
      });

      break;
    case 5:
      $('.companyOperations-container').removeClass('active').fadeOut('fast', function() {
          $('.finalizeService-container').delay(DELAY).addClass('active').fadeIn();
      });

      break;
    case 6:
      $('.finalizeService-container').removeClass('active').fadeOut('fast', function() {
          $('.left-panel.service-selection-container').fadeOut();
          $('.right-panel').fadeOut();
          $('.carrier-selection-container').delay(DELAY).addClass('active').fadeIn();
      });
      break;
    case 7:
      $('.carrier-selection-container').removeClass('active').fadeOut('fast', function() {
          $('.payment-container').delay(DELAY).addClass('active').fadeIn();
      });

      break;
    case 8:
      $('.payment-container').removeClass('active').fadeOut('fast', function() {
          $('.completion-container').delay(DELAY).addClass('active').fadeIn();
      });
      $('html').css('background-color','#FFF');
      break;
    default:
    break;
  }
  if (stepClass == 5) { $('#btnNextStep').text("Final Step"); }
  else { $('#btnNextStep').text("Next Step"); }
  document.getElementById('hidSteps').value = stepClass;
  setProgressPercent((stepClass*10));
}

function setProgressPercent(val) {
  var percent = val;
  $('.progress-bar-value .val').html(percent + '%');
  $('.progress-bar-completed').css('width', percent + '%');
}
