(function(angular, $, _) {

  angular.module('civirulesangui').config(function($routeProvider) {
      $routeProvider.when('/civirules', {
        controller: 'CivirulesanguiCivirulesRuleCtrl',
        templateUrl: '~/civirulesangui/CivirulesRuleCtrl.html',

        // If you need to look up data when opening the page, list it out
        // under "resolve".
        resolve: {
          rules: function(crmApi) {
            return crmApi('CiviRuleRule', 'get', {});
          },
          triggers: function(crmApi) {
            return crmApi('CiviRuleTrigger', 'get', {});
          }
        }
      });
    }
  );

  // The controller uses *injection*. This default injects a few things:
  //   $scope -- This is the set of variables shared between JS and HTML.
  //   crmApi, crmStatus, crmUiHelp -- These are services provided by civicrm-core.
  //   myContact -- The current contact, defined above in config().
  angular.module('civirulesangui').controller('CivirulesanguiCivirulesRuleCtrl', function($scope, crmApi, crmStatus, crmUiHelp, dialogService, rules, triggers) {
    // The ts() and hs() functions help load strings for this module.
    var ts = $scope.ts = CRM.ts('civirulesangui');
    // We have rules and triggers available in JS. We also want to reference it in HTML.
    $scope.rules = rules.values;
    $scope.triggers = triggers.values;

    $scope.newRule = function newRule() {
      var rule = {
        id: false,
        label: 'New rule',
        description: '',
        trigger_id: null
      };
      ruleDialog(rule);
    }

    $scope.editRule = function editRule(rule) {
      ruleDialog(rule);
    }

    // Open a dialog for editing the advanced recipient options.
    var ruleDialog = function(rule) {
      var options = CRM.utils.adjustDialogDefaults({
        autoOpen: false,
        width: '80%',
        height: 'auto',
        title: 'New rule'
      });
      var copyRule = _.clone(rule);
      var model = {
        triggers: triggers.values,
        rule: copyRule
      };
      dialogService.open('ruleDialog', '~/civirulesangui/RuleDialogCtrl.html', model, options).then(
        function(result) {
          // Save is clicked
          if (rule.id) {
            // Edit mode
            rule.label = copyRule.label;
            rule.description = copyRule.description;
            rule.trigger_id = copyRule.trigger_id;
          } else {
            // Add mode
            rules.values.push(copyRule); // This line does not work!
          }
        },
        function(error) {
          // Cancel is clicked
        }
      );
    }
  });

})(angular, CRM.$, CRM._);
