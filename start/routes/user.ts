import Route from '@ioc:Adonis/Core/Route'

Route.get('user/profile', 'UsersController.profil')
Route.post('user/login', 'UsersController.login')
Route.post('user/register', 'UsersController.register')
Route.resource('user', 'UsersController').apiOnly()