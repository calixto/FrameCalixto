<?php
/**
* Classe de representação de uma conexão com Banco de Dados
* @package Infra-estrutura
* @subpackage Banco de Dados
*/
abstract class conexao extends objeto{
	/**
	* O recurso de conexão com Banco de Dados
	* @var [resource]
	*/
	public $conexao;
	/**
	* O ponteiro do recurso com o resultado do comando
	* @var [resource]
	*/
	public $cursor;
	/**
	* String de conexao
	* @var [string]
	*/
	protected $strConn;
	/**
	* Método construtor
	* Faz a chamada de validação de acesso ao controle
	*/
	abstract function __construct();
	/**
	* Cria uma Conexao com Banco de Dados
	* @param [st] Servidor do Banco de dados
	* @param [st] Porta do servidor do Banco de dados
	* @param [st] Nome do Banco de dados
	* @param [st] Usuário do Banco de dados
	* @param [st] Senha do Banco de dados
	* @return [conexao] conexão com o banco de dados
	*/
	public static final function criar($servidor = null, $porta = null, $banco = null, $usuario = null, $senha = null){
		$servidor	= $servidor	?	$servidor	:	definicaoBanco::pegarServidor();
		$porta		= $porta	?	$porta		:	definicaoBanco::pegarPorta();
		$banco		= $banco	?	$banco		:	definicaoBanco::pegarNome();
		$usuario	= $usuario	?	$usuario	:	definicaoBanco::pegarUsuario();
		$senha		= $senha	?	$senha		:	definicaoBanco::pegarSenha();
 		$multipla	= definicaoBanco::conexaoMultipla();
		if($multipla){
			switch(definicaoBanco::pegarTipo()){
				case 'postgres':
					$conexao = new conexaoPadraoMultiplaPG($servidor, $porta, $banco, $usuario, $senha);
				break;
				case 'mysql':
					$conexao = new conexaoPadraoMultiplaMySql($servidor, $porta, $banco, $usuario, $senha);
				break;
				case 'oracle':
					$conexao = new conexaoPadraoMultiplaOCI($servidor, $porta, $banco, $usuario, $senha);
				break;
				default:
					$conexao = false;
			}
		}else{
			switch(definicaoBanco::pegarTipo()){
				case 'postgres':
					$conexao = conexaoPadraoPG::conectar($servidor, $porta, $banco, $usuario, $senha);
				break;
				case 'mysql':
					$conexao = conexaoPadraoMySql::conectar($servidor, $porta, $banco, $usuario, $senha);
				break;
				case 'oracle':
					$conexao = conexaoPadraoOCI::conectar($servidor, $porta, $banco, $usuario, $senha);
				break;
				default:
					$conexao = false;
			}
		}
		return $conexao;
	}
}
?>