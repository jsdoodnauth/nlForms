if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);



  Template.nlForm.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.nlForm.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.nlForm.events({
    'change .input1': function(e) {
        $('.panel2').addClass('show');
    }
  });

  Template.nlForm.events({
    'change .input2': function(e) {console.log('hit2');
        if ($('.input2').val() && ($('.input3').val() > 0)) {
          if ($('.input3').val() == '1') {
              $('.panel4').addClass('show');
              $('.panel3').hide();
          }
          if ($('.input3').val() == '2') {
            $('.panel3').removeAttr('style','display:none').addClass('show');
            $('.panel4').removeClass('show');
          }
        }
      }
  });

  Template.nlForm.events({
    'change .input3': function(e) {console.log('hit3');
        if ($('.input2').val() && ($('.input3').val() > 0)) {
          if ($('.input3').val() == '1') {
              $('.panel4').addClass('show');
              $('.panel3').hide();
          }
          if ($('.input3').val() == '2') {
            $('.panel3').removeAttr('style','display:none').addClass('show');
            $('.panel4').removeClass('show');
          }
        }
    }
  });

  Template.nlForm.events({
    'keyup .input4': function(e) {
        $('.input4').val(commaSeparateNumber($('.input4').val()));
    }
  });

  Template.nlForm.events({
    'change .input4': function(e) {
      console.log('hit4');
        $('.panel4').addClass('show');
    }
  });

  Template.nlForm.events({
    'change .input5': function(e) {
        $('.panel5').addClass('show');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

function commaSeparateNumber(num){
  var out = num.replace(/\,/g,"");
  return out.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
