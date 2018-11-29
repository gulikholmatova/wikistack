const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false, //logging of SQL command text
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

Page.beforeCreate(pageInstance => {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  pageInstance.slug = pageInstance.slug.replace(/\s+/g, '_').replace(/\W/g, '');
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
  },
});

Page.belongsTo(User, { as: 'author' });
User.hasMany(Page, { foreignKey: 'authorId' });

module.exports = { db, Page, User };
