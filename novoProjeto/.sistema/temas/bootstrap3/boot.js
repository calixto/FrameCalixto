var Mensagem = new _Mensagem();
var Ajax = new _Requisitor();
var Controle = new _Controlador(new _ConfControlador({
    escopoTela: '.js-tela-ajax',
    jsEval: '.js-controlador-init',
    varPilhaJs: 'pilhaArquivosJs',
    varPilhaCss: 'pilhaArquivosCss'
}),
        new _Disparador({
            'antesAcao': [function () {
                    Controle.escopoTela().find('form[data-ajax]').formAjax();
                    Controle.escopoTela().find('textarea[data-limite]').contadorDeTexto();
                    Controle.escopoTela().find('fieldset[data-multiple]').multiple();
                    Controle.escopoTela().find('.input-group-before').inputGroup('before');
                    Controle.escopoTela().find('.input-group-after').inputGroup('after');
                    Controle.escopoTela().find('.input-group-before-after').inputGroup('before-after');
                    Controle.escopoTela().find('.email').tipoEmail();
                    Controle.escopoTela().find('.cnpj').tipoCnpj();
                    Controle.escopoTela().find('.cpf').tipoCpf();
                    Controle.escopoTela().find('.cpfcnpj').tipoDocumento();
                    Controle.escopoTela().find('.telefone').tipoTelefone();
                    Controle.escopoTela().find('.telefone-ddd').tipoTelefoneDDD();
                    Controle.escopoTela().find('.celular').tipoCelular();
                    Controle.escopoTela().find('.celular-ddd').tipoCelularDDD();
                    Controle.escopoTela().find('.moeda, .monetario').tipoMoeda();
                    Controle.escopoTela().find('.numerico').tipoNumerico();
                    Controle.escopoTela().find('.float').tipoFloat();
                    Controle.escopoTela().find('[data-panel-toggle]').panelToggleButton();
                    Controle.escopoTela().find('.fileupload').upload();
                    Controle.escopoTela().find('.mes').tipoMes();
                    Controle.escopoTela().find('.cep').tipoCep();
                    Controle.escopoTela().find('.data').tipoData();
                    Controle.escopoTela().find('.hora').tipoHora();
                    Controle.escopoTela().find('.hora-segundos').tipoHoraSegundos();
                    Controle.escopoTela().find('.data-hora').tipoDataHora();
                    Controle.escopoTela().find('.data-hora-segundos').tipoDataHoraSegundos();
                    Controle.escopoTela().find('.upper').tipoUpper();
                }],
            'depoisAcao': [function () {
                }]
        }));
var Sistema = new _Sistema({
    $menu: $('.js-menu-sistema'),
    $btnMenu: $('.btn-menu-sistema')
});
Sistema.tela = function (url, $_GET, $_POST, fn) {
    $_GET = $.extend(true, {'c':url, 'tipoResposta':'ajax'}, $_GET)
    Controle.ir('', $_GET, $_POST, fn);
};
