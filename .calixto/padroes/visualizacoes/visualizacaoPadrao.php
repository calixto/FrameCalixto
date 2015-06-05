<?php

/**
 * Classe responsável por passar a inteligência do controle para uma tela
 * Formação genérica na montagem da tela de controles padronizados
 * @package FrameCalixto
 * @subpackage visualização
 */
class visualizacaoPadrao extends visualizacao {

    /**
     * @var string Nome da classe de controle
     */
    protected $__controle;
    protected $__template;
    protected $__templateDir;

    public function pegar($pagina) {
        try {
            return parent::pegar($pagina);
        } catch (erroInclusao $erro) {
            return parent::pegar($this->__templateDir . $pagina);
        }
    }

    public function passarTemplate($template) {
        $this->__template = $template;
    }

    /**
     * Método contrutor
     * @param controle objeto de controle padronizado
     */
    function __construct(controle $controle) {
        parent::__construct();
        $this->__controle = get_class($controle);
        $this->__templateDir = DIRAPP . '/' . definicaoPasta::templates($this->__controle);
    }

    /**
     * Executa o processamento e mostra a página
     * @param string Nome do arquivo de formatação da visualização
     */
    function mostrar($pagina = null) {
//		$this->mensageria = $this->pegar(definicaoPasta::tema().'/mensageria.phtml');
        $templatePadrao = "{$this->__templateDir}/{$this->__controle}.phtml";
        $parametros = $this->pegar(definicaoPasta::tema() ."parametros.phtml");
        $template = false;
        switch (true) {
            case $pagina:
                $pagina = $this->pegar($pagina);
                $template = true;
                break;
            case $this->__template:
                $pagina = $this->pegar($this->__template . '.phtml');
                $template = true;
                break;
            default:
                $arNomeTema = explode('/', definicaoPasta::tema());
                if (!($nomeTema = array_pop($arNomeTema))) {
                    $nomeTema = array_pop($arNomeTema);
                };
                $templateTema = "{$this->__templateDir}/{$nomeTema}_{$this->__controle}.phtml";
                switch (true) {
                    case (is_file($templateTema)):
                        $pagina = $this->pegar($templateTema);
                        $template = true;
                        break;
                    case (is_file($templatePadrao)):
                        $pagina = $this->pegar($templatePadrao);
                        $template = true;
                        break;
                    default:
                        if (preg_match('/(.*)(_verEdicao|_verPesquisa)$/', $this->__controle, $resultado)) {
                            if ($resultado[2] == '_verEdicao') {
                                if (is_file(definicaoPasta::tema() . 'controlePadrao_verEdicao.phtml')) {
                                    $pagina = $this->pegar(definicaoPasta::tema() . 'controlePadrao_verEdicao.phtml');
                                    $template = true;
                                }
                            } else {
                                if (is_file(definicaoPasta::tema() . 'controlePadrao_verPesquisa.phtml')) {
                                    $pagina = $this->pegar(definicaoPasta::tema() . 'controlePadrao_verPesquisa.phtml');
                                    $template = true;
                                }
                            }
                        }
                }
                break;
        }
        if (!$template) {
            throw new erroInclusao("Template não encontrado! {$templatePadrao}");
        }
        if (controle::requisicaoAjax()) {
            echo $parametros.$pagina;
            return;
        }
        $this->conteudo = $parametros.$pagina;
        if (definicaoArquivo::pegarHtmlPadrao()) {
            echo $this->pegar(definicaoArquivo::pegarHtmlPadrao());
        } else {
            echo $this->pegar(definicaoPasta::tema() . '/pagina.phtml');
        }
    }

}
