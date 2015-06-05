/**
 * Plugin inverso ao param do jquery
 * @param {string} h
 * @returns {Object}
 */
(function(h) {
    h.deparam = function(i, j) {
        var d = {}, k = {"true": !0, "false": !1, "null": null};
        h.each(i.replace(/\+/g, " ").split("&"), function(i, l) {
            var m;
            var a = l.split("="), c = decodeURIComponent(a[0]), g = d, f = 0, b = c.split("]["), e = b.length - 1;
            /\[/.test(b[0]) && /\]$/.test(b[e]) ? (b[e] = b[e].replace(/\]$/, ""), b = b.shift().split("[").concat(b), e = b.length - 1) : e = 0;
            if (2 === a.length)
                if (a = decodeURIComponent(a[1]), j && (a = a && !isNaN(a) ? +a : "undefined" === a ? void 0 : void 0 !== k[a] ? k[a] : a), e)
                    for (; f <= e; f++)
                        c = "" === b[f] ? g.length : b[f], m = g[c] = f < e ? g[c] || (b[f + 1] && isNaN(b[f + 1]) ? {} : []) : a, g = m;
                else
                    h.isArray(d[c]) ? d[c].push(a) : d[c] = void 0 !== d[c] ? [d[c], a] : a;
            else
                c && (d[c] = j ? void 0 : "")
        });
        return d
    }
})(jQuery);

$.fn.resumir = function(tamanho, posicao) {
    tamanho = tamanho || 10;
    posicao = posicao || 'top';
    $.each($(this), function() {
        var cont = $(this).html();
        $(this).attr('data-content', cont);
        $(this).attr('data-container', 'body');
        $(this).attr('data-placement', posicao);
        $(this).attr('data-toggle', 'popover');
        if (cont.length > (tamanho)) {
            $(this).html($(this).html().slice(0, tamanho - 3) + '...');
        }
        $(this).mouseover(function() {
            if (cont.length > tamanho) {
                $(this).popover('show');
            }
        });
        $(this).mouseout(function() {
            $(this).popover('hide');
        })
    });
}
/**
 * Cria um icone dentro do elemento
 * @param {String} tipo
 * @returns {jQuery} o ícone criado
 */
$.fn.icone = function(tipo) {
    var $icone = $('<span class="' + tipo + '"></span>');
    $(this).append($icone);
    return $icone;
};

/**
 * Cria um input group
 * @param {type} tipo do input group
 * @returns {jQuery}
 */
$.fn.inputGroup = function(tipo) {
    if ($(this).parents('[data-input-group]')[0]) {
        return $(this).parents('[data-input-group]');
    }
    $(this).addClass('form-control');
//    if (!$(this).parents('.js-tpl-input-group-before, .js-tpl-input-group-after, .js-tpl-input-group-before-after')[0]) {
    var $tpl = $();
    switch (tipo) {
        case 'before':
            $tpl = $('.templates .js-tpl-input-group-before').clone();
            $(this).before($tpl);
            $tpl.find('.input-group-addon:first').after($(this));
            break;
        case 'after':
            $tpl = $('.templates .js-tpl-input-group-after').clone();
            $(this).before($tpl);
            $tpl.prepend($(this));
            break;
        case 'after-before':
        case 'before-after':
            $tpl = $('.templates .js-tpl-input-group-before-after').clone();
            $(this).before($tpl);
            $tpl.find('.input-group-addon:first').after($(this));
            break;
//        }
    }
    return $tpl;
};

/**
 * Preenche um combobox com os options
 * @param {
 *      colecao coleção de dados para preencher o combo
 *      campoVal campo com o valor do option
 *      campoDesc campo com o texto do option
 *      valorPadrao Texto padrão do combo que virá vazio
 *      limpar verificar se deverá limpar o componente antes de preencher
 *      callback função que é executada após preencher o option e antes de inseri-lo no componente
 * } options
 * @returns jQuery
 */
$.fn.preencherCombo = function(options) {
    conf = {
        callback: function() {
        },
        colecao: {},
        campoVal: 'val',
        campoDesc: 'desc',
        valorPadrao: false,
        limpar: true
    };
    conf = $.extend(conf, options);

    var option = function(item) {
        var $opt = $('<option>');
        $opt.attr('value', item[conf.campoVal]);
        $opt.html(item[conf.campoDesc]);
        conf.callback($opt, item);
        return $opt;
    };
    var $this = $(this);
    if (conf.limpar) {
        $this.html('');
    }
    if (conf.valorPadrao) {
        var item = {};
        item[conf.campoVal] = '';
        item[conf.campoDesc] = conf.valorPadrao;
        $this.append(option(item));
    }
    if (conf.colecao) {
        $.each(conf.colecao, function() {
            $this.append(option(this));
        });
    }
    return $(this);
};

/**
 * Monta os dados do combo pelos atributos da tag
 * @FIXME codigo tempoorario. Rever e mesclar com funcao apresentarColecaoDoCombobox
 * @returns {undefined}
 */
$.fn.apresentarColecaoDoCombobox = function(options) {
    $.each($(this), function() {
        eval('var colecao = ' + $(this).attr('data-colecao') + ';');
        if (colecao) {
            var val = $(this).attr('data-campo-val');
            var desc = $(this).attr('data-campo-desc');
            var padrao = $(this).attr('data-valor-padrao');
            var defaults = {
                colecao: eval(colecao),
                campoVal: val ? val : 'val',
                campoDesc: desc ? desc : 'desc',
                valorPadrao: padrao ? padrao : false
            };
            $(this).preencherCombo($.extend(defaults, options));
        }
    });
};

/**
 * Cria componente de E-mail
 */
$.fn.tipoEmail = function() {
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoEmail');
        }

        $(item)
                .inputGroup('before')
                .find('.input-group-addon')
                .icone('glyphicons envelope icon-purple');
        $(item).keyup(function() {
            if (!$(this).val().match(/(.+)\@(.+)\.(.+)/)) {
                $(this).addClass('text-danger').removeClass('text-success');
            } else {
                $(this).addClass('text-success').removeClass('text-danger');
            }
        });
        $(item).change(function() {
            if ($(this).val() && !$(this).val().match(/(.+)\@(.+)\.(.+)/)) {
                $(this).val('');
                Message.showInfo('Formato de E-mail inválido.');
            }
            $(this).removeClass('text-danger').removeClass('text-success');
        });
        $(item).blur(function() {
            $(this).removeClass('text-danger').removeClass('text-success');
        });
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });
    });
};
/**
 * Cria componente de CNPJ
 */
$.fn.tipoCnpj = function() {
    $.each($(this), function(i, item) {
        // Se não for um input, no caso de um label, span, strong, div ...
        if (item.tagName != 'INPUT') {
            $(item).text(CNPJ.formatar($(item).text()));
            return;
        }
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoCnpj');
        }
        $(item)
                .inputGroup('before')
                .find('.input-group-addon')
                .icone('glyphicons building icon-purple');
        configInputCnpj(item);
    });
};
/**
 * Cria componente de CPF
 */
$.fn.tipoCpf = function() {
    $.each($(this), function(i, item) {
        // Se não for um input, no caso de um label, span, strong, div ...
        if (item.tagName != 'INPUT') {
            $(item).text(CNPJ.formatar($(item).text()));
            return;
        }
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoCpf');
        }
        $(item)
                .inputGroup('before')
                .find('.input-group-addon')
                .icone('glyphicons user icon-purple');
        configInputCpf(item);
    });
};

verificarCpfCnpj = function(item) {
    var valorClean = $(item).val().match(/[0-9]/g);
    if (valorClean) {
        switch (true) {
            case valorClean.length === 11 && $(item).data('mask-tipo-documento') == 'cnpj':
                configInputCpf(item);
                break;
            case valorClean.length > 11 && $(item).data('mask-tipo-documento') == 'cpf':
                configInputCnpj(item);
                break;
        }
    }
};

configInputCpf = function(item) {
    $(item).off('keyup').off('blur').off('drop').data('mask-tipo-documento', 'cpf').unmask().mask('999.999.999-99');
    $(item).on("drop", function(event) {
        event.preventDefault();
        event.stopPropagation();
    });
    $(item).on('blur', function() {
        if ($(this).val() && !valida_cpf($(this).val())) {
            Mensagem.deErro('Número de CPF inválido.');
            $(this).val('');
        }
    });
    $(item).on('keyup', function(e) {
        verificarCpfCnpj(this);
        if (e.keyCode === 13) {
            $(this).trigger('blur');
        }
    });
};
configInputCnpj = function(item) {
    $(item).off('keyup').off('blur').off('drop').data('mask-tipo-documento', 'cnpj').unmask().mask('99.999.999/9999-99');
    $(item).on("drop", function(event) {
        event.preventDefault();
        event.stopPropagation();
    });
    $(item).on('blur', function() {
        if ($(this).val() && !valida_cnpj($(this).val())) {
            Mensagem.deErro('Número de CNPJ inválido.');
            $(this).val('');
        }
    });
    $(item).on('keyup', function(e) {
        verificarCpfCnpj(this);
        if (e.keyCode === 13) {
            $(this).trigger('blur');
        }
    });
};
/**
 * Cria componente de CPF/CNPJ
 */
