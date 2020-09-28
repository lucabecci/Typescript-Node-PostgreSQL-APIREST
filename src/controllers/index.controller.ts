import { Request, Response } from 'express'
import {QueryResult} from 'pg'

import pool from '../database/connection'

//get users
export const getUsers = async(req: Request, res: Response): Promise<Response> => {
    try{
        const queryAll: string = 'SELECT * FROM users';
        const response: QueryResult = await pool.query(queryAll);
        return res.status(200).json(<object> response.rows)
    }
    catch(e){
        console.log(e)
        return res.status(500).json(<string>'internal server error')
    }
}
//user by id
export const getUserByID = async(req: Request, res: Response): Promise<Response> => {
    try{
        const id: number = parseInt(req.params.id);
        const queryID: string = 'SELECT * FROM users WHERE id = $1';
        const response: QueryResult = await pool.query(queryID, [id]);
        if(response.rows.length < 1){
            return res.status(200).json({
                message: <string> 'ID NOT FOUND, TRY OTHER ID'
            })
        }
        return res.status(200).json(<object> response.rows);
    }
    catch(e){
        console.log(e);
        return res.status(500).json(<string> 'INTERNAL SERVER ERROR') 
    }
}
//create user
export const createUser = async(req: Request, res: Response): Promise<Response> => {
    try{
        const {name, email} = req.body;
        const queryCreate: string = 'INSERT INTO users (name, email) VALUES ($1, $2)';
        //check all camps
        const checkEmail: boolean = /@/.test(email);
        if(name. length < 3 || checkEmail === false){
            return res.status(200).json('Camp name or email invalid, try again with others credentials');
        }
        const response: QueryResult = await pool.query(queryCreate, [name, email]);
        return res.status(200).json({
            message: <string> 'User Created',
            userCreated: <number> response.rowCount
        }) ;
    }
    catch(e){
        console.log(e);
        return res.status(500).json('INTERNAL SERVER ERROR')
    }

}
//delete user
export const deleteUser = async(req: Request, res: Response): Promise<Response> => {
    try{
        const id:number = parseInt(req.params.id)
        const queryDelete:string = 'DELETE FROM users WHERE id = $1';
        const response: QueryResult = await pool.query(queryDelete, [id]);
        return res.status(200).json({
            message: <string> 'USER DELETED SUCCESSFOLY',
            eliminate: <number> response.rowCount
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json(<string> 'INTERNAL SERVER ERROR')
    }
}
//update user
export const updateUser = async(req: Request, res: Response): Promise<Response> => {
    try{
        const id: number = parseInt(req.params.id);
        const {name, email}: (string|any) = req.body;
        //check all camps
        const checkEmail: boolean = /@/.test(email);
        if(name. length < 3 || checkEmail === false){
            return res.status(200).json('Camp name or email invalid, try again with others credentials');
        }
        const queryUpdate: string = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';
        const response: QueryResult = await pool.query(queryUpdate, [name, email, id]);
        //check user id found
        if(response.rowCount < 1) {
            return res.status(200).json({
                error:<string> 'USER ID INVALID'
            })
        }
        return res.status(200).json({
            message: <string> 'USER UPDATE SUCCESSFULY',
            userUpdated: <number> response.rowCount
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json('INTERNAL SERVER ERROR')
    }
}

