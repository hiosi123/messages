import { Post } from 'src/posts/post.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class MetaOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'json',
        nullable: false
    })
    metaValue: Record<string, any>;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    // bi directional relationship 에서는 cascade ddelete 가능함
    @OneToOne(() => Post, post => post.metaOptions, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    post: Post;
}
