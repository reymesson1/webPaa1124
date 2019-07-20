'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var NavDropdown = ReactBootstrap.NavDropdown;
var MenuItem = ReactBootstrap.MenuItem;

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Panel = ReactBootstrap.Panel;

var Pagination = ReactBootstrap.Pagination;

var Form = ReactBootstrap.Form;
var Radio = ReactBootstrap.Radio;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;
var Col = ReactBootstrap.Col;

var Table = ReactBootstrap.Table;

var Autosuggest = Autosuggest;

var moment = moment;

// const API_URL = 'http://localhost:8083'; 
var API_URL = 'http://159.203.156.208:8083';

var API_HEADERS = {

    'Content-Type': 'application/json',
    Authentication: 'any-string-you-like'
};

var TOKEN_KEY = "token";

var languageActive = false;

var global = 0;

function token() {

    return localStorage.getItem(TOKEN_KEY);
}

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {

            cookies: false
        };
        return _this;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fetch(API_URL + '/cookies', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this2.setState({

                    cookies: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'setCookie',
        value: function setCookie(event) {

            event.preventDefault();

            var newCookie = {

                "id": "1",
                "username": event.target.email.value,
                "password": event.target.password.value
            };

            fetch(API_URL + '/login', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newCookie)
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                if (response.token != undefined) {
                    localStorage.setItem(TOKEN_KEY, response.token);
                }
            });

            window.location.reload();
        }
    }, {
        key: 'isAuthenticated',
        value: function isAuthenticated() {

            return !!localStorage.getItem(TOKEN_KEY);
        }
    }, {
        key: 'setRegistration',
        value: function setRegistration(event) {

            event.preventDefault();

            var newCookie = {

                "id": "1",
                "username": event.target.email.value,
                "password": event.target.password.value
            };

            fetch(API_URL + '/register', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newCookie)
            });

            window.location.reload();
        }
    }, {
        key: 'render',
        value: function render() {

            var dashboard = React.createElement(
                'div',
                null,
                React.createElement(Toolbar, null),
                React.createElement(
                    'div',
                    { className: 'container' },
                    this.props.children
                )
            );

            var login = React.createElement(
                'div',
                null,
                React.createElement(Login, {
                    setcookie: this.setCookie,
                    setregistration: this.setRegistration

                })
            );
            if (this.isAuthenticated()) {

                return React.createElement(
                    'div',
                    null,
                    dashboard
                );
            }
            return React.createElement(
                'div',
                null,
                login
            );
        }
    }]);

    return App;
}(React.Component);

var Actions = function (_React$Component2) {
    _inherits(Actions, _React$Component2);

    function Actions() {
        _classCallCheck(this, Actions);

        var _this3 = _possibleConstructorReturn(this, (Actions.__proto__ || Object.getPrototypeOf(Actions)).call(this));

        _this3.state = {

            masterAPI: [],
            parameter: ''
        };

        return _this3;
    }

    _createClass(Actions, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this4 = this;

            fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this4.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            this.setState({

                parameter: this.props.params.actionid
            });
        }
    }, {
        key: 'onPrinted',
        value: function onPrinted() {

            window.print();

            window.location.href = '/';
        }
    }, {
        key: 'setPayment',
        value: function setPayment(event) {

            event.preventDefault();

            var currentTarget = '';

            // console.log(event.target.card.value)
            // console.log(event.target.groupOptions.value)

            var newMaster = {

                "id": this.props.params.actionid,
                "payment": event.target.groupOptions.value

            };

            fetch(API_URL + '/payment', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newMaster)
            });

            window.location.href = '/';

            // console.log(newMaster)
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { onSubmit: this.setPayment.bind(this) },
                    React.createElement(
                        'fieldset',
                        null,
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                Panel,
                                { header: 'Favor especificar el tipo de pago:' },
                                React.createElement(
                                    Row,
                                    null,
                                    React.createElement(
                                        Col,
                                        { xs: '6' },
                                        React.createElement(
                                            'h3',
                                            null,
                                            'Tarjerta'
                                        ),
                                        React.createElement(
                                            Radio,
                                            { name: 'groupOptions', value: 'card' },
                                            'Tarjeta'
                                        )
                                    ),
                                    React.createElement(
                                        Col,
                                        { xs: '6' },
                                        React.createElement(
                                            'h3',
                                            null,
                                            'Efectivo'
                                        ),
                                        React.createElement(
                                            Radio,
                                            { name: 'groupOptions', value: 'cash' },
                                            'Efectivo'
                                        )
                                    )
                                ),
                                React.createElement(Row, null)
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                Button,
                                { className: 'btn btn-default', type: 'submit' },
                                'Aceptar'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Actions;
}(React.Component);

var ActionsTable = function (_React$Component3) {
    _inherits(ActionsTable, _React$Component3);

    function ActionsTable() {
        _classCallCheck(this, ActionsTable);

        return _possibleConstructorReturn(this, (ActionsTable.__proto__ || Object.getPrototypeOf(ActionsTable)).apply(this, arguments));
    }

    _createClass(ActionsTable, [{
        key: 'render',
        value: function render() {

            var today = moment(new Date()).format('DD-MM-YYYY');

            return React.createElement(
                'div',
                { id: 'printcss ', style: { 'margin-left': '10px' } },
                React.createElement(
                    Grid,
                    null,
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            Col,
                            { xs: 12 },
                            React.createElement(
                                'h3',
                                null,
                                'Orden de Servicio '
                            ),
                            React.createElement(
                                'h4',
                                null,
                                'Supreme - Lavanderia '
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'Av. Romulo Betancourt No. 1516 esq. 12 de Julio'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'Plaza Thalys, Bella Vista, Sto. Dgo.'
                            ),
                            React.createElement(
                                'h4',
                                null,
                                'Tel.: 829-594-8430'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'Horario Lunes a Viernes 07:30am a 7:00pm'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'Sabado 08:30am a 5:00pm'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'RNC: 131576958'
                            ),
                            React.createElement(
                                'h5',
                                { className: 'col-xs-offset-7' },
                                'Fecha: ',
                                today
                            ),
                            React.createElement('br', null)
                        )
                    ),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            Col,
                            { xs: 12 },
                            React.createElement(
                                Table,
                                { striped: true, bordered: true, condensed: true, hover: true,
                                    style: { 'position': 'relative', 'width': '55%', 'margin': '0' } },
                                React.createElement(
                                    'thead',
                                    null,
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'th',
                                            { style: { 'width': '15px',
                                                    'font-size': '25px', 'border-spacing': '0 30px' } },
                                            '#'
                                        ),
                                        React.createElement(
                                            'th',
                                            { style: { 'width': '15px',
                                                    'font-size': '25px' } },
                                            'Articulo'
                                        ),
                                        React.createElement(
                                            'th',
                                            { style: { 'width': '15px',
                                                    'font-size': '25px' } },
                                            'Precio'
                                        ),
                                        React.createElement(
                                            'th',
                                            { style: { 'width': '15px',
                                                    'font-size': '25px' } },
                                            'Servicio'
                                        )
                                    )
                                ),
                                this.props.masterAPI.map(function (master, index) {
                                    return React.createElement(ActionsTableBody, {
                                        key: index,
                                        index: index,
                                        id: master.id,

                                        item: master.item
                                    });
                                }),
                                React.createElement(
                                    'tfoot',
                                    null,
                                    React.createElement(ActionsTableBodyFooter, {
                                        parameter: this.props.parameter,
                                        masterAPI: this.props.masterAPI
                                    })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ActionsTable;
}(React.Component);

var ActionsTableBodyFooter = function (_React$Component4) {
    _inherits(ActionsTableBodyFooter, _React$Component4);

    function ActionsTableBodyFooter() {
        _classCallCheck(this, ActionsTableBodyFooter);

        return _possibleConstructorReturn(this, (ActionsTableBodyFooter.__proto__ || Object.getPrototypeOf(ActionsTableBodyFooter)).apply(this, arguments));
    }

    _createClass(ActionsTableBodyFooter, [{
        key: 'render',
        value: function render() {

            var nextState = this.props.masterAPI;

            var zoom = 0;

            if (nextState[0]) {

                zoom = nextState[0].project;
            }

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    '\xA0'
                ),
                React.createElement(
                    'td',
                    null,
                    '\xA0'
                ),
                React.createElement(
                    'td',
                    { style: { 'width': '15px', 'font-size': '20px' } },
                    'Total'
                ),
                React.createElement(
                    'td',
                    { style: { 'width': '15px',
                            'font-size': '20px' } },
                    'RD$',
                    zoom,
                    '.00'
                ),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement('br', null)
            );
        }
    }]);

    return ActionsTableBodyFooter;
}(React.Component);

var ActionsTableBody = function (_React$Component5) {
    _inherits(ActionsTableBody, _React$Component5);

    function ActionsTableBody() {
        _classCallCheck(this, ActionsTableBody);

        return _possibleConstructorReturn(this, (ActionsTableBody.__proto__ || Object.getPrototypeOf(ActionsTableBody)).apply(this, arguments));
    }

    _createClass(ActionsTableBody, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'tbody',
                null,
                this.props.item.map(function (master, index) {
                    return React.createElement(ActionsTableBodyDetail, {
                        key: index,
                        index: index + 1,
                        id: master.id,
                        name: master.firstname,
                        item: master.item,
                        development: master.development,
                        project: master.project
                    });
                })
            );
        }
    }]);

    return ActionsTableBody;
}(React.Component);

var ActionsTableBodyDetail = function (_React$Component6) {
    _inherits(ActionsTableBodyDetail, _React$Component6);

    function ActionsTableBodyDetail() {
        _classCallCheck(this, ActionsTableBodyDetail);

        return _possibleConstructorReturn(this, (ActionsTableBodyDetail.__proto__ || Object.getPrototypeOf(ActionsTableBodyDetail)).apply(this, arguments));
    }

    _createClass(ActionsTableBodyDetail, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    { style: { 'font-size': '20px' } },
                    '\xA0'
                ),
                React.createElement(
                    'td',
                    { style: { 'font-size': '20px' } },
                    this.props.item
                ),
                React.createElement(
                    'td',
                    {
                        style: { 'font-size': '20px' } },
                    this.props.project,
                    '.00'
                ),
                React.createElement(
                    'td',
                    {
                        style: { 'font-size': '20px' } },
                    this.props.development
                )
            );
        }
    }]);

    return ActionsTableBodyDetail;
}(React.Component);

