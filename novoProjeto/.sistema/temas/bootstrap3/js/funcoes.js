String.prototype.trim = function () {
    return this.ltrim().rtrim();
};
String.prototype.ltrim = function () {
    return this.replace(eval("/^\ */"), '') + '';
};
String.prototype.rtrim = function () {
    return this.replace(eval("/\ *$/"), '') + '';
};
String.prototype.strReplace = function (strAntiga, strNova) {
    return this.replace(eval("/" + strAntiga + "/g"), new String(strNova)) + '';
};
String.prototype.ucFirst = function () {
    return this.charAt(0).toUpperCase() + this.substr(1);
};
/**
 * função para fazer CamelCase();
 */
String.prototype.CamelCase = function (tipo) {
    palavra = this.strReplace(' ', '_');
    arPalavra = palavra.split('_');
    if (arPalavra.length > 1) {
        palavra = this.strReplace(' ', '_').toLowerCase().retiraAcentos();
        arPalavra = palavra.split('_');
        primeira = arPalavra.shift();
        palavraFim = '';
        for (i in arPalavra) {
            palavraFim += arPalavra[i].ucFirst();
        }

    } else {
        primeira = this;
        palavraFim = '';
    }
    if (tipo !== 'lower')
        primeira = primeira.ucFirst();
    return primeira + palavraFim;
};
/**
 * função para fazer upperCamelCase();
 */
String.prototype.upperCamelCase = function () {
    return this.CamelCase('upper');
};
/**
 * função para fazer lowerCamelCase();
 */
String.prototype.lowerCamelCase = function () {
    return this.CamelCase('lower');
};
/**
 * função para fazer lowerCamelCase();
 */
String.prototype.lowerCamelCase = function () {
    palavra = this.upperCamelCase();
    return palavra.charAt(0).toLowerCase() + palavra.substr(1);
};
/**
 * funcao para retirar os acentos da string
 */
