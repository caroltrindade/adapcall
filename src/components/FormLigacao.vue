<template>
  <div>
    <!-- .prevent: é um modificador que previne que vá até o servidor e atualize a página (para que ela não seja recarregada todo submit) -->
    <!-- Interpolação: {{}}}, oega tudo qo que tem na variável e exibe -->
    <!-- @: É para escutar um emit do pai -->
    <form @submit.prevent="salvarLigacao()" class="m-2">
      <div style="text-align: right" size="100%">
        <ac-button type="primary" @click.native.prevent="fechar">Fechar</ac-button>
      </div>
      <!-- Para exibir o objeto da ligação: {{formLigacao}} -->
      <div v-if="editando"></div>
      <!-- :class="{'error': errorMessage}": vai acionar a classe error se o errorMessage tiver algo -->
      <fieldset :class="{'error': errorMessage}" class="form-group">
        <legend :class="{'error': errorMessage}">
          {{ editando ? `Você está editando a ligação ${ formLigacao.id }` : "Criar ligação"}}
          </legend>

        <!-- A mensagem fica no Home <div v-show="errorMessage" class="error">{{errorMessage}}</div> -->
        <div class="form-row align-items-center">
          <div class="col">
            <label>
              Solicitante
              <input type="text" class="form-control" size="100%" v-model="formLigacao.solicitante" required />
              <!-- v-model: vincula o objeto (ou a propriedade do objeto) ao input -->
            </label>
          </div>
          <div class="col m-2">
            <label>
              Solicitado
              <input type="text" class="form-control" size="100%" v-model="formLigacao.solicitado" required />
            </label>
          </div>
          <div class="col m-2">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="customCheck" v-model="formLigacao.urgente" />
              <label class="custom-control-label" for="customCheck">Urgente</label>
            </div>
          </div>
        </div>
        <!-- <button v-show="editando" type="submit">Salvar alterações</button> -->
        <!-- <button v-show="!editando" type="submit">Criar ligação</button> -->
        <!-- Pode fazer da maneira acima ou abaixo: -->
        <!-- Ternário (? :): um if abreviado -->
        <br/>
        <ac-button type="submit" class="btn btn-primary">{{ editando ? "Salvar alterações" : "Criar ligação"}}</ac-button>
        &nbsp;
        <ac-button type="primary" @click.native="apagarLista" class="btn btn-primary">Apagar lista</ac-button>
        &nbsp;
        <ac-button type="primary" @click.native="cancelar" class="btn btn-primary">Cancelar</ac-button>
      </fieldset>
    </form>
  </div>
</template>

<script>
// var é má pratica, ela instancia todas as variaveis criadas como "var" no scopehoisting , let e const instanciam as variáveis apenas quando a função é chamada
const novaLigacao = {
  id: '',
  solicitante: '',
  solicitado: '',
  urgente: false,
};

export default {
  props: ['ligacoes', 'ligacao', 'errorMessage'],
  data() {
    return {
      // Mesmo que instancie formLigacao no ounted, tem que colocar no data para ter a variável
      formLigacao: { ...novaLigacao },
      editando: false,
    };
  },
  // mounted: é um hoock do ciclo de vida do vue, é depois da montagem da estrutura do virtual DOM
  // Ele só é chamado quando um componente é criado (quando aparece num v-if, quando um componente chama ele, quando um router chama ele)
  // Sendo assim, depois que ele montar ele não monta de novo, tem que simbolizar para ele que tem que montar novamente
  mounted() {
    // Verifica se o objeto é alguma coisa (se não é null, undefined, o npumero 0, etc)
    if (this.ligacao) {
      this.formLigacao = { ...this.ligacao }
      this.editando = true;
    } else {
      this.editando = false;
      this.formLigacao = { ...this.novaLigacao };
    }
  },
  /* computed: São variáveis que são uma função, não é um método (nã da pra executar) e não é uam variável simples
  // Essas variáveis não são chamadas em nenhum lugar, a não ser que é alterado o valor da variável/função
  computed: {
    getIcon() {
      console.log('computed');
      if (this.editando) return 'fa-trash';
      if (this.formligacao.urgente) return 'fa-cross';

      return 'fa plus';
    },
  },
  */
  // ...novaLigacao: cria um clone do objeto
  methods: {
    salvarLigacao() {
      // Quando clona o objeto ligação (...this.ligacao, ele pega tudo do objeto e joga pro objeto ligacoes), você pode sobrescrever uma propriedade dele, como o id ou solicitante, etc
      const ligacaoAInserir = { ...this.formLigacao };

      // Criar ligação
      if (!this.editando) {
        this.$emit('inserir-lista', ligacaoAInserir);
      }
      // Alterar ligação
      else {
        this.$emit('atualizar-lista', ligacaoAInserir);
      }

      // Limpando o formulário
      // this.formLigacao = { ...this.novaLigacao };
    },
    apagarLista() {
      this.$emit('setar-lista', []);
    },
    cancelar() {
      this.formLigacao = { ...this.novaLigacao };
      this.editando = false;
    },
    fechar() {
      this.$emit('fechar');
    },
  },
};
</script>

<style>
  .error{
    color: tomato;
    border-color: red;
  }
</style>