var Login = function (_React$Component7) {
    _inherits(Login, _React$Component7);

    function Login() {
        _classCallCheck(this, Login);

        return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).apply(this, arguments));
    }

    _createClass(Login, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                { id: 'login' },
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement(
                        'div',
                        { className: 'row vertical-offset-100' },
                        React.createElement(
                            'div',
                            { className: 'col-md-4 col-md-offset-4' },
                            React.createElement(
                                'div',
                                { className: 'panel panel-default' },
                                React.createElement(
                                    'div',
                                    { className: 'panel-heading' },
                                    React.createElement(
                                        'h3',
                                        { className: 'panel-title' },
                                        'Please sign in'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'panel-body' },
                                    React.createElement(
                                        'form',
                                        {
                                            onSubmit: this.props.setcookie.bind(this) },
                                        React.createElement(
                                            'fieldset',
                                            null,
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement('input', {
                                                    className: 'form-control', placeholder: 'E-mail', name: 'email',
                                                    type: 'text' })
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement('input', {
                                                    className: 'form-control', placeholder: 'Password', name: 'password',
                                                    type: 'password' })
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'checkbox' },
                                                React.createElement(
                                                    'label',
                                                    null,
                                                    React.createElement('input', { name: 'remember', type: 'checkbox', value: 'Remember Me' }),
                                                    ' Remember Me'
                                                )
                                            ),
                                            React.createElement(
                                                'button',
                                                { className: 'btn btn-lg btn-success btn-block' },
                                                'Login'
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Login;
}(React.Component);

var Toolbar = function (_React$Component8) {
    _inherits(Toolbar, _React$Component8);

    function Toolbar() {
        _classCallCheck(this, Toolbar);

        return _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).apply(this, arguments));
    }

    _createClass(Toolbar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            document.body.style.backgroundImage = "none";
        }
    }, {
        key: 'onClicked',
        value: function onClicked() {

            localStorage.removeItem(TOKEN_KEY);
            window.location.reload();
        }
    }, {
        key: 'onRefreshed',
        value: function onRefreshed() {
            this.props.history.push("/detail");
            window.location.reload();
        }
    }, {
        key: 'render',
        value: function render() {

            var toolbarES = React.createElement(
                Navbar,
                null,
                React.createElement(
                    'div',
                    { className: 'navbar-header' },
                    React.createElement(
                        'div',
                        { className: 'navbar-brand' },
                        React.createElement(
                            Link,
                            { to: '/', onClick: this.onRefreshed.bind(this) },
                            'Info-Solutions SYS'
                        )
                    )
                ),
                React.createElement(
                    Nav,
                    null,
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            Link,
                            { to: '/master' },
                            'Facturacion'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            Link,
                            { to: '/detail' },
                            'Inventario'
                        )
                    ),
                    React.createElement(
                        NavDropdown,
                        { eventKey: 3, title: 'Reportes', id: 'basic-nav-dropdown' },
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.1 },
                            React.createElement(
                                Link,
                                { to: '/partials' },
                                'Cuadre'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.2 },
                            React.createElement(
                                Link,
                                { to: '/bipartials' },
                                'Resume Cuadre por Tipo de Servicio'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.2 },
                            React.createElement(
                                Link,
                                { to: '/fourpartials' },
                                'Resume Cuadre por Clientes'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.3 },
                            React.createElement(
                                Link,
                                { to: '/tripartials' },
                                'Resumen Cuadre General'
                            )
                        ),
                        React.createElement(MenuItem, { divider: true }),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.4 },
                            React.createElement(
                                Link,
                                { to: '/agregar_tiposervicio' },
                                'Agregar Tipo de Servicio'
                            )
                        )
                    ),
                    React.createElement(
                        NavDropdown,
                        { style: { 'float': 'right', 'position': 'absolute', 'left': '80%' }, eventKey: 3, title: 'Perfil Usuario', id: 'basic-nav-dropdown' },
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.1 },
                            React.createElement(
                                Link,
                                { to: '/account' },
                                'Cuenta de Usuario'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.2 },
                            React.createElement(
                                Link,
                                { onClick: this.onClicked, to: '/logout' },
                                'Log Out'
                            )
                        )
                    )
                )
            );

            var toolbarEN = React.createElement(
                Navbar,
                null,
                React.createElement(
                    'div',
                    { className: 'navbar-header' },
                    React.createElement(
                        'div',
                        { className: 'navbar-brand' },
                        React.createElement(
                            Link,
                            { to: '/',
                                onClick: this.onRefreshed.bind(this) },
                            'React-Bootstrap'
                        )
                    )
                ),
                React.createElement(
                    Nav,
                    null,
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            Link,
                            { to: '/master' },
                            'Master'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            Link,
                            { to: '/detail' },
                            'Details'
                        )
                    ),
                    React.createElement(
                        NavDropdown,
                        { eventKey: 3, title: 'DropDown',
                            id: 'basic-nav-dropdown' },
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.1 },
                            React.createElement(
                                Link,
                                {
                                    to: '/partials' },
                                'Draw'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.2 },
                            'Another action'
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.3 },
                            'Something else here'
                        ),
                        React.createElement(MenuItem, { divider: true }),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.4 },
                            'Separated link'
                        )
                    ),
                    React.createElement(
                        'li',
                        {
                            style: { 'float': 'right', 'position': 'absolute', 'left': '80%' } },
                        React.createElement(
                            Link,
                            {
                                onClick: this.onClicked, to: '/logout' },
                            'Logout'
                        )
                    )
                )
            );

            if (languageActive) {

                return React.createElement(
                    'div',
                    null,
                    toolbarEN
                );
            } else {
                return React.createElement(
                    'div',
                    null,
                    toolbarES
                );
            }
        }
    }]);

    return Toolbar;
}(React.Component);

var About = function (_React$Component9) {
    _inherits(About, _React$Component9);

    function About() {
        _classCallCheck(this, About);

        return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
    }

    _createClass(About, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'h1',
                null,
                'About'
            );
        }
    }]);

    return About;
}(React.Component);

var Repos = function (_React$Component10) {
    _inherits(Repos, _React$Component10);

    function Repos() {
        _classCallCheck(this, Repos);

        return _possibleConstructorReturn(this, (Repos.__proto__ || Object.getPrototypeOf(Repos)).apply(this, arguments));
    }

    _createClass(Repos, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'h1',
                null,
                'Repos ',
                this.props.params.repo_name
            );
        }
    }]);

    return Repos;
}(React.Component);

var Master = function (_React$Component11) {
    _inherits(Master, _React$Component11);

    function Master() {
        _classCallCheck(this, Master);

        var _this13 = _possibleConstructorReturn(this, (Master.__proto__ || Object.getPrototypeOf(Master)).call(this));

        _this13.state = {
            showModal: false,
            filterText: '',
            activePage: 1,
            masterAPI: [],
            masterDetail: [],
            counter: []
        };
        return _this13;
    }

    _createClass(Master, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this14 = this;

            fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this14.setState({

                    masterAPI: responseData
                });
            });
            fetch(API_URL + '/counter', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this14.setState({

                    counter: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            this.setState({

                parameter: this.props.params.actionid
            });
        }
    }, {
        key: 'close',
        value: function close() {
            this.setState({
                showModal: false
            });
        }
    }, {
        key: 'open',
        value: function open() {
            this.setState({
                showModal: true
            });
        }
    }, {
        key: 'onSaveMaster',
        value: function onSaveMaster(event) {

            event.preventDefault();

            var today = moment(new Date()).format('YYYY-MM-DD');

            var details = this.state.masterDetail;

            var name = details[0].firstname;

            var zoom = 0;

            for (var x = 0; x < details.length; x++) {
                zoom += parseInt(details[x].project);
            }

            var newMaster = {

                "id": this.state.counter[0].quantity,
                "date": today,
                "name": name,
                "item": this.state.masterDetail,
                "project": zoom,
                "status": "pending",
                "payment": ""

            };

            var nextState = this.state.masterAPI;

            nextState.push(newMaster);

            this.setState({

                masterAPI: nextState
            });

            this.setState({
                showModal: false,
                masterDetail: []
            });

            fetch(API_URL + '/master', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newMaster)
            });

            fetch(API_URL + '/addcounter', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newMaster)
            });
        }
    }, {
        key: 'onSaveDetail',
        value: function onSaveDetail(event) {

            event.preventDefault();

            var nextState = this.state.masterDetail;

            var today = moment(new Date()).format('DD-MM-YYYY');
            var fechaentrega = moment(new Date()).add(3, 'days').format('DD-MM-YYYY');

            var days = moment(new Date()).add(3, 'days').format('dddd');
            if (days == 'Monday') {
                days = 'Lunes';
            } else if (days == 'Tuesday') {
                days = 'Martes';
            } else if (days == 'Wednesday') {
                days = 'Miercoles';
            } else if (days == 'Thursday') {
                days = 'Jueves';
            } else if (days == 'Friday') {
                days = 'Viernes';
            } else if (days == 'Saturday') {
                days = 'Sabado';
            } else {
                days = 'Domingo';
            }

            var newItem = {

                "id": this.state.counter[0].quantity,
                "date": today,
                "fechaentrega": days + " " + fechaentrega,
                "firstname": event.target.firstname.value,
                "item": event.target.suggest.value,
                "quantity": parseInt(event.target.quantity.value),
                "development": event.target.development.value,
                "project": parseInt(event.target.project.value) * parseInt(event.target.quantity.value)

            };

            nextState.push(newItem);

            this.setState({

                masterDetail: nextState
            });
        }
    }, {
        key: 'onDeleteMaster',
        value: function onDeleteMaster(value) {

            var nextState = this.state.masterAPI;

            var index = nextState.findIndex(function (x) {
                return x.id == value;
            });

            nextState.splice(index, 1);

            this.setState({

                masterAPI: nextState
            });

            fetch(API_URL + '/deletemaster', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "id": index, token: token() })
            });
        }
    }, {
        key: 'onHandleUserInput',
        value: function onHandleUserInput(event) {

            this.setState({

                filterText: event.target.value
            });
        }
    }, {
        key: 'handleSelect',
        value: function handleSelect(eventKey) {

            this.setState({

                activePage: eventKey
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var ModalButtonEN = React.createElement(
                Button,
                { onClick: this.open.bind(this) },
                'Add Master'
            );

            var ModalButtonES = React.createElement(
                Button,
                { onClick: this.open.bind(this) },
                'Agregar Factura'
            );

            var MasterTableEN = "Master List";

            var MasterTableES = "Listado de Facturas";

            var ModalButtonActive = void 0;

            var MasterTableActive = void 0;

            if (languageActive) {

                ModalButtonActive = ModalButtonEN;
                MasterTableActive = MasterTableEN;
            } else {

                ModalButtonActive = ModalButtonES;
                MasterTableActive = MasterTableES;
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(MasterSearch, {
                        filterText: this.state.filterText,
                        masterCallback: {

                            onsavedetail: this.onSaveDetail.bind(this),

                            onsavemaster: this.onSaveMaster.bind(this),

                            onhandleuserinput: this.onHandleUserInput.bind(this)
                        }

                    })
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        'div',
                        { className: 'pull-right' },
                        ModalButtonActive,
                        React.createElement(MasterModal, {

                            masterDetail: this.state.masterDetail,
                            showModal: this.state.showModal,
                            open: this.open,
                            close: this.close.bind(this),
                            masterCallback: {

                                onsavedetail: this.onSaveDetail.bind(this),

                                onsavemaster: this.onSaveMaster.bind(this)
                            }
                        })
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Panel,
                        { header: MasterTableActive },
                        React.createElement(MasterTable, {
                            filterText: this.state.filterText,
                            masterData: this.state.masterAPI,
                            masterCallback: {

                                onsavedetail: this.onSaveDetail.bind(this),

                                onsavemaster: this.onSaveMaster.bind(this),

                                ondeletemaster: this.onDeleteMaster.bind(this)
                            }
                        }),
                        React.createElement(
                            'div',
                            { className: 'pull-right' },
                            React.createElement(MasterPagination, {
                                masterCallback: {
                                    handleSelect: this.handleSelect.bind(this)
                                },

                                activePage: this.state.activePage
                            })
                        )
                    )
                )
            );
        }
    }]);

    return Master;
}(React.Component);

