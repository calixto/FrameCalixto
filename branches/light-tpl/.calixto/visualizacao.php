<?php

/**
 * Classe responsável por passar a inteligência do controle para uma tela
 * @package FrameCalixto
 * @subpackage visualização
 */
class visualizacao {

	protected $__vars = [];

	/**
	 * Método Contrutor
	 */
	function __construct() {
		
	}

	/**
	 * Retorna o texto da pagina
	 * @param string caminho da pagina
	 * @return string
	 */
	function pegar($pagina) {
		if (arquivo::legivel($pagina)) {
			extract($this->__vars);
			ob_start();
			include $pagina;
			$flush = ob_get_contents();
			ob_end_clean();
			return $flush;
		}
	}

	/**
	 * Mostra o conteudo da pagina
	 * @param string caminho da pagina
	 */
	function mostrar($pagina = null) {
		if (!$pagina)
			return;
		echo $this->pegar($pagina);
	}

	/**
	 * Método de sobrecarga para evitar a criação de métodos repetitivos
	 * @param string metodo chamado
	 * @param array parâmetros parassados para o método chamado
	 */
	function __set($variavel, $parametros) {
		$this->__vars[$variavel] = $parametros;
	}

	/**
	 * Método de sobrecarga para evitar a criação de métodos repetitivos
	 * @param string metodo chamado
	 * @param array parâmetros parassados para o método chamado
	 */
	function __get($variavel) {
		if (isset($this->__vars[$variavel])) {
			return $this->__vars[$variavel];
		} else {
			return false;
		}
	}

/**/
}

?>
