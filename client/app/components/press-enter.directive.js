function PressEnter() {
	
	return {
		restrict: 'A',
		link: (scope, element, attrs) => {
            element.bind("keydown keypress", (event) => {
                if (event.which === 13) {
                    scope.$apply(() => {
                        scope.$eval(attrs.pressEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        }
	};
}

export default PressEnter;