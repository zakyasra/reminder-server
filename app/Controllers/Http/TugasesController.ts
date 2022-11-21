import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tugas from 'App/Models/Tugas'

export default class TugasesController {
    public async index({ request, auth }: HttpContextContract) {

        const user = await auth.authenticate()

        const { search } = request.qs()
        if (search) {
            return await Tugas.query().where("deskripsi", "like", `%${search}%`).andWhere("user_id", user.id)
        }
        return await Tugas.query().preload("user").where('userId', user.id);
    }

    public async store({ request, response, auth }: HttpContextContract) {
        const user = await auth.authenticate()
        const { deadline, deskripsi } = request.body()

        const tugas = await Tugas.create({
            deadline,
            deskripsi,
            userId: user.id,
        })

        if (tugas) {
            return response.ok({
                message: "Data Berhasil diBuat"
            })
        }

        return response.badRequest({
            message: "Data Tidak Berhasil diBuat"
        })
    } // post


    public async update({ request, response, auth, params: { id } }: HttpContextContract) {
        const user = await auth.authenticate()
        const { deadline, deskripsi } = request.body()

        const cek = await Tugas.query().where('id', id).andWhere('user_id', user.id).first()

        if (!cek) {
            return response.forbidden({
                message: 'kamu siapa?'
            })
        }

        const tugas = await Tugas.query().where('id', id).update({
            deadline,
            deskripsi,
            userId: user.id,
        })

        if (tugas) {
            return response.ok({
                message: "Data Berhasil diUpdate"
            })
        }

        return response.badRequest({
            message: "Data Tidak Berhasil diUpdate"
        })
    } // put

    public async destroy({ params: { id }, response, auth }: HttpContextContract) {
        const user = await auth.authenticate()
        const cek = await Tugas.query().where('id', id).andWhere('userId', user.id).first()

        if (!cek) {
            return response.forbidden({
                message: 'lu siapa ajgg'
            })
        }
        const hapus = await Tugas.query().where("id", id).delete()
        if (hapus) {
            return response.ok({
                message: "Tugas berhadil dihapus"
            })

        }
        return response.badRequest({
            message: "Data Tidak Berhasil diUpdate"
        })

    } // delete
}
