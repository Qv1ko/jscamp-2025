class DevJobsAvatar extends HTMLElement {
  constructor() {
    super(); // Llamar al constructor de HTMLElement

    this.attachShadow({ mode: "open" });
  }

  createUrl(service, username) {
    return `https://unavatar.io/${service}/${username}`;
  }

  render() {
    const service = this.getAttribute("service") ?? "github";
    const username = this.getAttribute("username") ?? "qv1ko";
    const size = this.getAttribute("size") ?? "32";

    const url = this.createUrl(service, username);

    this.shadowRoot.innerHTML = `
      <style>
        .avatar {
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
        }
      </style>
      <img src="${url}" alt="Avatar de ${username}" class="avatar">
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("devjobs-avatar", DevJobsAvatar);
