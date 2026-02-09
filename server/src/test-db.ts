import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import util from 'util';

const logFile = path.resolve(__dirname, '../debug_output_v3.txt');
const logStream = fs.createWriteStream(logFile, { flags: 'w' });

function log(message: string) {
    console.log(message);
    logStream.write(message + '\n');
}

function logError(message: string, error?: any) {
    console.error(message);
    logStream.write('ERROR: ' + message + '\n');
    if (error) {
        logStream.write(util.inspect(error, { showHidden: true, depth: null }) + '\n');
    }
}

function exit(code: number) {
    logStream.end(() => {
        process.exit(code);
    });
}

// Explicitly load .env.test
const envPath = path.resolve(__dirname, '../.env.test');
log(`Loading env from: ${envPath}`);
dotenv.config({ path: envPath });

const uri = process.env.MONGODB_URI;
log(`URI found: ${uri ? "Yes" : "No"}`);

if (!uri) {
    logError("MONGODB_URI is undefined!");
    exit(1);
}

log("Attempting to connect...");

mongoose.set('debug', (collection: any, method: any, query: any, doc: any) => {
    log(`Mongoose Debug: ${collection}.${method}`);
});

mongoose.connect(uri)
    .then(() => {
        log("SUCCESS: Connected to MongoDB!");
        exit(0);
    })
    .catch((err) => {
        logError("Connection failed!", err);
        exit(1);
    });
