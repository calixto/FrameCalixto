<?php
/**
* Classe responsável por passar a inteligência do controle para uma tela
* Formação genérica na montagem da tela de controles padronizados
* @package FrameCalixto
* @subpackage visualização
*/
class visualizacaoPadrao extends visualizacao{
	/**
	* @var string Nome da classe de controle
	*/
	protected $controle;
    protected $template;

    public function passarTemplate($template){
       
        $this->template = $template;
    }
	/**
	* Método contrutor
	* @param controle objeto de controle padronizado
	*/
	function __construct(controle $controle){
		parent::__construct();
		$this->controle = get_class($controle);
        $this->setTemplateDir(definicaoPasta::templates($this->controle));
	}
	/**
	* Executa o processamento e mostra a página
	* @param string Nome do arquivo de formatação da visualização
	*/
	function mostrar($pagina = null){
		$tmp = $this->getTemplateDir();
		$this->setTemplateDir(DIRAPP);
		$this->mensageria = $this->pegar(definicaoPasta::tema().'/mensageria.html');
		$this->setTemplateDir($tmp);
		$template = false;
        switch(true){
            case $pagina:
                $pagina = $this->pegar($pagina);
				$template = true;
            break;
            case $this->template:
                $pagina = $this->pegar($this->template.'.html');
				$template = true;
            break;
            default:
				$arNomeTema = explode('/',definicaoPasta::tema());
				if(!($nomeTema = array_pop($arNomeTema))){$nomeTema = array_pop($arNomeTema);};
				switch(true){
					case (is_file($this->getTemplateDir()[0].$nomeTema.'_'.$this->controle.'.html')):
		    			$pagina = $this->pegar($nomeTema.'_'.$this->controle.'.html');
						$template = true;
					break;
					case (is_file($this->getTemplateDir()[0].$this->controle.'.html')):
		    			$pagina = $this->pegar($this->controle.'.html');
						$template = true;
					break;
					default:
						if (preg_match('/(.*)(_verEdicao|_verPesquisa)$/', $this->controle, $resultado)) {
							$this->setTemplateDir(definicaoPasta::tema());
							if($resultado[2] == '_verEdicao'){
								if(is_file($this->getTemplateDir()[0].'controlePadrao_verEdicao.html')){
									$pagina = $this->pegar('controlePadrao_verEdicao.html');
									$template = true;
								}
							}else{
								if(is_file($this->getTemplateDir()[0].'controlePadrao_verPesquisa.html')){
									$pagina = $this->pegar('controlePadrao_verPesquisa.html');
									$template = true;
								}
							}
						}
				}
			break;
        }
		if(!$template){
			throw new erroInclusao("Template não encontrado! ./{$this->getTemplateDir()[0]}{$this->controle}.html");
		}
        if(controle::requisicaoAjax()) {
            echo $pagina;
            return;
        }
		$this->pagina = $pagina;
		$this->setTemplateDir(DIRAPP);;
		if(definicaoArquivo::pegarHtmlPadrao()) {
			echo $this->pegar(definicaoArquivo::pegarHtmlPadrao());
		}else{
			echo $this->pegar(definicaoPasta::tema().'/pagina.html');
		}
	}
	/**
	* Executa o processamento e mostra a página
	* @param string Nome do arquivo de formatação da visualização
	*/
	function mostrarParaAjax($pagina = null){
        $this->mostrar($pagina);
	}
}
?>
