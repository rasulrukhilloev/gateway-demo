import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLoanDto: CreateLoanDto, @Req() req: any) {
    return this.loanService.create(createLoanDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.loanService.getLoans();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.loanService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
  //   return this.loanService.update(+id, updateLoanDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.loanService.remove(+id);
  // }
}
