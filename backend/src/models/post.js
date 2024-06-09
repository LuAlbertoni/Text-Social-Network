module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );

  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  return Post;
};
