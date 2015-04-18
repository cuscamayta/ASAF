app.directive('modalConfirmation', function ($compile) {
	return {
		restrict: 'E',
		scope: {
			modalId: '=',
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
			//            scope.$watch("title", function(newvalue) {
			scope.modalId = 'modal-confirmation-'.concat(scope.modalId);
			scope.header = scope.title;
			// localize.getLocalizedString(scope.title);
			scope.content = scope.message; // localize.getLocalizedString(scope.message);
			scope.modalIcon = scope.icon == undefined ? 'icon-warning-sign' : scope.icon; // localize.getLocalizedString(scope.icon);
			//            });


			scope.onConfirmAction = function () {
				scope.confirmAction();
			};

			scope.onCancelAction = function () {
				if (scope.cancelAction)
					scope.cancelAction();
				else
					$('#modal-confirmation-'.concat(scope.modalId));
			};

		}
	};
});