$.fn.tipoDocumento = function() {
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoDocumento');
        }
        // Se não for um input, no caso de um label, span, strong, div ...
        if (item.tagName != 'INPUT') {
            $(item).text(Documento.formatar($(item).text()));
            return;
        }
        configInputCpf(item);
    });
};
/**
 * Cria componente UpperCase sem Acento
 */
$.fn.tipoUpper = function() {
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoUpper');
        }

        $(item).keypress(function(e) {
            $(item).val($(item).val().toUpperCase().retiraAcentos().retiraEspeciaisCustom().replace(/[~´`\b]/g, ""));
        });

        $(item).on("blur", function(event) {
            event.preventDefault();
            $(item).val($(item).val().toUpperCase().retiraAcentos().retiraEspeciaisCustom().replace(/[~´`\b]/g, "").rtrim());
            event.stopPropagation();
        });
    });
};
/**
 * Cria componente de Telefone
 */
$.fn.tipoTelefone = function() {
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoTelefone');
        }
        $(item).mask('9999-9999');
        $(item)
                .inputGroup('before')
                .find('.input-group-addon')
                .icone('glyphicons phone_alt icon-purple');
        $(item).on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });
    });
};
/**
 * Cria componente de Telefone com DDD
 */
$.fn.tipoTelefoneDDD = function() {
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoTelefoneDDD');
        }
        $(item).mask('(99) 9999-9999');
        $(item)
                .inputGroup('before')
                .find('.input-group-addon')
                .icone('glyphicons phone_alt icon-purple');
        $(item).on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });
    });
};
/**
 * Cria componente de Celular
 */
$.fn.tipoCelular = function() {
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoCelular');
        }
        $(item).mask('9999-9999?9');
        $(item)
                .inputGroup('before')
                .find('.input-group-addon')
                .icone('glyphicons iphone icon-purple');
        $(item).on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });
    });
};
/**
 * Cria componente de Celular com DDD
 */
$.fn.tipoCelularDDD = function() {
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoCelularDDD');
        }
        $(item).mask('(99) 9999-9999?9');
        $(item)
                .inputGroup('before')
                .find('.input-group-addon')
                .icone('glyphicons iphone icon-purple');
        $(item).on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });
    });
};
/**
 * Cria componente de Data
 * Para definir mínimo e máximo entre 2 componentes Data
 * data-date-min="<#seletor>" - Define um componente de data inicial para atuar junto deste componente
 * data-date-max="<#seletor>" - Define um componente de data final para atuar junto deste componente
 * date-max-day-interval="<dias>" - Define um intervalo máximo de dias para 2 componentes de datas que atuam juntos (necessário aplicar em ambos)
 */
$.fn.tipoData = function() {
    $.each($(this), function(i, item) {
        // Se não for um input, no caso de um label, span, strong, div ...
        if (item.tagName != 'INPUT') {
            $(item).text(Data.formatar($(item).text()));
            return;
        }
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoData');
        }
        $(item).mask('99/99/9999');
        $(item)
                .inputGroup('before')
                .find('.input-group-addon:last')
                .icone('glyphicons calendar icon-purple');
        $(item).on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
        });

        var config = {
            'language': 'pt-BR',
            'pickTime': false,
            'icons': {
                time: '',
                date: ''
            }
        };
        // Inicializa o plugin para o seletor
        $(item).parent().datetimepicker(config);

        if ($(item).data('date-min')) {
            // Change do componente
            $(item).parent().on("dp.change", function(e) {
                var component = $(this).data('DateTimePicker'); // DateTimePicker da data atual
                var $componentInput = $(this).find(':input[type=text]'); // <input> da data atual
                var $minComponentInput = $($componentInput.data('date-min')); // <input> da data inicial
                var minComponent = $minComponentInput.parent().data('DateTimePicker'); // DateTimePicker da data inicial

                var dataAtual = $(this).data('DateTimePicker').getDate() ? $(this).data('DateTimePicker').getDate().toDate().getData() : null; // Valor da data atual
                var dataMinComponent = $minComponentInput.val() ? $minComponentInput.val() : null; // Valor da data inicial

                // Definir data máxima para o componente de apresentação da 'Data Inicial'
                minComponent.setMaxDate(e.date);

                // Verificar se a data inicial é maior que a final quando o componente definir a data padrão dele
                if (!(moment(dataAtual, 'DD/MM/YYYY') >= moment(dataMinComponent, 'DD/MM/YYYY'))) {
                    component.setDate(moment(dataMinComponent, 'DD/MM/YYYY'));
                    return;
                }

                // Verificar máximo de intervalo em dias entre as duas datas
                if ($componentInput.data('date-max-day-interval') && dataMinComponent) {
                    var maxDias = $componentInput.data('date-max-day-interval');
                    var dias = moment(dataAtual, "DD/MM/YYYY").diff(moment(dataMinComponent, "DD/MM/YYYY"), 'days');
                    if (dias > maxDias) {
                        var dataMinimaPermitida = moment(dataMinComponent, 'DD/MM/YYYY').add(maxDias, 'days');
                        component.setDate(dataMinimaPermitida);
                        Mensagem.deErro('Período superior ao limite de ' + maxDias + ' dias.');
                    }
                }
            });
        }
        if ($(item).data('date-max')) {
            // Change do componente
            $(item).parent().on("dp.change", function(e) {
                var component = $(this).data('DateTimePicker'); // DateTimePicker da data atual
                var $componentInput = $(this).find(':input[type=text]'); // <input> da data atual
                var $maxComponentInput = $($componentInput.data('date-max')); // <input> da data final
                var maxComponent = $maxComponentInput.parent().data('DateTimePicker'); // DateTimePicker da data final

                var dataAtual = $(this).data('DateTimePicker').getDate() ? $(this).data('DateTimePicker').getDate().toDate().getData() : null; // Valor da data atual
                var dataMaxComponent = $maxComponentInput.val() ? $maxComponentInput.val() : null; // Valor da data final

                // Definir data mínima para o componente de apresentação da 'Data Final'
                maxComponent.setMinDate(e.date);

                // Verificar se a data final é menor que a data inicial quando o componente definir a data padrão dele
                if (!(moment(dataAtual, 'DD/MM/YYYY') <= moment(dataMaxComponent, 'DD/MM/YYYY'))) {
                    component.setDate(moment(dataMaxComponent, 'DD/MM/YYYY'));
                    return;
                }

                // Verificar máximo de intervalo em dias entre as duas datas
                if ($componentInput.data('date-max-day-interval') && dataMaxComponent) {
                    //var dias = moment(dataMaxComponent, "DD/MM/YYYY HH:mm:ss").diff(moment(dataAtual, "DD/MM/YYYY HH:mm:ss"), 'days');
                    var maxDias = $componentInput.data('date-max-day-interval');
                    var dias = moment(dataMaxComponent, "DD/MM/YYYY").diff(moment(dataAtual, "DD/MM/YYYY"), 'days');
                    if (dias > maxDias) {
                        var dataMaximaPermitida = moment(dataMaxComponent, 'DD/MM/YYYY').subtract(maxDias, 'days');
                        component.setDate(dataMaximaPermitida);
                        Mensagem.deErro('Período superior ao limite de ' + maxDias + ' dias.');
                    }
                }
            });
        }
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });
        // Quando o input sair de foco
        $(item).blur(function() {
            var arData = $(this).val() ? $(this).val().split('/') : [];
            if (arData.length === 3 || !$(this).parent().data('DateTimePicker').getDate()) {
                var date = new Date(arData[2], arData[1] - 1, arData[0]);
                if (date.getData() !== $(this).val() || !$(this).parent().data('DateTimePicker').getDate()) {
                    $(this).parent().data('DateTimePicker').setDate('');

                    // Se tiver Componente DateMin
                    var $minComponent = $($(this).data('date-min'));
                    if ($(this).data('date-min') && $minComponent && $minComponent.val()) {
                        $minComponent.parent().data('DateTimePicker').setMaxDate(moment('01013000', 'DDMMYYYY'));
                        $(this).parent().data('DateTimePicker').setMinDate(moment($minComponent.parent().data('DateTimePicker').getDate().toDate().getData(), 'DD/MM/YYYY'));
                    } else {
                        if ($minComponent.length > 0) {
                            $minComponent.parent().data('DateTimePicker').setMaxDate(moment('01013000', 'DDMMYYYY'));
                        }
                        $(this).parent().data('DateTimePicker').setMinDate(moment('01011200', 'DDMMYYYY'));
                    }

                    // Se tiver Componente DateMax
                    var $maxComponent = $($(this).data('date-max'));
                    if ($(this).data('date-max') && $maxComponent && $maxComponent.val()) {
                        $maxComponent.parent().data('DateTimePicker').setMinDate(moment('01011200', 'DDMMYYYY'));
                        $(this).parent().data('DateTimePicker').setMaxDate(moment($maxComponent.parent().data('DateTimePicker').getDate().toDate().getData(), 'DD/MM/YYYY'));
                    } else {
                        if ($maxComponent.length > 0) {
                            $maxComponent.parent().data('DateTimePicker').setMinDate(moment('01011200', 'DDMMYYYY'));
                        }
                        $(this).parent().data('DateTimePicker').setMaxDate(moment('01013000', 'DDMMYYYY'));
                    }
                    return;
                }
            }

            if ($(this).data('date-min') && $(this).val()) {
                var $minComponent = $($(this).data('date-min'));

                // Se a data mínima for maior que a data máxima
                if (($minComponent.val()) && !(moment($(this).val(), 'DD/MM/YYYY') >= moment($minComponent.val(), 'DD/MM/YYYY'))) {
                    $(this).parent().data('DateTimePicker').setDate('');
                    $minComponent.parent().data('DateTimePicker').setMaxDate(moment('01013000', 'DDMMYYYY'));
                    return;
                }

                // Verificar máximo de intervalo em dias entre as duas datas
                if ($(this).data('date-max-day-interval')) {
                    //$.log('blur max', '=> min', $(this));
                }
            }

            if ($(this).data('date-max') && $(this).val()) {
                var $maxComponent = $($(this).data('date-max'));

                // Se a data máxima for menor que a data mínima
                if (($maxComponent.val()) && !(moment($(this).val(), 'DD/MM/YYYY') <= moment($maxComponent.val(), 'DD/MM/YYYY'))) {
                    $(this).parent().data('DateTimePicker').setDate('');
                    $maxComponent.parent().data('DateTimePicker').setMinDate(moment('01011200', 'DDMMYYYY'));
                    return;
                }

                // Máximo de intervalo em dias entre as duas datas
                if ($(this).data('date-max-day-interval')) {
                    //$.log('blur min', '=> max', $(this));
                }
            }
        });
        /**/
    });
    return $(this);
};
/**
 * Cria componente de Hora
 */