var MasterPagination = function (_React$Component12) {
    _inherits(MasterPagination, _React$Component12);

    function MasterPagination() {
        _classCallCheck(this, MasterPagination);

        return _possibleConstructorReturn(this, (MasterPagination.__proto__ || Object.getPrototypeOf(MasterPagination)).apply(this, arguments));
    }

    _createClass(MasterPagination, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement(Pagination, {
                    prev: true,
                    next: true,
                    first: true,
                    last: true,
                    ellipsis: true,
                    boundaryLinks: true,
                    bsSize: 'small',
                    items: 5,
                    activePage: this.props.activePage,
                    onSelect: this.props.masterCallback.handleSelect
                }),
                React.createElement('br', null)
            );
        }
    }]);

    return MasterPagination;
}(React.Component);

var MasterSearch = function (_React$Component13) {
    _inherits(MasterSearch, _React$Component13);

    function MasterSearch() {
        _classCallCheck(this, MasterSearch);

        return _possibleConstructorReturn(this, (MasterSearch.__proto__ || Object.getPrototypeOf(MasterSearch)).apply(this, arguments));
    }

    _createClass(MasterSearch, [{
        key: 'render',
        value: function render() {

            var MasterSearchEN = React.createElement(
                'div',
                null,
                React.createElement(
                    Panel,
                    { header: 'Search Master' },
                    React.createElement(
                        'form',
                        null,
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'div',
                                { className: 'col-md-2 col-sm-2' },
                                React.createElement(
                                    'label',
                                    null,
                                    'Search:'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-10 col-sm-10' },
                                React.createElement('input', {
                                    onChange: this.props.masterCallback.onhandleuserinput.bind(this),
                                    type: 'text',
                                    className: 'form-control',
                                    id: 'first_name', name: 'first_name' })
                            )
                        )
                    )
                )
            );

            var MasterSearchES = React.createElement(
                'div',
                null,
                React.createElement(
                    Panel,
                    { header: 'Busqueda de Factura' },
                    React.createElement(
                        'form',
                        null,
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'div',
                                { className: 'col-md-2 col-sm-2' },
                                React.createElement(
                                    'label',
                                    null,
                                    'Buscar:'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-10 col-sm-10' },
                                React.createElement('input', {
                                    onChange: this.props.masterCallback.onhandleuserinput.bind(this),
                                    type: 'text',
                                    className: 'form-control',
                                    id: 'first_name', name: 'first_name' })
                            )
                        )
                    )
                )
            );

            if (languageActive) {
                return React.createElement(
                    'div',
                    null,
                    MasterSearchEN
                );
            } else {
                return React.createElement(
                    'div',
                    null,
                    MasterSearchES
                );
            }
        }
    }]);

    return MasterSearch;
}(React.Component);

var MasterTable = function (_React$Component14) {
    _inherits(MasterTable, _React$Component14);

    function MasterTable() {
        _classCallCheck(this, MasterTable);

        return _possibleConstructorReturn(this, (MasterTable.__proto__ || Object.getPrototypeOf(MasterTable)).apply(this, arguments));
    }

    _createClass(MasterTable, [{
        key: 'render',
        value: function render() {
            var _this18 = this;

            var filteredMaster = this.props.masterData.filter(function (master) {
                return master.name.toLowerCase().indexOf(_this18.props.filterText.toLowerCase()) !== -1;
            });

            var MasterTableEN = React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    '# '
                ),
                React.createElement(
                    'th',
                    null,
                    'Date'
                ),
                React.createElement(
                    'th',
                    null,
                    'Name'
                ),
                React.createElement(
                    'th',
                    null,
                    'Item'
                ),
                React.createElement(
                    'th',
                    null,
                    'Status'
                ),
                React.createElement(
                    'th',
                    null,
                    'Actions'
                )
            );

            var MasterTableES = React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    '\xA0'
                ),
                React.createElement(
                    'th',
                    null,
                    '#'
                ),
                React.createElement(
                    'th',
                    null,
                    'Fecha'
                ),
                React.createElement(
                    'th',
                    null,
                    'Nombre'
                ),
                React.createElement(
                    'th',
                    null,
                    'Articulo'
                ),
                React.createElement(
                    'th',
                    null,
                    'Estatus'
                ),
                React.createElement(
                    'th',
                    null,
                    'Acciones'
                )
            );

            var MasterTableActive = void 0;

            if (languageActive) {

                MasterTableActive = MasterTableEN;
            } else {

                MasterTableActive = MasterTableES;
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Table,
                    { striped: true, bordered: true, condensed: true, hover: true },
                    React.createElement(
                        'thead',
                        null,
                        MasterTableActive
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        filteredMaster.sort(function (a, b) {
                            return b.id - a.id;
                        }).map(function (master, index) {
                            return React.createElement(MasterTableBody, {
                                key: master.id,
                                id: master.id,

                                date: master.date,

                                name: master.name,

                                items: master.name,

                                status: master.status,

                                masterCallback: _this18.props.masterCallback
                            });
                        })
                    )
                )
            );
        }
    }]);

    return MasterTable;
}(React.Component);

var MasterTableBody = function (_React$Component15) {
    _inherits(MasterTableBody, _React$Component15);

    function MasterTableBody() {
        _classCallCheck(this, MasterTableBody);

        return _possibleConstructorReturn(this, (MasterTableBody.__proto__ || Object.getPrototypeOf(MasterTableBody)).apply(this, arguments));
    }

    _createClass(MasterTableBody, [{
        key: 'onClick',
        value: function onClick() {
            var _this20 = this;

            fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this20.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            console.log('clicked!');
        }
    }, {
        key: 'onClicked',
        value: function onClicked(event) {

            global = event.target.value;
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    React.createElement('input', { type: 'radio', name: 'radioCust', value: this.props.name, onClick: this.onClicked.bind(this) })
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.id
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.date
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.name
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.items
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.status
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        'a',
                        { target: '_blank', onClick: this.onClick, className: 'btn btn-default', href: "http://159.203.156.208:3000/" + this.props.id },
                        React.createElement('i', { className: 'fa fa-eye', 'aria-hidden': 'true' })
                    ),
                    ' ',
                    React.createElement(
                        Link,
                        { className: 'btn btn-default', to: '/actions/' + this.props.id },
                        React.createElement('i', { className: 'fa fa-dollar', 'aria-hidden': 'true' })
                    ),
                    ' ',
                    React.createElement(
                        Button,
                        { onClick: this.props.masterCallback.ondeletemaster.bind(this, this.props.id) },
                        React.createElement('i', { className: 'fa fa-trash', 'aria-hidden': 'true' })
                    )
                )
            );
        }
    }]);

    return MasterTableBody;
}(React.Component);

var MasterModalButton = function (_React$Component16) {
    _inherits(MasterModalButton, _React$Component16);

    function MasterModalButton() {
        _classCallCheck(this, MasterModalButton);

        return _possibleConstructorReturn(this, (MasterModalButton.__proto__ || Object.getPrototypeOf(MasterModalButton)).apply(this, arguments));
    }

    _createClass(MasterModalButton, [{
        key: 'render',
        value: function render() {

            var MasterModalButtonEN = React.createElement(
                Col,
                { md: 12 },
                React.createElement(
                    Button,
                    { style: { 'margin-left': '70%' },
                        bsStyle: 'default',
                        onClick: this.props.masterCallback.onsavemaster.bind(this) },
                    'Save'
                )
            );

            var MasterModalButtonES = React.createElement(
                Col,
                { md: 12 },
                React.createElement(
                    Button,
                    { style: { 'margin-left': '70%' },
                        bsStyle: 'default',
                        onClick: this.props.masterCallback.onsavemaster.bind(this) },
                    'Guardar'
                )
            );

            var MasterModalButtonActive = void 0;

            if (languageActive) {

                MasterModalButtonActive = MasterModalButtonEN;
            } else {

                MasterModalButtonActive = MasterModalButtonEN;
            }

            return React.createElement(
                Row,
                null,
                MasterModalButtonActive
            );
        }
    }]);

    return MasterModalButton;
}(React.Component);

