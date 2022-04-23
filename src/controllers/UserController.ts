import { hash } from "bcrypt";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";


class UserController {


    static async create(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);

        try {
            const { name, username, password, email } = request.body;
            const existsUser = await userRepository.findOne({ username });
            if (existsUser) {
                return response.status(400).json({ error: `User ${username} already exists!` });
            }

            const passwordHash = await hash(password, 8)

            const user = userRepository.create({ name, username, password: passwordHash, email });
            await userRepository.save(user);
            response.status(201).json(user)
        } catch (error) {
            response.status(500).json({ error: error.message })
        }

    }

    static async getAll(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);

        try {
            const user = await userRepository.find()
            response.status(200).json(user)
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }

    static async getOne(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const { id } = request.params
        try {
            const user = await userRepository.findOne(Number(id))
            response.status(200).json(user)
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }

    static async update(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const { id } = request.params
        try {
            const { name, username, password, email } = request.body;
            const existsUser = await userRepository.findOne(id);
            if (!existsUser) {
                return response.status(400).json({ error: `User not found!` });
            }
            const passwordHash = await hash(password, 8)
            if (password) {
                const user = { name, username, password: passwordHash, email }
                await userRepository.update(id, user)
            } else {
                const user = request.body
                await userRepository.update(id, user)
            }

            const userUpdated = await userRepository.findOne(id);
            response.status(200).json(userUpdated)

        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }

    static async destroy(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const { id } = request.params
        try {
            const user = await userRepository.findOne(Number(id))
            if (!user) {
                return response.status(400).json({ message: `User not found!` })
            }
            await userRepository.delete(Number(id))
            response.status(200).json({ message: `User of ID ${id} deleted!` })
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }

}

export default UserController