$.fn.tipoHora = function() {
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoHora');
        }
        $(item).mask('99:99');
        $(item)
                .inputGroup('before')
                .find('.input-group-addon:last')
                .icone('glyphicons clock icon-purple');
        $(item).on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(item).blur(function(e) {
            if (!$(this).val().match(/^(([0-1][0-9]|2[0-3])$|([0-1][0-9]|2[0-3]):[0-5][0-9])$|(([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])$/)) {
                $(this).val('');
            }
            if (($(this).data('hour-min') && $(this).val()) && ($(this).data('hour-min') > $(this).val())) {
                $(this).val('');
                Mensagem.deErro('Hora de Agendamento Inicial fora do permitido.(Deve ser Igual ou Superior a ' + $(this).data('hour-min') + 'h )');
            }
            if (($(this).data('hour-max') && $(this).val()) && ($(this).data('hour-max') < $(this).val())) {
                $(this).val('');
                Mensagem.deErro('Hora de Agendamento Final fora do permitido.(Deve ser Inferior ou Igual a ' + $(this).data('hour-max') + 'h )');
            }
        });
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });
        $(item).parent().find('.input-group-addon').click(function(e) {
            $(item).focus();
        });

        var config = {'language': 'pt-BR', 'pickDate': false};
        $(item).parent().datetimepicker(config);
    });
};
/**
 * Cria componente de Hora com Segundos
 */
$.fn.tipoHoraSegundos = function() {
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoHoraSegundos');
        }
        $(item).mask('99:99:99');
        $(item)
                .inputGroup('before')
                .find('.input-group-addon:last')
                .icone('glyphicons clock icon-purple');
        $(item).on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(item).blur(function(e) {
            if (!$(this).val().match(/^(([0-1][0-9]|2[0-3])$|([0-1][0-9]|2[0-3]):[0-5][0-9])$|(([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])$/)) {
                $(this).val('');
            }
        });
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });

        var config = {'language': 'pt-BR', 'pickDate': false, 'useSeconds': true};
        $(item).parent().datetimepicker(config);
    });
};
/**
 * Cria componente de Data e Hora
 */
$.fn.tipoDataHora = function() {
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoDataHora');
        }
        $(item).mask(Sistema.mascaras.dataHora[0]);
        $(item)
                .inputGroup('before')
                .find('.input-group-addon:last')
                .icone('glyphicons calendar icon-purple');
        $(item).on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });

        var config = {'language': 'pt-BR'};
        $(item).parent().datetimepicker(config);

        $(item).change(function() {
            if ($(this).val() !== $(this).val().toDate().getDataHora()) {
                $(this).val('');
            }
        });
    });
};
/**
 * Cria componente de Data e Hora com Segundos
 */
$.fn.tipoDataHoraSegundos = function() {
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoDataHoraSegundos');
        }
        $(item).mask(Sistema.mascaras.dataHoraSegundos[0]);
        $(item)
                .inputGroup('before')
                .find('.input-group-addon:last')
                .icone('halflings calendar icon-purple');
        $(item).on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });

        var config = {'language': 'pt-BR', 'useSeconds': true};
        $(item).parent().datetimepicker(config);

        $(item).change(function() {
            if ($(this).val() !== $(this).val().toDate().getDataHoraSegundo()) {
                $(this).val('');
            }
        });

    });
};
$.fn.tipoMes = function() {
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoMes');
        }
        $(item).mask(Sistema.mascaras.mes[0]);
        $(item)
                .inputGroup('before')
                .find('.input-group-addon:last')
                .icone('glyphicons calendar icon-purple');
        $(item).on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });

        var config = {
            'language': 'pt-BR',
            'viewMode': "months",
            'minViewMode': "months",
            'pickTime': false,
            'format': 'MM/YYYY',
            'useStrict': true,
            'icons': {
                time: '',
                date: ''
            }
        };

        //$(item).parent().datetimepicker(config);
        $(item).on('change', function() {
            var arMes = $(this).val().split('/');
            var mes = parseInt(arMes[0], 10);
            var ano = parseInt(arMes[1], 10);
            if (mes > 12 || mes < 1) {
                $(this).val('');
            }
            if (ano > 2100 || ano < 1900) {
                $(this).val('');
            }
        });
    });
};

/**
 * Cria componente de Cep
 */
$.fn.tipoCep = function() {
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoCep');
        }
        $(item).mask(Sistema.mascaras.cep[0]);

        $(item).on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });
    });
};

/**
 * Cria componente de Valor Monetário
 */
$.fn.tipoMoeda = function(seletor) {
    if (seletor) {
        $(this).find(seletor).tipoMoeda();
        return;
    }
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoMoeda');
        }
        // Se não for um input, no caso de um label, span, strong, div ...
        if (item.tagName != 'INPUT') {
            $(item).text(Moeda.formatar($(item).text()));
            return;
        }

        $(item)
                .inputGroup('before')
                .find('.input-group-addon:last')
                .icone('glyphicons money icon-purple');
        $(item).on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });

        $(item).maskMoney({'thousands': '.', 'decimal': ',', 'prefix': 'R$ '});
//        var $inputGroup = $(item).inputGroup('before-after');
//        $inputGroup.find('.input-group-addon:first').html('R$');
//        $inputGroup.find('.input-group-addon:last').html('.00');
    });
};
/**
 * Cria componente de Valor Numérico
 */
