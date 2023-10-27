export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value}`;
    if (binding.modifiers.yellow) {
      iconClass += ' text-yellow-400';
    }
    if (binding.modifiers.right) {
      iconClass += ' float-right';
    }
    el.innerHTML += `<span class="card-title">Songs</span>`;
    el.innerHTML += `<i class="${iconClass}"></i>`;
  }
};
