<?php

/**
 * Classe de controle
 * Apresenta a tela de login do sistema
 * @package Sistema
 * @subpackage ControleAcesso
 */
class CControleAcesso_verLogin extends controlePadrao {

    /**
     * Método inicial do controle
     */
    public function inicial() {
        sessaoSistema::encerrar();
        $this->registrarInternacionalizacao($this, $this->visualizacao);
        $this->visualizacao->action = sprintf('?c=%s', definicaoEntidade::controle($this, 'validar'));
        $this->visualizacao->mostrar();
    }

    /**
     * Método de validação do controle de acesso
     * @return boolean resultado da validação
     */
    public function validarAcessoAoControle() {
        return true;
    }

}

?>