var MasterModal = function (_React$Component17) {
    _inherits(MasterModal, _React$Component17);

    function MasterModal() {
        _classCallCheck(this, MasterModal);

        return _possibleConstructorReturn(this, (MasterModal.__proto__ || Object.getPrototypeOf(MasterModal)).apply(this, arguments));
    }

    _createClass(MasterModal, [{
        key: 'render',
        value: function render() {

            var MasterModalEN = React.createElement(
                Modal.Title,
                null,
                'Modal Header'
            );

            var MasterModalES = React.createElement(
                Modal.Title,
                null,
                'Agregar Factura'
            );

            var MasterModalActive = void 0;

            if (languageActive) {

                MasterModalActive = MasterModalEN;
            } else {

                MasterModalActive = MasterModalES;
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Modal,
                    { show: this.props.showModal },
                    React.createElement(
                        Modal.Header,
                        null,
                        MasterModalActive
                    ),
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(MasterModalField, {
                            masterCallback: this.props.masterCallback
                        }),
                        React.createElement('br', null),
                        React.createElement(MasterModalTable, {
                            masterDetail: this.props.masterDetail,

                            masterCallback: this.props.masterCallback
                        }),
                        React.createElement(MasterModalButton, {
                            masterCallback: this.props.masterCallback
                        })
                    )
                )
            );
        }
    }]);

    return MasterModal;
}(React.Component);

var languages = [{
    name: 'TRAJES 2 PIEZAS',
    year: 1972
}, {
    name: 'SACOS',
    year: 2000
}, {
    name: 'PANTALONES',
    year: 1983
}, {
    name: 'CAMISAS',
    year: 2007
}, {
    name: 'POLO SHIRT',
    year: 2012
}, {
    name: 'CHACABANA',
    year: 2009
}, {
    name: 'VESTIDO DAMAS',
    year: 1990
}, {
    name: 'FALDAS',
    year: 1995
}, {
    name: 'BLUSAS',
    year: 1995
}, {
    name: 'CORTINAS',
    year: 1987
}, {
    name: 'COLCHAS',
    year: 1995
}, {
    name: 'FRANELA',
    year: 1991
}, {
    name: 'ABRIGO',
    year: 1995
}, {
    name: 'OVERALL',
    year: 2003
}, {
    name: 'SHORT',
    year: 2003
}, {
    name: 'VESTIDO DE NOVIA',
    year: 2003
}];

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {

    var escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    var regex = new RegExp('^' + escapedValue, 'i');

    return languages.filter(function (language) {
        return regex.test(language.name);
    });
}

function renderSuggestion(suggestion) {
    return React.createElement(
        'span',
        null,
        suggestion.name
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

var MasterModalField = function (_React$Component18) {
    _inherits(MasterModalField, _React$Component18);

    function MasterModalField() {
        _classCallCheck(this, MasterModalField);

        var _this23 = _possibleConstructorReturn(this, (MasterModalField.__proto__ || Object.getPrototypeOf(MasterModalField)).call(this));

        _this23.state = {

            value: '',
            suggestions: [],
            peluqueraData: []
        };
        return _this23;
    }

    _createClass(MasterModalField, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this24 = this;

            fetch(API_URL + '/peluquera', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this24.setState({

                    peluqueraData: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'onChange',
        value: function onChange(event, _ref) {
            var newValue = _ref.newValue,
                method = _ref.method;

            this.setState({

                value: newValue
            });
        }
    }, {
        key: 'onSuggestionsFetchRequested',
        value: function onSuggestionsFetchRequested(_ref2) {
            var value = _ref2.value;

            this.setState({

                suggestions: getSuggestions(value)
            });
        }
    }, {
        key: 'onSuggestionsClearRequested',
        value: function onSuggestionsClearRequested() {

            this.setState({
                suggestions: []
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                value = _state.value,
                suggestions = _state.suggestions;

            var inputProps = {
                placeholder: "Type 'c'",
                value: value,
                onChange: this.onChange.bind(this)
            };

            var MasterModalFieldEN = React.createElement(
                Row,
                null,
                React.createElement(
                    Form,
                    {
                        onSubmit: this.props.masterCallback.onsavedetail.bind(this) },
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                'Name'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: 'text',
                                    name: 'firstname', placeholder: 'Name', required: true })
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalItem' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel,
                                    md: 1, sm: 2 },
                                'Item'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(Autosuggest, {
                                    suggestions: suggestions,

                                    onSuggestionsFetchRequested: this.onSuggestionsFetchRequested.bind(this),

                                    onSuggestionsClearRequested: this.onSuggestionsClearRequested.bind(this),

                                    renderSuggestion: renderSuggestion,

                                    getSuggestionValue: getSuggestionValue,
                                    inputProps: inputProps
                                })
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formControlsSelect' },
                            React.createElement(
                                Col,
                                { md: 1, sm: 2 },
                                React.createElement(
                                    ControlLabel,
                                    null,
                                    'List'
                                )
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(
                                    FormControl,
                                    { componentClass: 'select',
                                        name: 'development', placeholder: 'List', required: true },
                                    React.createElement(
                                        'option',
                                        { value: 'select' },
                                        'Select'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '...' },
                                        '...'
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                'Project'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: 'text', name: 'project', placeholder: 'Project', required: true })
                            ),
                            React.createElement(
                                Col,
                                { md: 2, sm: 2 },
                                React.createElement(
                                    Button,
                                    { type: 'submit' },
                                    React.createElement('i', { className: 'fa fa-plus', 'aria-hidden': 'true' })
                                )
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                'Cantidad'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: 'text', name: 'quantity', placeholder: 'Cantidad', required: true })
                            ),
                            React.createElement(
                                Col,
                                { md: 2, sm: 2 },
                                React.createElement(
                                    Button,
                                    { type: 'submit' },
                                    React.createElement('i', { className: 'fa fa-plus', 'aria-hidden': 'true' })
                                )
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement('input', { style: { 'width': '70px', 'display': 'none' }, type: 'text', name: 'suggest', placeholder: 'Name', value: this.state.value })
                    )
                )
            );

            var customerDisplay = React.createElement(FormControl, { type: 'text', name: 'firstname', placeholder: 'Cliente', required: true });

            var customerDisplayGlobal = React.createElement(FormControl, { type: 'text', name: 'firstname', placeholder: 'Cliente', value: global, required: true });

            var customerDisplayActive = void 0;

            if (global == 0) {
                customerDisplayActive = customerDisplay;
            } else {
                customerDisplayActive = customerDisplayGlobal;
            }

            var MasterModalFieldES = React.createElement(
                Row,
                null,
                React.createElement(
                    Form,
                    { onSubmit: this.props.masterCallback.onsavedetail.bind(this) },
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                'Cliente'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                customerDisplayActive
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalItem' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                'Articulo'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(Autosuggest, {
                                    suggestions: suggestions, onSuggestionsFetchRequested: this.onSuggestionsFetchRequested.bind(this), onSuggestionsClearRequested: this.onSuggestionsClearRequested.bind(this), renderSuggestion: renderSuggestion, getSuggestionValue: getSuggestionValue,
                                    inputProps: inputProps
                                })
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formControlsSelect' },
                            React.createElement(
                                Col,
                                { md: 1, sm: 2 },
                                React.createElement(
                                    ControlLabel,
                                    null,
                                    'Tipo de Servicio'
                                )
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(
                                    FormControl,
                                    { componentClass: 'select', name: 'development', placeholder: 'Tipo de Servicio', required: true },
                                    this.state.peluqueraData.sort(function (a, b) {
                                        return a.name > b.name;
                                    }).map(function (item) {
                                        return React.createElement(
                                            'option',
                                            { value: item.name },
                                            item.name
                                        );
                                    })
                                )
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                'Precio'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: 'text', name: 'project', placeholder: 'Precio', required: true })
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                'Cantidad'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: 'text', name: 'quantity', placeholder: 'Cantidad', required: true })
                            ),
                            React.createElement(
                                Col,
                                { md: 2, sm: 2 },
                                React.createElement(
                                    Button,
                                    { type: 'submit' },
                                    React.createElement('i', { className: 'fa fa-plus', 'aria-hidden': 'true' })
                                )
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement('input', {
                            style: { 'width': '70px', 'display': 'none' }, type: 'text', name: 'suggest',
                            placeholder: 'Name', value: this.state.value })
                    )
                )
            );

            var MasterModalFieldActive = void 0;

            if (languageActive) {

                MasterModalFieldActive = MasterModalFieldEN;
            } else {
                MasterModalFieldActive = MasterModalFieldES;
            }

            return React.createElement(
                Grid,
                null,
                MasterModalFieldActive
            );
        }
    }]);

    return MasterModalField;
}(React.Component);

