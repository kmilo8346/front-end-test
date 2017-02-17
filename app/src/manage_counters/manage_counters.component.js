var component = {
    templateUrl: '/templates/manage_counters/manage_counters.template.html',
    controller: ComponentController
};

ComponentController.$inject = ['counterService', '$log', '$mdDialog', '$mdToast', '$mdMedia'];

function ComponentController(counterService, $log, $mdDialog, $mdToast, $mdMedia) {
    var TAG = "MANAGE COUNTER CONTROLLER COMPONENT: ";
    var ctrl = this;

    ctrl.pending = false;
    ctrl.counters = [];
    ctrl.$mdMedia = $mdMedia;
    ctrl.searchMode = false;
    ctrl.filter = '';

    ctrl.$onInit = _onInit;
    ctrl.increment = _increment;
    ctrl.decrement = _decrement;
    ctrl.remove = _remove;
    ctrl.showAddDialog = _showAddDialog;

    function _onInit() {
        ctrl.pending = true;
        counterService.getAll(null, _success, _error);

        function _success(counters) {
            ctrl.pending = false;
            _loadCounters(counters)
        }

        function _error(response) {
            ctrl.pending = false;
            _debugError(response);
        }
    }

    function _increment(counter) {
        counter.$pending = true;
        counterService.increment(null, {id: counter.id}, _success, _error);

        function _success(counters) {
            _loadCounters(counters);
        }

        function _error(response) {
            counter.$pending = false;
            _debugError(response);
        }
    }

    function _decrement(counter) {
        counter.$pending = true;
        counterService.decrement(null, {id: counter.id}, _success, _error);

        function _success(counters) {
            _loadCounters(counters);
        }

        function _error(response) {
            counter.$pending = false;
            _debugError(response);
        }
    }

    function _remove(counter) {
        counter.$pending = true;
        counterService.remove({id: counter.id}, null, _success, _error);

        function _success(counters) {
            _loadCounters(counters);
            _showSuccessToast();
        }

        function _error(response) {
            counter.$pending = false;
            _debugError(response);
        }
    }

    function _showAddDialog(event) {
        var confirm = $mdDialog.prompt()
            .title('Cree nuevo contador')
            .placeholder('Título')
            .ariaLabel('Título')
            .targetEvent(event)
            .ok('Salvar')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(_success);

        function _success(title) {
            if(!title){
                $mdToast.show($mdToast.simple().textContent('No se pudo crear el Contador :('));
                return;
            }
            ctrl.pending = true;
            counterService.create(null, {title: title}, __success, __error);

            function __success(counters) {
                ctrl.pending = false;
                _loadCounters(counters);
                _showSuccessToast();
            }

            function __error(response) {
                ctrl.pending = false;
                _debugError(response);
            }
        }
    }

    //NOTA solo se muestra el debug de los errores por simplicidad
    function _debugError(response) {
        $log.debug(TAG + "response status " + response.status + ': ' + response.statusText);
    }

    function _showSuccessToast() {
        $mdToast.show($mdToast.simple().textContent('Acción ejecutada correctamente :)'));
    }

    function _loadCounters(counters) {
        ctrl.counters = counters;
    }
}

module.exports = component;