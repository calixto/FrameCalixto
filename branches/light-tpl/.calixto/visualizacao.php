<?php
//include_once('externas/Smarty-2.6.13/libs/Smarty.class.php');
//include_once('includeSmarty.php');
define('SMARTY_SYSPLUGINS_DIR', dirname( __FILE__ ) . '/externas/Smarty-3.1.18/libs/sysplugins/');
include_once('externas/Smarty-3.1.18/libs/Smarty.class.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_templateparser.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_nocache.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_resource_eval.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_cacheresource_keyvaluestore.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_templatelexer.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_for.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_setfilter.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_config.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_private_print_expression.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_resource_registered.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_private_registered_block.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_foreach.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_cacheresource_custom.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_templatebase.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_data.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_security.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_include_php.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_block.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_break.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_resource.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_debug.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_private_modifier.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_append.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_resource_recompiled.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_write_file.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_continue.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_private_special_variable.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_get_include_path.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_extends.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_private_object_block_function.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_resource_string.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_ldelim.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_cacheresource_file.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_cacheresource.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_function_call_handler.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_resource_file.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_resource_custom.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_include.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_resource_php.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_configfilelexer.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_private_block_plugin.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_config_source.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_config_load.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_resource_stream.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_capture.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_templatecompilerbase.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_eval.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_utility.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_template.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_configfileparser.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_smartytemplatecompiler.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_call.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_function.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_assign.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compilebase.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_if.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_resource_extends.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_private_function_plugin.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_debug.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_private_registered_function.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_filter_handler.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_private_object_function.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_resource_uncompiled.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_while.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_parsetree.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_rdelim.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_section.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_config_file_compiler.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_nocache_insert.php');
include_once('externas/Smarty-3.1.18/libs/sysplugins/smarty_internal_compile_insert.php');

/**
* Classe responsável por passar a inteligência do controle para uma tela
* @package FrameCalixto
* @subpackage visualização
*/
class visualizacao extends Smarty{
	/**
	*
	*/
	public $_cache_include_info;
	/**
	* Método Contrutor
	*/
	function __construct(){
		$tmp = definicaoPasta::temporaria();
		if(!diretorio::legivel($tmp)) throw new erroEscrita("Pasta [{$tmp}] inexistente ou sem permissão de leitura!");
		if(!diretorio::gravavel($tmp)) throw new erroEscrita("Pasta temporaria [{$tmp}] sem permissão de escrita!");
		parent::__construct();
//		$this->compile_check = true;
//		$this->debugging = false;
		$this->left_delimiter  = '«';
		$this->right_delimiter = '»';
//		$this->template_dir = '';
//		$this->compile_dir = $tmp;
//		$this->config_dir = '';

        parent::__construct();

        $this->setTemplateDir('');
        $this->setCompileDir($tmp);
        $this->setConfigDir('');
        $this->setCacheDir($tmp);
		
        $this->caching = Smarty::CACHING_OFF;
        $this->assign('app_name', 'Guest Book');
	}
	/**
	* Retorna o texto da pagina
	* @param string caminho da pagina
	* @return string
	*/
	function pegar($pagina){
		return $this->fetch($pagina);
	}
	/**
	* Mostra o conteudo da pagina
	* @param string caminho da pagina
	*/
	function mostrar($pagina = null){
		if( $pagina ) $this->display($pagina);
	}
	/**
	* Método de sobrecarga para evitar a criação de métodos repetitivos
	* @param string metodo chamado
	* @param array parâmetros parassados para o método chamado
	*/
	function __set($variavel, $parametros){
		$this->assignByRef($variavel,$parametros);
    }
	/**
	* Método de sobrecarga para evitar a criação de métodos repetitivos
	* @param string metodo chamado
	* @param array parâmetros parassados para o método chamado
	*/
	function __get($variavel){
		if(isset($this->tpl_vars[$variavel])){
			return $this->tpl_vars[$variavel]->value;
		}else{
			return false;
		}
    }/**/
}
?>