var MasterModalTable = function (_React$Component19) {
    _inherits(MasterModalTable, _React$Component19);

    function MasterModalTable() {
        _classCallCheck(this, MasterModalTable);

        return _possibleConstructorReturn(this, (MasterModalTable.__proto__ || Object.getPrototypeOf(MasterModalTable)).apply(this, arguments));
    }

    _createClass(MasterModalTable, [{
        key: 'render',
        value: function render() {

            var MasterModalTableEN = React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    '#'
                ),
                React.createElement(
                    'th',
                    null,
                    'Name'
                ),
                React.createElement(
                    'th',
                    null,
                    'Item'
                ),
                React.createElement(
                    'th',
                    null,
                    'Development'
                ),
                React.createElement(
                    'th',
                    null,
                    'Project'
                )
            );

            var MasterModalTableES = React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    '#'
                ),
                React.createElement(
                    'th',
                    null,
                    'Nombre'
                ),
                React.createElement(
                    'th',
                    null,
                    'Articulo'
                ),
                React.createElement(
                    'th',
                    null,
                    'Tipo de Servicio'
                ),
                React.createElement(
                    'th',
                    null,
                    'Precio'
                )
            );

            var MasterModalActive = void 0;

            if (languageActive) {

                MasterModalActive = MasterModalTableEN;
            } else {

                MasterModalActive = MasterModalTableES;
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Table,
                    { striped: true, bordered: true, condensed: true, hover: true },
                    React.createElement(
                        'thead',
                        null,
                        MasterModalActive
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        this.props.masterDetail.map(function (masterdetail, index) {
                            return React.createElement(MasterModalTableBody, {
                                index: index + 1,
                                key: index,
                                id: masterdetail.id,

                                firstname: masterdetail.firstname,

                                item: masterdetail.item,

                                development: masterdetail.development,

                                project: masterdetail.project
                            });
                        })
                    )
                )
            );
        }
    }]);

    return MasterModalTable;
}(React.Component);

var MasterModalTableBody = function (_React$Component20) {
    _inherits(MasterModalTableBody, _React$Component20);

    function MasterModalTableBody() {
        _classCallCheck(this, MasterModalTableBody);

        return _possibleConstructorReturn(this, (MasterModalTableBody.__proto__ || Object.getPrototypeOf(MasterModalTableBody)).apply(this, arguments));
    }

    _createClass(MasterModalTableBody, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    this.props.index
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.firstname
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.item
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.development
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.project
                )
            );
        }
    }]);

    return MasterModalTableBody;
}(React.Component);

var Detail = function (_React$Component21) {
    _inherits(Detail, _React$Component21);

    function Detail() {
        _classCallCheck(this, Detail);

        var _this27 = _possibleConstructorReturn(this, (Detail.__proto__ || Object.getPrototypeOf(Detail)).call(this));

        _this27.state = {
            showModal: false,
            filterText: '',
            detailData: []
        };
        return _this27;
    }

    _createClass(Detail, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this28 = this;

            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this28.setState({

                    detailData: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'close',
        value: function close() {
            this.setState({
                showModal: false
            });
        }
    }, {
        key: 'open',
        value: function open() {
            this.setState({
                showModal: true
            });
        }
    }, {
        key: 'onSaveDetail',
        value: function onSaveDetail(event) {
            var _newDetail;

            event.preventDefault();

            var today = moment(new Date()).format('YYYY-MM-DD');

            var newDetail = (_newDetail = {

                "id": Date.now(),
                "date": today
            }, _defineProperty(_newDetail, 'id', event.target.id.value), _defineProperty(_newDetail, "name", event.target.name.value), _defineProperty(_newDetail, "item", event.target.item.value), _defineProperty(_newDetail, "environment", event.target.environment.value), _newDetail);

            var nextState = this.state.detailData;

            nextState.push(newDetail);

            fetch(API_URL + '/detail', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newDetail)
            });

            this.setState({

                detailData: nextState,
                showModal: false
            });
        }
    }, {
        key: 'onHandleChange',
        value: function onHandleChange(event) {

            this.setState({

                filterText: event.target.value
            });
        }
    }, {
        key: 'onUpdated',
        value: function onUpdated(value) {

            console.log(value);
        }
    }, {
        key: 'onDeleted',
        value: function onDeleted(value) {

            var nextState = this.state.detailData;

            var index = nextState.findIndex(function (x) {
                return x.id == value;
            });

            nextState.splice(index, 1);

            this.setState({

                detailData: nextState
            });

            fetch(API_URL + '/deletedetail', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "index": index, "id": value })
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var DetailEN = React.createElement(
                Button,
                { onClick: this.open.bind(this) },
                'Add Detail'
            );

            var DetailES = React.createElement(
                Button,
                { onClick: this.open.bind(this) },
                'Agregar Articulo'
            );

            var DetailActive = void 0;

            if (languageActive) {
                DetailActive = DetailEN;
            } else {
                DetailActive = DetailES;
            }

            return React.createElement(
                Grid,
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(DetailSearch, {
                        filterText: this.state.filterText,
                        detailCallback: {
                            onHandleChange: this.onHandleChange.bind(this)
                        }
                    })
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        'div',
                        { className: 'pull-right' },
                        DetailActive,
                        React.createElement(DetailModal, { showModal: this.state.showModal,
                            detailCallback: {
                                open: this.open,
                                close: this.close.bind(this),

                                onsavedetail: this.onSaveDetail.bind(this)
                            }
                        })
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(DetailTable, {
                        filterText: this.state.filterText,
                        detailData: this.state.detailData,
                        detailCallback: {
                            onUpdated: this.onUpdated.bind(this),
                            onDeleted: this.onDeleted.bind(this)
                        }
                    })
                )
            );
        }
    }]);

    return Detail;
}(React.Component);

var DetailPagination = function (_React$Component22) {
    _inherits(DetailPagination, _React$Component22);

    function DetailPagination() {
        _classCallCheck(this, DetailPagination);

        var _this29 = _possibleConstructorReturn(this, (DetailPagination.__proto__ || Object.getPrototypeOf(DetailPagination)).call(this));

        _this29.state = {
            activePage: 1
        };
        return _this29;
    }

    _createClass(DetailPagination, [{
        key: 'handleSelect',
        value: function handleSelect(eventKey) {
            this.setState({
                activePage: eventKey
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(Pagination, {
                prev: true,
                next: true,
                first: true,
                last: true,
                ellipsis: true,
                boundaryLinks: true,
                items: 5,
                maxButtons: 5,
                activePage: this.state.activePage,
                onSelect: this.handleSelect.bind(this)
            });
        }
    }]);

    return DetailPagination;
}(React.Component);

var DetailSearch = function (_React$Component23) {
    _inherits(DetailSearch, _React$Component23);

    function DetailSearch() {
        _classCallCheck(this, DetailSearch);

        return _possibleConstructorReturn(this, (DetailSearch.__proto__ || Object.getPrototypeOf(DetailSearch)).apply(this, arguments));
    }

    _createClass(DetailSearch, [{
        key: 'render',
        value: function render() {

            var DetailSearchEN = React.createElement(
                Panel,
                { header: 'Search Detail' },
                React.createElement(
                    'form',
                    null,
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'div',
                            { className: 'col-md-2 col-sm-2' },
                            React.createElement(
                                'label',
                                null,
                                'Search:'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-10 col-sm-10' },
                            React.createElement('input', {
                                onChange: this.props.detailCallback.onHandleChange.bind(this),
                                type: 'text', className: 'form-control', id: 'first_name',
                                name: 'first_name' })
                        )
                    )
                )
            );

            var DetailSearchES = React.createElement(
                Panel,
                { header: 'Busqueda ' },
                React.createElement(
                    'form',
                    null,
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'div',
                            { className: 'col-md-2 col-sm-2' },
                            React.createElement(
                                'label',
                                null,
                                'Buscar:'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-10 col-sm-10' },
                            React.createElement('input', {
                                onChange: this.props.detailCallback.onHandleChange.bind(this),
                                type: 'text', className: 'form-control', id: 'first_name',
                                name: 'first_name' })
                        )
                    )
                )
            );

            var DetailSearchActive = void 0;

            if (languageActive) {

                DetailSearchActive = DetailSearchEN;
            } else {
                DetailSearchActive = DetailSearchES;
            }

            return React.createElement(
                'div',
                null,
                DetailSearchActive
            );
        }
    }]);

    return DetailSearch;
}(React.Component);

var DetailTable = function (_React$Component24) {
    _inherits(DetailTable, _React$Component24);

    function DetailTable() {
        _classCallCheck(this, DetailTable);

        return _possibleConstructorReturn(this, (DetailTable.__proto__ || Object.getPrototypeOf(DetailTable)).apply(this, arguments));
    }

    _createClass(DetailTable, [{
        key: 'render',
        value: function render() {
            var _this32 = this;

            var filteredTable = this.props.detailData.filter(function (detail) {
                return detail.name.indexOf(_this32.props.filterText) !== -1;
            });

            var DetailTableEN = React.createElement(
                Panel,
                { header: 'Search List' },
                React.createElement(
                    Table,
                    { striped: true, bordered: true, condensed: true, hover: true },
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                'ID'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Name'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Item'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Environment'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Acciones'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        filteredTable.map(function (detail, index) {
                            return React.createElement(DetailTableBody, {
                                key: index,
                                id: detail.id,
                                name: detail.name,
                                item: detail.item,

                                environment: detail.environment,

                                detailCallback: _this32.props.detailCallback
                            });
                        })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'pull-right' },
                    React.createElement(DetailPagination, null)
                )
            );

            var DetailTableES = React.createElement(
                Panel,
                { header: 'Listado ' },
                React.createElement(
                    Table,
                    { striped: true, bordered: true, condensed: true, hover: true },
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                'ID'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Descripcion'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Cantidad'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Precio'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Actions'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        filteredTable.map(function (detail, index) {
                            return React.createElement(DetailTableBody, {
                                key: index,
                                id: detail.id,
                                name: detail.name,
                                item: detail.item,

                                environment: detail.environment,

                                detailCallback: _this32.props.detailCallback
                            });
                        })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'pull-right' },
                    React.createElement(DetailPagination, null)
                )
            );

            var DetailTableActive = void 0;

            if (languageActive) {
                DetailTableActive = DetailTableEN;
            } else {
                DetailTableActive = DetailTableES;
            }

            return React.createElement(
                'div',
                null,
                DetailTableActive
            );
        }
    }]);

    return DetailTable;
}(React.Component);