$.fn.tipoNumerico = function(seletor) {
    if (seletor) {
        $(this).find(seletor).tipoNumerico();
        return;
    }
    $.each($(this), function(i, item) {
        if (item.tagName != 'INPUT') {
            $(item).text(Numerico.formatar($(item).text()));
            return;
        }
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoNumerico');
        }

        $(item).addClass('form-control');
//        $(item).maskMoney({'thousands': '', 'decimal': '', 'precision': 0});
        $(item).bind('paste', function(event) {
            var $this = $(this);
            var value = $this.val();
            setTimeout(function() {
                var match = $this.val().match(/([0-9])/g);
                $this.val(match ? match.join('') : '');
//                $this.val($this.val().replace(/\s/, ''));
//                $this.val($.trim($this.val()));
//                if ($this.val().match(/[^0-9]/)) {
//                    Message.showInfo('Somente é permitido a inclusão de números neste campo.');
//                    $this.val(value);
//                }
            }, 0);
        });
        $(item).keyup(function(e) {
            $(this).removeClass('text-success').removeClass('text-danger');
            if ($(this).attr('data-max-value')) {
                if (parseInt($(this).attr('data-max-value')) < parseInt($(this).val())) {
                    $(this).addClass('text-danger');
                } else {
                    $(this).addClass('text-success');
                }
            }
            if ($(this).attr('data-min-value')) {
                if (parseInt($(this).attr('data-min-value')) > parseInt($(this).val())) {
                    $(this).addClass('text-danger');
                } else {
                    $(this).addClass('text-success');
                }
            }
        });
        $(this).blur(function(e) {
            $(this).removeClass('text-success').removeClass('text-danger');
        });
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });
        $(item).change(function(e) {
            if ($(this).attr('data-max-value')) {
                if (parseInt($(this).attr('data-max-value')) < parseInt($(this).val())) {
                    $(this).val('');
                    Message.showInfo('Valor superior ao permitido: ' + $(this).attr('data-max-value'))
                }
            }
            if ($(this).attr('data-min-value')) {
                if (parseInt($(this).attr('data-min-value')) > parseInt($(this).val())) {
                    $(this).val('');
                    Message.showInfo('Valor inferior ao permitido: ' + $(this).attr('data-min-value'))
                }
            }
        });
        $(item).keydown(function(e) {
            // Permissão para: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13/*, 110 , 190*/]) !== -1 ||
                    // Allow: Ctrl+A
                            ($.inArray(e.keyCode, [65, 86]) && e.ctrlKey === true) ||
                            // Allow: home, end, left, right
                                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                        // let it happen, don't do anything

                        return;
                    }
                    // Ensure that it is a number and stop the keypress
                    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                        e.preventDefault();
                    }
                });
        $(item).on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
    });
};
$.fn.tipoFloat = function() {
    ponto = function(key) {
        try {
            navigator.userAgent.match(/windows/i).length;
            switch (true) {
                case $.browser.msie:
                case $.browser.webkit:
                    return (key === 190 || key === 194);
                case $.browser.mozilla:
                    return (key === 190 || key === 108);
                default:
                    return false;
            }
        } catch (e) {
            e;
            return (key === 190 || key === 110);
        }
    }
    zero = function(key) {
        return (key === 96 || key === 48);
    }
    $.each($(this), function(i, item) {
        if ($(item).attr('data-js-componente')) {
            return;
        } else {
            $(item).attr('data-js-componente', 'tipoFloat');
        }

        $(item)
                .addClass('form-control')
                .inputGroup('before')
                .find('.input-group-addon:last')
                .icone('glyphicons calculator icon-purple');
        $(item).on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(this).keyup(function(e) {
            if (ponto(e.keyCode)) {
                return true;
            }
            if (zero(e.keyCode)) {
                return true;
            }
            if ($(this).val()) {
                $(this).val(parseFloat($(this).val()));
                if ($(this).val() === 'NaN') {
                    $(this).val('');
                }
            }
        });
        $(this).blur(function() {
            $(this).val(parseFloat($(this).val()));
            if ($(this).val() === 'NaN') {
                $(this).val('');
            }
        });
        $(item).keypress(function(e) {
            if (e.keyCode === 13) {
                $(this).trigger('blur');
            }
        });
        /*$(item)
         .inputGroup('before')
         .find('.input-group-addon:last').html('123');*/
    });
};
$.fn.obrigatorio = function(is) {
    if (is) {
        $.each($(this), function() {
            $(this).addClass('obrigatorio');
            var $label = $(this).parents('.form-group:first').find('label:first');
            if (!$label.find('span.obrigatorio')[0]) {
                $label.append($('<span>', {'class': 'obrigatorio'}));
            }
        });
    } else {
        $.each($(this), function() {
            $(this).removeClass('obrigatorio');
            var $formGroup = $(this).parents('.form-group:first');
            if (!$formGroup.find(':input.obrigatorio, .listagem.obrigatorio')[0]) {
                var $label = $formGroup.find('label:first');
                $label.find('span.obrigatorio').remove();
            }
        });
    }
};
$.fn.validar = function(fn, seletor) {
    var erros = {
        pilha: [],
        input: null,
        empilhar: function(input, msg) {
            if (!this.pilha) {
                this.input = input;
            }
            this.pilha.push(msg);
        }
    };
    $.each($(this).find(seletor ? seletor : ':input'), function(i, input) {
        if ($(input).is('.obrigatorio') && !$(input).val()) {
            erros.pilha.push(input);
            if (!erros.input) {
                erros.input = input;
            }
        }
        if (fn) {
            fn($(input), erros);
        }
    });
    $.each($(this).find('.listagem.obrigatorio, .listagem-multivalorada.obrigatorio'), function(i, listagem) {
        if (!$(listagem).children()[0]) {
            erros.pilha.push(listagem);
        }
    });
    if (erros.pilha.length) {
        for (i in erros.pilha) {
            $(erros.pilha[i]).parents('.form-group').formGroupError();
            Mensagem.deErro($(erros.pilha[i]).attr('title'));
        }
        if (erros.input) {
            $(erros.input).focus();
        }
        return false;
    }
    return true;
};
$.fn.pesquisa = function(options) {
    var $this = $(this);
    var options = $.extend({
        url: '',
        element: function() {
            return $this;
        },
        voObject: function() {
            return {};
        },
        campos: function() {
            return this.element().find('.campos');
        },
        listaOpcoes: function() {
            return this.element().find('.listagem');
        },
        templateItem: function() {
            return $();
        },
        init: function() {
            var that = this;
            this.templateItem().click(function() {
                this.campos().atribuir($(this).extrair(that.voObject()));
            });
            this.botaoPesquisar().click(function() {
                this.listaOpcoes().iterar(this.templateItem(), Ajax.syncrono(this.url, this.campos().extrair(this.voObject())).data, true);
            });
        }
    }, options);
    options.init();
};
$.fn.componenteDeSelecao = function(options, val) {
    var $this = $(this);
    if (typeof options === 'string') {
        switch (options) {
            case 'val':
                $(this).find('.campos').atribuir(val);
                $(this).find('.exibicao').atribuir(val).show();
                break;
            case 'bloquear':
                $(this).find('.campos').find("input, select, textarea").readOnly(true)
                $(this).find('.pesquisar').hide();
                $(this).find('.limpar').show();
                break;
        }
        return;
    }
    if ($(this).attr('data-js-componente')) {
        return;
    } else {
        $(this).attr('data-js-componente', 'componenteDeSelecao');
    }


    var options = $.extend({
        url: '',
        elemento: function() {
            return $this;
        },
        botaoPesquisar: function() {
            return this.elemento().find('.pesquisar');
        },
        botaoLimpar: function() {
            return this.elemento().find('.limpar');
        },
        voObject: function() {
            return new Object();
        },
        exibicao: function() {
            return this.elemento().find('.exibicao');
        },
        escopoListagem: function() {
            return this.elemento().find('.escopo-listagem');
        },
        listagemDeOpcoes: function() {
            return this.escopoListagem().find('.listagem');
        },
        templateItemListagem: function() {
            return $('.templates .js-tpl-item');
        },
        campos: function() {
            return this.elemento().find('.campos');
        },
        travarCampos: function() {
            this.campos().find("input, select, textarea").readOnly(true);
        },
        desTravarCampos: function() {
            this.campos().find("input, select, textarea").readOnly(false);
        },
        preencherCampos: function(vo) {
            if (this.campos()[0]) {
                this.campos().atribuir(vo);
            }
        },
        preencherExibicao: function(vo) {
            if (this.exibicao()[0]) {
                this.exibicao().atribuir(vo).show();
            }
        },
        limparExibicao: function() {
            this.exibicao().atribuir(this.voObject()).hide();
        },
        validarPesquisa: function(vo) {
            return true;
        },
        preencherListagem: function(colecao) {
            this.listagemDeOpcoes().iterar(this.templateItemListagem(), colecao, true);
        },
        ativarBotaoPesquisar: function() {
            this.botaoPesquisar().prop('disabled', true);
            this.botaoPesquisar().find('span:first').data('search', this.botaoPesquisar().find('span:first').hasClass('search'));
            this.botaoPesquisar().find('span:first').addClass('loading').removeClass('search');
        },
        desativarBotaoPesquisar: function() {
            this.botaoPesquisar().prop('disabled', false);
            this.botaoPesquisar().find('span:first').removeClass('loading');
            if (this.botaoPesquisar().find('span:first').data('search')) {
                this.botaoPesquisar().find('span:first').addClass('search');
            }
        },
        pesquisar: function() { //--
            var vo = this.campos().extrair(this.voObject());
            if (!this.validarPesquisa(vo)) {
                return;
            }
            this.ativarBotaoPesquisar();
            var that = this;
            $.ajax({
                url: hostPath + this.url,
                dataType: 'json',
                type: 'get',
                data: vo
            }).done(function(_data) {
                var dados = Sistema.validarJsonTransport(_data);
                if (dados) {
                    that.preencherListagem(dados.data);
                    that.apresentarListagem(dados);
                    that.desativarBotaoPesquisar();
                    that.aoPesquisar();
                }
            });
        },
        apresentarListagem: function(dados) {
            if (dados.data.length) {
                this.escopoListagem().show();
            } else {
                this.escopoListagem().hide();
                Message.showWarning(Texto.nenhumResultado);
            }
        },
        aoPesquisar: function() {

        },
        limpar: function() {
            this.preencherCampos(this.voObject());
            this.desTravarCampos();
            this.preencherExibicao(this.voObject());
            this.exibicao().hide();
            this.botaoPesquisar().show();
            this.botaoLimpar().hide();
            this.aoLimpar();
        },
        aoLimpar: function() {

        },
        selecionarItem: function($item) {
            var vo = $item.extrair(this.voObject());
            this.preencherCampos(vo);
            this.travarCampos();
            this.preencherExibicao(vo);
            this.exibicao().show();
            this.botaoLimpar().show();
            this.botaoPesquisar().hide();
            this.escopoListagem().hide();
            this.listagemDeOpcoes().html('');
            this.aoSelecionar($item, vo);
        },
        aoSelecionar: function($item, vo) {

        },
        init: function() {
            var that = this;
            this.botaoPesquisar().click(function() {
                that.pesquisar();
            });
            this.botaoLimpar().click(function() {
                that.limpar();
            }).hide();
            this.templateItemListagem().click(function() {
                that.selecionarItem($(this));

            });
        }}, options);
    options.init();
    return $(this);
};
/**
 * Plugin de manipulação de uma listagem de edição de dados
 * @param {Object} config
 * @returns {Void}
 */
