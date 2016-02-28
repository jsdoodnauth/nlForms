if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  var cityAvilable = ["toronto","hamilton","ottawa"];
  var industryAvilable = ["accounting","advertising","aerospace","architecture","banking","business","computer","financial","insurance","medical","medicine","retail","technology" ];

  Template.nlForm.helpers({
    counter: function () {
      return Session.get('counter');
    },
    cityCollection: [{name: "toronto"}, {name: "hamilton"}, {name: "ottawa"}]
  });

  Template.nlForm.events({
    'change .inputCompany': function(e) {
      //Session.set('counter', Session.get('counter') + 1);
        $('.panel2').addClass('show');
    },

    'change .inputCity': function(e) {console.log('hit2');
        if ($('.inputCity').val() && ($('.inputStatus').val() > 0)) {
          var city = $(".inputCity").val().toLowerCase();
          var found = $.inArray(city, cityAvilable) > -1;
          if (found) {
            if ($('.inputStatus').val() == '1') {
                $('.panel3').hide();
                $('.panel4').removeAttr('style','display:none').addClass('show');
                $('.panelemail').removeClass('show');
            }
            if ($('.inputStatus').val() == '2') {
              $('.panel3').removeAttr('style','display:none').addClass('show');
              $('.panel4').removeClass('show');
              $('.panelemail').removeClass('show');
            }
          }
          else {
            $('.panel3').hide();
            $('.panel4').hide();
            $('.panelemail').addClass('show');
          }
        }
      },

    'change .inputStatus': function(e) {console.log('hit3');
        if ($('.inputCity').val() && ($('.inputStatus').val() > 0)) {
          var city = $(".inputCity").val().toLowerCase();
          var found = $.inArray(city, cityAvilable) > -1;
          if (found) {
            if ($('.inputStatus').val() == '1') {
                $('.panel3').hide();
                $('.panel4').removeAttr('style','display:none').addClass('show');
                $('.panelemail').removeClass('show');
            }
            if ($('.inputStatus').val() == '2') {
              $('.panel3').removeAttr('style','display:none').addClass('show');
              $('.panel4').removeClass('show');
              $('.panelemail').removeClass('show');
            }
          }
          else {
            $('.panel3').hide();
            $('.panel4').hide();
            $('.panelemail').addClass('show');
          }
        }
    },

    'keyup .inputRev': function(e) {
        $('.inputRev').val(commaSeparateNumber($('.inputRev').val()));
    },
    'change .inputRev': function(e) {
      console.log('hit4');
        $('.panel4').addClass('show');
    },

    'change .inputIndustry': function(e) {
        var industry = $(".inputIndustry").val().toLowerCase();
        var found = $.inArray(industry, industryAvilable) > -1;
        if (found) {
          $('.panelsubmit').addClass('show');
          $('.panelemail').removeClass('show').hide();
        }
        else {
          $('.panelemail').removeAttr('style','display:none').addClass('show');
          $('.panelsubmit').removeClass('show');
        }
    },

    'change .panelemail': function(e) {
      $('.panelsubmit').addClass('show');
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
