"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.Role = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ROLES_KEY = 'roles';
var Role;
(function (Role) {
    Role["USER"] = "user";
    Role["ADMIN"] = "admin";
})(Role || (exports.Role = Role = {}));
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map