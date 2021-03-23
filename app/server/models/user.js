const UserShema = {
  id         : { type: 'increments', nullable: false, primary: true },
  username   : { type: 'string', maxlength: 30, nullable: false },
  email      : { type: 'string', maxlength: 255, nullable: false },
  password   : { type: 'string',maxlength: 10, minlegth: 6, nullable: false },
};
module.exports = UserShema;