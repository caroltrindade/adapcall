<template>
  <div>
    <table class="table table-responsive table-hover">
      <thead>
        <tr>
          <th style="width: 20%">ID</th>
          <th style="width: 20%">Solicitante</th>
          <th style="width: 40%">Solicitado</th>
          <th style="width: 20%">Ação</th>
        </tr>
      </thead>
      <!-- <tr v-show = "isLoading">
        <td colspan = 4>Carregando...</td>
      </tr> -->
      <tbody>
        <tr v-show = "ligacoes.length === 0">
          <td colspan = 4>Não há ligações cadastradas</td>
        </tr>
        <!-- v-bind:key="i" (ou apenas :key="i"): é o id da div, mas não é obrigatório, porém pode dar problema em algum caso, se não colocar-->
        <tr v-for="(ligacao, indice) in ligacoes" :key="ligacao.id">
          <td style="width: 20%">{{ligacao.id}}</td>
          <td style="width: 20%">{{ligacao.solicitante}}</td>
          <td style="width: 40%">
            {{ligacao.solicitado}}
            <span v-if="ligacao.urgente">URGENTE</span>
            <span v-else-if="!ligacao.urgente">relaxxxx</span>
          </td>
          <td style="width: 20%">
            <!-- <div v-if="isLoading[ligacao.id]">Carregando...</div> -->
            <ac-loading v-if="isLoading[ligacao.id]">Carregando...</ac-loading>
            <template v-if="!isLoading[ligacao.id]">
              <ac-button type="primary" icon="fa-edit" @click.native="editar(indice)">Editar</ac-button>
              &nbsp;
              <ac-button type="secondary" icon="fa-trash-alt" @click.native="excluir(indice)">Excluir</ac-button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['ligacoes', 'isLoading'],
  methods: {
    excluir(indice) {
      this.$emit('excluir', indice);
    },
    editar(indice) {
      this.$emit('editar', indice);
    },
  },
};
</script>

<style>
  .table-hover tbody tr:hover{
    background-color: #EFF8F7;
  }
  .table thead{
    background-color: #EFF8F7;
  }
  .table-responsive {
    display: block;
    position: relative;
    width: 100%;
  }
  .table-responsive thead,
  .table-responsive tbody,
  .table-responsive tr {
    display: block;
  }
  .table-responsive th,
  .table-responsive td {
    display: inline-block;
    text-align: center;
  }
</style>
