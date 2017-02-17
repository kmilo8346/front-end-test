/******************************
 * NPM MODULES
 ******************************/
require('angular');
require('angular-animate');
require('angular-aria');
require('angular-material');
require('angular-resource');

/******************************
 * LOCAL ENTITIES
 ******************************/
var manageCountersComponent = require('./manage_counters/manage_counters.component');
var counterService = require('./core/counter.service');
var focusMeDirective = require('./core/focus_me.directive');

angular.module('app', [
    //NPM MODULES
    'ngAnimate', 'ngAria', 'ngMaterial', 'ngResource'
])
    //global config
    .config(_config)
    //local entities
    .factory('counterService', counterService)
    .component('manageCounters', manageCountersComponent)
    .directive('focusMe', focusMeDirective);

_config.$inject = ['$mdThemingProvider'];

function _config($mdThemingProvider) {
    $mdThemingProvider.definePalette('customPrimary', {
        '50': 'edf9fb',
        '100': 'd3f1f4',
        '200': 'b6e8ed',
        '300': '98dfe5',
        '400': '82d8e0',
        '500': '6cd1da',
        '600': '64ccd6',
        '700': '59c6d0',
        '800': '4fc0cb',
        '900': '3db5c2',
        'A100': 'ffffff',
        'A200': 'defbff',
        'A400': 'abf6ff',
        'A700': '91f3ff',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [
            '50',
            '100',
            '200',
            '300',
            '400',
            '500',
            '600',
            '700',
            '800',
            '900',
            'A100',
            'A200',
            'A400',
            'A700'
        ],
        'contrastLightColors': []
    });

    $mdThemingProvider.definePalette('customAccent', {
        '50': 'e0f5ea',
        '100': 'b3e7cb',
        '200': '80d7a8',
        '300': '4dc685',
        '400': '26ba6a',
        '500': '00ae50',
        '600': '00a749',
        '700': '009d40',
        '800': '009437',
        '900': '008427',
        'A100': 'b1ffc1',
        'A200': '7eff99',
        'A400': '4bff71',
        'A700': '31ff5d',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [
            '50',
            '100',
            '200',
            '300',
            '400',
            'A100',
            'A200',
            'A400',
            'A700'
        ],
        'contrastLightColors': [
            '500',
            '600',
            '700',
            '800',
            '900'
        ]
    });

    $mdThemingProvider.theme('default')
        .primaryPalette('customPrimary')
        .accentPalette('customAccent');
}