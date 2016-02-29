if (Meteor.isClient) {
  var companyAvailable = ["acme corp"];
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
      var company = $(".inputCompany").val().toLowerCase();
      var found = $.inArray(company, companyAvailable) > -1;
      if (found) {
        $('.inputCity').val("Toronto");
        $('.inputStatus').val(2);
        $('.inputRev').val("100,000");
        $('.inputIndustry').val("Financial");

        $('.panel2').addClass('show');
        $('.panel3').addClass('show');
        $('.panel4').addClass('show');
        $('.panel5').addClass('show');
        $('.panelemail').hide();
        $('.panelsubmit').addClass('show');
        $('.btn-submit').focus();
      }
      else {
        $('.inputCity').val("");
        $('.inputStatus').val(0);
        $('.inputRev').val("");
        $('.inputIndustry').val("");

        $('.panel2').addClass('show');
        $('.panel3').removeClass('show');
        $('.panel4').removeClass('show');
        $('.panel5').removeClass('show');
        $('.panelemail').removeAttr('style','display:none');
        $('.panelsubmit').removeClass('show');
      }
    },

    'change .inputCity': function(e) {
          var city = $(".inputCity").val().toLowerCase();
          var found = $.inArray(city, cityAvilable) > -1;
          if (found) {
              $('.panel3').removeAttr('style','display:none').addClass('show');
              $('.panel4').removeAttr('style','display:none');
              $('.panel5').removeAttr('style','display:none');
              $('.panelemail').removeClass('show');
              $('.panelsubmit').removeClass('show');
          }
          else {
            $('.panel3').hide();
            $('.panel4').hide();
            $('.panel5').hide();
            $('.panelemail').addClass('show');
            $('.panelsubmit').removeClass('show');
          }

      },

    'change .inputStatus': function(e) {
        if ($('.inputStatus').val() > 0) {
          var city = $(".inputCity").val().toLowerCase();
          var found = $.inArray(city, cityAvilable) > -1;

          if ($('.inputStatus').val() == '1') {
              $('.panel4').hide();
              $('.panel5').removeAttr('style','display:none').addClass('show');
              $('.panelemail').removeClass('show');
              $('.panelsubmit').removeClass('show');
          }
          if ($('.inputStatus').val() == '2') {
            $('.panel4').removeAttr('style','display:none').addClass('show');
            $('.panel5').removeClass('show');
            $('.panelemail').removeClass('show');
            $('.panelsubmit').removeClass('show');
          }

        }
    },

    'keyup .inputRev': function(e) {
        $('.inputRev').val(commaSeparateNumber($('.inputRev').val()));
    },
    'keyup .inputField': function(e) {
      if (e.keyCode == 13) {
        console.log('hello');
            var inps = $("input, select"); //add select too
            for (var x = 0; x < inps.length; x++) {
                if (inps[x] == this) {
                    while ((inps[x]).name == (inps[x + 1]).name) {
                    x++;
                    }
                    if ((x + 1) < inps.length) $(inps[x + 1]).focus();
                }
            }   e.preventDefault();
        }
    },
    'change .inputRev': function(e) {
        console.log('hit');
        $('.panel5').removeAttr('style','display:none').addClass('show');
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
      $('.email-confirm').addClass('show');
    },
    'click .btn-email': function(e) {
      $('.overlay').addClass('show');
    },
    'click .btn-submit': function(e) {
      var businessName = $('.inputCompany').val();
      var city = $('.inputCity').val();
      var status = $('.inputStatus').val();
      var rev = $('.inputRev').val();
      var industry = $('.inputIndustry').val();

      var str = "Company: " + businessName + "<br />City: " + city + "<br /> ";
      if (status == 1) { str += "Business: New" }
      if (status == 2) { str += "Business: Existing" }
      if (rev.length > 0) { str += "<br />Revenue: $" + rev; }
      str += "<br />Industry: " + industry;
      $('.overlay .data-output').html(str);
      $('.overlay .heading').hide();
      $('.overlay').addClass('show');
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
