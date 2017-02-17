var BASE_URL = '/api/v1/counters/:id';

factory.$inject = ['$resource'];

function factory($resource) {

    return $resource(BASE_URL, {}, {
        'create': { method:'POST', isArray: true},
        'getAll': { method:'GET', isArray: true},
        'remove' : { method:'DELETE', isArray: true},
        'increment': { method:'POST', url: BASE_URL + '/inc', isArray: true },
        'decrement': { method:'POST', url: BASE_URL + '/dec', isArray: true }
    });
}

module.exports = factory;