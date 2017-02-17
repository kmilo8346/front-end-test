directive.$inject = ['$timeout', '$parse'];

function directive($timeout, $parse) {
     return {
         link: function (scope, element, attrs) {
             var model = $parse(attrs.focusMe);
             scope.$watch(model, function (value) {
                 if (value === true) {
                     $timeout(function () {
                         element[0].focus();
                     });
                 }
             });
         }
     };
}

module.exports = directive;
