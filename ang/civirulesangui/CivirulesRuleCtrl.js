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
            return crmApi('CiviRuleTrigger', 'get', {sequential:1});
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

    $scope.toggleRuleIsActive = function (rule) {
      rule.is_active = (rule.is_active == '1') ? '0' : '1';
      crmApi('CiviRuleRule', 'create', rule, true)
        .catch(function (data) {
          rule.is_active = (rule.is_active == '1') ? '0' : '1'; // revert
          $scope.$digest();
        });
    };

    $scope.deleteRule = function deleteRule (rule) {
      crmApi('CiviRuleRule', 'delete', {id: rule.id}, {
        error: function (data) {
          CRM.alert('Not able to delete CiviRule Rule, error message from API : ' + data.error_message, ts('Error attempting to delete CiviRule Rule'), 'error');
        }
      })
        .then(function (data) {
          delete rules.values[rule.id];
        });
    };

    $scope.newRule = function newRule() {
      var rule = {
        id: false,
        label: '',
        description: '',
        help_text: '',
        trigger_id: null,
        is_active: '1'
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
          crmApi('CiviRuleRule', 'create', copyRule)
          .then(function (result) {
            if (!copyRule.id) {
              copyRule.id = result.id;
            }
            if (rule.id) {
              // Edit mode
              rule.label = copyRule.label;
              rule.description = copyRule.description;
              rule.help_text = copyRule.help_text;
              rule.is_active = copyRule.is_active;
            } else {
              // Add mode
              rules.values[copyRule.id.toString()] = copyRule;
            }
          });
        },
        function(error) {
          // Cancel is clicked
        }
      );
    }
  });

})(angular, CRM.$, CRM._);
