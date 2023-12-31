"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = __importDefault(require("pg"));
require("dotenv/config");
function client() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.default.Client({
            host: process.env.HOST_DB_PG,
            port: parseInt(process.env.HOST_DB_PG_HOST),
            user: process.env.USER_DB_PG,
            password: process.env.USER_PASSWORD_DB_PG,
            database: process.env.DB_PG,
        });
        yield client.connect();
        return client;
    });
}
exports.client = client;
