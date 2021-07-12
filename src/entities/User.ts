
import { MaxLength } from 'class-validator';
import { ObjectType, Field } from 'type-graphql';
import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity('user')
export class User extends BaseEntity {
    @Field()
    @PrimaryColumn()
    @MaxLength(20)
    id: string;
    
    @Column()
    @MaxLength(30)
    password: string;

    @Field()
    @Column()
    @MaxLength(30)
    nickname: string;
}