$.fn.listagemDeEdicao = function(config, value) {
    var $this = $(this);
    if (typeof config === 'string') {
        switch (config) {
            case 'carregar':
                $(this).data('options').carregarColecao(value);
                break;
        }
        return;
    }

    if ($(this).attr('data-js-componente')) {
        return;
    } else {
        $(this).attr('data-js-componente', 'listagemDeEdicao');
    }

    var options = $.extend({
        /**
         * Seletor do botão de adição de itens
         */
        bntAdicionar: '.adicionar-item',
        /**
         * Seletor do botão que limpa o formulario da listagem
         */
        btnLimpar: '.limpar-item',
        /**
         * Seletor do botão de edição do item
         */
        btnEditar: '.editar-item',
        /**
         * Seletor do botão de remover o item
         */
        btnRemover: '.remover-item',
        /**
         * Seletor do grupo de campos do formulario da listagem
         */
        grupoCampos: '.campos',
        /**
         * Seletor da listagem de dados
         */
        grupoListagem: '.listagem',
        /**
         * Seletor do item da listagem
         */
        tplItem: '.js-tpl-item',
        /**
         * Coleção de dados iniciais
         */
        colecao: [],
        /**
         * Inicialização dos eventos
         */
        init: function() {
            var objOptions = this;
            $this.find(this.bntAdicionar).click(function() {
                objOptions.incluir();
            });
            $this.find(this.btnLimpar).click(function() {
                objOptions.limpar($(this));
            });
            $this.find(this.btnRemover).click(function() {
                objOptions.excluir($(this));
            });
            $this.find(this.btnEditar).click(function() {
                objOptions.editar($(this));
            });
            this.carregarColecao();
            this.aposInit();
        },
        carregarColecao: function(colecao) {
            colecao = colecao || this.colecao;
            this.listagem().iterar(this.template(), colecao, true);
        },
        /**
         * Retona o objeto de dados utilizado para controlar a listagem
         */
        voObject: function() {
            return new Object();
        },
        /**
         * Retorna o grupo de campos do formulario da listagem
         */
        campos: function() {
            return $this.find(this.grupoCampos);
        },
        /**
         * Retorna a listagem de dados
         */
        listagem: function() {
            return $this.find(this.grupoListagem);
        },
        /**
         * Retorna o template das linhas, caso seja passado o elemento retorna o template da linha do elemento
         */
        template: function($el) {
            return $el ? $el.parents(this.tplItem + ':first') : $this.find('.templates ' + this.tplItem);
        },
        /**
         * Realiza o foco no primeiro campo editavel do formulario da listagem
         */
        focar: function() {
            return this.campos().find(':input:visible:first').focus();
        },
        /**
         * Limpa os campos do formulario da listagem
         */
        limpar: function() {
            if (this.campos().data('edicao')) {
                this.campos().data('edicao').removeClass('info');
                this.campos().data('edicao', false);
            }
            this.campos().atribuir(this.voObject());
            this.focar();
            this.aposLimpar();
        },
        /**
         * Prepara a linha da listagem para a edição
         */
        editar: function($el) {
            this.listagem().children().removeClass('info');
            var $tpl = this.template($el);
            if (!this.validarEdicao($tpl, $tpl.extrair(this.voObject()))) {
                return;
            }
            this.campos().data('edicao', this.template($el));
            this.campos().atribuir(this.campos().data('edicao').extrair(this.voObject()));
            this.campos().data('edicao').addClass('info');
            this.focar();
        },
        /**
         * Exclui os dados da listagem
         */
        excluir: function($el) {
            var $tpl = this.template($el);
            if (!this.validarExclusao($tpl, $tpl.extrair(this.voObject()))) {
                return;
            }
            if ($tpl.hasClass('info')) {
                this.limpar();
            }
            $tpl.remove();
            this.aposExcluir($tpl);
        },
        /**
         * Inclui os dados na listagem
         */
        incluir: function() {
            var obj = this.campos().extrair(this.voObject());
            var $tpl = this.campos().data('edicao') ? this.campos().data('edicao') : this.template().clone(true);
            if (!this.validarInclusao($tpl, obj, this.campos().data('edicao') ? 'edicao' : 'inclusao')) {
                this.focar();
                return;
            }
            if (!this.campos().data('edicao')) {
                this.listagem().append($tpl);
            }
            $tpl.atribuir(obj);
            this.aposIncluir($tpl);
            this.limpar();
        },
        aposIncluir: function($tpl) {
        },
        aposExcluir: function($tpl) {
        },
        aposLimpar: function() {
        },
        aposInit: function() {
        },
        /**
         * Valida a inclusao da linha na listagem
         * @param {Object} objeto definido no método voObject
         * @param {String} informa se é "inclusao" ou "edicao"
         */
        validarInclusao: function($tpl, voObject, tipo) {
            return true;
        },
        validarExclusao: function($tpl, voObject) {
            return true;
        },
        validarEdicao: function($tpl, voObject) {
            return true;
        }
    }, config);
    options.init();
    options.colecao = [];
    $(this).data('options', options);
    if (options.colecao.length) {

    }
};
var defaultListagemAgrupada = {colecao: [], template: {}, titulo: {}, callback: {}, fnInit: function(arDados) {
    }, fnFinish: function(arDados) {
    }};
/**
 * Cria a listagem agrupada por niveis hierárquicos
 * @param {Object} options
 * @returns {Void}
 */
$.fn.listagemAgrupada = function(options) {

    options = $.extend(defaultListagemAgrupada, options);
    $.each(options.template, function() {
        $(this).find('[data-js-componente="tipoMoeda"]').removeAttr('data-js-componente');
    });
    $.each(options.titulo, function() {
        $(this).find('[data-js-componente="tipoMoeda"]').removeAttr('data-js-componente');
    });
    var $this = $(this);
    options.fnInit(options);
    var listar = function(arDados, lbl, nvl) {
        lbl = lbl || 'treegrid';
        nvl = nvl || 1;
        var pai = lbl.replace('treegrid', 'treegrid-parent');
        if (options.titulo[nvl]) {
            var $titulo = options.titulo[nvl].clone(true);
            $titulo.addClass(pai);
            $titulo.addClass(lbl + '-0');
            $this.append($titulo);
        }
        for (var i in arDados) {
            var ref = lbl + '-' + (parseInt(i) + 1);
            var $clone = options.template[nvl].clone(true);
            $clone.addClass(ref);
            $clone.attr('data-ref', ref);
            $clone.addClass(pai);
            $this.append($clone.atribuir(arDados[i]));
            if (options.callback[nvl]) {
                options.callback[nvl]($clone, arDados[i]);
            }
            if (arDados[i].subitens) {
                listar(arDados[i].subitens, ref, nvl + 1);
            }
        }
    };
    $this.find('[class*="treegrid"]').not('.treegrid-expand-folder,.treegrid-collapse-folder').remove();
    listar(options.colecao);
    $this.treegrid({
        initialState: 'collapsed',
        expanderExpandedClass: 'halflings folder-open purple-folder',
        expanderCollapsedClass: 'halflings folder-close purple-folder'
    });
    $this.find('.treegrid-collapse-folder').click(function() {
        $this.treegrid('collapseAll');
    });
    $this.find('.treegrid-expand-folder').click(function() {
        $this.treegrid('expandAll');
    });
    options.fnFinish(options);
    $(this).find('.moeda').tipoMoeda();
};
$.fn.removerAcessos = function(acessos) {
    $.each($(this).find('[data-acesso]'), function() {
        var liberado = false;
        if ($(this).attr('data-acesso')) {
            acessosElemento = $(this).attr('data-acesso').split(',');
            for (i in acessosElemento) {
                if (acessos[$.trim(acessosElemento[i])]) {
                    liberado = true;
                    break;
                }
            }
            if ($(this).attr('data-acesso-callback')) {
                eval('call = ' + $(this).attr('data-acesso-callback'));
                call($(this), liberado);
            }
            if (!liberado) {
                if ($(this).attr('data-acesso-desabilitar') === 'true') {
                    $(this).attr('disabled', 'disabled');
                }
                if ($(this).attr('data-acesso-remover') !== 'false') {
                    $(this).remove();
                }
            }

        }
        $(this).removeAttr('data-acesso');
        $(this).removeAttr('data-acesso-desabilitar');
        $(this).removeAttr('data-acesso-remover');
    });
};
$.fn.readOnly = function(is) {
    $.each($(this), function(i, item) {
        if ($(item).is('select')) {
            $(item).find('option:not(:selected)')[is ? 'attr' : 'removeAttr']('disabled', 'disabled');
        } else {
            $(item)[is ? 'attr' : 'removeAttr']('readonly', 'readonly');
        }
    });
};
/**
 * Rola a tela até o elemento
 * @param {int} time
 * @returns {void}
 */
