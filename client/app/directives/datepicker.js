app.directive('datepicker', function () {
	return {
		restrict: 'A',
		require: 'ngModel',

		link: function (scope, element, attrs, ngModelCtrl) {
			$(function () {
				$(element).datepicker({
					dateFormat: 'mm/dd/yy',
					changeYear: true,
					changeMonth: true,
					onSelect: function (date) {
						ngModelCtrl.$setViewValue(date);

						scope.$apply();
					}
				});
			});
		}
	};
});