var DetailModalUpdate = function (_React$Component25) {
    _inherits(DetailModalUpdate, _React$Component25);

    function DetailModalUpdate() {
        _classCallCheck(this, DetailModalUpdate);

        var _this33 = _possibleConstructorReturn(this, (DetailModalUpdate.__proto__ || Object.getPrototypeOf(DetailModalUpdate)).call(this));

        _this33.state = {

            parameter: '',
            showModal: true,
            detailData: [],
            name: ''
        };

        return _this33;
    }

    _createClass(DetailModalUpdate, [{
        key: 'close',
        value: function close() {

            this.setState({

                showModal: false
            });

            //window.location.href = '/'
        }
    }, {
        key: 'open',
        value: function open() {

            this.setState({

                showModal: true
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this34 = this;

            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this34.setState({

                    detailData: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            this.setState({

                parameter: this.props.params.detailid
            });
        }
    }, {
        key: 'onSubmitted',
        value: function onSubmitted(event) {
            var _this35 = this;

            event.preventDefault();

            var nextState = this.state.detailData;

            var index = nextState.findIndex(function (x) {
                return x.id == _this35.state.parameter;
            });

            var name = nextState[index].name;
            nextState[index].name = event.target.name.value;
            if (event.target.name.value == '') {
                event.target.name.value = name;
            }

            var environment = nextState[index].environment;
            if (event.target.environment.value == '') {
                event.target.environment.value = environment;
            }

            fetch(API_URL + '/updatedetail', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "index": index, "name": event.target.name.value, "environment": event.target.environment.value })
            });

            this.setState({

                showModal: false
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                Modal,
                { show: this.state.showModal, onHide: this.close.bind(this) },
                React.createElement(
                    Modal.Header,
                    null,
                    React.createElement(
                        Modal.Title,
                        null,
                        React.createElement(
                            'h1',
                            null,
                            'Editing to ',
                            this.state.parameter
                        )
                    )
                ),
                React.createElement(
                    Form,
                    { onSubmit: this.onSubmitted.bind(this), horizontal: true },
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalId' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'ID'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { value: this.state.parameter, type: 'id', placeholder: 'id', disabled: true })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Nombre'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'name', type: 'text', placeholder: 'Nombre' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalEnvironment' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Cantidad'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'environment', type: 'text', placeholder: 'Cantidad' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalEnvironment' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Precio'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'project', type: 'text', placeholder: 'Precio' })
                            )
                        )
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            Button,
                            null,
                            'Save'
                        )
                    )
                )
            );
        }
    }]);

    return DetailModalUpdate;
}(React.Component);

var DetailTableBody = function (_React$Component26) {
    _inherits(DetailTableBody, _React$Component26);

    function DetailTableBody() {
        _classCallCheck(this, DetailTableBody);

        return _possibleConstructorReturn(this, (DetailTableBody.__proto__ || Object.getPrototypeOf(DetailTableBody)).apply(this, arguments));
    }

    _createClass(DetailTableBody, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    this.props.id
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.name
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.item
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.environment
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        Link,
                        { className: 'btn btn-default',
                            to: '/updatedetail/' + this.props.id },
                        React.createElement('i', { className: 'fa fa-edit',
                            'aria-hidden': 'true' })
                    ),
                    React.createElement(
                        Button,
                        {
                            onClick: this.props.detailCallback.onDeleted.bind(this, this.props.id) },
                        React.createElement('i', {
                            className: 'fa fa-trash', 'aria-hidden': 'true' })
                    )
                )
            );
        }
    }]);

    return DetailTableBody;
}(React.Component);

var DetailModal = function (_React$Component27) {
    _inherits(DetailModal, _React$Component27);

    function DetailModal() {
        _classCallCheck(this, DetailModal);

        return _possibleConstructorReturn(this, (DetailModal.__proto__ || Object.getPrototypeOf(DetailModal)).apply(this, arguments));
    }

    _createClass(DetailModal, [{
        key: 'render',
        value: function render() {

            var DetailModalEN = React.createElement(
                Modal,
                { show: this.props.showModal,
                    onHide: this.props.detailCallback.close },
                React.createElement(
                    Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        Modal.Title,
                        null,
                        'Modal heading'
                    )
                ),
                React.createElement(
                    Form,
                    { horizontal: true,
                        onSubmit: this.props.detailCallback.onsavedetail.bind(this) },
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalid' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'ID'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'id', placeholder: 'ID' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalname' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Name'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'name', placeholder: 'Name' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalEnvironment' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Environment'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'environment', placeholder: 'Item' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalItem' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Item'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'item', placeholder: 'Item' })
                            )
                        )
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            Button,
                            { type: 'submit',
                                pullRight: true },
                            'Save'
                        )
                    )
                )
            );
            var DetailModalES = React.createElement(
                Modal,
                { show: this.props.showModal,
                    onHide: this.props.detailCallback.close },
                React.createElement(
                    Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        Modal.Title,
                        null,
                        'Agregar Articulo'
                    )
                ),
                React.createElement(
                    Form,
                    { horizontal: true,
                        onSubmit: this.props.detailCallback.onsavedetail.bind(this) },
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalid' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Codigo'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'id', placeholder: 'Codigo' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalname' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Descripcion'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'name', placeholder: 'Descripcion' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalEnvironment' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Precio'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'environment', placeholder: 'Precio' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalItem' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Cantidad'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'item', placeholder: 'Cantidad' })
                            )
                        )
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            Button,
                            { type: 'submit',
                                pullRight: true },
                            'Save'
                        )
                    )
                )
            );

            var DetailModalActive = void 0;

            if (languageActive) {
                DetailModalActive = DetailModalEN;
            } else {
                DetailModalActive = DetailModalES;
            }

            return React.createElement(
                'div',
                null,
                DetailModalActive
            );
        }
    }]);

    return DetailModal;
}(React.Component);

var Partials = function (_React$Component28) {
    _inherits(Partials, _React$Component28);

    function Partials() {
        _classCallCheck(this, Partials);

        var _this38 = _possibleConstructorReturn(this, (Partials.__proto__ || Object.getPrototypeOf(Partials)).call(this));

        _this38.state = {

            masterAPI: [],
            searchData: '2017-10-06',
            total: 0
        };

        return _this38;
    }

    _createClass(Partials, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this39 = this;

            fetch(API_URL + '/reporte', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this39.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            var today = moment(new Date()).format('YYYY-MM-DD');

            this.setState({

                searchData: today
            });
        }
    }, {
        key: 'onChanged',
        value: function onChanged(event) {

            this.setState({

                searchData: event.target.value
            });
        }
    }, {
        key: 'onRun',
        value: function onRun() {
            var _this40 = this;

            var nextState = this.state.masterAPI.filter(function (master) {
                return master.date == _this40.state.searchData && (master.payment == "cash" || master.payment == "card");
            });

            var grand = 0;

            for (var x = 0; x < nextState.length; x++) {
                grand += parseInt(nextState[x].project);
            }

            this.setState({

                total: grand
            });

            window.print();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this41 = this;

            var PartialsEN = React.createElement(
                'h1',
                null,
                'Draw List'
            );

            var PartialsES = React.createElement(
                'h1',
                null,
                'Reporte Cuadre'
            );

            var PartialsActive = void 0;

            if (languageActive) {

                PartialsActive = PartialsEN;
            } else {

                PartialsActive = PartialsES;
            }

            return React.createElement(
                Grid,
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Col,
                        { xs: 6 },
                        PartialsActive
                    )
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(PartialsSearch, {
                        onChanged: this.onChanged.bind(this)
                    }),
                    React.createElement(PartialsTable, {

                        masterAPI: this.state.masterAPI.filter(function (master) {
                            return master.date == _this41.state.searchData && (master.payment == "cash" || master.payment == "card");
                        }),
                        total: this.state.total,
                        payment: this.state.payment
                    })
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Button,
                        { onClick: this.onRun.bind(this) },
                        'i'
                    )
                )
            );
        }
    }]);

    return Partials;
}(React.Component);

var PartialsSearch = function (_React$Component29) {
    _inherits(PartialsSearch, _React$Component29);

    function PartialsSearch() {
        _classCallCheck(this, PartialsSearch);

        return _possibleConstructorReturn(this, (PartialsSearch.__proto__ || Object.getPrototypeOf(PartialsSearch)).apply(this, arguments));
    }

    _createClass(PartialsSearch, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                Col,
                { xs: 6 },
                React.createElement(
                    Form,
                    { horizontal: true,
                        onChange: this.props.onChanged.bind(this) },
                    React.createElement(
                        FormGroup,
                        { controlId: 'formHorizontalEmail' },
                        React.createElement(Col, { componentClass: ControlLabel, xs: 2 }),
                        React.createElement(
                            Col,
                            { xs: 6 },
                            React.createElement(FormControl, { type: 'date', placeholder: 'Email' })
                        )
                    )
                )
            );
        }
    }]);

    return PartialsSearch;
}(React.Component);

var PartialsTable = function (_React$Component30) {
    _inherits(PartialsTable, _React$Component30);

    function PartialsTable() {
        _classCallCheck(this, PartialsTable);

        return _possibleConstructorReturn(this, (PartialsTable.__proto__ || Object.getPrototypeOf(PartialsTable)).apply(this, arguments));
    }

    _createClass(PartialsTable, [{
        key: 'render',
        value: function render() {
            var _this44 = this;

            var partialsTableEN = React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '25px', 'border-spacing': '0 30px' } },
                    '#'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    'Date'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    'Name'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    'Project'
                )
            );

            var partialsTableES = React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '35px', 'border-spacing': '0 30px' } },
                    '#'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '35px' } },
                    'Fecha'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '35px' } },
                    'Cliente'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '35px' } },
                    'Precio'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '35px' } },
                    'Tipo Pago'
                )
            );

            var partialsTableActive = void 0;

            if (languageActive) {

                partialsTableActive = partialsTableEN;
            } else {

                partialsTableActive = partialsTableES;
            }

            return React.createElement(
                Row,
                null,
                React.createElement(
                    Col,
                    { xs: 12 },
                    React.createElement(
                        Table,
                        { striped: true, bordered: true, condensed: true, hover: true, style: { 'width': '100%' } },
                        React.createElement(
                            'thead',
                            null,
                            partialsTableActive
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            this.props.masterAPI.map(function (master, index) {
                                return React.createElement(PartialsTableBody, {
                                    key: index,
                                    index: index + 1,
                                    id: master.id,
                                    date: master.date,
                                    name: master.name,
                                    project: master.project,
                                    total: _this44.props.total,
                                    payment: master.payment
                                });
                            })
                        ),
                        React.createElement(
                            'tfoot',
                            null,
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    '\xA0'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    '\xA0'
                                ),
                                React.createElement(
                                    'td',
                                    { style: { 'width': '10px', 'font-size': '35px' } },
                                    'Total'
                                ),
                                React.createElement(
                                    'td',
                                    { style: { 'width': '10px', 'font-size': '35px' } },
                                    'RD$',
                                    this.props.total,
                                    '.00'
                                ),
                                React.createElement('br', null),
                                React.createElement('br', null)
                            )
                        )
                    )
                )
            );
        }
    }]);

    return PartialsTable;
}(React.Component);