$.fn.ancorar = function(time) {
    time = (time === undefined ? 100 : time);
    $('html, body').animate({
        scrollTop: $(this).offset().top
    }, time);
};
$.fn.anchor = $.fn.ancorar;

var voPagina = function() {
    this.atualPagina = null;
    this.totalPagina = null;
    this.tamanhoPagina = null;
    this.totalRegistros = null;
};

$.fn.paginador = function(options, voPag) {
    if (typeof options === 'string') {
        switch (options) {
            case 'reset':
                return $(this).parent().atribuir({
                    atualPagina: 1,
                    totalPagina: null,
                    tamanhoPagina: $(this).parent().extrair(new voPagina()).tamanhoPagina,
                    'totalRegistros': $(this).parent().extrair(new voPagina()).totalRegistros
                });
            case 'cancel':
                $(this).paginador('setPagina', $(this).data('antes'));
                $(this).find('.active').removeClass('active');
                $(this).find('.por-pagina [data-nrTamanho="' + $(this).data('antes').tamanhoPagina + '"]').parents('.por-pagina').addClass('active');
                break;
            case 'setPagina':
                if (voPag instanceof JsonTransport) {
                    if (voPag.extra.pagina.totalRegistros == 0) {
                        voPag.extra.pagina.totalRegistros = $(this).parent().extrair(new voPagina()).totalRegistros;
                    }
                    if (voPag.extra.pagina.tamanhoPagina) {
                        $(this).find('[data-paginador-tamanho-pagina]').removeClass('active');
                        $(this).find('[data-paginador-tamanho-pagina="' + voPag.extra.pagina.tamanhoPagina + '"]').addClass('active');
                    }
                    if (!voPag.extra.isCsv) {
                        if (!$(this).attr('data-no-hide') === 'true') {
                            $(this).parent()[parseInt(voPag.extra.pagina.totalPagina) ? 'show' : 'hide']();
                        }
                        return $(this).parent().atribuir(voPag.extra.pagina);
                    }
                } else {
                    if (!$(this).attr('data-no-hide') === 'true') {
                        $(this).parent()[parseInt(voPag.totalPagina) ? 'show' : 'hide']();
                    }
                    return $(this).parent().atribuir(voPag);
                }
                break;
            case 'getUrl':
                var pag = $(this).parent().extrair(new voPagina());
                pag.tamanhoPagina = pag.tamanhoPagina ? pag.tamanhoPagina : $(this).find('[data-nrTamanho]:first').data('nrtamanho');
                pag.atualPagina = pag.atualPagina ? pag.atualPagina : 1;
                return $.param({'paginador': pag});
                break;
            case 'getPagina':
            default:
                return $(this).parent().extrair(new voPagina());
        }
        return;
    }
    if ($(this).attr('data-js-componente')) {
        return;
    } else {
        $(this).attr('data-js-componente', 'paginador');
    }

    var $this = $(this);
    $this.data('antes', new voPagina());
    options = $.extend({
        tamanhos: $this.attr('data-paginador-tamanhos') ? eval($this.attr('data-paginador-tamanhos')) : [20, 50, 100, 250],
        fn: $this.attr('data-paginador-callback') ? eval($this.attr('data-paginador-callback')) : function() {
        },
        /**
         * Retorna o elemento originário
         * @returns {jQuery}
         */
        elemento: function() {
            return $this;
        },
        /**
         * Extrai a página do componente
         * @returns {voPagina}
         */
        getVoPagina: function() {
            return this.contexto().extrair(new voPagina());
        },
        /**
         * Retorna o template do paginador
         * @returns {jQuery}
         */
        getTemplatePaginador: function() {
            return $('.templates .paginador:not(.tamanho)').clone(true);
        },
        /**
         * Retorna o template do configurador de tamanho da página
         * @returns {jQuery}
         */
        getTemplateItemTamanhoPagina: function(tamanho) {
            var that = this;
            var $tpl = $('.templates .paginador.tamanho .por-pagina').clone(true);
            $tpl.attr('data-paginador-tamanho-pagina', tamanho);
            $tpl.click(function(event) {
                event.preventDefault();
                $this.data('antes', that.getVoPagina());
                that.contexto().atribuir({
                    'atualPagina': '1',
                    'totalPagina': '',
                    'tamanhoPagina': $tpl.extrair({'nrTamanho': null}).nrTamanho,
                    'totalRegistros': $tpl.extrair({'totalRegistros': null}).nrTamanho
                });
                that.apontarRegistrosPorPagina();
                that.fn(that.getVoPagina());
            });
            $tpl.atribuir({'nrTamanho': tamanho});
            return $tpl;
        },
        apontarRegistrosPorPagina: function() {
            $this.find('.active').removeClass('active');
            $this.find('.por-pagina [data-nrTamanho="' + this.getPagTamanho() + '"]').parents('.por-pagina').addClass('active');
        },
        /**
         * Retorna o contexto do componente
         * @returns {jQuery}
         */
        contexto: function() {
            return this.elemento().parent();
        },
        /**
         * Retorna o botão anterior do componente
         * @returns {jQuery}
         */
        btnAnterior: function() {
            return this.contexto().find('.paginador-pag-anterior');
        },
        /**
         * Retorna o botão posterior do componente
         * @returns {jQuery}
         */
        btnPosterior: function() {
            return this.contexto().find('.paginador-pag-posterior');
        },
        itemPagTamanho: function() {
            return $('.templates .paginador.tamanho');
        },
        setVoPagina: function(pag) {
            this.contexto().atribuir(pag);
        },
        getPagTamanho: function() {
            return parseInt(this.getVoPagina().tamanhoPagina);
        },
        getPagAtual: function() {
            return parseInt(this.getVoPagina().atualPagina);
        },
        getPagTotal: function() {
            return parseInt(this.getVoPagina().totalPagina);
        },
        setPagTamanho: function(val) {
            this.contexto().atribuir({'tamanhoPagina': val});
        },
        setPagAtual: function(val) {
            this.contexto().atribuir({'atualPagina': val});
        },
        setPagTotal: function(val) {
            this.contexto().atribuir({'totalPagina': val});
        },
        irPaginaPosterior: function() {
            if ((this.getPagAtual() + 1) <= this.getPagTotal()) {
                $this.data('antes', this.getVoPagina());
                this.setPagAtual(this.getPagAtual() + 1);
                this.fn(this.getVoPagina());
            }
        },
        irPaginaAnterior: function() {
            if ((this.getPagAtual() - 1) > 0) {
                $this.data('antes', this.getVoPagina());
                this.setPagAtual(this.getPagAtual() - 1);
                this.fn(this.getVoPagina());
            }
        },
        alterarTamanho: function(tamanho) {

        },
        init: function() {
            var that = this;
            this.elemento().append(this.getTemplatePaginador());
            this.elemento().atribuir({tamanhoPagina: this.tamanhos[0]});
            this.btnAnterior().click(function() {
                that.irPaginaAnterior();
            });
            this.btnPosterior().click(function() {
                that.irPaginaPosterior();
            });
            var tamAtual = this.getPagTamanho();
            for (i in this.tamanhos) {
                var $tpl = this.getTemplateItemTamanhoPagina(this.tamanhos[i]);

                if (this.tamanhos[i] == tamAtual) {
                    $tpl.addClass('active');
                }
                this.contexto().find('[data-tamanhoPagina]').append($tpl);
            }
            if (!this.contexto().find('[data-tamanhoPagina]').find('.active')[0]) {
                this.contexto().find('.por-pagina:first').addClass('active');
            }

        }
    }, options);
    options.init();
};
$.fn.panelToggleButton = function() {
    $.each($(this), function(i, item) {
        $(item).addClass('glyphicons eye_open pointer icon-purple');
        $(item).attr('title', 'Mostrar/Esconder');
        $(item).tooltip();
        var $panel = $(item).parents('.panel').eq(0);
        if ($panel) {
            $(item).on('click', function() {
                var $panel = $(this).parents('.panel').eq(0);
                if ($panel.hasClass('panel-minimized')) {
                    $(this).addClass('eye_open');
                    $(this).removeClass('eye_close');
                    $panel.removeClass('panel-minimized');
                    $panel.find('.panel-content').show();
                    $panel.find('[data-paginador]').show();
                } else {
                    $(this).removeClass('eye_open');
                    $(this).addClass('eye_close');
                    $panel.addClass('panel-minimized');
                    $panel.find('.panel-content').hide();
                    $panel.find('[data-paginador]').hide();
                }
            });
        }
    });
};

