<template>
  <div class="home">
    <!-- Aqui são passados as props e métodos -->
    <div v-show="errorMessage" class="error alert alert-danger">{{errorMessage}}</div>

    <tr v-show = "isLoading.list">
      <td colspan = 4>Carregando Lista...</td>
    </tr>
    <div v-show = "!isLoading.list">

      <!-- () =>: É uma Arrow function, não tem escopo, acessa todas as variáveis globais (que não estão no export Default) dessa instância do vue -->
      <button @click="() => mostraFormulario = !mostraFormulario" class="btn btn-primary"> Mostrar formulário</button>
      <!-- ":": É um bind, serve para passar o valor de uma variável para um atributo (lá no outro arquivo o atributo vira uma prop, o outro arquivo recebe um atributo e transforma em uma prop)
      @: É um evento, está esperando o evento ocorrer para chamar algo
      -->
      <div v-show = "isLoading.form">Carregando Formulário (salvando)...</div>
      <div v-show = "!isLoading.form">
        <FormLigacao
        v-if="mostraFormulario"
        :ligacao="ligacao"
        :ligacoes="ligacoes"
        :error-message="errorMessage"
        @setar-lista="setarListar"
        @inserir-lista="inserirLista"
        @atualizar-lista="atualizarLista"
        @fechar="resetarFormulario"
        />
      </div>

      <!-- :ligacoes: o bid passa o valor da prop pro componente (que está esperando lá no componente) -->
      <!-- Pode pasar os parâmetros no método excluir, mas tem que ter as variáveis neste contexto,
      ou pode apenas referenciar o método e ele irá receber todos os parâmetros que tiver -->
      <!-- is-loading: é Kebab case, antes de todas as letras maiúsculas tem que separar por "-" -->
      <Ligacoes
        :ligacoes="ligacoes"
        :is-loading="isLoading"
        @excluir="excluir"
        @editar="editar"

      />
      <!-- @click="": é o On click do HTML
      <input type="button"
        @click="criarLigacao()"
        value="Criar Ligação"
      >
      -->
    </div>
  </div>
</template>

<script>
// Importa o componente Ligacoes
// Não é obrigatório colocar a estensão do arquivo, o webpackage busca no local e se vira para saber a extensão
import Ligacoes from '../components/Ligacoes.vue';
import FormLigacao from '../components/FormLigacao.vue';

