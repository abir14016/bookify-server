"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationHelpers = void 0;
const calculatePagination = (options) => {
    const page = options.page !== undefined ? Number(options.page) : 1;
    const limit = options.limit !== undefined ? Number(options.limit) : Infinity;
    const skip = Number.isFinite(limit) ? (page - 1) * limit : 0;
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc";
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.PaginationHelpers = {
    calculatePagination,
};
