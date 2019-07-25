async function posts(parent, args, context) {
  const where = args.filter ? {
    text: args.filter
  } : {};

  const postList = await context.prisma.posts({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });

  return {
    postList,
  };
}

module.exports = {
  posts
}