(function(angular, $, _) {

  /*angular.module('civirulesangui').config(function($routeProvider) {
    $routeProvider.when('/civirules', {
      controller: 'RuleDialogCtrl',
      templateUrl: '~/civirulesangui/RuleDialogCtrl.html',

      // If you need to look up data when opening the page, list it out
      // under "resolve".
      resolve: {
        triggers: function(crmApi) {
          return crmApi('CiviRuleTrigger', 'get', {});
        }
      }
    });
  });*/

  // The controller uses *injection*. This default injects a few things:
  //   $scope -- This is the set of variables shared between JS and HTML.
  //   crmApi, crmStatus, crmUiHelp -- These are services provided by civicrm-core.
  //   myContact -- The current contact, defined above in config().
  angular.module('civirulesangui').controller('RuleDialogCtrl', function($scope, crmApi, crmStatus, crmUiHelp) {
    // The ts() and hs() functions help load strings for this module.
    var ts = $scope.ts = CRM.ts('civirulesangui');
    var hs = $scope.hs = crmUiHelp({file: 'CRM/civirulesangui/RuleDialogCtrl'}); // See: templates/CRM/civirulesangui/RuleDialogCtrl.hlp


    $scope.rule = {
      label: 'New rule',
      description: '',
      trigger: {
        id: 1,
        label: 'Activity is added'
      }
    };


    $scope.save = function save() {
      return crmStatus(
        // Status messages. For defaults, just use "{}"
        {start: ts('Saving...'), success: ts('Saved')},
        // The save action. Note that crmApi() returns a promise.
        crmApi('Contact', 'create', {
          id: myContact.id,
          first_name: myContact.first_name,
          last_name: myContact.last_name
        })
      );
    };
  });

})(angular, CRM.$, CRM._);
