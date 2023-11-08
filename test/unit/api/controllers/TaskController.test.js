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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../../../../src/lib");
var supertest_1 = __importDefault(require("supertest"));
describe('Tasks Path Testing', function () {
    var app; // = new Application();
    var server;
    var task = {
        "title": "Test Task",
        "description": "Test Description",
        "creationDate": "2023-10-17",
        "dueDate": "2023-11-11",
        "assignedTo": "Ibrahim",
        "category": "Test",
        "status": "Pending"
    };
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new lib_1.Application();
                    return [4 /*yield*/, app.start()];
                case 1:
                    server = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server.close()];
                case 1:
                    _a.sent();
                    app = new lib_1.Application();
                    return [2 /*return*/];
            }
        });
    }); });
    test('should test tasks path ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app.App).get('/ncle/tasks')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.data).toEqual([]);
                    expect(response.body.result).toEqual('success');
                    return [2 /*return*/];
            }
        });
    }); });
    test('should test create new task path ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app.App).post('/ncle/task').send(task)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.data).toHaveProperty('id');
                    expect(response.body.result).toEqual('success');
                    return [2 /*return*/];
            }
        });
    }); });
    test('should test get task by id path ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, expectedTask, responseById;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app.App).post('/ncle/task').send(task)];
                case 1:
                    response = _a.sent();
                    expectedTask = response.body.data;
                    return [4 /*yield*/, (0, supertest_1.default)(app.App).get('/ncle/task/' + expectedTask.id)];
                case 2:
                    responseById = _a.sent();
                    expect(responseById.status).toBe(200);
                    expect(responseById.body.data).toEqual(expectedTask);
                    expect(response.body.result).toEqual('success');
                    return [2 /*return*/];
            }
        });
    }); });
    test('should test update task by id path ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, taskBeforeUpdate, updatedTitle, updatedResponseById;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app.App).post('/ncle/task').send(task)];
                case 1:
                    response = _a.sent();
                    taskBeforeUpdate = response.body.data;
                    updatedTitle = 'Updated Title';
                    return [4 /*yield*/, (0, supertest_1.default)(app.App).put('/ncle/task/' + taskBeforeUpdate.id).send({ title: updatedTitle })];
                case 2:
                    updatedResponseById = _a.sent();
                    expect(updatedResponseById.status).toBe(200);
                    expect(updatedResponseById.body.data).toEqual(Object.assign(taskBeforeUpdate, { title: updatedTitle }));
                    expect(updatedResponseById.body.result).toEqual('success');
                    return [2 /*return*/];
            }
        });
    }); });
    test('should test delete task by id path ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, taskToBeDeleted, deleteResponse, responseById;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app.App).post('/ncle/task').send(task)];
                case 1:
                    response = _a.sent();
                    taskToBeDeleted = response.body.data;
                    return [4 /*yield*/, (0, supertest_1.default)(app.App).delete('/ncle/task/' + taskToBeDeleted.id)];
                case 2:
                    deleteResponse = _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(app.App).get('/ncle/task/' + taskToBeDeleted.id)];
                case 3:
                    responseById = _a.sent();
                    expect(responseById.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    test('should test get tasks by assignedTo path ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, responseByAssignedTo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app.App).post('/ncle/task').send(task)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(app.App).get('/ncle/tasks/?assignedTo=' + task.assignedTo)];
                case 2:
                    responseByAssignedTo = _a.sent();
                    expect(responseByAssignedTo.status).toBe(200);
                    expect(responseByAssignedTo.body.data.length).toBe(1);
                    expect(responseByAssignedTo.body.data[0]).toEqual(Object.assign(task, { id: responseByAssignedTo.body.data[0].id }));
                    return [2 /*return*/];
            }
        });
    }); });
    test('should test get tasks by category path ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, responseByAssignedTo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app.App).post('/ncle/task').send(task)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(app.App).get('/ncle/tasks/?category=' + task.category)];
                case 2:
                    responseByAssignedTo = _a.sent();
                    expect(responseByAssignedTo.status).toBe(200);
                    expect(responseByAssignedTo.body.data.length).toBe(1);
                    expect(responseByAssignedTo.body.data[0]).toEqual(Object.assign(task, { id: responseByAssignedTo.body.data[0].id }));
                    return [2 /*return*/];
            }
        });
    }); });
});
