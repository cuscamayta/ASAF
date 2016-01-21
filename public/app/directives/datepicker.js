app.directive('datepicker', function () {
	return {
		restrict: 'A',
		require: 'ngModel',

		link: function (scope, element, attrs, ngModelCtrl) {
			$(function () {
				$.datepicker.regional['es'] = {
					closeText: 'Cerrar',
					prevText: '<Ant',
					nextText: 'Sig>',
					currentText: 'Hoy',
					monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
					monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
					dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
					dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
					dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
					weekHeader: 'Sm',
					dateFormat: 'dd/mm/yy',
					firstDay: 1,
					isRTL: false,
					showMonthAfterYear: false,
					yearSuffix: ''
				};
				$.datepicker.setDefaults($.datepicker.regional['es']);



				$(element).datepicker({
					dateFormat: 'dd/mm/yy',
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


app.directive('highchart', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs, ngModelCtrl) {
			$(function () {
				$(function () {
					$(element).highcharts({
						title: {
							text: 'Promedio de Ventas Mensuales',
							x: -20 //center
						},
						subtitle: {
							text: 'Ventas Mensuales',
							x: -20
						},
						xAxis: {
							categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
						},
						yAxis: {
							title: {
								text: 'Dias'
							},
							plotLines: [{
								value: 0,
								width: 1,
								color: '#808080'
            }]
						},
						tooltip: {
							valueSuffix: 'Bs.'
						},
						legend: {
							layout: 'vertical',
							align: 'right',
							verticalAlign: 'middle',
							borderWidth: 0
						},
						series: [{
							name: 'Nokia 3320',
							data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
							name: 'Samsung Galaxy 3',
							data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
							name: 'Iphone 5',
							data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
							name: 'Alcatel Pop3',
							data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
					});
				});
			});
		}
	};
});

app.directive('highchart2', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs, ngModelCtrl) {
			$(function () {
				$(function () {
					$(element).highcharts({
						chart: {
							plotBackgroundColor: null,
							plotBorderWidth: null,
							plotShadow: false
						},
						title: {
							text: 'Promedio de Ventas Por Usuario'
						},
						tooltip: {
							pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
						},
						plotOptions: {
							pie: {
								allowPointSelect: true,
								cursor: 'pointer',
								dataLabels: {
									enabled: true,
									format: '<b>{point.name}</b>: {point.percentage:.1f} %',
									style: {
										color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
									}
								}
							}
						},
						series: [{
							type: 'pie',
							name: 'Porcentaje de Ventas:',
							data: [
                ['Henry L.', 45.0],
                ['Gabriel E.', 26.8],
								{
									name: 'Fernando L.',
									y: 12.8,
									sliced: true,
									selected: true
                },
                ['Jose M.', 8.5],
                ['David T.', 6.2],
                ['Gerardo C.', 0.7]
            ]
        }]
					});
				});


			});
		}
	};
});