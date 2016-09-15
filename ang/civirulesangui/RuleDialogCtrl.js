(function(angular, $, _) {

  // The controller uses *injection*. This default injects a few things:
  //   $scope -- This is the set of variables shared between JS and HTML.
  //   crmApi, crmStatus, crmUiHelp -- These are services provided by civicrm-core.
  //   myContact -- The current contact, defined above in config().
  angular.module('civirulesangui').controller('RuleDialogCtrl', function($scope, crmApi, crmStatus, crmUiHelp, dialogService) {
    // The ts() and hs() functions help load strings for this module.
    var ts = $scope.ts = CRM.ts('civirulesangui');
    var hs = $scope.hs = crmUiHelp({file: 'CRM/civirulesangui/RuleDialogCtrl'}); // See: templates/CRM/civirulesangui/RuleDialogCtrl.hlp

    var rule = $scope.model.rule;
    $scope.rule = rule;

    $scope.cancel = function() {
      dialogService.cancel('ruleDialog');
      CRM.alert.close90
    };

    $scope.save = function() {
      if ($scope.ruleDialogForm.$valid) {
        dialogService.close('ruleDialog', $scope.model);
      } else {
        angular.element("[name='ruleDialogForm']").find('.ng-invalid').crmError(ts('Required'), ts('Field is required'), {expires: 20});
      }
    };
  });

})(angular, CRM.$, CRM._);
