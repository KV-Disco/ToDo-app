console.log('Javascript ready to go...')

$('.delete').on('click', function (e) {
  console.log(e)
  var $button = $(this).siblings('button')
  var positionTodo = e.target.dataset.id

  console.log(positionTodo)

  $.ajax({
    url: '/toDoRequest/' + positionTodo,
    method: 'DELETE'
  })
  .then(data => {
    $(this).parent().remove()
    console.log(data)
  })
})

$('.done').on('click', function (e) {
  console.log(e)
  var $button = $(this).siblings('button')
  var positionTask = e.target.dataset.id

  console.log(positionTask)

  $.ajax({
    url: '/compleated/' + positionTask,
    method: 'PUT'
    data: null
  })
  .then(data => {
    $(this).parent().remove()
    console.log(data)
  })
})