var PartialsTableBody = function (_React$Component31) {
    _inherits(PartialsTableBody, _React$Component31);

    function PartialsTableBody() {
        _classCallCheck(this, PartialsTableBody);

        return _possibleConstructorReturn(this, (PartialsTableBody.__proto__ || Object.getPrototypeOf(PartialsTableBody)).apply(this, arguments));
    }

    _createClass(PartialsTableBody, [{
        key: 'render',
        value: function render() {

            var nextState = void 0;

            var tipoPagoEF = React.createElement(
                'td',
                { style: { 'font-size': '35px' } },
                'EFECTIVO'
            );

            var tipoPagoTA = React.createElement(
                'td',
                { style: { 'font-size': '35px' } },
                'TARJETA'
            );

            if (this.props.payment == "card") {

                nextState = tipoPagoTA;
            } else {

                nextState = tipoPagoEF;
            }

            return React.createElement(
                'tr',
                null,
                React.createElement('td', null),
                React.createElement(
                    'td',
                    { style: { 'font-size': '35px' } },
                    this.props.date
                ),
                React.createElement(
                    'td',
                    { style: { 'font-size': '35px' } },
                    this.props.name
                ),
                React.createElement(
                    'td',
                    { style: { 'font-size': '35px' } },
                    this.props.project,
                    '.00'
                ),
                React.createElement(
                    'td',
                    { style: { 'font-size': '35px' } },
                    nextState
                )
            );
        }
    }]);

    return PartialsTableBody;
}(React.Component);

var TriPartials = function (_React$Component32) {
    _inherits(TriPartials, _React$Component32);

    function TriPartials() {
        _classCallCheck(this, TriPartials);

        var _this46 = _possibleConstructorReturn(this, (TriPartials.__proto__ || Object.getPrototypeOf(TriPartials)).call(this));

        _this46.state = {

            masterAPI: []
        };
        return _this46;
    }

    _createClass(TriPartials, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this47 = this;

            fetch(API_URL + '/weeklyreportrecap', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this47.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(TriPartialsTable, {
                masterAPI: this.state.masterAPI
            });
        }
    }]);

    return TriPartials;
}(React.Component);

var TriPartialsTable = function (_React$Component33) {
    _inherits(TriPartialsTable, _React$Component33);

    function TriPartialsTable() {
        _classCallCheck(this, TriPartialsTable);

        return _possibleConstructorReturn(this, (TriPartialsTable.__proto__ || Object.getPrototypeOf(TriPartialsTable)).apply(this, arguments));
    }

    _createClass(TriPartialsTable, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                Table,
                { striped: true, bordered: true, condensed: true, hover: true },
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            '#'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Nombre'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Total'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Porcentaje'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Total + Porcentaje'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    this.props.masterAPI.map(function (master, index) {
                        return React.createElement(TriPartialsTableBody, {
                            master: master._id,
                            total: master.total
                        });
                    })
                )
            );
        }
    }]);

    return TriPartialsTable;
}(React.Component);

var TriPartialsTableBody = function (_React$Component34) {
    _inherits(TriPartialsTableBody, _React$Component34);

    function TriPartialsTableBody() {
        _classCallCheck(this, TriPartialsTableBody);

        var _this49 = _possibleConstructorReturn(this, (TriPartialsTableBody.__proto__ || Object.getPrototypeOf(TriPartialsTableBody)).call(this));

        _this49.state = {
            percentage: 1
        };
        return _this49;
    }

    _createClass(TriPartialsTableBody, [{
        key: 'onChanged',
        value: function onChanged(data) {
            this.setState({
                percentage: data.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var percentageTotal = this.props.total * this.state.percentage / 100;

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    '\xA0'
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.master
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.total.toFixed(2)
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement('input', { type: 'number', name: 'percentage', placeholder: '%', onChange: this.onChanged.bind(this) })
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        'h6',
                        null,
                        percentageTotal.toFixed(2)
                    )
                )
            );
        }
    }]);

    return TriPartialsTableBody;
}(React.Component);

var BiPartials = function (_React$Component35) {
    _inherits(BiPartials, _React$Component35);

    function BiPartials() {
        _classCallCheck(this, BiPartials);

        var _this50 = _possibleConstructorReturn(this, (BiPartials.__proto__ || Object.getPrototypeOf(BiPartials)).call(this));

        _this50.state = {

            masterAPI: []
        };

        return _this50;
    }

    _createClass(BiPartials, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this51 = this;

            fetch(API_URL + '/weeklyreport', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this51.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                Table,
                { striped: true, bordered: true, condensed: true, hover: true },
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            '#'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Fecha'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Tipo de Servicio'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    this.state.masterAPI.map(function (master, index) {
                        return React.createElement(BiPartialsTable, {
                            index: index,
                            fecha: master._id,
                            count: master.count
                        });
                    })
                )
            );
        }
    }]);

    return BiPartials;
}(React.Component);

var BiPartialsTable = function (_React$Component36) {
    _inherits(BiPartialsTable, _React$Component36);

    function BiPartialsTable() {
        _classCallCheck(this, BiPartialsTable);

        return _possibleConstructorReturn(this, (BiPartialsTable.__proto__ || Object.getPrototypeOf(BiPartialsTable)).apply(this, arguments));
    }

    _createClass(BiPartialsTable, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    this.props.index
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.fecha
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        Table,
                        null,
                        this.props.count.map(function (item) {
                            return React.createElement(BiPartialsTableBody, {
                                totales: item.totales,
                                item: item.item
                            });
                        })
                    )
                )
            );
        }
    }]);

    return BiPartialsTable;
}(React.Component);

var BiPartialsTableBody = function (_React$Component37) {
    _inherits(BiPartialsTableBody, _React$Component37);

    function BiPartialsTableBody() {
        _classCallCheck(this, BiPartialsTableBody);

        return _possibleConstructorReturn(this, (BiPartialsTableBody.__proto__ || Object.getPrototypeOf(BiPartialsTableBody)).apply(this, arguments));
    }

    _createClass(BiPartialsTableBody, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    this.props.item[0]
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.totales
                )
            );
        }
    }]);

    return BiPartialsTableBody;
}(React.Component);

var AgregarPeluquera = function (_React$Component38) {
    _inherits(AgregarPeluquera, _React$Component38);

    function AgregarPeluquera() {
        _classCallCheck(this, AgregarPeluquera);

        var _this54 = _possibleConstructorReturn(this, (AgregarPeluquera.__proto__ || Object.getPrototypeOf(AgregarPeluquera)).call(this));

        _this54.state = {
            showModal: false,
            filterText: '',
            peluqueraData: []
        };
        return _this54;
    }

    _createClass(AgregarPeluquera, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this55 = this;

            fetch(API_URL + '/peluquera', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this55.setState({

                    peluqueraData: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'close',
        value: function close() {
            this.setState({
                showModal: false
            });
        }
    }, {
        key: 'open',
        value: function open() {
            this.setState({
                showModal: true
            });
        }
    }, {
        key: 'onDeleted',
        value: function onDeleted(value) {

            var nextState = this.state.peluqueraData;

            var index = nextState.findIndex(function (x) {
                return x.id == value;
            });
            console.log(nextState);
            console.log(value);
            nextState.splice(index, 1);

            this.setState({

                peluqueraData: nextState
            });

            fetch(API_URL + '/deletepeluquera', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "index": index, "id": value })
            });
        }
    }, {
        key: 'onSavePeluquera',
        value: function onSavePeluquera(event) {

            event.preventDefault();

            var today = moment(new Date()).format('YYYY-MM-DD');

            var newPeluquera = {

                "id": Date.now(),
                "date": today,
                "name": event.target.name.value
            };

            var nextState = this.state.peluqueraData;

            nextState.push(newPeluquera);

            fetch(API_URL + '/peluquera', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newPeluquera)
            });

            this.setState({

                peluqueraData: nextState,
                showModal: false
            });
        }
    }, {
        key: 'onHandleChange',
        value: function onHandleChange(event) {

            this.setState({

                filterText: event.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                Grid,
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(PeluqueraSearch, null)
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        'div',
                        { className: 'pull-right' },
                        React.createElement(
                            Button,
                            { onClick: this.open.bind(this) },
                            'Agregar Tipo de Servicio'
                        ),
                        React.createElement(PeluqueraModal, { showModal: this.state.showModal,
                            peluqueraCallback: {
                                open: this.open,
                                close: this.close.bind(this),
                                onsavepeluquera: this.onSavePeluquera.bind(this),
                                ondeletepeluquera: this.onDeleted.bind(this)
                            }
                        })
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(PeluqueraTable, {
                        filterText: this.state.filterText,
                        peluqueraData: this.state.peluqueraData,
                        peluqueraCallback: {
                            onDeleted: this.onDeleted.bind(this)
                        }
                    })
                )
            );
        }
    }]);

    return AgregarPeluquera;
}(React.Component);

