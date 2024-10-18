import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AttachVideoDto{ 
    @ApiProperty()
    @IsNotEmpty()
    exerciseId: number;

    @ApiProperty({example: "1bfa4f2a-6989-4d32-9df6-cce31dfafe8e", description: "uuid from uploaded file"})
    @IsNotEmpty()
    videoFileId: string;
}