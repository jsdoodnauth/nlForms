if (Meteor.isClient) {
  console.log('client loaded')
  Template.createQuote.events({
    'click #btnNextStep': function(e) {
      var stepClass = document.getElementById('hidSteps').value;
      stepClass++;
      StepController(stepClass, 1);

      $('.progress-steps-container ul.progress-steps li.step' + stepClass).addClass('active');
      $('.progress-steps-container ul.progress-steps li.step' + (stepClass-1)).addClass('complete');
    },
    'click #btnBackStep': function(e) {
      var stepClass = document.getElementById('hidSteps').value;
      stepClass--;
      StepController(stepClass, -1);

      $('.progress-steps-container ul.progress-steps li.step' + (stepClass+1)).removeClass('active').removeClass('complete');
      $('.progress-steps-container ul.progress-steps li.step' + stepClass).removeClass('complete').addClass('active');
    },
    'click .carrier-selection-list > ul > li': function(e) {
      var stepClass = document.getElementById('hidSteps').value;
      stepClass++;
      StepController(stepClass, 1);

      $('.progress-steps-container ul.progress-steps li.step' + (stepClass+1)).removeClass('active').removeClass('complete');
      $('.progress-steps-container ul.progress-steps li.step' + stepClass).removeClass('complete').addClass('active');
    },
    'click #btnPayment': function(e) {
      var stepClass = document.getElementById('hidSteps').value;
      stepClass++;
      StepController(stepClass, 1);

      $('.progress-steps-container ul.progress-steps li.step' + (stepClass+1)).removeClass('active').removeClass('complete');
      $('.progress-steps-container ul.progress-steps li.step' + stepClass).removeClass('complete').addClass('active');
    },
    'click .btnAdd': function(e) {
      var btn = $(e.target);
      if (btn.hasClass('active')) {
        if (btn.hasClass('btnAdd1')) { $('.services-added1').removeClass('active').fadeOut(); }
        if (btn.hasClass('btnAdd2')) { $('.services-added2').removeClass('active').fadeOut(); }
        if (btn.hasClass('btnAdd3')) { $('.services-added3').removeClass('active').fadeOut(); }
        if (btn.hasClass('btnAdd4')) { $('.services-added4').removeClass('active').fadeOut(); }
        if (btn.hasClass('btnAdd5')) { $('.services-added5').removeClass('active').fadeOut(); }
        if (btn.hasClass('btnAdd6')) { $('.services-added6').removeClass('active').fadeOut(); }
        if ($('.services-added > div.active').length < 1) {
          $('.progress-bar-section').fadeOut();
          $('.coverage-info-text').fadeIn();
          $('#btnNextStep').fadeOut();
          $('.product-comparison-list').removeClass('active');
        }
        btn.html('Add +').removeClass('active');
      }
      else {
        if (btn.hasClass('btnAdd1')) { $('.services-added1').addClass('active').fadeIn(); }
        if (btn.hasClass('btnAdd2')) { $('.services-added2').addClass('active').fadeIn(); }
        if (btn.hasClass('btnAdd3')) { $('.services-added3').addClass('active').fadeIn(); }
        if (btn.hasClass('btnAdd4')) { $('.services-added4').addClass('active').fadeIn(); }
        if (btn.hasClass('btnAdd5')) { $('.services-added5').addClass('active').fadeIn(); }
        if (btn.hasClass('btnAdd6')) { $('.services-added6').addClass('active').fadeIn(); }
        $('.product-comparison-list').addClass('active');
        $('.coverage-info-text').fadeOut();
        $('.progress-bar-section').fadeIn();
        $('#btnNextStep').fadeIn();
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


function StepController(stepClass, direction) {
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
      if (direction > 0) {
        animate(".companyStructure-container", 'fadeOutRight', 'hide', '.services-container', 'fadeInLeft'); //Forward
      }
      else {
        animate(".companyStructure-container", 'fadeOutLeft', 'hide', '.services-container', 'fadeInRight'); //Back Step
      }
      $('#btnBackStep').addClass('hide');
      break;
    case 2:
      if (direction > 0) {
        animate(".services-container", 'fadeOutRight', 'hide', '.companyStructure-container', 'fadeInLeft'); //Forward
      }
      else {
        animate(".companyLocation-container", 'fadeOutLeft', 'hide', '.companyStructure-container', 'fadeInRight'); //Back Step
      }
      $('#btnBackStep').removeClass('hide');
      break;
    case 3:
      if (direction > 0) {
        animate(".companyStructure-container", 'fadeOutRight', 'hide', '.companyLocation-container', 'fadeInLeft'); //Forward
      }
      else {
        animate(".companyOperations-container", 'fadeOutLeft', 'hide', '.companyLocation-container', 'fadeInRight'); //Back Step
      }
      break;
    case 4:
      if (direction > 0) {
        animate(".companyLocation-container", 'fadeOutRight', 'hide', '.companyOperations-container', 'fadeInLeft'); //Forward
      }
      else {
        animate(".finalizeService-container", 'fadeOutLeft', 'hide', '.companyOperations-container', 'fadeInRight'); //Back Step
      }
      break;
    case 5:
      if (direction > 0) {
        animate(".companyOperations-container", 'fadeOutRight', 'hide', '.finalizeService-container', 'fadeInLeft'); //Forward
      }
      else {
        animate(".companyOperations-container", 'fadeOutLeft', 'hide', '.finalizeService-container', 'fadeInRight'); //Back Step
      }
      break;
    case 6:
      if (direction > 0) {
        animate(".finalizeService-container", 'fadeOut', 'hide', '.carrier-selection-container', 'fadeIn'); //Forward
        $('.left-panel.service-selection-container').fadeOut();
        $('.right-panel').fadeOut();
      }
      break;
    case 7:
      if (direction > 0) {
        animate(".carrier-selection-container", 'fadeOut', 'hide', '.payment-container', 'fadeIn'); //Forward
      }
      break;
    case 8:
      if (direction > 0) {
        animate(".payment-container", 'fadeOut', 'hide', '.completion-container', 'fadeIn'); //Forward
      }
//      $('html').css('background-color','#FFF');
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

function animate(outgoingElement, animationOut, state, activeElement, animationIn) {
    $(outgoingElement).addClass(animationOut);
    var wait = window.setTimeout( function(){
        $(outgoingElement).hide();
        $(activeElement).show().addClass(animationIn);
        $(outgoingElement).removeClass(animationOut)}, 300
    );
    var wait2 = window.setTimeout( function(){
        $(activeElement).removeClass(animationIn)}, 600
    );
}
