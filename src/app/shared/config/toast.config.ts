export const toastConfig = {
  timeOut: 10000,
  positionClass: 'toast-top-right', // 'toast-top-right', 'toast-bottom-right', 'toast-bottom-left', 'toast-top-left'
  preventDuplicates: false,
  closeButton: true, // Adiciona um botão de fechar ao toast.
  extendedTimeOut: 10000, // Tempo adicional em milissegundos que o toast permanece visível após uma interação (hover).
  tapToDismiss: true, //Permite que o toast seja descartado ao clicar nele
  newestOnTop: true, //Exibe o toast mais recente no topo.
  enableHtml: true, // permite HTML no conteúdo do toast
};
