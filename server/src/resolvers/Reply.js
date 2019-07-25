function post(parent, args, context) {
    return context.prisma.reply({
        id: parent.id
    }).post();
}

module.exports = {
    post,
}