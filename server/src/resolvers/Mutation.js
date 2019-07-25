function postPost(parent, args, context, info) {
  return context.prisma.createPost({
    text: args.text,
    likeCount: args.likeCount,
    dislikeCount: args.dislikeCount
  });
}

async function postReply(parent, args, context, info) {
  const postExists = await context.prisma.$exists.post({
    id: args.postId
  });

  if (!postExists) {
    throw new Error(`Post with ID ${args.postId} does not exist`);
  }

  return context.prisma.createReply({
    text: args.text,
    post: { connect: { id: args.postId } },
    likeCount: args.likeCount,
    dislikeCount: args.dislikeCount
  });
}

async function postLike(parent, args, context, info) {
  const postExists = await context.prisma.$exists.post({
    id: args.id
  });

  if (!postExists) {
    throw new Error(`Post with ID ${args.id} does not exist`);
  }

  return args.likeCount;
}

module.exports = {
  postPost,
  postReply,
  postLike
}