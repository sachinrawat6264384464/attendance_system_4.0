var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
export class PaginationDto {
    page = 1;
    pageSize = 50;
    get skip() {
        return ((this.page ?? 1) - 1) * (this.pageSize ?? 20);
    }
    get take() {
        return this.pageSize ?? 20;
    }
}
__decorate([
    ApiPropertyOptional({ default: 1, minimum: 1 }),
    Type(() => Number),
    IsInt(),
    Min(1),
    IsOptional(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
__decorate([
    ApiPropertyOptional({ default: 50, minimum: 1, maximum: 500 }),
    Type(() => Number),
    IsInt(),
    Min(1),
    Max(500),
    IsOptional(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "pageSize", void 0);
//# sourceMappingURL=pagination.dto.js.map