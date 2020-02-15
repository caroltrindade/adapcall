<template>
  <div>
    <table class="table table-striped">
      <thead class="">
        <tr>
          <th>ID</th>
          <th>Solicitante</th>
          <th>Solicitado</th>
          <th></th>
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
          <td>{{ligacao.id}}</td>
          <td>{{ligacao.solicitante}}</td>
          <td>
            {{ligacao.solicitado}}
            <span v-if="ligacao.urgente">URGENTE</span>
            <span v-else-if="!ligacao.urgente">relaxxxx</span>
          </td>
          <td>
            <div v-if="isLoading[ligacao.id]">Carregando...</div>

            <template v-if="!isLoading[ligacao.id]">
              <button @click="editar(indice)" class="btn btn-primary">Editar</button>
              <button @click="excluir(indice)" class="btn btn-primary">Excluir</button>
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
</style>
