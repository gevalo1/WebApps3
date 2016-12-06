describe("Canvas Controller Test", () => {
    describe("When I call canvas.init", () => {

        beforeEach(angular.mock.module('app'));
		
		let scope;
		let vm;
	  
		beforeEach(inject(($controller, _$rootScope_) => {
			scope = _$rootScope_.$new();
			vm = $controller('CanvasCtrl', { $scope: scope });
		}));

        it('sets the brush size to 5', () => {
			const size = 5;
			expect(vm.App.ctx.lineWidth).toEqual(size);
            expect(vm.ownBrushSize).toEqual(size);
        });
		
		it('sets the fillStyle to solid', () => {
			const lineCap = "round";
            expect(vm.App.ctx.lineCap).toEqual(lineCap);
        });
		
		it('changes brush size correctly when method is called', () => {
			const initialSize = 5;
			const newSize = 85;
			expect(vm.App.ctx.lineWidth).toEqual(initialSize);
			expect(vm.ownBrushSize).toEqual(initialSize);
			vm.App.changeBrushSize(85);
            expect(vm.App.ctx.lineWidth).toEqual(newSize);
			expect(vm.ownBrushSize).toEqual(newSize);
        });
		
		it('sets the alert boolean to false initially', () => {
			const bool = false;
			expect(scope.showAlert).toEqual(bool);
        });
		
		it('changes brush color correctly when method is called', () => {
			const initialColor = "#000000";
			const newColor = "#111111";
			expect(vm.App.ctx.strokeStyle).toEqual(initialColor);
			expect(vm.ownColor).toEqual(initialColor);
			scope.submitCustomColor("#111111");
            expect(vm.App.ctx.strokeStyle).toEqual(newColor);
			expect(vm.ownColor).toEqual(newColor);
        });

   });
});