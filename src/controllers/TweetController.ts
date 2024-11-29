import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import Tweet from '../schemas/Tweet';
import MongoTweet from '../database/schemas/Tweet';

@Resolver(Tweet)
class TweetController {
  @Query((returns) => [Tweet], { name: 'tweets' })
  @Authorized()
  async find() {
    const tweets = await MongoTweet.find();
    return tweets;
  }

  @Query((returns) => Tweet, { name: 'tweet' })
  @Authorized()
  async findById(@Arg('id') id: string) {
    const tweet = await MongoTweet.findById(id);

    if (!tweet) {
      throw new Error('Tweet does not exists');
    }

    return tweet;
  }

  @Mutation((returns) => Tweet, { name: 'createTweet' })
  @Authorized()
  async create(
    @Arg('author') author: string,
    @Arg('description') description: string
  ) {
    const tweet = await MongoTweet.create({ author, description, likes: 0 });
    return tweet;
  }

  @Mutation((returns) => Tweet, { name: 'updateTweet' })
  @Authorized()
  async update(
    @Arg('id') id: string,
    @Arg('author') author: string,
    @Arg('description') description: string
  ) {
    const tweet = await MongoTweet.findById(id);
    if (!tweet) {
      throw new Error('Tweet does not exists');
    }
    tweet.set({ author, description });
    await tweet.save();
    return tweet;
  }

  @Mutation((returns) => Tweet, { name: 'upvoteTweet' })
  @Authorized()
  async upvoteTweet(@Arg('id') id: string) {
    const tweet = await MongoTweet.findById(id);

    if (!tweet) {
      throw new Error('Tweet does not exists');
    }

    tweet.set({ likes: tweet?.likes + 1 });

    await tweet.save();
    return tweet;
  }

  @Mutation((returns) => Tweet, { name: 'downvoteTweet' })
  @Authorized()
  async downvoteTweet(@Arg('id') id: string) {
    const tweet = await MongoTweet.findById(id);

    if (!tweet) {
      throw new Error('Tweet does not exists');
    }

    tweet.set({ likes: tweet?.likes - 1 });

    await tweet.save();
    return tweet;
  }
}

export default TweetController;
