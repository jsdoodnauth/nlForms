if (Meteor.isClient) {
  console.log('client loaded')
  Template.createQuote.events({
    'click #btnNextStep': function(e) {
      var stepClass = document.getElementById('hidSteps').value;
      console.log('stepClass:' + stepClass);

      // 1 -> .services-container
      // 2 -> .companyStructure-container
      // 3 -> .companyLocation-container
      // 4 -> .finalizeService-container
      stepClass++;
      switch (stepClass) {
        case 1:
          $('.companyStructure-container').removeClass('active');
          $('.services-container').addClass('active');
          $('#btnBackStep').addClass('hide');
          break;
        case 2:
          $('.services-container').removeClass('active');
          $('.companyStructure-container').addClass('active');
          $('#btnBackStep').removeClass('hide');
          break;
        case 3:
          $('.companyStructure-container').removeClass('active');
          $('.companyLocation-container').addClass('active');
          break;
        case 4:
          $('.companyLocation-container').removeClass('active');
          $('.finalizeService-container').addClass('active');
          break;
        case 5:
          $('.finalizeService-container').removeClass('active');
          break;
        default:
        break;
      }

      document.getElementById('hidSteps').value = stepClass;
    },
    'click #btnBackStep': function(e) {
      var stepClass = document.getElementById('hidSteps').value;
      console.log('stepClass:' + stepClass);

      // 1 -> .services-container
      // 2 -> .companyStructure-container
      // 3 -> .companyLocation-container
      // 4 -> .finalizeService-container
      stepClass--;
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
          $('.finalizeService-container').removeClass('active');
          $('.companyLocation-container').addClass('active');
          break;
        case 4:
          $('.companyLocation-container').removeClass('active');
          $('.finalizeService-container').addClass('active');
          break;
        case 5:
          $('.finalizeService-container').removeClass('active');
          break;
        default:
        break;
      }

      document.getElementById('hidSteps').value = stepClass;
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
