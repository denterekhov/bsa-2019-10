function replies(parent, args, context) {
    return context.prisma.post({
        id: parent.id
    }).replies();
}

module.exports = {
    replies,
}