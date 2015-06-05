var _Sistema = function (conf) {
    var options = $.extend(true, {
        $menu: $(),
        $btnMenu:$()
    }, conf);
    var me = this;
    me.alternarMenu = function () {
        options.$menu[options.$menu.is(':visible') ? 'hide' : 'show']();
    };
    me.esconderMenu = function () {
        options.$menu.hide();
    };
    me.mostrarMenu = function () {
        options.$menu.show();
    };
    me.iniciar = function () {
        options.$btnMenu.on('click', function () {
            me.alternarMenu();
        });
    };
    me.iniciar();
};

var _Transporte = function (_dados) {
    var tipo = 'sucesso';
    var res = null;
    this.dados = {};
    this.extra = {};
    this.mensagem = null;

    this.validar = function () {
        try {
            res = JSON.parse(_dados);
            this.dados = res.data;
            this.extra = (res.extra ? res.extra : {});
            tipo = res.tipo ? res.tipo : 'alerta';
        } catch (e) {
            Mensagem.erro('Erro na comunicação com o servidor');
            tipo = 'erro';
        }
    };
    this.pegarTipo = function () {
        return tipo;
    };
    this.temErro = function () {
        return tipo === 'error';
    };
    this.temSucesso = function () {
        return tipo === 'success';
    };
    this.temAlerta = function () {
        return tipo === 'warning';
    };
    this.temInfo = function () {
        return tipo === 'info';
    };
    this.validar();
};
var _Mensagem = function () {
    var tipoInfo = 'info';
    var tipoErro = 'error';
    var tipoAlerta = 'warning';
    var tipoSucesso = 'success';
    var mostrar = function (type, msg, timeout) {
        alert(msg);
    };
    this.mostrarTransporte = function (transporte, timeout) {
        if (transporte.mensagem) {
            mostrar(transporte.pegarTipo(), transporte.mensagem, timeout);
        }
    };
    this.deInfo = function (msg, timeout) {
        mostrar(tipoInfo, msg, timeout);
    };
    this.deErro = function (msg, timeout) {
        mostrar(tipoErro, msg, timeout);
    };
    this.deAlerta = function (msg, timeout) {
        mostrar(tipoAlerta, msg, timeout);
    };
    this.deSucesso = function (msg, timeout) {
        mostrar(tipoSucesso, msg, timeout);
    };
};
var _Requisitor = function () {
    var Mensagem = new _Mensagem();
    this.syncrono = function (url, $_GET, $_POST, fnCallback, fnError) {
        var data = {};
        data = $.ajax({
        });
        var Transport = new _Transporte(data);
        return Transport;
    };
    this.asyncrono = function (url, $_GET, $_POST, fnCallback, fnError) {
        $.ajax({
        }).done(function (data) {
            var Transporte = new _Transporte(data);
            if (Transporte.temErro()) {
                Mensagem.deErro();
            } else {

            }
        }).error(function (data) {

        });
    };
};

var _ConfControlador = function (conf) {
    this.escopoTela = conf.escopoTela;
    this.jsEval = conf.jsEval;
    this.varPilhaJs = conf.varPilhaJs;
    this.varPilhaCss = conf.varPilhaCss;
};

var _Controlador = function (_configurador, _disparador) {
    var me = this;
    var _url;
    me.atual = function () {
        return _url;
    };
    var incluirJs = function (js) {
        me.escopoTela().append($('<script>', {'class': 'js-controlador', 'src': js}));
    };
    me.passarDisparador = function (disparador) {
        if (!(disparador instanceof _Disparador)) {
            throw "Disparador inválido.";
        }
        _disparador = disparador;
    };
    me.passarConfigurador = function (configurador) {
        if (typeof configurador !== '_ConfControlador') {
            throw "Configurador inválido.";
        }
        _configurador = configurador;
    };
    me.escopoTela = function () {
        return $(_configurador.escopoTela)
    };
    me.iniciar = function () {

    };
    me.ir = function (url, $_GET, $_POST, fn) {
        if (!_configurador) {
            throw 'O controlador não possui um configurador para execução';
        }
        _url = url;
        var remendo = url.indexOf('?') === -1 ? '?' : '';
        
        $.ajax({
            'url': url + ($_POST ? $.param($_GET) : ''),
            'dataType': 'html',
            'data': $_POST ? $_POST : $_GET,
            'type': $_POST ? 'post' : 'get',
        }).done(function (html) {
            try {
                var Mensagem = new _Mensagem();
                Mensagem.showTransporte(new _Transporte(JSON.parse(html)));
            } catch (err) {
                $(_configurador.escopoTela).html(html);
                $(_configurador.jsEval).each(function () {
                    try {
                        eval($(this).text());
                    } catch (e) {
                        alert(e);
                    }
                });
                if (Window[_configurador.varPilhaJs]) {
                    for (var i in Window[_configurador.varPilhaJs]) {
                        incluirJs(Window[_configurador.varPilhaJs][i]);
                    }
                }
                if (Window[_configurador.varPilhaCss]) {
                    for (var i in Window[_configurador.varPilhaCss]) {
                        incluirJs(Window[_configurador.varPilhaCss][i]);
                    }
                }
                _disparador.dispararAntes();
                me.iniciar($_GET, $_POST);
                _disparador.dispararDepois();
            }
        }).error(function () {
            var Mensagem = new _Mensagem();
            Mensagem.deErro('Erro de comunicação com o servidor');
        });

    };
};
var _Disparador = function () {
    var pilhaAntes = [];
    var pilhaDepois = [];
    this.empilharAntesAcao = function (fn) {
        pilhaAntes.push(fn);
    };
    this.empilharDepoisAcao = function (fn) {
        pilhaDepois.push(fn);
    };
    this.dispararAntes = function () {
        for (i in pilhaAntes) {
            pilhaAntes[i]();
        }
    };
    this.dispararDepois = function () {
        for (i in pilhaDepois) {
            pilhaDepois[i]();
        }
    };
};
