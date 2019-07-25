function postPost(parent, args, context, info) {
  return context.prisma.createPost({
    text: args.text,
    postLikeCount: args.postLikeCount,
    postDislikeCount: args.postDislikeCount
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
    replyLikeCount: args.replyLikeCount,
    replyDislikeCount: args.replyDislikeCount
  });
}

module.exports = {
  postPost,
  postReply
}