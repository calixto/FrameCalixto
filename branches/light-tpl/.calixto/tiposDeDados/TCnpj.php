<?php
/**
* Classe de reprensação de arquivo
* Esta classe representa numerico no formato de CNPJ
* @package FrameCalixto
* @subpackage tipoDeDados
*/
class TCnpj extends TDocumentoPessoal{
	/**
	* Método de validação
	*/
	public function validar(){
		if(strlen($this->numero) != 11){throw("CNPJ inválido!");}
	}
	/**
	* Método de sobrecarga para printar a classe
	* @return string texto de saída da classe
	*/
	public function __toString(){
		if(!$this->numero) return '';
		$tamanho = strlen($this->numero);
		$res = '';
		$j = 0 ;
		for($i = $tamanho -1; $i >= 0; $i--){
			$j++;
			if($j == 15){ break; }
			$res = $this->numero{$i}.$res;
			if($j == 2){ $res = '-'.$res; }
			if($j == 6){ $res = '/'.$res; }
			if($j == 9){ $res = '.'.$res; }
			if($j == 12){ $res = '.'.$res; }
		}
		return $res;
	}
}
?>