var Grafico = function(json) {
    this.attrs = {};

    this.init = function(json) {
        this.attrs = json;
    };

    this.getConfig = function() {
        return this.attrs;
    };

    if (json) {
        this.init(json);
    }

    return this;
};

/**
 * Gráfico
 * @param {Grafico} grafico
 */
$.fn.grafico = function(grafico) {
    var that = this;
    var config = grafico.getConfig();
    config.renderAt = $(that).attr('id');
    FusionCharts.ready(function() {
        var conversionChart = new FusionCharts(config);
        conversionChart.render();
    });
};

/**
 * Upload
 * @param {Array} options
 */
$.fn.upload = function(config) {
    if ($.fn.fileupload && $(this).length) {
        if (config == 'reset') {
            var $fieldset = $(this).parent().parent().parent();
            $fieldset.find('.fileinput-button').removeClass('btn-success disabled').prop('disabled', false);
            $fieldset.find('.fileinput-button .description').html('<span class="halflings cloud_upload"></span> Selecione o Arquivo');
            $fieldset.find('.fileupload-btn-send-file button').addClass('disabled').off('click').prop('disabled', false);
            $fieldset.find('.btn-success').removeClass('disabled');
            $fieldset.find('.fileupload-btn-file-sent').val('');
            return false;
        }

        $.support.fileInput = true;
        var defaultOptions = {
            'url': '',
            'icons': {
                'zip': 'zip',
                'xls': 'xls',
                'csv': 'csv',
                'txt': 'txt',
                'doc': 'doc',
                'jpg': 'jpg',
                'jpeg': 'jpg',
                'png': 'png',
                'tif': 'tif',
                'tiff': 'tiff',
                'xml': 'xml',
                'default': 'txt'
            },
            'exts': [],
            'showMessageSuccess': true,
            'callBackAdd': function(e, data) {
                return true;
            },
            'callBackSendFile': function(e, data) {
                return true;
            },
            'callBackSuccess': function(result, textStatus, jqXHR) {
                return true;
            },
            'callBackPreSuccess': function(result, textStatus, jqXHR) {
                return true;
            },
            'callBackError': function(result, textStatus, jqXHR) {
                Mensagem.deErro("Falha ao tentar enviar arquivo.");
            },
            'callBackMessageSuccess': function(result, textStatus) {
//                Message.showSuccess("Arquivo enviado com sucesso.");
            }
        };
        config = $.extend(defaultOptions, config);

        /**
         * Fileupload Config
         */
        var newConfig = {
            'url': '',
            'dataType': 'json',
            'add': function(e, data) {
                // Options
                var options = $(e.target).data('file-upload-options');

                // Return true do callback, se retornar false barrará todo o restande do processamento
                if (typeof options.callBackAdd === 'string') {
                    if (!eval(options.callBackAdd + "(e, data);")) {
                        return false;
                    }
                } else {
                    if (!options.callBackAdd(e, data)) {
                        return false;
                    }
                }

                // Reset click bind to the button Send
                $(e.target).data('file-upload').siblings('.fileupload-btn-send-file').find('button').off('click');

                var file = data.files;
                file = file[0];
                var ext = file.name.split('.').pop().toLowerCase();
                var exts = $(e.target).data('exts').split(',');

                if ($.inArray(ext, exts) === -1) {
                    Mensagem.deErro('Extensão Inválida. Somente arquivos com as extensões: ' + exts.join(',').toUpperCase() + '!');
                    return false;
                }

                var icon = options.icons[ext] ? options.icons[ext] : options.icons['default'];
                data.url = $(this).data('url');

                $(e.target).data('file-upload').find('.fileinput-button .description').html('<span class="margin-right-lg filetype ' + icon + '"></span>' + file.name);
                $(e.target).data('file-upload').siblings('.fileupload-btn-send-file').find('button').removeClass('disabled');
                $(e.target).data('file-upload').siblings('.fileupload-btn-send-file').find('button').on('click', function() {
                    // Return true do callback, se retornar false barrará todo o restande do processamento
                    if (typeof options.callBackSendFile === 'string') {
                        if (!eval(options.callBackSendFile + "(data, this);")) {
                            return false;
                        }
                    } else {
                        if (!options.callBackSendFile(data, this)) {
                            return false;
                        }
                    }
                    // Ativar loading
                    Controle.linkInit(Controle.action);
                    var that = this;

                    var ajaxErrorFunction = Sistema.execError;
                    Sistema.execError = function(event, request) {
                    };

                    // Enviar arquivo
                    data.submit().always(function(result, textStatus, jqXHR) {

                        // Desativar loading
                        Controle.linkStop(Controle.action);
                        // Parsear resultado
                        result = new JsonTransport(result);

                        if (textStatus == 'success' && result.isSuccess()) {
                            var $fileupload = $(that).parents('fieldset').find('.fileupload');
                            // Return true do callback, se retornar false barrará todo o restande do processamento
                            if (typeof options.callBackPreSuccess === 'string') {
                                if (!eval(options.callBackPreSuccess + "(result, textStatus, $fileupload, jqXHR);")) {
                                    return false;
                                }
                            } else {
                                if (!options.callBackPreSuccess(result, textStatus, $fileupload, jqXHR)) {
                                    return false;
                                }
                            }

                            $(this.fileInput).data('file-upload').siblings('.fileupload-btn-file-sent').val(result.data);
                            $(this.fileInput).data('file-upload').siblings('.fileupload-btn-send-file').find('button').addClass("disabled").prop('disabled', 'disabled');
                            $(this.fileInput).data('file-upload').find('.fileinput-button').addClass("disabled btn-success").prop('disabled', 'disabled');

                            // Mensagem de Sucesso
                            if (options.showMessageSuccess === true) {
                                if (typeof options.callBackMessageSuccess === 'string') {
                                    eval(options.callBackMessageSuccess + "(result, textStatus, $fileupload);");
                                } else {
                                    options.callBackMessageSuccess(result, textStatus, $fileupload);
                                }
                            }

                            // Return true do callback, se retornar false barrará todo o restande do processamento
                            if (typeof options.callBackSuccess === 'string') {
                                if (!eval(options.callBackSuccess + "(result, textStatus, $fileupload, jqXHR);")) {
                                    return false;
                                }
                            } else {
                                if (!options.callBackSuccess(result, textStatus, $fileupload, jqXHR)) {
                                    return false;
                                }
                            }
                        } else {
                            if (typeof options.callBackError === 'string') {
                                eval(options.callBackError + "(result, textStatus, jqXHR);");
                            } else {
                                options.callBackError(result, textStatus, jqXHR);
                            }
                        }
                        setTimeout(function() {
                            Sistema.execError = ajaxErrorFunction;
                        }, 500);
                    });
                });
            }
        };

        // Apply the plugin
        $.each($(this), function(i, item) {
//            if (!$(item).is(':visible')) {
//                return;
//            }
            var itemConfig = {
                'url': $(item).data('url') ? $(item).data('url') : config.url,
                'exts': $(item).data('exts') ? $(item).data('exts').split(',') : [],
            };
            if ($(item).data('callbacksuccess')) {
                itemConfig.callBackSuccess = $(item).data('callbacksuccess');
            }
            if ($(item).data('callbackerror')) {
                itemConfig.callBackError = $(item).data('callbackerror');
            }
            if ($(item).data('showmessagesuccess') || $(item).data('showmessagesuccess') === false) {
                itemConfig.showMessageSuccess = $(item).data('showmessagesuccess');
            }
            if ($(item).data('callbackadd')) {
                itemConfig.callBackAdd = $(item).data('callbackadd');
            }
            if ($(item).data('callbacksendfile')) {
                itemConfig.callBackSendFile = $(item).data('callbacksendfile');
            }

            config = $.extend(config, itemConfig);
            $(item).data('file-upload-options', config);
            $(item).data('file-upload', $(item).parent().parent());
            $(item).fileupload(newConfig)
                    .prop('disabled', !$.support.fileInput)
                    .parent().addClass($.support.fileInput ? undefined : 'disabled');
        });
    }
};
$.fn.formGroupError = function(timer) {
    timer = timer ? timer : Message.timeoutDefault;
    var $this = $(this);
    $this.addClass('has-error');
    setTimeout(function() {
        $this.removeClass('has-error');
    }, timer);
};
$.fn.formGroupWarning = function(timer) {
    timer = timer ? timer : Message.timeoutDefault;
    var $this = $(this);
    $this.addClass('has-warning');
    setTimeout(function() {
        $this.removeClass('has-warning');
    }, timer);
};
$.fn.formGroupSuccess = function(timer) {
    timer = timer ? timer : Message.timeoutDefault;
    var $this = $(this);
    $this.addClass('has-success');
    setTimeout(function() {
        $this.removeClass('has-success');
    }, timer);
};
$.fn.selectConfirm = function(options, value) {
    if (typeof options === 'string') {
        var $tpl = $(this).parents('.js-tpl-select-confirm:first');
        switch (options) {
            case 'val':
                $tpl.find('.js-select-confirm-selected').show();
                $tpl.find('.js-select-confirm-edition').hide();
                $(this).val(value);
                $tpl.find('.js-select-val').val(value)
                if (value) {
                    $tpl.find('.js-select-label').val($(this).find('option:selected').text());
                } else {
                    $tpl.find('.js-select-label').val('');
                }
                break;
        }
        return;
    }

    var $this = $('.templates.js-componentes .js-tpl-select-confirm').clone(true);
    var that = this;
    $(this).after($this);
    $this.find('.js-select-confirm-edition').prepend($(this));
    options = $.extend({
        component: function() {
            return $this;
        },
        select: function() {
            return this.component().find('select');
        },
        btnCancel: function() {
            return this.component().find('.js-select-cancel');
        },
        btnConfirm: function() {
            return this.component().find('.js-select-confirm');
        },
        btnEdit: function() {
            return this.component().find('.js-select-to-edit');
        },
        inputLabel: function() {
            return this.component().find('.js-select-label')
        },
        inputVal: function() {
            return this.component().find('.js-select-val')
        },
        lock: function() {
            this.component().find('.js-select-confirm-selected').show();
            this.component().find('.js-select-confirm-edition').hide();
        },
        unLock: function() {
            this.component().find('.js-select-confirm-selected').hide();
            this.component().find('.js-select-confirm-edition').show();
        },
        onConfirm: function() {
            return true;
        },
        onCancel: function() {
            return true;
        },
        onEdit: function() {
            return true;
        },
        init: function() {
            this.inputVal().attr('name', this.select().attr('name'));
            var opt = this;
            this.btnEdit().click(function() {
                if (opt.onEdit()) {
                    opt.unLock();
                }
            });
            this.btnCancel().click(function() {
                if (opt.onCancel()) {
                    opt.lock();
                    opt.select().val(opt.inputVal().val());
                }
            });
            this.btnConfirm().click(function() {
                if (opt.onConfirm()) {
                    opt.lock();
                    opt.select().selectConfirm('val', opt.select().val());
                    return;
                }
            })
            opt.lock();
            this.select().selectConfirm('val', this.select().val());
        }
    }, options);
    options.init();
};
$.fn.multivalued = function(options) {
    var config = $.extend({
        clearVal: true,
        clearName: true,
        after: function($input, $item) {

        },
        validate: function($list, $input) {
            return this.existsValue($list, $input).size() === 0;
        },
        existsValue: function($list, $input) {
            var strFind = $input.val();
            return $list.find('.js-desc-item-multivalorado').filter(function() {
                return $(this).attr('data-no-accent') === strFind.retiraAcentos().toLowerCase();
            });
        }
    }, options);
    if ($(this).parents('.input-group:first')[0]) {
        var $groupRef = $(this).parents('.input-group');
    } else {
        var $groupRef = $('<div>', {'class': 'input-group'});
        $(this).after($groupRef);
        $groupRef.append($(this));
    }
    var $btnAdd = $('.templates .multivalorado .js-add-multivalorado').clone();
    var $lista = $('.templates .multivalorado .listagem-multivalorada').clone();
    if ($(this).hasClass('obrigatorio')) {
        $lista.addClass('obrigatorio');
        $lista.attr('title', $(this).attr('title'));
        $(this).removeClass('obrigatorio');
    }
    if (config.clearName) {
        var tmpName = $(this).attr('name');
        $(this).attr('data-original-name', $(this).attr('name'));
        //$(this).removeAttr('name');
        $(this).attr('name', tmpName + '[]');
    }
    $btnAdd.data('ref', $(this));
    $btnAdd.data('lista', $lista);
    $(this).data('multivalued-config', config);
    $(this).data('btn-add', $btnAdd);
    $groupRef.append($btnAdd);
    $groupRef.after($lista);
    $btnAdd.on('click', function() {
        if ((!$(this).data('ref').val()) || (!config.validate($(this).data('lista'), $(this).data('ref')))) {
            return;
        }
        var $clone = $('.templates .multivalorado .js-tpl-item-multivalorado').clone();
        $clone.find('.js-desc-item-multivalorado').attr('data-no-accent', $(this).data('ref').val().retiraAcentos().toLowerCase().trim());
        $clone.find('.js-desc-item-multivalorado').html($(this).data('ref').val());
        $clone.find('.js-val-item-multivalorado').val($(this).data('ref').val());
        $clone.find('.js-val-item-multivalorado').attr('name', $(this).data('ref').attr('data-original-name') + '[]');
        $clone.find('.js-rem-multivalorado').click(function() {
            $(this).parents('.js-tpl-item-multivalorado:first').remove();
        })
        $(this).data('lista').append($clone);
        if (config.clearVal) {
            $(this).data('ref').val('');
        }
        config.after($(this).data('ref'), $clone);
        $(this).data('ref').focus();
    });
};
$.fn.multiple = function(options) {
    var $this = $(this);
    options = $.extend({
        attrVal: 'val',
        attrDesc: 'desc',
        element: function() {
            return $this;
        },
        btnCheckAll: function() {
            return this.element().find('.js-check-all');
        },
        btnCheckNone: function() {
            return this.element().find('.js-check-none');
        },
        btnInvert: function() {
            return this.element().find('.js-check-invert');
        },
        inputSearch: function() {
            return this.element().find('input.js-input-search');
        },
        checkAll: function() {
            this.element().find('input[type="checkbox"]').prop('checked', true);
        },
        checkNone: function() {
            this.element().find('input[type="checkbox"]').prop('checked', false);
        },
        invert: function() {
            $.each(this.element().find('input[type="checkbox"]'), function() {
                $(this).prop('checked', !$(this).is(':checked'));
            });
        },
        search: function($inputSearch, event) {
            if (!$inputSearch) {
                this.element().find('.js-tpl-multiple').show();
            }
            var $list = this.element().find('.js-tpl-multiple').filter(function() {
                return $(this).find('[data-html-desc]').html().match(new RegExp($inputSearch.val(), 'i'));
            });
            this.element().find('.js-tpl-multiple').hide();
            $list.show();
        },
        init: function() {
            this.element().append($('.js-componentes .js-tpl-multiple-component').clone());

            var opt = this;
            this.btnCheckAll().click(function() {
                opt.checkAll();
            });
            this.btnCheckNone().click(function() {
                opt.checkNone();
            });
            this.btnInvert().click(function() {
                opt.invert();
            });
            this.inputSearch().keyup(function(event) {
                opt.search($(this), event);
            });
            var colecao = eval(this.element().attr('data-colecao'));
            var $clone = $('.templates .js-tpl-multiple');
            $clone.find('input[type=checkbox]').attr('name', $this.attr('data-name') + '[]');
            this.element().find('.lista-checks').iterar($clone, colecao, true);
        }
    }, options)
    options.init();
};
$.fn.contadorDeTexto = function(config) {
    var options = $.extend({
        'limite': $(this).attr('data-limite') || 3000
    }, config);
//    var $div = $('<div>Limite de caracteres <span></span></div>',{'style':'display:none'});
    var $div = $('<div style="display:none">Limite de caracteres <span></span></div>');
    $(this).data('div', $div);
    $(this).after($div);
    $(this).blur(function() {
        $(this).val($(this).val().substring(0, parseInt(options.limite)));
        $(this).data('div').hide();
    }).on('paste', function() {
        $(this).data('div').find('span').html($(this).val().length + '/' + options.limite);
        $(this).data('div').show();
        if ($(this).val().length > parseInt(options.limite) - 1) {
            var $this = $(this);
            setTimeout(function() {
                $this.val($this.val().substring(0, parseInt(options.limite)));
            }, 0);
        }
    }).on('focus', function() {
        $(this).data('div').find('span').html($(this).val().length + '/' + options.limite);
        $(this).data('div').show();
    }).on('keypress', function(event) {
        if (event.keyCode === 9 || event.keyCode === 8) {
            $(this).data('div').find('span').html(($(this).val().length - 1) + '/' + options.limite);
            return true;
        }
        if ($(this).val().length > parseInt(options.limite) - 1) {
            return false;
        }
        $(this).data('div').find('span').html(($(this).val().length + 1) + '/' + options.limite);
        return true;
    });
}