// Exporta o objeto de configuração deste componente (App.vue), tudo que tem .vue é um componente (Single File Component)
// É legal colocar vírgula até a última propriedade do objeto por boas práticas
export default {
  // Quando a chave e o valor são iguais, não é necessário fazer "Ligacoes: Ligacoes", pode colocar só Ligacoes
  // Quando for diferente,: LigacoesARealizar: Ligacoes, então no template chama </LigacoesARealizar>
  components: {
    Ligacoes,
    FormLigacao,
  },
  // data: retorna os dados/objetos utilizados
  data() {
    return {
      ligacao: '',
      ligacoes: '',
      mostraFormulario: false,
      isLoading: {},
      errorMessage: '',
      /* ligacoes: [
        {
          id: 1,
          solicitante: 'Carol',
          solicitado: 'Luis - AMC',
          urgente: false,
        },
        {
          id: 2,
          solicitante: 'Marcio',
          solicitado: 'Fernando - AMC',
          urgente: true,
        },
      ], */
    };
  },
  // o axios retorna uma promisse (uma promesa de algo), usa o async e await, para não utilizar .then e .catch
  // callback, async, await - estudar
  async mounted() {
    // this.isLoadingList = true;

    // try {
    //   const res = await axios.get('https://5e3589a4f7e55d0014ad4dc7.mockapi.io/ligacoes');
    //   if (Array.isArray(res.data)) this.ligacoes = res.data;
    // } catch (err) {
    //   console.erro(err);
    // } finally {
    //   this.isLoadingList = false;
    // }

    this.getList();
  },
  methods: {
    setarListar(valor) {
      this.ligacoes = valor;
    },
    async getList() {
      const res = await this.request({ id: 'list' });

      if (res && Array.isArray(res.data)) this.ligacoes = res.data;
    },
    async request({ id, ...requestParams } = {}) {
      if (this.isLoading[id]) return;

      this.$set(this.isLoading, id, true);
      this.errorMessage = '';

      try {
        // Faz direto: const res = await axios.post('https://5e3589a4f7e55d0014ad4dc7.mockapi.io/ligacoes', ligacao);

        const res = await axios({
          method: 'GET',
          url: 'https://5e3589a4f7e55d0014ad4dc7.mockapi.io/ligacoes',
          ...requestParams,
        });
        
        this.resetarFormulario();

        // eslint-disable-next-line consistent-return
        return res;
      } catch (err) {
        // console.error(err);
        this.errorMessage = err.response.data;
      } finally {
        this.$set(this.isLoading, id, false);
      }
    },
    // this.ligacoes.push: Adiciona um objeto ao array
    async inserirLista(ligacao) {
      // const res = await axios.post('https://5e3589a4f7e55d0014ad4dc7.mockapi.io/ligacoes', ligacao);

      const res = await this.request({
        id: 'form',
        method: 'POST',
        url: 'https://5e3589a4f7e55d0014ad4dc7.mockapi.io/ligacoes',
        data: ligacao,
      });

      if (res && res.status === 201) {
        // Só coloca na lista se não der erro
        this.ligacoes.push(res.data);
      }
    },
    async excluir(indice) {
      const { id } = this.ligacoes[indice];

      // await: vai esperar uma resposta
      const res = await this.request({
        id,
        method: 'DELETE',
        url: `https://5e3589a4f7e55d0014ad4dc7.mockapi.io/ligacoes/${id}`, 
      });

      if (res && res.status === 200) {
        this.ligacoes.splice(indice, 1);
      }

      // if (this.isLoading[id]) return;
      // // poderia utilizar: this.isLoading[id] = true;
      // // this.$set: seta reativamente algo na lista, cria getters e setters, pois quando utilize só aquele acima, o vue não sabe se é reativo ou não
      // this.$set(this.isLoading, id, true);

      // try {

      //   const res = await axios.delete(`https://5e3589a4f7e55d0014ad4dc7.mockapi.io/ligacoes/${id}`);
      //   // if (Array.isArray(res.data)) this.ligacoes = res.data;

      //   if (res && res.status === 200) {
      //     this.ligacoes.splice(indice, 1);
      //   }

      // } catch (err) {
      //   // console.error(err);
      //   this.errorMessage = err.response.data;
      // } finally {
      //   this.$set(this.isLoading, id, false);
      // }
    },
    editar(indice) {
      // Método que escuta o botão de editar do componente Ligações
      // Atribui ao objeto ligacao os dados da posição "indice" de ligações
      // this: significa uma instância do vue
      // para isso precisa ter a variável ligacao neste arquivo
      this.ligacao = this.ligacoes[indice];

      this.mostraFormulario = false;

      // Como acabamos de atualizar o mostraFormulario para false, o vue está renderizando para false o formulário
      // Então, ele não vai atualizar para true logo depois, pois ele ainda nem finalizou a renderização do false
      // this.$nextTick: Depois que executar a última instrução, realiza o que está especificado na arrowFunction
      this.$nextTick(() => {
        this.mostraFormulario = true;
      });
    },
    async atualizarLista(ligacao) {
      const res = await this.request({
        id: 'form',
        method: 'PUT',
        url: `https://5e3589a4f7e55d0014ad4dc7.mockapi.io/ligacoes/${ligacao.id}`,
        data: ligacao,
      });
        // if (Array.isArray(res.data)) this.ligacoes = res.data;
      if (res.status === 200) {
        // l => ligacao.ind === l.id: É um for, busca o indíce igual ao indice da ligacao (essa função é um callback)
        const indice = this.ligacoes.findIndex(l => ligacao.id === l.id);
        this.ligacoes.splice(indice, 1, ligacao);
      }
    },
    resetarFormulario() {
      this.mostraFormulario = false;
      this.ligacao = '';
    },
  },
};
</script>

<style>
  /* style scoped: define que apenas o home pode usar os styles, se não for scoped, os componentes podem usar  */
  .error{
    color:tomato;
    border-color: red;
  }
</style>
