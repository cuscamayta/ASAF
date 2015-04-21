app.directive('modalConfirmation', function ($compile) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			modalId: '@modalId',
			title: '@title',
			message: '@message',
			icon: '@icon',
			confirmAction: '&',
			cancelAction: '&',
			buttonAccept: '=',
			buttonCancel: '='
		},
		templateUrl: '/app/partials/shared/modalConfirmation.html',
		link: function (scope, element, attrs) {
			scope.modalIcon = scope.icon == undefined ? 'icon-warning-sign' : scope.icon;

			scope.onConfirmAction = function () {
				scope.confirmAction();
			};

			scope.onCancelAction = function () {
				if (scope.cancelAction)
					scope.cancelAction();
			};

		}
	};
});