var PeluqueraSearch = function (_React$Component39) {
    _inherits(PeluqueraSearch, _React$Component39);

    function PeluqueraSearch() {
        _classCallCheck(this, PeluqueraSearch);

        return _possibleConstructorReturn(this, (PeluqueraSearch.__proto__ || Object.getPrototypeOf(PeluqueraSearch)).apply(this, arguments));
    }

    _createClass(PeluqueraSearch, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                Panel,
                { header: 'Busqueda ' },
                React.createElement(
                    'form',
                    null,
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'div',
                            { className: 'col-md-2 col-sm-2' },
                            React.createElement(
                                'label',
                                null,
                                'Buscar:'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-10 col-sm-10' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'first_name', name: 'first_name' })
                        )
                    )
                )
            );
        }
    }]);

    return PeluqueraSearch;
}(React.Component);

var PeluqueraTable = function (_React$Component40) {
    _inherits(PeluqueraTable, _React$Component40);

    function PeluqueraTable() {
        _classCallCheck(this, PeluqueraTable);

        return _possibleConstructorReturn(this, (PeluqueraTable.__proto__ || Object.getPrototypeOf(PeluqueraTable)).apply(this, arguments));
    }

    _createClass(PeluqueraTable, [{
        key: 'render',
        value: function render() {
            var _this58 = this;

            var filteredMaster = this.props.peluqueraData.filter(function (master) {
                return master.name.indexOf(_this58.props.filterText) !== -1;
            });

            return React.createElement(
                Panel,
                { header: 'Listado de Tipo de Servicio' },
                React.createElement(
                    Table,
                    { striped: true, bordered: true, condensed: true, hover: true },
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                'ID'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Fecha'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Nombre'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Acciones'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        filteredMaster.map(function (master, index) {
                            var _React$createElement;

                            return React.createElement(PeluqueraTableBody, (_React$createElement = {
                                id: master.id, date: master.date
                            }, _defineProperty(_React$createElement, 'date', master.date), _defineProperty(_React$createElement, 'name', master.name), _defineProperty(_React$createElement, 'peluqueraCallback', _this58.props.peluqueraCallback), _React$createElement));
                        })
                    )
                )
            );
        }
    }]);

    return PeluqueraTable;
}(React.Component);

var PeluqueraTableBody = function (_React$Component41) {
    _inherits(PeluqueraTableBody, _React$Component41);

    function PeluqueraTableBody() {
        _classCallCheck(this, PeluqueraTableBody);

        return _possibleConstructorReturn(this, (PeluqueraTableBody.__proto__ || Object.getPrototypeOf(PeluqueraTableBody)).apply(this, arguments));
    }

    _createClass(PeluqueraTableBody, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    this.props.id
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.date
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.name
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        Button,
                        { className: 'btn btn-default' },
                        React.createElement('i', { className: 'fa fa-edit', 'aria-hidden': 'true' })
                    ),
                    React.createElement(
                        Button,
                        { onClick: this.props.peluqueraCallback.onDeleted.bind(this, this.props.id) },
                        React.createElement('i', { className: 'fa fa-trash', 'aria-hidden': 'true' })
                    )
                )
            );
        }
    }]);

    return PeluqueraTableBody;
}(React.Component);

var PeluqueraModal = function (_React$Component42) {
    _inherits(PeluqueraModal, _React$Component42);

    function PeluqueraModal() {
        _classCallCheck(this, PeluqueraModal);

        return _possibleConstructorReturn(this, (PeluqueraModal.__proto__ || Object.getPrototypeOf(PeluqueraModal)).apply(this, arguments));
    }

    _createClass(PeluqueraModal, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                Modal,
                { show: this.props.showModal, onHide: this.props.peluqueraCallback.close },
                React.createElement(
                    Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        Modal.Title,
                        null,
                        'Agregar Tipo de Servicio'
                    )
                ),
                React.createElement(
                    Form,
                    { horizontal: true, onSubmit: this.props.peluqueraCallback.onsavepeluquera.bind(this) },
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalname' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Nombre'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { type: 'text', name: 'name', placeholder: 'Nombre' })
                            )
                        )
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            Button,
                            { type: 'submit', pullRight: true },
                            'Save'
                        )
                    )
                )
            );
        }
    }]);

    return PeluqueraModal;
}(React.Component);

var Registration = function (_React$Component43) {
    _inherits(Registration, _React$Component43);

    function Registration() {
        _classCallCheck(this, Registration);

        return _possibleConstructorReturn(this, (Registration.__proto__ || Object.getPrototypeOf(Registration)).apply(this, arguments));
    }

    _createClass(Registration, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row vertical-offset-100' },
                    React.createElement(
                        'div',
                        { className: 'col-md-4 col-md-offset-4' },
                        React.createElement(
                            'div',
                            { className: 'panel panel-default' },
                            React.createElement(
                                'div',
                                { className: 'panel-heading' },
                                React.createElement(
                                    'h3',
                                    { className: 'panel-title' },
                                    'Please sign up'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'panel-body' },
                                React.createElement(
                                    'form',
                                    { onSubmit: this.props.setregistration.bind(this) },
                                    React.createElement(
                                        'fieldset',
                                        null,
                                        React.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            React.createElement('input', { className: 'form-control', placeholder: 'E-mail', name: 'email', type: 'text' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            React.createElement('input', { className: 'form-control', placeholder: 'Password', name: 'password', type: 'password' })
                                        ),
                                        React.createElement(
                                            'button',
                                            { className: 'btn btn-lg btn-success btn-block' },
                                            'Save'
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Registration;
}(React.Component);

var Account = function (_React$Component44) {
    _inherits(Account, _React$Component44);

    function Account() {
        _classCallCheck(this, Account);

        var _this62 = _possibleConstructorReturn(this, (Account.__proto__ || Object.getPrototypeOf(Account)).call(this));

        _this62.state = {

            password: ""
        };
        return _this62;
    }

    _createClass(Account, [{
        key: 'onSubmit',
        value: function onSubmit(event) {

            event.preventDefault();

            var newPassword = {
                "token": token(),
                "newpassword": this.state.password
            };
            console.log(newPassword);

            fetch(API_URL + '/resetpassword', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newPassword)
            });

            //window.location.reload();
        }
    }, {
        key: 'onhandleuserinput',
        value: function onhandleuserinput(event) {
            this.setState({
                password: event.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                Panel,
                { header: 'Reset Password' },
                React.createElement(
                    'form',
                    { onSubmit: this.onSubmit.bind(this) },
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'div',
                            { className: 'col-md-2 col-sm-2' },
                            React.createElement(
                                'label',
                                null,
                                'Password:'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-10 col-sm-10' },
                            React.createElement('input', { onChange: this.onhandleuserinput.bind(this), type: 'password', className: 'form-control', id: 'first_name', name: 'first_name' }),
                            React.createElement('br', null),
                            React.createElement(
                                'button',
                                { className: 'btn btn-lg btn-success btn-block' },
                                'Reset'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Account;
}(React.Component);

var FourPartials = function (_React$Component45) {
    _inherits(FourPartials, _React$Component45);

    function FourPartials() {
        _classCallCheck(this, FourPartials);

        var _this63 = _possibleConstructorReturn(this, (FourPartials.__proto__ || Object.getPrototypeOf(FourPartials)).call(this));

        _this63.state = {

            masterAPI: []
        };
        return _this63;
    }

    _createClass(FourPartials, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this64 = this;

            fetch(API_URL + '/weeklyreportrecapfour', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this64.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(FourPartialsTable, {
                masterAPI: this.state.masterAPI
            });
        }
    }]);

    return FourPartials;
}(React.Component);

var FourPartialsTable = function (_React$Component46) {
    _inherits(FourPartialsTable, _React$Component46);

    function FourPartialsTable() {
        _classCallCheck(this, FourPartialsTable);

        return _possibleConstructorReturn(this, (FourPartialsTable.__proto__ || Object.getPrototypeOf(FourPartialsTable)).apply(this, arguments));
    }

    _createClass(FourPartialsTable, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                Table,
                { striped: true, bordered: true, condensed: true, hover: true },
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            '#'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Nombre'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Total'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Porcentaje'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Total + Porcentaje'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    this.props.masterAPI.map(function (master, index) {
                        return React.createElement(FourPartialsTableBody, {
                            master: master._id,
                            total: master.total
                        });
                    })
                )
            );
        }
    }]);

    return FourPartialsTable;
}(React.Component);

var FourPartialsTableBody = function (_React$Component47) {
    _inherits(FourPartialsTableBody, _React$Component47);

    function FourPartialsTableBody() {
        _classCallCheck(this, FourPartialsTableBody);

        var _this66 = _possibleConstructorReturn(this, (FourPartialsTableBody.__proto__ || Object.getPrototypeOf(FourPartialsTableBody)).call(this));

        _this66.state = {
            percentage: 1
        };
        return _this66;
    }

    _createClass(FourPartialsTableBody, [{
        key: 'onChanged',
        value: function onChanged(data) {
            this.setState({
                percentage: data.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var percentageTotal = this.props.total * this.state.percentage / 100;

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    '\xA0'
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.master
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.total.toFixed(2)
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement('input', { type: 'number', name: 'percentage', placeholder: '%', onChange: this.onChanged.bind(this) })
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        'h6',
                        null,
                        percentageTotal.toFixed(2)
                    )
                )
            );
        }
    }]);

    return FourPartialsTableBody;
}(React.Component);

ReactDOM.render(React.createElement(
    Router,
    { history: browserHistory },
    React.createElement(
        Route,
        { path: '/', component: App },
        React.createElement(Route, { path: 'fourpartials', component: FourPartials }),
        React.createElement(Route, { path: 'account', component: Account }),
        React.createElement(Route, { path: 'agregar_tiposervicio', component: AgregarPeluquera }),
        React.createElement(Route, { path: 'tripartials', component: TriPartials }),
        React.createElement(Route, { path: 'bipartials', component: BiPartials }),
        React.createElement(Route, { path: 'partials', component: Partials }),
        React.createElement(Route, { path: 'about', component: About }),
        React.createElement(Route, { path: 'repos/:repo_name', component: Repos }),
        React.createElement(Route, { path: 'updatedetail/:detailid', component: DetailModalUpdate }),
        React.createElement(Route, { path: 'actions/:actionid', component: Actions }),
        React.createElement(Route, { path: 'detail', component: Detail }),
        React.createElement(Route, { path: 'master', component: Master })
    )
), document.getElementById('contents'));