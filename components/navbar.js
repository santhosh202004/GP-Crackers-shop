document.currentScript.insertAdjacentHTML('beforebegin', `
<nav id="mainNavbar" class="navbar navbar-expand-lg navbar-transparent">
  <div class="container">
    <a class="navbar-brand" href="index.html">
      <img src="assets/images/logo-bg-removed2.png" alt="GP Crackers" class="nav-logo" height="100">
    </a>
    <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu"
      aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="toggler-icon"></span>
      <span class="toggler-icon"></span>
      <span class="toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarMenu">
      <ul class="navbar-nav align-items-center gap-1">
        <li class="nav-item">
          <a class="nav-link" href="index.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="about.html">About Us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="products.html">Products</a>
        </li>
        <li class="nav-item ms-2">
          <a class="nav-link" href="contact.html">Contact Us</a>
        </li>
        <li class="nav-item ms-3">
          <a class="nav-link position-relative" href="cart.html" id="cart-nav-link">
            <i class="bi bi-cart3 fs-5"></i> Cart
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cart-item-count" style="display: none; font-size: 0.65rem;">
              0
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`);
