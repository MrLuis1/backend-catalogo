import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos';

import { deleteUser,
         getUser,
         getUsers,
         postUser,
         putUser } from '../controllers/usuarios';
         
const router = Router();

/* 
  @param validarCampos => Valida posibles errores con express-validator y los retorna
  TODO: Aplicar validaciones con los check y crear middlewares necesarios para validar todos los datos de entrada
*/ 


router.get('/', getUsers);

router.get('/:id', [
  check('id', 'El id es un campo requerido'),
  validarCampos
], getUser);

router.post('/', postUser);

router.put('/:id',[
  check('id', 'El id es un campo requerido'),
  validarCampos
], putUser);

router.delete('/:id',[
  check('id', 'El id es un campo requerido'),
  validarCampos
], deleteUser);


export default router;