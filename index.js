window.addEventListener('DOMContentLoaded', () => {
  axios
    .get('https://crudcrud.com/api/6d58dceeac4a4f1aab3a0e8452584164/products')
    .then((res) => {
      res.data.forEach((product) => display(product))
    })
    .catch((err) => console.log(err))
})

const form = document.querySelector('#product_form')
form.addEventListener('submit', handleFormSubmit)

function handleFormSubmit(event) {
  event.preventDefault()

  const sp = document.querySelector('#sp').value
  const product_name = document.querySelector('#product_name').value
  const category = document.querySelector('#category').value

  const product_details = {
    sp,
    product_name,
    category,
  }

  axios
    .post(
      'https://crudcrud.com/api/6d58dceeac4a4f1aab3a0e8452584164/products',
      product_details
    )
    .then((response) => display(response.data))
    .catch((err) => console.log(err))

  document.querySelector('#sp').value = ''
  document.querySelector('#product_name').value = ''
  document.querySelector('#category').value = ''
}

function display(product) {
  let ul
  if (product.category === 'electronics') {
    ul = document.querySelector('#electronic')
  } else if (product.category === 'skincare') {
    ul = document.querySelector('#skincare')
  } else {
    ul = document.querySelector('#food')
  }

  const listItem = document.createElement('li')
  listItem.className = 'lists'
  listItem.innerHTML = `Rs. ${product.sp} - ${product.product_name} - ${product.category}`

  const deleteButton = document.createElement('button')
  deleteButton.className = 'del'
  deleteButton.textContent = 'Delete Product'
  deleteButton.addEventListener('click', () => {
    deleteProduct(product._id, listItem)
  })

  listItem.appendChild(deleteButton)
  ul.appendChild(listItem)
}

function deleteProduct(productId, listItem) {
  axios
    .delete(
      `https://crudcrud.com/api/6d58dceeac4a4f1aab3a0e8452584164/products/${productId}`
    )
    .then(() => listItem.remove())
    .catch((err) => console.log(err))
}
