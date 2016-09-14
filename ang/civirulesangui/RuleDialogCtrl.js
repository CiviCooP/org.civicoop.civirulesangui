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
      dialogService.close('ruleDialog');
    };

    $scope.save = function() {
      return crmStatus(
        // Status messages. For defaults, just use "{}"
        {start: ts('Saving...'), success: ts('Saved')},
        // The save action. Note that crmApi() returns a promise.
        crmApi('CiviRuleRule', 'create', {
          id: rule.id,
          label: rule.label,
          description: rule.description,
          trigger_id: rule.trigger_id
        }).then(function (result) {
          dialogService.close('ruleDialog');
        })
      );
    };
  });

})(angular, CRM.$, CRM._);
