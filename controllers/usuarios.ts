import { Request, Response } from 'express'
import Usuario from '../models/usuario';


export const getUsers = async ( req: Request, res: Response ) => {
    const usuarios = await Usuario.findAll();
    return res.json({ usuarios });
}

export const getUser = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk( id );

    if( !usuario ) return res.status(404).json({msg: 'El id ingresado no corresponde a ningun usuario'});

    return res.json({ usuario });
}

export const postUser = async ( req: Request, res: Response ) => {
    const { body} = req;
    try {
        const emailExist = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if( emailExist ) return res.status(404).json({msg: 'El email ingresado ya existe'});

        const usuario = await Usuario.create( body );

        res.json({ usuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putUser = async ( req: Request, res: Response ) => {
    const { body} = req;
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk( id );
        if( !usuario ) return res.status(404).json({msg: 'El usuario no existe'});

        await usuario.update( body );

        res.status(200).json({ usuario })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteUser = async ( req: Request, res: Response ) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findOne({
            where: {
                estado: true,
                id
            }
        });

        if( !usuario ) return res.status(404).json({msg: 'El usuario que intenta borrar no existe o ya fue borrado'});
        // !Este metodo borra de forma permanente en bbdd
        // await usuario.destroy();
        
        await usuario.update({ estado: false });
        res.status(200).json({ usuario })
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
