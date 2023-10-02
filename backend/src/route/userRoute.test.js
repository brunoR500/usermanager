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
const supertest_1 = __importDefault(require("supertest"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const userRoute_1 = __importDefault(require("../route/userRoute"));
describe("Simple test API - CRUD", () => {
    var appServer;
    var id = 0;
    beforeAll(() => {
        const app = (0, express_1.default)();
        app.use((0, helmet_1.default)());
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(userRoute_1.default);
        const PORT = 3002;
        appServer = app.listen(PORT, () => {
            console.log(`Application started on port ${PORT}!`);
        });
    });
    afterAll(() => {
        appServer.close();
    });
    it("dummy test", () => {
        const d_string = "tests";
        expect(d_string).toBe("tests");
    });
    it("POST /users - Create new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const rUser = `jestBE_test01`;
        const res = yield (0, supertest_1.default)(appServer).post("/users").send({
            user_name: rUser,
            first_name: "jestF",
            last_name: "jestL",
            birthday: "2023-01-17",
            last_login: "2023-01-17",
            email: "jest@mobx.ed",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Created");
        // console.log = jest.fn();
        // log(res.body.message);
    }));
    it("GET /users - Get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(appServer).get("/users");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        id = res.body.at(-1).id;
    }));
    it("UPDATE /users/:id - Update an user", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = `NEW_jestBEP${Math.floor(Math.random() * 100000)}`;
        const res = yield (0, supertest_1.default)(appServer).put(`/users/${id}`).send({
            user_name: newUser,
            first_name: "jestF",
            last_name: "jestL",
            birthday: "2023-01-18",
            last_login: "2023-01-18",
            email: "jest@mobx.de",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Updated");
    }));
    it("DELETE /users/:id - Delete the user with id: 1", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(appServer).delete(`/users/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Deleted");
    }));
});
