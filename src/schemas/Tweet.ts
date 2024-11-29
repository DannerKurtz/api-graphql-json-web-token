import { ITweet } from '../database/schemas/Tweet';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class Tweet implements ITweet {
  @Field(() => ID) // Use () => ID para o tipo do _id
  _id?: string; // String, pois é equivalente a ObjectId em GraphQL

  @Field() // Campo string normal
  author!: string;

  @Field()
  description!: string;

  @Field({ nullable: true })
  likes!: number;

  @Field({ nullable: true }) // Torne o campo opcional usando { nullable: true }
  createAt?: Date;

  @Field({ nullable: true })
  updateAt?: Date;
}

export default Tweet;
