function searchFunction() {
  let input = document.getElementById('query').value.toLowerCase();
  let productList = document.getElementById('productList');
  let items = productList.querySelectorAll('li');

  if (input.trim() === "") {
    productList.style.display = "none"; // Esconde se não digitou nada
    return;
  }

  productList.style.display = "block"; // Mostra a lista se tem texto
  
  let found = false;
  items.forEach(item => {
    let text = item.textContent.toLowerCase();
    let match = text.includes(input);
    item.style.display = match ? '' : 'none';
    if (match) found = true;
  });

  // Se nada encontrado, oculta tudo
  if (!found) {
    productList.style.display = "none";
  }
}