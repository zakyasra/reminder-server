import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  public async profil({ auth }: HttpContextContract) {
    return await auth.authenticate();
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const { nama, email, password } = request.body()

    // Cek apakah email user sudah terdaftar atau belum sebelumnya
    const user = await User.query().where('email', email).first()

    if (user) {
      return response.conflict({
        message: "Email sudah terdaftar"
      })
    }

    // Menyimpan user pendaftar ke dalam database
    const userTerdaftar = await User.create({
      nama,
      email,
      password
    })

    // Generate token
    const token = await auth.use('api').generate(userTerdaftar)

    return response.ok({
      message: "Berhasil masuk",
      token
    })
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    // Lookup user manually
    const user = await User.query().where('email', email).first()

    if (!user) {
      return response.notFound({
        message: "User belum terdaftar"
      })
    }

    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized({
        message: 'Password atau Email anda salah'
      })
    }

    // Generate token
    const token = await auth.use('api').generate(user)
    return token
  }

  // get
  public async index({ }: HttpContextContract) {
    return await User.query() // query untuk ngambil data
  }

  public async create({ }: HttpContextContract) { }

  public async store({ }: HttpContextContract) { } // post

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { } // put

  public async destroy({ }: HttpContextContract) { } // delete
}
