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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bcrypt = require("bcrypt"); //비밀번호 암호화모듈 사용 필요?
var passport = require("passport");
var typeorm_1 = require("typeorm"); //login테스트 위한 임시 커넥션 생성. 나중에 index.ts에서 받아오는 방식으로 변경하기
var User_1 = require("../entity/User");
// @EntityRepository(User)
// export class userModel extends Repository<User> {
//     findByName(email: string, password: string) {
//         return this.createQueryBuilder("user")
//             .where("user.email = :email", { email })
//             .andWhere("user.password = :password", { password })
//             .getMany();
//     }
// }
//const newUsers = await userModel.find({ isActive: true });
//const timber = await userModel.findOne({ firstName: "Timber", lastName: "Saw" });
//
var router = express.Router();
router.get('', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
/**
 * 회원가입(로컬)
 * req: email, name, password
 * res: 미정?(추후 gitbook 참조)
 */
router.post('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var exUser, hashedPassword, newUser, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, typeorm_1.createQueryBuilder("user")
                        .where("user.email = :email", { email: req.body.email })
                        .execute()];
            case 1:
                exUser = _a.sent();
                //console.log(exUser); 성공시 []가 뜬다.
                if (exUser.length !== 0) {
                    console.log('이미 사용중인 아이디로 회원가입 시도 탐지');
                    return [2 /*return*/, res.status(403).send('이미 사용중인 아이디입니다.')];
                }
                return [4 /*yield*/, bcrypt.hash(req.body.password, 12)];
            case 2:
                hashedPassword = _a.sent();
                return [4 /*yield*/, typeorm_1.createQueryBuilder("user")
                        .insert()
                        .into(User_1.User)
                        .values([
                        { email: req.body.email, name: req.body.name, password: hashedPassword },
                    ])
                        .execute()];
            case 3:
                newUser = _a.sent();
                console.log(newUser); //밑의 콘솔로그는 터미널에서 회원가입정보 확인 출력용입니다.
                console.log("\uD68C\uC6D0\uAC00\uC785 \uC2E0\uCCAD\uB0B4\uC5ED\uC785\uB2C8\uB2E4 : email: " + req.body.email + ", name: " + req.body.name + ", password(\uC554\uD638\uD654\uB428): " + hashedPassword);
                return [2 /*return*/, res.status(200).json(newUser)];
            case 4:
                e_1 = _a.sent();
                console.error(e_1);
                // 에러 처리를 여기서
                return [2 /*return*/, next(e_1)];
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * 회원탈퇴(로컬)
 * req: email, password
 */
router.delete('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var exUser, delUser, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, typeorm_1.createQueryBuilder("user")
                        .where("user.id = :id", { id: req.session.passport.user })
                        .execute()];
            case 1:
                exUser = _a.sent();
                if (!(exUser.length !== 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, typeorm_1.createQueryBuilder("user")
                        .delete()
                        .from(User_1.User) //  req.user or req.session.id or req.session.passport.user
                        .where({ id: req.session.passport.user }) //passport의 session에 있는 email 정보로 받아서 삭제하는 것으로 변경됨.
                        .execute()];
            case 2:
                delUser = _a.sent();
                console.log("\uD0C8\uD1F4\uD55C \uD68C\uC6D0\uC785\uB2C8\uB2E4: " + req.session.passport.user);
                req.logout(); //탈퇴했으면 로그아웃시키고, 세션도 끊어줘야됨. 
                return [2 /*return*/, res.status(200).redirect('/')]; //그리고 홈화면으로 API도 리다이렉트시켜야됨.
            case 3: return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                console.error(e_2);
                // 에러 처리를 여기서
                return [2 /*return*/, next(e_2)];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.patch('', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
router.post('/icon', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
/**
 * 로그인(로컬)
 * req: email, password
 */
router.post('/signin', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (info) {
                return res.status(401).send(info.reason);
            }
            return req.login(user, function (loginErr) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        if (loginErr) {
                            return [2 /*return*/, next(loginErr)];
                        }
                        return [2 /*return*/, res.json(user)];
                    }
                    catch (e) {
                        return [2 /*return*/, next(e)];
                    }
                    return [2 /*return*/];
                });
            }); });
        })(req, res, next);
        return [2 /*return*/];
    });
}); });
router.post('/signout', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        req.logout();
        if (req.session) {
            req.session.destroy(function (err) {
                res.send('logout 성공');
            });
        }
        else {
            res.send('logout 성공');
        }
        return [2 /*return*/];
    });
}); });
exports.default = router;
//# sourceMappingURL=user.js.map