String.prototype.retiraAcentos = function () {
    str = this;
    stA = new String('çàèìòùâêîôûäëïöüáéíóúãĩõũÇÀÈÌÒÙÂÊÎÔÛÄËÏÖÜÁÉÍÓÚÃĨÕŨ');
    stB = new String('caeiouaeiouaeiouaeiouaiouCAEIOUAEIOUAEIOUAEIOUAIOU');
    for (i in stA) {
        str = str.strReplace(stA.charAt(i), stB.charAt(i));
    }
    return str;
};
String.prototype.retiraEspeciais = function () {
    return this.replace(/[-[\]{}()*+?%&@!?¨:;'"<>/=\\^$|#\b]/g, "");
};
String.prototype.retiraEspeciaisCustom = function () {
    return this.replace(/[[\]{}()+?%@!?¨:;'"<>=\\^$|#\b]/g, "");
};
String.prototype.makeLowerUnderLine = function () {
    return this.toLowerCase().retiraAcentos().strReplace('[^a-zA-Z0-9_]', '_');
};
String.prototype.makeUpperUnderLine = function () {
    return this.toUpperCase().retiraAcentos().strReplace('[^a-zA-Z0-9_]', '_');
};
/**
 * Funcao simuladora da number_format
 */
function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

/**
 * Função simuladora da sprintf da linguagem C
 */
function sprintf() {
    try {
        if (!arguments || arguments.length < 1 || !RegExp) {
            return;
        }
        var str = arguments[0];
        var re = /([^%]*)%('.|0|\x20)?(-)?(\d+)?(\.\d+)?(%|b|c|d|u|f|o|s|x|X)(.*)/;
        var a = b = [], numSubstitutions = 0, numMatches = 0;
        while (a = re.exec(str)) {
            var leftpart = a[1], pPad = a[2], pJustify = a[3], pMinLength = a[4];
            var pPrecision = a[5], pType = a[6], rightPart = a[7];
            numMatches++;
            if (pType == '%') {
                subst = '%';
            } else {
                numSubstitutions++;
                if (numSubstitutions >= arguments.length) {
                    alert('Error! Not enough function arguments (' +
                        (arguments.length - 1) + ', excluding the string)\n' +
                        'for the number of substitution parameters in string (' +
                        numSubstitutions + ' so far).');
                }
                var param = arguments[numSubstitutions];
                var pad = '';
                if (pPad && pPad.substr(0, 1) == "'") {
                    pad = leftpart.substr(1, 1);
                } else if (pPad) {
                    pad = pPad;
                }
                var justifyRight = true;
                if (pJustify && pJustify === "-")
                    justifyRight = false;
                var minLength = -1;
                if (pMinLength)
                    minLength = parseInt(pMinLength);
                var precision = -1;
                if (pPrecision && pType == 'f') {
                    precision = parseInt(pPrecision.substring(1));
                }
                var subst = param;
                switch (pType) {
                    case 'b':
                        subst = parseInt(param).toString(2);
                        break;
                    case 'c':
                        subst = String.fromCharCode(parseInt(param));
                        break;
                    case 'd':
                        subst = parseInt(param) ? parseInt(param) : 0;
                        break;
                    case 'u':
                        subst = Math.abs(param);
                        break;
                    case 'f':
                        subst = (precision > -1) ?
                            Math.round(parseFloat(param) * Math.pow(10, precision)) /
                            Math.pow(10, precision) : parseFloat(param);
                        break;
                    case 'o':
                        subst = parseInt(param).toString(8);
                        break;
                    case 's':
                        subst = param;
                        break;
                    case 'x':
                        subst = ('' + parseInt(param).toString(16)).toLowerCase();
                        break;
                    case 'X':
                        subst = ('' + parseInt(param).toString(16)).toUpperCase();
                        break;
                }
                var padLeft = minLength - subst.toString().length;
                if (padLeft > 0) {
                    var arrTmp = new Array(padLeft + 1);
                    var padding = arrTmp.join(pad ? pad : " ");
                } else {
                    var padding = "";
                }
            }
            str = leftpart + padding + subst + rightPart;
        }
        return str;
    }
    catch (e) {
        alert(e);
    }
}

/**
 * Função que retorna as chaves de um objeto
 * @param Object input
 * @param Boolean boolean
 * @returns Array
 */
function arrayKeys(input, notNull) {
    var output = new Array();
    var counter = 0;
    if (notNull) {
        for (i in input) {
            if (parseInt(i)) {
                output[counter++] = i;
            }
        }
    } else {
        for (i in input) {
            output[counter++] = i;
        }
    }

    return output;
}
/**
 * Função equivalente ao number_format do PHP
 * @param {Number} number
 * @param {String} decimals
 * @param {String} dec_point
 * @param {String} thousands_sep
 * @returns {String}
 */
function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

/**
 * Converte uma string monetária para float
 * @param {String} price Valor monetário
 * @returns {Float}
 */
function price_to_float(price) {
    return parseFloat(price.replace('.', '').replace(',', '').replace('R$ ', '')) / 100;
}
/**
 * Converte um número para valor monetário
 * @param {Float} valor
 * @returns {String}
 */
function moeda(valor) {
    return 'R$ ' + number_format(valor, 2, ',', '.');
}
/**
 * Objeto de tratamento para númericos
 * @type Object
 */
var Numerico = {
    /**
     * Formata um numérico para string numérica
     * @param Float valor
     * @returns String
     */
    formatar: function (valor) {
        return number_format(valor, 2, ',', '.');
    },
    /**
     * Converte uma string numérica para um Float
     * @param String valor
     * @returns Float
     */
    desformatar: function (valor) {
        return parseFloat(valor.replace('R$ ','').replace(/\./g,'').replace(',','.').replace('(','-').replace(')',''));
    }
};
/**
 * Objeto de tratamento de moeda
 * @type Object
 */
var Moeda = {
    /**
     * Formata um numérico para string numérica
     * @param Float valor
     * @returns String
     */
    formatar: function (valor) {
        if (valor >= 0) {
            return 'R$ ' + Numerico.formatar(valor);
        } else {
            return '(R$ ' + Numerico.formatar(valor) + ')';
        }
    },
    /**
     * Converte uma string numérica para um Float
     * @param String valor
     * @returns Float
     */
    desformatar: function (valor) {
        return Numerico.desformatar(valor);
    },
    /**
     * Formata um numérico para string numérica
     * @param Float valor
     * @returns String
     */
    mascarar: function (valor) {
        return Moeda.formatar(valor);
    },
    /**
     * Converte uma string numérica para um Float
     * @param String valor
     * @returns Float
     */
    desmascarar: function (valor) {
        return Numerico.desformatar(valor);
    }
};
/**
 * Objeto de tratamento de data
 * @type Object
 */
Data = {
    formatar: function (valor) {
        return valor.split('-').reverse().join('/');
    }
};
/**
 * Objeto de tratamento de documento CPF
 * @type Object
 */
CPF = {
    formatar: function (valor) {
        var reg = /(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/;
        valor.replace(reg, "$1.$2.$3-$4");
        return valor;
    }
};
/**
 * Objeto de tratamento de documento CNPJ
 * @type Object
 */
CNPJ = {
    formatar: function (valor) {
        var reg = /(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/;
        return valor.replace(reg, "$1.$2.$3/$4-$5");
    }
};
/**
 * Objeto de tratamento de documento CPF/CNPJ
 * @type Object
 */
Documento = {
    formatar: function (valor) {
        if (valor.length == 11) {
            return CPF.formatar(valor);
        } else {
            return CNPJ.formatar(valor);
        }
    }
};
refresh = function () {
    if (Controle.action) {
        Sistema.tela(Controle.action);
    }
};
/**
 * Retorna uma string da data no formato solicitado
 * @returns {String}
 */
Date.prototype.getData = function (formato) {
    formato = formato || 'd/m/Y';
    var mes = this.getMonth() + 1;
    switch (formato) {
        case 'Y/m/d':
            return this.getFullYear() + '/' + (mes < 10 ? '0' + mes : mes) + '/' + (this.getDate() < 10 ? '0' + this.getDate() : this.getDate());
        case 'd/m/Y':
            return (this.getDate() < 10 ? '0' + this.getDate() : this.getDate()) + '/' + (mes < 10 ? '0' + mes : mes) + '/' + this.getFullYear();
        case 'm/d/Y':
            return (mes < 10 ? '0' + mes : mes) + '/' + (this.getDate() < 10 ? '0' + this.getDate() : this.getDate()) + '/' + this.getFullYear();
        default:
            return '';
    }
};
Date.prototype.getDataHora = function (formato) {
    return this.getData() + ' ' + ("0" + this.getHours()).slice(-2) + ':' + this.getMinutes();
};

Date.prototype.getDataHoraSegundo = function (formato) {
    return this.getDataHora() + ':' + this.getSeconds();
};

String.prototype.toDate = function (formato) {
    var formato = formato || 'd/m/Y';
    var d = m = Y = h = i = s = 0;
    switch (formato) {
        case 'Y/m/d':
            var match = this.match(/^(\d{4})\/(\d{2})\/(\d{2})(|\s(0[0-9]|1[0-9]||2[0-3])\:([0-5][0-9])(|\:([0-5][0-9])))$/);
            if (!match) {
                return new Date(0, 0, 0, 0, 0, 0);
            }
            Y = match[1] ? match[1] : 0;
            m = match[2] ? match[2] : 0;
            d = match[3] ? match[3] : 0;
            break;
        case 'd/m/Y':
            var match = this.match(/^(\d{2})\/(\d{2})\/(\d{4})(|\s(0[0-9]|1[0-9]||2[0-3])\:([0-5][0-9])(|\:([0-5][0-9])))$/);
            if (!match) {
                return new Date(0, 0, 0, 0, 0, 0);
            }
            Y = match[3] ? match[3] : 0;
            m = match[2] ? match[2] : 0;
            d = match[1] ? match[1] : 0;
            break;
        case 'm/d/Y':
            var match = this.match(/^(\d{2})\/(\d{2})\/(\d{4})(|\s(0[0-9]|1[0-9]||2[0-3])\:([0-5][0-9])(|\:([0-5][0-9])))$/);
            if (!match) {
                return new Date(0, 0, 0, 0, 0, 0);
            }
            Y = match[3] ? match[3] : 0;
            m = match[1] ? match[1] : 0;
            d = match[2] ? match[2] : 0;
            break;
    }
    h = match[5] ? match[5] : 0;
    i = match[6] ? match[6] : 0;
    s = match[8] ? match[8] : 0;
    
    return new Date(parseInt(new Number(Y)), parseInt(new Number(m)) - 1, parseInt(new Number(d)), parseInt(new Number(h)), parseInt(new Number(i)), parseInt(new Number(s)));
}


function valida_cnpj(cnpj) {
    cnpj = cnpj.replace('.', '').replace('/', '').replace('-', '').replace('.', '');
    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;
    if (cnpj.length !== 14) {
        return false;
    }

    for (i = 0; i < cnpj.length - 1; i++) {
        if (cnpj.charAt(i) != cnpj.charAt(i + 1) || cnpj.charAt(i + 1) == 0 || cnpj.charAt(i + 1) == 1 || cnpj.charAt(i + 1) == 9) {
            digitos_iguais = 0;
            break;
        }
    }
    if (!digitos_iguais) {
        tamanho = cnpj.length - 2;
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (cnpj != '99999999999999' && cnpj != '11111111111111' && resultado != digitos.charAt(0)) {
            return false;
        }
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (cnpj != '99999999999999' && cnpj != '11111111111111' && resultado != digitos.charAt(1)) {
            return false;
        }
        return true;
    } else {
        return false;
    }
}

function valida_cpf(cpf) {
    cpf = (cpf.replace('.', '').replace('.', '').replace('-', ''));
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++) {

        if (cpf.charAt(i) != cpf.charAt(i + 1) || cpf.charAt(i + 1) == 1 || cpf.charAt(i) == 0 || cpf.charAt(i + 1) == 9)
        {
            digitos_iguais = 0;
            break;
        }
    }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    } else {
        return false;
    }
}

campoPreenchido = function () {
    return $(this).val() !== '';
};
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}