import { Pool } from 'pg';
import pool from './dbConfig';


export const pgquery = async (text: string, params?: any[]) => {
    const client = await pool.connect();
    try {
        const res = await client.query(text, params);
        return res;
    } finally {
        client.release();
    }
};