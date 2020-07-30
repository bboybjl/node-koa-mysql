// src/entity/user.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;
}

// 可以看到，用户模型有四个字段，其含义很容易理解。而 TypeORM 则是通过装饰器[14]这种优雅的方式来将我们的 User 类映射到数据库中的表。这里我们使用了三个装饰器：

// Entity 用于装饰整个类，使其变成一个数据库模型
// Column 用于装饰类的某个属性，使其对应于数据库表中的一列，可提供一系列选项参数，例如我们给 password 设置了 select: false ，使得这个字段在查询时默认不被选中
// PrimaryGeneratedColumn 则是装饰主列，它的值将自动生成